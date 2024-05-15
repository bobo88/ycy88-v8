# 开发规范 CSS 篇

CSS 指层叠样式表 (Cascading Style Sheets)，定义如何显示 HTML 元素，但由于 CSS 天生全局性，随着项目复杂度增加，极易出现样式覆盖以及其它的问题。

## 一、通用规范

### 1.1 文件编码

- 为了避免内容乱码，统一使用 UTF-8 编码保存。
- 样式文件第一行设置字符集为 UTF-8

```css
@charset 'UTF-8'; /* 注意字符集说明应在第一行 */
```

### 1.2 缩进规范

统一使用两个空格缩进。（结合 .editorconfig 工具）

```js
// VS Code里面安装插件：EditorConfig for VS Code

// 配置 .editorconfig
[*.{js,jsx,ts,tsx,vue,md}]
indent_style = space
indent_size = 2
trim_trailing_whitespace = true
insert_final_newline = true
```

## 二、初始化规范

建议简单的进行样式全局初始化。不要在开发中途引入第三方 UI 库，不要大范围的全局初始化。

```css
* {
  padding: 0;
  margin: 0;
}
```

## 三、代码规范

### 3.1 命名规范

```html
class 应以功能或内容命名，不以表现形式命名 class 与 id
单词字母小写，多个单词组成时，采用中划线-分隔 使用唯一的 id 作为 Javascript
hook, 同时避免创建无样式信息的 class
```

### 3.2 代码风格

- 统一使用展开格式，不推荐紧凑格式

```css
/* 展开格式 */
.test {
  color: red;
  font-size: 12px;
}
```

```
/* 紧凑格式 */
.test {color: red; font-size: 12px;}
```

- 统一两个空格缩进
- 属性声明结尾加分号
- 选择器与左括号之间一个空格，属性冒号后一个空格
- 不要为 0 指明单位
- 颜色值和属性值十六进制数值能用简写的尽量用简写
- 引号使用: url() 、属性选择符、属性值使用单引号
- 清除浮动: 当元素需要撑起高度以包含内部的浮动元素时，通过对伪类设置 clear 或触发 BFC 的方式进行 clearfix。尽量不使用增加空标签的方式。

### 3.3 选择器规范

在严格遵照 BEM(Block Element Modifier)时，建议只使用类选择器，但 BEM 书写麻烦，所以建议如下

- 禁用通用选择器 \*
- 不使用无具体语义定义的标签选择器

### 3.4 属性顺序

建议使用下列顺序进行书写，而不是随意的想到一个属性就写一个

- 定位属性（position、display、float、left、right）
- 尺寸属性（width、height、padding、margin、border）
- 字体属性（color、font、text-align）
- 其他属性（background、cursor、outline）

目的是在浏览代码时，能逐步清晰目标元素的效果。

```css
.test {
  display: block;
  position: relative;
  float: left;
  width: 100px;
  height: 100px;
  margin: 0 10px;
  padding: 20px 0;
  font-size: 12px;
  color: #333;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}
```

## 四、注释规范

### 4.1 单行注释: 注释以 /\* 开始，以 \*/ 结束,注释内不能嵌套注释，注释内容前后空一个空格。

```css
/* 推荐的单行注释 */
/*不推荐的单行注释*/
```

### 4.2 模块注释: 有时候我们需要对一个模块(一段代码块)进行功能性说明，并希望能明显区分其它代码，我们可以模块注释的方式。

注释以 /\* 开始，以 \*/ 结束，前后空一个空格，第一行填写描述，最后一行行填写分割线。

```css
/* 推荐的模块注释
---------------------------------------------------- */
```

### 4.3 文件信息注释

如果需要对一个文件进行功能性说明，方便其他人快速明白该文件的作用，推荐在文件开头(字符集说明下)写入下列注释，注释内容包括文件描述、创建人、创建时间等。

```css
@charset "UTF-8";
/**
 * @desc 文件功能描述，方便其他人快速理解
 * @author 创建人
 * @date 创建时间
 */
```

## 五、覆盖规范

- 尽可能少用 !important vue 单文件组件统一使用 css/less/sass scoped
- 每个页面/组件需要有一个全局唯一的标识
- id/class，属于它下面的样式都需要加上该唯一标识
- 避免全局修改已有样式，必须具体到页面上(通过权重)
- 禁用全匹配\*选择器（特殊情况除外，如初始化）

## 六、媒体查询

常见尺寸：

| 大小    |                描述 |
| ------- | ------------------: |
| ≥1366px | 大屏幕 大桌面显示器 |
| ≥1200px | 中等屏幕 桌面显示器 |
| ≥992px  | 中等屏幕 桌面显示器 |
| ≥768px  |         小屏幕 平板 |
| <768px  |       超小屏幕 手机 |

## 七、单位规范

CSS 单位有两种，分别是绝对单位和相对单位。

- 常用绝对单位
  - px：像素 (计算机屏幕上的一个点)
  - cm：厘米
  - in：英寸
  - pt：磅 (1 pt 等于 1/72 英寸)
- 常用相对单位
  - %：父元素百分比
  - vw：视口宽度百分比
  - vh：视口高度百分比
  - em：当前字体倍数
  - rem：根元素字体倍数
  - \* rpx：微信小程序专用，规定屏幕宽为 750rpx

使用较多的单位有 px、%、rem 三种，建议 PC 端用 px 单位、移动端用 rem，需要具体控制尺寸还是使用 px。

## 八、兼容性规范

| 浏览器         |  内核   |     前缀 |
| -------------- | :-----: | -------: |
| Firefox        |  Gecko  |    -moz- |
| Chrome         | WebKit  | -webkit- |
| IE             | Trident |     -ms- |
| Safari         | WebKit  | -webkit- |
| Opera          | Presto  |      -o- |
| 国内知名浏览器 | WebKit  | -webkit- |
| 常见手机浏览器 | WebKit  | -webkit- |

CSS3 浏览器私有前缀在前，标准前缀在后

```css
.test {
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -o-border-radius: 10px;
  -ms-border-radius: 10px;
  border-radius: 10px;
}
```

备注：在 webpack 环境下，可以使用 postcss-loader 自动添加私有前缀。

参考：<br />
<a href="https://juejin.cn/post/6844903874071887886" target="_blank">前端规范之 CSS 规范</a><br />
<a href="https://www.ucloud.cn/yun/115097.html" target="_blank">stylelint 规则</a><br />
<a href="https://stylelint.bootcss.com/" target="_blank">stylelint 中文文档</a><br />
