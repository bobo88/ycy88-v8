# React 清单 - React Redux

::: warning Redux
Redux 是 JavaScript 应用程序的状态容器，提供可预测的状态管理。Redux 和 React 之间没有关系。Redux 支持 React、Angular、Ember、jQuery 甚至纯 JavaScript。
:::

而下面说的「React Redux」则是 React 官方推出来的基于 Redux 进行封装的开源库。
::: tip React Redux
Redux 的官方 React 绑定， Official React bindings for Redux。<br/>
1、提出了 UI 组件和容器组件的概念<br/>
2、UI 组件负责展示页面和数据，容器组件作为中间桥梁负责连接 UI 组件和 redux 之间的数据传递<br/>
:::

本文将简单介绍「React Redux」的使用方法。

## 一、安装使用 和 持久化

第一步： 安装依赖 并 配置编写 store 相关文件

```js
// 1. 安装依赖：
$ yarn add react-redux
$ yarn add @reduxjs/toolkit
$ yarn add redux-persist    // React-redux持久化

// 2. 创建 Redux 状态（单个）
// 关键词分析：
// 2.1 createSlice: 创建 Redux 状态片，它包含 一个字符串名称来标识切片、一个初始状态值以及一个或多个 reducer 函数来定义如何更新状态。
// 2.1 counterSlice.actions: 导出生成的 Redux action creators
// 2.1 counterSlice.reducer: 整个切片的 reducer 函数
// ====== src/store/counterSlice.js
import { createSlice } from '@reduxjs/toolkit'
export const counterSlice = createSlice({
    name: 'counter',
  initialState: {
      value: 0,
      list: [1, 2, 3]
  },
  reducers: {
    increment: (state) => {
        state.value += 1
    },
    decrement: (state) => {
        state.value -= 1
    },
    incrementByAmount: (state, action) => {
        state.value += action.payload
    },
    addItem: (state, action) => {
      state.list = [...state.list, action.payload]
    }
  },
})
export const { increment, decrement, incrementByAmount, addItem } = counterSlice.actions
export default counterSlice.reducer

// 3. 将单个Redux注入全局桶
// 关键词分析：
// 3.1 configureStore: 使用configureStore方法创建store
// 3.1 combineReducers: 辅助函数，作用是把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数
// 3.1 persistReducer: 使用persistReducer时需要指定persistConfig，这一项就是你需要缓存的数据处理项，它类似黑白名单的处理方式，还需要一个storage的协助
// ====== store/index.js
import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux";
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
// 从 counter slice 中导入 reducer 函数并将其添加到我们的 store 中
import counterReducer from './counterSlice'

const reducers = combineReducers({
  counter: counterReducer,
});
const persistConfig = {
  key: 'root',
  storage           // storage 可以理解成localStorage的功能封装
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
});
export default store;
```

::: warning 注意
现在官方推荐用@reduxjs/toolkit 的 configureStore 方法代替 createStore
:::

第二步：将 store 注入全局组件中

```jsx
// ====== src/index.js             // 入口文件
import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
// React-redux
import { Provider } from 'react-redux'
import store from './store'
// 持久化：本质还是把store存到 local Storage 里面
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

const root = createRoot(document.getElementById('root'))
// 持久化
let persistor = persistStore(store)
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* ... */}
    </PersistGate>
  </Provider>
)
```

第三步：使用 React Redux

```jsx
// ====== src/App.js
import React, { Component } from 'react'
import Button from '@mui/material/Button'

// React Redux 提供了一对自定义的 React 钩子，允许您的 React 组件与 Redux 存储进行交互。
// useSelector从 store 状态读取一个值并订阅更新，同时useDispatch返回 store 的dispatch方法让您调度操作。
import { useSelector, useDispatch } from 'react-redux'
import { increment, addItem } from './store/counterSlice'

function App() {
  const counter = useSelector((state) => state.counter.value)
  const { list } = useSelector((state) => state.counter)
  const dispatch = useDispatch()
  return (
    <div className="App">
      <Button variant="contained" onClick={() => dispatch(increment())}>
        点我累加 - {counter} - （刷新页面也会保存累加值）
      </Button>
      <Button variant="contained" onClick={() => dispatch(addItem(4))}>
        点我push - {list.join(',')}
      </Button>
    </div>
  )
}

export default App
```

## 二、其他

```js
// todo ...
```

DEMO 验证：<br />
<a href="https://ycy88.com/other" target="_blank">DEMO -- Redux Test</a><br />

参考地址：<br/>
<a href="https://www.reduxjs.cn/" target="_blank">Redux 中文网</a><br />
<a href="https://www.redux.org.cn/" target="_blank">Redux 中文文档</a><br />
<a href="https://react-redux.js.org/" target="_blank">React Redux</a><br />
