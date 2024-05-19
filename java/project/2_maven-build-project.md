# Maven 项目管理流程

![An image](/images/java/maven-build.png)

使用 `IntelliJ IDEA` 创建、开发、修改、打包和部署 `Maven` 项目的具体步骤如下：

## 一、创建 Maven 项目

### 1. 安装 IntelliJ IDEA

确保你已经安装并运行 `IntelliJ IDEA`。

### 2. 创建新的 Maven 项目

1. **打开 IntelliJ IDEA**，点击 `File > New > Project...`。
2. 在弹出的对话框中，选择 `Maven`，然后点击 `Next`。
3. 填写项目的 `GroupId` 和 `ArtifactId`，例如：
   - GroupId: `com.example`
   - ArtifactId: `my-app`
4. 选择项目的 JDK（确保安装了 JDK）。
5. 点击 `Next`，然后点击 `Finish` 完成项目创建。

## 二、配置和开发项目

### 3. 项目结构

IntelliJ IDEA 会自动生成一个基本的 Maven 项目结构：

```
my-app/
├── pom.xml
└── src
    ├── main
    │   └── java
    │       └── com
    │           └── example
    │               └── App.java
    └── test
        └── java
            └── com
                └── example
                    └── AppTest.java
```

### 4. 修改代码

1. **添加主类**：
   打开 `src/main/java/com/example/App.java`，修改或添加以下代码：

   ```java
   package com.example;

   public class App {
       public static void main(String[] args) {
           System.out.println("Hello World!");
       }
   }
   ```

2. **添加测试类**：
   打开 `src/test/java/com/example/AppTest.java`，修改或添加以下代码：

   ```java
   package com.example;

   import org.junit.jupiter.api.Test;

   import static org.junit.jupiter.api.Assertions.assertTrue;

   public class AppTest {
       @Test
       public void shouldAnswerWithTrue() {
           assertTrue(true);
       }
   }
   ```

### 5. 添加依赖（可选）

在 `pom.xml` 文件中添加依赖，例如：

```xml
<dependencies>
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter-api</artifactId>
        <version>5.7.0</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter-engine</artifactId>
        <version>5.7.0</version>
        <scope>test</scope>
    </dependency>
</dependencies>
```

### 6. 刷新 Maven 配置

右键点击项目，选择 `Maven > Reload Project`，确保 IntelliJ IDEA 重新加载 `pom.xml` 的配置。

## 三、编译和运行项目

### 7. 编译项目

打开 **Terminal** 或使用 IntelliJ IDEA 内置的终端，运行以下命令编译项目：

```bash
mvn clean compile
```

![An image](/images/java/maven-build-2.png)

### 8. 运行项目

通过 IntelliJ IDEA 运行主类：

1. 右键点击 `App.java` 文件，选择 `Run 'App.main()'`。

或者使用以下命令运行项目：

```bash
mvn exec:java -Dexec.mainClass="com.example.App"
```

## 四、打包项目

### 9. 打包项目为 JAR 文件

在 **Terminal** 或 IntelliJ IDEA 内置终端中运行以下命令打包项目：

```bash
mvn clean package
```

这会在 `target` 目录下生成一个 `my-app-1.0-SNAPSHOT.jar` 文件。

![An image](/images/java/maven-build-3.png)

### 10. 配置可执行 JAR（可选）

在 `pom.xml` 文件中添加以下插件配置，**使生成的 JAR 文件可执行**：

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-jar-plugin</artifactId>
            <version>3.2.0</version>
            <configuration>
                <archive>
                    <manifest>
                        <mainClass>com.example.App</mainClass>
                    </manifest>
                </archive>
            </configuration>
        </plugin>
    </plugins>
</build>
```

然后再次运行 `mvn clean package`。

## 五、部署项目

### 11. 部署 JAR 文件

将生成的 `my-app-1.0-SNAPSHOT.jar` 文件复制到目标服务器或目标环境中，然后运行以下命令启动应用程序：

```bash
java -jar my-app-1.0-SNAPSHOT.jar
```

![An image](/images/java/maven-build-4.png)

## 六、总结

::: tip 总结

1. **创建 Maven 项目**：使用 IntelliJ IDEA 创建一个新的 Maven 项目。
2. **配置和开发项目**：添加和修改代码，更新 `pom.xml` 中的依赖。
3. **编译和运行项目**：使用 Maven 命令编译和运行项目。
4. **打包项目**：使用 Maven 打包项目为 JAR 文件。
5. **部署项目**：将生成的 JAR 文件部署到目标服务器并运行。

:::

通过这些步骤，你可以从创建一个新的 `Maven` 项目到最终部署它，涵盖了开发、打包和部署的所有基本操作。
