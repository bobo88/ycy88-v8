# CSS 篇

## 1. **什么是 CSS？CSS 的作用是什么？**

- CSS（Cascading Style Sheets）即层叠样式表，用于控制 HTML 元素的样式和布局。

## 2. **CSS 如何引入到 HTML 中？**

- **内联样式**：在 HTML 元素中使用`style`属性。
- **内部样式表**：在 HTML 文档的`<head>`中使用`<style>`标签。
- **外部样式表**：使用`<link>`标签引入外部 CSS 文件。

## 3. **CSS 选择器有哪些类型？**

- **基本选择器**：元素选择器、类选择器、ID 选择器、通用选择器。
- **组合选择器**：后代选择器、子选择器、相邻兄弟选择器、通用兄弟选择器。
- **属性选择器**：按属性名、属性值、部分属性值选择。
- **伪类选择器**：如`:hover`、`:focus`、`:nth-child`。
- **伪元素选择器**：如`::before`、`::after`。

## 4. **如何使用 CSS 选择第 N 个元素？**

- 使用伪类选择器`:nth-child(n)`或`:nth-of-type(n)`。

## 5. **解释 CSS 盒模型。**

- 盒模型包括内容(content)、内边距(padding)、边框(border)和外边距(margin)。
- 标准盒模型：`width`和`height`仅包含内容区域。
- IE 盒模型：`width`和`height`包含内容、内边距和边框。

## 6. **如何让一个 div 水平居中？**

- 对于固定宽度的元素：`margin: 0 auto;`
- 对于 flex 布局：`display: flex; justify-content: center;`

## 7. **CSS 中如何实现一个两栏布局？**

- **浮动布局**：
  ```css
  .left {
    float: left;
    width: 50%;
  }
  .right {
    float: right;
    width: 50%;
  }
  ```
- **flex 布局**：
  ```css
  .container {
    display: flex;
  }
  .left,
  .right {
    flex: 1;
  }
  ```
- **grid 布局**：
  ```css
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  ```

## 8. **如何使用 flexbox 实现垂直和水平居中？**

```css
.container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
```

## 9. **什么是响应式设计？如何实现响应式设计？**

- 响应式设计通过 CSS 媒体查询、弹性布局等方法，使网页在不同设备和窗口尺寸下都能正常显示。
- 使用媒体查询：
  ```css
  @media (max-width: 600px) {
    .container {
      flex-direction: column;
    }
  }
  ```

## 10. **如何使用媒体查询实现不同设备下的不同样式？**

```css
@media (max-width: 600px) {
  body {
    background-color: lightblue;
  }
}

@media (min-width: 601px) and (max-width: 1200px) {
  body {
    background-color: lightgreen;
  }
}

@media (min-width: 1201px) {
  body {
    background-color: lightcoral;
  }
}
```

## 11. **CSS 中的优先级规则是什么？**

- 内联样式 > ID 选择器 > 类选择器 > 元素选择器 > 通用选择器
- `!important`会提高声明的优先级。

## 12. **CSS 中的`position`属性有哪几种值？它们的作用是什么？**

- `static`：默认值，按正常文档流排列。
- `relative`：相对定位，相对于其正常位置进行偏移。
- `absolute`：绝对定位，相对于最近的已定位祖先元素进行偏移。
- `fixed`：固定定位，相对于视口进行偏移。
- `sticky`：粘性定位，依赖于用户的滚动位置。

## 13. **如何实现元素的透明度？**

- 使用`opacity`属性：`opacity: 0.5;` 使元素及其子元素透明度为 50%。
- 使用`rgba`颜色值：`background-color: rgba(0, 0, 0, 0.5);` 设置背景色为黑色且透明度为 50%。

## 14. **CSS 动画和过渡是什么？如何使用？**

- **过渡**：用于平滑过渡某个 CSS 属性的变化。
  ```css
  .element {
    transition: all 0.5s ease;
  }
  ```
- **动画**：用于定义动画的关键帧及其属性变化。
  ```css
  @keyframes example {
    from {
      background-color: red;
    }
    to {
      background-color: yellow;
    }
  }
  .element {
    animation: example 5s infinite;
  }
  ```

## 15. **CSS 中的`display`属性有哪些值？它们的作用是什么？**

