# 脚手架的实现原理

::: tip CLI
CLI 一般指命令行界面。 命令行界面（英语：command-line interface，缩写：CLI）是在图形用户界面得到普及之前使用最为广泛的用户界面，它通常不支持鼠标，用户通过键盘输入指令，计算机接收到指令后，予以执行。
:::

本文参考「create-vue」源码做个简易的 CLI-DEMO。

## 一、项目初始化

### 1. 新建 cli-basic 文件夹目录

```js
$ mkdir cli-basic
```

### 2. npm init & 安装相关依赖

```js
$ npm init

$ npm i minimist prompts kolorist download-git-repo ora
```

### 3. 在 cli-basic 目录下新建 index.js

```js
#!/usr/bin/env node

// minimist: 轻量级的命令行参数解析引擎
import minimist from 'minimist'
// prompts: 提供轻量级的交互式提示
import prompts from 'prompts'
// kolorist: 在 stdin/stdout 中设置字体颜色的轻量库
import { red, green, bold } from 'kolorist'
// download-git-repo: 下载仓库源码的库
import downloadGitRepo from 'download-git-repo'
// ora: 优雅的终端旋转器（就是提供转圈圈的loading功能的）
import ora from 'ora'

const spinner = ora('下载中...')

async function init() {
  const argv = minimist(process.argv.slice(2))

  let targetDir = argv._[0]
  const defaultProjectName = !targetDir ? 'vue-project' : targetDir

  let result = {}

  try {
    result = await prompts(
      [
        {
          name: 'needsSteps',
          type: () => 'select',
          message: '请选择你要执行的步骤?',
          initial: 0,
          choices: (prev, anwsers) => [
            { title: '取消', value: false },
            {
              title: '初始化项目',
              description: '将 VUE-admin 项目从远程git拉取到本地 project 目录',
              value: 'pull'
            },
            {
              title: '项目安装依赖',
              description: '将初始化的项目install相关的依赖',
              value: 'install'
            },
            {
              title: '项目单元测试',
              description: '对项目进行单元测试',
              value: 'unit'
            },
            {
              title: '项目部署',
              value: 'push'
            }
          ]
        },
        {
          type: (prev) => (prev == 'install' ? 'toggle' : null),
          name: 'needsInstall',
          message: '确定下载所有依赖？',
          initial: false,
          active: 'Yes',
          inactive: 'No'
        }
        // ... 更多定制化 TODO
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

  const { needsSteps: stepName, needsInstall } = result

  if (stepName === 'pull') {
    spinner.start()
    await downloadGitRepo(
      'github:bobo88/nuxt-web',
      `${defaultProjectName}`,
      () => {
        spinner.succeed(bold(green('下载完成.')))
        console.log()
      }
    )
  }

  if (needsInstall) {
    spinner.start('依赖install中...')
    console.log()
    spinner.succeed(bold(green('Install完成.')))
    console.log()
  }

  if (stepName === 'unit') {
    spinner.start('单元测试中...')
    console.log()
    spinner.succeed(bold(green('测试完成.')))
    console.log()
  }

  if (stepName === 'push') {
    spinner.start('项目部署测试中...')
    console.log()
    spinner.succeed(bold(green('部署完成.')))
    console.log()
  }
}

init().catch((e) => {
  console.error(e)
})
```

## 二、运行命令

```js
$ node index.js
```

## 三、DEMO 截图

![An image](/images/tools/cli-basic.png)

![An image](/images/tools/cli-basic2.png)

![An image](/images/tools/cli-basic3.png)

## 四、引申

::: danger 引申：TODO...
本 DEMO 仅仅是用 CLI 实现了一个基本的交互式，实现了一个最简单的 git 仓库源码下载功能。

但是更多的内容和前端工程化的步骤细节，需要进一步完善和补充。

比如：<br/>
CodeReview / 质量检查 / 性能检查 / 冲突解决 / 依赖升级与锁定 / 灰度测试 / ...
:::

::: tip 「#!/usr/bin/env node」 是什么？
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
