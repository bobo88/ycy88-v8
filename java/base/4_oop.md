# 面向对象的基本概念

::: tip 关键词

- **类**：定义对象的蓝图，包括属性和行为。
- **对象**：类的实例，实际存在的实体。
- **继承**：一种关系，子类继承父类的属性和方法。
- **多态**：同一个方法在不同对象中有不同实现。
- **封装**：将属性私有化，通过公有方法控制访问。
- **接口**：一组抽象方法，类通过实现接口来实现多态。
- **抽象类**：不能实例化的类，包含抽象方法和具体方法。

:::

面向对象编程（Object-Oriented Programming，OOP）是一种编程范式，它将数据和操作数据的方法打包在一起，以对象的形式组织代码。以下是面向对象编程的基本概念：

## 一、类（Class）

类是面向对象编程的基本概念，它是一种抽象数据类型，用于描述具有相似特征和行为的对象的集合。类定义了对象的属性（成员变量）和方法（成员方法），是对象的模板或蓝图。例如，"Person"类可以表示人的抽象概念，其中包含姓名、年龄等属性，以及吃饭、睡觉等行为方法。

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

## 二、对象（Object）

对象是类的实例化，是类的具体化。每个对象都具有自己的状态（属性）和行为（方法），并且可以在程序中进行创建、使用和销毁。例如，"张三"和"李四"是"Person"类的两个对象，它们具有各自的姓名、年龄等属性，并可以调用吃饭、睡觉等方法。

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

## 三、继承（Inheritance）

::: danger ⚠️ 注意
Java 不支持多继承。
:::

继承是面向对象编程中的重要特性，它允许一个类（子类）从另一个类（父类）中继承属性和方法，并可以扩展或修改它们。子类可以继承父类的所有非私有成员，并可以在此基础上添加新的成员或重写已有的方法。继承可以提高代码的重用性和扩展性，促进代码的组织和维护。

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

## 四、封装（Encapsulation）

封装是面向对象编程的一种重要概念，它将数据和操作数据的方法封装在类的内部，对外部隐藏类的实现细节。通过封装，可以实现信息隐藏和访问控制，提高了代码的安全性和可维护性。封装通过使用访问修饰符（如 public、private、protected）来控制类的成员的可见性和访问权限。

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

## 五、多态性（Polymorphism）

多态性是面向对象编程的另一个重要特性，它允许不同的对象对同一个消息做出不同的响应。多态性分为编译时多态性（静态多态性）和运行时多态性（动态多态性）。编译时多态性是通过方法的重载（Overloading）来实现的，而运行时多态性则是通过方法的重写（Override）和接口的实现（Implement）来实现的。多态性可以提高代码的灵活性和扩展性，使得程序更易于维护和扩展。

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

| 区别点   | 重载方法 | 重写方法                                       |
| -------- | -------- | ---------------------------------------------- |
| 参数列表 | 必须修改 | 一定不能修改                                   |
| 返回类型 | 可以修改 | 一定不能修改                                   |
| 异常     | 可以修改 | 可以减少或删除，一定不能抛出新的或者更广的异常 |
| 访问     | 可以修改 | 一定不能做更严格的限制（可以降低限制）         |

- _友情链接 1：[Java 重写(Override)与重载(Overload)](https://www.runoob.com/java/java-override-overload.html)_
- _友情链接 2：[Java 多态](https://www.runoob.com/java/java-polymorphism.html)_

## 六、抽象类 & 接口

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