- `none`：元素不显示且不占据空间。
- `block`：元素显示为块级元素，独占一行。
- `inline`：元素显示为内联元素，不独占一行。
- `inline-block`：元素显示为内联块级元素，既不独占一行，又可以设置宽高。
- `flex`：元素显示为弹性盒容器。
- `grid`：元素显示为网格容器。

## 16. **什么是 CSS 预处理器？你使用过哪些预处理器？**

- CSS 预处理器是一种增强 CSS 功能的工具，允许使用变量、嵌套规则、混入（mixin）等特性，生成更简洁、可维护的 CSS 代码。
- 常见的预处理器有 Sass、LESS、Stylus 等。

## 17. **Sass 和 LESS 的区别是什么？**

- **Sass**：
  - 支持嵌套规则、变量、混入、继承等。
  - 使用`.scss`或`.sass`文件扩展名。
  - `.scss`文件的语法与 CSS 兼容，而`.sass`文件的语法更简洁，不需要大括号和分号。
- **LESS**：
  - 类似于 Sass，支持变量、嵌套、混入等。
  - 使用`.less`文件扩展名。
  - 语法与 CSS 兼容。

## 18. **CSS Grid 和 Flexbox 有什么区别？**

- **Flexbox**：主要用于一维布局，即单行或单列布局。适合处理单一方向的排列和对齐问题。
- **Grid**：用于二维布局，可以同时处理行和列布局。适合复杂的页面布局。

## 19. **如何使用 CSS Grid 实现一个三栏布局？**

```css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 10px; /* 可选的列间距 */
}
```

## 20. **如何使用 CSS Grid 实现一个布局，其中包含固定宽度的侧栏和自适应宽度的主栏？**

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr; /* 左侧栏固定200px，右侧栏自适应 */
  gap: 10px; /* 可选的列间距 */
}
```

## 21. **如何创建一个简单的 CSS 动画，使一个元素在页面加载时从左移到右？**

```css
@keyframes moveRight {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100px);
  }
}

.element {
  animation: moveRight 2s ease-in-out;
}
```

## 22. **如何创建一个渐变背景色的过渡效果？**

```css
.element {
  background: linear-gradient(to right, red, yellow);
  transition: background 2s ease;
}

