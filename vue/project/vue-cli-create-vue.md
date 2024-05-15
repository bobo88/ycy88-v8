# VUE 脚手架 create-vue

体验一下快如闪电的全新 VUE 脚手架工具：

![An image](/images/vue/create-vue.png)

## 一、初始化 VUE3 项目

```js
$ npm create vue@3
```

## 二、初始化 VUE2 项目

```js
$ npm create vue@2
```

## 三、与 Vue CLI 的区别

Vue CLI 基于 webpack，而 create Vue 基于 Vite。Vite 支持 Vue CLI 项目中的大多数配置约定，并且由于其极快的启动和热模块更换速度，提供了更好的开发体验。点击此处了解更多关于我们推荐 Vite over webpack 的原因。

与 Vue CLI 不同，create Vue 本身只是一个脚手架工具：它根据您选择的功能创建一个预配置的项目，并将其余的委托给 Vite。以这种方式构建的项目可以直接利用与 Rollup 兼容的 Vite 插件生态系统。

## 四、源码分析

从上面的截图可以看出，创建项目主要是下面三个步骤：

```html
1. 输入项目名称，默认值是 vue-project 2. 询问一些配置 渲染模板等 3.
完成创建项目，输出运行提示
```

```ts
#!/usr/bin/env node
// ...
function isValidPackageName(projectName) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
    projectName
  )
}

function toValidPackageName(projectName) {
  // ...
}

function canSkipEmptying(dir: string) {
  // ...
}
// 工具类：清空目录文件夹（创建VUE项目时，目录中如果有同名目录文件夹时，提示用户是否覆盖已有文件夹）
function emptyDir(dir) {
  // ...
}

// 主入口函数
async function init() {
  // ...
}

// async 函数返回的是Promise 可以用 catch 报错
init().catch((e) => {
  console.error(e)
})
```

### 4.1 解析命令行的参数

```ts
// 返回运行当前脚本的工作目录的路径
const cwd = process.cwd()
// possible options:
// --default
// --typescript / --ts
// --jsx
// --router / --vue-router
// --pinia
// --with-tests / --tests (equals to `--vitest --cypress`)
// --vitest
// --cypress
// --playwright
// --eslint
// --eslint-with-prettier (only support prettier through eslint for simplicity)
// --force (for force overwriting)
// minimist: 轻量级的命令行参数解析引擎
const argv = minimist(process.argv.slice(2), {
  alias: {
    typescript: ['ts'],
    'with-tests': ['tests'],
    router: ['vue-router']
  },
  // all arguments are treated as booleans
  boolean: true
})
```

备注：minimist 的传参例子

```js
// 1. 新建 parseTest.js 文件
var args = require('minimist')(process.argv.slice(2));
console.log(args);

// 2. DEMO-1
$ node parseTest.js -a 123 -b 456                   // { _: [], a: 123, b: 456 }

// 3. DEMO-2
$ node parseTest.js -a 123 -b 456 -c=789 bobo SZ    // { _: [ 'bobo', 'SZ' ], a: 123, b: 456, c: 789 }
```

### 4.2 跳过第二步：询问一些配置 渲染模板等

```ts
// if any of the feature flags is set, we would skip the feature prompts
const isFeatureFlagsUsed =
  typeof (
    argv.default ??
    argv.ts ??
    argv.jsx ??
    argv.router ??
    argv.pinia ??
    argv.tests ??
    argv.vitest ??
    argv.cypress ??
    argv.playwright ??
    argv.eslint
  ) === 'boolean'
```

### 4.3 步骤一：设置项目名称和保存个性化定制结果

```ts
// 这里参考「minimist的传参例子 - “DEMO-2”」
let targetDir = argv._[0]
// 如果没有设置项目名称，则默认为 “vue-project”
const defaultProjectName = !targetDir ? 'vue-project' : targetDir
// 重写文件夹
const forceOverwrite = argv.force
// 记录询问结果：用于用户个性化定制项目
let result: {
  projectName?: string
  shouldOverwrite?: boolean
  packageName?: string
  needsTypeScript?: boolean
  needsJsx?: boolean
  needsRouter?: boolean
  needsPinia?: boolean
  needsVitest?: boolean
  needsE2eTesting?: false | 'cypress' | 'playwright'
  needsEslint?: boolean
  needsPrettier?: boolean
} = {}
```

### 4.4 步骤二：询问一些配置

