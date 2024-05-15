# VUE 全家桶之 Nuxt

::: tip 概念
Nuxt.js 是一个基于 Vue.js 的通用应用框架，旨在让「服务端渲染 SSR」或 「生成静态站点」开发更简单。
:::

## 特性

- 基于 Vue.js
- 自动代码分层
- 服务端渲染
- 强大的路由功能，支持异步数据
- 静态文件服务
- ES2015+ 语法支持
- 打包和压缩 JS 和 CSS
- HTML 头部标签管理
- 本地开发支持热加载
- 集成 ESLint
- 支持各种样式预处理器： SASS、LESS、 Stylus 等等
- 支持 HTTP/2 推送

## 一、安装和使用

```js
// Nuxt.js 十分简单易用。一个简单的项目只需将 nuxt 添加为依赖组件即可。
// 1. 安装 （Nuxt.js团队创建了脚手架工具：create-nuxt-app）
$ npx create-nuxt-app <项目名> // npx 在 NPM 版本 5.2.0 默认安装了
// 或者用 yarn ：
$ yarn create nuxt-app <项目名>
// 运行上述命令后，根据提示选择自定义的配置：比如服务器框架，UI框架，测试框架等。

// 目录结构
// assets -- 资源目录： 比如 Less / Sass / JS / images ...
// components -- 组件目录
// layouts -- 布局目录
// middleware -- 中间件目录: 中间件执行流程顺序 「nuxt.config.js」 / 「匹配布局」 / 「匹配页面」
// pages -- 页面目录：自动生成vue-routervue-router模块的路由配置，<nuxt-link>
// plugins -- 插件目录
// static -- 静态文件目录
// store -- Store 目录
// nuxt.config.js
// package.json

```

<!-- <img src="/images/prev/nuxt_1.png"> -->

![An image](/images/prev/nuxt_1.png)

## 二、常见命令

```js
nuxt	        // 启动一个热加载的 Web 服务器（开发模式） localhost:3000。
nuxt build	    // 利用 webpack 编译应用，压缩 JS 和 CSS 资源（发布用）。
nuxt start	    // 以生产模式启动一个 Web 服务器 (需要先执行nuxt build)。
nuxt generate	// 编译应用，并依据路由配置生成对应的 HTML 文件 (用于静态站点的部署)。

// Nuxt.js集成了：Vue / Vue-router / Vuex / Vue服务端渲染 / Vue-meta
```

## 三、项目部署

- 打包上线
  1.  执行： npm run build
  2.  将打包好的文件部署到服务器的某个文件夹中，并在服务器安装 node 环境
      - .nuxt ==> 隐藏文件
      - static
      - nuxt.config.js
      - package.json
  3.  在服务器上执行： npm install
  4.  在服务器运行项目： npm run start
      - 这时候打开的也是 localhost:3000
      - 我们需要使用【nginx】做代理 ==> www.abc.com

![An image](/images/prev/nuxt_2.png)

案例源码：<br />
<a href="https://github.com/bobo88/nuxt-web" target="_blank">Nuxt 搭建，PC + M 端（移动端）适配 ，服务端渲染 SSR，响应式官网</a><br />

参考：<br />
<a href="https://www.nuxtjs.cn/" target="_blank">官网（中文）</a><br />
<a href="https://nuxtjs.org/" target="_blank">官网（英语）</a><br />
<a href="https://nuxtjs.org/docs/get-started/installation" target="_blank">官网（英语）- docs</a><br />
