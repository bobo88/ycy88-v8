# Gradle

> 语法比 maven 简单，上手快？

_Gradle 是一个基于 Groovy 或 Kotlin DSL 的现代构建自动化工具，用于项目构建、依赖管理和自动化工作流。它灵活、可扩展，并且广泛应用于 Java 和 Android 项目。_

## 一、概念和作用

### 概念

- **DSL（Domain-Specific Language）**：Gradle 使用 Groovy 或 Kotlin 编写的 DSL 来定义构建脚本，这使得构建脚本简洁且易于理解。
- **任务（Tasks）**：Gradle 的核心概念。任务是构建过程中的基本单元，例如编译代码、运行测试、打包应用等。
- **插件（Plugins）**：Gradle 通过插件扩展其功能，例如 Java 插件、应用插件、Spring Boot 插件等。
- **依赖管理**：Gradle 使用 repositories（如 Maven Central, JCenter）和 dependencies 来管理项目所需的库和模块。

### 作用

- **项目构建**：自动化编译、打包、测试、部署等流程。
- **依赖管理**：自动下载、配置和更新项目所需的依赖项。
- **多项目构建**：支持构建大型、多模块的项目，能有效地管理项目间的依赖关系。
- **任务管理**：定义、配置和执行自定义任务，实现复杂的构建逻辑和工作流。

## 二、具体用法

### 基本配置

一个简单的 Gradle 项目通常包括以下文件：

- `build.gradle`：主构建脚本文件。
- `settings.gradle`：项目设置文件（在多项目构建中尤为重要）。

### 创建项目

首先，创建一个新的 Gradle 项目：

```sh
gradle init --type java-application
```

这会生成一个基本的项目结构，包括 `build.gradle` 文件和一些示例代码。

### `build.gradle` 示例

这是一个简单的 `build.gradle` 文件，用于定义一个 Java 项目的构建配置：

```groovy
plugins {
    id 'java'
}

group 'com.example'
version '1.0-SNAPSHOT'

sourceCompatibility = '11'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter:2.5.4'
    testImplementation 'org.springframework.boot:spring-boot-starter-test:2.5.4'
}

test {
    useJUnitPlatform()
}
```

- **插件（Plugins）**：声明使用 `java` 插件。
- **组和版本（group 和 version）**：定义项目的组 ID 和版本。
- **源代码兼容性（sourceCompatibility）**：指定 Java 源代码的兼容性版本。
- **仓库（repositories）**：声明依赖库的获取位置。
- **依赖（dependencies）**：声明项目所依赖的库。
- **测试配置（test）**：配置测试任务使用 JUnit 平台。

### 运行构建任务

在项目目录中执行以下命令来运行 Gradle 构建任务：

```sh
gradle build
```

这将执行项目的所有构建任务，包括编译、测试和打包。

### 定义自定义任务

可以在 `build.gradle` 中定义自定义任务，例如：

```groovy
task hello {
    doLast {
        println 'Hello, Gradle!'
    }
}

task copyFiles(type: Copy) {
    from 'src/main/resources'
    into 'build/resources'
}
```

执行自定义任务：

```sh
gradle hello
gradle copyFiles
```

### 多项目构建

对于多模块项目，可以在 `settings.gradle` 文件中配置子项目：

```groovy
rootProject.name = 'multi-project'
include 'module1', 'module2'
```

每个子项目都有自己的 `build.gradle` 文件：

```groovy
// module1/build.gradle
plugins {
    id 'java'
}

dependencies {
    implementation project(':module2')
}
```

在根项目中执行构建任务会构建所有子项目：

```sh
gradle build
```

## 三、常用 Gradle 命令

- `gradle tasks`：列出所有可用的任务。
- `gradle build`：执行编译、测试、打包等所有构建任务。
- `gradle clean`：清理构建目录。
- `gradle test`：运行测试。
- `gradle dependencies`：查看项目的依赖关系。

## 四、总结

Gradle 是一个功能强大且灵活的构建工具，通过使用 Groovy 或 Kotlin DSL 编写构建脚本，可以轻松实现项目构建、依赖管理和自动化工作流。理解并熟练使用 Gradle 可以大大提高开发效率，特别是在大型和复杂项目中。

## 五、与 Maven 的差异

### 1、构建脚本语言

- **Maven**：使用 XML 配置文件（`pom.xml`）来定义项目结构和构建过程。XML 的结构化特性使得 Maven 配置文件易于阅读和解析，但在处理复杂逻辑时不够灵活。

- **Gradle**：使用基于 Groovy 或 Kotlin 的 DSL（Domain-Specific Language）来定义构建脚本（`build.gradle` 或 `build.gradle.kts`）。DSL 提供了更强的表达能力和灵活性，适合处理复杂的构建逻辑和定制化需求。

### 2、灵活性和扩展性

- **Maven**：依赖于生命周期和插件，扩展性较强，但有时会因为插件配置复杂而显得笨重。Maven 具有固定的生命周期阶段（如 validate、compile、test、package 等），用户必须在这些阶段内进行配置和扩展。

- **Gradle**：非常灵活，允许用户以编程方式定义任务和扩展构建逻辑。Gradle 没有固定的生命周期阶段，用户可以自由定义和组织任务，适应各种复杂的构建需求。

### 3、性能

- **Maven**：性能较好，但在处理大型项目时可能会遇到瓶颈。每次构建通常会从头开始，虽然 Maven 3 引入了增量构建，但在实际使用中效果有限。

- **Gradle**：设计上更注重性能，支持增量构建和构建缓存。Gradle 可以只重新构建受影响的部分，从而显著缩短构建时间。此外，Gradle 的并行构建特性可以进一步提升性能。

### 4、依赖管理

- **Maven**：使用中央仓库（Maven Central）和本地仓库进行依赖管理。Maven 的依赖解析机制较为严格，有时可能会遇到依赖冲突问题，需要手动排除或解决。

- **Gradle**：也使用类似的仓库（如 Maven Central 和 JCenter），但在依赖解析和冲突处理方面更为灵活。Gradle 支持更细粒度的依赖管理，并且可以方便地定义和解析动态版本。

### 5、社区和生态系统

- **Maven**：拥有一个成熟和广泛使用的生态系统，提供了丰富的插件和文档支持。许多企业级项目和库都使用 Maven 进行构建和发布。

- **Gradle**：虽然较 Maven 新，但已经获得了广泛的支持，特别是在 Android 开发中。Gradle 生态系统正在快速发展，提供了许多插件和集成工具。

### 6、典型用例和配置示例

#### Maven 示例

`pom.xml` 配置示例：

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>myapp</artifactId>
    <version>1.0-SNAPSHOT</version>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
            <version>2.5.4</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.1</version>
                <configuration>
                    <source>11</source>
                    <target>11</target>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

#### Gradle 示例

`build.gradle` 配置示例（Groovy）：

```groovy
plugins {
    id 'java'
}

group 'com.example'
version '1.0-SNAPSHOT'

sourceCompatibility = '11'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter:2.5.4'
}

tasks.register('hello') {
    doLast {
        println 'Hello, Gradle!'
    }
}
```

### 7、总结

- **Maven**：适合需要稳定性和标准化构建过程的项目，尤其是那些依赖成熟生态系统和插件的企业级项目。
- **Gradle**：适合需要灵活构建和复杂依赖管理的项目，特别是大型、多模块项目和 Android 开发。
