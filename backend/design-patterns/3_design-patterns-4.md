# 设计模式 - 观察者模式

::: tip 设计模式 - 观察者模式
定义了一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。观察者模式属于行为型设计模式。
:::

## 一、概念

### 1、定义

观察者模式（Observer Pattern）定义了一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。观察者模式属于行为型设计模式。

## 二、概要

### 1、主要角色

- **主题（Subject）：** 目标对象，它知道观察它的观察者，并提供注册（添加）和删除观察者的接口。
- **具体主题（Concrete Subject）：** 实现了主题接口，当状态发生变化时，向所有注册的观察者发出通知。
- **观察者（Observer）：** 观察主题的对象，当被观察主题发生变化时，会收到相应的通知。
- **具体观察者（Concrete Observer）：** 实现了观察者接口，当接收到主题通知时，进行相应的操作。

### 2、工作流程

1. **主题（Subject）**：维护一份观察者列表，并提供添加、删除和通知观察者的方法。
2. **具体主题（Concrete Subject）**：实现主题接口，维护一个状态，并在状态变化时通知所有观察者。
3. **观察者（Observer）**：定义了更新的接口，接收主题的通知。
4. **具体观察者（Concrete Observer）**：实现观察者接口，具体定义在收到通知时的行为。

## 三、优缺点

### 1、优点

- **松耦合：** 主题和观察者之间是松耦合的，可以独立改变。
- **可扩展性：** 可以在不修改主题或观察者的情况下，灵活地增加或删除观察者。
- **复用性：** 可以复用主题和观察者，增加系统的灵活性。

### 2、缺点

- **可能引起性能问题：** 如果观察者过多或者通知方式不当，可能引起性能问题。
- **通知顺序问题：** 观察者的收到通知的顺序是不确定的，需要在设计时考虑。

## 四、适用场景

- 当一个抽象模型有两个方面，其中一个方面依赖于另一个方面，可以使用观察者模式。
- 当一个对象的改变需要同时改变其他对象时，而且它不知道具体有多少对象需要改变时，可以使用观察者模式。
- 当一个对象必须通知其他对象，而它又不能假定其他对象是谁时，可以使用观察者模式。

### 1、具体实例

- VUE 中 watch 功能
- VUE 中双向数据绑定：数据劫持 + 发布者-订阅者模式
  - 1）首先，Vue 通过 Object.defineProperty 方法对数据对象进行劫持，将其转化为响应式对象。在这个过程中，Vue 会为每个属性创建一个 Dep 对象，用于收集依赖和通知更新。【发布/订阅模式 (Dep 类)】
  - 2）在模板编译阶段，Vue 会解析模板中的指令和表达式，并创建对应的指令对象。每个指令对象都会关联一个 Watcher 对象。
  - 3）Watcher 对象负责订阅数据变化，并在数据变化时执行相应的回调函数。它会将自身添加到相关属性的依赖（Dep）中。
  - 4）当数据发生变化时，被劫持的属性会触发相应的 setter 函数。在这个过程中，属性关联的依赖（Dep）会通知所有订阅者（即相关的 Watcher）进行更新。
  - 5）更新过程中，订阅者（即相关的 Watcher）会执行回调函数，并更新视图。

## 五、示例代码

### 1、Java 示例

```java
import java.util.ArrayList;
import java.util.List;

// 主题
interface Subject {
    void addObserver(Observer observer);
    void removeObserver(Observer observer);
    void notifyObservers();
}

// 具体主题
class ConcreteSubject implements Subject {
    private List<Observer> observers = new ArrayList<>();
    private String state;

    @Override
    public void addObserver(Observer observer) {
        observers.add(observer);
    }

    @Override
    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(state);
        }
    }

    public void setState(String state) {
        this.state = state;
        notifyObservers();
    }
}

// 观察者
interface Observer {
    void update(String state);
}

// 具体观察者A
class ConcreteObserverA implements Observer {
    @Override
    public void update(String state) {
        System.out.println("Observer A: " + state);
    }
}

// 具体观察者B
class ConcreteObserverB implements Observer {
    @Override
    public void update(String state) {
        System.out.println("Observer B: " + state);
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        ConcreteSubject subject = new ConcreteSubject();

        Observer observerA = new ConcreteObserverA();
        Observer observerB = new ConcreteObserverB();

        subject.addObserver(observerA);
        subject.addObserver(observerB);

        subject.setState("State 1");
        // Output:
        // Observer A: State 1
        // Observer B: State 1

        subject.setState("State 2");
        // Output:
        // Observer A: State 2
        // Observer B: State 2
    }
}
```

### 2、JavaScript 示例

```javascript
// 主题
class Subject {
  constructor() {
    this.observers = []
  }

  addObserver(observer) {
    this.observers.push(observer)
  }

  removeObserver(observer) {
    this.observers = this.observers.filter((o) => o !== observer)
  }

  notifyObservers() {
    this.observers.forEach((observer) => observer.update(this.state))
  }
}

// 具体主题
class ConcreteSubject extends Subject {
  setState(state) {
    this.state = state
    this.notifyObservers()
  }
}

// 观察者
class Observer {
  update(state) {
    console.log(`Default Observer: ${state}`)
  }
}

// 具体观察者A
class ConcreteObserverA extends Observer {
  update(state) {
    console.log(`Observer A: ${state}`)
  }
}

// 具体观察者B
class ConcreteObserverB extends Observer {
  update(state) {
    console.log(`Observer B: ${state}`)
  }
}

// 客户端
const subject = new ConcreteSubject()

const observerA = new ConcreteObserverA()
const observerB = new ConcreteObserverB()

subject.addObserver(observerA)
subject.addObserver(observerB)

subject.setState('State 1')
// Output:
// Observer A: State 1
// Observer B: State 1

subject.setState('State 2')
// Output:
// Observer A: State 2
// Observer B: State 2
```

<!-- 目的: 观察者模式的目的是当主题状态发生变化时自动通知观察者；而发布-订阅模式的目的是允许消息的发布者和订阅者解耦。
灵活性: 观察者模式中，观察者和主题之间的耦合度较高；而在发布-订阅模式中，发布者和订阅者之间更加灵活，可以动态添加或删除订阅关系。 -->

---

- [【前端设计模式】之观察者模式](https://bbs.huaweicloud.com/blogs/421851)
- [【前端设计模式】之观察者模式](https://cloud.tencent.com/developer/article/2358029)
- [【设计模式】之观察者模式](https://dunwu.github.io/design/pages/056e1d/)
- [【设计模式】之观察者模式|菜鸟教程](https://www.runoob.com/design-pattern/observer-pattern.html)
- [Vue2 和 Vue3 响应式原理实现的核心](https://cloud.tencent.com/developer/article/2340511)
- [vue2 数据响应式原理——依赖收集和发布订阅](https://blog.51cto.com/u_15476057/5307000)
- [Vue3-响应式原理解析](https://juejin.cn/post/7163546461039230989)
