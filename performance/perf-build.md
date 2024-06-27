# 打包优化

前端打包优化是提升前端性能的关键步骤之一，可以显著减少资源加载时间、提高页面加载速度和用户体验。

::: tip 关键词
代码拆分、懒加载（路由配置等）、资源压缩（HTML/JS/CSS/图片等）和缓存等。
:::

## 一、代码拆分和懒加载

### 1. 代码拆分

将应用程序代码分成多个小模块，按需加载。常见的做法是使用 Webpack 的 `import()` 函数进行动态导入。

```javascript
// 使用 import() 动态导入
import('./module').then((module) => {
  // 使用模块
})
```

### 2. 懒加载

> 主要是在路由配置时。

只有在需要时才加载某些模块。可以使用 React 的 `React.lazy` 和 Vue 的 `Vue.component` 进行懒加载。

```javascript
// React 懒加载
const LazyComponent = React.lazy(() => import('./LazyComponent'))

// Vue 懒加载
Vue.component('LazyComponent', () => import('./LazyComponent.vue'))
```

## 二、资源压缩和最小化

### 1. 压缩 JavaScript 和 CSS

使用 Webpack 插件 `TerserPlugin` 和 `css-minimizer-webpack-plugin` 进行 JavaScript 和 CSS 的压缩。

```javascript
// webpack.config.js
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()]
  }
}
```

### 2. 压缩 HTML

使用 `html-webpack-plugin` 插件压缩 HTML。

```javascript
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ]
}
```

## 三、图片优化

### 1. 压缩图片

使用 `image-webpack-loader` 或 `imagemin-webpack-plugin` 进行图片压缩。

```javascript
// webpack.config.js
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: true
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              }
            }
          }
        ]
      }
    ]
  }
}
```

### 2. 使用现代图片格式

尽可能使用现代图片格式如 WebP，它具有更好的压缩率和更小的文件体积。

```html
<picture>
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Description" />
</picture>
```

## 四、减少 HTTP 请求

### 1. 合并文件

尽量合并 CSS 和 JavaScript 文件，减少 HTTP 请求次数。

### 2. 使用 CSS Sprite

将多个小图标合并到一个大图中，通过 CSS 定位显示不同的部分。

```css
.icon {
  background: url('sprite.png') no-repeat;
}

.icon-1 {
  width: 32px;
  height: 32px;
  background-position: 0 0;
}

.icon-2 {
  width: 32px;
  height: 32px;
  background-position: -32px 0;
}
```

## 五、使用内容分发网络（CDN）

将静态资源托管到 CDN 上，利用 CDN 的全球节点加速资源的传输速度。

```html
<link rel="stylesheet" href="https://cdn.example.com/styles.css" />
<script src="https://cdn.example.com/bundle.js"></script>
```

## 六、缓存

### 1. 设置缓存头

通过设置 HTTP 缓存头来利用浏览器缓存。

```javascript
// Express 服务器示例
app.use(
  express.static('public', {
    maxAge: '1d', // 强缓存
    etag: true, // 协商缓存
    lastModified: true // 协商缓存
  })
)
```

### 2. 使用 Service Worker

通过 Service Worker 实现前端资源缓存，提高离线访问和页面加载速度。

```javascript
// 注册 Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(
      (registration) => {
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope
        )
      },
      (error) => {
        console.log('ServiceWorker registration failed: ', error)
      }
    )
  })
}
```

## 七、减少和优化第三方库

### 1. 按需加载

仅加载使用到的部分，例如在 Lodash 中仅引入需要的函数。

```javascript
// Lodash 按需加载
import debounce from 'lodash/debounce'
```

### 2. 替换轻量级库

用更轻量级的库替换功能相似但较大的库。例如，用 `date-fns` 替代 `moment.js`。

```javascript
// 使用 date-fns 替代 moment.js
import { format } from 'date-fns'
const formattedDate = format(new Date(), 'yyyy-MM-dd')
```

## 总结

通过以上多种前端打包优化技巧，可以显著提高页面加载速度和用户体验。在实际项目中，应根据具体情况选择合适的优化方法，并不断监测和改进。
