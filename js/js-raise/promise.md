# Promise 的作用

## 一、概念

Promise 是 js 中用于异步编程的一种对象。它表示一个异步操作的最终完成（或失败）及其结果值。一个 Promise 对象可以处于以下三种状态之一：

- **Pending（进行中）**：初始状态，既不是成功，也不是失败。
- **Fulfilled（已成功）**：操作成功完成。
- **Rejected（已失败）**：操作失败。

::: info 异步编程的情形

- fs 读取文件
- Ajax 请求
- 定时器
- 事件监听
- ...

:::

## 二、语法

创建一个 Promise 实例通常涉及提供一个执行器（executor）函数，该函数接受两个参数，分别是 `resolve` 和 `reject`：

```js
const myPromise = new Promise((resolve, reject) => {
  // 异步操作
  if (/* 操作成功 */) {
    resolve(value);  // 传递成功结果
  } else {
    reject(error);  // 传递错误或失败原因
  }
});
```

## 三、特点

- **链式调用**：Promise 可以通过 `then` 方法链式调用，每个 `then` 返回一个新的 Promise，可以解决回调地狱问题。
- **不可变状态**：一旦 Promise 状态变为 Fulfilled 或 Rejected，它将永远保持该状态，不会再变。
- **错误冒泡（异常穿透）**：类似于同步代码中的异常冒泡，Promise 在链式调用中，如果没有捕获异常，会传递至链尾。

## 四、常用 API

- **`Promise.then(onFulfilled, onRejected)`**：添加成功或失败的回调函数。
- **`Promise.catch(onRejected)`**：添加一个拒绝（或错误）处理回调，是 `then(null, rejection)` 的别名。
- **`Promise.finally(onFinally)`**：无论 Promise 最终状态如何，都会执行的处理器。
- **`Promise.all(iterable)`**：接受一个 Promise 对象的集合，当所有 Promise 都成功时，返回一个成功的新 Promise，包含所有结果。
- **`Promise.race(iterable)`**：接受一个 Promise 对象的集合，返回一个新 Promise，它由第一个 settled（无论是 fulfilled 还是 rejected）的 Promise 决定。

## 五、实现原理

Promise 的实现原理基于以下几个核心概念：

- **回调函数管理**：内部维护两个回调列表，一个用于成功的回调，一个用于失败。
- **状态转移**：执行器中的 `resolve` 或 `reject` 负责状态的转移。
- **微任务队列**：Promise 的回调执行是在 js 事件循环的微任务阶段进行的。这意味着 Promise 回调总是在同步代码执行完后才开始执行。
- **异步执行流**：利用 js 的事件机制（如 `setTimeout`, `setImmediate`, 或 `process.nextTick`）保证 `then` 和 `catch` 方法异步执行。

## 六、高级用法

> TODO

## 七、备注

### 1）如何中断 promise 链

要中断一个 Promise 链，你可以选择抛出一个错误（`throw` 一个错误），或者返回一个被拒绝（rejected）的 Promise。这将导致链中后续的 `.then` 或 `.catch` 块被跳过，直到捕获到一个错误处理函数。

```js
Promise.resolve()
  .then(() => {
    throw new Error('Something went wrong!')
  })
  .then(() => {
    console.log('This will not run')
  })
  .catch((error) => {
    console.log('Error caught:', error.message)
  })
```

在实践中，有时也可以通过返回一个永远不会解决或拒绝的 Promise 来“暂停” Promise 链，从而实现类似中断的效果：

```js {1}
new Promise(() => {}) // 永远不解决的 Promise
  .then(() => console.log('This will not run'))
```

```js {5}
let p = new Promise((resolve, reject) => resolve(1111))

p.then(() => {
  console.log('This will run')
  return new Promise(() => {}) // [!code focus]
})
  .catch(() => console.log('This will not run'))
  .finally(() => console.log('This will not run'))
```

### 2）async/await 的作用

`async` 和 `await` 是使异步代码看起来和同步代码类似的语法糖。`async` 函数声明该函数是异步的，并且其内部可以使用 `await` 来等待异步操作的结果，而不会阻塞函数外的代码执行。这样可以写出更加清晰、易于维护的异步代码。

```js
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data') // [!code focus:2]
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
  }
}
```

这种方式使得错误处理变得简单，可以用传统的 `try/catch` 结构来捕捉异步操作中的错误。

### 3）throw 抛出异常改变状态

在 Promise 中，使用 `throw` 可以将 Promise 的状态从 "fulfilled" 改变为 "rejected"。这意味着你可以用 `throw` 在函数中直接触发错误处理逻辑，而这通常用在 `.then` 方法中。被 `throw` 抛出的异常会被 Promise 链中最近的 `.catch` 块捕获。

```js {3}
Promise.resolve()
  .then(() => {
    throw new Error('Failed here!')
  })
  .catch((error) => {
    console.error('Caught an error:', error.message)
  })
```

在 `async` 函数中，抛出异常将导致 Promise 被拒绝，这个异常可以在调用该异步函数的地方被 `.catch` 方法捕获。

```js
async function mightFail() {
  throw new Error('Something went wrong!')
}

mightFail().catch((error) => {
  console.log('Error:', error.message)
})
```
