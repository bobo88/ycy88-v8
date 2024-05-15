# Jenkins 配置

::: tip Jenkins - 构建伟大，无所不能
Jenkins 是开源 CI&CD 软件领导者， 提供超过 1000 个插件来支持构建、部署、自动化， 满足任何项目的需要。
:::

### Jenkins 运行的整体步骤（需要先安装好 jdk）：

- 1. 下载 Jenkins（jenkins.war：https://mirrors.jenkins.io/war/latest/jenkins.war）.
- 2. 打开终端进入到下载目录.
- 3. 运行命令 java -jar jenkins.war --httpPort=8888.
- 4. 打开浏览器进入链接 http://localhost:8888.
- 5. 按照说明完成安装.

## 一、下载安装（以 windows 为例）

### 1.1 下载安装 Java jdk（注意版本需要在 [11, 17] 之间）

::: warning 版本注意
注意 Java jdk 版本需要在 [11, 17] 之间，否则不支持 Jenkins 的运行。
:::

- https://www.oracle.com/in/java/technologies/downloads/#jdk17-windows （首选）
- https://www.java.com/zh-CN/download/

### 1.2 下载安装 Jenkins

- 官网镜像地址: https://mirrors.jenkins.io/ （首选）
- 下载地址： https://jenkins.io/download/
- 华为镜像地址: https://mirrors.huaweicloud.com/home

## 二、Windows 运行截图

![An image](/images/tools/jenkins/jenkins.png)

## 三、Mac 下载地址

- [https://www.jenkins.io/download/lts/macos/](https://www.jenkins.io/download/lts/macos/)

在 macOS 上，您可以使用 `brew services` 命令来管理 Jenkins 服务。

尝试使用以下命令查看 Jenkins 服务的状态：

```bash
brew services list
```

这将列出正在运行的 Homebrew 服务，其中应该包含 Jenkins。您可以在列表中找到 Jenkins 的状态以及其他相关信息。如果 Jenkins 正在运行，您应该看到类似于以下的输出：

```bash
yuanbo@yuanbodeMacBook-Pro ~ % brew services list

Name        Status  User   File
jenkins-lts started yuanbo ~/Library/LaunchAgents/homebrew.mxcl.jenkins-lts.plist
yuanbo@yuanbodeMacBook-Pro ~ %
```

如果 Jenkins 没有运行，您可以使用以下命令启动它：

```bash
brew services start jenkins-lts
```

然后再次运行 `brew services list` 来确认 Jenkins 是否正在运行。如果出现其他问题，请检查 Homebrew 或 Jenkins 的日志以获取更多信息。

可以使用以下命令停止 Jenkins 服务：

```bash
brew services stop jenkins-lts
```

这将停止 Jenkins 服务，并且它将不再在后台运行。如果您需要再次启动 Jenkins，可以使用 `brew services start jenkins-lts`。

## 四、Mac 运行截图

![An image](/images/dev-ops/jenkins.png)

![An image](/images/dev-ops/jenkins-2.png)
