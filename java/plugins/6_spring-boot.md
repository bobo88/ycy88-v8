# Spring Boot

简化 Spring 应用开发的框架。Spring Boot 的核心思想是约定大于配置，一切由内定的约束来自动完成。

::: tip Spring Boot 和 Spring Cloud 的区别

1. Spring Boot 是一个开发框架，而 Spring Cloud 是一个构建分布式系统的工具集。

2. Spring Boot 关注的是快速构建单个应用，而 Spring Cloud 则专注于快速构建分布式系统中的一组微服务。

3. Spring Boot 主要关注简化 Spring 应用开发，而 Spring Cloud 关注的是使用 Spring Boot 在分布式系统环境中的软件开发。

4. Spring Boot 有助于简化 Spring 项目的初始搭建以及开发过程，而 Spring Cloud 侧重于在分布式系统中构建和部署分布式服务。

5. Spring Boot 提供自己的依赖管理和自动配置，而 Spring Cloud 不提供自动配置，但提供可靠的服务发现、配置管理、路由、微代理、事件总线等组件。

6. SpringBoot 可以离开 SpringCloud 独立开发项目，但是 SpringCloud 离不开 SpringBoot，属于依赖关系。

:::

![An image](/images/java/spring-cloud.png)

## 一、Spring Boot 核心概念

### 1.1 自动配置

Spring Boot 自动配置是其核心功能之一，通过这一功能，Spring Boot 能够根据应用程序的类路径中存在的 jar 包依赖和应用中的一些自定义配置，自动地配置 Spring 应用。自动配置的目标是减少开发者的配置负担，使得他们可以专注于业务逻辑而非繁琐的配置工作。

自动配置的主要机制是通过 `@EnableAutoConfiguration` 注解实现的，这个注解可以开启 Spring Boot 的自动配置功能。Spring Boot 会根据项目依赖的 jar 包自动配置相关的 Spring 模块，例如，如果项目中有 HSQLDB 依赖，Spring Boot 会自动配置嵌入式数据库。

#### 工作原理

Spring Boot 在启动时会扫描类路径中的所有 jar 包，并根据这些 jar 包中的某些类和配置文件来决定需要加载哪些自动配置类。具体来说，Spring Boot 会查找每个 jar 包中的 `META-INF/spring.factories` 文件，该文件列出了该 jar 包中的自动配置类。Spring Boot 会根据这些类以及应用程序的实际情况，选择合适的自动配置类来加载。

#### 示例

假设你在项目中添加了 `spring-boot-starter-data-jpa` 依赖，那么 Spring Boot 会自动配置 DataSource、EntityManagerFactory 和 TransactionManager 等。

```java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

在上面的示例中，`@SpringBootApplication` 注解实际上是一个组合注解，它包含了 `@EnableAutoConfiguration`、`@ComponentScan` 和 `@Configuration` 等注解。因此，这个简单的类已经具备了自动配置的功能。

如果需要排除某些自动配置，可以使用 `@SpringBootApplication` 注解的 `exclude` 属性：

```java
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

### 1.2 起步依赖

Spring Boot 起步依赖（Starters）是 Spring Boot 另一个核心功能。起步依赖是一些方便的依赖描述符，包含了一组特定的库和默认配置。它们的设计目的是简化 Maven 或 Gradle 项目的构建配置。

起步依赖将常用的库和默认配置集成到一个依赖项中，使得开发者不再需要逐个添加依赖和配置。例如，`spring-boot-starter-web` 起步依赖包含了构建 Web 应用所需的所有库，包括 Spring MVC、Jackson（用于 JSON 处理）和嵌入式 Tomcat 服务器。

#### 常用起步依赖

1. `spring-boot-starter`: 核心起步依赖，包含自动配置支持、日志和 YAML 支持。
2. `spring-boot-starter-web`: 用于构建 Web 应用，包括 RESTful 应用，内置 Tomcat 和 Spring MVC。
3. `spring-boot-starter-data-jpa`: 用于访问数据库的起步依赖，包含 Spring Data JPA、Hibernate。
4. `spring-boot-starter-security`: 用于安全认证和授权的起步依赖，包含 Spring Security。
5. `spring-boot-starter-test`: 包含常用的测试依赖，如 JUnit、Mockito 和 Spring Test。

