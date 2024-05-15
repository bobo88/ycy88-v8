# 前端规范工程化最佳实践

## 一、ESLint

- .eslintrc.js
  以 VSCode 编辑器为例，安装 ESLint 插件并在编辑器设置 settings.json 添加以下配置：
  "editor.codeActionsOnSave": {
  "source.fixAll.eslint": true,
  },

## 二、Prettier

```js
// .prettierrc.js 代码美化规则配置
module.exports = {
  // 一行最多 n 字符
  printWidth: 1000,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 行尾需要有分号
  semi: false,
  // 使用单引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 末尾需要有逗号
  trailingComma: 'all',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // vue 文件中的 script 和 style 内不用缩进
  vueIndentScriptAndStyle: false,
  // 换行符使用 lf
  endOfLine: 'lf',
  // 格式化嵌入的内容
  embeddedLanguageFormatting: 'auto'
}
```

## 三、StyleLint

- .stylelintrc.js

"editor.codeActionsOnSave": {
"source.fixAll.eslint": true,
"source.fixAll.stylelint": true
}

## 四、.editorconfig

<!-- 一般我们会在有以下几种方式做 ESLint 检查：
开发时：依赖编辑器的能力
手动运行：在终端中手动执行 eslint 命令
pre-commit：在提交 git 前自动执行 eslint 命令
ci：依赖 git 的持续集成，可以将检查结果输出文件上传到服务器

也许你有了解一些主流的代码规范指南或者将其应用到日常编码开发中了，但这些仅停留在字面上的或个人编辑器上的规范和风格显然远远不够，毕竟每个开发人员的水平、开发环境和自觉性参差不齐，所以一个前端团队理想的代码规范体系应该至少具备以下特性：

团队有统一的代码规范和风格（可以自定义或使用主流的规范和风格，统一就行了）

整个规范和风格统一的过程应该是自动化的（项目开发关注的应该是业务代码本身，代码规范作为辅助功能不应该增加开发者开发项目时的心智负担）

处理 Prettier 与 Eslint、StyleLint 的冲突
通过 Eslint 和 StyleLint 的规则可以约束一些基本的代码风格，但这可能与 Prettier 格式化的结果互相冲突，所以要稍作配置以确保代码风格发生冲突时，Prettier 的格式化结果的优先级最高(代码风格的问题由 Prettier 统一)：

### -----------------------------------------------------

# 处理 prettier 与 eslint 的冲突

npm install -D eslint eslint-config-prettier

# 处理 prettier 与 stylelint 的冲突

npm install -D stylelint-config-prettier

# 将 prettier 作为 eslint 规则运行并将差异作为错误提示

npm install -D eslint-plugin-prettier
接下来更新你项目下.eslintrc.js 文件中 extends 字段的内容：

extends: [
'plugin:vue/vue3-essential',
'@vue/airbnb',
'plugin:prettier/recommended',
],

### -----------------------------------------------------

解决方案
针对上述问题，现在比较流行的 解决方案是：自动化！

**保存代码时：**自动格式化代码，之后再检测编码是否符合团队规范，不合规的提示错误。

**提交代码时：**检测编码是否符合团队规范，不合规不允许提交。

**编写 commit message 时：**提供日志模板。

也就是说

用 ESLint 检查编码规范；

用 Prettier 插件自动保存为规划化格式；

用 Commitizen 约定提交规范；

### -----------------------------------------------------

团队中代码规范统一是极有必要的
使用成熟的 eslint config，并做细节修改
设置部分 eslint rule 为警告，保障开发体验，并且在 pre-commit 与 CI 中把警告视为不通过，保证严格的代码规范
可以在 IDE (vscode)，git hooks，CI 中添加三层规范校验拦截
可以使用 husky 与 lint-staged 很方便地做关于 lint 的 git hooks
git hooks 的规范校验可以通过 git commit -n 跳过，需要在 CI 层继续加强校验 -->
