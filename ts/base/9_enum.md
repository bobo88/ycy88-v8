# TS 清单 - 枚举

::: tip 概念
使用枚举（enum）我们可以定义一些带名字的常量。 使用枚举可以清晰地表达意图或创建一组有区别的用例。 TypeScript 支持数字的和基于字符串的枚举。<br/>
数字枚举有「自增长的行为」，而字符串枚举没有。
:::

比如我们定义 方位变量时，限定在「上/下/左/右」四个值之间，一周七天限定在「周一/.../周日」。这些情形就可以考虑用 枚举 来语意化变量。

```js
enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}
console.log(Direction['Up'])        // print: 1
console.log(Direction['Down'])      // print: 2
console.log(Direction['Left'])      // print: 3
console.log(Direction['Right'])     // print: 4

enum Days {
    Sun, Mon, Tue, Wed, Thu, Fri, Sat
}
console.log(Days['Sun'])            // print: 0
console.log(Days['Fri'])            // print: 5
```

## 枚举的分类以及使用

```js
// 1. 数字枚举
enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}

// 2. 字符串枚举
enum Color {
    Red = 'red',
    Green = 'green',
    Blue = 'blue',
}

// 3. 异构枚举: 一般不建议这么做
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}

// 4. 计算的和常量成员
enum E { X, Y, Z}
console.log(E)          // print: { '0': 'X', '1': 'Y', '2': 'Z', X: 0, Y: 1, Z: 2 }
enum Apple {
    Size = 'abc'.length,
    Type = 1,
}
console.log(Apple)      // print: { '1': 'Type', '3': 'Size', Size: 3, Type: 1 }

// 5. 联合枚举
enum ShapeKind {
    Circle,
    Square,
}
interface Circle {
    kind: ShapeKind.Circle;
    radius: number;
}
interface Square {
    kind: ShapeKind.Square;
    sideLength: number;
}

// let c: Circle = {
//     kind: ShapeKind.Square,  // 提示报错：不能将类型“ShapeKind.Square”分配给类型“ShapeKind.Circle”。
//     radius: 100,
// }

// 6. 运行时枚举
enum M { X, Y, Z}
function f(obj: { X: number }) {
    return obj.X;
}
f(M);      // Works，M中有X属性，且为number类型

// 7. 常数枚举
const enum Enum {
    A = 1,
    B = A * 2
}
console.log(Enum.A)     // print: 1
console.log(Enum.B)     // print: 2

// 8. 外部枚举
// 8.1 外部枚举类似于 ts 的类型断言，只要在开发中有这个声明，意味着在当前开发环境上下文中一定存在当前这个对象，你可以随意使用当前对象
// 8.2 外部枚举还可以防止声明枚举的命名冲突和成员冲突
// 8.3 declare 可以与 const 一起使用
declare const enum Directions {
    Up,
    Down,
    Left,
    Right
}
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
console.log(directions)     // print: [ 0, 1, 2, 3 ]

declare enum EnuX {
    A = 1,
    B,
    C = 2
}
```
