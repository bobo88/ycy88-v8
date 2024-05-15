# TS 清单 - 类型推论

::: tip 类型推论
如果没有明确的指定类型，TS 会根据变量赋值时的按照类型推论规则推断出一个类型。
:::

```js
// 1. 有默认赋值时
let myLove = 'myLove' // 这里其实已经推断出 myLove 为字符串类型了。
myLove = 28 // 提示报错：不能将类型“number”分配给类型“string”。

// 2. 无默认赋值时
let myLove // 未赋值的情况下，myLove 推断为 any 类型。
myLove = 'myLove'
myLove = 28
```

## 最佳通用类型

```js
// DEMO 1
// 在编译器中鼠标指向 x，可以看到 x 被推断为 let x: (number | null)[]
let x = [0, 1, null] // let x: (number | null)[]

// DEMO 2
class Animal {}
class Rhino extends Animal {}
class Elephant extends Animal {}
class Snake extends Animal {}

let zoo = [new Rhino(), new Elephant(), new Snake()] // let zoo: (Rhino | Elephant | Snake)[]
// 也可以将 zoo 明确指定一个类型
let zoo2: Animal[] = [new Rhino(), new Elephant(), new Snake()] // let zoo2: Animal[]
```

参考地址：
<a href="https://www.tslang.cn/docs/handbook/type-inference.html" target="_blank">类型推论</a><br />
