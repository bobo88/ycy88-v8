# 设计模式 - 发布订阅者模式

```js
let EventListen = (function () {
  let list = {},
    trigger,
    listen,
    remove

  // 订阅
  listen = function (key, fn) {
    if (!this.list[key]) {
      this.list[key] = []
    }
    this.list[key].push(fn)
  }

  // 发布
  trigger = function () {
    // 对应的key取出来
    let key = Array.prototype.shift.call(arguments)
    let fns = this.list[key]
    if (!fns || fns.length === 0) {
      return
    }
    for (let i = 0, fn; (fn = fns[i++]); ) {
      fn.apply(this, arguments)
      // fn(...arguments)
    }
  }

  // 取消订阅
  remove = function (key, fn) {
    let fns = this.list[key]
    if (!fns) {
      return false
    }
    if (!fn) {
      fn && (fns.length = 0)
    } else {
      for (let i = fns.length; i >= 0; i--) {
        let _fn = fns[i]
        if (_fn === fn) {
          fns.splice(i, 1)
        }
      }
    }
  }
  return {
    list,
    trigger,
    listen,
    remove,
  }
})()

EventListen.listen('red', function (size) {
  console.log(`size是${size}`)
})
EventListen.listen('black', function (size) {
  console.log(`size是${size}`)
})
EventListen.trigger('red', 42)
EventListen.trigger('black', 43)
EventListen.trigger('black', 40)
EventListen.trigger('black', 41)
```
