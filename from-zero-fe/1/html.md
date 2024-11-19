# HTML

::: warning HTML
HTML 更多的是一种规范，编码的规范，如果不按照规范来，可能会有意想不到的结果。它是给浏览器看的，浏览器会根据规范来渲染页面。
:::

## 1. **HTML 基础结构**

- **文档类型声明**：`<!DOCTYPE html>`
  > 文档类型声明用于指定 HTML 文档所遵循的标准或规范。DOCTYPE 的目的是让浏览器知道应该如何解析 HTML 文档。<br/> HTML5 标准（2014 年发布）大大简化了 DOCTYPE 声明：`<!DOCTYPE html>`。
  - 文档类型声明的主要作用是告知浏览器该页面应以“标准模式”进行渲染。没有 DOCTYPE 声明，浏览器可能会进入“怪异模式”（Quirks Mode），这会导致页面在不同浏览器中的显示不一致，特别是旧版浏览器。
  - _作用：确保网页在不同浏览器中的一致性和准确性。_
- **根元素**：`<html>`
  - `<html>` 元素是 HTML 文档的根元素，所有 HTML 元素都应当位于 `<html>` 标签内。它包裹着整个文档内容，包括头部（`<head>`）和主体（`<body>`）
    > 注意：如果 HTML 元素不写在`<html>`标签内，现在浏览器也会将其纳入到`<html>` 标签内（但是多余的`<html>`和`<body>`只能显示其内部的内容而不能显示标签，也就是说一个页面中不能存在多个`<html>`或`<body>`）。
    > ![An image](/images/from-zero/fe/html-1.png) ![An image](/images/from-zero/fe/html-2.png)
- **文档头部**：`<head>`
  > `<head>` 是 HTML 文档的元数据部分，通常不直接呈现在页面内容中，但它包含了与文档相关的关键信息，例如标题、字符编码、外部资源的链接等。所有用于页面的元信息和外部文件引用都放在 `<head>` 中。
  - `<title>`：文档标题
  - `<meta>`：字符集、描述、关键词等
  - `<link>`：外部资源链接（如 CSS）
  - `<script>`：嵌入或外部 JavaScript
    - defer 和 async 属性：
      - defer：表示脚本会延迟到 HTML 文档完全解析后再执行。
      - async：表示脚本在下载后会立即执行，不会等待文档的解析。
  - `<style>`：内联样式
- **文档主体**：`<body>`

## 2. **文本结构元素**

- **标题**：`<h1> - <h6>`
  - 为什么不同标题元素自带样式效果？
    - `<h1>` 到 `<h6>` 标签是 `HTML` 中定义标题的元素，它们自带样式效果的原因主要来自于 **`HTML` 的语义化** 和 **浏览器的默认样式设置**。
    - 浏览器的 **默认样式** 是由浏览器自带的一个 **用户代理样式表**（User Agent Stylesheet）定义的。
    - 每个浏览器都内置了一个用户代理样式表，它包含了浏览器对所有 HTML 元素的默认样式定义。为了确保网页即使没有任何外部样式（CSS），也能够以某种合理的方式展示内容而应用的默认样式。
      > ![An image](/images/from-zero/fe/html-3.png)
- **段落**：`<p>`
- **文本格式化标签**：
  - **强调**：`<em>`, `<strong>`
  - **删除线**：`<del>`, `<ins>`
  - **代码**：`<code>`, `<pre>`, `<samp>`
  - **引用**：`<blockquote>`, `<q>`
  - **换行符**：`<br>`
- **列表**：
  - **无序列表**：`<ul>`, `<li>`
  - **有序列表**：`<ol>`, `<li>`
  - **定义列表**：`<dl>`, `<dt>`, `<dd>`

## 3. **链接和导航**

- **超链接**：`<a href="">`
- **锚点链接**：`<a name="">`
- **内联链接**：`<a href="#" role="button">`

## 4. **表单元素**

- **表单标签**：`<form>`
- **输入字段**：
  - **文本输入**：`<input type="text">`, `<textarea>`
  - **选择框**：`<select>`, `<option>`, `<optgroup>`
  - **单选框和复选框**：`<input type="radio">`, `<input type="checkbox">`
  - **按钮**：`<button>`, `<input type="submit">`, `<input type="reset">`
- **隐藏字段**：`<input type="hidden">`
- **日期和时间**：`<input type="date">`, `<input type="time">`, `<input type="datetime-local">`
- **文件上传**：`<input type="file">`
- **标签**：`<label>`

## 5. **媒体元素**

- **图像**：`<img src="" alt="">`
- **视频和音频**：
  - **视频**：`<video>`, `<source>`
  - **音频**：`<audio>`, `<source>`
- **嵌入内容**：
  - **iframe**：`<iframe src="">`
  - **对象**：`<object>`, `<embed>`, `<param>`

## 6. **布局元素**

- **块级元素**：`<div>`, `<section>`, `<article>`, `<header>`, `<footer>`, `<main>`
- **行内元素**：`<span>`, `<a>`, `<b>`, `<i>`
- **表格**：
  - **表格结构**：`<table>`, `<tr>`, `<td>`, `<th>`, `<thead>`, `<tbody>`, `<tfoot>`
  - **表格属性**：`colspan`, `rowspan`
- **栅格系统**：使用 `<div>` 和 CSS Flexbox 或 Grid 布局

## 7. **HTML5 新特性**

- **语义化标签**：
  - **结构性标签**：`<header>`, `<footer>`, `<nav>`, `<section>`, `<article>`, `<aside>`
  - **多媒体标签**：`<video>`, `<audio>`, `<source>`
- **表单控件**：
  - **日期、时间、颜色等输入类型**：`<input type="date">`, `<input type="color">`
  - **内容 editable**：`<div contenteditable="true">`
- **Web 存储**：`localStorage`, `sessionStorage`
- **Canvas**：`<canvas>`
- **拖放 API**：`<div draggable="true">`

## 8. **属性**

- **常见全局属性**：
  - **id**：唯一标识符
  - **class**：指定一个或多个类
  - **style**：内联样式
  - **title**：元素的提示信息
  - **data-**：自定义数据属性
  - **lang**：语言标识符
- **链接和表单属性**：
  - **href**：超链接目标地址
  - **action**：表单提交的目标地址
  - **method**：表单提交方法（GET/POST）
  - **target**：超链接打开方式（\_self, \_blank, \_parent, \_top）

## 9. **访问性和 SEO**

- **ARIA 属性**：`role`, `aria-label`, `aria-hidden`
- **SEO 优化**：
  - **语义化 HTML**：使用合适的标签和结构
  - **元标签**：`<meta>` 标签中的关键词、描述等
  - **标题优化**：合理使用 `<h1> - <h6>`
- **键盘导航**：确保表单和控件支持键盘操作
- **图像和链接的替代文本**：使用 `alt` 和 `title` 属性

## 10. **HTML 文档与网页配置**

- **字符集声明**：`<meta charset="UTF-8">`
- **Viewport 设置**：`<meta name="viewport" content="width=device-width, initial-scale=1">`
- **引入外部文件**：`<link>` (CSS), `<script>` (JS)
