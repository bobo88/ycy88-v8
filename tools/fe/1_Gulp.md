# Gulp

::: tip Gulp 的概念
自动化构建工具，增强你的工作流程！<br />
关键词：”管道流“
:::

## 一、Gulp 初始化：

```js
npm install gulp-cli -g
npm install gulp -D
npx -p touch nodetouch gulpfile.js
gulp --help
```

gulpfile.js 文件配置：
::: details 点击查看官网提供的 gulpfile.js 代码

```js
const { src, dest, parallel } = require('gulp')
const pug = require('gulp-pug')
const less = require('gulp-less')
const minifyCSS = require('gulp-csso')
const concat = require('gulp-concat')

function html() {
  return src('client/templates/*.pug').pipe(pug()).pipe(dest('build/html'))
}

function css() {
  return src('client/templates/*.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(dest('build/css'))
}

function js() {
  return src('client/javascript/*.js', { sourcemaps: true })
    .pipe(concat('app.min.js'))
    .pipe(dest('build/js', { sourcemaps: true }))
}

exports.js = js
exports.css = css
exports.html = html
exports.default = parallel(html, css, js)
```

:::

## 二、Gulp 详细操作流程：

- 首先你要先在本地安装 nodejs，“傻瓜式”安装即可，一路点击下一步

```js
node - v // 查看安装的nodejs版本，出现版本号，说明已经正确安装
```

- 全局安装 gulp

```js
npm install gulp -g
```

- 单个项目安装 gulp 以及 gulp 相关的插件，首先新建项目文件夹，然后运行以下命令

```js
npm install gulp --save-dev
npm install gulp-less --save-dev
// ......
```

- 配置 gulpfile.js

```js
// 详见上文
```

- 运行任务

```js
// gulp 任务名称（gulp.task方法中定义的名称）
// 当执行gulp default或者gulp时，将会调用default任务里面的所有任务
```

## 三、Gulp 常用插件：

```js
// gulp-less：处理less预编译文件
// gulp-minify-css：css文件压缩
// gulp-rename：改变文件名
// gulp-autoprefixer：自动添加css前缀
// gulp-concat：合并js文件
// gulp-uglify：压缩js代码
// gulp-imagemin：压缩图片
// gulp-livereload：自动刷新页面
// gulp-cache：图片缓存，只有图片替换了才压缩
// gulp-htmlmin：压缩HTML
// gulp-babel/babel-core/babel-preset-es2015：用于解析ES6转换为ES5
```

## 四、Gulp 常用 API：

```js
// src()：创建一个流，用于从文件系统读取 Vinyl 对象。
// dest()：创建一个用于将 Vinyl 对象写入到文件系统的流。
// series()：将任务函数和/或组合操作组合成更大的操作，这些操作将按顺序依次执行。关键词“串行（顺序）执行”
// parallel()：将任务功能和/或组合操作组合成同时执行的较大操作。关键词“并行执行”
// watch()：监听 globs 并在发生更改时运行任务。任务与任务系统的其余部分被统一处理。
```

![An image](/images/tools/gulp.jpg)

案例源码：<br />
<a href="https://github.com/bobo88/project-basis/tree/main/gulp-basis" target="_blank">gulp-basis </a><br />
参考：<br />
<a href="https://www.gulpjs.com.cn/" target="_blank">官网（中文）</a><br />
<a href="https://gulpjs.com/" target="_blank">官网（英文）</a>
