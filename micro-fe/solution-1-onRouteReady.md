# 集成方案-路由管理-子应用上报

## 1. **子应用路由上报机制**

### 实现方案：

- **子应用：运行时上报路由**  
  利用 Qiankun 的生命周期钩子，将路由数据动态上报。

  ```javascript
  const routes = [
    { path: "/dashboard", title: "仪表盘" },
    { path: "/list", title: "订单列表" },
  ];

  export async function mount(props) {
    if (props.onRouteReady) {
      props.onRouteReady(routes);
    }
  }
  ```

- **主应用：动态注册路由**  
  主应用在收到路由数据后，动态更新菜单。

  ```javascript
  registerMicroApps([
    {
      name: "vue-order",
      entry: "//localhost:8081",
      container: "#vue-order",
      activeRule: "/vue-order",
      props: {
        onRouteReady: (routes) => {
          menus.push(
            ...routes.map((route) => ({
              path: `/vue-order${route.path}`,
              title: route.title,
            }))
          );
        },
      },
    },
  ]);
  ```

::: danger 多个子应用时，`registerMicroApps` 无法动态加载子应用路由
存在的问题是：我没有访问某个子应用的话，它就完全不加载不激活，那我就无法拿到它的动态路由，也就无法将动态路由渲染到主应用中来。
:::

::: tip 此方式的代码片段

#### 1）主应用：main.ts 文件（部分核心代码）

```js
// 创建一个响应式的 menus
const stateMenu = reactive({
  menus: [],
});
// 默认只加载一次
const isInit = {};
// 在主应用中注册子应用
registerMicroApps(
  [
    {
      name: "userMgt", // 微应用的名称 要求唯一
      entry: "//localhost:8081", // 通俗理解就是（微应用的访问地址）
      container: "#Child-box", // 微应用挂载到主应用上的容器
      activeRule: "/user-mgt", // 微应用激活条件
      props: {
        actions,
        onRouteReady: (routes) => {
          if (!isInit.userMgt) {
            isInit.userMgt = true;
            stateMenu.menus.push(...routes);
          }
        },
      },
    },
    {
      name: "orderMgt", // 微应用的名称 要求唯一
      entry: "//localhost:8082", // 通俗理解就是（微应用的访问地址）
      container: "#Child-box", // 微应用挂载到主应用上的容器
      activeRule: "/order-mgt", // 微应用激活条件
      props: {
        actions,
        onRouteReady: (routes) => {
          if (!isInit.orderMgt) {
            isInit.orderMgt = true;
            stateMenu.menus.push(...routes);
          }
        },
      },
    },
  ],
  {
    beforeLoad: (app) => console.log("before load", app.name),
    beforeMount: [(app) => console.log("before mount", app.name)],
  }
);
```

#### 2）子应用 Order 系统

> src/main.js：主要是将子应用的路由信息传递给主应用。

```js
// 其他（略）
import { routesResult } from "./router/index";

export async function mount(props) {
  if (props.onRouteReady) {
    props.onRouteReady(routesResult);
  }
  render(props);
}

// 其他（略）
```

> src/router/index.js：格式化路由数据信息，并导出

```js
// 其他（略）
import { extractNestedRoutes } from "../utils/tools";

const routes = [
  {
    path: "/",
    name: "Home",
    title: "订单系统",
    alias: "/", // 根路径的别名，指向 /home
    component: () => import("../views/Home.vue"),
    redirect: "/order-mgt",
    children: [
      {
        path: "/order-mgt",
        name: "OrderMgt",
        title: "订单管理",
        component: () => import("@/views/order-mgt/index.vue"),
        redirect: "/order-mgt/order-list", // 默认重定向到 /order-mgt/order-list
        children: [
          {
            path: "order-list",
            name: "OrderList",
            title: "订单列表",
            component: () => import("../views/order-mgt/OrderList.vue"),
          },
        ],
      },
    ],
  },
];

export const routesResult = extractNestedRoutes(routes);
// 其他（略）
```

