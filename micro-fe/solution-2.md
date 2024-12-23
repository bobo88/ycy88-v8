# 集成方案-状态管理

> [集成方案-组件通信](/micro-fe/solution-4)。

## 什么是微前端状态管理

微前端状态管理是指在微前端架构下，对主应用和子应用之间以及子应用与子应用之间共享状态的集中管理和同步。其目标是让各个独立子应用在分布式环境中保持数据的一致性和实时性。

## 为什么需要状态管理

在微前端架构中，多个子应用可能需要共享数据，如：

- **用户登录状态**：让主应用和所有子应用共享同一用户信息。
- **全局配置**：如主题切换、语言切换等。
- **操作状态**：如子应用 A 的操作需要通知子应用 B。

使用状态管理可以：

1. 简化数据同步逻辑。
2. 减少应用间耦合。
3. 提高开发效率和维护性。

## 状态管理的常见实现方案

### 1. **Qiankun 全局状态管理**

`Qiankun` 提供了内置的状态管理机制，基于 `initGlobalState` 和 `onGlobalStateChange` 方法实现。

#### 实现方式

**主应用**：

```javascript
import { initGlobalState } from "qiankun";

// 初始化全局状态
const state = {
  userInfo: { name: "张三", role: "admin" },
  theme: "light",
};

const actions = initGlobalState(state);

// 监听全局状态变化
actions.onGlobalStateChange((newState, prevState) => {
  console.log("主应用状态变化:", newState, prevState);
}, true);

// 将 actions 传递给子应用
export default actions;
```

**子应用**：

```javascript
import actions from "./actions"; // 引入主应用传递的 actions

// 监听全局状态变化
if (actions) {
  actions.onGlobalStateChange((newState, prevState) => {
    console.log("子应用状态变化:", newState, prevState);
  }, true);

  // 更新全局状态
  actions.setGlobalState({ theme: "dark" });
}
```

### 2. **事件机制**

通过原生的 `CustomEvent` 和 `addEventListener` 实现事件驱动的状态管理。

#### 实现方式

**主应用**：

```javascript
// 发送事件
window.dispatchEvent(
  new CustomEvent("stateChange", { detail: { theme: "dark" } })
);
```

**子应用**：

```javascript
// 监听事件
window.addEventListener("stateChange", (event) => {
  console.log("子应用接收到状态:", event.detail);
});
```

### 3. **集中式接口请求**

通过一个专门的状态接口集中管理主应用和子应用的共享状态。

#### 实现方式

- 主应用通过接口设置全局状态。
- 子应用通过接口获取或更新状态。

示例：

**主应用**：

```javascript
// 更新状态接口
fetch("/api/state", {
  method: "POST",
  body: JSON.stringify({ theme: "dark" }),
});
```

**子应用**：

```javascript
// 获取状态接口
fetch("/api/state")
  .then((res) => res.json())
  .then((data) => {
    console.log("子应用接收到状态:", data);
  });
```

## 各方案优劣对比

| 方案                     | 优点                             | 缺点                                        |
| ------------------------ | -------------------------------- | ------------------------------------------- |
| **Qiankun 全局状态管理** | 易用，专为微前端设计，轻量高效   | 需要依赖 Qiankun，适用于基于 Qiankun 的项目 |
| **事件机制**             | 简单直接，适合单次数据传递或触发 | 状态不可持久化，事件监听需要自行管理        |
| **集中式接口请求**       | 灵活，支持持久化和复杂状态管理   | 增加接口开发和调用的复杂性                  |

## 实际场景中的最佳实践

1. **优先使用 Qiankun 全局状态管理**

   - 如果项目是基于 Qiankun 的微前端架构，这是最佳选择。

2. **结合事件机制实现补充通信**

   - 对于轻量级、单次触发的场景，可以使用事件机制。

3. **复杂场景使用集中式接口**
   - 当需要支持数据持久化或共享复杂数据时，集中式接口方案更灵活。

## 注意事项

1. **状态命名规范**：全局状态的命名应清晰、可读，避免命名冲突。
2. **状态更新权限**：限制只有特定应用能更新某些全局状态，避免不必要的状态污染。
3. **性能优化**：避免频繁设置或监听全局状态，以减少性能开销。
