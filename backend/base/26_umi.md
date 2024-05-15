# UMI 框架

::: tip 概念
UMI 是一个企业级前端开发框架。

你可以将 Umi 简单的理解为一个专注性能的类 next.js 前端框架，并通过约定、自动生成和解析代码等方式来辅助开发，减少我们开发者的代码量。
:::

特点：

1. 开箱即用
   - 内置路由、构建、部署、测试、Lint 等，仅需一个 Umi 依赖即可上手开发。
2. 企业级
   - 蚂蚁集团 10000+ 应用的选择。同时也在阿里、字节、腾讯、网易、美团、快手等公司有大量应用。
3. 最佳实践
   - 内置微前端、数据流、权限、国际化、icons 方案、埋点、antd、请求、CSS 方案、图表等最佳实践。
4. 可扩展
   - Umi 实现了 web 应用开发的完整生命周期，并使之插件化，包括 Umi 内部功能也是全由插件实现。
5. 完备路由
   - 基于 React Router 6，类 Remix，支持嵌套、动态、动态可选、预加载、基于路由的请求优化等。
6. 默认快
   - MFSU 解 Webpack 编译慢的问题，通过 esbuild 解压缩、配置、测试的性能问题，还有运行时...
7. 双构建引擎
   - 提供 Vite 和 Webpack 两种构建模式供开发者选择，并尽可能保证他们之间功能的一致性。
8. 依赖预打包
   - Umi 针对依赖做了预打包处理，彻底地锁定依赖，定期更新，让框架的每个版本在 10 年后依旧可用。

## 一、快速上手

```js
// 1. 新建文件夹目录
$ mkdir umi-basic && cd umi-basic

// 2. 创建项目
$ pnpm dlx create-umi@latest

// 3. 启动项目
$ pnpm dev

// 4. 启用 Prettier（可选）
$ pnpm umi g
// 选择要安装的插件
✔ Pick generator type › Enable Prettier -- Enable Prettier

// 5. 部署发布
$ pnpm build
// 产物默认会生成到 ./dist 目录下，将 dist 目录部署到服务器上即可。
```

![An image](/images/tools/umijs.png)

## 二、UMI 作用

TODO...

![An image](/images/tools/umijs_1.png)

![An image](/images/tools/umijs_2.png)

参考：<br />
<a href="https://umijs.org/" target="_blank">umijs 官网（阿里巴巴）</a><br />
