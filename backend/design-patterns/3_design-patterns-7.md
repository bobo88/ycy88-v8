# 设计模式 - 命令模式

## 一、概念

### 1、定义

命令模式（Command Pattern）将请求封装成对象，以使不同的请求、队列或者操作能够参数化其他对象。命令模式属于行为型设计模式。

## 二、概要

### 1、主要角色

- **命令（Command）：** 声明执行操作的接口。
- **具体命令（Concrete Command）：** 实现命令接口，具体定义命令的执行逻辑。
- **调用者（Invoker）：** 负责调用命令对象执行请求。
- **接收者（Receiver）：** 知道如何实施与执行一个请求相关的操作。
- **客户端（Client）：** 创建命令对象、设置命令的接收者，并将命令交给调用者执行。

## 三、示例代码

### 1、Java 示例

```java
// 命令接口
interface Command {
    void execute();
}

// 具体命令A
class ConcreteCommandA implements Command {
    private Receiver receiver;

    public ConcreteCommandA(Receiver receiver) {
        this.receiver = receiver;
    }

    @Override
    public void execute() {
        receiver.actionA();
    }
}

// 具体命令B
class ConcreteCommandB implements Command {
    private Receiver receiver;

    public ConcreteCommandB(Receiver receiver) {
        this.receiver = receiver;
    }

    @Override
    public void execute() {
        receiver.actionB();
    }
}

// 调用者
class Invoker {
    private Command command;

    public void setCommand(Command command) {
        this.command = command;
    }

    public void executeCommand() {
        command.execute();
    }
}

// 接收者
class Receiver {
    public void actionA() {
        System.out.println("Receiver: Performing action A");
    }

    public void actionB() {
        System.out.println("Receiver: Performing action B");
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        Receiver receiver = new Receiver();

        Command commandA = new ConcreteCommandA(receiver);
        Command commandB = new ConcreteCommandB(receiver);

        Invoker invoker = new Invoker();

        invoker.setCommand(commandA);
        invoker.executeCommand();
        // Output:
        // Receiver: Performing action A

        invoker.setCommand(commandB);
        invoker.executeCommand();
        // Output:
        // Receiver: Performing action B
    }
}
```

### 2、JavaScript 示例

```javascript
// 命令接口
class Command {
  execute() {
    console.log('Default Command: Executing command')
  }
}

// 具体命令A
class ConcreteCommandA extends Command {
  constructor(receiver) {
    super()
    this.receiver = receiver
  }

  execute() {
    this.receiver.actionA()
  }
}

// 具体命令B
class ConcreteCommandB extends Command {
  constructor(receiver) {
    super()
    this.receiver = receiver
  }

  execute() {
    this.receiver.actionB()
  }
}

// 调用者
class Invoker {
  setCommand(command) {
    this.command = command
  }

  executeCommand() {
    this.command.execute()
  }
}

// 接收者
class Receiver {
  actionA() {
    console.log('Receiver: Performing action A')
  }

  actionB() {
    console.log('Receiver: Performing action B')
  }
}

// 客户端
const receiver = new Receiver()

const commandA = new ConcreteCommandA(receiver)
const commandB = new ConcreteCommandB(receiver)

const invoker = new Invoker()

invoker.setCommand(commandA)
invoker.executeCommand()
// Output:
// Receiver: Performing action A

invoker.setCommand(commandB)
invoker.executeCommand()
// Output:
// Receiver: Performing action B
```

## 四、VUE 中实际用例

- TODO
- ...

---

- [命令模式 ｜ 菜鸟教程](https://www.runoob.com/design-pattern/command-pattern.html)
