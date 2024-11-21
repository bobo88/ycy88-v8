# CSS

::: tip 认知 7 问：CSS

1. **这是什么？**

   - CSS（层叠样式表）是一种样式表语言，用于描述网页文档的外观和布局。它允许开发者控制页面元素的显示方式，如字体、颜色、间距、布局等。

2. **它有什么用？**

   - CSS 主要用于设计网页的外观，使得网页更加美观、用户友好，并具有更好的可访问性。它通过与 HTML 和 JavaScript 配合，使网页内容呈现出统一和有层次的风格。

3. **为什么需要它？**

   - CSS 使得网页设计和内容分离，提高了代码的可维护性和可重用性。通过样式表，可以在一个地方定义网页元素的外观，然后在多个页面中复用，极大地减少了重复代码和工作量。

4. **它的核心原理是什么？**

   - CSS 通过选择器、属性和值来应用样式。选择器确定哪些 HTML 元素需要被样式化，属性则定义这些元素的样式，如颜色、字体、边距等。CSS 的层叠（cascade）机制决定了当有多个样式应用到同一个元素时，哪个样式优先。

5. **它有哪些优缺点？**

   - **优点**：
     - 提高网页加载速度：样式与内容分离，样式文件可以缓存。
     - 便于维护：样式的修改不需要修改 HTML 结构。
     - 响应式设计：可以轻松实现适应不同屏幕尺寸的布局。
   - **缺点**：
     - 跨浏览器兼容性：不同浏览器的渲染可能会有差异，导致样式表现不一致。
     - CSS 代码较长且复杂，尤其是当涉及到大量嵌套和层叠时，可能会增加调试的难度。

6. **在哪些情况下使用最合适？**

   - CSS 最适用于所有需要用户界面设计和布局的网页开发。尤其是在构建复杂的网页和应用时，CSS 是使页面美观、响应式、可访问的重要工具。

7. **未来的发展方向是什么？**
   - CSS 正在朝着更加简洁和强大的方向发展。随着 CSS 规范的更新，新的布局方式（如 CSS Grid 和 Flexbox）以及更强大的选择器和功能（如自定义属性、变量等）将进一步改善网页设计的灵活性和可维护性。同时，CSS 与 JavaScript 的协作将更加紧密，可能会出现更多动态的和程序化的样式控制方式。

:::

## 1. **CSS 基础概念**

- **CSS（层叠样式表）**：用于控制网页的外观和布局，定义 HTML 元素的样式（如颜色、字体、大小、位置等）。
- **CSS 选择器**：用于选择 HTML 元素进行样式设置。
  - **基本选择器**：类型选择器、类选择器、ID 选择器。
  - **组合选择器**：后代选择器、子选择器、相邻兄弟选择器、通用兄弟选择器。
  - **伪类选择器**：`:hover`, `:active`, `:focus` 等。
  - **伪元素选择器**：`::before`, `::after`, `::first-letter` 等。

::: tip CSS 样式的形式

- **内联样式（Inline Style）**：在 HTML 元素的 style 属性中直接写 CSS 样式。

```html
<p style="color: red; font-size: 16px;">This is an inline styled paragraph.</p>
```

- **内嵌样式（Internal Style）**：在 HTML 文件的 `<head>` 部分通过 `<style>` 标签嵌入 CSS 样式。

```html
<head>
  <style>
    p {
      color: blue;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <p>This paragraph is styled with internal CSS.</p>
</body>
```

- **外部样式（External Style）**：将 CSS 样式写在独立的 `.css` 文件中，通过 `<link>` 标签引入。

```html
<head>
  <link rel="stylesheet" href="styles.css" />
</head>
```

```css
/* styles.css */
p {
  color: green;
  font-size: 18px;
}
```

:::

## 2. **CSS 语法**

- **选择器**：确定哪个元素应用样式。
- **属性**：定义元素的样式，如颜色、大小等。
- **值**：为属性提供具体值，如 `color: red;` 中的 `red`。
- **声明块**：一对大括号内包含的属性和对应值。

## 3. **布局与定位**

