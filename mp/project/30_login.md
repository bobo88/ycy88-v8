# 微信小程序实践 - 登录

::: tip 思维逻辑
接 - 化 - 发
:::

## 一、接：业务需求

目标：实现用户在小程序中的登录，确保用户身份的安全性，并为后续个性化服务打下基础。提高用户留存率，为用户提供更好的使用体验。

## 二、化：需求转化

## 1、功能简述

- 1）会员中心未登录的情况下，用户点击【立即登录】跳转到登录页面；

- 2）登录方式有三种：微信授权一键登录 / 账号密码登录 / 短信登录；

  - 有账号，点击按钮【已有账号】，可通过 账号密码/短信验证码 进行登录
  - 无账号，点击按钮【无账号】，系统会自动一键注册账号，请查收相关短信及时修改默认密码

- 3）账号密码与 PC 端打通。

## 2、逻辑流程图

### 1）微信授权一键登录

![An image](/images/mp/mp-login.png)

### 2）账号密码登录

> 略（与 PC 端保持一致）

## 3、登录拦截引导

- 商城
- 购物车
- 我的
- ...

## 三、发：技术实现

## 1、点击「微信授权一键登录」按钮

> 需要先阅读并同意隐私政策和用户注册服务协议

```js
// 微信授权一键登录
async wxOneKeyLogin(e) {
  if (this.agreeRule.length === 0) {
    uni.showToast({
      title: '请先阅读并同意隐私政策和用户注册服务协议',
      icon: 'none',
    })
    return false
  }

  this.pageLoading = true
  const that = this
  uni.login({
    provider: 'weixin',
    success: async (res) => {
      console.log('res-login', res)
      that.code = res.code
      console.log('code', res.code)
      // 1. 查询当前微信用户是否绑定过账户
      // 1.1 如果有绑定，直接静默登录
      // 1.2 如果未绑定，则弹窗提示：有无账号。
      //    1）有的话，走账号密码 / 短信验证码流程，并自动关联当前微信号和账号
      //    2）没有的话，走静默注册账号流程，同时自动登录并自动关联当前微信号
      if (res.errMsg == 'login:ok') {
        that.$wxapi
          .ifHasBindWxByJscode(res.code)
          .then((isBindRes) => {
            // 1. 查询当前微信用户是否绑定过账户
            if (
              isBindRes.code == '0000' &&
              isBindRes.data &&
              isBindRes.data.token
            ) {
              // 1.1 如果有绑定，直接静默登录
              that.formatLogin(isBindRes.data)
            } else {
              // 1.2 如果未绑定，则弹窗提示：有无账号。
              that.showWxBind = true
              that.pageLoading = false
              return
            }
          })
          .catch((err) => {
            that.pageLoading = false
            console.log(err)
          })
      }
    },
    fail: () => {
      uni.showToast({
        title: '一键登录出现异常',
        icon: 'none',
      })
      that.pageLoading = false
    },
  })
},
```

## 2、当前微信用户未绑定过账户，弹窗提示：是否有账号

> 备注：如果有绑定，直接静默登录。

### 1）有账号，跳转到具体的登录页面（可输入用户名和密码或者短信验证等）

```js
// 1）有的话，走账号密码 / 短信验证码流程，并自动关联当前微信号和账号
confirmOperate() {
  uni.navigateTo({
    url: `XXXXX`,
  })
},
```

### 2）没有账号，走静默流程

```js
// 2）没有的话，走静默注册账号流程，同时自动登录并自动关联当前微信号
getPhoneNumber(e) {
  this.pageLoading = true
  const that = this
  uni.login({
    provider: 'weixin',
    success: async (res) => {
      that.code = res.code
      if (res.errMsg == 'login:ok') {
        const resAccessToken = await that.$wxapi.getWxAccessToken()
        that.resAccessToken = resAccessToken || '***'
        // 设置微信权限token
        that.$u.vuex('wxtoken', resAccessToken.data || '')
        // 如果手机号不授权，直接返回
        if (!e.detail.code) {
          that.pageLoading = false
          return
        }
        let resPhoneNumber
        try {
          resPhoneNumber = await that.$wxapi.getWxPhoneNumber(
            e.detail.code,
            resAccessToken.data
          )
        } catch (error) {
          that.pageLoading = false
        }
        that.resPhoneNumber = resPhoneNumber || '---'

        let wxLoginRes
        try {
          wxLoginRes = await that.$wxapi.wxLoginNew({
            // ... 略
          })
        } catch (error) {
          that.pageLoading = false
        }

        that.wxLoginRes = wxLoginRes || ''

        // 登录结果处理：略...
      }
    },
    fail: () => {
      uni.showToast({
        title: '一键登录出现异常',
        icon: 'none',
      })
      that.pageLoading = false
    },
  })
},
```

## 3、静默登录逻辑

```js
// 标准化登录
formatLogin(resData) {
  // 1. 登录逻辑：设置登录信息缓存等（略）

  // 2. 跳转页面
  setTimeout(() => {
    uni.$emit('loginOK', {})
    // 跳转到指定页面
    uni.reLaunch({
      url: this.redirect,
    })
    this.pageLoading = false
  }, 500)
},
```