#### 示例

要构建一个 Web 应用程序，只需在 `pom.xml` 中添加以下依赖：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

通过这种方式，开发者无需逐一添加 Spring MVC、Tomcat 等依赖项，大大简化了配置过程。

### 1.3 命令行界面（CLI）

Spring Boot 提供了一个命令行界面（CLI），使得开发者可以快速编写、运行 Spring 应用程序。Spring Boot CLI 支持使用 Groovy 脚本来编写 Spring 应用，简化了 Spring 应用的开发过程。

Spring Boot CLI 主要适用于快速原型开发和微服务开发，它允许开发者通过简洁的脚本来定义应用程序的行为，并即时运行这些脚本，而无需编译和构建整个项目。

#### 安装 CLI

Spring Boot CLI 可以通过 SDKMAN、Homebrew 或直接下载压缩包进行安装。

使用 SDKMAN 安装：

```bash
sdk install springboot
```

使用 Homebrew 安装：

```bash
brew install springboot
```

#### 编写并运行脚本

创建一个名为 `app.groovy` 的文件，内容如下：

```groovy
@RestController
class WebApplication {

    @RequestMapping("/")
    String home() {
        "Hello, Spring Boot CLI!"
    }
}
```

在命令行运行：

```bash
spring run app.groovy
```

这样，Spring Boot CLI 会启动一个嵌入式的 Web 服务器，并运行这个简单的 Web 应用。

### CLI 命令示例

以下是一些常用的 Spring Boot CLI 命令示例：

1. 运行 Groovy 脚本：

   ```bash
   spring run app.groovy
   ```

2. 编译 Groovy 脚本：

   ```bash
   spring compile app.groovy
   ```

3. 创建新项目：

   ```bash
   spring init -d=web my-project
   ```

   这个命令会使用 `spring-boot-starter-web` 起步依赖创建一个名为 `my-project` 的新项目。

4. 查看 Spring Boot CLI 版本：

   ```bash
   spring --version
   ```

5. 获取帮助信息：

   ```bash
   spring help
   ```

通过 Spring Boot CLI，开发者可以快速进行应用开发和测试，无需编写大量的配置代码，从而提升开发效率。

## 二、Spring Boot 入门

### 2.1 创建 Spring Boot 项目

创建一个 Spring Boot 项目有多种方法，常用的包括使用 Spring Initializr、命令行工具、以及手动创建项目。

#### 使用 Spring Initializr

Spring Initializr 是一个在线工具，可以生成一个基于 Spring Boot 的项目结构。通过选择需要的依赖、项目元数据等，Spring Initializr 会生成一个包含所有基本配置的项目。