- **盒模型**：定义元素的框架，包括内容、内边距（padding）、边框（border）、外边距（margin）。
  - **盒模型类型**：标准盒模型、IE 盒模型。
- **定位（Positioning）**：
  - **static**：默认值，元素按正常文档流排列。
  - **relative**：相对定位，元素相对于其原始位置移动。
  - **absolute**：绝对定位，元素相对于最近的已定位祖先元素定位。
  - **fixed**：固定定位，元素相对于视口固定。
  - **sticky**：粘性定位，元素在滚动到指定位置时固定。
- **浮动与清除浮动**：
  - **float**：让元素浮动，使得其他内容环绕。
  - **clear**：清除浮动影响，常用于清除浮动元素的容器。
- **弹性布局（Flexbox）**：
  - **容器属性**：`display: flex;`, `flex-direction`, `justify-content`, `align-items`。
  - **项属性**：`flex-grow`, `flex-shrink`, `flex-basis`, `align-self`。
- **网格布局（Grid）**：
  - **容器属性**：`display: grid;`, `grid-template-columns`, `grid-template-rows`, `grid-gap`。
  - **项属性**：`grid-column`, `grid-row`, `grid-area`。

::: tip CSS 样式与 HTML 进行关联，浏览器起到什么作用？
浏览器 扮演着 解析 `CSS` 和 `HTML` 并最终渲染页面的关键角色。它会识别和处理你在 `HTML` 中使用的标签和 **`CSS` 样式规则**。

- **解析 HTML**
- **解析 CSS**
  - 浏览器会同时解析 CSS 文件或 `<style>` 标签中的样式，并创建一个 **CSSOM（CSS 对象模型）**。CSSOM 是一个描述页面样式规则的数据结构。
- **将 DOM 和 CSSOM 合并成渲染树（Render Tree）**
  - 浏览器将 DOM 和 CSSOM 合并成一个渲染树，渲染树只包含需要显示的节点和这些节点的样式信息。
- **布局（Layout）**
  - 浏览器会计算每个节点在屏幕上的位置和大小，这一步称为布局或 **重排**。
- **绘制（Painting）**
  - 浏览器将渲染树中的每个节点转换为屏幕上的实际像素，这一步称为 **绘制**。
- **合成（Compositing）**
  - 浏览器将页面分成多个层，并分别进行合成，以优化渲染性能。
- **显示**
  - 最后，浏览器将合成后的层显示在屏幕上。
- **实时响应（动态样式更新）**
  - 当样式发生变化时，浏览器会重新计算样式、布局和绘制，以更新页面。

通过这个过程，浏览器能够高效地将 HTML 和 CSS 转换为用户可以与之交互的视觉界面。

:::

::: tip 浏览器是如何识别 CSS 选择器的？

- **选择器匹配**： 浏览器会通过选择器来查找与页面中相应 HTML 元素的匹配。例如，如果你在 CSS 中写了 .button，浏览器会扫描 DOM 中的所有元素，找到类名为 button 的元素，并将相关的样式应用到它们。
- **层叠性和优先级**： 如果有多个样式规则应用到同一个元素，浏览器会根据 CSS 优先级规则（例如 ID 优先于类、类优先于标签、内联样式优先于外部样式等）来选择最合适的样式。
- **动态样式更新**： 如果 JavaScript 操作了 DOM 或修改了 CSS 样式（比如通过 element.style 修改内联样式，或使用 JavaScript 动态修改类名等），浏览器会重新计算并应用新的样式。

:::

::: tip 为什么重排和重绘会影响性能？

- **重排（Reflow）** 是最昂贵的，因为它涉及到重新计算布局。每次重排时，浏览器会计算哪些元素的位置和尺寸发生了变化，然后更新布局模型。这通常会触发一系列的重新计算，甚至影响整个页面的渲染。
- **重绘（Repaint）** 较轻，但频繁的重绘同样也会消耗资源，尤其是在有大量复杂元素或动画效果的情况下。

:::

::: tip 重排和重绘的解决方案与优化方法

