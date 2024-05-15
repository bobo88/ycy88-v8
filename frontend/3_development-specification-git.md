# 开发规范 Git 篇

::: tip 概念
Git commit message 规范： 现在市面上比较流行的方案是 约定式提交规范（Conventional Commits）。
:::

### 规范提交的好处：

- 便于程序员对提交历史进行追溯，了解发生了什么情况。
- 约束每一次提交，提升代码改动历史的清晰度。
- 格式化的 Commit Message 才可以用于自动化输出 Change log。
- 方便集成 GitLab && JIRA 实现自动化 workflow。

## 一、Git 提交规范

```jsx
// 格式如下：
<type>(<scope>):<subject>
<body>
<footer>

{/* 格式解读 */}
<类型>[可选的作用域]: <描述>
[可选的正文]
[可选的脚注]

名称	作用
type	用于说明 Git Commit 的类别，只允许使用下表的标识
scope	用于说明 Commit 影响的范围，比如数据层、控制层、视图层等
subject	Commit 目的的简短描述，一般不超过50个字符
body	可忽略，可多行，详细的描述，与header之间空一行
footer	可忽略，一般用于不兼容更新或关闭issue，与body之间空一行

备注：subject是 commit 目的的简短描述，不超过50个字符。
1. 以动词开头，使用第一人称现在时，比如change，而不是changed或changes
2. 第一个字母小写
3. 结尾不加句号（.）
```

```html
类型 描述
<!-- 主要 Type -->
fix 修复bug，可以是QA发现的bug，也可以是研发自己发现的bug feat 新功能（feature）

<!-- 特殊 Type -->
docs 文档撰写或更新 style 格式，不影响代码运行的变动 chore
构建过程或辅助工具的变动 refactor 重构，既不是新增功能，也不是修改bug的代码变动
revert 回滚到上一个版本 merge 代码合并

<!-- 其他 Type -->
sync 同步主线或分支的bug test 增加软件测试 perf 优化相关，比如提升性能、体验 ci
与CI（持续集成服务）有关的改动
```

## 二、工具安装

需要安装的工具： commitizen、cz-conventional-changelog、lint-staged、commitlint、husky

### 1. Commitizen 是一个撰写合格 Commit message 的工具。

而 cz-conventional-changelog 适配器提供 conventional-changelog 标准（约定式提交标准）。基于不同需求，也可以使用不同适配器。

```js
// 全局安装 commitizen 和 cz-conventional-changelog
$ npm install -g commitizen cz-conventional-changelog

// 全局模式下，需要 ~/.czrc 配置文件, 为commitizen指定Adapter。
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

### 2. 项目内安装 commitlint & husky

```js
// 1. 运行命令
$ npm i husky lint-staged @commitlint/cli @commitlint/config-conventional -D

$ npm set-script prepare "husky install"
$ npm run prepare

$ npx husky add .husky/pre-commit "npx --no-install lint-staged"
$ npx husky add .husky/commit-msg "npx --no -- commitlint --edit ${1}"

// 2. 配置package.json
// --fix：自动 eslint / stylelint 修复
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

// 3. 配置 commitlint
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

::: tip 自动 stylelint 修复
安装 stylelint、stylelint-config-prettier、stylelint-config-standard、stylelint-order，并配置 .stylelintrc.js 文件。
:::

```js
// 1. 安装自动 stylelint 修复工具
$ npm i stylelint stylelint-config-prettier stylelint-config-standard stylelint-order -D

// 2. 配置 .stylelintrc.js 文件
module.exports = {
  plugins: ['stylelint-order'],
  extends: ['stylelint-config-standard'],
  rules: {
    'no-duplicate-selectors': null,
  },
};

// 3. git commit 时，如果【*.{htm,html,css,sss,less,scss,sass}】等文件中有问题，会自动修复
```

### 日志查看

```js
// 下面的命令显示上次发布后的变动，每个commit占据一行。你只看行首，就知道某次 commit 的目的。
$ git log <last tag> HEAD --pretty=format:%s

// 下面的命令仅仅显示本次发布新增加的功能。
$ git log <last release> HEAD --grep feature
```

## 三、git commit 操作流程

```js
// 1. 项目代码更改
$ git add .

// 2. git commit提交：有两种方式
$ git commit -m 'feat: [描述]'
// OR 触发 Commitizen 标准化流程
$ git cz

// 3. git push
$ git push
```

![An image](/images/frontend/gitcz.png)

## 四、生成 Change log

```js
// 1. 全局安装
$ npm install -g conventional-changelog-cli

// 2. package.json 里面新增脚本
{
  "scripts": {
    "version": "conventional-changelog -p angular -i CHANGELOG.md -s && git add CHANGELOG.md"
  }
}

// 3. 运行脚本，生成 CHANGELOG.md
$ npm run version
```

![An image](/images/frontend/gitchangelog.png)

## 五、趣味性的 gitmoji

```js
// 全局安装
$ npm i -g gitmoji-cli

// 使用
$ gitmoji -c
```

![An image](/images/frontend/gitmoji.png)

::: warning 关于 gitmoji
个人觉得这个工具略显浮夸，个人项目或者小型项目可以玩一玩，增加趣味性。但中大型项目不太建议使用。
:::

### 备注：

- 插件推荐：
  在 VS Code 上面强烈推荐 Commit Message Editor 插件，可以快速生成 Git Commit Message

参考：<br />
<a href="https://gitmoji.dev/" target="_blank">gitmoji</a><br />
<a href="http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html" target="_blank">Commit message 和 Change log 编写指南</a><br />
<a href="https://www.ikxin.com/715.html" target="_blank">Git Commit Message 提交规范</a><br />
<a href="https://zhuanlan.zhihu.com/p/105537435" target="_blank">Git Commit Message 提交规范</a><br />
<a href="https://docs.gitlab.com/ee/integration/jira/index.html" target="_blank">第三方 Jira 集成</a><br />
<a href="https://www.cnblogs.com/xiao2shiqi/p/13514548.html" target="_blank">集成 GitLab && JIRA 实现自动化工作流 </a><br />
<a href="https://github.com/commitizen/cz-cli" target="_blank">commitizen</a><br />
<a href="https://www.cnblogs.com/Yellow-ice/p/15349873.html" target="_blank">前端规范之 Git 工作流规范（Husky + Commitlint + Lint-staged） </a><br />
