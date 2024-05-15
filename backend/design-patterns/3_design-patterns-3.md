# 设计模式 - 策略模式

::: tip 设计模式 - 策略模式
定义了一系列的算法，将每一个算法封装起来，并使它们可以相互替换。策略模式让算法的变化独立于使用算法的客户。
:::

## 一、概念

### 1、定义

策略模式（Strategy Pattern）是一种行为设计模式，它定义了一系列的算法，将每一个算法封装起来，并使它们可以相互替换。策略模式让算法的变化独立于使用算法的客户。

## 二、概要

### 1、主要角色

- **环境类（Context）：** 维护一个对策略对象的引用，可以动态地改变策略对象。
- **抽象策略类（Strategy）：** 定义了一个算法的接口。
- **具体策略类（Concrete Strategy）：** 实现了抽象策略类的具体算法。

### 2、工作流程

1. **客户端（Client）：** 需要使用不同算法的客户端。
2. **策略接口（Strategy）：** 定义了算法的接口。
3. **具体策略类（Concrete Strategy）：** 实现了具体的算法。
4. **环境类（Context）：** 维护了一个对策略对象的引用，并在需要时调用具体的策略类。

## 三、优缺点

### 1、优点

- **算法独立性：** 使用策略模式可以使得算法独立于使用它的客户端，客户端可以灵活地选择使用不同的算法。
- **扩展性：** 新的策略可以被轻松地添加到系统中，不影响原有算法的客户端。
- **避免使用多重条件判断：** 可以避免使用大量的条件判断语句，提高代码的可维护性。

### 2、缺点

- **客户端需要了解所有的策略：** 客户端需要知道所有可能的策略，并且了解它们的差异，这可能会增加客户端的复杂度。

## 四、适用场景

- 当一个系统有许多类，它们之间的区别仅在于它们的行为时，可以使用策略模式来定义每个行为，并使它们可以相互替换。
- 当一个系统需要动态地在几种算法中选择一种时，可以使用策略模式。
- 当一个对象有很多的行为，不同的行为在不同的时间应该有选择地执行时，可以使用策略模式。

### 1、应用实例

- 1）诸葛亮的锦囊妙计，每一个锦囊就是一个策略。
- 2）旅行的出游方式，选择骑自行车、坐汽车，每一种旅行方式都是一个策略。
- 3）VUE 中 mixin 全局混入功能：
  - 概念：mixin 可以用来扩展组件，将公共逻辑进行抽离（实现逻辑复用）。
    - 在需要该逻辑时进行”混入”，采用「策略模式」针对不同的属性进行合并。
    - 如果混入的数据和本身组件中的数据冲突，会采用“就近原则”以组件的数据为准。
  - 原理和合并策略：（核心就是：对象的合并处理。）
    - ① props、methods、inject、computed 同名时会被替换；
    - ② data 会被合并成；
    - ③ 生命周期和 watch 方法会被合并成队列；
    - ④ components、directives、filters 会在原型链上叠加；
  - 缺陷和解决方案：
    - mixin 中有很多缺陷，例如“命名冲突问题”、"数据来源问题不明确”等问题。
    - Vue3 采用 CompositionAPI 提取公共逻辑非常方便，对于逻辑共享和复用很方便。
  - 拓展：混入的方式
    - ① 局部混入：用于复用逻辑；
    - ② 全局混入：用于编写插件，主要是用于共享属性和方法，例如 vue-router、vuex

## 五、示例代码

### 1、Java 示例

```java
// 抽象策略类
interface Strategy {
    void doOperation();
}

// 具体策略类A
class ConcreteStrategyA implements Strategy {
    @Override
    public void doOperation() {
        System.out.println("Strategy A");
    }
}

// 具体策略类B
class ConcreteStrategyB implements Strategy {
    @Override
    public void doOperation() {
        System.out.println("Strategy B");
    }
}

// 环境类
class Context {
    private Strategy strategy;

    public Context(Strategy strategy) {
        this.strategy = strategy;
    }

    public void setStrategy(Strategy strategy) {
        this.strategy = strategy;
    }

    public void executeStrategy() {
        strategy.doOperation();
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        Strategy strategyA = new ConcreteStrategyA();
        Strategy strategyB = new ConcreteStrategyB();

        Context context = new Context(strategyA);
        context.executeStrategy();

        context.setStrategy(strategyB);
        context.executeStrategy();
    }
}
```

### 2、JavaScript 示例

```javascript
// 抽象策略类
class Strategy {
  doOperation() {
    console.log('Default Strategy')
  }
}

// 具体策略类A
class ConcreteStrategyA extends Strategy {
  doOperation() {
    console.log('Strategy A')
  }
}

// 具体策略类B
class ConcreteStrategyB extends Strategy {
  doOperation() {
    console.log('Strategy B')
  }
}

// 环境类
class Context {
  constructor(strategy) {
    this.strategy = strategy
  }

  setStrategy(strategy) {
    this.strategy = strategy
  }

  executeStrategy() {
    this.strategy.doOperation()
  }
}

// 客户端
const strategyA = new ConcreteStrategyA()
const strategyB = new ConcreteStrategyB()

const context = new Context(strategyA)
context.executeStrategy()

context.setStrategy(strategyB)
context.executeStrategy()
```

这个示例展示了策略模式的基本结构，包括抽象策略类、具体策略类、环境类以及客户端的使用。通过这种方式，可以在运行时动态地改变一个对象的行为。

---

- [策略模式 - 菜鸟教程](https://www.runoob.com/design-pattern/strategy-pattern.html)
- [slot 、Vue.mixin 、v-once](https://blog.csdn.net/qq_38290251/article/details/132676653)
- [Vue.js 设计模式大揭秘：从 MVC 到观察者，你知道 Vue.js 用了哪些设计模式吗？](https://juejin.cn/post/7226923892395769893)
