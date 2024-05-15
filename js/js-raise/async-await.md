# async await 全局异常捕获

## 一、需求背景

### 1.1 promise/async/await 的使用场景

```js
// 封装一个基于Promise的请求函数
httpTest(status) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (status === 'success') {
        resolve({ code: 200, msg: '操作成功' });
      } else {
        reject('error');
      }
    }, 300);
  });
}
```

当我们使用.then().catch()的方法调用，我们在 catch 中就可以捕获到异常

```js
// 调用方式一（封装的 httpTest 函数）：
getList2() {
  this.httpTest()
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
},
```

以下方式使用 async/await 无法捕获异常

```js
// 调用方式二（封装的 httpTest 函数）：
async getList3() {
  let res = await this.httpTest();
  console.log(res);
},
```

::: warning 注意
调用方式二是不能捕获异常的！
:::

### 1.2 async/await 如何捕获异常

```js
// 方式一：调用后加catch
async getList4() {
  let res = await this.httpTest().catch(err => console.log(err));
  console.log(res);
},

// 方式二：try/catch包裹
async getList5() {
  try {
    let res = await this.httpTest();
    console.log(res);
  } catch (err) {
    console.log(err);
  }
},
```

async/await 捕获异常的两种方式中，方式二（try/catch）看起来更舒服些。
::: danger 注意
方式二存在一个问题，如果页面中有多个请求方法时，难道每个请求都使用 try/catch 来包裹吗？这样就会出现 try/catch 满天飞的情况。
:::

## 二、实现方式

解决 try/catch 满天飞的方式如下

```js
/**
 * 方式一：封装
 * 全局的异常捕获
 * @param {Function} func 传入的方法
 * @param  {...any} args 方法调用的参数
 * @returns {Array} [err, res]
 */
export async function asyncFunc(func, ...args) {
  try {
    const res = await func(...args)
    return [null, res]
  } catch (e) {
    return [e, null]
  }
}

// 调用
import asyncFunc from 'xxxx/xxx/xxx'
import { apiOne, apiTwo } from 'api/index.js'
async function func() {
  // A：不带参数接口的处理
  const [err, res] = await asyncFunc(apiOne)
  if (err) {
    // 错误处理
  }
  // 正常处理

  // B：带参数接口的处理
  const [api2Err, api2Res] = await asyncFunc(apiTwo, {id: xxx}, list: [1,2,3,4,5], isTrue: true)
  if (api2Err) {
    // 错误处理
  }
  // 正常处理
}
```

错误可以在 asyncFunc 进行定义全局捕捉，毕竟 async...await...的应用场景大多是连锁请求。

```js
// 方式二：使用第三方插件
// Step 1： 引入
yarn add await-to-js

// Step 2：使用
import awaitTo from "await-to-js"

const [err, res] = await awaitTo(getResData(url, params))
if(err) {
  // 错误处理
} else {
  // 正常处理
}
```

## 三、备注

- [关于 async / await 的异常捕获](https://blog.csdn.net/qq_42543244/article/details/123423894)
- [async...await...全局异常捕获](https://www.cnblogs.com/frank-link/p/13709488.html)
- [await-to-js](https://github.com/scopsy/await-to-js)
