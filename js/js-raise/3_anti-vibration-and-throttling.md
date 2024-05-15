# 防抖与节流

## 一、防抖

::: tip 防抖(debounce)
防抖触发高频率事件时 n 秒后只会执行一次,如果 n 秒内再次触发,则会重新计算。
:::

概述:每次触发时都会取消之前的延时调用。

```html
<!-- HTML 部分 -->
<input type="text" id="input" />
```

```js
// JS 部分
// 防抖函数
function bounce(delay, cb) {
  var timer
  return function (value) {
    clearTimeout(timer)
    timer = setTimeout(function () {
      cb(value)
    }, delay)
  }
}
function fn(value) {
  console.log(value)
}
var inputItem = document.getElementById('input')
var bounceFun = bounce(1000, fn)
inputItem.addEventListener('keyup', function (e) {
  bounceFun(e.target.value)
})
```

## 二、节流

::: tip 节流(throttle)
高频事件触发，每次触发事件时设置一个延迟调用方法，并且取消之前的延时调用方法。
:::

```html
<!-- HTML 部分 -->
<button id="button">点击我</button>
<p>随机数：<span id="js-random"></span></p>
```

```js
// JS 部分
// 节流
function throttling(func, wait) {
  var timer
  return function () {
    if (!timer) {
      timer = setTimeout(function () {
        func()
        timer = null
      }, wait)
    }
  }
}
function handle() {
  document.getElementById('js-random').innerHTML = Math.random()
}
document.getElementById('button').onclick = throttling(handle, 1000)
```

::: warning 防抖与节流的区别
函数防抖是在「一定时间」内连续触发的事件，只在「最后执行一次」。如果事件在「不超过设定时间」内一直触发，则事件会一直不执行。

函数节流是「一段时间内」只执行一次。就是设置「1 秒」时间时，不管触发事件 1 次还是 100 次，它都最终有且只会执行一次。
:::
