# TS 清单 - 基本数据类型

::: tip 类型注解
类型注解的作用：类似强类型语言中的类型声明<br/>
语法：(变量/函数):type
:::

我们知道 JS 有六种常见的基本数据类型，分别是：布尔（boolean）/ 字符（string）/ 数值（number）/ null / undefined / Symbol（ES6）。<br/>
::: tip 引申
备注：JS 的第七种基本数据类型 BigInt （ES10）
:::
其他非基本数据类型的有：数组（Array） / 对象（Object）/ 函数（Function）。<br/>
TS 在完全集成 JS 所有数据类型的基础上，又新增了：void / any / never / 元组 / 枚举 / 高级类型 等。

## 基本数据类型 - 类型注解

```js
// 类型注解
let isOK: boolean = true
let str: string = 'abc'
let isNull: null = null
let age: number = 18
let empty: undefined = undefined
let s1: symbol = Symbol()

// tsconfig.json 里面配置 "strictNullChecks": false,
// 则可以实现其他类型赋值为 null/undefined。
// TS官方文档中，null/undefined是任何类型的子类型。
isOK = null
str = undefined
// 如果不设置 "strictNullChecks": false, 上面两行赋值代码将会报错提示。
```

## TS 新增 - 类型注解

```js
// 空值 - void：表示没有任何返回值的函数
function alertSth(name: string): void {
  alert(`弹出的名字是: ${name}`)
}
alertSth('Bob')
// 也可以将一个变量声明为 void 类型，但是它只能被赋值为 null/undefined，所以基本上也没啥用处。
let unusable: void = undefined

// 任意值 - any：用来表示允许赋值为任意类型
// 在任意值上访问任何属性或调用任何方法都是被允许的。
let an: any = 123
an = 'Bob'
an = true
an.toString()
an.hello()

// Never： never类型表示的是那些永不存在的值的类型。
// never类型是任何类型的子类型，也可以赋值给任何类型；
// 然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。
// 即使 any也不可以赋值给never。
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message)
}
// 推断的返回值类型为never
function fail() {
  return error('Something failed')
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {}
}
```

## 类型推导

如果没有明确指定数据的类型，那么 TS 会根据类型推论的规则自动推导出一个类型。

```js
// 类型推断为： number
let num1 = 123
num1 = 'Bob' // 报错：不能将类型“string”分配给类型“number”。

// 类型推断为： any
let anyKey
anyKey = 123
anyKey = 'Bob'
anyKey = true
```
