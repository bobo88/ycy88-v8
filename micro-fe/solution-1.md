# 集成方案-路由管理

::: tip 方案总结

- 1. **主应用控制（完全中心化）**
  - **管理者**：主应用。
  - **责任**：主应用独占路由管理。
  - **适用场景**：统一权限管控、简单稳定的业务场景。
  - **关键边界**：子应用路由仅消费。
- 2. **子应用上报（完全去中心化）**
  - **管理者**：子应用。
  - **责任**：子应用上报路由，主应用负责渲染分发。
  - **适用场景**：子应用独立性强，团队开发独立。
  - **关键边界**：主应用不主动管理路由。
- 3. **集中化管理（动态路由配置）**
  - **管理者**：后端服务。
  - **责任**：路由配置通过接口获取，主、子应用动态加载。
  - **适用场景**：复杂业务需求、路由频繁变动。
  - **关键边界**：主应用和子应用同时依赖接口返回的动态数据。

:::

业界最佳实践通常会根据项目规模、团队协作模式、技术栈和性能需求选择适合的路由管理方案。以下是几个较为常见的 **微前端路由管理最佳实践**，可根据实际情况选择：

## 1. **中心化路由管理**

**概念**：  
主应用作为路由的中心管理者，统一维护所有子应用的路由信息，子应用不主动维护自己的菜单数据。  
**适用场景**：  
适用于大型项目，要求路由和权限统一管理的情况。

### 实现方案：

- **主应用：维护所有路由菜单**
  主应用将子应用路由注册在一个统一的配置文件中，动态分发到对应的子应用。

  ```javascript
  // 主应用中统一配置子应用路由
  const routes = [
    {
      path: "/vue-order",
      name: "vue-order",
      title: "订单系统",
      children: [
        { path: "/vue-order/dashboard", name: "Dashboard", title: "订单概览" },
        { path: "/vue-order/list", name: "OrderList", title: "订单列表" },
      ],
    },
    {
      path: "/vue-user",
      name: "vue-user",
      title: "用户系统",
      children: [
        { path: "/vue-user/profile", name: "Profile", title: "用户资料" },
        { path: "/vue-user/settings", name: "Settings", title: "用户设置" },
      ],
    },
  ];

  export default routes;
  ```

- **主应用：根据路由动态加载子应用**
  在主应用中，根据当前的路由分发到对应的子应用。

  ```javascript
  const menus = routes.map((app) => ({
    path: app.path,
    title: app.title,
  }));
  // 渲染菜单等...
  ```

**优点**：

- 路由集中管理，方便权限控制。
- 可统一构建导航和面包屑，减少重复开发。

**缺点**：

- 子应用完全依赖主应用，不够独立。

## 2. **去中心化路由管理**

**概念**：  
每个子应用维护自己的路由，主应用只负责加载子应用，路由的具体配置和导航交由子应用管理。  
**适用场景**：  
子应用具有强独立性，团队间开发协作相对独立。

### 实现方案：

- **子应用：暴露路由菜单**  
  子应用通过暴露的接口提供自己的路由配置。

  ```javascript
  export const routes = [
    { path: "/dashboard", title: "仪表盘" },
    { path: "/list", title: "订单列表" },
  ];
  ```

- **主应用：动态获取子应用路由菜单**  
  主应用调用子应用暴露的接口，将其注册到主应用的菜单中。

  ```javascript
  const appRoutes = await fetchChildRoutes("vue-order");
  const menus = appRoutes.map((route) => ({
    path: `/vue-order${route.path}`,
    title: route.title,
  }));
  ```

**优点**：

- 子应用独立维护路由，灵活性更高。
- 子应用间无直接依赖，容易复用。

**缺点**：

- 主应用需要动态处理路由注册，增加一定复杂度。

## 3. **子应用路由上报机制**

**概念**：  
子应用在运行时上报路由信息，主应用接收到后，动态渲染菜单或分发到其他子应用。  
**适用场景**：  
子应用数量较多，路由可能动态变化的场景。

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

**优点**：

- 子应用维护路由，主应用自动接收，减少硬编码。
- 支持动态扩展子应用。

**缺点**：

- 路由上报依赖 Qiankun 生命周期，增加一定复杂性。

## 4. **路由远程配置服务**

**概念**：  
将路由配置存储在远程服务中，主应用和子应用通过 API 动态获取路由数据。  
**适用场景**：  
路由需要动态变更，或者系统复杂性较高的场景。

### 实现方案：

- **后端：维护统一的路由服务**
  路由数据存储在远程服务中，例如数据库或 API。

  ```json
  [
    { "path": "/vue-order/dashboard", "title": "订单概览" },
    { "path": "/vue-user/profile", "title": "用户资料" }
  ]
  ```

- **主应用：动态请求路由数据**
  主应用通过 API 获取路由数据并动态注册。

  ```javascript
  const response = await fetch("/api/routes");
  const routes = await response.json();

  routes.forEach((route) => {
    appRouter.addRoute(route.path, route.component);
  });
  ```

**优点**：

- 路由动态可控，支持后端统一变更。
- 跨团队协作更加灵活。

**缺点**：

- 增加了对后端的依赖。

## 业界推荐选择

1. **中大型企业**：
   - 推荐 **中心化管理方案** 或 **路由远程配置服务**，实现统一管理和权限控制。
2. **独立开发团队**：
   - 推荐 **去中心化管理方案** 或 **子应用路由上报机制**，增强开发独立性和灵活性。
3. **动态业务需求**：
   - 推荐 **路由远程配置服务**，确保路由变更灵活、动态。

选择时需根据业务场景权衡系统复杂性与团队需求。
