# Keycloak 实践（ 单点登录）

> Keycloak 是一个功能强大且灵活的身份和访问管理解决方案，适用于各种规模和类型的应用程序和系统。

## 一、概念和作用

Keycloak 是一个开源的身份和访问管理解决方案，提供了诸如单点登录（SSO）、身份管理、用户管理、认证、授权等功能。

### 1）核心概念

![An image](/images/java/keycloak.png)

> 4 个最常用的核心概念：

- Users: 用户，使用并需要登录系统的对象
- Roles: 角色，用来对用户的权限进行管理
- Clients: 客户端，需要接入 Keycloak 并被 Keycloak 保护的应用和服务
- Realms: 领域，领域管理着一批用户、证书、角色、组等，一个用户只能属于并且能登陆到一个域，域之间是互相独立隔离的， 一个域只能管理它下面所属的用户

### 2）作用

- **单点登录 (SSO)**：Keycloak 支持单点登录，允许用户通过一次登录访问多个关联的应用程序或服务，无需重复输入凭据。
- **身份管理**：Keycloak 提供了身份管理功能，包括用户注册、身份验证、密码重置等功能。
- **用户管理**：Keycloak 允许管理员管理用户，包括创建、编辑、删除用户，以及分配角色和权限等。
- **认证**：Keycloak 支持多种认证方法，包括用户名密码认证、多因素认证（如手机验证码、电子邮件确认）、社交身份提供商认证（如 Google、Facebook）、基于证书的认证等。
- **授权**：Keycloak 提供了灵活的授权机制，允许管理员定义和管理应用程序的访问策略，以及基于角色和权限对用户进行授权。
- **多租户支持**：Keycloak 支持多租户架构，允许在同一实例中为不同的组织或客户提供独立的身份和访问管理服务。
- **开放标准支持**：Keycloak 遵循开放标准，如 OAuth 2.0、OpenID Connect、SAML 2.0 等，与现有的身份基础设施和应用程序集成更加简单。
- **集成和扩展性**：Keycloak 可以与各种应用程序、服务和身份提供商进行集成，同时提供了丰富的 API 和插件机制，以支持定制化和扩展性需求。

## 二、具体实践

> 安装、前后端配合、具体使用、注意事项等。

### 1）Keycloak 安装

> 服务端工作：TODO

### 2）前端工作

> 添加官方 `keycloak-js` 适配器

```bash
$ npm i keycloak-js --save
```

```js
import Vue from 'vue'
import App from './App.vue'

// 第一步
import Keycloak from 'keycloak-js'

Vue.config.productionTip = false

// 第二步
// keycloak init options
const initOptions = {
  url: 'http://127.0.0.1:8080/auth',
  realm: 'demo',
  clientId: 'vue-demo',
  onLoad: 'login-required'
}
const keycloak = Keycloak(initOptions)

// 第三步
keycloak
  .init({ onLoad: initOptions.onLoad, promiseType: 'native' })
  .then((authenticated) => {
    if (!authenticated) {
      window.location.reload()
    } else {
      Vue.prototype.$keycloak = keycloak
      console.log('Authenticated')
    }

    // 注意：把VUE实例放这里
    new Vue({
      render: (h) => h(App)
    }).$mount('#app')

    // 设置定时器
    setInterval(() => {
      keycloak
        .updateToken(70)
        .then((refreshed) => {
          if (refreshed) {
            console.log('Token refreshed')
          } else {
            console.log(
              'Token not refreshed, valid for ' +
                Math.round(
                  keycloak.tokenParsed.exp +
                    keycloak.timeSkew -
                    new Date().getTime() / 1000
                ) +
                ' seconds'
            )
          }
        })
        .catch((error) => {
          console.log('Failed to refresh token', error)
        })
    }, 60000)
  })
  .catch((error) => {
    console.log('Authenticated Failed', error)
  })
```

---

- [Keycloak 快速上手指南，实现 SSO 单点登录](https://www.cnblogs.com/vigoz/p/12984556.html)
- [Keycloak 入门使用第一篇](https://blog.csdn.net/little_kelvin/article/details/111239241)
- [Keycloak 入门使用第二篇](https://blog.csdn.net/little_kelvin/article/details/111303674)
- [前端接入 keycloak 的几种方式](https://blog.csdn.net/weixin_44565273/article/details/130301871)
