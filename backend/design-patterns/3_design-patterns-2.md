# 设计模式 - 工厂模式

::: tip 设计模式 - 工厂模式
定义一个用于创建对象的接口，但由子类决定要实例化的类是哪一个。
:::

## 一、概念

### 1、定义

工厂模式是一种创建型设计模式，其主要目的是定义一个用于创建对象的接口，但由子类决定要实例化的类是哪一个。它使得一个类的实例化延迟到其子类，从而使得一个类不再负责自己的实例创建，而是将这个责任委托给子类。

### 2、工厂模式的类型

| 类别                         | 说明                                                                 |
| ---------------------------- | -------------------------------------------------------------------- |
| 简单工厂（Simple Factory）   | 小作坊，适用于少量对象的创建，集中式管理，使用简单、扩展不便         |
| 工厂方法（Factory Method）   | 正规小工厂，每种产品一个独立工厂，偏平化扩展                         |
| 抽象工厂（Abstract Factory） | 集团化大厂，产品种类、层级众多，需要多层级的工厂来管理，代码也稍复杂 |

### 3、主要角色

- **抽象产品（Abstract Product）：** 定义了产品的规范，描述了产品的所有特性和行为，但不包含具体的实现。
- **具体产品（Concrete Product）：** 是抽象产品的具体实现，通过工厂方法创建。
- **抽象工厂（Abstract Factory）：** 声明了工厂方法，用于返回一个产品。
- **具体工厂（Concrete Factory）：** 实现了工厂方法，返回具体的产品。

### 4、工作流程

1. **客户端（Client）**：需要一个产品，但不关心产品的创建过程。
2. **抽象工厂（Abstract Factory）**：定义了创建产品的接口，客户端通过这个接口请求产品的创建。
3. **具体工厂（Concrete Factory）**：实现了工厂方法，负责创建具体的产品。
4. **抽象产品（Abstract Product）**：定义了产品的规范。
5. **具体产品（Concrete Product）**：实现了具体产品的特性和行为。

## 二、应用场景

- Vue 中的 createElement('h'); createElement('div')创建虚拟 Dom；
- Vue 组件实例的创建；
- vue-router 中的路由基于模式 mode 创建不同的路由对象。
- ...

## 三、源码实例

### 1、Java 代码

```java
// 抽象产品
interface Product {
    void show();
}

// 具体产品A
class ConcreteProductA implements Product {
    @Override
    public void show() {
        System.out.println("Product A");
    }
}

// 具体产品B
class ConcreteProductB implements Product {
    @Override
    public void show() {
        System.out.println("Product B");
    }
}

// 抽象工厂
interface Factory {
    Product createProduct();
}

// 具体工厂A
class ConcreteFactoryA implements Factory {
    @Override
    public Product createProduct() {
        return new ConcreteProductA();
    }
}

// 具体工厂B
class ConcreteFactoryB implements Factory {
    @Override
    public Product createProduct() {
        return new ConcreteProductB();
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        Factory factoryA = new ConcreteFactoryA();
        Product productA = factoryA.createProduct();
        productA.show();

        Factory factoryB = new ConcreteFactoryB();
        Product productB = factoryB.createProduct();
        productB.show();
    }
}
```

### 2、Javascript 代码

```js
// 抽象产品
class Product {
  show() {
    console.log('Default Product')
  }
}

// 具体产品A
class ConcreteProductA extends Product {
  show() {
    console.log('Product A')
  }
}

// 具体产品B
class ConcreteProductB extends Product {
  show() {
    console.log('Product B')
  }
}

// 抽象工厂
class Factory {
  createProduct() {
    return new Product()
  }
}

// 具体工厂A
class ConcreteFactoryA extends Factory {
  createProduct() {
    return new ConcreteProductA()
  }
}

// 具体工厂B
class ConcreteFactoryB extends Factory {
  createProduct() {
    return new ConcreteProductB()
  }
}

// 客户端
const factoryA = new ConcreteFactoryA()
const productA = factoryA.createProduct()
productA.show()

const factoryB = new ConcreteFactoryB()
const productB = factoryB.createProduct()
productB.show()
```

---

- [javascript 模式 - 工厂模式](https://wikinote.gitbook.io/js-pattern/javascript-she-ji-mo-shi/sheng-chan-mo-shi/factory-pattern)
- [前端设计模式：工厂模式（Factory）](https://www.cnblogs.com/anding/p/17625778.html)