> _减少 DOM 操作、避免频繁重排、使用硬件加速的 transform 和 opacity 动画、通过 requestAnimationFrame 同步更新、合并样式修改、利用虚拟 DOM 优化、使用高效的 CSS 动画与过渡、以及应用延迟和节流技术，都是提升性能、减少重排和重绘开销的有效策略。_

1. **减少 DOM 操作**

   - **批量操作**：如果需要对多个 DOM 元素进行修改，尽量一次性修改，而不是每次都触发重排。比如，修改多次 DOM 时，先将元素从页面中移除，进行修改后再将其添加回去。
   - **避免频繁访问布局属性**：尽量避免读取布局属性（如 `offsetHeight`, `clientHeight`, `getBoundingClientRect` 等），因为这些读取操作会强制浏览器进行重排，尤其是在修改元素样式后。

2. **避免频繁的重排**

   - **使用 `transform` 和 `opacity` 进行动画**：使用 `transform` 和 `opacity` 进行动画时，浏览器不会触发重排，因为它们不影响元素的几何属性，而是通过图形渲染层来实现的。这两者的操作是基于硬件加速的，可以在不影响页面布局的情况下平滑地改变元素外观。
   - **避免修改布局相关的属性**：比如，避免频繁改变 `width`, `height`, `margin`, `padding` 等会影响布局的属性。如果必须改变这些属性，可以先将元素的 `display` 属性设置为 `none`，然后再修改属性，最后恢复 `display`。

3. **使用 `requestAnimationFrame`**

   - **同步更新**：`requestAnimationFrame` 可以帮助将一组 DOM 操作同步到浏览器的下一次重绘周期中，从而减少由于多次操作引起的多次重排和重绘。它将动画更新放入浏览器的渲染队列中，使得动画能够在浏览器的合适时机进行渲染。
   - 这样做可以确保浏览器只做一次渲染，而不是在每次动画更新时都进行计算和绘制。

4. **合并样式修改**

   - **避免频繁改变单个样式**：在修改元素样式时，尽量合并多个样式的修改。例如，使用 `classList` 批量操作类而不是直接修改多个样式属性，能减少对样式的多次计算。
   - 例如，给元素添加或移除一个类，通常比修改多个单独的 CSS 属性要高效。

5. **利用虚拟 DOM 或框架的优化**
   - **虚拟 DOM**：框架如 React、Vue 等使用虚拟 DOM 来优化页面的更新。在这些框架中，只有在数据真正改变时，才会对 DOM 进行更新。它们通过比较旧的虚拟 DOM 和新的虚拟 DOM 来确定哪些部分需要重新渲染，从而减少不必要的 DOM 操作，避免不必要的重排和重绘。
6. **使用 CSS 动画和过渡**

   - **CSS 动画** 和 **过渡** 是非常高效的，它们通常比 JavaScript 动画更加轻量。浏览器会在硬件加速的情况下处理这些动画，减少重排和重绘的开销。
   - 尽量利用 `transition` 和 `@keyframes` 来实现动画效果，避免手动更新元素的位置和尺寸，从而触发重排。

7. **延迟和节流（Debouncing and Throttling）**
   - 对于某些频繁触发的事件（如滚动、窗口调整大小、输入框键入等），可以使用 **节流（throttling）** 或 **防抖（debouncing）** 技术来限制事件处理的触发频率，减少页面的重排和重绘。
   - 例如，在处理窗口调整大小时，可以通过节流来确保不会在每次调整时都触发重新布局。

:::

::: tip 为什么“transition 和 @keyframes”这种方式能提高性能？

> _把操作关在笼子里。_

- **硬件加速**：浏览器的动画通常会利用硬件加速，尤其是 transform 和 opacity 动画，它们会直接交由 GPU 处理，不会触发重排，只会触发重绘，因此非常高效。开发者不需要手动计算每一帧的值，这使得动画更加流畅，并减少了对 DOM 树的影响。
  - **transform 和 opacity 的特点**：
    - **transform** 主要是改变元素的位置、缩放、旋转等，涉及的只是元素的视觉表现，而不影响元素的几何属性（比如大小、位置等），所以不会触发重排。
    - **opacity** 只是改变元素的透明度，同样不会影响元素的布局或其他样式。
  - **具体操作**：
    - 当你对一个元素应用 transform（如 translate(), rotate(), scale() 等）或 opacity 时，浏览器可以直接通过 GPU 来渲染这些变化。
    - 这些操作会在一个 **合成层**<span style="color:#f00;font-weight:bold">（注意这个）</span> 中处理，浏览器会将元素推送到独立的层中，在这个层上进行渲染，而不需要重新计算布局（不涉及重排）或重新绘制整个页面（不涉及重绘）。