访问 [Spring Initializr](https://start.spring.io/) 网站，选择项目属性：

- Project: Maven 或 Gradle
- Language: Java、Kotlin 或 Groovy
- Spring Boot Version: 选择合适的版本
- Project Metadata: 填写 Group、Artifact、Name、Description、Package Name 等信息
- Dependencies: 选择所需的起步依赖，如 Spring Web、Spring Data JPA 等

点击 "Generate" 按钮下载项目，并解压到本地。

#### 使用 Spring Boot CLI

使用 Spring Boot CLI 可以快速创建项目。在命令行中输入以下命令：

```bash
spring init --dependencies=web,data-jpa my-spring-boot-project
```

这将创建一个名为 `my-spring-boot-project` 的项目，并包含 Spring Web 和 Spring Data JPA 依赖。

#### 手动创建项目

手动创建 Spring Boot 项目需要以下步骤：

1. 创建项目目录结构：

   ```
   my-spring-boot-project
   ├── src
   │   ├── main
   │   │   ├── java
   │   │   │   └── com
   │   │   │       └── example
   │   │   │           └── myapplication
   │   │   │               └── Application.java
   │   │   └── resources
   │   │       ├── static
   │   │       ├── templates
   │   │       └── application.properties
   │   └── test
   │       └── java
   └── pom.xml
   ```

2. 创建 `pom.xml` 文件，添加 Spring Boot 依赖：

   ```xml
   <project xmlns="http://maven.apache.org/POM/4.0.0"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
       <modelVersion>4.0.0</modelVersion>
       <groupId>com.example</groupId>
       <artifactId>my-spring-boot-project</artifactId>
       <version>0.0.1-SNAPSHOT</version>
       <packaging>jar</packaging>
       <name>my-spring-boot-project</name>
       <description>Demo project for Spring Boot</description>
       <parent>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-starter-parent</artifactId>
           <version>2.5.4</version>
           <relativePath/> <!-- lookup parent from repository -->
       </parent>
       <properties>
           <java.version>11</java.version>
       </properties>
       <dependencies>
           <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-starter-web</artifactId>
           </dependency>
           <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-starter-data-jpa</artifactId>
           </dependency>
           <dependency>
               <groupId>com.h2database</groupId>
               <artifactId>h2</artifactId>
               <scope>runtime</scope>
           </dependency>
           <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-starter-test</artifactId>
               <scope>test</scope>
           </dependency>
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

3. 创建主应用程序类 `Application.java`：

   ```java
   package com.example.myapplication;

   import org.springframework.boot.SpringApplication;
   import org.springframework.boot.autoconfigure.SpringBootApplication;

   @SpringBootApplication
   public class Application {
       public static void main(String[] args) {
           SpringApplication.run(Application.class, args);
       }
   }
   ```

### 2.2 运行 Spring Boot 项目

运行 Spring Boot 项目有多种方法，主要包括通过 IDE、Maven/Gradle 和命令行。

#### 使用 IDE

在 Eclipse、IntelliJ IDEA 或其他支持 Spring Boot 的 IDE 中，可以直接运行主类 `Application`：

1. 右键点击 `Application.java` 文件。
2. 选择 `Run As` -> `Java Application`。

IDE 会编译项目并启动 Spring Boot 应用程序。

#### 使用 Maven

在项目根目录下，使用以下命令运行 Spring Boot 应用：

```bash
mvn spring-boot:run
```

#### 使用命令行

编译项目并生成可执行的 jar 包：

```bash
mvn clean package
```

运行生成的 jar 包：

```bash
java -jar target/my-spring-boot-project-0.0.1-SNAPSHOT.jar
```

### 2.3 打包 Spring Boot 项目

Spring Boot 项目可以打包成可执行的 jar 包或 war 包，以便于部署。

#### 打包成可执行的 jar 包

Spring Boot 默认会打包成可执行的 jar 包。执行以下 Maven 命令：

```bash
mvn clean package
```

这个命令会生成一个在 `target` 目录下的 jar 包，例如 `my-spring-boot-project-0.0.1-SNAPSHOT.jar`。这个 jar 包包含所有的依赖，并且内置了一个应用服务器（例如 Tomcat），可以独立运行。

运行生成的 jar 包：

```bash
java -jar target/my-spring-boot-project-0.0.1-SNAPSHOT.jar
```

#### 打包成 war 包

如果需要将 Spring Boot 应用打包成 war 包并部署到外部应用服务器（如 Tomcat、Jetty），需要进行一些配置修改。

1. 修改 `pom.xml`：

   ```xml
   <packaging>war</packaging>
   ```

   添加 `spring-boot-starter-tomcat` 作为 provided 依赖：

   ```xml
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-tomcat</artifactId>
       <scope>provided</scope>
   </dependency>
   ```

2. 创建一个类继承 `SpringBootServletInitializer`：

   ```java
   package com.example.myapplication;

   import org.springframework.boot.builder.SpringApplicationBuilder;
   import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

   public class ServletInitializer extends SpringBootServletInitializer {
       @Override
       protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
           return application.sources(Application.class);
       }
   }
   ```

3. 执行打包命令：
   ```bash
   mvn clean package
   ```

这会生成一个在 `target` 目录下的 war 包，例如 `my-spring-boot-project-0.0.1-SNAPSHOT.war`，可以部署到外部应用服务器。

通过这些步骤，可以快速创建、运行和打包 Spring Boot 项目，方便地进行开发和部署。

## 三、Spring Boot 配置

### 3.1 配置文件

> application.properties、application.yml、application.yaml。

#### 3.1.1 application.properties

`application.properties` 文件使用键值对的形式来定义配置属性。

```properties
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/mydb
spring.datasource.username=root
spring.datasource.password=secret
```

#### 3.1.2 application.yml

`application.yml` 文件使用 `YAML` 语法来定义配置属性。YAML 语法更简洁，适合层次结构较深的配置。

```yml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: root
    password: secret
