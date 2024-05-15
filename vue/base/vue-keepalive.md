# 简述 VUE 中 keep-alive

## 一、原理

在 created 函数调用时将需要缓存的 VNode 节点保存在 this.cache 中／在 render（页面渲染） 时，如果 VNode 的 name 符合缓存条件（可以用 include 以及 exclude 控制），则会从 this.cache 中取出之前缓存的 VNode 实例进行渲染。
（VNode：虚拟 DOM，其实就是一个 JS 对象）

## 二、使用场景

在组件切换过程中将状态保留在内存中，防止重复渲染 DOM，减少加载时间及性能消耗，提高用户体验性。

```jsx
// App.vue
<keep-alive include="test">
  <router-view />
</keep-alive>

------------------------------------------
// 补充： include/exclude 值的多种形式。
// 1. 将缓存 name 为 test 的组件(基本）
<keep-alive include="test">
  <router-view />
</keep-alive>

// 2. 将缓存 name 为 a 或者 b 的组件，结合动态组件使用
<keep-alive include="a,b">
  <router-view />
</keep-alive>

// 3. 使用正则表达式，需使用 v-bind
<keep-alive :include="/a|b/">
  <router-view />
</keep-alive>

// 4.动态判断
<keep-alive :include="includedComponents">
  <router-view />
</keep-alive>

// 5. 将不缓存 name 为 test 的组件
<keep-alive exclude="test">
  <router-view />
</keep-alive>

// 6. 和 `transition` 一起使用
<transition>
    <keep-alive>
        <router-view />
    </keep-alive>
</transition>

// 7. 数组 (使用 `v-bind`)
<keep-alive :include="['a', 'b']">
    <component :is="view"></component>
</keep-alive>
```

我们还可以通过路由中的 meta 属性来控制，是否需要缓存。

实际开发中，我们可以结合路由守卫来实现需要缓存组件的缓存。

## 三、缓存策略

KeepAlive 组件的 onMounted 和 onUpdated 生命周期时进行缓存。

KeepAlive 组件的缓存策略是 LRU（last recently used）缓存策略。

### 什么时候取消缓存？

- 缓存数量超过设置的 max 时
- 监听 include 和 exclude 修改的时候，会读取缓存中的知进行判断是否需要清除缓存

## 四、备注

- [Vue 中 keep-alive 详解](https://blog.csdn.net/ZYS10000/article/details/122480733)
- [Vue 内置组件之 KeepAlive 原理](https://blog.csdn.net/cyg_l02/article/details/127813373)