- **优化渲染过程**：浏览器可以在合适的时机批量处理所有动画的变化，这比起逐帧手动控制动画要高效得多。

:::

::: tip 为什么 transform: scale() 不触发重排？

> _你可以将 transform（尤其是 scale）的效果理解为元素的“投影”或“虚拟表现”。这种“投影”与元素本身的实际尺寸和布局是分离的，浏览器在处理时不会影响元素的实际几何属性，而是通过 GPU 在图形层上进行渲染。_

transform 中的 **缩放（scale）** 操作会改变元素的尺寸，但它 **不会触发重排**，这是因为它的工作原理与直接修改元素的尺寸不同。

- transform 的运作方式：
  - transform 是通过创建一个 **图形渲染层**<span style="color:#f00;font-weight:bold">（注意这个，也就是上面提到的“合成层”）</span> 来处理的，这个层是独立于页面的布局和文档流之外的。它会将元素从文档流中抽离出来，在 GPU 上渲染，直接影响的是元素的视觉效果，而不影响元素的实际几何属性（如 width, height, top, left 等）。
  - 当你使用 scale() 来缩放元素时，浏览器并不会改变元素的真实尺寸，只是改变其显示比例。例如，scale(2) 会将元素在屏幕上显示为原来的两倍大，但它的实际尺寸（宽度和高度）并没有变化。

> <span style="color:#f60;text-decoration:underline">_假设你在一个画布上画了一张图，并且用一盏投影灯把它投影到墙上。无论你如何调整投影灯的位置，投影图像的大小和形状都会改变，但实际画布上的图像内容和位置是没有改变的，墙上的图像只是画布内容的一个显示版本。_</span>

:::

## 4. **文本与字体样式**

- **字体**：
  - **font-family**：定义字体。
  - **font-size**：字体大小。
  - **font-weight**：字体粗细。
  - **font-style**：字体样式（normal, italic）。
  - **font-variant**：字体变体（如小型大写字母）。
- **文本样式**：
  - **color**：文本颜色。
  - **text-align**：文本对齐方式（left, center, right）。
  - **text-transform**：文本大小写转换（uppercase, lowercase, capitalize）。
  - **line-height**：行高。
  - **letter-spacing**：字间距。
  - **word-spacing**：词间距。
  - **text-decoration**：文本装饰（如下划线 `underline`）。
  - **text-shadow**：文本阴影。
  - **white-space**：控制文本的换行行为。

## 5. **颜色与背景**

- **颜色**：
  - **color**：文本颜色。
  - **background-color**：背景颜色。
  - **opacity**：透明度（范围 0 - 1）。
- **背景**：
  - **background-image**：背景图像。
  - **background-position**：背景图像位置。
  - **background-size**：背景图像尺寸（如 `cover`, `contain`）。
  - **background-repeat**：背景图像重复方式（如 `repeat`, `no-repeat`）。
  - **background-attachment**：背景图像的附着方式（如 `fixed`, `scroll`）。

## 6. **边框与圆角**

- **边框**：
  - **border**：设置边框的宽度、样式和颜色。
  - **border-width**：边框宽度。
  - **border-style**：边框样式（如 `solid`, `dashed`）。
  - **border-color**：边框颜色。
- **圆角**：
  - **border-radius**：设置圆角半径，允许创建圆角矩形。

## 7. **内外边距**

- **内边距**（Padding）：
  - **padding**：设置元素的内边距。
  - **padding-top**, **padding-right**, **padding-bottom**, **padding-left**：分别设置四个方向的内边距。
