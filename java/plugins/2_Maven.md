# Maven

::: tip 核心功能
项目构建工具，依赖管理。
:::

## 一、概念与作用

### 1. 概念

Maven 是一个基于项目对象模型（Project Object Model，POM）的项目管理工具，用于构建和管理 Java 项目。它可以自动化项目的构建过程，管理项目的依赖关系，执行单元测试，并生成项目文档等。

![An image](/images/java/maven.png)

### 2. 作用

- **项目构建**: Maven 可以自动化执行项目的构建过程，包括编译源代码、运行单元测试、打包和部署应用程序等。
- **依赖管理**: Maven 可以管理项目所依赖的第三方库和框架，通过配置依赖关系，Maven 能够自动下载并管理这些依赖项，简化了项目的配置和部署过程。
- **标准化项目结构**: Maven 规定了一套标准的项目结构，使得开发者可以更加容易地理解和维护项目。

## 二、Maven 的基本原理

Maven 的基本原理包括以下几个方面：

- **项目对象模型（POM）**: Maven 使用 POM 描述项目的结构和依赖关系。POM 是一个 XML 文件，包含了项目的元数据信息，如项目的坐标、依赖关系、构建配置等。
- **依赖管理**: Maven 通过依赖管理来管理项目所依赖的第三方库和框架。通过在 POM 文件中声明依赖关系，Maven 能够自动下载并安装这些依赖项，并确保它们的版本和兼容性。
- **生命周期和插件**: Maven 使用生命周期和插件来执行项目的各种构建任务。生命周期定义了项目构建过程中的不同阶段，如编译、测试、打包等；而插件则负责执行特定的任务，如编译 Java 源代码、执行单元测试等。

### 生命周期

Maven 定义了一系列生命周期阶段，常见的阶段包括：

- **validate**：验证项目是否正确并且所有必要信息都可用。
- **compile**：编译项目的源代码。
- **test**：使用适当的单元测试框架运行测试。
- **package**：将编译后的代码打包成可分发的格式，如 JAR 或 WAR。
- **verify**：运行任何检查过程以验证包的有效性和质量。
- **install**：将包安装到本地仓库中，供本地项目使用。
- **deploy**：将最终的包复制到远程仓库，供其他开发人员和项目使用。

## 三、具体实践（安装与创建）

![An image](/images/java/maven-2.png)

::: danger 待完善

> TODO

:::

### 1. 安装 Maven

- 下载 Maven 安装包，并解压到本地文件夹。
- 配置环境变量 `M2_HOME` 指向 Maven 的安装路径，并将 `%M2_HOME%\bin` 添加到系统的 `PATH` 环境变量中。
- 官网地址：`http://maven.apache.org/`
- Maven 下载地址：`http://maven.apache.org/download.cgi`

### 2. 创建 Maven 项目

- 打开命令行工具，进入项目所在目录。
- 使用 Maven 的 `archetype` 命令创建项目模板，如 `mvn archetype:generate`。
- 根据提示输入项目的基本信息，包括 `groupId`, `artifactId`, `version` 等。
- Maven 将自动生成项目的基本结构和配置文件。

> `pom.xml` 是 Maven 项目的核心配置文件。

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">

    <!-- 项目基本信息 -->
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>my-project</artifactId>
    <version>1.0.0</version>
    <name>My Project</name>
    <description>This is a sample Maven project.</description>

    <!-- 项目依赖 -->
    <dependencies>
        <!-- 示例：JUnit 测试框架 -->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <!-- 项目构建配置 -->
    <build>
        <!-- 编译器插件 -->
        <plugins>
            <!-- 示例：Maven 编译插件 -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.1</version>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                </configuration>
            </plugin>
        </plugins>
    </build>

</project>
```

这个示例包含了以下基本配置：

1. `<modelVersion>`: Maven 模型版本，固定为 4.0.0。
2. `<groupId>`: 项目的组织或公司标识符。
3. `<artifactId>`: 项目的唯一标识符。
4. `<version>`: 项目的版本号。
5. `<name>`: 项目的名称。
6. `<description>`: 项目的描述信息。
7. `<dependencies>`: 项目的依赖配置，包括各种第三方库和框架。
8. `<build>`: 项目的构建配置，包括编译器插件、打包方式等。

## 四、常见命令

> Maven 提供了一组命令行工具用于执行各种构建任务。

- `mvn clean`: 清理项目目录，删除 target 目录中生成的文件。
- `mvn compile`: 编译项目的源代码。
- `mvn test`: 执行单元测试。
- `mvn package`: 打包项目，生成可部署的构建文件。
- `mvn install`: 将项目构建结果安装到本地仓库。
- `mvn deploy`: 将项目构建结果发布到远程仓库。

---

- [Java-Maven 详解](https://www.cnblogs.com/liugp/p/16221170.html)