```ts
try {
  // Prompts:
  // - Project name:
  //   - whether to overwrite the existing directory or not?
  //   - enter a valid package name for package.json
  // - Project language: JavaScript / TypeScript
  // - Add JSX Support?
  // - Install Vue Router for SPA development?
  // - Install Pinia for state management?
  // - Add Cypress for testing?
  // - Add Playwright for end-to-end testing?
  // - Add ESLint for code quality?
  // - Add Prettier for code formatting?
  result = await prompts(
    [
      // 询问输入「项目名称」
      {
        name: 'projectName',
        type: targetDir ? null : 'text',
        message: 'Project name:',
        initial: defaultProjectName,
        onState: (state) =>
          (targetDir = String(state.value).trim() || defaultProjectName)
      },
      // 询问当前目录如果有同名文件夹，是否覆盖？
      {
        name: 'shouldOverwrite',
        type: () =>
          canSkipEmptying(targetDir) || forceOverwrite ? null : 'confirm',
        message: () => {
          const dirForPrompt =
            targetDir === '.'
              ? 'Current directory'
              : `Target directory "${targetDir}"`

          return `${dirForPrompt} is not empty. Remove existing files and continue?`
        }
      },
      // 如果不覆盖，则抛出错误
      {
        name: 'overwriteChecker',
        type: (prev, values) => {
          if (values.shouldOverwrite === false) {
            throw new Error(red('✖') + ' Operation cancelled')
          }
          return null
        }
      },
      {
        name: 'packageName',
        type: () => (isValidPackageName(targetDir) ? null : 'text'),
        message: 'Package name:',
        initial: () => toValidPackageName(targetDir),
        validate: (dir) =>
          isValidPackageName(dir) || 'Invalid package.json name'
      },
      // 询问是否需要：TypeScript / JSX / VueRouter / Pinia / Eslint 等
      {
        name: 'needsTypeScript',
        type: () => (isFeatureFlagsUsed ? null : 'toggle'),
        message: 'Add TypeScript?',
        initial: false,
        active: 'Yes',
        inactive: 'No'
      }
      //  ... 其他省略
    ],
    {
      onCancel: () => {
        throw new Error(red('✖') + ' Operation cancelled')
      }
    }
  )
} catch (cancelled) {
  console.log(cancelled.message)
  process.exit(1)
}
```

### 4.5 组合询问结果以及默认值

```js
// `initial` won't take effect if the prompt type is null
// so we still have to assign the default values here
const {
  projectName,
  packageName = projectName ?? defaultProjectName,
  shouldOverwrite = argv.force,
  needsJsx = argv.jsx,
  needsTypeScript = argv.typescript,
  needsRouter = argv.router,
  needsPinia = argv.pinia,
  needsVitest = argv.vitest || argv.tests,
  needsEslint = argv.eslint || argv['eslint-with-prettier'],
  needsPrettier = argv['eslint-with-prettier']
} = result

const { needsE2eTesting } = result
const needsCypress = argv.cypress || argv.tests || needsE2eTesting === 'cypress'
const needsCypressCT = needsCypress && !needsVitest
const needsPlaywright = argv.playwright || needsE2eTesting === 'playwright'

const root = path.join(cwd, targetDir)

// 重写清空文件夹 OR 创建文件夹
if (fs.existsSync(root) && shouldOverwrite) {
  emptyDir(root)
} else if (!fs.existsSync(root)) {
  fs.mkdirSync(root)
}
console.log(`\nScaffolding project in ${root}...`)

// 利用「fs.writeFileSync」生成 package.json 文件
const pkg = { name: packageName, version: '0.0.0' }
fs.writeFileSync(
  path.resolve(root, 'package.json'),
  JSON.stringify(pkg, null, 2)
)
```

### 4.6 根据「4.5」中的组合结果，渲染「定制化模版」

```ts
// todo:
// work around the esbuild issue that `import.meta.url` cannot be correctly transpiled
// when bundling for node and the format is cjs
// const templateRoot = new URL('./template', import.meta.url).pathname
const templateRoot = path.resolve(__dirname, 'template')
const render = function render(templateName) {
  const templateDir = path.resolve(templateRoot, templateName)
  renderTemplate(templateDir, root)
}

// Render base template
render('base')

// Add configs.
if (needsJsx) {
  render('config/jsx')
}
if (needsRouter) {
  render('config/router')
}
if (needsPinia) {
  render('config/pinia')
}
if (needsVitest) {
  render('config/vitest')
}
if (needsCypress) {
  render('config/cypress')
}
if (needsCypressCT) {
  render('config/cypress-ct')
}
if (needsPlaywright) {
  render('config/playwright')
}
if (needsTypeScript) {
  render('config/typescript')

  // Render tsconfigs
  render('tsconfig/base')
  if (needsCypress) {
    render('tsconfig/cypress')
  }
  if (needsCypressCT) {
    render('tsconfig/cypress-ct')
  }
  if (needsVitest) {
    render('tsconfig/vitest')
  }
}

// Render ESLint config
if (needsEslint) {
  renderEslint(root, {
    needsTypeScript,
    needsCypress,
    needsCypressCT,
    needsPrettier
  })
}

// Render code template.
// prettier-ignore
const codeTemplate =
  (needsTypeScript ? 'typescript-' : '') +
  (needsRouter ? 'router' : 'default')
render(`code/${codeTemplate}`)

// Render entry file (main.js/ts).
if (needsPinia && needsRouter) {
  render('entry/router-and-pinia')
} else if (needsPinia) {
  render('entry/pinia')
} else if (needsRouter) {
  render('entry/router')
} else {
  render('entry/default')
}
```