- **外边距**（Margin）：
  - **margin**：设置元素的外边距。
  - **margin-top**, **margin-right**, **margin-bottom**, **margin-left**：分别设置四个方向的外边距。

## 8. **过渡与动画**

- **过渡（Transition）**：
  - **transition**：简写属性，用于定义过渡效果。
  - **transition-property**：指定过渡效果的属性。
  - **transition-duration**：定义过渡的持续时间。
  - **transition-timing-function**：定义过渡的速度曲线。
  - **transition-delay**：设置过渡的延迟时间。
- **动画（Animation）**：
  - **@keyframes**：定义动画的关键帧。
  - **animation**：简写属性，用于定义动画效果。
  - **animation-name**：指定动画名称。
  - **animation-duration**：动画持续时间。
  - **animation-timing-function**：动画速度曲线。
  - **animation-delay**：动画延迟时间。
  - **animation-iteration-count**：动画播放次数。
  - **animation-direction**：动画播放方向。

## 9. **响应式设计**

- **媒体查询（Media Queries）**：根据不同设备条件应用不同的样式。
  - **min-width**, **max-width**：用于设置宽度条件。
  - **min-height**, **max-height**：用于设置高度条件。
  - **orientation**：设置设备的方向（portrait 或 landscape）。

## 10. **表单样式**

- **输入框**：
  - **input[type="text"]**, **input[type="password"]**, **input[type="email"]** 等。
  - **textarea**：文本框样式。
- **按钮**：
  - **button**：按钮样式。
  - **input[type="submit"]**：提交按钮样式。
- **选择框与单选框**：
  - **select**, **option**：下拉选择框样式。
  - **input[type="checkbox"]**, **input[type="radio"]**：复选框与单选框样式。

## 11. **盒子阴影与文本阴影**

- **盒子阴影（box-shadow）**：
  - **box-shadow**：为元素添加阴影效果。
- **文本阴影（text-shadow）**：
  - **text-shadow**：为文本添加阴影效果。

## 12. **自定义属性**

- **CSS 变量**：
  - 使用 `--variable-name` 定义和使用自定义属性，简化样式的管理和重用。

## 13. **CSS3 新特性**

- **圆角（border-radius）**：创建圆角效果。
- **渐变（gradients）**：线性和径向渐变背景。
- **阴影（box-shadow, text-shadow）**：给元素和文本添加阴影效果。
- **媒体查询**：响应式布局的关键技术。
- **转换（Transform）**：
  - **rotate**, **scale**, **translate**, **skew**：用于元素的平移、缩放、旋转、倾斜。
- **3D 变换**：在二维变换的基础上增加深度。
- **Flexbox 和 Grid**：新布局模式，提高布局的灵活性和响应能力。

## 14. **预处理器：Sass、Less、Stylus**

| 特性     | Sass                    | Less              | Stylus                       |
| -------- | ----------------------- | ----------------- | ---------------------------- |
| 语法     | SCSS（兼容 CSS） / Sass | 类似 CSS          | 完全灵活，支持缩进或花括号   |
| 变量     | 支持                    | 支持              | 支持                         |
| 混入     | 支持                    | 支持              | 支持                         |
| 嵌套     | 支持                    | 支持              | 支持                         |
| 运算     | 支持                    | 支持              | 支持                         |
| 继承     | 支持                    | 不支持            | 支持                         |
| 函数     | 支持                    | 支持              | 支持                         |
| 可读性   | 高，SCSS 与 CSS 兼容    | 中等，类 CSS 语法 | 高，灵活的语法，适合不同风格 |
| 集成支持 | 与 Ruby 和 Node.js 兼容 | 主要用于 Node.js  | 与 Node.js 深度集成          |

::: tip Sass、Less、Stylus 的核心原理是什么？解决了什么问题？
**CSS 预处理器（如 Sass、Less 和 Stylus）** 的核心原理是通过在传统的 CSS 基础上引入更多编程功能（如变量、函数、条件语句、循环等），让样式表的编写和维护更加高效、灵活和可扩展。它们在生成 CSS 时，使用扩展的语法，通过编译过程将预处理器语言转换成普通的 CSS 文件。
:::
