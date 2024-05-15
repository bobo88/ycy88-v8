# 设计模式 - 单例模式

## HTML 部分

```html
<button id="button">点击我</button>
```

## JS 部分

```js
// // 单例模式
// function createLogin() {
//   var div = document.createElement('div')
//   div.innerHTML = '我是登录弹窗'
//   div.style.display = 'none'
//   document.body.appendChild(div)
//   return div
// }
// function singleFun(fn) {
//   var result
//   return function() {
//     return result || (result = fn.apply(this, arguments))
//   }
// }
// var singleItem = singleFun(createLogin)
// document.getElementById('button').onclick = function() {
//   var tcDiv = singleItem()
//   tcDiv.style.display = 'block'
// }

// 封装
let SINGLE = {
  createLogin: function () {
    let div = document.createElement('div')
    div.innerHTML = '我是登录弹窗'
    div.style.display = 'none'
    document.body.appendChild(div)
    return div
  },
  singleFun: function (fn) {
    let result
    return function () {
      return result || (result = fn.apply(this, arguments))
    }
  }
}
let { createLogin, singleFun } = SINGLE
let singleItem = singleFun(createLogin)
document.getElementById('button').onclick = function () {
  var tcDiv = singleItem()
  tcDiv.style.display = 'block'
}
```
