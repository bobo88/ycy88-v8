# ubuntu 系统无法识别 pm2 命令

![An image](/images/from-zero/rd/ubuntu-pm2.png)

![An image](/images/from-zero/rd/ubuntu-pm2-2.png)

> 如果 ubuntu 上面无法下载 pm2，则可以通过手动下载的方式下载、解压、安装。[Github 地址：https://github.com/Unitech/pm2/releases](https://github.com/Unitech/pm2/releases)

::: danger 禁用严格的 SSL 验证（临时解决方案）
你可以尝试临时禁用 Yarn 的严格 SSL 验证。请注意，这个方法不推荐长期使用，因为它会降低安全性。

```bash
yarn config set "strict-ssl" false
```

:::

### 1. 检查 PM2 安装位置

首先，检查 PM2 的安装路径，看看它是否已经正确安装在系统中。

```bash
yarn global bin
```

这个命令会输出你全局安装的包所在的目录。确保该目录包含 `pm2` 可执行文件。

### 2. 将 PM2 路径添加到系统的 `PATH` 环境变量

假设你从 `yarn global bin` 获得的目录是 `/home/andy/.yarn/bin`，你需要将该目录添加到你的 `PATH` 环境变量中。可以编辑你的 `.bashrc` 或 `.zshrc`（取决于你使用的 shell）文件来更新 `PATH`。

#### 如果你使用 `bash`：

```bash
nano ~/.bashrc
```

#### 如果你使用 `zsh`：

```bash
nano ~/.zshrc
```

然后，在文件的末尾添加如下内容：

```bash
export PATH="$PATH:/home/andy/.yarn/bin"
```

注意替换为你实际的 `yarn global bin` 输出路径。

保存并关闭文件后，运行以下命令使更改生效：

```bash
source ~/.bashrc   # 对于 bash
# 或者
source ~/.zshrc    # 对于 zsh
```

### 3. 检查 PM2 是否正常运行

更新 `PATH` 后，重新打开一个终端窗口或使用 `source` 命令加载配置文件。然后，再次检查 `pm2` 命令是否可用：

```bash
pm2 list
```

如果问题仍然存在，你可以尝试重新启动系统，以确保环境变量生效。

### 4. 安装依赖和工具

如果仍然出现问题，确认是否缺少依赖项或者有其他安装错误，尝试重新安装 PM2：

```bash
yarn global remove pm2
yarn global add pm2
```

这些步骤应该能够解决你遇到的问题，并使你能够使用 `pm2` 命令管理你的 Node.js 应用。
