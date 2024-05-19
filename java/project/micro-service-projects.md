# 微服务项目用 jar 还是 war？

在微服务架构中，一般推荐打包为 **JAR** 包，而不是 WAR 包。这是因为微服务通常采用 Spring Boot 等框架来开发，这些框架支持将整个应用打包成一个可执行的 JAR 文件。

## 一、为什么选择 JAR 包？

### 1. **自包含性**

- **可执行 JAR 文件**：Spring Boot 等框架允许将应用及其所有依赖项打包到一个可执行的 JAR 文件中。这意味着运行应用程序所需的一切都包含在一个文件中。
- **独立运行**：你不需要依赖外部的应用服务器（如 Tomcat、Jetty）。Spring Boot 内嵌了服务器，这使得部署和运行变得非常简单，只需执行 `java -jar yourapp.jar`。

### 2. **简化部署**

- **容器友好**：可执行 JAR 文件非常适合容器化（如 Docker）。你可以很容易地在 Docker 镜像中运行 JAR 文件，简化了容器的构建和部署过程。
- **CI/CD 集成**：在 CI/CD 管道中，使用可执行 JAR 文件简化了构建和部署步骤。

### 3. **开发和测试便利性**

- **快速启动**：Spring Boot 应用通常启动更快，因为它们不需要等待应用服务器的启动时间。
- **简单配置**：应用服务器的配置和管理（如部署 WAR 文件到 Tomcat）在 Spring Boot 中变得不再必要，减少了配置和管理的复杂性。

## 二、如何构建微服务项目的 JAR 包？

假设使用 Spring Boot，以下是一个基本的 Maven 项目结构和配置：

### 项目结构

```
microservice/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── example/
│   │   │           └── MicroserviceApplication.java
│   │   ├── resources/
│   │   │   └── application.yml
│   └── test/
│       └── java/
│           └── com/
│               └── example/
│                   └── MicroserviceApplicationTests.java
├── pom.xml
└── target/
    └── microservice-1.0-SNAPSHOT.jar
```

### `pom.xml` 示例

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>microservice</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>jar</packaging> <!-- 确保打包类型为 JAR -->

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.6.4</version> <!-- 使用合适的 Spring Boot 版本 -->
    </parent>

    <dependencies>
        <!-- Spring Boot Web Starter -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!-- 其他依赖项 -->
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

### 主应用程序类 `MicroserviceApplication.java`

```java
package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MicroserviceApplication {
    public static void main(String[] args) {
        SpringApplication.run(MicroserviceApplication.class, args);
    }
}
```

## 三、构建和运行 JAR 包

### 构建 JAR 包

在项目根目录下运行以下命令：

```sh
mvn clean package
```

### 运行 JAR 包

构建完成后，在 `target` 目录下会生成一个可执行的 JAR 文件。运行该文件：

```sh
java -jar target/microservice-1.0-SNAPSHOT.jar
```

通过上述步骤，你可以轻松地创建、构建并运行一个 Spring Boot 微服务项目。选择 JAR 包的方式提供了自包含、简化部署和容器化的优势，非常适合现代微服务架构。

---

- [Maven 项目管理流程](./2_maven-build-project.md)
