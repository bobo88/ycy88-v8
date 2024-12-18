# 集成方案-组件通信

在 **qiankun** 微前端架构中，应用之间的通信是一个重要的功能点，通信主要包括三种场景：

1. **主应用与子应用之间的通信**
2. **子应用与主应用之间的通信**
3. **子应用与子应用之间的通信**

## **一、主应用与子应用**

### **方式一：通过 props 传参（推荐）**

在 qiankun 中，主应用可以通过 `props` 属性将数据传递给子应用。

**主应用代码示例：**

```javascript
registerMicroApps([
  {
    name: "userMgt",
    entry: "//localhost:8081",
    container: "#UserMgt",
    activeRule: "/user-mgt",
    props: {
      data: "主应用的数据", // 传递的数据
      onGlobalStateChange: (state) => {
        console.log("接收到子应用变化的全局状态", state);
      },
    },
  },
]);
start();
```

**子应用代码示例：**
子应用通过接收 `props` 获取传递过来的数据。

#### VUE2 写法

```javascript
export default {
  mounted() {
    console.log("收到的主应用数据：", this.$props.data);
  },
};
```

#### VUE3 写法

> 通过 provide 提供 props 给子应用的组件（全局注入的方式）。

```js
// main.js文件
import "./public-path";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus"; // 导入 Element Plus
import "element-plus/dist/index.css"; // 导入 Element Plus 样式

// 定义一个全局变量存储 props
let instance = null;

function render(props = {}) {
  const { container } = props;
  instance = createApp(App);
  // 通过 provide 提供 props 给子应用的组件
  instance.provide("globalProps", props);

  instance
    .use(ElementPlus) // 使用 Element Plus
    .use(router)
    .mount(container ? container.querySelector("#app") : "#app"); // 为了避免根id#app与其他DOM冲突，需要限制查找范围
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log("react app bootstraped");
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  console.log("乾坤子应用容器加载完成，开始渲染 child");
  console.log("props from main mount", props);
  render(props);
}

export async function unmount() {}

export async function update(props) {
  console.log("update props", props);
}
// 其他（略）
```

> 通过 inject 来获取 props。

```js
// App.vue文件
import { inject, onMounted } from "vue";

const globalProps = inject("globalProps");
console.log("🚀 ~ onMounted ~ globalProps:", globalProps);

onMounted(() => {
  console.log("user app mounted");
});
```

![An image](/images/from-zero/fe/qiankun-msg.jpg)

### **方式二：通过 qiankun 的全局状态管理（推荐）**

::: tip 提示

1. 主要方法：`initGlobalState` 和 `onGlobalStateChange`、`setGlobalState`、`offGlobalStateChange`。
2. `actions` 可以传递给主应用和子应用。

```js
// === File：主应用的main.js
import { createApp } from "vue";
import App from "./App.vue";
// 定义主应用的全局状态
const state = {
  userInfo: { name: "张三" },
  theme: "light",
};
// 初始化全局状态
const actions = initGlobalState(state);
// 注意：这里的actions可以传递给主应用和子应用。
// TIP：下面这一行代码是将actions传递给 【"主应用"】。
createApp(App, { actions });
```

3. 如果传递给子应用：

```js
// === File：主应用的main.js
registerMicroApps([
  {
    name: "userMgt", // 微应用的名称 要求唯一
    entry: "//localhost:8081", // 通俗理解就是（微应用的访问地址）
    container: "#Child-box", // 微应用挂载到主应用上的容器
    activeRule: "/user-mgt", // 微应用激活条件
    props: {
      data: "我是从主应用传递过来的数据",
      msg: "From main MSG.",
      // TIP：下面这一行代码是将actions传递给 【"子应用"】。
      actions,
    },
  },
  // 其他（略）
]);
```

```js
// === File：子应用的main.js
// 注意：这里主要是接收主应用传递过来的actions。

// 定义一个全局变量存储 props
let instance = null;

function render(props = {}) {
  const { container, data, msg } = props;
  // 注意：这里的data, msg, actions是主应用传递过来的，需要逐个接收。
  // 而不能直接 `...props` 处理，否则会报错。
  // xxxx: 122 属于自定义的数据，可以传递给子应用（在子应用中属于全局性的数据）。
  instance = createApp(App, { xxxx: 122, data, msg, actions: props.actions });

  instance
    .use(ElementPlus)
    .use(router)
    .mount(container ? container.querySelector("#app") : "#app", props);
}
```

