# 脚手架搭建 VUE 项目

::: warning Vue CLI 现已处于维护模式!
现在官方推荐使用 create-vue 来创建基于 Vite 的新项目。另外请参考 Vue 3 工具链指南 以了解最新的工具推荐。
:::

## 方式一：Vue CLI

```js
// 1. 安装
npm install -g @vue/cli
// # OR
yarn global add @vue/cli

// 2. 创建一个项目
vue create my-project
// # OR
vue ui
```

## 方式二：create-vue （官方推荐）

```js
// 创建一个VUE3项目
// 1. 运行命令
npm create vue@3

// 注意：首次使用上述命令创建项目时，会有如下提示，输入「y」或直接回车键即可。
// Need to install the following packages:
//   create-vue@3
// Ok to proceed? (y) y

// 2. 选择项目的个性化配置：比如是否选择 router / pinia / eslint / typescript 等。
```

```js
// 创建一个VUE2项目
// 1. 运行命令
npm create vue@2

// 注意：首次使用上述命令创建项目时，会有如下提示，输入「y」或直接回车键即可。
// Need to install the following packages:
//   create-vue@2
// Ok to proceed? (y) y

// 2. 选择项目的个性化配置：比如是否选择 router / pinia / eslint / typescript 等。
```

## 方式三：Vite

```js
// 1. 运行命令
$ yarn create vite

// 2. 根据提示选择 VUE
```

然后按照提示操作即可！

参考：<br />
<a href="https://cli.vuejs.org/zh/" target="_blank">Vue CLI 配置</a><br />
<a href="https://github.com/vuejs/create-vue" target="_blank">create-vue</a><br />
<a href="https://cn.vitejs.dev/" target="_blank">Vite 官方中文</a><br />
