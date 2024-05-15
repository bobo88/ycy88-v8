# husky 的作用

::: danger 注意

1. 一定要看相关依赖的最新官网（因为版本不同的话，用法也有较大区别）
   :::

我们在前端团队开发协作中，可以做一些约定。

- 比如开发文档类的约定，命名规范，开发规范等；
- 还有一些代码工具检查类的约定，必须安装 ESLint(检查语法问题) / Prettier(格式化代码) 等。

以上约定或者说开发规范，在一定程度上能保证团队开发代码的质量，但这依然不够。

因为我们无法保证所有团队成员提交的代码都是严格按照 ESlint 等工具处理后再提交的。

所以我们需要在代码提交的时候，做一种「强规范」的验证。

Husky 是一个工具，它允许我们轻松地处理 Git Hooks 并在提交代码时运行我们想要的脚本。

::: tip husky 的作用
husky 可以防止使用 Git hooks 的一些不好的 commit 或者 push。
:::

## 一、 Git hooks

git hook，也就是常说的 Git 钩子。<br/>
和其它版本控制系统一样，Git 能在特定的重要动作发生时触发自定义脚本。有两组这样的钩子：客户端的和服务器端的。 客户端钩子由诸如提交和合并这样的操作所调用，而服务器端钩子作用于诸如接收被推送的提交这样的联网操作。 你可以随心所欲地运用这些钩子。<br/>

其中，客户端钩子我们可能用的比较多，客户端钩子通常包括了提交工作流钩子、电子邮件工作流钩子和其它钩子。这些钩子通常存储在项目的.git/hooks 目录下，我们需要关注的主要是提交工作流钩子。提交工作流钩子主要包括了以下四种：

- pre-commit：该钩子在键入提交信息前运行。 它用于检查即将提交的快照。如果该钩子以非零值退出，Git 将放弃此次提交，你可以利用该钩子，来检查代码风格是否一致。<br/>
- prepare-commit-msg：该钩子在启动提交信息编辑器之前，默认信息被创建之后运行。 它允许你编辑提交者所看到的默认信息。 <br/>
- commit-msg：该钩子接收一个参数，此参数存有当前提交信息的临时文件的路径。 如果该钩子脚本以非零值退出，Git 将放弃提交，因此，可以用来在提交通过前验证项目状态或提交信息。<br/>
- post-commit：该钩子一般用于通知之类的事情。<br/>

在上面的钩子中，我们需要关注 pre-commit 和 commit-msg 钩子。

## 二、「强约束」成员

### 1. Husky

Husky 是常见的 git hook 工具，使用 husky 可以挂载 Git 钩子，当我们本地进行 git commit 或 git push 等操作前，能够执行其它一些操作，比如进行 ESLint 检查，如果不通过，就不允许 commit 或 push。

### 2. Lint-staged

Lint-staged 可以在 git staged 阶段的文件上执行 Linters，简单说就是当我们运行 ESlint 或 Stylelint 命令时，可以通过设置指定只检查我们通过 git add 添加到暂存区的文件，可以避免我们每次检查都把整个项目的代码都检查一遍，从而提高效率。<br/>
其次，Lint-staged 允许指定不同类型后缀文件执行不同指令的操作，并且可以按步骤再额外执行一些其它 shell 指令。

### 3. Commitlint

在使用 Git 提交代码时，通常都需要填写提交说明，也就是 Commit Message。<br/>
通过结合 husky 一起使用，可以在开发者进行 commit 前就对 Commit Message 进行检查，只有符合规范，才能够进行 commit。

## 三、DEMO 实践

### 1. 新建项目

```js
// 创建 VUE3 项目： husky-basic
$ pnpm create vue@3

// 安装依赖
$ pnpm i
```

### 2. 安装配置 Husky

```js
// 2.1 安装
$ npm i husky -D

// 2.2 Edit package.json > prepare script and run it once:
$ npm set-script prepare "husky install"
$ npm run prepare
// 运行上述 2.2 步骤， package.json里面会自动生成如下代码
"scripts": {
  "prepare": "husky install"
},

// 2.3 Add a hook:
$ npx husky add .husky/pre-commit "npm test"
$ git add .husky/pre-commit
// 运行上述 2.3 步骤后，在package.json里面新增 test 命令
"scripts": {
  //...
  "test": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs --fix --ignore-path .gitignore"
},

// 2.4 Make a commit:
// 当提交commit代码时，husky会触发 npm test 命令，执行 eslint 代码校验
$ git commit -m "Keep calm and commit"
// # `npm test` will run
```

