# Qiankun 微前端项目

> [https://qiankun.umijs.org/zh](https://qiankun.umijs.org/zh)

## 1. 项目概述

本项目基于 Qiankun 微前端框架，包含一个主应用和两个子应用。

- 主应用：`micro-main`
- 子应用 1：`vue-order`
- 子应用 2：`vue-user`

通过微前端架构实现了子应用独立开发、独立部署，同时支持全局状态共享及应用间通信。

## 2. 快速启动

### 环境依赖

- Node.js: >= 14.x
- npm 或 yarn

### 克隆项目

```bash
git clone https://github.com/bobo88
cd micro-main
```

### 安装依赖

主应用和子应用均需要分别安装依赖。

#### 主应用 `micro-main`

```bash
cd micro-main
npm install
```

#### 子应用 `vue-order`

```bash
cd vue-order
npm install
```

#### 子应用 `vue-user`

```bash
cd vue-user
npm install
```

### 启动项目

#### 启动主应用

```bash
cd micro-main
npm run serve
```

#### 启动子应用

- 启动 `vue-order`
  ```bash
  cd vue-order
  npm run serve
  ```
- 启动 `vue-user`
  ```bash
  cd vue-user
  npm run serve
  ```

主应用启动后会自动加载子应用。

## 3. 目录结构

### 主应用 `micro-main`

```plaintext
micro-main/
├── src/
│   ├── main.js         # 项目入口文件
│   ├── router/         # 主应用路由
│   ├── store/          # Vuex 状态管理
│   ├── components/     # 主应用组件
│   └── App.vue         # 根组件
└── qiankun/            # Qiankun 配置
    ├── registerApps.js # 子应用注册
    └── globalState.js  # 全局状态管理
```

### 子应用 `vue-order` 和 `vue-user`

```plaintext
vue-order/ 或 vue-user/
├── src/
│   ├── main.js         # 子应用入口文件
│   ├── router/         # 子应用路由
│   ├── store/          # Vuex 状态管理（可选）
│   ├── components/     # 子应用组件
│   └── App.vue         # 根组件
```

## 4. 应用通信

### 全局状态管理

通过 Qiankun 提供的 `initGlobalState` 和 `onGlobalStateChange` 实现全局状态共享。

#### 主应用 `micro-main`

```javascript
// src/qiankun/globalState.js
import { initGlobalState } from "qiankun";

const initialState = {
  userInfo: { name: "张三" },
  theme: "light",
};

const actions = initGlobalState(initialState);

actions.onGlobalStateChange((newState, prevState) => {
  console.log("主应用检测到全局状态变化：", newState, prevState);
});

export default actions;
```

#### 子应用 `vue-order` 或 `vue-user`

```javascript
// src/main.js
import { registerMicroApps, start } from "qiankun";
import actions from "./globalState";

actions.onGlobalStateChange((newState, prevState) => {
  console.log("子应用检测到全局状态变化：", newState, prevState);
});

// 修改全局状态
actions.setGlobalState({
  theme: "dark",
});
```

### 自定义事件通信

通过 `window.dispatchEvent` 和 `window.addEventListener` 进行简单事件通信。

## 5. 样式隔离

在子应用中设置沙箱模式，避免样式污染。

#### 主应用注册子应用时的配置

```javascript
registerMicroApps([
  {
    name: "vue-order",
    entry: "//localhost:8081",
    container: "#sub-container",
    activeRule: "/vue-order",
    props: {
      sandbox: {
        strictStyleIsolation: true,
      },
    },
  },
  {
    name: "vue-user",
    entry: "//localhost:8082",
    container: "#sub-container",
    activeRule: "/vue-user",
  },
]);
```

## 6. 常见问题

### 1. 子应用加载失败

- 检查子应用是否正确启动并可访问。
- 确保 `entry` 配置正确。

### 2. 样式污染问题

- 使用 Qiankun 的 `strictStyleIsolation`。
- 子应用内部使用 `scoped` 样式。
