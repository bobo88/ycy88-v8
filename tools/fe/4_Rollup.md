# Rollup

::: tip 概述(Overview)
Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序。
:::

## 一、安装

```js
$ yarn add rollup -g
// # OR
$ npm i rollup -g
```

## 二、rollup.config.js

使用 npm init 创建项目，并配置 rollup.config.js 文件以及安装相关依赖。

```js
// rollup.config.js 简介
export default {
  // 核心选项
  input,     // 必须
  external,
  plugins,

  // 额外选项
  onwarn,

  // danger zone
  acorn,
  context,
  moduleContext,
  legacy

  output: {  // 必须 (如果要输出多个，可以是一个数组)
    // 核心选项
    file,    // 必须
    format,  // 必须
    name,
    globals,

    // 额外选项
    paths,
    banner,
    footer,
    intro,
    outro,
    sourcemap,
    sourcemapFile,
    interop,

    // 高危选项
    exports,
    amd,
    indent
    strict
  },
};
```

具体的 DEMO 代码实现：

```js
'use strict'
import clear from 'rollup-plugin-clear'
import ts from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'
import webWorkerLoader from 'rollup-plugin-web-worker-loader'

const extensions = ['.js', '.jsx', '.ts', '.tsx']

export default {
  input: 'src/main.ts',
  output: {
    globals: {
      websocket: 'websocket',
      jquery: '$',
      stream: 'stream'
      // 'web-worker': 'web-worker',
    },
    file: 'dist/cloudgame_sdk.js',
    // rollup支持的打包文件的格式有amd, cjs, es\esm, iife, umd
    format: 'umd',
    name: 'cloudgame_sdk'
    // 当入口文件有export时，'umd'格式必须指定name
    // 这样，在通过<script>标签引入时，才能通过name访问到export的内容。
  },
  plugins: [
    clear({ targets: ['dist/cloudgame_sdk.js'] }), //清除dist目录
    uglify({
      compress: {
        drop_debugger: true,
        // drop_console: true,
        pure_funcs: ['console.log']
      }
    }),
    resolve({ extensions }),
    commonjs({
      include: 'node_modules/**'
    }),
    webWorkerLoader(),
    ts({
      useTsconfigDeclarationDir: true
    })
  ]
  // 指出应将哪些模块视为外部模块
  // external: ["jmuxer"],
  // external: ['jquery', 'websocket'],
}
```

## 三、与 Gulp 集成

```js
const gulp = require('gulp')
const rollup = require('rollup')
const rollupTypescript = require('rollup-plugin-typescript')

gulp.task('build', async function () {
  const bundle = await rollup.rollup({
    input: './src/main.ts',
    plugins: [rollupTypescript()]
  })

  await bundle.write({
    file: './dist/library.js',
    format: 'umd',
    name: 'library',
    sourcemap: true
  })
})
```

或者通过 package.json 里面配置脚本命令进行组合集成：

```js
"scripts": {
    "build": "npm run gulp && npm run rollup",
    "rollup": "rollup -w -c rollup.config.js",
    "gulp": "gulp",
    "test": "jest"
},
// 在根目录新建 gulpfile.js 配置文件
```

## 四、项目 DEMO

- 技术栈：
  - 打包工具：rollup / gulp。
    - rollup 主要整体打包 js 代码;
    - gulp 主要打包 ios 的 worker 文件及依赖，还有移动其他文件（比如\*.wasm）。
  - 核心点（模块化）：ES + Typescript。
- 目录简介：
  - main.ts： 入口文件
  - dep 文件夹： 相关依赖文件
- 打包命令：
  - `npm i`：安装依赖；
  - `npm run build`： 打包命令 --> 生成 【dist】文件夹

DEMO 源码：<br />
<a href="https://github.com/bobo88/project-basis/tree/main/rollup-basis" target="_blank">Rollup DEMO 源码</a><br />

参考：<br />
<a href="https://rollupjs.org/guide/zh/" target="_blank">Rollup 中文官网</a><br />
