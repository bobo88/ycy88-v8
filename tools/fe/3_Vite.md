# Vite 的简介

::: tip Vite
下一代的前端工具链
:::

_特点：_

- _极速的服务启动_
  - _使用原生 ESM 文件，无需打包!_
- _轻量快速的热重载_
  - _无论应用程序大小如何，都始终极快的模块热替换（HMR）_
- _丰富的功能_
  - _对 TypeScript、JSX、CSS 等支持开箱即用。_
- _优化的构建_
  - _可选 “多页应用” 或 “库” 模式的预配置 Rollup 构建_
- _通用的插件_
  - _在开发和构建之间共享 Rollup-superset 插件接口。_
- _完全类型化的 API_
  - _灵活的 API 和完整的 TypeScript 类型。_

## 一、Vite 组成

- 一个开发服务器，它基于 原生 ES 模块 提供了 丰富的内建功能，如速度快到惊人的 模块热更新（HMR）。

- 一套构建指令，它使用 Rollup 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。

::: tip 浏览器支持
默认的构建目标是能支持 原生 ESM 语法的 script 标签、原生 ESM 动态导入 和 import.meta 的浏览器。传统浏览器可以通过官方插件 @vitejs/plugin-legacy 支持 。
:::

```js
// vite.config.js
import legacy from '@vitejs/plugin-legacy'

export default {
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ]
}
```

## 二、Vite 详解

### 1. 开发环境中为什么用 Vite

```html
当我们构建越来越大型的项目时，基于打包器的方式启动必须抓取并构建你的整个应用，然后启动服务。尤其是热更新（HMR）时，反馈迟钝极大的影响「开发体验」。
```

Vite 一开始就将应用中的模块分为「依赖」和「源码」两类：

- 依赖： 采用 esbuild 预构建依赖（Go 语言编写）。
- 源码： 采用原生的 ESM 方式 加载。
- 源码模块的请求会根据 304 Not Modified 进行协商缓存，而依赖模块请求则会通过 Cache-Control: max-age=31536000,immutable 进行强缓存，因此一旦被缓存它们将不需要再次请求。

### 2. 为什么生产环境仍需打包

为了在生产环境中获得最佳的加载性能，最好还是将代码进行 tree-shaking、懒加载和 chunk 分割（以获得更好的缓存）。

而 ESBuild 打包目前还不是很成熟（特别是代码分割和 CSS 处理方面），所以 Vite 附带了 Rollup 来进行生产环境的打包工作。

### 3. 构建你的第一个 Vite 项目

```js
$ yarn create vite          // 使用 yarn
// OR
$ npm create vite@latest    // 使用 npm
// OR
$ pnpm create vite          // 使用 pnpm

// ==> 然后按照提示操作即可！
```

### 4. Vite 的功能

- NPM 依赖解析和预构建： 依赖是强缓存的。
- 模块热替换
- TypeScript：Vite 天然支持引入 .ts 文件。Vite 仅执行 .ts 文件的转译工作，并 不 执行任何类型检查。
- VUE：
  - Vite 为 Vue 提供第一优先级支持：
  - Vue 3 单文件组件支持：@vitejs/plugin-vue
  - Vue 3 JSX 支持：@vitejs/plugin-vue-jsx
  - Vue 2.7 支持：vitejs/vite-plugin-vue2
  - Vue <2.7 的支持：underfin/vite-plugin-vue2
- JSX：
  - .jsx 和 .tsx 文件同样开箱即用。JSX 的转译同样是通过 esbuild。
  - Vue 用户应使用官方提供的 @vitejs/plugin-vue-jsx 插件，它提供了 Vue 3 特性的支持，包括 HMR，全局组件解析，指令和插槽。
- CSS：

  - @import 内联和变基
  - PostCSS
  - CSS Modules
  - CSS 预处理器

    ```js
    // # .scss and .sass
    npm add -D sass

    // # .less
    npm add -D less

    // # .styl and .stylus
    npm add -D stylus
    ```

- 静态资源处理
- JSON
- Glob 导入
  - Vite 支持使用特殊的 import.meta.glob 函数从文件系统导入多个模块：
  ```js
  const modules = import.meta.glob('./dir/*.js')
  ```
- 动态导入
  ```js
  const module = await import(`./dir/${file}.js`)
  ```
- WebAssembly
- Web Workers

### 5. Vite 使用插件

```js
// 添加一个插件
$ npm add -D @vitejs/plugin-legacy

// vite.config.js
import legacy from '@vitejs/plugin-legacy'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ]
})
```

## 三、Vite 实战

## 四、踩坑笔记

参考：<br />
<a href="https://cn.vitejs.dev/" target="_blank">Vite 中文官网</a><br />
