# TS 清单 - 泛型

::: tip 泛型
泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。<br/>
使用泛型可以很好的实现组件的重用性。
:::

我们先看一个简单的 DEMO：

```js
function printLog(arg: number): number {
  return arg
}
console.log(printLog(123)) // print: 123
// console.log(printLog('Bob'))  // 报错提示： 类型“string”的参数不能赋给类型“number”的参数。
```

上述代码中，实现了一个简单的函数`printLog`，它接收一个 number 类型的参数，并返回一个 number 类型的结果。

思考以下两个问题：

1. 让 printLog 能接收其他类型的参数需要如何设置？
2. 让 printLog 接收的参数类型和返回的结果类型保持一致，需要如何设置？

```js
// ====== 问题一：可以明确设置多个混合类型 或者 直接设置any
function printLog(arg: number | string): number | string {
  return arg
}
console.log(printLog(123)) // print: 123
console.log(printLog('Bob')) // print: 'Bob'
// OR
function printLog(arg: any): any {
  return arg
}
console.log(printLog(123)) // print: 123
console.log(printLog('Bob')) // print: 'Bob'

// ====== 问题二：不好处理
```

## 一、泛型的具体 DEMO

通过以下 DEMO 中的代码，可以轻松处理上述的两个问题。

```js
// 语法格式
function printLog<T>(arg: T): T {
  return arg
}
// 方式一：指定类型
console.log(printLog < number > 123) // print: 123
console.log(printLog < string > 'Bob') // print: 'Bob'
// 方式二：类型推导
console.log(printLog(123)) // print: 123
console.log(printLog('Bob')) // print: 'Bob'

// 亦可定义多个参数
function change<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}
console.log(change < string, number > ['Bob', 28]) // print: [ 28, 'Bob' ]
console.log(change(['Bob', 28])) // print: [ 28, 'Bob' ]
```

## 二、泛型类型

```js
// ====== 泛型函数的类型
function printLog<T>(arg: T): T {
    return arg;
}
let myPrintLog: <T>(arg: T) => T = printLog;

// ====== 泛型接口
interface GenericPrintLogFn {
    <T>(arg: T): T;
}
interface GenericPrintLogFn2<T> {
    (arg: T): T;
}
function printLog<T>(arg: T): T {
    return arg;
}
let myPrintLog: GenericPrintLogFn = printLog;
let myPrintLog2: GenericPrintLogFn2<number> = printLog;
console.log(myPrintLog<number>(123))        // print: 123
console.log(myPrintLog2(123))               // print: 123

// ====== 泛型类
// 泛型类看上去与泛型接口差不多。 泛型类使用（ <>）括起泛型类型，跟在类名后面。
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}
let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
console.log(myGenericNumber.add(1, 2))          // print: 3
```

::: warning 注意
无法创建泛型枚举和泛型命名空间。
:::

## 三、泛型约束

在函数内部使用泛型变量的时候，因为无法知道它到底是哪种类型，所以不能随意的操作它的属性或方法。比如 数值型 不能操作 length 属性等。<br/>
这就得依靠泛型约束来确定变量的类型（或者约束变量必须具备某些属性或方法）。

```js
// 因为无法确定 T 的类型，所以直接访问 length 属性会提示报错
function printLog<T>(arg: T): T {
    console.log(arg.length);           // 报错提示：类型“T”上不存在属性“length”。
    return arg;
}

// ====== 使用泛型约束的方式
interface Lengthwise {
    length: number;
}
function printLog<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);              // print: 3
    return arg;
}
console.log(printLog<string>('123'))      // print: '123'

// ====== 在泛型约束中使用类型参数
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}
let x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a");    // okay
getProperty(x, "m");    // 提示报错：类型“"m"”的参数不能赋给类型“"a" | "b" | "c" | "d"”的参数。
```

参考地址：
<a href="https://www.tslang.cn/docs/handbook/generics.html" target="_blank">泛型（中文版）</a><br />
