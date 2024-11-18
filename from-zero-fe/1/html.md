# HTML

## 1. **HTML 基础结构**

- **文档类型声明**：`<!DOCTYPE html>`
  > 文档类型声明用于指定 HTML 文档所遵循的标准或规范。DOCTYPE 的目的是让浏览器知道应该如何解析 HTML 文档。<br/> HTML5 标准（2014 年发布）大大简化了 DOCTYPE 声明：`<!DOCTYPE html>`。
  - 文档类型声明的主要作用是告知浏览器该页面应以“标准模式”进行渲染。没有 DOCTYPE 声明，浏览器可能会进入“怪异模式”（Quirks Mode），这会导致页面在不同浏览器中的显示不一致，特别是旧版浏览器。
  - _作用：确保网页在不同浏览器中的一致性和准确性。_
- **根元素**：`<html>`
- **文档头部**：`<head>`
  - `<title>`：文档标题
  - `<meta>`：字符集、描述、关键词等
  - `<link>`：外部资源链接（如 CSS）
  - `<script>`：嵌入或外部 JavaScript
  - `<style>`：内联样式
- **文档主体**：`<body>`

## 2. **文本结构元素**

- **标题**：`<h1> - <h6>`
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
