# 开发规范 VS Code 篇

> vscode 开发必备的插件

## vue3 开发必备的插件 volar

::: warning volar 踩坑

1. vscode 不对 vue 单文件进行任何 TS 语法提示，这个问题可能是系统或者 vscode 环境破坏了导致的，一定要卸载 vscode 重新装

2. vscode 卸载重新装的时候，总是原来的插件和配置依然存在，是因为没有删除系统 C 盘里面的 vscode 文件夹，一定要删除原来的配置才不会保存

:::

vue language features(Volar)提供了很多新的功能，支持 vue 的开发
typescript vue plugin(volar)

[什么是 volar 接管模式](https://cn.vuejs.org/guide/typescript/overview.html#ide-support)

### 1.vue language features(Volar)

提供了 Vue 单文件组件中的 TypeScript 支持，还伴随着一些其他非常棒的特性。比如 templete 支持多标签

### 2.typescript vue plugin(volar)

用于支持在 TS 中 import \*.vue 文件。

## ESLint

提供 eslint 语法提示和语法自动修复的功能，和插件 prettier 搭配使用的时候需要解决两个之间的冲突。eslint 的配置详细见 eslint 的配置文献

## Prettier - Code formatter

用来格式化代码，搭配 eslint 一起使用，往往会和 eslint 有冲突，那么需要配置 prettier 的配置文件。
一般是在项目根目录创建 .prettierrc.json 文件,配置如下：

```js
//.prettierrc.json
{
  "$schema": "https://json.schemastore.org/prettierrc",
  "semi": true, //指定是否在语句末尾添加分号。默认为 true。
  "tabWidth": 2,//指定一个制表符等于多少个空格。默认为 2。
  "doubleQuote": true,//指定启用双引号
  "printWidth": 100, //指定每行代码的最大宽度。默认为 80。
  "trailingComma": "all",  // 是否使用尾逗号，有三个可选值"<none|es5|all>"
  "eslintIntegration": true //让prettier使用eslint的代码格式进行校验
}
```

## chinese(Simplified)...

vscode 汉化中文包。

## javaScript(ES6)code snippets

es6 语法提示
