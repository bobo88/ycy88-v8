# vue3 与 vue2 对比

::: tip VUE 概念
一款用于构建用户界面的 JavaScript 框架，渐进式框架。
:::
注意：【用新不用旧】老旧项目用 vue2 开发的能重构尽量重构，新项目一律用 vue3。

VUE3 和 VUE2 的差异性主要体现在：

- 生命周期钩子函数
- 底层封装
- TS 的支持度
- 打包体积
- SSR 渲染优化
- 事件侦听器缓存
- 支持多根节点组件
- ......

## 一、生命周期

```js
// VUE2 和 VUE3 生命周期对比
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

详见：<a href="/vue/VUE清单 - 生命周期.html">VUE 清单 - 生命周期</a>

## 二、底层封装（重点）

- 【双向数据绑定】

```js
// 【双向数据绑定】 - 底层监听原理
// ====== vue2: Object.defineProperty( )
// 1. 只能响应首次渲染时候的属性，未声明的数据 未被劫持，所以无法触发视图的更新
// 2. 不能监听数组的变化： Array型数据还是在getter中收集依赖， setter 本质是通过「重写」操作Array的方法
// 3. 重写：push()，pop()，shift()，unshift()，splice()，sort()，reverse()
// 4. 必须遍历对象的每个属性，必须深层遍历嵌套的对象
// 原理：利用Object.defineProperty()， Observer遍历data每个属性通过defineReactive方法劫持data每个属性的getter和setter。
// 对应的补丁API：Vue.set / Vue.delete（vm.$set / vm.$delete）

// ====== vue3: Proxy
// 1. Proxy的配置项有13种，可以做更细致的事情
// 2. Proxy 是一个对象，它包装了另一个对象，并允许你拦截对该对象的任何交互。
// 3. 拦截对象中任意属性的变化, 包括：属性值的读写、属性的添加、属性的删除等
// 4. 局限性：不兼容IE
const person = new Proxy(
  {},
  {
    getter(target, propKey) {
      return target[propKey]
    },
    setter(target, propKey, value) {
      target[propKey] = value
    }
  }
)
person.name = 'Bob 大帅哥'
console.log('person.name: ', person.name)
```

- 【Diff 算法】的提升

```html
<!-- 【Diff 算法】的提升 -->
vue2.x: 虚拟dom是全量的对比 vue3: 新增【静态标记（patchflag）】 +
只对比带有patch flag的节点（动态数据所在的节点） + 减少了资源的损耗
【hoistStatic 静态提升】 + vue2 无论元素是否参与更新，每次都会重新创建然后再渲染
+ vue3
对于不参与更新的元素，会做静态提升，只会被创建一次，在渲染时直接复用即可。
```

- 【Composition API】

```html
<!-- 【Composition API】 -->
vue2.x: 【Option API风格】 + 不足：逻辑分散，项目文件较大时，维护开发难度变大
vue3: 【Composition API风格】 + 可以更好的实现高内聚，低耦合，代码逻辑更清晰
```

- 【mixins 更改】

```html
<!-- 【mixins更改】 -->
vue2.x: 【mixins】 + mixins的生命周期比组件快 + 变量来源不明确，不利于阅读 +
多个mixins可能导致冲突，比如都定义了 this.name 作为属性 vue3: 自定义hooks +
高内聚，低耦合
```

## 三、TS 的支持度

```html
vue2.x: 部分支持类型检查 vue3: 全面拥抱TS
```

## 四、优化打包体积

基于 webpack / rollup 等打包工具，可以实现【tree-shaking】，将打包体积缩小。

具体原因是：

```html
vue2.x:
很多函数都挂载在全局Vue对象上，会增加打包体积（如果某些函数不用的情况下） vue3:
所有的API都通过 【ES6模块化】 的方式引入，可以通过webpack/rollup 进行打包优化
剔除【未使用到的API】
```

## 五、其他

![An image](/images/prev/vue3VSvue2.png)