.element:hover {
  background: linear-gradient(to right, blue, green);
}
```

## 23. **什么是移动优先设计？**

- 移动优先设计是指首先设计和开发移动设备版本的网页，然后逐步调整和优化以适应更大屏幕的设备。这种方法通常使用`min-width`媒体查询来添加样式。

## 24. **如何使用 CSS 实现一个简单的响应式网格布局？**

```css
.container {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 600px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .container {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## 25. **什么是 BEM？BEM 的命名规则是什么？**

- **BEM**（Block, Element, Modifier）是一种命名约定，旨在使 CSS 类名更具可读性和可维护性。
- **命名规则**：
  - **Block**：独立的功能块，例如`header`。
  - **Element**：块的组成部分，用双下划线连接，例如`header__title`。
  - **Modifier**：块或元素的变体，用双中划线连接，例如`header--large`。

## 26. **CSS 中的`calc()`函数的用途是什么？**

- `calc()`函数用于动态计算长度值，可以在 CSS 属性中使用数学表达式。
- 示例：
  ```css
  .element {
    width: calc(100% - 50px);
  }
  ```

## 27. **如何使用 CSS 实现一个固定在页面底部的页脚？**

```css
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px;
}
```

## 28. **解释 CSS 中的`z-index`和堆叠上下文。**

- **`z-index`**：用于设置元素的堆叠顺序。值越大，元素越靠上。
- **堆叠上下文**：当某些 CSS 属性（如`position`为`absolute`、`relative`、`fixed`，或者`z-index`值不为`auto`）应用于元素时，会创建新的堆叠上下文。在同一个堆叠上下文内，`z-index`值起作用。

## 29. **什么是`@import`？如何使用？**

- `@import`用于在 CSS 中导入其他样式表。
- 示例：
  ```css
  @import url('styles.css');
  ```

## 30. **如何使用 CSS 实现一个纯 CSS 的下拉菜单？**

```html
<div class="dropdown">
  <button class="dropbtn">Dropdown</button>
  <div class="dropdown-content">
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
    <a href="#">Link 3</a>
  </div>
</div>
```

```css
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
```

## 31. **如何优化 CSS 以提高页面性能？**

- **减少 CSS 文件大小**：
  - 压缩 CSS 文件，移除空格和注释。
  - 合并多个 CSS 文件以减少 HTTP 请求。
- **使用 CSS 预处理器**：通过 Sass、LESS 等预处理器生成优化的 CSS。
- **避免使用@import**：在 CSS 中使用`@import`会导致额外的 HTTP 请求，延迟页面加载。
- **避免使用过多的复杂选择器**：避免使用过于具体的选择器（如后代选择器），因为它们的匹配成本较高。
- **使用类名代替标签名**：类选择器比标签选择器更高效。
- **使用缓存**：设置适当的缓存头，缓存静态资源。

## 32. **CSS 文件放在`<head>`中和放在`<body>`底部有什么区别？**

- CSS 文件通常放在`<head>`中，以确保样式在 HTML 内容加载之前加载和解析，防止页面在加载时出现闪烁或样式不正确的情况。
- 将 CSS 文件放在`<body>`底部可能会导致页面在样式加载前短暂显示未样式化的内容，影响用户体验。

## 33. **什么是 CSS 变量？如何使用 CSS 变量？**

- CSS 变量（自定义属性）允许在一个地方定义值并在整个样式表中重复使用。
- 定义和使用：

  ```css
  :root {
    --primary-color: #3498db;
    --font-size: 16px;
  }

  body {
    color: var(--primary-color);
    font-size: var(--font-size);
  }
  ```

## 34. **CSS 变量与预处理器变量的区别是什么？**

- **CSS 变量**：
  - 原生支持，不需要预处理器。
  - 支持在运行时修改，可以在不同的上下文中重新定义。
- **预处理器变量**（如 Sass、LESS）：
  - 需要编译步骤，将预处理器代码转换为标准 CSS。
  - 编译后不可修改，仅在编译时生效。

## 35. **如何实现一个 sticky footer，即页脚始终在页面底部，即使内容不足以填满整个页面？**

```css
html,
body {
  height: 100%;
  margin: 0;
}

.container {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
}

.footer {
  height: 50px;
  background: #333;
  color: white;
  text-align: center;
  line-height: 50px;
}
```

## 36. **如何使用 CSS Grid 实现一个三栏布局，中间列宽度自适应，两侧列固定宽度？**

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px; /* 两侧列固定宽度，中间列自适应 */
  gap: 10px; /* 可选的间距 */
}

.left,
.right {
  background-color: #f4f4f4;
}

.middle {
  background-color: #ddd;
}
```

## 37. **如何处理 CSS 中的浏览器兼容性问题？**

- **使用厂商前缀**：针对特定浏览器的前缀，如`-webkit-`、`-moz-`、`-ms-`、`-o-`。
- **CSS 兼容性工具**：使用 Autoprefixer 自动添加必要的前缀。
- **条件注释**：针对 IE 浏览器的条件注释。
- **CSS Reset/Normalize**：使用 CSS Reset 或 Normalize 来标准化不同浏览器的默认样式。
- **功能检测**：使用 Modernizr 等库进行功能检测，根据支持情况应用不同的样式或功能。

## 38. **如何解决不同浏览器之间的盒模型差异？**

- 使用`box-sizing: border-box;`将所有元素的盒模型设为包括 padding 和 border 在内的宽度和高度。
  ```css
  * {
    box-sizing: border-box;
  }
  ```

## 39. **如何使用 CSS 实现一个背景图片覆盖整个页面？**

```css
body {
  background-image: url('background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  margin: 0;
}
```

## 40. **如何使用 CSS 制作图片的圆形裁剪效果？**

```css
.circle-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
}

.circle-image img {
  width: 100%;
  height: auto;
}
```

## 41. **什么是 CSS Grid？如何定义网格容器和网格项目？**

- CSS Grid 是一种二维布局系统，可以创建复杂的网格布局。
- 定义网格容器和项目：

  ```css
  .container {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 定义三列，每列占1份宽度 */
    grid-template-rows: auto; /* 行高自动 */
    gap: 10px; /* 设置间距 */
  }

  .item {
    background-color: #ddd;
    padding: 20px;
  }
  ```

## 42. **如何使用 CSS Grid 创建一个网格布局，其中某个项目跨越多行或多列？**

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 100px);
  gap: 10px;
}

.item1 {
  grid-column: span 2; /* 跨两列 */
  grid-row: span 2; /* 跨两行 */
}
```

## 43. **如何在网页中使用 Web 字体？**

- 使用 Google Fonts 或@font-face：

  ```css
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

  body {
    font-family: 'Roboto', sans-serif;
  }
  ```

## 44. **如何在网页中使用图标字体？**

- 使用 Font Awesome 或类似库：

  ```html
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
  />

  <i class="fas fa-home"></i>
  ```

## 45. **如何使用 CSS 绘制一个三角形？**

- 使用透明边框和非透明边框绘制三角形：
  ```css
  .triangle {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 100px solid red;
  }
  ```

## 46. **如何使用 CSS 实现文字的阴影效果？**

- 使用`text-shadow`属性：
  ```css
  .text-shadow {
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  }
  ```

## 47. **如何使用 CSS 实现元素的阴影效果？**

- 使用`box-shadow`属性：
  ```css
  .box-shadow {
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  }
  ```

## 48. **解释并举例说明 CSS 中的`::before`和`::after`伪元素。**

- `::before`和`::after`伪元素用于在选定元素的内容之前或之后插入内容。
- 示例：

  ```css
  .content::before {
    content: 'Before ';
    color: gray;
  }

  .content::after {
    content: ' After';
    color: gray;
  }
  ```

## 49. **如何使用 CSS 选择第一个和最后一个子元素？**

- 使用伪类选择器`:first-child`和`:last-child`：

  ```css
  .container > :first-child {
    color: red;
  }

  .container > :last-child {
    color: blue;
  }
  ```

## 50. **如何使用 CSS 选择奇数和偶数的子元素？**

- 使用伪类选择器`:nth-child(odd)`和`:nth-child(even)`：

  ```css
  .container > :nth-child(odd) {
    background-color: lightgray;
  }

  .container > :nth-child(even) {
    background-color: darkgray;
  }
  ```

## 51. **如何使用 CSS 变量创建一个主题系统？**

- 定义和使用 CSS 变量来实现主题系统：

  ```css
  :root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --font-size: 16px;
  }

  .theme-dark {
    --primary-color: #2c3e50;
    --secondary-color: #27ae60;
  }

  body {
    color: var(--primary-color);
    font-size: var(--font-size);
  }

  .button {
    background-color: var(--secondary-color);
  }
  ```

## 52. **如何使用 CSS 的`calc()`函数计算元素的宽度？**

- 使用`calc()`函数：
  ```css
  .element {
    width: calc(100% - 50px);
  }
  ```

## 53. **什么是 CSS 特性检测？如何使用？**

- CSS 特性检测是检测浏览器是否支持某个 CSS 特性，然后根据结果应用不同的样式。可以使用 Modernizr 库进行特性检测。
- 示例：

  ```css
  @supports (display: grid) {
    .container {
      display: grid;
    }
  }

  @supports not (display: grid) {
    .container {
      display: flex;
    }
  }
  ```

## 54. **如何使用 CSS 实现一个简单的帧动画？**

```css
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 2s ease-in-out;
}
```

## 55. **如何控制 CSS 动画的播放和暂停？**

- 使用`animation-play-state`属性：

  ```css
  .animation {
    animation: slide 4s infinite;
    animation-play-state: paused; /* 初始化为暂停 */
  }

  .animation:hover {
    animation-play-state: running; /* 悬停时播放 */
  }
  ```

## 56. **如何创建一个可以重复的 CSS 动画？**

- 使用`animation-iteration-count`属性：
  ```css
  .repeat-animation {
    animation: bounce 2s infinite; /* 无限次重复 */
  }
  ```

## 57. **如何处理旧版浏览器不支持 CSS3 特性的问题？**

- 使用渐进增强和优雅降级策略。
- 使用 Polyfill 和 Modernizr 等库来检测和提供兼容性支持。
- 提供替代样式或功能。

## 58. **解释渐进增强和优雅降级。**

- **渐进增强**：首先针对低版本浏览器提供基础功能，然后为高版本浏览器增加增强功能。
- **优雅降级**：首先开发完整功能，然后为低版本浏览器提供降级体验。

## 59. **CSS 中的`grid`和`flexbox`相比，有哪些新特性和优点？**

- **Grid**：
  - 适用于二维布局（行和列）。
  - 可以更简单地创建复杂布局，如网格布局。
  - 提供了更丰富的对齐和间距控制。
- **Flexbox**：
  - 适用于一维布局（单行或单列）。
  - 提供了简单的对齐和分布控件，适用于组件布局。

## 60. **什么是 CSS 的`contain`属性？**

- `contain`属性用于对某些元素的影响范围进行限制，从而提高渲染性能。
- 示例：
  ```css
  .contained {
    contain: layout paint;
  }
  ```

## 61. **什么是 CSS-in-JS？**

- CSS-in-JS 是一种将 CSS 直接写在 JavaScript 中的技术，允许在 JS 代码中定义和使用 CSS 样式。
- 常用库有 Styled Components、Emotion 等。

## 62. **CSS-in-JS 的优点和缺点是什么？**

- **优点**：
  - 样式与组件高度耦合，易于维护。
  - 动态样式生成，基于组件的状态和属性。
  - 避免全局样式冲突。
- **缺点**：
  - 可能导致性能开销，特别是在大型应用中。
  - 需要依赖 JavaScript 运行环境。

## 63. **什么是 CSS Houdini？**

- CSS Houdini 是一个项目，旨在让开发者能够通过 API 直接扩展 CSS 的功能，创建自定义的样式和布局。
- 允许开发者通过 JavaScript 访问和操作 CSS 解析引擎。

## 64. **解释 CSS 的层叠上下文（stacking context）和层叠顺序（stacking order）。**

- **层叠上下文**：是一个包含特定子元素的层叠层，子元素在该上下文中按特定的顺序堆叠。每个层叠上下文独立于其他上下文。
- **层叠顺序**：指元素在层叠上下文中的堆叠顺序，通常由`z-index`属性控制，`z-index`值越大，元素越靠上。

## 65. **如何实现 CSS 的动态主题切换？**

    - 使用 CSS 变量和 JavaScript 进行动态主题切换：

      ```css
      :root {
        --primary-color: #3498db;
        --background-color: #fff;
      }

      .dark-theme {
        --primary-color: #2c3e50;
        --background-color: #333;
      }

      body {
        color: var(--primary-color);
        background-color: var(--background-color);
      }
      ```

      ```javascript
      function toggleTheme() {
        document.body.classList.toggle('dark-theme')
      }
      ```

## 66. **解释并举例说明 CSS 中的`clamp()`函数。**

- `clamp()`函数用于设置一个值，使其在一个定义的最小值和最大值之间。
- 语法：`clamp(min, preferred, max)`
- 示例：
  ```css
  .element {
    font-size: clamp(12px, 2vw, 24px);
  }
  ```
  这个例子表示字体大小会在 12px 到 24px 之间，优先 2vw 的值。

## 67. **CSS 中的`min()`和`max()`函数的用途是什么？**

- `min()`函数返回两个或多个值中的最小值。
- `max()`函数返回两个或多个值中的最大值。
- 示例：
  ```css
  .element {
    width: min(50%, 300px); /* 取50%和300px中的较小值 */
    height: max(100px, 10vh); /* 取100px和10vh中的较大值 */
  }
  ```

## 68. **如何使用 CSS 创建线性渐变背景？**

- 使用`linear-gradient()`函数：
  ```css
  .background {
    background: linear-gradient(to right, red, yellow);
  }
  ```

## 69. **如何使用 CSS 创建径向渐变背景？**

- 使用`radial-gradient()`函数：
  ```css
  .background {
    background: radial-gradient(circle, red, yellow);
  }
  ```

## 70. **如何使用 CSS 实现图片的模糊效果？**

- 使用`filter: blur()`：
  ```css
  .blurred-image {
    filter: blur(5px);
  }
  ```

## 71. **如何使用 CSS 实现图片的灰度效果？**

- 使用`filter: grayscale()`：
  ```css
  .grayscale-image {
    filter: grayscale(100%);
  }
  ```

## 72. **如何使用 CSS 的`@keyframes`规则创建一个动画，并控制其方向？**

    ```css
    @keyframes slide {
      0% { transform: translateX(0); }
      100% { transform: translateX(100px); }
    }

    .animation {
      animation: slide 2s infinite alternate;
    }
    ```

## 73. **如何使用 CSS 控制动画的速度和延迟？**

- 使用`animation-duration`和`animation-delay`属性：
  ```css
  .animation {
    animation: slide 2s ease-in-out 1s infinite;
  }
  ```

## 74. **如何使用 CSS 的`clip-path`属性创建复杂的形状？**

- 使用`clip-path`创建不同形状的裁剪区域：

  ```css
  .circle {
    clip-path: circle(50%);
  }

  .polygon {
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  }
  ```

## 75. **如何使用 CSS 的`shape-outside`属性实现文本环绕非矩形图片的效果？**

- 使用`shape-outside`定义环绕形状，并结合`float`属性：
  ```css
  .image {
    float: left;
    shape-outside: circle(50%);
    width: 200px;
    height: 200px;
    clip-path: circle(50%);
  }
  ```

## 76. **如何结合使用 CSS Grid 和 Flexbox 实现复杂布局？**

- 在 Grid 容器中使用 Flexbox 布局：

  ```css
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  .grid-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ```

## 77. **如何使用媒体查询和 CSS 变量实现响应式字体大小？**

    ```css
    :root {
      --font-size: 16px;
    }

    @media (min-width: 600px) {
      :root {
        --font-size: 18px;
      }
    }

    @media (min-width: 900px) {
      :root {
        --font-size: 20px;
      }
    }

    body {
      font-size: var(--font-size);
    }
    ```

## 78. **如何使用 CSS 的`aspect-ratio`属性实现响应式图片？**

- `aspect-ratio`属性用于设置元素的宽高比：
  ```css
  .responsive-image {
    aspect-ratio: 16 / 9;
    width: 100%;
    object-fit: cover;
  }
  ```

## 79. **如何使用 CSS 实现滚动视差效果（Parallax Scrolling Effect）？**

- 使用背景固定和滚动速度差异实现滚动视差：

  ```css
  .parallax {
    background-image: url('image.jpg');
    height: 100vh;
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
  }

  .content {
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.8);
  }
  ```

## 80. **如何使用 CSS 实现打字机效果（Typing Effect）？**

- 使用`@keyframes`和`overflow`隐藏多余内容：

  ```css
  .typing-effect {
    width: 15ch;
    white-space: nowrap;
    overflow: hidden;
    border-right: 2px solid;
    animation: typing 3s steps(15), blink 0.5s step-end infinite alternate;
  }

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 15ch;
    }
  }

  @keyframes blink {
    from {
      border-color: transparent;
    }
    to {
      border-color: black;
    }
  }
  ```

## 81. **如何使用 CSS 实现一个渐变边框？**

- 使用`background`和`border-image`实现渐变边框：
  ```css
  .gradient-border {
    border: 5px solid;
    border-image: linear-gradient(to right, red, yellow) 1;
  }
  ```

## 82. **如何使用 CSS 实现一个波浪形的底部边框？**

- 使用`svg`和`clip-path`实现波浪形边框：

  ```html
  <svg width="0" height="0">
    <defs>
      <clipPath id="wave" clipPathUnits="objectBoundingBox">
        <path d="M0,0.5 C0.25,0.6 0.75,0.4 1,0.5 L1,1 L0,1 Z" />
      </clipPath>
    </defs>
  </svg>

  <div class="wave-border">Content here</div>
  ```

  ```css
  .wave-border {
    clip-path: url(#wave);
    background-color: lightblue;
    padding: 20px;
  }
  ```

## 83. **如何为打印设置特定的 CSS 样式？**

- 使用`@media print`设置打印样式：

  ```css
  @media print {
    body {
      font-size: 12pt;
      color: black;
    }

    .no-print {
      display: none;
    }
  }
  ```

## 84. **如何确保打印时表格内容分页不被截断？**

- 使用`page-break-inside: avoid`防止分页截断：
  ```css
  @media print {
    table {
      page-break-inside: avoid;
    }
  }
  ```

## 85. **如何使用 CSS 实现悬停效果和过渡动画？**

- 使用`:hover`伪类和`transition`属性：

  ```css
  .button {
    background-color: blue;
    transition: background-color 0.3s ease;
  }

  .button:hover {
    background-color: green;
  }
  ```

## 86. **如何使用 CSS 实现焦点样式？**

- 使用`:focus`伪类：
  ```css
  input:focus {
    outline: 2px solid blue;
  }
  ```

## 87. **列举几种常用的 CSS 框架，并简述其特点。**

- **Bootstrap**：
  - 提供响应式布局和组件。
  - 兼容性好，社区资源丰富。
- **Tailwind CSS**：
  - 实用类优先，提供大量可重用的工具类。
  - 高度可定制。
- **Bulma**：
  - 现代响应式框架，基于 Flexbox。
  - 语法简洁，易于上手。

## 88. **如何使用 PostCSS 进行 CSS 处理？**

- 使用 PostCSS 及其插件进行 CSS 处理，如自动添加前缀、压缩等：

  ```js
  // 安装PostCSS和插件
  npm install postcss postcss-cli autoprefixer cssnano

  // 创建postcss.config.js文件
  module.exports = {
    plugins: [
      require('autoprefixer'),
      require('cssnano')({
        preset: 'default',
      }),
    ],
  };
  ```

```bash
# 运行PostCSS处理CSS文件
npx postcss src/styles.css -o dist/styles.css
```

## 89. **如何使用 CSS 中的`@media`查询实现响应式设计？**

- 使用`@media`查询根据设备宽度设置样式：

  ```css
  @media (max-width: 600px) {
    .container {
      flex-direction: column;
    }
  }

  @media (min-width: 601px) {
    .container {
      flex-direction: row;
    }
  }
  ```

## 90. **如何使用 CSS 实现打印和屏幕的不同样式？**

- 使用`@media print`和`@media screen`分别设置打印和屏幕样式：

  ```css
  @media screen {
    body {
      background-color: white;
    }
  }

  @media print {
    body {
      background-color: none;
      color: black;
    }
  }
  ```

## 91. **如何使用 Flexbox 实现水平和垂直居中对齐？**

- 使用`align-items`和`justify-content`属性：
  ```css
  .centered {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  ```

## 92. **如何使用 Flexbox 实现等宽布局，但中间列宽度自适应？**

- 使用`flex`属性：

  ```css
  .container {
    display: flex;
  }

  .left,
  .right {
    flex: 0 0 200px; /* 固定宽度 */
  }

  .middle {
    flex: 1; /* 自适应宽度 */
  }
  ```

## 93. **如何处理不同浏览器对 CSS 网格布局的兼容性问题？**

- 使用自动添加前缀工具（如 Autoprefixer），确保老版本浏览器支持：
  ```css
  .grid-container {
    display: -ms-grid; /* 旧版IE支持 */
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  ```

## 94. **如何解决 Flexbox 在某些老旧浏览器中的兼容性问题？**

- 使用 Autoprefixer 等工具自动添加前缀：
  ```css
  .flex-container {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  ```

## 95. **如何使用 CSS 实现文本截断并显示省略号？**

- 使用`text-overflow`、`white-space`和`overflow`属性：
  ```css
  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  ```

## 96. **如何使用 CSS 实现一个响应式的固定比例容器？**

- 使用`padding`技巧实现响应式比例容器：

  ```css
  .responsive-container {
    position: relative;
    width: 100%;
    padding-top: 56.25%; /* 16:9比例 */
  }

  .responsive-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  ```

## 97. **如何使用 JavaScript 动态更改 CSS 变量的值？**

- 使用 JavaScript 修改 CSS 变量：

  ```javascript
  function changeThemeColor(color) {
    document.documentElement.style.setProperty('--primary-color', color)
  }
  ```

## 98. **如何使用 JavaScript 添加或移除 CSS 类名？**

- 使用`classList` API：

  ```javascript
  const element = document.querySelector('.my-element')
  element.classList.add('new-class')
  element.classList.remove('old-class')
  element.classList.toggle('active-class')
  ```

## 99. **解释 CSS 中的`initial`、`inherit`和`unset`值的作用。**

- **`initial`**：将属性值设置为其初始值。
- **`inherit`**：将属性值设置为从父元素继承的值。
- **`unset`**：如果该属性是继承属性，则继承父元素的值，否则设置为初始值。

## 100. **如何使用 CSS 实现自定义滚动条样式？**

- 使用`::-webkit-scrollbar`及其子伪元素：

  ```css
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    border-radius: 10px;
    border: 3px solid transparent;
    background-clip: content-box;
  }

  ::-webkit-scrollbar-track {
    background: lightgrey;
    border-radius: 10px;
  }
  ```
