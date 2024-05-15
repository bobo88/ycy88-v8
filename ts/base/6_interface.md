# TS 清单 - 接口

::: tip 接口
TypeScript 的核心原则之一是对值所具有的结构进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。 <br/>
在 TypeScript 里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。
:::

## 简单的 DEMO

```js
interface IName {
  name: string;
}

function sayHello(user: IName) {
  console.log(user.name)
}

let Bob = { name: 'Bob', age: 28 }
// 传入的对象满足上面提到的必要条件，就是被允许的。
sayHello(Bob) // print: Bob
// sayHello({name: 'Bob', age: 28}) // 报错：类型“{ name: string; age: number; }”的参数不能赋给类型“IName”的参数。
```

## 可选属性 / 任意属性 / 只读属性

```js
interface IUser {
    readonly id: number;
    // 必要属性
    name: string;
    // 可选属性
    age?: number;
    // 任意属性
    [propName: string]: any;
}

function sayHello(user: IUser) {
    console.log(user.name)
}

let Bob = {id: 1, name: 'Bob', age: 28}
sayHello(Bob)                            // print: Bob
sayHello({id: 2, name: 'BoBo', age: 28}) // print: BoBo

// 验证 只读属性
let testUser: IUser = {id: 3, name: 'xiaoli'}
testUser.id = 4     // 报错：无法为“id”赋值，因为它是只读属性。
```

::: warning readonly vs const
最简单判断该用 readonly 还是 const 的方法是看要把它做为变量使用还是做为一个属性。<br/>
做为变量使用的话用 const，若做为属性则使用 readonly。
:::

## 函数类型

接口能够描述 JavaScript 中对象拥有的各种各样的外形。 除了描述带有属性的普通对象外，接口也可以描述函数类型。

```js
interface IFullName {
  (firstName: string, lastName: string): string;
}

let fullName: IFullName
fullName = function (firstName: string, lastName: string): string {
  return firstName + ' ' + lastName
}
console.log(fullName('Yuan', 'Bob')) // print: Yuan Bob
```

## 可索引的类型

TypeScript 支持两种索引签名：字符串和数字。<br/>
可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。

```js
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray
myArray = ['Bob', 'Fred']

let myStr: string = myArray[0]
```

## 类类型

```js
// 定义接口
interface Animal {
  sleep: string;
}
// 类 实现 接口
class Dog implements Animal {
  sleep: string
  name: string
  constructor(name: string) {
    this.name = name
    this.sleep = '躺着睡觉'
  }
}
// 实例化 类
const xiaohuang = new Dog('小黄')
console.log(xiaohuang.name) // print: 小黄
console.log(xiaohuang.sleep) // print: 躺着睡觉
```

## 继承接口

```js
// 定义接口 A
interface Animal {
    sleep: string;
}
// 定义接口 B
interface Person {
    eat: (sth: string) => void;
    name: string;
    age?: number;
}
interface Children extends Animal, Person {
    play: (sth: string) => void;
}

// 接口实现
let xiaohong = <Children>{};
xiaohong = {
    sleep: '玩累了就睡觉',
    name: '小红',
    eat: function (food: string) {
        console.log(this.name + ' eat ' + food)
    },
    play: function(toy: string) {
        console.log(this.name + ' play ' + toy)
    }
}
xiaohong.eat('汉堡包')  // print: 小红 eat 汉堡包
xiaohong.play('玩具熊') // print: 小红 play 玩具熊
```

## 混合类型

一个对象可以同时做为函数和对象使用，并带有额外的属性。

```js
// DEMO from 中文官网
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

## 接口继承类

当接口继承了一个类类型时，它会继承类的成员但不包括其实现。就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。 接口同样会继承到类的 private 和 protected 成员。 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。

```js
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control {
    select() { }
}

// 错误：“Image”类型缺少“state”属性。
class Image implements SelectableControl {
    select() { }
}

class Location {

}
```

在上面的例子里，SelectableControl 包含了 Control 的所有成员，包括私有成员 state。 因为 state 是私有成员，所以只能够是 Control 的子类们才能实现 SelectableControl 接口。 因为只有 Control 的子类才能够拥有一个声明于 Control 的私有成员 state，这对私有成员的兼容性是必需的。<br/>
在 Control 类内部，是允许通过 SelectableControl 的实例来访问私有成员 state 的。 实际上， SelectableControl 接口和拥有 select 方法的 Control 类是一样的。 Button 和 TextBox 类是 SelectableControl 的子类（因为它们都继承自 Control 并有 select 方法），但 Image 和 Location 类并不是这样的。

参考地址：
<a href="https://www.tslang.cn/docs/handbook/interfaces.html" target="_blank">Interfaces（中文版）</a><br />
