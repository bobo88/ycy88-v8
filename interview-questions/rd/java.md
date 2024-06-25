# Java 篇

> TODO

## 1. **什么是 JVM？解释其架构。**

- **JVM（Java Virtual Machine）**：是 Java 程序运行的虚拟机，负责将字节码转换为机器码执行。其架构包括类加载器、运行时数据区、执行引擎和本地接口。

## 2. **什么是 JDK 和 JRE？它们有什么区别？**

- **JDK（Java Development Kit）**：是 Java 开发工具包，包含 JRE 以及编译器、调试工具等开发工具。
- **JRE（Java Runtime Environment）**：是 Java 运行时环境，包含 JVM 和 Java 核心类库，用于运行 Java 程序。

## 3. **Java 中的基本数据类型有哪些？**

- Java 中的基本数据类型包括：byte、short、int、long、float、double、char、boolean。

## 4. **什么是面向对象编程的四大基本特性？**

- 面向对象编程的四大基本特性是封装、继承、多态和抽象。

## 5. **解释 Java 中的重载和重写的区别。**

- **重载（Overloading）**：在同一个类中，多个方法可以有相同的名字，但参数列表不同。
- **重写（Overriding）**：子类重新定义父类的方法，方法签名必须相同。

## 6. **什么是构造函数？有什么作用？**

- 构造函数是用来初始化对象的特殊方法，名字与类名相同，没有返回类型。它在创建对象时被调用，用于赋初值。

## 7. **Java 中的接口和抽象类有什么区别？**

- **接口**：只能声明抽象方法和常量，不能有实例变量。一个类可以实现多个接口。
- **抽象类**：可以包含抽象方法和具体方法，可以有实例变量。一个类只能继承一个抽象类。

## 8. **什么是线程？如何在 Java 中创建线程？**

- 线程是程序执行的最小单位。可以通过继承 `Thread` 类或实现 `Runnable` 接口来创建线程。

## 9. **什么是同步？如何在 Java 中实现同步？**

- 同步是指在多线程环境下对共享资源的访问进行控制，防止出现数据不一致的问题。在 Java 中可以使用 `synchronized` 关键字或 `ReentrantLock` 类实现同步。

## 10. **Java 中的异常处理机制是什么？**

- Java 使用 `try-catch` 块来捕获和处理异常。`try` 块包含可能抛出异常的代码，`catch` 块处理异常。`finally` 块包含总是会执行的代码，无论是否发生异常。

## 11. **什么是 Java 中的泛型？**

- 泛型是 Java 中的一种特性，用于在定义类、接口和方法时使用类型参数，从而实现代码的类型安全和复用性。

## 12. **Java 中的集合框架有哪些？**

- Java 集合框架包括：List（如 ArrayList, LinkedList）、Set（如 HashSet, TreeSet）、Map（如 HashMap, TreeMap）、Queue（如 LinkedList, PriorityQueue）。

## 13. **解释 Java 中的垃圾回收机制。**

- Java 的垃圾回收机制通过自动回收不再使用的内存来管理对象的生命周期。JVM 定期执行垃圾回收，通过标记和清除、复制、压缩等算法回收内存。

## 14. **什么是 Java 中的多态性？**

- 多态性是指同一个方法在不同对象上具有不同表现形式的能力。在 Java 中，通过方法重写和接口实现来实现多态性。

## 15. **什么是 Java 中的类加载机制？**

- 类加载机制是指将类的字节码文件加载到 JVM 中，并将其转换为 Class 对象。类加载器有三个主要类型：启动类加载器、扩展类加载器和应用程序类加载器。

## 16. **解释 Java 中的访问修饰符。**

- Java 提供了四种访问修饰符：`public`（公共的）、`protected`（受保护的）、`default`（默认的，即包级私有）、`private`（私有的），用于控制类、方法和变量的访问权限。

## 17. **什么是 Java 中的序列化和反序列化？**

