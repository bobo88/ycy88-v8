# VUE 3 引入 sass

::: tip Sass 与 Scss
Sass(Syntactically Awesome StyleSheets): Sass 是一款强化 CSS 的工具，它可以让我们更好的管理和组织样式文件，提高工作效率。

Scss(Sassy CSS): 是 Sass 3 引入新的语法，是 Sassy CSS 的简写，是 CSS3 语法的超集。简单来说，就是 Scss 基于 Sass 而产生。
:::

## 一、安装

```js
npm i sass node-sass sass-loader -D
// OR
yarn add sass node-sass sass-loader -D
```

## 二、使用

```jsx
// 1. 直接在 .vue 文件中使用
<style lang="scss" scoped></style>

// 2. 或者建立 .scss 后缀名的文件，按照sass的编写规则即可
```