### 4.7 如果选择了 Typescript，则对 .js 文件和相关配置进行二次修改

重命名所有的 .js 文件改成 .ts。 重命名 jsconfig.json 文件为 tsconfig.json 文件等。

```js
// We try to share as many files between TypeScript and JavaScript as possible.
// If that's not possible, we put `.ts` version alongside the `.js` one in the templates.
// So after all the templates are rendered, we need to clean up the redundant files.
// (Currently it's only `cypress/plugin/index.ts`, but we might add more in the future.)
// (Or, we might completely get rid of the plugins folder as Cypress 10 supports `cypress.config.ts`)

if (needsTypeScript) {
  // Convert the JavaScript template to the TypeScript
  // Check all the remaining `.js` files:
  //   - If the corresponding TypeScript version already exists, remove the `.js` version.
  //   - Otherwise, rename the `.js` file to `.ts`
  // Remove `jsconfig.json`, because we already have tsconfig.json
  // `jsconfig.json` is not reused, because we use solution-style `tsconfig`s, which are much more complicated.
  preOrderDirectoryTraverse(
    root,
    () => {},
    (filepath) => {
      if (filepath.endsWith('.js')) {
        const tsFilePath = filepath.replace(/\.js$/, '.ts')
        if (fs.existsSync(tsFilePath)) {
          fs.unlinkSync(filepath)
        } else {
          fs.renameSync(filepath, tsFilePath)
        }
      } else if (path.basename(filepath) === 'jsconfig.json') {
        fs.unlinkSync(filepath)
      }
    }
  )

  // Rename entry in `index.html`
  const indexHtmlPath = path.resolve(root, 'index.html')
  const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8')
  fs.writeFileSync(
    indexHtmlPath,
    indexHtmlContent.replace('src/main.js', 'src/main.ts')
  )
} else {
  // Remove all the remaining `.ts` files
  preOrderDirectoryTraverse(
    root,
    () => {},
    (filepath) => {
      if (filepath.endsWith('.ts')) {
        fs.unlinkSync(filepath)
      }
    }
  )
}
```

### 4.8 创建 README.md 文件

```ts
// Instructions:
// Supported package managers: pnpm > yarn > npm
const userAgent = process.env.npm_config_user_agent ?? ''
const packageManager = /pnpm/.test(userAgent)
  ? 'pnpm'
  : /yarn/.test(userAgent)
  ? 'yarn'
  : 'npm'

// README generation
fs.writeFileSync(
  path.resolve(root, 'README.md'),
  generateReadme({
    projectName: result.projectName ?? result.packageName ?? defaultProjectName,
    packageManager,
    needsTypeScript,
    needsVitest,
    needsCypress,
    needsPlaywright,
    needsCypressCT,
    needsEslint
  })
)
```

### 4.9 utils 工具类解析

TODO...

::: tip 源码中的第一行「#!/usr/bin/env node」 是什么？
#! 在 Linux 或者 Unix 中叫做：shebang，就是一个标识。

带有 #! 就是代表此文件可以当做脚本运行。

/usr/bin/env node 这行的意思就是用 node 来执行此文件，其中「 /usr/bin/env 」表示 node 的路径。
:::

```html
<!-- #! 的几点要求 -->
#! 必须连接在一起 #! 一句必须在文件的最开始，第一行 #
开头的语句一般情况下会被当成注释而忽略，所以Shebang 对文件的内容是没有影响的 #!
开头的一行会设置解释器运行环境
```

参考：<br/>
<a href="https://github.com/vuejs/create-vue" target="_blank">create-vue(Github)</a> <br/>
<a href="https://lxchuan12.gitee.io/create-vue/" target="_blank">create-vue 源码解析</a><br/>
