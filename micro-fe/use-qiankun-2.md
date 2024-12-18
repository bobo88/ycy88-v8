# 微前端「qiankun」的实践 2

> 基于 [微前端「qiankun」的实践](/micro-fe/use-qiankun-1) 的基础上，继续完善。

## 一、主应用（基座）

> 将主应用的页面改成 “后台管理系统” 的页面，子应用通过路由来切换页面。

### 1. 修改基座端口为 `8888`，并关闭 `eslint` 检测。

```js
// vue.config.js
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  lintOnSave: false, // 关闭eslint检测
  devServer: {
    port: 8888, // 这里的端口是必须和父应用配置的子应用端口一致
    headers: {
      // 因为qiankun内部请求都是fetch来请求资源，所以子应用必须允许跨域
      "Access-Control-Allow-Origin": "*",
    },
  },
  configureWebpack: {
    output: {
      //资源打包路径
      library: "vueApp",
      libraryTarget: "umd",
    },
  },
});
```

### 2. 修改 main.ts，引入【用户管理中心】子应用

::: warning 提示

> 注意： 这里的子应用名称为【userMgt】，后续子应用的路由配置中，需要和这里保持一致。

:::

```js
// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import ElementPlus from "element-plus"; // 导入 Element Plus
import "element-plus/dist/index.css"; // 导入 Element Plus 样式

import { registerMicroApps, start } from "qiankun";

// 在主应用中注册子应用 -- 用户管理中心
registerMicroApps([
  {
    name: "userMgt", // 微应用的名称 要求唯一
    entry: "//localhost:8081", // 通俗理解就是（微应用的访问地址）
    container: "#UserMgt", // 微应用挂载到主应用上的容器
    activeRule: "/user-mgt", // 微应用激活条件
  },
]);
console.log(start, 888);
// 启动 qiankun
start({
  prefetch: "all",
});

createApp(App)
  .use(router)
  .use(createPinia())
  .use(ElementPlus)
  .mount("#base-app");
```

### 3. 修改 App.vue，添加【用户管理中心】子应用挂载点

```vue
<!-- App.vue -->
<template>
  <el-container style="min-height: 100vh">
    <!-- 左侧导航栏 -->
    <el-aside
      width="220px"
      style="
        background-color: #f7f7f7;
        padding-top: 20px;
        border-right: 1px solid #dcdfe6;
      "
    >
      <!-- LOGO -->
      <!-- 略...... -->

      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical-demo"
        @select="handleSelect"
        style="border-right: none !important; background: #f7f7f7 !important"
      >
        <el-menu-item index="/personal-info">个人信息（基座）</el-menu-item>

        <!-- 子应用A 二级菜单 -->
        <el-sub-menu index="/user-mgt">
          <template #title>
            <span>用户管理（子应用A）</span>
          </template>
          <el-menu-item index="/user-mgt/user-list">用户列表</el-menu-item>
          <el-menu-item index="/user-mgt/user-roles">用户角色</el-menu-item>
          <el-menu-item index="/user-mgt/user-permissions">
            权限管理
          </el-menu-item>
          <el-menu-item index="/user-mgt/operation-log">操作日志</el-menu-item>
          <el-menu-item index="/user-mgt/feedback">在线反馈</el-menu-item>
        </el-sub-menu>

        <!-- 子应用B 二级菜单 -->
        <!-- 其他（略）...... -->
      </el-menu>
    </el-aside>

    <!-- 右侧主体内容 -->
    <el-main style="padding: 20px">
      <!-- 顶部头部 -->
      <!-- 其他略...... -->

      <!-- 主应用（基座）自己本身的路由页面 -->
      <el-section>
        <router-view></router-view>
      </el-section>

      <!-- UserMgt 子应用 -->
      <div id="UserMgt"></div>

      <!-- Other -->
    </el-main>
  </el-container>
</template>

<script setup>
// 其他（略）
</script>

<style lang="scss" scoped>
// 其他（略）
</style>
```

### 4. 主应用本身的路由配置文件

```ts
// route/index.ts
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      alias: "/", // 根路径的别名，指向 /home
      component: () => import("../App.vue"),
      redirect: "/personal-info", // 子路由重定向
      children: [],
    },
    {
      path: "/personal-info",
      name: "personal-info",
      component: () => import("../views/home/PersonalInfo.vue"), // 默认子路由
    },
    // 关于页面
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

// 添加路由守卫
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("token"); // 假设 token 存储在 localStorage

  // 如果目标路由需要登录且用户没有登录
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: "Login" }); // 跳转到登录页面
  } else {
    next(); // 继续正常路由
  }
});

export default router;
```

### 5. 运行效果如下

![An image](/images/from-zero/fe/qiankun-3.jpg)

## 二、子应用

> 修改页面样式。

### 1. 修改 vue.config.js

::: warning 提示

> `library`的名称配置和主应用中保持一致， 均为【userMgt】。

:::

```js
// vue.config.js
const { defineConfig } = require("@vue/cli-service");
const packageName = require("./package.json").name;

module.exports = defineConfig({
  lintOnSave: false,
  devServer: {
    port: 8081,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  configureWebpack: {
    output: {
      library: "userMgt",
      libraryTarget: "umd",
      // jsonpFunction: `webpackJsonp_${packageName}`
      // 注意 webpack 5要用下面的方式
      chunkLoadingGlobal: `webpackJsonp_${packageName}`,
      // sandbox : { experimentalStyleIsolation: true }
    },
  },
});
```

### 2. 修改 App.vue

```vue
<template>
  <div id="nav">
    <!-- 路由配置页面 -->
    <RouterView />
  </div>
</template>

<script setup>
// 其他（略）
</script>

<style lang="scss">
// 其他（略）
</style>
```

### 3. 配置 route/index.js

```js
// route/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/home",
    name: "home",
    alias: "/", // 根路径的别名，指向 /home
    // meta: { requiresAuth: true },
    component: () => import("../views/Home.vue"),
    redirect: "/user-mgt",
    children: [
      {
        path: "/user-mgt",
        name: "UserMgt",
        component: () => import("@/views/user-mgt/index.vue"),
        redirect: "/user-mgt/user-list", // 默认重定向到 /user-mgt/user-list
        children: [
          {
            path: "user-list",
            name: "UserList",
            component: () => import("../views/user-mgt/UserList.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  // base: window.__POWERED_BY_QIANKUN__ ? '/vue/' : '/',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
```

### 4. 运行子应用

```bash
yarn serve
```

![An image](/images/from-zero/fe/qiankun-4.jpg)

## 三、主应用加载子应用

> 点击主应用中的菜单，加载对应的子应用。

![An image](/images/from-zero/fe/qiankun-5.jpg)