```

### 3.2 配置文件加载顺序

> application.properties > application.yml > application.yaml

### 3.3 配置文件占位符

在 Spring Boot 中，配置文件占位符用于引用配置文件中的其他属性值。这种引用可以简化配置文件的管理，使得某些属性值可以在一个地方定义，然后在多个地方使用。配置文件占位符的语法是 `${property.name}`。

以下是配置文件占位符的几个示例：

#### 示例一：引用简单属性值

假设在 `application.properties` 文件中有以下配置：

```properties
server.port=8080
app.name=My Spring Boot Application
app.description=${app.name} is running on port ${server.port}
```

在上述示例中，`app.description` 属性使用占位符引用了 `app.name` 和 `server.port` 属性的值。结果，`app.description` 的值将是 `My Spring Boot Application is running on port 8080`。

#### 示例二：引用复杂属性值

假设在 `application.yml` 文件中有以下配置：

```yaml
server:
  port: 8080
app:
  name: My Spring Boot Application
  description: ${app.name} is running on port ${server.port}
```

在上述示例中，`app.description` 属性使用占位符引用了 `app.name` 和 `server.port` 属性的值。结果，`app.description` 的值将是 `My Spring Boot Application is running on port 8080`。

#### 示例三：随机值

Spring Boot 提供了一些内置的占位符，可以生成随机值，这在需要随机端口、随机密钥等场景下非常有用。

```properties
random.value=${random.value}
random.int=${random.int}
random.long=${random.long}
random.uuid=${random.uuid}
```

在上述示例中，Spring Boot 会自动生成一个随机值，并将其注入到配置属性中。

### 3.4 配置文件属性注入

Spring Boot 提供了多种方式将配置文件中的属性注入到 Spring Bean 中，最常见的方式包括使用 `@Value` 注解和 `@ConfigurationProperties` 注解。

#### 使用 `@Value` 注解

`@Value` 注解用于将单个配置属性的值注入到 Spring Bean 中。

以下是一个使用 `@Value` 注解的示例：

```java
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class MyComponent {

    @Value("${app.name}")
    private String appName;

    @Value("${server.port}")
    private int serverPort;

    public void printConfig() {
        System.out.println("Application Name: " + appName);
        System.out.println("Server Port: " + serverPort);
    }
}
```

在上述示例中，`app.name` 和 `server.port` 的值会分别注入到 `appName` 和 `serverPort` 属性中。

#### 使用 `@ConfigurationProperties` 注解

`@ConfigurationProperties` 注解用于将一组相关的配置属性注入到一个 POJO（Plain Old Java Object）中。这种方式在处理较大的配置时更加方便和清晰。

以下是一个使用 `@ConfigurationProperties` 注解的示例：

首先，在配置文件中定义一组属性：

```yaml
app:
  name: My Spring Boot Application
  server:
    port: 8080
    contextPath: /api
```

然后，创建一个对应的配置类：

```java
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app")
public class AppConfig {

    private String name;
    private Server server;

    public static class Server {
        private int port;
        private String contextPath;

        // getters and setters
        public int getPort() {
            return port;
        }

        public void setPort(int port) {
            this.port = port;
        }

        public String getContextPath() {
            return contextPath;
        }

        public void setContextPath(String contextPath) {
            this.contextPath = contextPath;
        }
    }

    // getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Server getServer() {
        return server;
    }

    public void setServer(Server server) {
        this.server = server;
    }
}
```

在上述示例中，`@ConfigurationProperties` 注解会将 `app.name`、`app.server.port` 和 `app.server.contextPath` 等属性值注入到 `AppConfig` 类的相应字段中。

#### 使用 `@ConfigurationProperties` 的其他注解

通常，我们还会结合 `@EnableConfigurationProperties` 注解一起使用，以确保 Spring Boot 能够正确地扫描和注册配置类：

```java
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(AppConfig.class)
public class AppConfigLoader {
}
```

这样，Spring Boot 在启动时会自动加载和注入配置属性。

通过以上方式，Spring Boot 提供了灵活而强大的配置属性管理机制，帮助开发者更方便地管理和使用配置。

### 3.5 配置文件属性覆盖

Spring Boot 提供了一种灵活的机制来覆盖配置属性。你可以在不同的环境中使用不同的配置文件，并按照特定的顺序加载这些配置文件，以实现属性覆盖。

#### 属性覆盖的顺序

1. **命令行参数**：最高优先级，直接覆盖其他配置源中的属性。
2. **Java 系统属性**：通过 `System.getProperties()` 获取。
3. **操作系统环境变量**：通过 `System.getenv()` 获取。
4. **`application-{profile}.properties` 或 `application-{profile}.yml`** 文件：特定环境的配置文件，如 `application-dev.properties`。
5. **`application.properties` 或 `application.yml`** 文件：默认配置文件。
6. **应用程序 JAR 包内部的 `application.properties` 或 `application.yml`** 文件：最低优先级。

#### 示例

假设你有以下配置文件：

`application.properties`：

```properties
server.port=8080
```

`application-dev.properties`：

```properties
server.port=9090
```

当你以 `dev` 配置文件运行时，`server.port` 将会被设置为 `9090`。

```bash
java -jar myapp.jar --spring.profiles.active=dev
```

### 3.6 配置文件多环境支持

Spring Boot 支持多环境配置文件，通过激活不同的环境来加载对应的配置文件。使用 `application-{profile}.properties` 或 `application-{profile}.yml` 文件来实现多环境配置。

#### 示例

创建不同环境的配置文件：

`application-dev.properties`：

```properties
server.port=9090
spring.datasource.url=jdbc:mysql://localhost:3306/devdb
spring.datasource.username=devuser
spring.datasource.password=devpass
```

`application-prod.properties`：

```properties
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/proddb
spring.datasource.username=produser
spring.datasource.password=prodpass
```

在启动应用程序时指定激活的环境：

```bash
java -jar myapp.jar --spring.profiles.active=dev
```

或者在 `application.properties` 文件中设置默认激活的环境：

```properties
spring.profiles.active=dev
```

### 3.7 配置文件属性加密

在某些情况下，配置文件中可能包含敏感信息（例如数据库密码），为了安全起见，最好对这些敏感信息进行加密。

#### 使用 Jasypt 加密配置属性

[Jasypt](http://www.jasypt.org/)（Java Simplified Encryption）是一个常用的 Java 加密库，它可以轻松地与 Spring Boot 集成，来加密和解密配置属性。

#### 步骤

1. **引入依赖**

在 `pom.xml` 中添加 Jasypt 依赖：

```xml
<dependency>
    <groupId>com.github.ulisesbocchio</groupId>
    <artifactId>jasypt-spring-boot-starter</artifactId>
    <version>3.0.4</version>
