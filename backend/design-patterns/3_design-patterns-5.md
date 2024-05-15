# 设计模式 - 发布订阅模式

## 一、概念

### 1、定义

发布订阅模式（Publish-Subscribe Pattern）是一种消息范式，定义了一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。发布订阅模式属于行为型设计模式。

## 二、概要

### 1、主要角色

- **发布者（Publisher）：** 负责发布消息的对象，将消息发送给所有订阅者。
- **订阅者（Subscriber）：** 接收发布者发送的消息，并进行相应的处理。
- **消息（Message）：** 包含了需要传递的信息。

### 2、工作流程

1. **发布者（Publisher）**：负责维护订阅者列表，接收消息并通知所有订阅者。
2. **订阅者（Subscriber）**：订阅感兴趣的主题，接收发布者发送的消息，并进行相应的处理。
3. **消息（Message）**：包含了需要传递的信息。

## 三、优缺点

### 1、优点

- **松耦合：** 发布者和订阅者之间是松耦合的，可以独立改变。
- **可扩展性：** 可以灵活地增加或删除发布者和订阅者，增加系统的灵活性。
- **消息中心：** 通过消息中心的方式，可以集中管理和分发消息，方便维护。

### 2、缺点

- **订阅者顺序问题：** 订阅者的收到消息的顺序是不确定的，可能导致消息的处理顺序问题。
- **可能引起性能问题：** 如果订阅者过多或者通知方式不当，可能引起性能问题。

## 四、适用场景

- 当一个对象的改变需要通知其他对象，并且这些对象不需要知道具体是哪些对象时，可以使用发布订阅模式。
- 当一个对象的改变需要通知多个对象，但这些对象在运行时动态变化时，可以使用发布订阅模式。
- 当多个对象有相同的依赖关系，但是它们之间的关系并不明确时，可以使用发布订阅模式。

### 1）具体实例

- VUE 中事件总线（Event Bus）实现采用的是「发布订阅模式」。
- VUEX 全局状态管理：在大型应用中，使用发布-订阅模式可以实现全局状态管理。当状态发生变化时，通过发布事件通知所有相关组件，从而实现状态同步。
- 组件通信：在复杂的组件结构中，通过发布-订阅模式可以实现组件之间的通信。例如，一个组件触发某个事件，其他组件监听并执行相应的操作。
- 用户登录状态：当用户登录状态发生变化时，可以使用发布-订阅模式通知相关组件进行相应的更新，例如切换导航栏的显示内容。
- ...

## 五、示例代码

### 1、Java 示例

```java
import java.util.ArrayList;
import java.util.List;

// 发布者
class Publisher {
    private List<Subscriber> subscribers = new ArrayList<>();

    public void addSubscriber(Subscriber subscriber) {
        subscribers.add(subscriber);
    }

    public void removeSubscriber(Subscriber subscriber) {
        subscribers.remove(subscriber);
    }

    public void publishMessage(String message) {
        for (Subscriber subscriber : subscribers) {
            subscriber.receiveMessage(message);
        }
    }
}

// 订阅者
class Subscriber {
    private String name;

    public Subscriber(String name) {
        this.name = name;
    }

    public void receiveMessage(String message) {
        System.out.println(name + " received message: " + message);
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        Publisher publisher = new Publisher();

        Subscriber subscriberA = new Subscriber("Subscriber A");
        Subscriber subscriberB = new Subscriber("Subscriber B");

        publisher.addSubscriber(subscriberA);
        publisher.addSubscriber(subscriberB);

        publisher.publishMessage("Hello World!");
        // Output:
        // Subscriber A received message: Hello World!
        // Subscriber B received message: Hello World!
    }
}
```

### 2、JavaScript 示例

```javascript
// 发布者
class Publisher {
  constructor() {
    this.subscribers = []
  }

  addSubscriber(subscriber) {
    this.subscribers.push(subscriber)
  }

  removeSubscriber(subscriber) {
    this.subscribers = this.subscribers.filter((s) => s !== subscriber)
  }

  publishMessage(message) {
    this.subscribers.forEach((subscriber) => subscriber.receiveMessage(message))
  }
}

// 订阅者
class Subscriber {
  constructor(name) {
    this.name = name
  }

  receiveMessage(message) {
    console.log(`${this.name} received message: ${message}`)
  }
}

// 客户端
const publisher = new Publisher()

const subscriberA = new Subscriber('Subscriber A')
const subscriberB = new Subscriber('Subscriber B')

publisher.addSubscriber(subscriberA)
publisher.addSubscriber(subscriberB)

publisher.publishMessage('Hello World!')
// Output:
// Subscriber A received message: Hello World!
// Subscriber B received message: Hello World!
```

---

- [详解"观察者"模式和"发布订阅"模式](https://juejin.cn/post/7261799437729628215)
- [Vue 兄弟组件间通信、发布与订阅，动态、异步组件](https://www.arryblog.com/vip/vue/publish-subscription-dynamic-async.html)
