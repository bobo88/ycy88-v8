# 初探 React

::: tip React 概念
用于构建用户界面的 JavaScript 库，特点：声明式 / 组件化 / 跨平台。
:::

React 是由 Facebook 在 2013 年开源的 Javascript 库。

它有几个明显的特点：

- JSX 语法组件化开发，函数式编程；
- 虚拟 DOM（Virtual DOM）
- Diff 算法
  ::: warning 注意
  JSX 语法，最终会被编译为 createElement() 方法
  :::

## 一、React 发展史

```html
1. createClass 创建组件时期：React 15.5版本开始官方不再推荐，React
16版本彻底放弃（2017年9月）； 2. Class 声明组件时期 3. 无状态函数式组件 + React
Hooks时期：React 16.8推出Hooks概念（2019年2月）。
```

## 二、React 全家桶

- react: 整体架构，类似【vue】
- redux || mobx: 状态管理，类似【vuex】
- react-router: 路由，类似【vue-router】
- axios: ajax 请求，与 vue 相同
- antd || react-material || antd-model: UI 框架库，类似【elementUI】
- 脚手架工具 create-react-app:
  - 方式一：
    - 1、全局安装：npm i -g create-react-app
    - 2、创建项目： create-react-app 项目名称
  - 方式二：
    - npx create-react-app 项目名称

参考：
<a href="https://zh-hans.reactjs.org/" target="_blank">React 中文文档</a> <br/>
