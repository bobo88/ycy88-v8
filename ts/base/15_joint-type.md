# TS高级 - 联合类型

::: tip 专题简介
联合类型（Union Types）表示取值可以为多种类型中的一种。
:::

```ts
let user: string | number
user = 123 // 编译OK
user = 'abc' // 编译OK
user = true // 编译报错：不能将类型“boolean”分配给类型“string | number”。
```

如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员。

```ts
interface Bird {
  fly()
  layEggs() // 共有成员
}

interface Fish {
  swim()
  layEggs() // 共有成员
}

function getSmallPet(): Fish | Bird {
  // ...
}

let pet = getSmallPet()
pet.layEggs() // okay
pet.swim() // errors
```

::: warning 注意区分
联合类型 与 交叉类型。
:::
