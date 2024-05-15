# VUE 全家桶之 Vuex

::: tip Vuex
官方定义：Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。<br/>
它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
:::

## 核心概念

- State
- Getter
- Mutation
- Action
- Module

## 核心概念：State

Vuex 的状态存储是响应式的

```js
const app = new Vue({
  el: '#app',
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件，且子组件能通过 this.$store 访问到
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})
```

mapState 辅助函数

```js
// ========= mapState 函数返回的是一个对象
computed: {
  localComputed () { /* ... */ },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
  })
}

// ========= 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'
export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}

// ========= 当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
```

## 核心概念：Getter

存在背景：我们需要从 store 中的 state 中派生出一些状态时就需要使用到它，Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。

如何使用：Getter 接受 state 作为其第一个参数，Getter 会暴露为 store.getters 对象。

- 通过属性访问: 在组件中，可以这么使用: this.$store.getters.XXX。
- 通过方法访问: 在组件中，可以这么使用: this.$store.getters.Func(params)来实现给 getters 传参。

```js
// mapGetters 辅助函数
// 1. mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性<br/>
// 2. 如果你想将一个 getter 属性另取一个名字，使用对象形式：
mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})
```

## 核心概念：Mutation

::: warning 注意
1、更改 Vuex 的 store 中的状态的唯一方法是提交 mutation<br/>
2、使用常量替代 Mutation 事件类型<br/>
3、Mutation 必须是同步函数，因为实质上任何在回调函数中进行的状态的改变都是不可追踪的<br/>
:::

```js
// 语法：
// XXX：事件类型名称；
// state：state数据；
// payload：载荷，也就是 commit 时传入的额外参数。
mutations: {
    XXX (state, payload) {
        //  ...
    }
}
```

使用方法：store.commit('XXX')，其中 XXX 是 mutations 中定义的事件类型名称。<br/>
或者对象风格的提交方式：store.commit({type: 'XXX', amount: 10});

mapMutations 辅助函数: 将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）

## 核心概念：Action

::: warning 注意
Action 类似于 mutation。不同在于：<br/>
1、Action 提交的是 mutation，而不是直接变更状态。<br/>
2、Action 可以包含任意异步操作。
:::

```js
// 语法：
actions: {
    increment (context) {
        context.commit('increment')
    }
}

// 使用方法（分发 Action）：
// Actions 支持同样的载荷方式和对象方式进行分发
store.dispatch('increment')

// mapActions 辅助函数
```

Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。
::: warning 注意
context 对象不是 store 实例本身！！！
:::
组合 Action：利用 Promise

- 一个 store.dispatch 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。

## 核心概念：Module

Vuex 允许我们将 store 分割成模块（module）

```js
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

模块的局部状态

- 对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。
- 对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState
- 对于模块内部的 getter，根节点状态会作为第三个参数暴露出来

```js
const moduleA = {
  // ...
  getters: {
    sumWithRootCount(state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}
```

命名空间: todo

## Vuex: 插件

插件本质： 就是一个函数，接受 store 作为唯一参数。

```js
// 定义：
const myPlugin = (store) => {
  // 当 store 初始化后调用
  store.subscribe((mutation, state) => {
    // 每次 mutation 之后调用
    // mutation 的格式为 { type, payload }
  })
}

// 使用：
const store = new Vuex.Store({
  // ...
  plugins: [myPlugin]
})
```

## Vuex: 测试

一般针对 mutation 和 action 进行单元测试

测试插件：Mocha + Chai 、Karma + karma-webpack

## Vuex: 热重载

作用：就是 webpack 的热重载功能，提高开发效率。

- 1、比如配置的 mutations 的热重载，添加新的 mutations 方法时就不会刷新页面，而是加载一段新的 js。
- 2、比如修改 getters、mutations 或者 actions 里面的数据或者方法时，都能自动更新，而不需要手动刷新页面后才能看到更改代码后的效果。
