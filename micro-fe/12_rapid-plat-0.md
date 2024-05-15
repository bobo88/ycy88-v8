# 团队标准工程搭建实践

::: warning 提示
本文档仅作为具体实践的前置思考篇（非最终版本）。
:::

::: tip 主要事项
实现快速搭建后台管理平台的一个 DEMO 实例。

- 基于 qiankun 搭建项目整合框架
- 使用低代码平台自动生成子项目的菜单和具体页面
- 根据模版配置，直接生成独立项目系统（比如 CMS、WMS 等）

:::

## 一、目标

> 自动生成项目 - 自动生成菜单 - 自动生成页面。

实现快速搭建后台管理平台的 DEMO 实例。

## 步骤一：基于 qiankun 搭建项目整合框架

### a. 安装 qiankun

在你的项目中使用 npm 或 yarn 安装 qiankun：

```bash
npm install qiankun --save
# 或者
yarn add qiankun
```

### b. 创建主应用（Main App）

创建一个主应用，作为整个后台管理平台的容器。在主应用的入口文件中使用 qiankun 注册微应用：

```javascript
// main.js
import { registerMicroApps, start } from 'qiankun'

registerMicroApps([
  {
    name: 'child-app',
    entry: 'http://localhost:8081', // 微应用的入口地址
    container: '#micro-app-container',
    activeRule: '/child' // 激活规则，匹配到该规则时加载微应用
  }
  // Add more micro apps as needed
])

start()
```

### c. 创建微应用（Micro App）

创建一个微应用，这将是后台管理平台的一个具体模块。确保微应用可以独立运行，并且有自己的路由和页面。

## 步骤二：使用低代码平台自动生成子项目的菜单和具体页面

### a. 选择低代码平台

选择适合的低代码平台，例如 OutSystems、Mendix、或其他你熟悉的平台。

### b. 创建低代码项目

在低代码平台上创建一个新的项目，并根据你的需求选择一个模板。

### c. 配置菜单和页面

使用低代码平台的工具配置菜单和具体页面。确保与 qiankun 集成的微应用相匹配，使其可以通过激活规则正确加载。

## 步骤三：根据模版配置，直接生成独立项目系统

### a. 按需定制模板

在低代码平台上，可以按照需要定制模板，添加业务逻辑、数据模型等。

### b. 生成独立项目

使用低代码平台提供的功能，生成独立的项目系统，确保它可以独立运行。

## 二、具体实践

在这个阶段，你将会：

- 在主应用中集成 qiankun，并注册微应用。
- 创建微应用作为后台管理平台的一个模块。
- 使用低代码平台创建和配置子项目的菜单和页面。
- 根据定制的模板生成独立项目系统。

确保各个模块可以独立运行，并且在主应用中通过 qiankun 进行正确的加载和卸载。通过这个过程，你将能够快速搭建一个具有低代码生成能力的后台管理平台 DEMO。

---

- [推荐 3 个开源的团队标准工程，前后端都有，项目经验又有着落了！](https://cloud.tencent.com/developer/article/1709991)
- [JEECG BOOT 低代码开发平台（Vue3 前端）](https://github.com/jeecgboot/jeecgboot-vue3)
- [OPSLI 团队标准工程](https://opsli.com/)
- [JeeSite 团队标准工程](https://jeesite.com/docs/)
- [GitHub 近两万 Star，无需编码，可一键生成前后端代码，这个开源项目有点强！](https://juejin.cn/post/6931219395863642119)
- [使用若依快速构建 web 应用程序](https://doc.ruoyi.vip/)
- [全网开源快速开发平台，低代码平台，企业级开发平台，开源系统，私活平台，学习平台，毕设平台，企业级应用开发平台资源整理](https://www.cnblogs.com/aixing/p/14840853.html)
- [Variant Form 3 For Vue 3.x](https://portrait.gitee.com/mindse/variant-form3-vite)
- [https://www.yuque.com/visualdev/vform3/features](https://www.yuque.com/visualdev/vform3/features)
- [低代码平台思维设计&基础实现](https://juejin.cn/post/7080445691520090120)
- [讲讲我做低代码平台这一年](https://juejin.cn/post/7254104833514618917)
