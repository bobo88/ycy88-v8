# TS 序章 - 谈谈“类型思维”

::: tip 概念
TypeScript 是具有类型语法的 JavaScript，是 JavaScript 的超集。
:::

在我们正式接触了解 TS 之前，我们可以在脑海中简单过一下以下几个问题：

- 变量名写错或者使用未声明的变量时，在编译阶段，是否会报错？
- 与后端进行 API 接口联调时，字段类型不对时，是否需要逐个逐个的排查？
- 项目维护阶段，碰到之前写的函数方法的多个参数时，能否很准确的知道每个参数的具体含义？
- 修改项目中的某个公用版块时（被多处引入），如何确保所有引入处都调整到位？

## Typescript 是什么？

TypeScript 可以简单的拆分为「Type」「script」。核心就是“Type 类型”。<br/>
将代码的验证和报错时间点提前：由 「运行时报错」 变成 「编译时报错」。

## Typescript 的编译检查

```js
// 前提：abc 变量在未定义的情况下
// js：运行时才会报错 - ReferenceError: abc is not defined
console.log(abc)

// ts：编译时就会报错 - 找不到名称“abc”。
console.log(abc)
```

## Typescript 的类型约束

当我们和后端进行接口联调时，比如某个字段约定是数组，而后端返回的数据是 null 或者其他非数组时，普通的 js 是无法直接验证的。

```js
// 举例：TS 定义的 login返回数据
interface dataInfo {
  msg: string;
  list: string[];
}
interface LoginData {
  data: dataInfo;
  code: number;
}
// ======== 正确使用：返回符合上述类型规则的数据
const login: LoginData = {
  data: {
    msg: 'Response is OK',
    list: []
  },
  code: 200
}

// ======= 错误使用：类型不对，报错
const login: LoginData = {
  data: {
    msg: 'Response is OK',
    list: null // 不能将类型“null”分配给类型“string[]”。
  },
  code: 200
}
```

尤其是中大型项目时，我们可以用 TS 来定义好约定的数据格式，一旦返回的数据格式有误，即可根据报错提示迅速定位到问题。

## Typescript 提升代码可读性

```js
// 普通JS：无法直接感知【options】里面有哪些属性或者方法
function login(options) {
  // ...
  console.log(options.username, options.token, options.password)
}

// TS：可以通过定义的 options - type 直观了解详情
interface LoginOptions {
  username: string;
  token: string;
  password: string;
}

function login(options: LoginOptions) {
  // ...
  console.log(options.username, options.token, options.password)
}
```

因为 JS 本身的灵活性，以及其自由编写的容错性，在很大程度上促进了 JS 的蓬勃发展。<br/>
但随着 JS 运用到的领域越广泛，涉及到的项目越来越多，越来越大，这种“自由”编写代码的方式很大程度上也在考验开发者的开发维护能力。<br/>
很多细小的改动，牵一发而动全身，尤其是那种紧急上线的需求，更加需要我们将代码的一些错误提前暴露出来，这也是 TS 大展身手的时候。<br/>

::: warning 类型思维
Todo ...
:::
