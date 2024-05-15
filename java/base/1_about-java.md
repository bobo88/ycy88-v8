# Java 是什么？

Java 是一种广泛使用的编程语言，由 Sun Microsystems（现为 Oracle 的一部分）于 1995 年发布。它是一种通用的、面向对象的、类似于 C++但设计上更简单的高级语言。Java 的设计原则是使得编程人员能够编写一次代码，在任何支持 Java 的平台上都能运行，这一原则通常被总结为“**编写一次，到处运行**”（Write Once, Run Anywhere, WORA）。

## 一、主要特点

1. **面向对象**：Java 是一种面向对象的语言，这意味着它支持诸如继承、封装和多态等面向对象的概念。

2. **平台无关性**：Java 程序是编译成一个与平台无关的字节码格式，通过 Java 虚拟机（JVM）在不同的设备上运行，这使得 Java 应用可以跨平台运行。

3. **简单性**：Java 设计时考虑到易学易用，去除了 C++中的一些难以理解的部分（如指针和运算符重载）。

4. **安全性**：Java 提供了许多安全特性，包括在运行时对字节码的验证和对内存的管理，防止一些常见的内存溢出和恶意攻击。

5. **健壮性**：Java 的强类型机制、异常处理和垃圾自动回收等都有助于增加程序的健壮性。

6. **多线程**：Java 内置了对多线程编程的支持，使得开发并行处理应用变得更简单。

7. **丰富的 API**：Java 提供了一个庞大的标准库（Java API），包括各种工具和接口，从而简化了网络、输入输出、数据结构等多种任务的处理。

8. **广泛的社区支持和开源生态**：Java 有着庞大的开发者社区以及大量开源项目库，这为学习和开发提供了丰富资源。

## 二、工作原理

Hello world

```java
public class Hello{
  public static void main(String[] args){
    System.out.println("Hello world!");
  }
}
```

### 1）Java 语言和 API

Java API 提供了一个庞大的库，使开发者能够轻松实现常见的编程任务，从集合处理和文件操作到网络通信和图形界面开发等。API 分为几个核心的部分，包括：

- **java.lang** 和 **java.util**：包含了进行基础编程的必需类，如字符串、数学函数、系统管理功能、集合框架等。
- **java.io** 和 **java.nio**：提供了数据输入输出功能，包括文件和缓冲区操作。
- **java.net**：包含用于网络编程的类和接口，支持 HTTP、TCP/IP 等协议。
- **java.awt** 和 **javax.swing**：用于构建图形用户界面的工具包。

### 2）Java 虚拟机

> Java 虚拟机（JVM）是一个执行 Java 字节码的抽象计算机。它是 Java 平台的核心组成部分，使 Java 能够在不同的操作系统上运行而无需重写代码。

## 三、Java 版本

::: info Java 版本

- Java 标准版（Java SE）
  - 最基础的 Java 平台，提供了进行常规桌面和服务器应用程序开发所需的全部功能。它包括 Java 运行时环境（JRE），标准的 API 类库，以及 Java 虚拟机（JVM）。Java SE 是其他两个版本的基础，提供了语言基础和标准库。
- Java 企业版（Java EE）
  - 是在 Java SE 的基础上，为企业级应用提供的一个扩展平台，支持大型、分布式、多层次的网络应用开发。它包括 Web 服务、组件模型、管理 API、通讯 API 等企业级功能，支持企业环境中的应用服务器和相关服务。
- Java 微型版（Java ME）
  - 已经基本不再使用。

:::

## 四、Java 相关流程图/架构图

### 1）Java 程序的编译运行过程

![An image](/images/java/java-1.png)

::: info Java 整个编译以及运行的过程相当繁琐，但简化来说，主要分为以下两大步骤：
1）Java 代码编译：创建完源文件之后，程序会先被编译为.class 文件，然后再编译成字节码（ByteCode）；

2）Java 字节码的执行：字节码由 Java 虚拟机（JVM）解释运行。
:::

### 2）JVM 内存模型

根据 JVM 规范，JVM 内存共分为程序计数器、虚拟机栈、本地方法栈、方法区、堆五个部分。

![An image](/images/java/java-2.png)

![An image](/images/java/java-3.png)

### 3）Java 多线程

![An image](/images/java/java-4.png)

### 4）Java 集合类

![An image](/images/java/java-5.png)

### 5）Spring

![An image](/images/java/java-6.png)

---

- [Java 是什么？Java 到底能干嘛？](https://zhuanlan.zhihu.com/p/91962295)
- [Java 程序员必备的一些流程图/架构图（拿走不谢）](https://zhuanlan.zhihu.com/p/357156806)
