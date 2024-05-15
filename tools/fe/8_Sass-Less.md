# Sass & Less 的简单对比

::: tip Sass: star 14.2k / Contributors 19
Sass 是一款强化 CSS 的辅助工具，它在 CSS 语法的基础上增加了变量 、嵌套 、混合 、导入 等高级功能，这些拓展令 CSS 更加强大与优雅。
:::

::: tip Less: star 16.9k / Contributors 250
Less 是一门 CSS 预处理语言，它扩展了 CSS 语言，增加了变量、Mixin、函数等特性，使 CSS 更易维护和扩展，它可以运行在 Node 或浏览器端。
:::

## 一、Sass 与 Less 的异同：

```html
<!-- 1. 相同点： -->
混入(Mixins): class中的class； 参数混入: 可以传递参数的class，就像函数一样；
嵌套规则: class中嵌套class，从而减少重复的代码； 运算: CSS中用上数学； 颜色功能:
可以编辑颜色； 名字空间(namespace): 分组样式，从而可以被调用； 作用域:
局部修改样式； JavaScript赋值: 在CSS中使用JavaScript表达式赋值。
```

```html
<!-- 2. 区别： -->
Less是基于JavaScript，是在客户端处理的。 Sass是基于Ruby的，是在服务器端处理的。
关于变量在Less和Sass中的唯一区别就是Less用@，Sass用$。
```

## 二、安装和使用

```js
// 1. Sass 的安装和使用
$ npm install -g sass
// 2. 安装 Sass 后，您可以运行sass可执行文件进行编译 .sass并将.scss文件转换为.css文件
$ sass source/stylesheets/index.scss build/stylesheets/index.css
```

```js
// 1. Less 的安装和使用
$ npm install -g less
// 2. 安装 Less 后，您可以运行less可执行文件进行编译 .less并将.less文件转换为.css文件
$ lessc styles.less styles.css
```

## 三、附带几个 DEMO

Less DEMO:

```less
// index.less
@some: foo;

div {
  margin: if((2 > 1), 0, 3px);
  color: if((iscolor(@some)), @some, black);
}

// 运行命令： lessc index.less index.css 后生成
div {
  margin: 0;
  color: black;
}
// https://lesscss.org/functions/
```

Sass DEMO:

```scss
// index.scss
$type: monster;
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}

// 运行命令： sass index.scss abc.css 后生成
p {
  color: green;
}

// https://www.sass.hk/docs/
```

参考地址：<br/>
<a href="https://www.sass.hk/" target="_blank">Sass 中文网</a> <br/>
<a href="https://sass-lang.com/" target="_blank">Sass 英文官网</a> <br/>
<a href="https://lesscss.org/" target="_blank">Less 英文官网</a> <br/>
