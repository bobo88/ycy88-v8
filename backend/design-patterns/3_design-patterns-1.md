# 设计模式 - 单例模式

::: tip 设计模式 - 单例模式
保证一个类只有一个实例，并提供一个全局访问点。
:::

## 一、概念

单例模式（Singleton Pattern）是 Java 中最简单的设计模式之一。这种类型的设计模式属于创建型模式，它提供了一种创建对象的最佳方式。

这种模式涉及到一个单一的类，该类负责创建自己的对象，同时确保只有单个对象被创建。这个类提供了一种访问其唯一的对象的方式，可以直接访问，不需要实例化该类的对象。

单例模式是一种创建型设计模式，它确保一个类只有一个实例，并提供了一个全局访问点来访问该实例。

注意：<br/>
1、单例类只能有一个实例。<br/>
2、单例类必须自己创建自己的唯一实例。<br/>
3、单例类必须给所有其他对象提供这一实例。<br/>

## 二、应用场景

1. **配置管理器：** 在应用程序中，如果需要全局访问一些配置信息，例如数据库配置、系统设置等，可以使用单例模式来管理这些配置信息。

2. **日志记录器：** 在系统中使用单例模式来管理日志记录器，确保所有模块都使用同一个日志实例，方便集中管理和记录日志信息。

3. **线程池：** 在多线程环境下，使用单例模式来管理线程池，确保线程池的唯一性，方便任务的调度和管理。

4. **数据库连接池：** 在需要频繁访问数据库的应用中，使用单例模式来管理数据库连接池，确保连接池的唯一性，避免资源浪费。

5. **缓存管理器：** 在需要全局管理缓存的情况下，使用单例模式来管理缓存，确保缓存数据的一致性和可靠性。

6. **打印机管理：** 在一个系统中可能有多个模块需要打印机，使用单例模式可以确保系统中只有一个打印机实例，方便打印任务的协调。

7. **GUI 应用中的对话框管理器：** 在图形用户界面应用程序中，使用单例模式来管理对话框，确保只有一个对话框实例存在。

8. **计数器：** 当需要在整个系统中对某个对象计数时，可以使用单例模式确保计数器的唯一性。

## 三、代码实例

### 1、Java 版本

```java
// Singleton.java
// 懒汉式，线程安全
public class Singleton {
  private static Singleton instance;
  private Singleton() {}
  public static synchronized Singleton getInstance() {
    if (instance === null) {
      instance = new Singleton();
    }
    return instance;
  }
}
```

### 2、Javascript 版本

```js
// Singleton.js
const createSingleton = (function () {
  let instance

  return function () {
    if (!instance) {
      instance = {} // 实例化
    }
    return instance
  }
})()

// 示例使用
const singleton1 = createSingleton()
const singleton2 = createSingleton()

console.log(singleton1 === singleton2) // true，说明获取到的实例是同一个实例
```

```js
// Singleton.js
class Singleton {
  constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new Singleton()
    }
    return this.instance
  }
}

// 示例使用
const singleton1 = Singleton.getInstance()
const singleton2 = Singleton.getInstance()
console.log(instance1 === instance2) // true，说明获取到的实例是同一个实例
```

## 四、实现单例模式的多种方式

> TODO

### 1、懒汉式

> TODO

### 2、饿汉式

```java
// Singleton.java
public class Singleton {
  private static Singleton instance = new Singleton();
  private Singleton () {}
  public static Singleton getInstance () {
    return instance
  }
}
```

```js
// Singleton.js
// 方式一：
class Singleton {
  static instance = new Singleton()

  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = this
      // 在这里可以初始化实例的属性
    }
    return Singleton.instance
  }
}

const singleton1 = new Singleton()
const singleton2 = new Singleton()
```

```js
// Singleton.js
// 方式二：
class Singleton {
  static instance = new Singleton()

  constructor() {}

  static getInstance() {
    return Singleton.instance
  }
}

const singleton1 = Singleton.getInstance()
const singleton2 = Singleton.getInstance()
console.log(singleton1 === singleton2)
```

### 3、双重校验锁

```java
public class Singleton {
  private volatile static Singleton instance;

  private Singleton() {
    // 私有构造函数，防止外部实例化
  }

  public static Singleton getInstance() {
    if (instance == null) {
      synchronized (Singleton.class) {
        if (instance == null) {
          instance = new Singleton();
        }
      }
    }
    return instance;
  }
}
```

### 4、登记式/静态内部类

> TODO

### 5、枚举式

> TODO

---

- [设计模式之单例模式](https://dunwu.github.io/design/pages/cf046f/)
- [设计模式 - Java 中单例模式的 6 种写法及优缺点对比](https://www.cnblogs.com/shoufeng/p/10820964.html)
