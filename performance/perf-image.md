# 图片的优化

图片优化是提升网站性能和用户体验的重要方面。通过优化图片，您可以减少加载时间，节省带宽，提高网站的响应速度。

::: tip 关键词
图片格式选择、图片大小尺寸压缩、图片加载优化（延迟加载/懒加载）、缓存等。
:::

## 图片优化策略

1. **选择合适的图片格式**

   - **JPEG**：适用于照片和复杂图像。优点是压缩率高，缺点是质量损失较大。
   - **PNG**：适用于需要透明度的图像。优点是无损压缩，缺点是文件较大。
   - **WebP**：适用于多种图像类型。优点是高压缩率和高质量，缺点是某些浏览器可能不完全支持。
   - **SVG**：适用于图标和矢量图。优点是可缩放且文件小，缺点是复杂图形处理较难。

2. **调整图像尺寸**

   - 根据显示区域调整图片尺寸，避免加载超出实际需求的高分辨率图片。
   - 使用响应式图片技术，如`srcset`和`<picture>`元素，为不同设备提供适配的图片。

3. **图像压缩**

   - 使用无损或有损压缩技术，减少图像文件大小。
   - 工具如 TinyPNG、JPEGmini、ImageOptim 等，可以有效压缩图像而不显著降低质量。

4. **延迟加载（Lazy Loading）**

   - 仅在图片进入视口时加载图片，减少初始页面加载时间和带宽消耗。
   - 使用原生的`loading="lazy"`属性或 JavaScript 库（如 lazysizes）。

5. **缓存**

   - 使用浏览器缓存，减少重复加载相同的图片。
   - 设置适当的 HTTP 缓存头部，如`Cache-Control`和`Expires`。

6. **内容分发网络（CDN）**
   - 将图片托管在 CDN 上，利用其全球节点加快图片传输速度。
   - 减少服务器负载，提升用户的访问速度。

## 图片优化工具

1. **在线工具**

   - **TinyPNG**：压缩 PNG 和 JPEG 图像，提供高质量和小文件大小。
   - **JPEGmini**：压缩 JPEG 图像，显著减少文件大小而保持高质量。
   - **ImageOptim**：无损压缩图片，适用于多种格式。

2. **桌面应用**

   - **Photoshop**：提供多种导出选项，优化图像质量和文件大小。
   - **GIMP**：开源图像编辑工具，支持多种图像优化插件。
   - **ImageMagick**：命令行工具，批量处理和优化图像。

3. **开发工具**
   - **Webpack Image Loader**：在构建过程中优化图像，支持多种格式和压缩选项。
   - **gulp-imagemin**：Gulp 插件，自动化图像压缩和优化。

## 示例分析

假设您有一个电子商务网站，并希望优化首页的图片加载性能。以下是具体步骤：

1. **选择合适的图片格式**

   - 产品图片使用 JPEG 格式，以减少文件大小。
   - 透明背景的图标使用 PNG 格式。
   - 考虑将大部分图像转换为 WebP 格式，以提高压缩率和质量。

2. **调整图像尺寸**

   - 确保首页显示的所有图片都根据显示区域的实际需求调整尺寸。例如，产品缩略图宽度不超过 300 像素。
   - 使用`srcset`属性为不同屏幕尺寸提供不同分辨率的图片。
     ```html
     <img
       src="product.jpg"
       srcset="
         product-300w.jpg   300w,
         product-600w.jpg   600w,
         product-1200w.jpg 1200w
       "
       sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
       alt="Product Image"
     />
     ```

3. **图像压缩**

   - 使用 TinyPNG 在线压缩所有产品图片。
   - 使用 ImageOptim 无损压缩图标和其他小图像。

4. **延迟加载（Lazy Loading）**

   - 在所有非首屏图片上添加`loading="lazy"`属性。
     ```html
     <img src="product.jpg" loading="lazy" alt="Product Image" />
     ```

5. **缓存**

   - 配置服务器设置，为图像文件设置长时间的缓存头部。
     ```htaccess
     <IfModule mod_expires.c>
       ExpiresActive On
       ExpiresByType image/jpg "access plus 1 year"
       ExpiresByType image/jpeg "access plus 1 year"
       ExpiresByType image/png "access plus 1 year"
       ExpiresByType image/webp "access plus 1 year"
     </IfModule>
     ```

6. **使用 CDN**
   - 将所有图片托管在 CDN 上，如 Cloudflare、Akamai 或 Amazon CloudFront。

## 代码（普通项目）如何实现懒加载？

实现图片懒加载可以使用 HTML 的`loading="lazy"`属性，这是最简单的方法。如果需要更复杂的懒加载功能，例如在不支持原生懒加载的浏览器中，或需要更精细的控制，可以使用 JavaScript 来实现。下面是使用 JavaScript 和 Intersection Observer API 来实现图片懒加载的示例。

### 方法一：使用原生 `loading="lazy"`

这种方法适用于现代浏览器，并且实现非常简单：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lazy Load Images</title>
  </head>
  <body>
    <h1>Lazy Loading Images Example</h1>
    <img src="path/to/image1.jpg" alt="Image 1" loading="lazy" />
    <img src="path/to/image2.jpg" alt="Image 2" loading="lazy" />
    <img src="path/to/image3.jpg" alt="Image 3" loading="lazy" />
  </body>