```js
// === File：子应用的App.vue
import { defineProps, reactive, onMounted } from "vue";
// 使用 defineProps 获取传递的 actions
const props = defineProps({
  actions: Object, // 获取主应用传递的 actions
  xxxx: Number,
  data: String,
  msg: String,
});

const newStateObj = reactive({
  val: null,
});

onMounted(() => {
  // 获取当前全局状态
  const actions = props.actions; // 从 props 中获取 actions
  // 确保 actions 存在后再进行操作
  if (actions) {
    // 监听全局状态变化
    actions.onGlobalStateChange((newState, prevState) => {
      newStateObj.val = {
        abc: "abc",
        ...newState,
      };
    }, true);
    // 设置全局状态
    actions.setGlobalState({
      userInfo: { name: "李四" },
      theme: "dark",
    });
  } else {
    console.error("actions is undefined");
  }
});
```

![An image](/images/from-zero/fe/qiankun-msg-4.jpg)

:::

::: danger 注意
`onGlobalStateChange`这个方法它会全局覆盖。也就是说你如果在 **应用中（包括主应用、子应用）** 中多次调用这个方法，那么最后一次调用的回调函数会覆盖之前所有的回调函数。

> 你看上面的截图，就是我在子应用中使用了`onGlobalStateChange`。而主应用中的`onGlobalStateChange`就不生效了（就是退出登录 location: main 那个区域的数据显示），数据还是 “张三”。

如果我把子应用中的`onGlobalStateChange`注释掉，那么主应用中的`onGlobalStateChange`就能生效了。

![An image](/images/from-zero/fe/qiankun-msg-5.jpg)

> **在 `qiankun` 中，`onGlobalStateChange` 是对全局状态变化的监听器。默认情况下，每次调用 `onGlobalStateChange` 会覆盖先前的监听器。这是因为 `qiankun` 的全局状态管理是单一实例模式，如果在多个地方重复注册 `onGlobalStateChange`，后注册的监听会覆盖之前的。**

:::

qiankun 提供了 **`initGlobalState`** 和 **`onGlobalStateChange`** 用于应用间共享全局状态。

**主应用代码：**

```javascript
import { initGlobalState } from "qiankun";

const state = {
  user: "主应用用户",
};

const actions = initGlobalState(state);

// 监听全局状态变化
actions.onGlobalStateChange((newState, prev) => {
  console.log("主应用监听到的变化：", newState, prev);
});

// 修改全局状态
actions.setGlobalState({ user: "主应用新用户" });
```

**子应用代码：**

```javascript
import { initGlobalState, MicroAppStateActions } from "qiankun";

let actions;

export function registerGlobalState() {
  actions = initGlobalState({});

  // 监听全局状态
  actions.onGlobalStateChange((state, prev) => {
    console.log("子应用监听到的全局状态变化", state);
  });

  // 修改全局状态
  actions.setGlobalState({ user: "子应用用户" });
}

registerGlobalState();
```

### **方式三：通过自定义事件（Event Bus）**

- 使用原生的 **`window.dispatchEvent`** 和 **`window.addEventListener`**。
  - 或者使用 **`postMessage`** 和 **`window.addEventListener`**。
- 适用于简单的跨应用事件通信。

**主应用发送事件：**

```javascript
// 1. window.dispatchEvent
window.dispatchEvent(
  new CustomEvent("main-to-sub", { detail: "来自主应用的消息" })
);

// 2. postMessage
// 主应用发送消息
window.postMessage(
  { type: "main-to-sub2", payload: { token: "ycy88-token" } },
  "*"
);
```

**子应用监听事件：**

```javascript
// 1. window.dispatchEvent
window.addEventListener("main-to-sub", (event) => {
  console.log("子应用接收到消息：", event.detail);
});

// 2. postMessage
// 子应用监听事件
const postMsg = ref("");
window.addEventListener("message", (event) => {
  if (event.data && event.data.type === "main-to-sub2") {
    console.log(
      "主应用通过postMessage方式（main-to-sub2）传来的数据:",
      event.data.payload
    );
    postMsg.value = event.data.payload;
  }
});
// 其他（略）
```

::: danger 注意

> 这里是有点小问题的，我们实践时发现，子应用在加载时，主应用发送的消息，子应用接收不到，需要延迟发送消息，确保子应用已经挂载。所以解决方案是，**给主应用的消息发送加上延迟，确保子应用已经挂载**。

:::

所以，主应用中的代码应该改成如下：

```javascript
// 在主应用中确保子应用已经挂载
// 1. window.dispatchEvent
setTimeout(() => {
  window.dispatchEvent(
    new CustomEvent("main-to-sub", { detail: "来自主应用的消息" })
  );
}, 1000); // 延迟发送消息，确保子应用已经挂载

// 2. postMessage
// 主应用发送消息
setTimeout(() => {
  window.postMessage(
    { type: "main-to-sub2", payload: { token: "ycy88-token" } },
    "*"
  );
}, 1000); // 延迟发送消息，确保子应用已经挂载
```

可以正常捕获到消息：

![An image](/images/from-zero/fe/qiankun-msg-3.jpg)

### **方式四：通过直接将数据挂载到 window**

