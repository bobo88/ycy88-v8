# 如何查看 yarn 的安装路径

要在本地电脑上查找`yarn`的安装路径，你可以按照以下步骤操作，这些步骤会根据你使用的操作系统有所不同：

### 对于 macOS 或 Linux：

1. 打开终端。
2. 输入以下命令并按下回车键：
   ```bash
   which yarn
   ```
   这个命令会显示`yarn`命令的全路径，例如：`/usr/local/bin/yarn`。

### 对于 Windows：

1. 打开命令提示符（CMD）或 PowerShell。
2. 输入以下命令并按下回车键：
   ```cmd
   where yarn
   ```
   这个命令会显示`yarn`命令的全路径，例如：`C:\Program Files (x86)\Yarn\bin\yarn.cmd`。

### 额外说明：

- 如果你的系统提示找不到`yarn`命令，这可能意味着`yarn`没有正确安装，或者其安装路径没有添加到环境变量中。
- 确保你已经安装了`yarn`。如果未安装，可以访问[Yarn 官方网站](https://yarnpkg.com/getting-started/install)查看安装指南。
- 对于 Linux 和 macOS 用户，如果发现`yarn`未被添加到环境变量，可以手动添加路径到你的 shell 配置文件中（如 `.bashrc`, `.zshrc`等），例如：
  ```bash
  export PATH="$PATH:/path/to/yarn/bin"
  ```
  确保替换`/path/to/yarn/bin`为`yarn`的实际路径。

使用这些方法，你可以确定`yarn`的安装位置，并据此更新你的 Jenkins 配置或其他需要指定`yarn`路径的应用配置。
