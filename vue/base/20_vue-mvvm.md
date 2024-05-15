# VUE 双向数据绑定原理

## 一、VUE2 双向数据绑定原理：

Vue.js 2.x 中的双向数据绑定主要是通过数据劫持和发布/订阅模式来实现的。

## 1. **数据劫持（Object.defineProperty）:**

- Vue 在初始化时会遍历 data 对象的属性，使用 `Object.defineProperty` 方法对每个属性进行劫持。
- 对于每个属性，Vue 创建了一个称为“dep（依赖）”的对象，用于存储与该属性相关的订阅者（Watcher）。
- `Object.defineProperty` 还会为每个属性生成 getter 和 setter，用于获取和设置属性的值。

```javascript
// 简化的数据劫持示例
function defineReactive(data, key, val) {
  let dep = new Dep() // 创建依赖对象

  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      if (Dep.target) {
        dep.addSub(Dep.target) // 将当前Watcher添加到依赖中
      }
      return val
    },
    set: function (newVal) {
      if (val === newVal) return
      val = newVal
      dep.notify() // 数据变化时通知所有订阅者
    }
  })
}
```

## 2. **模板解析和编译:**

- Vue 解析模板，将模板中的数据绑定表达式（如 `{{message}}`）提取出来。
- 通过编译过程，将模板中的数据绑定表达式替换为对应的数据取值操作。

## 3. **Watcher 观察者模式:**

- 每个使用了数据绑定的地方都有一个对应的 Watcher 对象，它负责监听数据变化并执行相应的回调。
- 在模板解析和编译过程中，为每个数据绑定表达式创建一个 Watcher 实例。

```javascript
class Watcher {
  constructor(vm, exp, cb) {
    this.vm = vm
    this.exp = exp
    this.cb = cb
    this.value = this.get() // 初始化时获取当前值
  }

  get() {
    Dep.target = this // 设置当前Watcher
    const value = this.vm[this.exp] // 触发 getter，添加当前Watcher到依赖中
    Dep.target = null // 重置当前Watcher
    return value
  }

  update() {
    const newValue = this.vm[this.exp]
    const oldValue = this.value
    if (newValue !== oldValue) {
      this.value = newValue
      this.cb.call(this.vm, newValue, oldValue)
    }
  }
}
```

## 4. **发布/订阅模式:**

- 为了实现数据的双向绑定，需要一种能够通知各个 Watcher 数据变化的机制，这就是发布/订阅模式。
- Vue 中的 `Dep`（依赖）扮演了这个角色，每个被劫持的属性都有一个对应的 `Dep` 对象。

```javascript
class Dep {
  constructor() {
    this.subs = [] // 存储所有订阅者
  }

  addSub(sub) {
    this.subs.push(sub)
  }

  notify() {
    this.subs.forEach((sub) => sub.update())
  }
}
```

当数据发生变化时，`setter` 会触发 `Dep.notify()`，通知所有相关的 Watcher 执行更新操作，从而实现双向数据绑定。

需要注意的是，上述是 Vue.js 2.x 的基本原理，Vue.js 3.x 使用 Proxy 替代了 `Object.defineProperty` 来实现数据的劫持。

## 二、VUE2 和 VUE3 区别

## 1. TODO

> TODO

---

- [vue 的双向绑定原理与实现](https://juejin.cn/post/7080562890628923423)
- [Vue2 中的变化侦测原理](https://developer.aliyun.com/article/936865)
- [响应式原理](https://tsejx.github.io/vue-guidebook/infrastructure/vue2/reactivity/)
