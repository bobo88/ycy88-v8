# 闭包

:::tip 闭包问答

- 闭包一定会 return 吗？ //不一定
- 闭包一定会内存泄露吗？ // no
  :::

列子

```js
//闭包
function outSide() {
  let i = 0
  function inSide() {
    i++
    console.log(i++)
  }
  inSide() //inSide函数调用的时候，发现i被inSide函数使用了，inSide执行完之前，i的内存一直会被保存，所以outSide会形成闭包
}
outSide()
```

## 闭包什么时候 return

外部需要使用闭包的变量，此时需要 return,如下：

```js
//统计函数被调用的次数
function fn() {
  count = 0
  return function () {
    count++
    console.log('函数被调用了', count, '次')
  }
}
let result = fn()
result()
result()
```

## 什么是闭包？

有权访问另一个函数变量的函数，闭包的本质就是作用域链的特殊应用场景。

## 表现形式

他的表现形式是方法里面返回方法

:::tip 闭包涉及到的知识点

1. 函数的执行上下文:当全局代表和函数被执行前期，首先进入到预解析期创建 GO,VO 等对象。
2. 变量对象：VO(visabled Object)就是 AO 和 GO 的统称，在全局作用域 VO === GO,在函数内部 VO === AO。
3. 活动对象：AO(activity Object)
4. 作用域
5. 作用域链
   :::

## 闭包三要素

1. 函数里面定义了内部函数
2. 内部函数访问了外部函数变量
3. 内部函数被调用(内部函数执行的时候外部函数局部变量被其他程序占用，参数和变量不会被回收)

## 为什么会产生闭包？

js 的作用域特性导致的，当前函数执行，形成一个私有的执行上下文，当前执行上下文中某些内容，被上下文以外的内容所占用，那么当前的上下文就不会被释放。

## 闭包的作用

1. 私有作用域:防止变量不会受到其他变量的污染，vue 的 data 就是一个闭包的设计，保证了各个组件之间的 data 不会受到其他组件的污染。
2. 延长变量的生命周期：防抖就是通过延长变量的生命周期来达到同一时间段里面多次点击只会执行一次。
3. 内外方法沟通的桥梁：内部方法可以访问外部变量。

## 缺点

常驻内存，因为变量不会被垃圾回收，导致栈溢出，内存泄露，所以要慎用闭包。

## 闭包的使用场景

1. 返回值，以闭包的形式返回变量 如下

```js
function fn() {
  let name = "xxx";
  return () => {
    return name;
  };
}
let fnc = ();
fnc();
```

2. 函数赋值

```js
var fn
function fnc() {
  let name = 'xxxx'
  fn = function () {
    return name
  }
}
fnc()
fn()
```

3. 函数参数

```js
function fn() {
  let name = 'xxxx'
  return function () {
    return name
  }
}
let fn1 = fn()
function fnc(callback) {
  let result = callback()
  return result
}
console.log(fnc(fn1)) //输出xxxx
```

4. 自执行函数

```js
;(function () {
  let name = 'xxxx'
  let fn1 = function () {
    return name
  }
  fn1()
})()
```

5. 循环赋值

```js
for (var i = 0; i < 5; i++) {
  ;(function (j) {
    let fn1 = function () {
      console.log(j)
      return j
    }
    fn1()
  })(i)
}
```

6. getter 和 setter（以方法的形式访问闭包，其实就是模块化封装，vue3 的 hooks 函数封装是这样）

```js
function fn() {
  let name = 'xxxx'
  let setName = function (n) {
    name = n
  }
  let getName = function () {
    return name
  }
  return {
    setName,
    getName
  }
}
let fnc = fn()
fnc.setName('aaaa')
fnc.getName() //打印出aaaa
```

7. 迭代器（执行一个函数往下取值）

```js
let arr = ['aa', 'bb', 'cc']
function fn() {
  let i = 0
  return function () {
    return arr[i++] || '数组已经遍历完'
  }
}
let next = fn()
next() // aa
next() // bb
next() // cc
next() // 数组已经遍历完
```

8. 首次区分（相同的参数，函数不会重复执行）

```js
function fn() {
  let arr = []
  return (val) => {
    if (!arr.includes(val)) {
      arr.push(val)
      console.log('缓存添加成功')
      return
    }
    console.log('已经在缓存中', arr)
  }
}
let cache = fn()
cache(10) // 缓存添加成功
cache(30) // 缓存添加成功
cache(10) // 已经在缓存中
```

9. 缓存（比如求和，已经计算过一次的，就直接从缓存里面去取）

```js
let fn = (function () {
  let cache = {}
  let sumFn = function (arr) {
    let sum = 0
    arr.forEach((ele) => {
      sum += ele
    })
    console.log('缓存中没有，重新计算，并且加入到缓存', cache)
    return sum
  }
  return (arr) => {
    let index = arr.join('-')
    if (!cache[index]) {
      cache[index] = sumFn(arr)
    } else {
      console.log('缓存中已经存在，直接取出', cache)
    }
  }
})()
fn([1, 2, 3, 4])
fn([1, 2, 3, 4])
```

10. 防抖和截流

```js
//防抖
function bounce() {
  let time = null
  return () => {
    clearTimeout(time)
    time = setTimeout(() => {
      console.log(343443433434)
    }, 500)
  }
}
//截流
function throttle() {
  let time = null
  return () => {
    if (!time) {
      time = setTimeout(() => {
        console.log(55555)
        clearTimeout(time)
        time = null
      }, 1000)
    }
  }
}
```