> src/utils/tools.js：提取嵌套路由数据信息

```js
export const extractNestedRoutes = function (routes, basePath = "") {
  return routes
    .map((route) => {
      // 如果 basePath 是根路径 `/`，那么直接使用子路由的 path，避免出现 `/order-mgt` 这样的路径
      const fullPath = `${basePath === "/" ? "" : basePath}${
        route.path.startsWith("/") ? route.path : `/${route.path}`
      }`.replace(/\/\//g, "/");

      // 初始化当前路由
      const currentRoute = {
        path: fullPath,
        title: route.title || "", // 保留 title
        children: [], // 初始化 children
      };

      // 如果有子路由，递归提取并嵌套
      if (route.children) {
        currentRoute.children = extractNestedRoutes(route.children, fullPath);
      }

      // 如果当前路由没有 title，但有子路由，移除 title
      if (!route.title && currentRoute.children.length > 0) {
        delete currentRoute.title;
      }

      // 删除空的 children 属性
      if (currentRoute.children.length === 0) {
        delete currentRoute.children;
      }

      return currentRoute;
    })
    .filter((route) => route.title || route.children); // 保留有 title 或有子路由的路由
};
```

#### 3）子应用 User 系统

> 与 Order 系统类似，这里不再赘述。唯一的区别就是路由菜单不同。

```js
import { extractNestedRoutes } from "../utils/tools";

const routes = [
  {
    path: "/",
    name: "home",
    alias: "/", // 根路径的别名，指向 /home
    title: "用户系统",
    component: () => import("../views/Home.vue"),
    redirect: "/user-mgt",
    children: [
      {
        path: "/user-mgt",
        name: "UserMgt",
        title: "用户管理",
        component: () => import("@/views/user-mgt/index.vue"),
        redirect: "/user-mgt/user-list", // 默认重定向到 /user-mgt/user-list
        children: [
          {
            path: "user-list",
            name: "UserList",
            title: "用户列表",
            component: () => import("../views/user-mgt/UserList.vue"),
          },
          {
            path: "user-roles",
            name: "UserRoles",
            title: "用户角色",
            component: () => import("../views/user-mgt/UserRoles.vue"),
          },
          {
            path: "user-permissions",
            name: "UserPermissions",
            title: "用户权限",
            component: () => import("../views/user-mgt/UserPermissions.vue"),
          },
        ],
      },
    ],
  },
];

export const routesResult = extractNestedRoutes(routes);
// 其他代码...
```

:::

> 1）默认不显示子路由，只有当路由匹配到时，才显示子路由。

![An image](/images/from-zero/fe/qiankun-route-1.jpg)

> 2）访问 OrderList 时，显示子路由。

![An image](/images/from-zero/fe/qiankun-route-2.jpg)

> 3）访问 UserList 时，显示子路由。

![An image](/images/from-zero/fe/qiankun-route-3.jpg)

## 2. **必须加上【手动加载】功能**

需要手动加载子应用，否则子应用无法显示。

::: tip 提示
`loadMicroApp`里面的配置文件与`registerMicroApps`里面的配置文件一致。
:::

```js
// ========================= Start ========================================
// 直接调用 `loadMicroApp` 加载微应用（不激活）
loadMicroApp({
  name: "userMgt", // 微应用的名称 要求唯一
  entry: "//localhost:8081", // 通俗理解就是（微应用的访问地址）
  container: "#Child-box", // 微应用挂载到主应用上的容器
  activeRule: "/user-mgt", // 微应用激活条件
  props: {
    actions,
    onRouteReady: (routes) => {
      if (!isInit.userMgt) {
        isInit.userMgt = true;
        stateMenu.menus.push(...routes);
      }
    },
  },
});
loadMicroApp({
  name: "orderMgt", // 微应用的名称 要求唯一
  entry: "//localhost:8082", // 通俗理解就是（微应用的访问地址）
  container: "#Child-box", // 微应用挂载到主应用上的容器
  activeRule: "/order-mgt", // 微应用激活条件
  props: {
    actions,
    onRouteReady: (routes) => {
      if (!isInit.orderMgt) {
        isInit.orderMgt = true;
        stateMenu.menus.push(...routes);
      }
    },
  },
});

// 启动 qiankun
start({
  prefetch: "all",
  sandbox: {
    strictStyleIsolation: true, // 启用严格样式隔离
    experimentalStyleIsolation: false, // 启用实验性样式隔离
  },
});
```

