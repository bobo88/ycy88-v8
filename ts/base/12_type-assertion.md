# TS 清单 - 类型断言

::: tip 类型断言
类型断言（Type Assertion）可以用来手动指定一个值的类型。<br/>
语法：值 as 类型；或 <类型>值
:::
在 tsx 语法（React 的 jsx 语法的 ts 版）中必须使用前者，即 值 as 类型。建议统一使用 「值 as 类型」 这样的语法。

## 用途一：将一个联合类型断言为其中一个类型

::: warning 注意
类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，所以不要滥用。
:::

```js
// 以下代码编译时不会报错，但是运行时会报错
interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}
function swim(animal: Cat | Fish) {
    (animal as Fish).swim();
}
const kity: Cat = {
    name: 'kity',
    run() {
        console.log('run')
    }
}
swim(kity)
```

## 用途二：将一个父类断言为更加具体的子类。

```js
class ApiError extends Error {
    code: number = 0;
}
class HttpError extends Error {
    statusCode: number = 200;
}

function isApiError(error: Error) {
    if (typeof (error as ApiError).code === 'number') {
        return true;
    }
    // 当 ApiError和HttpError 是class类来实现继承的时候，可以使用「instanceof」来判断
    // if (error instanceof ApiError) {
    //     return true;
    // }
    return false;
}
```

但是如果 ApiError 和 HttpError 不是用 class 类来定义，而是用「interface」接口来定义的话，则不能使用「instanceof」来判断处理了。因为接口是一个类型，不是一个真正的值，它在编译结果中会被删除。此时只能用「类型断言」来处理。

## 用途三：将任何一个类型断言为 any

```js
// 下面这行代码编译时会报错
window.foo = 1;     // 提示报错： 类型“Window & typeof globalThis”上不存在属性“foo”。

// 如果改成类型断言形式，则不会报错
(window as any).foo = 1;
```

将一个变量断言为 any 可以说是解决 TypeScript 中类型问题的最后一个手段。

它极有可能掩盖了真正的类型错误，所以如果不是非常确定，就不要使用 as any。

## 用途四：将 any 断言为一个具体的类型

```js
// ====== 老旧代码 start ======
function getCacheData(key: string): any {
    return (window as any).cache[key];
}
// ====== 老旧代码  end  ======

interface Cat {
    name: string;
    run(): void;
}
// 我们在使用老旧代码的时候（如果不能直接修改其本身），但是我们可以将其返回值断言成更精确的类型，而不是any满天飞。
const tom = getCacheData('tom') as Cat;
tom.run();
```

## 类型断言的限制

```html
1. 联合类型可以被断言为其中一个类型 2. 父类可以被断言为子类 3.
任何类型都可以被断言为 any 4. any 可以被断言为任何类型 5. 要使得 A 能够被断言为
B，只需要 A 兼容 B 或 B 兼容 A 即可
<!-- 1~4，都是5的特例 -->
```

## 双重断言

::: danger 双重断言
除非迫不得已，千万别用双重断言。
:::

```js
interface Cat {
    run(): void;
}
interface Fish {
    swim(): void;
}
// 这种双重断言，那么十有八九是非常错误的，它很可能会导致运行时错误。
function testCat(cat: Cat) {
    return (cat as any as Fish);
}
```

## 类型断言 vs 类型声明

类型声明是比类型断言更加严格的。

```js
// ====== 1. 类型断言（下面代码编译时OK）
interface Animal {
    name: string;
}
interface Cat {
    name: string;
    run(): void;
}

const animal: Animal = {
    name: 'tom'
};
let tom = animal as Cat;

// ====== 2. 类型声明（下面代码编译时报错）
interface Animal {
    name: string;
}
interface Cat {
    name: string;
    run(): void;
}

const animal: Animal = {
    name: 'tom'
};
let tom: Cat = animal;          // 提示报错： 类型 "Animal" 中缺少属性 "run"，但类型 "Cat" 中需要该属性。
```

## 类型断言 vs 泛型

```js
// 接上面的例子（老旧代码），增加一个泛型 <T>，可以对 getCacheData 的返回值实现更规范的约束。
function getCacheData<T>(key: string): T {
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

const tom = getCacheData<Cat>('tom');
tom.run();
```

参考地址：
<a href="https://ts.xcatliu.com/basics/type-assertion.html" target="_blank">类型断言</a><br />
