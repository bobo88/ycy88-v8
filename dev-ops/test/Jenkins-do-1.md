# Jenkins 修改端口号（Mac）

::: tip 前提条件
在 macOS 上，使用 brew services 命令来管理 Jenkins 服务。
:::

### 一、修改配置文件

> 8080 改成 8088

![An image](/images/dev-ops/jenkins-port.png)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>Label</key>
	<string>homebrew.mxcl.jenkins-lts</string>
	<key>LimitLoadToSessionType</key>
	<array>
		<string>Aqua</string>
		<string>Background</string>
		<string>LoginWindow</string>
		<string>StandardIO</string>
		<string>System</string>
	</array>
	<key>ProgramArguments</key>
	<array>
		<string>/usr/local/opt/openjdk/bin/java</string>
		<string>-Dmail.smtp.starttls.enable=true</string>
		<string>-jar</string>
		<string>/usr/local/opt/jenkins-lts/libexec/jenkins.war</string>
		<string>--httpListenAddress=0.0.0.0</string>
		<string>--httpPort=8088</string>
	</array>
	<key>RunAtLoad</key>
	<true/>
</dict>
</plist>
```

### 二、运行查看效果

```bash
# 启动服务
brew services start jenkins-lts
```

```bash
# 重启服务
brew services restart jenkins-lts
```

> 或者通过 Jenkins 的浏览器地址方式重启服务，比如我本地直接 **http://localhost:8088/restart** 回车即可。

```bash
# 停止服务
brew services stop jenkins-lts
```

```bash
# 查看服务清单
brew services list
```

![An image](/images/dev-ops/jenkins-8088.png)
