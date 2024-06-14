# Log4j/SLF4J

日志框架。

## 一、SLF4J 的作用和逻辑

**SLF4J (Simple Logging Facade for Java)** 是一个简单的日志门面，允许你在代码中使用统一的 API 进行日志记录，而具体的日志实现可以在运行时绑定（例如 Log4j、Logback 等）。SLF4J 提供了一个标准接口，不直接提供日志记录功能，而是将日志调用委托给具体的日志实现框架。

## 二、SLF4J 的主要优点

1. **统一的日志接口**：
   - SLF4J 提供了一个通用的接口，允许你在应用程序中使用同样的日志 API，而不必依赖具体的日志实现。
2. **灵活的日志实现绑定**：

   - 你可以在部署时选择不同的日志实现，而无需修改代码。这允许你在开发和生产环境中使用不同的日志框架，例如在开发环境中使用 Logback，在生产环境中使用 Log4j。

3. **减少依赖冲突**：
   - 使用 SLF4J 可以避免在项目中引入多个不同的日志框架，导致依赖冲突的问题。SLF4J 通过桥接器将不同的日志实现统一起来。

## 三、使用 SLF4J 进行日志记录的基本步骤

1. **添加依赖**：

   - 在你的项目中添加 SLF4J 和具体日志实现的依赖。例如，在 Maven 项目中：

   ```xml
   <dependency>
       <groupId>org.slf4j</groupId>
       <artifactId>slf4j-api</artifactId>
       <version>1.7.30</version>
   </dependency>
   <dependency>
       <groupId>org.slf4j</groupId>
       <artifactId>slf4j-log4j12</artifactId>
       <version>1.7.30</version>
   </dependency>
   <dependency>
       <groupId>log4j</groupId>
       <artifactId>log4j</artifactId>
       <version>1.2.17</version>
   </dependency>
   ```

2. **配置日志实现**：

   - 配置具体的日志实现框架，例如 Log4j 的配置文件 `log4j.properties`：

   ```properties
   log4j.rootLogger=DEBUG, stdout, file

   log4j.appender.stdout=org.apache.log4j.ConsoleAppender
   log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
   log4j.appender.stdout.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} [%t] %-5p %c{1}:%L - %m%n

   log4j.appender.file=org.apache.log4j.RollingFileAppender
   log4j.appender.file.File=logs/app.log
   log4j.appender.file.MaxFileSize=10MB
   log4j.appender.file.MaxBackupIndex=10
   log4j.appender.file.layout=org.apache.log4j.PatternLayout
   log4j.appender.file.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} [%t] %-5p %c{1}:%L - %m%n
   ```

3. **在代码中使用 SLF4J**：

   - 在代码中，通过 SLF4J 记录日志信息。例如，在 `EncryptUtil` 类中：

   ```java
   package cn.com.gthz.gateway.common;

   import org.slf4j.Logger;
   import org.slf4j.LoggerFactory;

   import java.io.UnsupportedEncodingException;
   import java.net.URLDecoder;
   import java.net.URLEncoder;
   import java.util.Base64;

   public class EncryptUtil {
       private static final Logger logger = LoggerFactory.getLogger(EncryptUtil.class);

       public static String encodeBase64(byte[] bytes) {
           String encoded = Base64.getEncoder().encodeToString(bytes);
           return encoded;
       }

       public static byte[] decodeBase64(String str) {
           byte[] bytes = null;
           bytes = Base64.getDecoder().decode(str);
           return bytes;
       }

       public static String encodeUTF8StringBase64(String str) {
           String encoded = null;
           try {
               encoded = Base64.getEncoder().encodeToString(str.getBytes("utf-8"));
           } catch (UnsupportedEncodingException e) {
               logger.warn("不支持的编码格式", e);
           }
           return encoded;
       }

       public static String decodeUTF8StringBase64(String str) {
           String decoded = null;
           byte[] bytes = Base64.getDecoder().decode(str);
           try {
               decoded = new String(bytes, "utf-8");
           } catch (UnsupportedEncodingException e) {
               logger.warn("不支持的编码格式", e);
           }
           return decoded;
       }

       public static String encodeURL(String url) {
           String encoded = null;
           try {
               encoded = URLEncoder.encode(url, "utf-8");
           } catch (UnsupportedEncodingException e) {
               logger.warn("URLEncode失败", e);
           }
           return encoded;
       }

       public static String decodeURL(String url) {
           String decoded = null;
           try {
               decoded = URLDecoder.decode(url, "utf-8");
           } catch (UnsupportedEncodingException e) {
               logger.warn("URLDecode失败", e);
           }
           return decoded;
       }

       public static void main(String[] args) {
           String str = "abcd{'a':'b'}";
           String encoded = EncryptUtil.encodeUTF8StringBase64(str);
           String decoded = EncryptUtil.decodeUTF8StringBase64(encoded);
           System.out.println(str);
           System.out.println(encoded);
           System.out.println(decoded);

           String url = "== wo";
           String urlEncoded = EncryptUtil.encodeURL(url);
           String urlDecoded = EncryptUtil.decodeURL(urlEncoded);

           System.out.println(url);
           System.out.println(urlEncoded);
           System.out.println(urlDecoded);
       }
   }
   ```

## 四、具体的日志记录逻辑

在上面的 `EncryptUtil` 类中：

- **Logger 初始化**：

  ```java
  private static final Logger logger = LoggerFactory.getLogger(EncryptUtil.class);
  ```

  - 使用 `LoggerFactory.getLogger` 方法获取一个 `Logger` 实例。这是 SLF4J 提供的标准方法，用于获取与指定类关联的 `Logger`。

- **记录日志信息**：

  - 在 `encodeUTF8StringBase64` 和 `decodeUTF8StringBase64` 方法中，捕获 `UnsupportedEncodingException` 异常，并记录警告日志。
  - 日志信息包括一条描述性消息和异常堆栈跟踪信息，帮助开发人员了解异常发生的原因和位置。

  ```java
  try {
      encoded = Base64.getEncoder().encodeToString(str.getBytes("utf-8"));
  } catch (UnsupportedEncodingException e) {
      logger.warn("不支持的编码格式", e);
  }
  ```

  ```java
  try {
      decoded = new String(bytes, "utf-8");
  } catch (UnsupportedEncodingException e) {
      logger.warn("不支持的编码格式", e);
  }
  ```

  - 在 `encodeURL` 和 `decodeURL` 方法中，同样捕获 `UnsupportedEncodingException` 异常，并记录警告日志。

  ```java
  try {
      encoded = URLEncoder.encode(url, "utf-8");
  } catch (UnsupportedEncodingException e) {
      logger.warn("URLEncode失败", e);
  }
  ```

  ```java
  try {
      decoded = URLDecoder.decode(url, "utf-8");
  } catch (UnsupportedEncodingException e) {
      logger.warn("URLDecode失败", e);
  }
  ```

通过 SLF4J 记录日志，开发人员可以在不修改应用程序代码的情况下，切换不同的日志实现（如 Log4j、Logback），并根据需要配置日志输出的格式、级别和目标（如控制台、文件）。这使得日志管理更加灵活和可配置。