DEMO 步骤验证截图：

![An image](/images/tools/husky.png)

### 3. 配置 lint-staged

```js
// 3.1 安装
$ pnpm i lint-staged -D

// 3.2 添加命令
$ npx husky add .husky/pre-commit "npx --no-install lint-staged"

// 3.3 配置 package.json
"lint-staged": {
  "*.vue": [
    "eslint --fix",
    "stylelint --fix"
  ],
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix"
  ],
  "*.{htm,html,css,sss,less,scss,sass}": [
    "stylelint --fix"
  ]
},
```

在 .husky/pre-commit 文件，具体如下：

```js
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no-install lint-staged
```

### 4. 验证是否有效

分别在 src/App.vue 和 src/main.js 里面声明两个未使用的变量：

```vue
<script setup>
// 省略其他...
var inAppNotUsed = 1234
</script>

<template>
  <!-- 省略... -->
</template>

<style scoped>
/* 省略... */
</style>
```

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'
// 声明但未使用
var inMainjsNotUsed = 1234

createApp(App).mount('#app')
```

git 提交试试

```shell
# add到暂缓区
git add .

# commit 提交
git commit -m 'add'
```

![An image](/images/tools/husky_2.png)

![An image](/images/tools/husky_3.png)

### 5. 配置 commitlint

```js
// 1. 安装
$ npm i @commitlint/cli @commitlint/config-conventional -D
// OR
$ yarn add @commitlint/cli @commitlint/config-conventional -D
// @commitlint/cli 可以检查提交信息
// @commitlint/config-conventional 是提交规范的配置包

// 2. 添加命令
$ npx husky add .husky/commit-msg "npx --no -- commitlint --edit ${1}"

// 3. 配置
// 配置可以在commitlint.config.js, .commitlintrc.js, .commitlintrc, .commitlintrc.json, .commitlintrc.yml文件或commitlint.package.json
// ====== .commitlintrc.js
/*
  规范commit日志
  https://commitlint.js.org
*/

const types = [
  'build',    // 主要目的是修改项目构建系统（例如glup，webpack，rollup的配置等）的提交
  'ci',       // 修改项目的持续集成流程（Kenkins、Travis等）的提交
  'chore',    // 构建过程或辅助工具的变化
  'docs',     // 文档提交（documents）
  'feat',     // 新增功能（feature）
  'fix',      // 修复 bug
  'pref',     // 性能、体验相关的提交
  'refactor', // 代码重构
  'revert',   // 回滚某个更早的提交
  'style',    // 不影响程序逻辑的代码修改、主要是样式方面的优化、修改
  'test',     // 测试相关的开发,
],
typeEnum = {
  rules: {
    'type-enum': [2, 'always', types],
  },
  value: () => {
    return types;
  },
};

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': typeEnum.rules['type-enum'],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
  },
};
```

![An image](/images/tools/husky_4.png)

## 四、完整的命令流程

```js
$ npm i husky lint-staged @commitlint/cli @commitlint/config-conventional -D

$ npm set-script prepare "husky install"
$ npm run prepare

$ npx husky add .husky/pre-commit "npx --no-install lint-staged"
$ npx husky add .husky/commit-msg "npx --no -- commitlint --edit ${1}"
```

## 五、DEMO 源码

<a href="https://github.com/bobo88/husky-basic" target="_blank">husky-basic </a><br />

参考：<br />
<a href="https://git-scm.com/docs/githooks" target="_blank">githooks 官网</a><br />
<a href="https://www.npmjs.com/package/husky" target="_blank">husky npm 地址</a><br />
<a href="https://typicode.github.io/husky/#/" target="_blank">husky 文档</a><br />
<a href="https://www.npmjs.com/package/lint-staged" target="_blank">lint-staged npm 地址</a><br />
<a href="https://commitlint.js.org/#/" target="_blank">commitlint 文档</a><br />
<a href="https://blog.51cto.com/u_15064655/4394892" target="_blank">前端规范之 Git 工作流规范（Husky + Comminilint + Lint-staged）</a><br />