> 主应用可以直接挂载数据到 window 对象上，子应用直接访问全局变量。

```javascript
window.__INITIAL_DATA__ = {
  token: "123456",
  theme: "dark",
};
```

#### **子应用获取数据：**

子应用可以直接访问全局变量：

```javascript
console.log("主应用传来的数据:", window.__INITIAL_DATA__);
```

![An image](/images/from-zero/fe/qiankun-msg-2.jpg)

::: warning ⚠️ **注意**：

- `window` 可能被沙箱隔离，请确保沙箱配置允许子应用访问 `window`，比如关闭严格沙箱模式。
- 此方法适用于不受严格隔离的微前端场景。

:::

### **方式五：使用浏览器本地存储**

> 主应用和子应用可以通过 `localStorage`、`sessionStorage` 等浏览器存储来共享数据。

代码比较简单，不赘述。

::: warning ⚠️ **注意**：

- 使用本地存储时，确保同源策略一致，否则数据无法共享。
- 这是一种简单但不实时的通信方式。

:::

## **二、子应用与主应用**

子应用可以通过以下几种方式向主应用通信：

### **方式一：通过 `props` 回调函数**

主应用在 `props` 中传入回调函数，子应用调用回调将数据返回给主应用。

**主应用代码：**

```javascript
registerMicroApps([
  {
    name: "userMgt",
    entry: "//localhost:8081",
    container: "#UserMgt",
    activeRule: "/user-mgt",
    props: {
      onMessage: (msg) => {
        console.log("接收到子应用的消息：", msg);
      },
    },
  },
]);
```

**子应用代码：**

```javascript
export default {
  mounted() {
    this.$props.onMessage("子应用发送的消息");
  },
};
```

### **方式二：通过全局状态管理（`actions`）**

同样使用 **`setGlobalState`** 和 **`onGlobalStateChange`**。

**子应用修改全局状态：**

```javascript
actions.setGlobalState({ user: "子应用发送的用户信息" });
```

主应用监听变化，接收状态：

```javascript
actions.onGlobalStateChange((state, prev) => {
  console.log("主应用监听到状态变化：", state);
});
```

### **方式三：通过自定义事件（Event Bus）**

子应用向主应用发送消息。

**子应用代码：**

```javascript
window.dispatchEvent(
  new CustomEvent("sub-to-main", { detail: "子应用的数据" })
);
```

**主应用代码：**

```javascript
window.addEventListener("sub-to-main", (event) => {
  console.log("主应用接收到子应用数据：", event.detail);
});
```

## **三、子应用与子应用**

子应用之间的通信一般需要借助 **主应用** 作为桥梁，具体方式包括：

### **方式一：全局状态管理（`actions`）**

- 子应用 A 修改全局状态，子应用 B 监听全局状态变化。

**子应用 A 修改全局状态：**

```javascript
actions.setGlobalState({ message: "来自子应用 A 的消息" });
```

**子应用 B 监听全局状态变化：**

```javascript
actions.onGlobalStateChange((state) => {
  console.log("子应用 B 接收到的消息：", state.message);
});
```

### **方式二：自定义事件（Event Bus）**

- 子应用 A 发送自定义事件，子应用 B 监听自定义事件。
- 需要确保主应用能够在不同子应用之间注册监听器。

**子应用 A：**

```javascript
window.dispatchEvent(
  new CustomEvent("sub-a-to-sub-b", { detail: "消息来自子应用 A" })
);
```

**子应用 B：**

```javascript
window.addEventListener("sub-a-to-sub-b", (event) => {
  console.log("子应用 B 收到消息：", event.detail);
});
```

### **方式三：主应用转发消息**

主应用可以作为中间桥梁，监听子应用 A 的消息，然后将消息传递给子应用 B。

**主应用代码：**

```javascript
window.addEventListener("sub-a-to-main", (event) => {
  console.log("主应用接收到子应用 A 的消息：", event.detail);

  // 转发消息给子应用 B
  window.dispatchEvent(
    new CustomEvent("main-to-sub-b", { detail: event.detail })
  );
});
```

**子应用 A 发送消息：**

```javascript
window.dispatchEvent(
  new CustomEvent("sub-a-to-main", { detail: "子应用 A 的数据" })
);
```

**子应用 B 监听消息：**

```javascript
window.addEventListener("main-to-sub-b", (event) => {
  console.log("子应用 B 接收到的消息：", event.detail);
});
```

## **四、总结**

- **主应用与子应用** 通信：可以通过 `props`、全局状态管理、或自定义事件等方式。
- **子应用与主应用** 通信：通过回调函数、全局状态管理或自定义事件。
- **子应用与子应用** 通信：通常通过主应用中间桥梁，或使用全局状态管理共享数据。

推荐使用 **qiankun 提供的全局状态管理** 和 `props` 方式进行通信，这样更规范和易维护。
