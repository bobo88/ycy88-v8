# nvm

::: tip nvm
顾名思义，Node Version Manager (NVM) 是一种用于管理设备上的 Node 版本的工具。
:::

- 应用场景主要是：用来适配新老项目不同 Node 版本 的开发。
- 用来切换 node 版本的（比如有些老旧项目需要用 node12 以下，新项目需要 node16 或 node18)。

您设备上的不同项目可能使用不同版本的 Node.js。对这些不同的项目仅使用一个版本（由 安装的版本 npm）可能无法为您提供准确的执行结果。

例如，如果您将 10.0.0 的 Node 版本用于使用 12.0.0 的项目，您可能会遇到一些错误。如果您使用 npm 将 Node 版本更新为 12.0.0，并将其用于使用 10.0.0 的项目，您可能无法获得预期的体验。

## nvm 常见命令

```js
nvm ls-remote               // 查看 Node 远程版本库
nvm install node            // 将安装最新版本的 Node
nvm install v12.7.0         // 将安装 12.7.0 版本的 Node
nvm uninstall v12.7.0       // 卸载 12.7.0 版本的 Node
nvm ls                      // 查看已经安装的 Node 版本
nvm list
nvm list installed          // 显示已安装的版本
nvm list available          // 显示所有可以下载的版本
nvm use v12.7.0             // 切换 12.7.0 为当前使用的版本
nvm alias default v12.7.0   // 将 12.7.0 设置为 Node 的默认版本
nvm which v12.7.0           // 查看 12.7.0 版本的 Node 的安装目录，比如：/Users/ccp/.nvm/versions/node/v12.7.0/bin/node
nvm --help                  // 查看更多命令用法
// 1、切换版本到14.15.4
nvm use 14.15.4
// 2、切换到最新版
nvm use node
```

## nvm 的工作原理

::: tip nvm 的工作原理
将多个 node 不同的版本下载到电脑本地，【nvm use v16.16.0】就是将电脑中的 node 环境变量更改为 16.16.0 的。<br/>
原理就是：下载多个 node 版本，然后更改电脑的 node 环境变量
:::
![nvm image](/images/prev/nvm.png)

参考文档（下载并安装指南，适用于 macOS/windows）：<br/>
<a href="https://github.com/nvm-sh/nvm" target="_blank">nvm (Github)</a><br />
<a href="https://github.com/coreybutler/nvm-windows" target="_blank">nvm-windows (Github)</a><br />