**注册、加载两步操作才能默认将所有子应用的动态路由展示出来。**

![An image](/images/from-zero/fe/qiankun-route-4.jpg)

## 3. **微应用挂载到主应用上的容器：需要区分处理**

通过上面的代码，我们可以看到，微应用挂载到主应用上的容器是同一个，即 `#Child-box`。但是，微应用的路由是不同的，所以我们需要区分处理。否则，会存在 **刷新页面一进来，显示空白的情况**。

```js
container: "#Child-box", // 微应用挂载到主应用上的容器
```

::: danger 解决方案
`userMgt`挂载到主应用上的容器是 `#Child-box`，`orderMgt`挂载到主应用上的容器是 `#Child-box-2`。

```js
// 其他代码（略）
registerMicroApps(
  [
    {
      name: "userMgt", // 微应用的名称 要求唯一
      entry: "//localhost:8081", // 通俗理解就是（微应用的访问地址）
      container: "#Child-box", // 微应用挂载到主应用上的容器
      activeRule: "/user-mgt", // 微应用激活条件
    },
    {
      name: "orderMgt", // 微应用的名称 要求唯一
      entry: "//localhost:8082", // 通俗理解就是（微应用的访问地址）
      container: "#Child-box-2", // 微应用挂载到主应用上的容器
      activeRule: "/order-mgt", // 微应用激活条件
    },
  ],
  {
    beforeLoad: (app) => console.log("before load", app.name),
    beforeMount: [(app) => console.log("before mount", app.name)],
  }
);

// ========================= Start ========================================
// 直接调用 `loadMicroApp` 加载微应用（不激活）
loadMicroApp({
  name: "userMgt", // 微应用的名称 要求唯一
  entry: "//localhost:8081", // 通俗理解就是（微应用的访问地址）
  container: "#Child-box", // 微应用挂载到主应用上的容器
  activeRule: "/user-mgt", // 微应用激活条件
  props: {
    actions,
    onRouteReady: (routes) => {
      if (!isInit.userMgt) {
        isInit.userMgt = true;
        stateMenu.menus.push(...routes);
      }
    },
  },
});
loadMicroApp({
  name: "orderMgt", // 微应用的名称 要求唯一
  entry: "//localhost:8082", // 通俗理解就是（微应用的访问地址）
  container: "#Child-box-2", // 微应用挂载到主应用上的容器
  activeRule: "/order-mgt", // 微应用激活条件
  props: {
    actions,
    onRouteReady: (routes) => {
      if (!isInit.orderMgt) {
        isInit.orderMgt = true;
        stateMenu.menus.push(...routes);
      }
    },
  },
});
```

:::

**这样就能保证无论如何刷新哪个子应用的路由页面，均可以正常显示。**

## 4. **子应用的路由刷新时，如何保证主应用的菜单栏被展开和选中？**

```vue
<template>
  <el-menu
    :default-active="activeMenu"
    class="el-menu-vertical-demo"
    @select="handleSelect"
    style="border-right: none !important; background: #f7f7f7 !important"
  >
    <!-- 其他代码（略） -->
  </el-menu>
  <!-- 其他代码（略） -->
</template>

<script setup>
import { useRouter } from "vue-router"; // 引入useRouter钩子
import { computed } from "vue";

const router = useRouter(); // 获取router实例

// 动态设置默认选中的菜单项
const activeMenu = computed(() => router.currentRoute.value.path);

// 其他代码（略）
</script>
```

> 这样，刷新页面，菜单栏的选中状态和展开状态就能正常显示了。

![An image](/images/from-zero/fe/qiankun-route-5.jpg)