- 序列化是指将对象的状态转换为字节流的过程，反序列化是指将字节流恢复为对象的过程。在 Java 中，使用 `Serializable` 接口实现序列化和反序列化。

## 18. **什么是 Java 中的反射机制？**

- 反射机制是指在运行时能够获取类的详细信息并操作类的属性和方法。在 Java 中，通过 `Class` 类和 `java.lang.reflect` 包实现反射。

## 19. **解释 Java 中的内部类和匿名内部类。**

- 内部类是在一个类的内部定义的类。匿名内部类是没有名字的内部类，通常用于实现接口或继承类的实例化。

## 20. **什么是 Java 中的 lambda 表达式？**

- Lambda 表达式是 Java 8 引入的一种简洁的函数式编程方式，用于替代匿名内部类，实现接口中的单个方法。

## 21. **Java 中的静态导入是什么？如何使用？**

- 静态导入允许导入静态成员（字段和方法），从而在使用它们时不需要类名前缀。使用 `import static` 关键字。

```java
import static java.lang.Math.*;
public class Test {
    public static void main(String[] args) {
        System.out.println(sqrt(16)); // 不需要 Math.sqrt
    }
}
```

## 22. **什么是 Java 中的默认方法（Default Methods）？**

- 默认方法是接口中的方法，可以有一个具体的实现。它允许接口在不破坏现有实现的情况下添加新方法。

```java
interface MyInterface {
    default void defaultMethod() {
        System.out.println("Default Method");
    }
}
```

## 23. **什么是枚举（Enum）？如何使用？**

- 枚举是一种特殊的类，用于定义常量集合。每个枚举常量都是一个枚举类型的实例。

```java
enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY;
}
```

## 24. **Java 中的注解（Annotations）是什么？**

- 注解是用于提供元数据的形式，可以应用于包、类、方法、变量等。常见注解包括 `@Override`、`@Deprecated`、`@SuppressWarnings`。

```java
@Override
public String toString() {
    return "MyClass";
}
```

## 25. **解释 Java 中的 try-with-resources 语句。**

- try-with-resources 语句用于自动关闭实现 `AutoCloseable` 接口的资源，如 `FileReader`、`BufferedReader` 等。

```java
try (BufferedReader br = new BufferedReader(new FileReader("file.txt"))) {
    // 读取文件
} catch (IOException e) {
    e.printStackTrace();
}
```

## 26. **什么是 Java 中的包装类（Wrapper Classes）？**

- 包装类是基本数据类型的对象表示。常见的包装类包括 `Integer`、`Double`、`Boolean` 等。

```java
int primitive = 5;
Integer wrapper = Integer.valueOf(primitive);
```

## 27. **Java 中的字符串池（String Pool）是什么？**

- 字符串池是 JVM 在内存中维护的一块区域，用于存储字符串字面量和 interned 字符串。相同的字符串字面量在内存中只会存储一份。

```java
String str1 = "Hello";
String str2 = "Hello"; // str1 和 str2 指向同一内存地址
```

## 28. **解释 Java 中的不可变对象（Immutable Objects）。**

- 不可变对象在创建后其状态不能改变。`String` 类是一个典型的不可变类。通过防止修改状态来确保线程安全。

```java
final class ImmutableClass {
    private final int value;
    public ImmutableClass(int value) {
        this.value = value;
    }
    public int getValue() {
        return value;
    }
}
```

## 29. **什么是单例模式（Singleton Pattern）？如何实现？**

- 单例模式确保一个类只有一个实例，并提供全局访问点。实现方法包括懒汉式、饿汉式和双重检查锁定。

```java
public class Singleton {
    private static Singleton instance;
    private Singleton() {}
    public static synchronized Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
```

## 30. **什么是 Java 的反序列化漏洞？如何防止？**

- 反序列化漏洞是在反序列化不可信数据时出现的安全问题。防止方法包括：不反序列化不可信数据、使用 `ObjectInputStream` 的 `resolveClass` 方法进行验证等。

