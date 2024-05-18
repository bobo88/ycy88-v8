# 安装 Maven

::: danger 报错提示
`zsh: command not found: mvn` 错误表明系统找不到 Maven 命令。这通常是因为 Maven 没有正确安装或其路径没有添加到系统的 `PATH` 环境变量中。
:::

## 一、安装方式

### 1.1 通过 Homebrew 安装 Maven

如果你使用的是 macOS，最简单的方法是通过 Homebrew 安装 Maven。

1. **安装 Homebrew**（如果尚未安装）：

   ```sh
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **使用 Homebrew 安装 Maven**：
   ```sh
   brew install maven
   ```

![An image](/images/java/maven-install.png)

### 1.2 手动安装 Maven

1. **下载 Maven**：

   - 访问 Maven 官方网站下载页面：https://maven.apache.org/download.cgi
   - 下载最新的 Maven 二进制 zip 文件或 tar.gz 文件。

2. **解压下载的文件**：

   ```sh
   tar -xvf apache-maven-<version>-bin.tar.gz
   ```

   或者：

   ```sh
   unzip apache-maven-<version>-bin.zip
   ```

3. **移动 Maven 目录到 `/usr/local/apache-maven`**：

   ```sh
   sudo mv apache-maven-<version> /usr/local/apache-maven
   ```

4. **设置环境变量**：
   打开或创建 `~/.zshrc` 文件，然后添加以下内容：

   ```sh
   export M2_HOME=/usr/local/apache-maven
   export PATH=$M2_HOME/bin:$PATH
   ```

5. **应用更改**：
   ```sh
   source ~/.zshrc
   ```

## 二、验证 Maven 安装

在终端中运行以下命令以验证 Maven 是否正确安装：

```sh
mvn -v
```

输出应类似于：

```
Apache Maven 3.8.1 (bb305e0b4e3c01d9a5a198a1a8c6a96b0fa7b3b5)
Maven home: /usr/local/apache-maven
Java version: 11.0.2, vendor: Oracle Corporation, runtime: /usr/local/java/jdk-11.0.2
Default locale: en_US, platform encoding: UTF-8
OS name: "mac os x", version: "10.14.6", arch: "x86_64", family: "mac"
```

## 三、在 IntelliJ IDEA 中配置 Maven

如果你使用 IntelliJ IDEA 开发项目，可以通过以下步骤配置 Maven：

1. **打开 IntelliJ IDEA**，选择 `Preferences`（或者按 `Cmd + ,`）。
2. **导航到 `Build, Execution, Deployment > Build Tools > Maven`**。
3. **在 `Maven home directory` 中选择你的 Maven 安装目录**，例如 `/usr/local/apache-maven`。
4. **点击 `OK` 保存设置**。

## 四、运行 Maven 命令

安装和配置 Maven 后，你可以在项目目录中运行 Maven 命令：

```sh
mvn clean compile
```

确保你在正确的项目目录中运行该命令。

通过这些步骤，你可以成功安装和配置 Maven，并解决 `zsh: command not found: mvn` 错误。
