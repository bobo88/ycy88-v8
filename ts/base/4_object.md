# TS 清单 - 对象

::: tip 对象的类型 - 接口
在 TS 中，使用接口 interface 来定义对象的类型。
:::

## 基础 DEMO 举例

```js
// 对象的具体实现要与接口保持一致，既不能多，也不能少。
interface Person {
  name: string;
  age: number;
  addr: string;
}

let bob: Person = {
  name: 'Bob',
  age: 28,
  addr: 'ShenZhen'
}
```

::: tip 接口的命名规范
接口命名一般首字母大写。有的编程语言中会建议接口的名称加上 `I` 前缀。
:::

## 可选属性 / 任意属性 / 只读属性

```js
// 可选属性： 定义接口时，该属性名后面加问号?，表示当前属性可以在对象具体实现时不存在。
interface Person {
    name: string;
    age: number;
    addr?: string;
}

let bob: Person = {
    name: 'Bob',
    age: 28,
}

// 任意属性：下面接口定义表示 name 必须实现，age 可以选择性实现，其他属性可以任意实现
interface Person {
    name: string;
    age?: number;
    [propName: string]: any; // 如果 any 改成 string，则任意属性的值必须是字符型
}

let bob: Person = {
    name: 'Bob',
    age: 28,
    birth: '10-01'
}

// 只读属性：用 readonly 定义
interface Person {
    readonly name: string;
    age?: number;
    [propName: string]: any;
}

let bob: Person = {
    name: 'Bob',
    age: 28,
    birth: '10-01'
}
bob.name = 'Yuan'; // 报错：无法为“name”赋值，因为它是只读属性。
```

::: warning 注意
只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候
:::

```js
// 只读属性：用 readonly 定义
// 只读属性也可以设置 可选
interface Person {
    readonly name?: string;
    age?: number;
    [propName: string]: any;
}

let bob: Person = {
    age: 28,
    birth: '10-01'
}
// 单独对只读属性赋值会报错，但是对整个对象进行重新赋值是OK的
bob = {
    name: 'Bob',
    age: 22,
    addr: 'SZ'
}
console.log(bob) // print: { name: 'Bob', age: 22, addr: 'SZ' }
```
