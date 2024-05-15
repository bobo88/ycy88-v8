# TS清单 - 数组

::: tip 数组的定义
数组就是一组数据的集合，其表现形式就是内存中的一段连续的内存地址，数组名称其实就是连续内存地址的首地址<br/>
数组是一种「线性表」的顺序存储结构
:::

```js
// 简便数组类型
let arr1: string[] = ['abc', 'Bob', 'xyz'];
// 使用泛型来表示数组
let arr2: Array<string> = ['xiaoming', 'xiaoli', 'xiaoyuan'];
// 复合类型
let arr3: (string | number)[] = [123, 'Bob', 'Tst'];
// 用接口表示数组：一般不用这种方式
interface StringArray {
    [index: number]: string
}
let names: StringArray = ['Bob', 'Li', 'Yuan'];

// 只读数组
// 1. 使用"ReadonlyArray"内置类型
const readOnlyArr: ReadonlyArray<number> = [12, 34];
// readOnlyArr.push(1) // 报错：类型“readonly number[]”上不存在属性“push”。

// 2. 使用readonly修饰符，注意：readonly修饰符不能和泛型数组类型一起使用。
const readOnlyArr2: readonly number[] = [12, 34];

// 3. 使用Readonly工具类型
const readOnlyArr3: Readonly<number[]> = [12, 34];
```

::: tip 元组
元组（Tuple）是一个类型化数组，每个索引都有预定义的长度和类型。
:::

```js
// 定义元组, 可以 push 改变长度
let oneTuple: [number, boolean, string]
// 正确初始化
oneTuple = [6, false, 'Bob']

// 定义只读元组
const twoTuple: readonly [string, number, boolean] = ['Bob', 123, true];
// 下面代码报错：类型“readonly [string, number, boolean]”上不存在属性“push”。
// twoTuple.push(345);

// 命名元组 & 元组解构
const group: [x: string, y: number] = ['Bob', 123];
const [x, y] = group;
console.log(x, y) // print: Bob 123
```