</dependency>
```

2. **配置加密属性**

在配置文件中，使用 `ENC()` 包裹需要加密的属性值：

`application.properties`：

```properties
spring.datasource.password=ENC(encryptedPassword)
```

3. **配置解密密码**

你可以通过命令行参数、环境变量或 `application.properties` 文件来提供解密密码：

```bash
java -jar myapp.jar --jasypt.encryptor.password=secret
```

或者在 `application.properties` 中：

```properties
jasypt.encryptor.password=secret
```

4. **加密属性值**

你可以使用 Jasypt 提供的命令行工具来加密属性值。例如，使用以下命令来加密数据库密码：

```bash
java -cp jasypt-spring-boot-3.0.4.jar com.ulisesbocchio.jasyptspringboot.commandline.JasyptEncryptorCLI input="myPassword" password="secret"
```

该命令将输出加密后的密码值，你可以将其放入配置文件中。

通过以上步骤，你可以在 Spring Boot 项目中轻松实现配置文件属性的加密，从而保护敏感信息的安全。

## 四、整合 Junit

JUnit 是 Java 平台上用于单元测试的框架，Spring Boot 提供了良好的支持来整合 JUnit 进行测试。这里将介绍如何整合 JUnit 及其常用的扩展库，如 JUnit-Mock、JUnit-Mockito 和 JUnit-PowerMock。

### 4.1 整合 Junit

整合 JUnit 是进行单元测试的基础步骤。Spring Boot 提供了 `spring-boot-starter-test` 依赖，其中包含了 JUnit 和其他常用的测试库。

#### 添加依赖

在 `pom.xml` 中添加 `spring-boot-starter-test` 依赖：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

#### 编写测试类

创建一个简单的测试类来测试 Spring Boot 应用的功能。

```java
package com.example.myapplication;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class ApplicationTests {

    @Test
    void contextLoads() {
        assertTrue(true);
    }
}
```

在这个测试类中，使用了 `@SpringBootTest` 注解来加载 Spring 应用上下文，并编写了一个简单的测试方法 `contextLoads()`。

### 4.2 整合 Junit-Mock

JUnit-Mock 是一个扩展库，用于模拟对象和行为，以便于对复杂的依赖进行单元测试。

#### 添加依赖

在 `pom.xml` 中添加 `mockito-core` 依赖：

```xml
<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-core</artifactId>
    <version>3.9.0</version>
    <scope>test</scope>
</dependency>
```

#### 使用 Mock

创建一个模拟服务的测试类。

```java
package com.example.myapplication;

import com.example.myapplication.service.MyService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class MyServiceTests {

    @Mock
    private MyService myService;

    @InjectMocks
    private MyServiceTests myServiceTests;

    public MyServiceTests() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testService() {
        when(myService.getServiceName()).thenReturn("Mock Service");
        String serviceName = myService.getServiceName();
        assertEquals("Mock Service", serviceName);
    }
}
```

在这个测试类中，使用了 `@Mock` 注解来模拟 `MyService` 对象，使用 `@InjectMocks` 注解来注入模拟对象，并编写了一个简单的测试方法 `testService()`。

### 4.3 整合 Junit-Mockito

Mockito 是一个流行的 Java 模拟框架，用于创建和配置模拟对象。Spring Boot 提供了对 Mockito 的良好支持。

#### 添加依赖

在 `pom.xml` 中添加 `mockito-core` 和 `spring-boot-starter-test` 依赖：

```xml
<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-core</artifactId>
    <version>3.9.0</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
    <exclusions>
        <exclusion>
            <groupId>org.mockito</groupId>
            <artifactId>mockito-core</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

#### 使用 Mockito

创建一个模拟服务的测试类。

```java
package com.example.myapplication;

import com.example.myapplication.service.MyService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class MyServiceTests {

    @Mock
    private MyService myService;

    @InjectMocks
    private MyServiceTests myServiceTests;

    public MyServiceTests() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testService() {
        when(myService.getServiceName()).thenReturn("Mock Service");
        String serviceName = myService.getServiceName();
        assertEquals("Mock Service", serviceName);
    }
}
```

### 4.4 整合 Junit-PowerMock

PowerMock 是一个扩展库，用于模拟静态方法、构造函数和私有方法。它与 Mockito 一起使用，可以增强其功能。

#### 添加依赖

在 `pom.xml` 中添加 `powermock` 和 `mockito-core` 依赖：

```xml
<dependency>
    <groupId>org.powermock</groupId>
    <artifactId>powermock-module-junit4</artifactId>
    <version>2.0.9</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.powermock</groupId>
    <artifactId>powermock-api-mockito2</artifactId>
    <version>2.0.9</version>
    <scope>test</scope>
</dependency>
```

#### 使用 PowerMock

创建一个使用 PowerMock 的测试类。

```java
package com.example.myapplication;

import com.example.myapplication.service.MyService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.boot.test.context.SpringBootTest;

import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;

@RunWith(PowerMockRunner.class)
@PrepareForTest({MyService.class})
@SpringBootTest
public class MyServiceTests {

    @Mock
    private MyService myService;

    @InjectMocks
    private MyServiceTests myServiceTests;

    public MyServiceTests() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testStaticMethod() {
        PowerMockito.mockStatic(MyService.class);
        when(MyService.getStaticServiceName()).thenReturn("Mock Static Service");
        String serviceName = MyService.getStaticServiceName();
        assertEquals("Mock Static Service", serviceName);
    }
}
```

