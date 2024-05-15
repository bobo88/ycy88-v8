# VUE 清单 - 生命周期

::: tip 生命周期
每个 Vue 组件实例在创建时都需要经历一系列的初始化步骤，比如设置好数据侦听，编译模板，挂载实例到 DOM，以及在数据改变时更新 DOM。
在此过程中，它也会运行被称为生命周期钩子的函数，让开发者有机会在特定阶段运行自己的代码。
:::

## VUE3 生命周期

```js
// setup
// beforeCreate / created
// beforeMount / mounted
// beforeUpdate / updated
// beforeUnmount / unmounted

// activated（激活）         // 注册一个回调函数，若组件实例是 <KeepAlive> 缓存树的一部分，当组件 「被插入」到 DOM 中时调用。
// deactivated（失活）       // 注册一个回调函数，若组件实例是 <KeepAlive> 缓存树的一部分，当组件 「被移除」到 DOM 中时调用。
// errorCaptured            // 当捕获一个来自子孙组件的异常时激活钩子函数
// renderTracked            // Dev only: 注册一个调试钩子，当组件渲染过程中追踪到响应式依赖时调用。
// renderTriggered          // Dev only: 注册一个调试钩子，当响应式依赖的变更触发了组件渲染时调用。
```

在 setup 中你应该避免使用 this，因为它不会找到组件实例。setup 的调用发生在 data property、computed property 或 methods 被解析之前，所以它们无法在 setup 中被获取。
::: tip setup

1. 执行 setup 时，组件实例尚未被创建
2. 在 setup 中调用生命周期钩子 - 加 < on >
3. setup(props, context) + 因为 props 是响应式的，你不能使用 ES6 解构，它会消除 prop 的响应性。 + 需要解构 prop，可以在 setup 函数中使用 toRefs 函数来完成此操作 + 可选的 prop，需要使用 toRef
   :::

![VUE3 image](/images/prev/lifecycle_vue3.png)

## VUE2 生命周期

```js
// VUE2和VUE3生命周期对比
// Vue2 ----------- vue3
// beforeCreate  -> setup()
// created       -> setup()
// beforeMount   -> onBeforeMount
// mounted       -> onMounted
// beforeUpdate  -> onBeforeUpdate
// updated       -> onUpdated
// beforeDestroy -> onBeforeUnmount
// destroyed     -> onUnmounted
// activated     -> onActivated
// deactivated   -> onDeactivated
// errorCaptured -> onErrorCaptured
```

![VUE2 image](/images/prev/lifecycle_vue2.png)

参考：<br />
<a href="https://cn.vuejs.org/" target="_blank">VUE3 - 中文官网</a><br />
<a href="https://v2.cn.vuejs.org/" target="_blank">VUE2 - 中文官网</a><br />