```java
@Override
protected Class<?> resolveClass(ObjectStreamClass desc) throws IOException, ClassNotFoundException {
    if (!allowedClasses.contains(desc.getName())) {
        throw new InvalidClassException("Unauthorized deserialization attempt");
    }
    return super.resolveClass(desc);
}
```

## 31. **Java 中的 transient 关键字的作用是什么？**

- `transient` 关键字用于表示一个字段不应被序列化。当对象被序列化时，`transient` 字段的值不会被持久化。

```java
class MyClass implements Serializable {
    private transient int transientVar;
}
```

## 32. **解释 Java 中的弱引用（Weak Reference）。**

- 弱引用是引用类型的一种，不会阻止其引用的对象被垃圾回收。可以通过 `java.lang.ref.WeakReference` 类来创建弱引用。

```java
WeakReference<MyClass> weakRef = new WeakReference<>(new MyClass());
```

## 33. **Java 中的类加载器（ClassLoader）是什么？有哪些类型？**

- 类加载器负责将字节码文件加载到 JVM 中。常见的类加载器包括引导类加载器（Bootstrap ClassLoader）、扩展类加载器（Extension ClassLoader）、系统类加载器（System ClassLoader）。

## 34. **Java 中的自定义异常（Custom Exception）如何创建？**

- 自定义异常是通过扩展 `Exception` 或 `RuntimeException` 类创建的。

```java
public class MyCustomException extends Exception {
    public MyCustomException(String message) {
        super(message);
    }
}
```

## 35. **什么是 Java 中的断言（Assertions）？如何使用？**

- 断言是用于调试的工具，允许在运行时验证程序的逻辑一致性。使用 `assert` 关键字。

```java
int value = ...;
assert value > 0 : "Value must be positive";
```

## 36. **解释 Java 中的反射（Reflection）机制。**

- 反射机制允许在运行时检查和操作类的属性和方法。通过 `Class` 类及 `java.lang.reflect` 包实现。

```java
Class<?> clazz = Class.forName("com.example.MyClass");
Method method = clazz.getDeclaredMethod("myMethod");
method.invoke(clazz.newInstance());
```

## 37. **什么是 Java 中的工厂模式（Factory Pattern）？如何实现？**

- 工厂模式通过创建接口实现类的实例来创建对象。可以通过工厂方法或抽象工厂模式实现。

```java
interface Shape {
    void draw();
}
class Circle implements Shape {
    public void draw() {
        System.out.println("Drawing Circle");
    }
}
class ShapeFactory {
    public Shape getShape(String shapeType) {
        if (shapeType.equals("CIRCLE")) {
            return new Circle();
        }
        return null;
    }
}
```

## 38. **Java 中的序列化 ID（serialVersionUID）是什么？**

- `serialVersionUID` 是用于版本控制的唯一标识符，帮助在序列化和反序列化过程中保持类的兼容性。

```java
class MyClass implements Serializable {
    private static final long serialVersionUID = 1L;
}
```

## 39. **解释 Java 中的代理模式（Proxy Pattern）。**

- 代理模式通过代理对象控制对目标对象的访问。可以实现访问控制、日志记录等功能。

```java
interface Subject {
    void request();
}
class RealSubject implements Subject {
    public void request() {
        System.out.println("RealSubject request");
    }
}
class Proxy implements Subject {
    private RealSubject realSubject;
    public void request() {
        if (realSubject == null) {
            realSubject = new RealSubject();
        }
        realSubject.request();
    }
}
```

## 40. **什么是 Java 中的接口默认方法（Default Methods）？**

- 接口默认方法是接口中具有具体实现的方法，允许接口在不破坏实现类的情况下扩展新功能。

```java
interface MyInterface {
    default void defaultMethod() {
        System.out.println("Default Method");
    }
}
```