</html>
```

### 方法二：使用 Intersection Observer API

这种方法可以更灵活地处理懒加载，并适用于所有现代浏览器。如果需要支持旧浏览器，可以使用相应的 polyfill。

#### HTML 结构

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lazy Load Images</title>
    <style>
      .lazy {
        display: block;
        width: 100%;
        height: auto;
        background-color: #f3f3f3; /* Placeholder background color */
      }
    </style>
  </head>
  <body>
    <h1>Lazy Loading Images Example</h1>
    <img class="lazy" data-src="path/to/image1.jpg" alt="Image 1" />
    <img class="lazy" data-src="path/to/image2.jpg" alt="Image 2" />
    <img class="lazy" data-src="path/to/image3.jpg" alt="Image 3" />

    <script>
      document.addEventListener('DOMContentLoaded', function () {
        const lazyImages = document.querySelectorAll('img.lazy')
        const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target
              img.src = img.dataset.src
              img.classList.remove('lazy')
              observer.unobserve(img)
            }
          })
        })

        lazyImages.forEach((img) => {
          imageObserver.observe(img)
        })
      })
    </script>
  </body>
</html>
```

### 方法三：使用 JavaScript 库（如 lazysizes）

[lazysizes](https://github.com/aFarkas/lazysizes) 是一个流行的懒加载库，提供了很多实用的功能，并且支持多种图片和媒体类型。

#### 使用步骤

1. **引入 lazysizes 库**

在 HTML 文件的`<head>`部分或`<body>`的末尾引入 lazysizes 库：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lazy Load Images</title>
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js"
      async
    ></script>
    <style>
      .lazyload {
        display: block;
        width: 100%;
        height: auto;
        background-color: #f3f3f3; /* Placeholder background color */
      }
    </style>
  </head>
  <body>
    <h1>Lazy Loading Images Example</h1>
    <img class="lazyload" data-src="path/to/image1.jpg" alt="Image 1" />
    <img class="lazyload" data-src="path/to/image2.jpg" alt="Image 2" />
    <img class="lazyload" data-src="path/to/image3.jpg" alt="Image 3" />
  </body>
</html>
```

2. **设置图片的 class 和 data-src 属性**

确保图片标签使用`class="lazyload"`和`data-src`属性：

```html
<img class="lazyload" data-src="path/to/image1.jpg" alt="Image 1" />
```

## VUE/React 项目如何实现图片懒加载？

在 Vue 和 React 中实现图片懒加载可以利用各自框架的生态系统和组件化特点。以下是使用 Vue 和 React 分别实现图片懒加载的示例。

### Vue 中实现图片懒加载

在 Vue 中，你可以使用`vue-lazyload`库来实现图片懒加载。

#### 步骤 1：安装`vue-lazyload`

```sh
npm install vue-lazyload
```

#### 步骤 2：在 Vue 项目中配置`vue-lazyload`

在你的`main.js`中引入并使用`vue-lazyload`：

```javascript
import Vue from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'path/to/error.png',
  loading: 'path/to/loading.gif',
  attempt: 1
})

new Vue({
  render: (h) => h(App)
}).$mount('#app')
```

#### 步骤 3：在组件中使用懒加载

```vue
<template>
  <div>
    <h1>Lazy Loading Images in Vue</h1>
    <img v-lazy="imageSrc" alt="Image description" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageSrc: 'path/to/image.jpg'
    }
  }
}
</script>
```

### React 中实现图片懒加载

在 React 中，你可以使用`react-lazyload`库来实现图片懒加载。

#### 步骤 1：安装`react-lazyload`

```sh
npm install react-lazyload
```

#### 步骤 2：在 React 组件中使用`react-lazyload`

```jsx
import React from 'react'
import LazyLoad from 'react-lazyload'

const App = () => {
  return (
    <div>
      <h1>Lazy Loading Images in React</h1>
      <LazyLoad height={200} offset={100} once>
        <img src="path/to/image.jpg" alt="Image description" />
      </LazyLoad>
    </div>
  )
}

export default App
```

#### 使用`IntersectionObserver` API

如果不想依赖第三方库，你也可以使用`IntersectionObserver` API 来实现图片懒加载。

### Vue 中使用`IntersectionObserver`

```vue
<template>
  <div>
    <h1>Lazy Loading Images in Vue with IntersectionObserver</h1>
    <img :data-src="imageSrc" ref="image" alt="Image description" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageSrc: 'path/to/image.jpg'
    }
  },
  mounted() {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          observer.unobserve(img)
        }
      })
    })
    observer.observe(this.$refs.image)
  }
}
</script>
```

### React 中使用`IntersectionObserver`

```jsx
import React, { useRef, useEffect } from 'react'

const LazyImage = ({ src, alt }) => {
  const imgRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          observer.unobserve(img)
        }
      })
    })

    observer.observe(imgRef.current)

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [])

  return <img data-src={src} ref={imgRef} alt={alt} />
}

const App = () => {
  return (
    <div>
      <h1>Lazy Loading Images in React with IntersectionObserver</h1>
      <LazyImage src="path/to/image.jpg" alt="Image description" />
    </div>
  )
}

export default App
```

以上是如何在 Vue 和 React 中实现图片懒加载的两种方法：使用第三方库和使用`IntersectionObserver` API。选择哪种方法取决于你的项目需求和个人偏好。
