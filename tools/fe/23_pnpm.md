# PNPM

::: tip 概念
performant npm，意味“高性能的 npm”，快速的，节省磁盘空间的包管理工具。

pnpm 由 npm/yarn 衍生而来，解决了 npm/yarn 内部潜在的 bug，极大的优化了性能，扩展了使用场景。被誉为“最先进的包管理工具”。
:::

pnpm 有以下几个特点：

- 快速: pnpm 比其他包管理器快 2 倍
- 高效: node_modules 中的文件为复制或链接自特定的内容寻址存储库
- 支持 monorepos: pnpm 内置支持单仓多包
- 严格: pnpm 默认创建了一个非平铺的 node_modules，因此代码无法访问任意包

## 一、安装

```js
$ npm install -g pnpm
```

## 二、对比 yarn 与 npm

![An image](/images/tools/pnpm.png)

## 三、pnpm 的特点解析

### 1. 节约磁盘空间并提升安装速度

当使用 npm 或 Yarn 时，如果你有 100 个项目使用了某个依赖（dependency），就会有 100 份该依赖的副本保存在硬盘上。 而在使用 pnpm 时，依赖会被存储在内容可寻址的存储中，所以：

如果你用到了某依赖项的不同版本，只会将不同版本间有差异的文件添加到仓库。 例如，如果某个包有 100 个文件，而它的新版本只改变了其中 1 个文件。那么 pnpm update 时只会向存储中心额外添加 1 个新文件，而不会因为仅仅一个文件的改变复制整新版本包的内容。

所有文件都会存储在硬盘上的某一位置。 当软件包被被安装时，包里的文件会硬链接到这一位置，而不会占用额外的磁盘空间。 这允许你跨项目地共享同一版本的依赖。

因此，您在磁盘上节省了大量空间，这与项目和依赖项的数量成正比，并且安装速度要快得多！

### 2. 创建非扁平化的 node_modules 文件夹

使用 npm 或 Yarn Classic 安装依赖项时，所有包都被提升到模块目录的根目录。 因此，项目可以访问到未被添加进当前项目的依赖。

默认情况下，pnpm 使用软链的方式将项目的直接依赖添加进模块文件夹的根目录。

![An image](/images/tools/pnpm_1.jpeg)

## 四、常见命令

```js
// 管理依赖
pnpm add <pkg>                      // 安装软件包及其依赖的任何软件包。 默认情况下，任何新软件包都安装为生产依赖项。
pnpm install                        // pnpm install 用于安装项目所有依赖.
pnpm update                         // pnpm update 根据指定的范围更新软件包的最新版本。
pnpm remove                         // 别名: rm, uninstall, un。从 node_modules 和项目的 package.json 中删除相关 packages。
pnpm link                           // 别名: ln。使当前本地包可在系统范围内或其他位置访问。
pnpm unlink                         // 取消链接一个系统范围的package (相对于 pnpm link).
pnpm import                         // pnpm import 从另一个软件包管理器的 lock 文件生成 pnpm-lock.yaml。
pnpm rebuild                        // 别名： rb。重建一个package。
pnpm prune                          // 移除不需要的packages。
pnpm fetch                          // 将 lockfile 中列出包下载到虚拟存储中，包清单被忽略。
pnpm install-test                   // 别名: it。执行 pnpm install 然后立即执行 pnpm test. 它使用参数和 pnpm install完全相同.
pnpm patch <pkg>                    // 准备一个补丁包（灵感来自Yarn中的类似命令）。此命令将导致在一个临时目录中提取一个包，该临时目录可随意编辑。
pnpm patch-commit <path>            // 从目录中生成补丁（受Yarn中类似命令的启发）。

// 查看依赖
pnpm audit                          // 检查已安装包的已知安全问题。
pnpm list                           // 别名: ls。此命令会以一个树形结构输出所有的已安装package的版本及其依赖。
pnpm outdated                       // 检查过期的 packages。 此命令可以通过提供参数来限制为已安装 packages的一个子集(支持 patterns)。
pnpm why                            // 显示依赖于指定 package的所有 package。

// 运行脚本
pnpm run                            // 别名: run-script。运行一个在 package的 manifest 文件中定义的脚本。
pnpm test                           // 别名: run test, t, tst。运行在 package 的 scripts 对象中test 属性指定的任意的命令。该属性的预期的作用是想为程序指定的运行单元测试或集成测试的命令。
pnpm exec                           // 在项目范围内执行 shell 命令。node_modules/.bin 添加到 PATH，因此 pnpm exec 允许执行依赖项的命令。
pnpm dlx                            // 从源中获取包而不将其安装为依赖项，热加载，并运行它公开的任何默认命令二进制文件。
pnpm create                         // 从 create-* 或 @foo/create-* 启动套件创建项目。
pnpm start                          // 别名: run start。运行在 package 的 scripts 对象中start 属性指定的任意的命令。

// 管理环境
pnpm env <cmd>                      // 管理 Node.js 环境。安装并使用指定版本的 Node.js

// 其他
pnpm publish                        // 发布一个包到注册表。
pnpm pack                           // 从package创建一个 tarball。
pnpm -r, --recursive
pnpm server                         // 管理一个 store 服务器。
pnpm store                          // 管理包存储。
pnpm root                           // 打印有效的存放模块（modules）的目录。
pnpm bin                            // 打印依赖项的可执行文件链接到的目录。
pnpm setup                          // pnpm 的独立安装脚本使用此命令。
pnpm init                           // 创建一个 package.json 文件。
pnpm deploy
pnpm doctor                         // 检查pnpm配置的已知常见问题。
```

## 五、性能对比

<a href="https://pnpm.io/zh/benchmarks" target="_blank">Benchmarks of JavaScript Package Managers</a>

参考：<br />
<a href="https://pnpm.io/zh/" target="_blank">PNPM 官方中文文档</a><br />
<a href="https://www.pnpm.cn/" target="_blank">PNPM 中文网</a><br />
