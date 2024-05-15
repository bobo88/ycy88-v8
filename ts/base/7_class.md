# TS 清单 - 类

::: tip 类
ES6 之前，JavaScript 通过构造函数实现类的概念，通过原型链实现继承。ES6 开始，我们终于迎来了`class`。
:::

先抛出几个和 类 相关的关键词：

- class
- extends / super
- constructor
- public / private / protected / readonly
- get / set
- static
- abstract
- new
- interface

下面我们来看一个简单的 类 DEMO：

```js
class Student {
  name: string
  constructor(name: string) {
    this.name = name
  }
  sayHello() {
    return `${this.name} say hello for you.`
  }
}
let stu1 = new Student('Bob')
console.log(stu1.sayHello()) // print: Bob say hello for you.
```

## 一、继承：（涉及关键词 class / extends / super / constructor / new)

```js
// 1. 类与类之间的继承用关键词 extends 来定义；
// 2. 子类（如果有constructor的具体实现时），必须在 constructor 的第一行代码中调用 super()，super里面的参数根据父类的constructor来确定；
// 3. 子类 new 出来的实例，可以访问 自身和父类 的属性以及方法
class Person {
  name: string
  age: number
  constructor(age: number) {
    this.age = age
  }
  move() {
    return `${this.name} is move.`
  }
}
class Student extends Person {
  constructor(name: string, age: number) {
    super(age)
    this.name = name
  }
  sayHello() {
    return `${this.name} say hello for you.`
  }
}
let stu1 = new Student('Bob', 28)
console.log(stu1.sayHello()) // print: Bob say hello for you.
console.log(stu1.move()) // print: Bob is move.
```

## 二、公共，私有与受保护的修饰符等：（涉及关键词 public / private / protected / readonly)

在 TypeScript 里，成员都默认为 public。

```js
// 1. 类的成员（属性或方法）默认是 public 的；
class Person {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    move () {
        return `${this.name} is move.`
    }
}
// 等价于
class Person {
    public name: string;
    public age: number;
    public constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    public move () {
        return `${this.name} is move.`
    }
}

let p1 = new Person('Bob', 28)
console.log(p1.move())            // print: Bob is move.
```

当成员被标记成 private 时，它就不能在声明它的类的外部访问。

```js
class Person {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }
    // 可以通过方法暴露相关私有成员
    getName () {
        return this.name
    }
}

let p1 = new Person('Bob')
// console.log(p1.name)        // 报错提示： 属性“name”为私有属性，只能在类“Person”中访问。
console.log(p1.getName())      // print: Bob
```

protected 修饰符与 private 修饰符的行为很相似，但有一点不同， protected 成员在派生类中仍然可以访问。<br/>
构造函数也可以被标记成 protected。 这意味着这个类不能在包含它的类外被实例化，但是能被继承。

```js
class Person {
    protected name: string;
    protected constructor(name: string) {
        this.name = name
    }
}
// let p1 = new Person('Bob')     // 报错提示：类“Person”的构造函数是受保护的，仅可在类声明中访问。
class Employee extends Person {
    constructor(name: string) {
        super(name)
    }
    getName () {
        return this.name
    }
}
let p2 = new Employee('Bob')    // 只能通过 public 的类进行实例化
console.log(p2.getName())       // Bob
```

readonly 关键字是将属性设置为只读的：

```js
class Person {
    readonly name: string;
    constructor(name: string) {
        this.name = name
    }
}
let p1 = new Person('Bob')
console.log(p1.name)          // print: Bob
// p1.name = 'BoBo'           // 报错提示：无法为“name”赋值，因为它是只读属性。
```

## 三、存取器: （关键词 get / set）

TypeScript 支持通过 getters/setters 来截取对对象成员的访问。 它能帮助你有效的控制对对象成员的访问。

```js
let passcode = "secret passcode";
class Employee {
    private _fullName: string;
    get fullName(): string {
        return this._fullName;
    }
    set fullName(newName: string) {
        // 这里是针对 set 做了一层拦截，满足条件的情况下才能正常设置信息
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        } else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    alert(employee.fullName);
}
```

## 四、静态属性: （关键词 static）

静态属性，就是存在于 类本身 上的属性，而不是类创造出来的实例上的属性。

```js
class Person {
  static desc: string = '人类'
  name: string
  constructor(name: string) {
    this.name = name
  }
}
let p1 = new Person('Bob')
console.log(p1.name) // print: Bob
// console.log(p1.desc)        // 报错提示：属性“desc”在类型“Person”上不存在
console.log(Person.desc) // print: 人类
```

## 五、抽象类: （关键词 abstract）

抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。 不同于接口，抽象类可以包含成员的实现细节。 abstract 关键字是用于定义抽象类和在抽象类内部定义抽象方法。

```js
abstract class Department {
    constructor(public name: string) {}
    printName(): void {
        console.log('Department name: ' + this.name);
    }
    abstract printMeeting(): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {
    constructor() {
        super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
    }
    printMeeting(): void {
        console.log('The Accounting Department meets each Monday at 10am.');
    }
    generateReports(): void {
        console.log('Generating accounting reports...');
    }
}

let department: Department;         // 允许创建一个对抽象类型的引用
// department = new Department();      // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
// department.generateReports();   // 错误: 方法在声明的抽象类中不存在。
// 将上面21行代码调整为 let department: AccountingDepartment; 就不会报错了。
```

## 六、接口

我们可以将 类 当作 接口 来使用。

```js
class Point {
  x: number
  y: number
}
class Point3d extends Point {
  z: number
}
let point3d: Point3d = {
  x: 1,
  y: 2,
  z: 3
}
```

参考地址：
<a href="https://www.tslang.cn/docs/handbook/classes.html" target="_blank">class 类（中文版）</a><br />
