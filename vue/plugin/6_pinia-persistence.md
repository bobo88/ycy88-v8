# VUE 全家桶之 Pinia 持久化

::: tip 概念
Pinia 是一个用于 Vue 的状态管理库，是 Vue 的另一种状态管理方案，但刷新页面会丢失更新后的状态。<br/>
所以需要一个插件来实现数据持久化 「pinia-plugin-persist」
:::

## 一、使用步骤：

- 安装:

```js
$ yarn add pinia-plugin-persist
```

- 使用:

```js
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

const store = createPinia()
store.use(piniaPluginPersist) // 注意这里是store.use，而不是app.use
```

- 具体代码:

```js
actions:{......},
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

## 源码分析（pinia-plugin-persist/src/index.ts）：

```js
// 开启缓存：
if (options.persist?.enabled) {
}

// 自定义缓存：
options.persist?.strategies

// 备注： strategies  -- PersistStrategy[]
interface PersistStrategy {
  key?: string;
  storage?: Storage;
  paths?: string[];
}

// 1. 指定缓存位置：
// ==== storage属性的值：（localStorage / sessionStorage)
// 2. 指定缓存名称：
// ==== key属性的值
// 3. 指定部分缓存：
// ==== paths属性的值：string[]
```

::: tip 核心原理
利用 「localStorage / sessionStorage」 的 「getItem」 和 「setItem」方法进行数据的缓存
:::

参考：<br />
<a href="https://seb-l.github.io/pinia-plugin-persist/#install" target="_blank">官网</a><br />
