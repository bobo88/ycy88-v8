# 知识清单 - 编程语言和框架

::: tip 编程语言和框架

- 精通一种或多种服务端编程语言，如 Java、Python、Go、Node.js、C#等。
- 了解并熟练使用相关的服务端框架，如 Spring、Django、Express.js、ASP.NET 等。

:::

## 一、Java ｜ Node

### === Java 基础知识：

1. **基本语法和数据类型：**

- 变量、常量、数据类型、运算符等基本概念。

2. **流程控制：**

- 条件语句（if、else、switch）、循环语句（for、while、do-while）。

3. **面向对象编程（OOP）：**

- 类和对象、封装、继承、多态、抽象类、接口。

类（Class）： 类是一种用户自定义的数据类型，用于表示具有相似特征和行为的对象的模板。例如，Person 类可以有属性（姓名、年龄）和方法（说话、行走）。

```java
public class Person {
    // 属性
    String name;
    int age;

    // 方法
    void speak() {
        System.out.println("Hello!");
    }

    void walk() {
        System.out.println("Walking...");
    }
}
```

对象（Object）： 对象是类的实例，是具体存在的数据。使用类创建对象，可以通过对象访问类中的属性和方法。

```java
public class Main {
    public static void main(String[] args) {
        // 创建 Person 类的对象
        Person person1 = new Person();

        // 设置对象的属性
        person1.name = "Alice";
        person1.age = 25;

        // 调用对象的方法
        person1.speak();
        person1.walk();
    }
}
```

封装是将数据和操作封装在类中的概念。通过使用访问修饰符（如 private、public、protected），可以控制对类的内部细节的访问。

```java
public class Person {
    private String name;
    private int age;

    // Getter 和 Setter 方法用于访问私有成员变量
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // ...
}
```

继承是从一个已存在的类派生出一个新类的过程。新类继承了原始类的属性和方法，并且可以添加新的属性和方法，或修改现有的方法。

```java
// 原始类
public class Animal {
    void eat() {
        System.out.println("Animal is eating...");
    }
}

// 派生类
public class Dog extends Animal {
    void bark() {
        System.out.println("Dog is barking...");
    }
}
```

多态允许一个对象在不同情境下表现出不同的行为。在 Java 中，多态通过方法的重载和重写来实现。

```java
// 父类
class Animal {
    void sound() {
        System.out.println("Animal makes a sound");
    }
}

// 子类1
class Dog extends Animal {
    void sound() {
        System.out.println("Dog barks");
    }
}

// 子类2
class Cat extends Animal {
    void sound() {
        System.out.println("Cat meows");
    }
}
```

抽象类是不能实例化的类，用于将一些通用的方法声明在抽象类中，然后由其子类提供具体的实现。

```java
// 抽象类
abstract class Shape {
    abstract void draw(); // 抽象方法
}

// 子类1
class Circle extends Shape {
    void draw() {
        System.out.println("Drawing a circle");
    }
}

// 子类2
class Square extends Shape {
    void draw() {
        System.out.println("Drawing a square");
    }
}
```

接口是一种抽象类型，它定义了一组方法，但没有提供方法的实现。一个类可以实现一个或多个接口，从而实现多继承的效果。

```java
// 接口
interface Drawable {
    void draw();
}

// 实现接口的类
class Circle implements Drawable {
    public void draw() {
        System.out.println("Drawing a circle");
    }
}

// 另一个实现接口的类
class Square implements Drawable {
    public void draw() {
        System.out.println("Drawing a square");
    }
}
```

4. **异常处理：**

- try-catch 块、自定义异常、finally、throw 和 throws 关键字。

5. **集合框架：**

- List、Set、Map 等接口及其实现类，迭代器、比较器。
  - List 接口及实现类：ArrayList、LinkedList、Vector；
  - Set 接口及实现类：HashSet、TreeSet、LinkedHashSet；
  - Map 接口及实现类：HashMap、TreeMap、LinkedHashMap；
  - 迭代器（Iterator）：迭代器是集合框架中用于遍历集合元素的通用方式。通过 Iterator 接口可以在集合中前进和后退遍历。
  - 比较器（Comparator）：比较器接口用于定义集合中元素的排序规则。常用于 TreeSet 和 TreeMap 等需要排序的集合。

6. **字符串处理：**

- 字符串的常见操作，StringBuilder、StringBuffer 的使用。

7. **输入输出（I/O）：**

- 文件读写、字节流和字符流。

```java
// 读取文件
BufferedReader reader = new BufferedReader(new FileReader("example.txt"));
String line = reader.readLine();

// 写入文件
BufferedWriter writer = new BufferedWriter(new FileWriter("output.txt"));
writer.write("Hello, World!");
```

```java
// 完整代码如下：
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        // 使用try-with-resources确保资源被关闭
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("output.txt"))) {
            writer.write("Hello, World!");
            System.out.println("File written successfully.");
        } catch (IOException e) {
            // 处理异常
            e.printStackTrace();
        }
    }
}

// javac -encoding UTF-8 Main.java
```

8. **多线程：**

- 线程的创建与启动、同步与锁、线程池。
  - 线程的创建与启动： 可以通过继承 Thread 类或实现 Runnable 接口来创建线程，并使用 start() 方法启动线程。
  - 同步： 通过关键字 synchronized、Lock 接口等方式实现对共享资源的同步访问，避免数据不一致问题。
  - 线程的通信： 使用 wait()、notify()、notifyAll() 等方法实现线程间的通信。
  - 线程的生命周期： 线程的生命周期包括新建、就绪、运行、阻塞和死亡等状态，可以通过 Thread 类提供的方法来管理线程的生命周期。

