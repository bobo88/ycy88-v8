# TS 清单 - 函数

::: tip 函数
函数是 JavaScript 中的一等公民
:::

## 函数类型

函数类型包含两部分：参数类型和返回值类型。

```js
// 函数声明式
function add(x: number, y: number): number {
  return x + y
}
console.log(add(1, 2)) // print: 3

// 函数表达式
let reduce = function (x: number, y: number): number {
  return x - y
}
console.log(reduce(3, 1)) // print: 2

// 完整的函数表达式
let reduce2: (x: number, y: number) => number = function (
  x: number,
  y: number
): number {
  return x - y
}
console.log(reduce2(3, 1)) // print: 2
```

## 可选参数 / 默认参数 / 剩余参数

正常定义的函数参数调用时是必须传入的。但是我们可以通过 问号 ❓ 设置参数可选（必须是最后一个参数），或者通过 等号（=）来设置默认参数。

```js
// 默认参数和可选参数有个共同点：它们表示某一个参数。
// 可选参数
function add(x: number, y?: number) {
  return x + (y || 0)
}
console.log(add(8, 1)) // print: 9
console.log(add(8)) // print: 8

// 默认参数
function fullName(firstName: string, lastName = 'Bob') {
  return firstName + ' ' + lastName
}
console.log(fullName('Yuan')) // print: Yuan Bob
console.log(fullName('Yuan', 'BoBo')) // print: Yuan BoBo

// 想同时操作多个参数，或者不确定函数会有多少个参数传递进来，则可以使用「剩余参数」
// 剩余参数
function queueClass(grade: string, ...rest: string[]) {
  return grade + ': ' + rest.join(',')
}
console.log(queueClass('大四班', 'xiaoming', 'xiaoyuan', 'xiaoli')) // print: 大四班: xiaoming,xiaoyuan,xiaoli
```

## this 和箭头函数

::: tip this
JavaScript 里，this 的值在函数被调用的时候才会指定。<br/>
箭头函数能保存函数创建时的 this 值，而不是调用时的值。
:::

## 函数重载

::: tip 函数重载
重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。<br/>
在定义重载的时候，一定要把最精确的定义放在最前面。
:::

```js
// 函数重载
// 前几次都是函数定义，最后一次是函数实现
function reload(x: number, y: number): number;
function reload(x: string, y: number): string;
function reload(x: string, y: string): string;
function reload(x: any, y: any): any {
    return x + y;
}
console.log(reload(1, 2))       // print: 3
console.log(reload('1', 2))     // print: 12
console.log(reload('1', '2'))   // print: 12
console.log(reload(1, '2'))     // 报错： 没有与此调用匹配的重载。...
```

<!--
```js
function funcArgs(...args: string[]) {
    console.log(args)
}
// 以下代码 tsc运行时 会报错，但是 编译时 不报错
// tsc: Argument of type 'number' is not assignable to parameter of type 'string'.
funcArgs('a', 'b', 123, true);
``` -->