在这个测试类中，使用了 `@RunWith(PowerMockRunner.class)` 和 `@PrepareForTest` 注解来配置 PowerMock，并编写了一个测试静态方法的测试方法 `testStaticMethod()`。

## 五、整合 MyBatis

MyBatis 是一个优秀的持久层框架，它支持自定义 SQL、存储过程以及高级映射。与 Spring Boot 整合，可以简化配置和开发过程。本节将介绍如何在 Spring Boot 中整合 MyBatis。

### 5.1 添加依赖

在 `pom.xml` 中添加 MyBatis 和 MyBatis-Spring-Boot-Starter 依赖：

```xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.1.4</version>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
```

### 5.2 配置数据源

在 `application.properties` 或 `application.yml` 中配置数据源信息：

#### application.properties

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/yourdatabase
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

mybatis.mapper-locations=classpath:mapper/*.xml
mybatis.type-aliases-package=com.example.demo.model
```

#### application.yml

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/yourdatabase
    username: root
    password: yourpassword
    driver-class-name: com.mysql.cj.jdbc.Driver

mybatis:
  mapper-locations: classpath:mapper/*.xml
  type-aliases-package: com.example.demo.model
```

### 5.3 创建 Mapper 接口和 XML 映射文件

#### Mapper 接口

在 `com.example.demo.mapper` 包下创建一个 Mapper 接口：

```java
package com.example.demo.mapper;

import com.example.demo.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import java.util.List;

@Mapper
public interface UserMapper {

    @Select("SELECT * FROM users")
    List<User> findAll();
}
```

#### XML 映射文件

在 `src/main/resources/mapper` 目录下创建一个对应的 XML 文件 `UserMapper.xml`：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.example.demo.mapper.UserMapper">
    <select id="findAll" resultType="com.example.demo.model.User">
        SELECT * FROM users
    </select>
</mapper>
```

### 5.4 创建实体类

在 `com.example.demo.model` 包下创建实体类 `User`：

```java
package com.example.demo.model;

public class User {
    private Long id;
    private String name;
    private String email;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
```

### 5.5 编写 Service 和 Controller

#### Service

在 `com.example.demo.service` 包下创建 `UserService` 类：

```java
package com.example.demo.service;

import com.example.demo.mapper.UserMapper;
import com.example.demo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {

    private final UserMapper userMapper;

    @Autowired
    public UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public List<User> findAll() {
        return userMapper.findAll();
    }
}
```

#### Controller

在 `com.example.demo.controller` 包下创建 `UserController` 类：

```java
package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.findAll();
    }
}
```

### 5.6 运行项目

完成上述步骤后，启动 Spring Boot 应用，并访问 `http://localhost:8080/users`，应能看到从数据库中查询到的用户数据。

通过以上步骤，您已经成功将 MyBatis 整合到 Spring Boot 项目中，并完成了一个简单的 CRUD 应用。MyBatis 提供了强大的 SQL 控制能力，与 Spring Boot 的整合使得开发过程更加高效。

## 六、整合 Redis

整合 Redis 到你的应用程序中可以提高性能和可扩展性。

### 6.1 添加 Redis 依赖项

在你的项目中添加 Redis 客户端库的依赖项。对于 Spring Boot 项目，可以使用 Spring Data Redis 来简化整合过程。

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

### 6.2 配置 Redis 连接

在`application.properties`或`application.yml`文件中配置 Redis 连接信息，包括主机、端口和认证密码（如果有的话）。

#### application.properties

```properties
spring.redis.host=localhost
spring.redis.port=6379
spring.redis.password=yourpassword
```

#### application.yml

```yaml
spring:
  redis:
    host: localhost
    port: 6379
    password: yourpassword
```

### 6.3 使用 RedisTemplate 进行操作

在你的代码中注入`RedisTemplate`，然后使用它来执行 Redis 操作，如设置键值对、获取值、执行事务等。

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class MyService {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    public void setValue(String key, String value) {
        redisTemplate.opsForValue().set(key, value);
    }

    public String getValue(String key) {
        return redisTemplate.opsForValue().get(key);
    }
}
```

### 6.4 使用注解缓存数据

Spring 提供了`@Cacheable`、`@CachePut`和`@CacheEvict`等注解，可以方便地将方法的返回值缓存到 Redis 中。

```java
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class MyService {

    @Cacheable(value = "myCache", key = "#id")
    public String getDataFromDatabase(String id) {
        // 从数据库获取数据的逻辑
        return "data";
    }
}
```

### 6.5 高级特性

除了基本的操作和缓存之外，Redis 还提供了许多高级特性，如发布/订阅、分布式锁、事务等。根据你的需求，可以进一步探索这些特性并将它们整合到你的应用程序中。

### 6.6 测试和优化

整合完成后，确保对整合的功能进行充分的测试，以确保它们按预期工作。并根据需要进行优化，如调整缓存策略、使用合适的数据结构、监控 Redis 性能等。

整合 Redis 能够为你的应用程序带来很多好处，包括提高性能、降低数据库负载、实现实时数据处理等。通过合理地利用 Redis，你可以构建出更加强大和高效的应用程序。

## 七、整合 Spring Cloud

整合 Spring Cloud 可以让你的应用程序更好地适应分布式系统的需求，提供了丰富的功能和工具来简化微服务架构的开发和管理。

### 7.1 添加 Spring Cloud 依赖项

在你的项目中添加 Spring Cloud 相关的依赖项，可以使用 Spring Boot 的起始器来简化依赖管理。

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter</artifactId>
    <version>2021.0.0</version>
</dependency>
```

### 7.2 配置 Spring Cloud 组件

根据你的需求，配置 Spring Cloud 组件，如服务发现（Eureka、Consul）、负载均衡（Ribbon、Spring Cloud LoadBalancer）、配置中心（Spring Cloud Config）、断路器（Hystrix、Resilience4j）、网关（Spring Cloud Gateway、Zuul）等。

### 7.3 使用 Spring Cloud 功能

根据你的应用程序需要，使用 Spring Cloud 提供的功能，如服务注册与发现、负载均衡、分布式配置、断路器、分布式消息传递等。

### 7.4 集成服务注册与发现

如果你的应用程序是一个微服务架构，那么你可能需要使用 Spring Cloud 的服务注册与发现功能来管理服务之间的通信。你可以选择使用 Eureka、Consul 等注册中心，并使用 Spring Cloud 提供的相关组件来实现服务的注册与发现。

### 7.5 集成负载均衡

在微服务架构中，负载均衡是一个重要的组件，可以提高系统的性能和可靠性。Spring Cloud 提供了多种负载均衡的实现方式，如 Ribbon、Spring Cloud LoadBalancer 等，你可以根据自己的需求选择合适的方式。

### 7.6 集成分布式配置

通过 Spring Cloud Config 等组件，你可以将应用程序的配置信息集中管理，并实现动态刷新配置的功能，这对于微服务架构中的配置管理非常有用。

### 7.7 集成断路器

在微服务架构中，服务之间的依赖关系复杂，一旦某个服务出现故障或者延迟，可能会导致整个系统的不可用。通过集成断路器（如 Hystrix、Resilience4j），可以实现服务的熔断和降级，提高系统的可靠性。

### 7.8 集成网关

通过集成网关（如 Spring Cloud Gateway、Zuul），可以实现统一的入口和路由管理，提高系统的安全性和可扩展性。

### 7.9 测试和优化

完成整合后，务必进行充分的测试，包括单元测试、集成测试和端到端测试，以确保整合的功能能够按预期工作。并根据需要进行优化，如调整负载均衡策略、优化配置中心的性能等。

通过整合 Spring Cloud，你可以构建出一个强大、高效、可靠的分布式系统，满足不同场景下的需求。同时，Spring Cloud 提供了丰富的文档和社区支持，可以帮助你更好地理解和使用它的功能。

## 八、流程分析 & 监控

> TODO

### 8.1 初始化

### 8.2 run

## 九、部署

> TODO

---
