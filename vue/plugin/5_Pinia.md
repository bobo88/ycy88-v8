# VUE 全家桶之 Pinia

::: tip 概念
Pinia 是一个用于 Vue 的状态管理库，类似 Vuex, 是 Vue 的另一种状态管理方案
:::

## 一、使用步骤：

- 安装:

```js
yarn add pinia@next
```

- 创建一个 pinia（根存储）并将其传递给应用程序:

```js
import { createPinia } from 'pinia'
app.use(createPinia())
```

- 核心概念与基本使用:
<p>1. Store:</p>

```js
// ============ Store 定义 =============
// store.ts
import { defineStore } from 'pinia'

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useStore = defineStore({
    //  id: 必须的，在所有 Store 中唯一
    id: "myGlobalState",

    // state: 返回对象的函数
    state: () => ({
        counter: 0
    }),
    ......
})
```

```html
<!-- ============ Store 使用 ============= -->
<script lang="ts" setup>
  // 导入 Store， 使用自己的路径
  import { useStore } from '@/store/store'
  import { storeToRefs } from 'pinia'

  // 调用函数 获得Store
  const store = useStore()
  // state解构：storeToRefs
  const { counter } = storeToRefs(store)
</script>
```

<p>2. Getters:</p>

```js
// ============ Getters =============
// Todo
```

<p>3. actions:</p>
作用：修改state / 异步 action <br/>
action 间的相互调用直接用 this 访问即可。

```js
// ============ actions =============
actions: {
    async login(account, pwd) {
          const { data } = await api.login(account, pwd)
          return data
    },
    ......
}
```

- 常用插件:
  数据持久化： pinia-plugin-persist，用于页面刷新后数据依然能保持。

```js
// ============ pinia-plugin-persist =============
// 安装
yarn add pinia-plugin-persist


// 使用
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
const store = createPinia()
store.use(piniaPluginPersist) // 注意这里是store.use，而不是app.use

// 具体代码
actions: {......},
// 开启缓存
persist: {
    enabled: true,
    // 自定义 key
    strategies: [
        {
            key: 'my_user',
            storage: localStorage,
        },
        {
        // 持久化部分 state
            // 默认所有 state 都会进行缓存，你可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。
            // 未指定 key 的话，则直接存到当前store的名下
            storage: localStorage,
            paths: ['name']
        },
        {
            // 未指定 storage，则缓存到 Session Storage里面
            key: 'Counter'
        }
    ]
}
```

## 二、Pinia 源码简析：

![An image](/images/prev/pinia.png)

参考：<br />
<a href="https://pinia.web3doc.top/" target="_blank">官网（中文）</a><br />
<a href="https://pinia.vuejs.org/" target="_blank">官网（英语）</a><br />

相关文章：<br />
<a href="https://segmentfault.com/a/1190000040373313" target="_blank">Pinia 快速入门</a><br />
<a href="https://juejin.cn/post/7031727358369333279" target="_blank">Pinia(皮尼亚)源码分析</a><br />
<a href="https://segmentfault.com/a/1190000041246156" target="_blank">Pinia.js 上手指南</a><br />
<a href="https://juejin.cn/post/7063376847198748702" target="_blank">拥抱 pinia，快速上手，详解指南</a><br />
