# 坑：ssh: connect to host github.com port 22: Connection refused

根据错误提示 `ssh: connect to host github.com port 22: Connection timed out`，主要是由于无法连接到 GitHub 的 SSH 服务（默认使用端口 22）。以下是详细的排查与解决方法：

### 1. **测试使用端口 443 连接 GitHub**

::: tip 提示
我用此方式解决了问题，如果你也遇到类似的问题，可以尝试一下。
:::

如果 22 端口被阻止，可以尝试通过 SSH 的 443 端口连接：

1. 修改 SSH 配置：

   ```bash
   notepad ~/.ssh/config
   ```

   如果文件不存在，可以新建一个。内容如下：

   ```
   Host github.com
       Hostname ssh.github.com
       Port 443
       User git
   ```

   保存文件。

2. 确保 SSH 配置文件的权限正确（可选）：
   在命令行中运行：

   ```bash
   chmod 600 ~/.ssh/config
   ```

3. 测试连接：
   ```bash
   ssh -T git@github.com
   ```
   如果配置正确，应该会显示类似以下输出：
   ```plaintext
   Hi username! You've successfully authenticated, but GitHub does not provide shell access.
   ```

### 2. **切换到 HTTPS 方式推送代码**

如果问题依旧，切换到 HTTPS 方式代替 SSH 推送代码：

1. 获取 HTTPS 仓库地址：
   在 GitHub 仓库页面，点击 **Code > HTTPS**，复制地址（例如 `https://github.com/username/repository.git`）。

2. 替换远程地址：

   ```bash
   git remote set-url origin https://github.com/username/repository.git
   ```

3. 尝试推送：
   ```bash
   git push
   ```
   系统会提示输入 GitHub 用户名和密码（或令牌）。

### 3. **测试网络连接**

确保你的网络能够访问 GitHub：

1. 测试是否能通过 HTTP 访问 GitHub：

   ```bash
   curl https://github.com
   ```

   应该返回 GitHub 的页面内容。

2. 测试是否能通过 HTTPS 访问 GitHub 的 SSH 服务：

   ```bash
   telnet ssh.github.com 443
   ```

   如果能连接上，说明 443 端口可用，可以继续使用方法 1。

3. 如果仍然无法连接，尝试切换到其他网络（例如手机热点）。

### 4. **检查系统防火墙与代理设置**

1. 确认系统防火墙是否限制了 SSH：

   - 在 Windows 上，打开 **控制面板 > 系统和安全 > Windows 防火墙**。
   - 确保 `ssh` 程序没有被防火墙阻止。

2. 如果你的网络环境中存在代理或 VPN，请暂时关闭后重试。

### 5. **重试 SSH 公钥配置**

确保你的 SSH 公钥已正确添加到 GitHub：

1. 查看本地公钥：

   ```bash
   cat ~/.ssh/id_rsa.pub
   ```

   如果没有，生成一个新的 SSH 密钥对：

   ```bash
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
   ```

2. 将公钥复制到 GitHub：

   - 登录 [GitHub](https://github.com)。
   - 点击 **Settings > SSH and GPG keys > New SSH key**。
   - 粘贴公钥并保存。

3. 测试连接：
   ```bash
   ssh -T git@github.com
   ```

### 6. **联系网络管理员**

如果你在公司或学校网络环境中，可能存在网络限制。联系网络管理员，确认 22 和 443 端口是否被阻止。

通过上述步骤，你应该能够解决问题。如果还有疑问，请告诉我具体步骤中遇到的反馈信息。
