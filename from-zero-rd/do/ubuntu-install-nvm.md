# Ubuntu 系统上安装 nvm

在 Ubuntu 系统上安装 `nvm` (Node Version Manager) 的详细步骤如下：

## **1. 安装 nvm**

运行以下命令来安装 `nvm`：

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

如果网络较慢或访问 GitHub 不稳定，可以使用 Gitee 镜像：

```bash
curl -o- https://gitee.com/mirrors/nvm/raw/master/install.sh | bash
```

## **2. 配置环境变量**

安装完成后，需要将 `nvm` 加载到 shell 环境中：

1. 在终端中运行：

   ```bash
   export NVM_DIR="$HOME/.nvm"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
   ```

2. 为了每次打开终端都自动加载 `nvm`，需要将上述内容添加到 `~/.bashrc` 文件中：

   ```bash
   nano ~/.bashrc
   ```

   在文件末尾添加：

   ```bash
   export NVM_DIR="$HOME/.nvm"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
   ```

3. 保存后，重新加载配置：
   ```bash
   source ~/.bashrc
   ```

## **3. 验证 nvm 安装**

运行以下命令检查是否成功安装：

```bash
nvm --version
```

如果返回版本号（如 `0.39.5`），说明 `nvm` 安装成功。

## **4. 使用 nvm 安装 Node.js**

- 查看可用的 Node.js 版本：

  ```bash
  nvm ls-remote
  ```

- 安装最新 LTS 版本：

  ```bash
  nvm install --lts
  ```

- 安装特定版本（例如 Node.js 22.x）：

  ```bash
  nvm install 22
  ```

- 验证 Node.js 是否安装成功：
  ```bash
  node -v
  npm -v
  ```

## **5. 常见问题**

- **网络连接问题：**
  如果安装脚本卡住，检查网络连接，或者配置代理：

  ```bash
  export http_proxy=http://<proxy_ip>:<proxy_port>
  export https_proxy=http://<proxy_ip>:<proxy_port>
  ```

- **未找到 `nvm` 命令：**
  确保 `.bashrc` 中正确配置了 `nvm` 环境变量，并重新运行：

  ```bash
  source ~/.bashrc
  ```

- **权限问题：**
  `nvm` 是用户级别的工具，不需要 `sudo` 权限。如果需要 `sudo`，检查用户权限或切换到管理员账户。

完成后，您可以自由切换 Node.js 版本：

```bash
nvm use <version>
```

例如：

```bash
nvm use 22
```

![An image](/images/from-zero/rd/ubuntu-install-nvm.png)
