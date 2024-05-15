# TS清单 - 类型别名

::: tip 类型别名
通俗点说，就是给一个类型另起一个名字，关键词「type」。

使用场景：一般用在「联合类型」「交叉类型」等。
:::

```js
// 一个简单的 DEMO
type Name = {
  name: string,
}
type Age = {
  age: number,
}
type Skill = {
  canCode(): boolean,
  other: number,
}
type FrontEndEngineer = Name & Age & Skill

function getFrontEndEngineer<T>(user: T): T {
  return user
}
let bob =
  getFrontEndEngineer <
  FrontEndEngineer >
  {
    name: 'Bob',
    age: 28,
    canCode: () => {
      return true
    },
    other: 10,
  }
console.log(bob) // { name: 'Bob', age: 28, canCode: [Function: canCode], other: 10 }

// DEMO 2
// 定义两个简单类型 Name和ID，定义一个User类型（它可以是Name或者是ID）
type Name = string
type ID = number
type User = Name | ID // 创建一个别名类型

let bob: User = 'Bob'
let bob2: User = 430524
let bob3: User = () => {} // 不能将类型“() => void”分配给类型“User”。
```
