# Webpack

webpack 是一个模块打包器。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。

## 一、发展历史

模块系统主要解决模块的定义、依赖和导出。

- 服务器端的 Node.js 遵循 CommonJS 规范，该规范的核心思想是允许模块通过 require 方法来同步加载所要依赖的其他模块，通过 exports 或者 module.exports 来导出需要暴露的接口。

- AMD： Asynchronous Module Definition 规范其实只有一个主要接口 define(id?,dependencies?,factory)，它要在声明模块的时候指定所有的依赖 dependencies，并且还要当做形参传到 factory 中，对于依赖的模块 <提前执行，依赖前置>。

  - 代表插件：requireJs
  - 优点：适合在浏览器环境中异步加载模块，可以并行加载多个模块
  - 缺点：提高了开发成本，代码的阅读和书写比较困难，模块定义方式的语义不顺畅；不符合通用的模块化思维方式，是一种妥协的实现

- CMD：Common Module Definition 规范和 AMD 很相似，尽量保持简单，并与 CommonJs 和 Node.js 的 Modules 规范保持了很大的兼容性。特点是： <依赖就近，延迟执行>。

  - 代表插件：SeaJs
  - 优点：依赖就近，延迟执行；可以很容易在 Node.js 中运行
  - 缺点：依赖 SPM 打包，模块的加载逻辑偏重

- ES6：ECMAScript 标准增加了 JavaScript 语言层面的模块体系定义，ES6 模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJs 和 AMD 模块，都只能在运行时确定这些东西。
  - 优点：容易进行静态分析；面向未来的 ECMAScript 标准

## 二、webpack 安装

```js
// 全局安装： npm install webpack -g。可以通过webpack -v 或者 webpack -h 来查看是否安装成功
$ npm i webpack -g

// 本地安装：(先npm init创建package.json文件）， npm install webpack --save-dev
$ npm i webpack -D

$ npm info webpack // 查看webpack版本信息

$ npm install webpack@1.12.x --save-dev // 安装指定版本的webpack
```

## 三、webpack 配置

webpack.config.js 配置项，是用来告诉 webpack 需要做什么。

- entry：页面入口文件配置
  - 让 webpack 用哪个文件作为项目的入口，支持数组形式，将加载数组中的所有模块，但以最后一个模块作为输出
- output：入口文件输出配置
  - 入口文件最终要生成什么名字的文件、存放到哪里
- module：加载器配置
  - 要用什么不同的模块来处理各种类型的文件
  - webpack 本身只能处理原生的 JavaScript 模块，但是 loader 转换器可以将各种类型的资源转换成 JavaScript 模块。这样，任何资源都可以成为 webpack 可以处理的模块。
- plugins：插件项
  - 比如： html-webpack-plugin
    - 为 HTML 文件中引入的外部资源如 script、link 动态添加每次 compile 后的 hash，防止引用缓存的外部文件问题
    - 可以生成创建 HTML 入口文件，比如单页面可以生成一个 HTML 文件入口，配置 N 个 html-webpack-plugin 可以生成 N 个页面入口
- resolve：其他解决方案配置
  - root：绝对路径。查找 module 的话从这里开始查找。<code>root：'E:/github/example/src'</code>
  - extensions：自动扩展文件后缀名，意味着我们 require 模块可以省略不写后缀名。extensions:['', '.js', '.json', 'scss']
  - alias： 模块定义别名，方便后续直接引用别名，无需多写长长的地址。 <code>alias: {AppStore: 'js/stores/AppStores.js', ActionType: 'js/actions/ActionType.js'}</code>
- source-map
  - webpack.config.js 配置： 「 <code>devtool: 'eval-source-map',</code> 」
  - 作用：建立打包代码和源代码之间的映射关系，可以快速定位源代码出现问题的行数
- 其他配置

## 四、webpack 优化

Webpack 的优化主要从以下几个点出发：

### 1. 优化开发体验

- 优化构建速度
- 优化使用体验，通过自动化手段，实现「自动刷新」和「模块热替换」

### 2. 优化输出质量

- 减少用户能感知到的加载时间，即首屏加载时间，比如区分环境、压缩、提取公共代码、按需加载、CDN、Tree Shaking
- 提升流畅度，比如 prepack、scope hoisting

### 3. 具体优化思路

- 如何进行性能分析
- 文件结构优化
- 构建速度优化
  - 减小文件搜索范围
    - 优化 loader 配置
    - 优化 resolve.modules 配置
    - 优化 resolve.mainFields 配置
    - 优化 resolve.alias 配置: 配置路径别名
    - 优化 resolve.extensions 配置
    - 优化 module.noParse 配置
  - 多进程并行构建
  - 多进程并行压缩
  - 利用缓存提升二次构建速度

```js
// 用 speed-measure-webpack-plugin 分析构建速度，它可以分析每个 loader 和 plugin 的耗时。
const speedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const smp = new speedMeasureWebpackPlugin()

// 用 smp.wrap 去包裹 webpack 的配置对象
module.exports = smp.wrap({
  //.....
})
```

- 打包体积优化
  - webpack 自带
    - Tree-Shaking
    - Scope-Hoisting
  - 资源优化
    - 压缩 HTML
    - 压缩 CSS
    - 压缩 JS
    - 处理图片和字体

```js
// 用 webpack-bundle-analyzer 分析打包体积，在浏览器的 8888 端口下可以看到每个文件的体积信息以及各个 chunk 的包含关系，方便我们进行分析。
// webpack-bundle-analyzer
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
module.exports = {
  plugins: [new BundleAnalyzerPlugin()]
}
```

```js
// 压缩 css
// mini-css-extract-plugin: 本插件会将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。

// CssMinimizerWebpackPlugin: 不能与 speed-measure-webpack-plugin 混合使用，会报错。（暂未着手修复）
// in module.rules
// 设置css不作为es模块，无需export sth
{
   loader: MiniCssExtractPlugin.loader,
   options: {
         esModule: false,
    },
}
// 这个插件使用 cssnano 优化和压缩 CSS。
// https://cssnano.co/
```

## 五、其他

TODO...

<!-- ::: tip Webpack
先上整理的思维导图，详细文档Todo...
::: -->

整理的思维导图：
![An image](/images/prev/tools_webpack.png)