9. **Lambda 表达式：**

- Java 8 引入的函数式编程特性。

### === 高级特性：

10. **反射（Reflection）：**

- Class 类、Method、Field 等反射相关的 API。

11. **泛型：**

- 泛型类、泛型方法、泛型接口。
  - 泛型类是具有一个或多个类型参数的类，可以在类的定义中使用这些类型参数。
  - 泛型方法是具有一个或多个类型参数的方法，可以在方法的返回类型、参数列表中使用这些类型参数。
  - 泛型接口是具有一个或多个类型参数的接口，可以在接口的方法定义中使用这些类型参数。

12. **枚举：**

- 枚举类型的定义、枚举常量、枚举方法。
  - 使用场景：
    - 代替常量： 枚举提供了一种更好的方式来表示一组常量，比使用整数或字符串更具可读性。
    - 有限集合的表示： 当一个变量只能取有限个数的值时，可以使用枚举类型。
    - 操作状态： 枚举常常用于表示操作状态，如开关的状态、按钮的状态等。

13. **注解（Annotation）：**

- 内建注解（@Override、@Deprecated、@SuppressWarnings）。
  - @Override： 用于标识一个方法是否是父类中的方法重写。
  - @Deprecated： 用于标识一个类、方法、字段已经过时，不推荐使用。
  - @SuppressWarnings： 用于抑制编译器或工具产生的警告。
- 自定义注解：
  - 定义注解： 使用 @interface 关键字定义注解。
  - 使用注解： 在类、方法、字段等元素上使用自定义注解。
  - 获取注解信息： 使用反射可以获取注解信息。

### === Java 核心类库：

14. **Java 常用工具类：**

- Math、Arrays、Collections 等类的使用。

15. **日期和时间：**

- java.time 包中的 LocalDate、LocalTime、DateTimeFormatter 等类。

### === Java 进阶：

16. **设计模式：**

- 常见设计模式，如单例模式、工厂模式、观察者模式等。

17. **I/O 进阶：**

- NIO、文件读写优化、序列化与反序列化。

18. **网络编程：**

- Socket 编程、HTTP 协议、HTTPURLConnection。

19. **JVM 与内存模型：**

- Java 虚拟机、垃圾回收机制、堆、栈。

### === Java 工具和框架：

20. **Maven：**

- 项目构建工具，依赖管理。

21. **Gradle：**

- 项目构建工具，依赖管理。

22. **JUnit：**

- Java 单元测试框架。

23. **Log4j/SLF4J：**

- 日志框架。

24. **Spring 框架：**

- Spring IOC、AOP、Spring MVC。

25. **Spring Boot：**

- 简化 Spring 应用开发的框架。

26. **Spring Cloud：**

- 构建分布式系统的工具集。

27. **Hibernate：**

- ORM 框架，用于数据库操作。

28. **MyBatis：**

- 另一种流行的持久层框架。

29. **Tomcat：**

- Java Web 应用服务器。

30. **Servlet 和 JSP：**

- Java Web 开发基础。

31. **RESTful API：**

- 设计和实现 RESTful 风格的 API。

32. **JSON 处理：**

- Jackson、Gson 等 JSON 处理库。

33. **Docker：**

- 容器化技术，用于应用部署。

34. **Git：**

- 分布式版本控制工具。

35. **JUnit 和 Mockito：**

- 单元测试和模拟框架。

## 二、Spring ｜ Express.js

Spring Cloud 是基于 Spring 框架构建的一套用于开发分布式系统的工具集合，它提供了一系列开发工具和服务，用于快速构建分布式系统中的一些常见模式，例如配置管理、服务发现、断路器、路由、微服务通信等。Spring Cloud 主要关注微服务架构中的开发、部署、监控等方面，旨在帮助开发者更容易地构建和管理分布式系统。

以下是 Spring Cloud 的一些核心组件和特性：

1. **服务发现：** Spring Cloud 提供了服务发现的能力，通过集成服务注册中心（如 Netflix Eureka、Consul 等），使得微服务能够在整个系统中被发现和调用。

2. **负载均衡：** 集成了负载均衡机制，通过 Ribbon 或者其他负载均衡组件，实现了在多个服务实例之间进行负载均衡，提高系统的性能和可用性。

3. **断路器：** 基于 Netflix Hystrix，实现了断路器模式，当某个服务出现故障或延迟时，可以阻止请求继续发送，从而保护系统的稳定性。

4. **配置管理：** 集成了分布式配置中心，可以通过 Spring Cloud Config 来集中管理配置信息，实现配置的集中化管理和动态刷新。

5. **网关：** Spring Cloud Gateway 提供了一个构建 API 网关的框架，用于管理和路由微服务，支持动态路由、过滤器等功能。

6. **消息驱动：** 集成了 Spring Cloud Stream，用于支持消息驱动的微服务架构，例如通过消息队列进行微服务之间的通信。

7. **分布式跟踪：** 集成了 Spring Cloud Sleuth，用于在分布式系统中跟踪请求的流程和性能。

8. **服务调用：** 集成了 Feign，提供了一种声明式的、模板化的 HTTP 客户端，简化了服务调用的过程。

9. **分布式事务：** 集成了 Spring Cloud Alibaba 的分布式事务解决方案 Seata，用于处理分布式事务问题。

10. **微服务监控：** 集成了 Spring Cloud Alibaba 的 Nacos，用于提供微服务的注册、发现和动态配置管理等功能。

总体而言，Spring Cloud 通过一系列组件和框架，为开发者提供了在微服务架构下构建分布式系统的全面解决方案，使得开发、部署和管理分布式系统变得更加简便和高效。
