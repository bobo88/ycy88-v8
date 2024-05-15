# TS高级 - 交叉类型

::: tip 交叉类型（Intersection Types）
交叉类型是将多个类型合并为一个类型。 这让我们可以把现有的多种类型「叠加」到一起成为一种类型，它包含了所需的所有类型的特性。
:::

例如， FrontEndEngineer = Name & Age & Skill，FrontEndEngineer 同时是 Name 和 Age 和 Skill。 就是说这个类型的对象同时拥有了这三种类型的成员。

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
```
