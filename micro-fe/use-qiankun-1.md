# 微前端「qiankun」的实践

::: tip qiankun
一种比较完善的微前端解决方案，使用简单，兼容任意 JS 框架。

功能完备，几乎包含所有构建微前端系统时所需要的基本能力，如 样式隔离、js 沙箱、预加载等。
:::
qiankun 是一个基于 single-spa 的微前端实现库，旨在帮助大家能更简单、无痛的构建一个生产可用微前端架构系统。

## 一、安装

```js
$ yarn add qiankun  // or npm i qiankun -S
```

## 二、使用

### 主应用

在主应用中注册微应用：

```js
import { registerMicroApps, start } from "qiankun";

registerMicroApps([
  {
    name: "react app", // app name registered
    entry: "//localhost:7100",
    container: "#yourContainer",
    activeRule: "/yourActiveRule",
  },
  {
    name: "vue app",
    entry: { scripts: ["//localhost:7100/main.js"] },
    container: "#yourContainer2",
    activeRule: "/yourActiveRule2",
  },
]);

start();
```

当微应用信息注册完之后，一旦浏览器的 url 发生变化，便会自动触发 qiankun 的匹配逻辑，所有 activeRule 规则匹配上的微应用就会被插入到指定的 container 中，同时依次调用微应用暴露出的生命周期钩子。

如果微应用不是直接跟路由关联的时候，你也可以选择手动加载微应用的方式：

```js
import { loadMicroApp } from "qiankun";

loadMicroApp({
  name: "app",
  entry: "//localhost:7100",
  container: "#yourContainer",
});
```

### 微应用

微应用不需要额外安装任何其他依赖即可接入 qiankun 主应用。

```js
// 1. 导出相应的生命周期钩子
// 微应用需要在自己的入口 js (通常就是你配置的 webpack 的 entry js) 导出 bootstrap、mount、unmount 三个生命周期钩子，以供主应用在适当的时机调用。
/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log("react app bootstraped");
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  ReactDOM.render(
    <App />,
    props.container
      ? props.container.querySelector("#root")
      : document.getElementById("root")
  );
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props) {
  ReactDOM.unmountComponentAtNode(
    props.container
      ? props.container.querySelector("#root")
      : document.getElementById("root")
  );
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log("update props", props);
}

// 2. 配置微应用的打包工具
// 除了代码中暴露出相应的生命周期钩子之外，为了让主应用能正确识别微应用暴露出来的一些信息，微应用的打包工具需要增加如下配置：
// webpack
const packageName = require("./package.json").name;

module.exports = {
  output: {
    library: `${packageName}-[name]`,
    libraryTarget: "umd",
    jsonpFunction: `webpackJsonp_${packageName}`,
  },
};
```

## 三、项目实践

### 步骤一：首先，新建 qiankun-project 文件夹目录

### 步骤二：初始化「基座项目」并配置

- 2.1 在 qiankun-project 目录下，运行下面命令

```js
$ vue create micro-main         // 生成一个 基座项目（VUE 3.x版本）
```

- 2.2 配置「基座项目」：

```js
// 基座配置 1: micro-main/vue.config.js
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  lintOnSave: false, // 关闭eslint检测
  devServer: {
    port: 8080, // 这里的端口是必须和父应用配置的子应用端口一致
    headers: {
      // 因为qiankun内部请求都是fetch来请求资源，所以子应用必须允许跨域
      "Access-Control-Allow-Origin": "*",
    },
  },
  configureWebpack: {
    output: {
      // 资源打包路径
      library: "vueApp",
      libraryTarget: "umd",
    },
  },
});
```

```js
// 基座配置 2: micro-main/src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { registerMicroApps, start } from "qiankun";

// 在主应用中注册子应用
registerMicroApps([
  {
    name: "vueApp", // 微应用的名称 要求唯一。有多个地方需要使用到它
    entry: "//localhost:8081", // 通俗理解就是（微应用的访问地址）
    container: "#vue", // 微应用挂载到主应用上的容器
    activeRule: "/vue", // 微应用激活条件
  },
]);
// 启动 qiankun
start();

createApp(App).use(router).mount("#base-app"); // 注意：这里的ID名称 app 改为 base-app
```

```html
<!-- 基座配置 3: 修改 micro-main/public/index.html -->

<!-- 将 -->
<div id="app"></div>
<!-- 调整为 -->
<div id="base-app"></div>
```

```xml
<!-- 基座配置 4: micro-main/src/App.vue -->
<template>
  <div>
    <h3>VUE 子应用</h3>
    <!-- 与 基座配置 2 中的「 container: '#vue', 」 保持一致 -->
    <div id="vue" />

    <h3>其他页面</h3>
    <!-- todo -->
  </div>
</template>
```

<!-- ```js
// 基座配置 5: micro-main/src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import type {RouterOptions} from 'vue-router'
import Home from "../views/Home.vue";
type CustomRouterOptions = RouterOptions & {base: string}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  base: '',
  history: createWebHistory(process.env.BASE_URL),
  routes,
} as CustomRouterOptions);

export default router;
``` -->

### 步骤三：初始化「子应用项目」并配置

- 3.1 在 qiankun-project 目录下，运行下面命令

```js
$ vue create micro-vue         // 生成一个 子应用项目（VUE 3.x版本）
```

- 3.2 配置「子应用项目」：

```js
// 子应用项目配置 1: micro-vue/vue.config.js
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
      library: "vueApp", // 基座配置 2 中的 「 name: 'vueApp', 」
      libraryTarget: "umd",
      // jsonpFunction: `webpackJsonp_${packageName}`
      // 注意 webpack 5要用下面的方式
      chunkLoadingGlobal: `webpackJsonp_${packageName}`,
    },
  },
});
```

```js
// 子应用项目配置 2: 新建 micro-vue/src/public-path.js 文件
if (window.__POWERED_BY_QIANKUN__) {
  // + 后面的内容是有配置 publicPath 的时候需要使用，没有配置可以不用写
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ + "vue/";
}
```

```js
// 子应用项目配置 3: micro-vue/src/main.js
import "./public-path";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

function render(props = {}) {
  const { container } = props;
  createApp(App)
    .use(router)
    .mount(container ? container.querySelector("#app") : "#app"); // 为了避免根id#app与其他DOM冲突，需要限制查找范围
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log("react app bootstraped");
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  console.log("props from main mount", props);
  render(props);
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log("update props", props);
}
```

```xml
<!-- 子应用项目配置 4: 修改 micro-vue/src/App.vue -->
<template>
  <div id="nav">
  我来自子应用
  </div>
</template>
```

![An image](/images/tools/qiankun_demo.png)

## 四、DEMO 验证

```js
// 1、样式隔离
// 2、JS沙箱
// 3、预加载
// 4、跨域问题
// 5、应用间通信
```

### 1、样式隔离

解决方案： 「 postcss-selector-namesapce 」 设置别名 （或者 postcss-prefix-selector 插件）

```jsx
// 1. 安装 postcss-selector-namespace
$ npm i postcss-selector-namespace -D
// OR
$ yarn add postcss-selector-namespace -D

// 2. 使用 （在子应用项目 里面新建 postcss.config.js， 在项目根目录下）
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-selector-namespace': {
      namespace(css) {
        return '.vueApp-space'
      }
    }
  }
}

// 3. 在 micro-vue/index.html 里面新增「配置的别名 .vueApp-space」
<div id="app" class="vueApp-space"></div>

// 4. 过滤掉不想被添加「别名前缀」的样式文件可以按照下面的方法进行配置
module.exports = {
  plugins: {
    'postcss-selector-namespace': {
      namespace(css) {
          if (
            // 不想被添加「别名前缀」 的样式文件，可以在这里过滤掉
            css.includes('demo.scss')
          ) {
            return ''
          }
          return '.vueapp-space'
      }
    }
  }
}

// 备注：或者使用qiankun自带的样式沙箱隔离方案。
// 在「基座项目」配置中调整为以下代码
start({ sandbox : { experimentalStyleIsolation: true } });
// strictStyleIsolation: true       // 严格沙箱
// experimentalStyleIsolation: true // 实验性沙箱
// 缺点：子应用的弹窗、抽屉、popover因插入到了「基座应用」的body，所以导致样式丢失或应用了「基座应用」的样式
```

```css
/* 使用qiankun自带的样式沙箱隔离方案会生成如下代码 */
div[data-qiankun="vueApp"] .common-blue {
  color: green;
}
```

![An image](/images/tools/qiankun_demo2.png)
::: warning 注意：样式丢失问题
子应用的弹窗、抽屉、popover 因插入到了「基座应用」的 body 导致样式丢失或应用了「基座应用」的样式。

处理的思路可以从两个点思考：

1. 样式内置：行内样式（也称内联样式），或者组件中插入「style」内部样式
2. 增加别名前缀：给子应用的弹窗等的最外层 DIV 增加一个「别名前缀」，和「postcss-selector-namespace」中的配置保持一致
   :::

::: details 样式内置（相关代码）

```vue
<template>
  <div id="nav">
    我来自子应用
    <p class="common-blue">子应用 use common-blue 的标签</p>
    <p class="common-yellow">子应用 Modify common-yellow 的标签</p>

    <button v-if="mainBox" @click="showTc">点击我显示弹窗</button>
  </div>
</template>

<script setup>
const mainBox = document.getElementById("base-app");
const showTc = () => {
  let popUpBox = document.createElement("div");
  let htmlCont = `
      <style>
        .pop-up {
          width: 100%;
          height: 100%;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 99;
          color: #fff;
          text-align: center;
          background: rgba(0, 0, 0, 0.85);
        }
        .pop-up-cont {
          position: absolute;
          width: 200px;
          height: 200px;
          margin: auto;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 1px solid #fff;
          border-radius: 10px;
        }
        .pop-up-tit {
          color: #f00;
        }
        .pop-up-desc {
          color: grey;
        }
      </style>
      <div class="pop-up" id="pop-up-box">
        <div class="pop-up-cont">
          <h3 class="pop-up-tit">我是自定义弹窗</h3>
          <p class="pop-up-desc">一些奇奇怪怪的描述</p>
        </div>
      </div>
    `;
  popUpBox.innerHTML = htmlCont;
  mainBox.appendChild(popUpBox);
};
</script>
```

:::

::: details 增加别名前缀（相关代码）

```vue
<template>
  <div id="nav">
    我来自子应用
    <p class="common-blue">子应用 use common-blue 的标签</p>
    <p class="common-yellow">子应用 Modify common-yellow 的标签</p>

    <button v-if="mainBox" @click="showTc" style="margin-right:20px;">
      点击我显示弹窗（样式内置）
    </button>
    <button v-if="mainBox" @click="showTc2">点击我显示弹窗（添加前缀）</button>
  </div>
</template>

<script setup>
const mainBox = document.getElementById("base-app");
const showTc = () => {
  // ...
};
const showTc2 = () => {
  let popUpBox = document.createElement("div");
  let htmlCont = `
      <div class="pop-up" id="pop-up-box">
        <div class="pop-up-cont">
          <h3 class="pop-up-tit">我是自定义弹窗</h3>
          <p class="pop-up-desc">一些奇奇怪怪的描述</p>
        </div>
      </div>
    `;
  // 增加别名前缀
  popUpBox.setAttribute("class", "vueapp-space");
  popUpBox.innerHTML = htmlCont;
  mainBox.appendChild(popUpBox);
};
</script>
```

<p>配置 vueapp.scss:</p>

```scss
.pop-up {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  color: #fff;
  text-align: center;
  background: rgba(0, 0, 0, 0.85);
  .pop-up-cont {
    position: absolute;
    width: 200px;
    height: 200px;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid #fff;
    border-radius: 10px;
  }
  .pop-up-tit {
    color: #f00;
  }
  .pop-up-desc {
    color: grey;
  }
}
```

:::

![An image](/images/tools/qiankun_demo3.png)

### 2、JS 沙箱

TODO...

```js
legacySandBox; // 基于 Proxy API 来实现
proxySandBox; // 基于 Proxy API 来实现
snapshotSandBox; // 不支持 Proxy API 的低版本浏览器中，会降级为 snapshotSandBox
```

### 3、预加载

```js
/**
 * prefetch - boolean | 'all' | string[] | (( apps: RegistrableApp[] ) => { criticalAppNames: string[]; minorAppsName: string[] }) - 可选，是否开启预加载，默认为 true。
 * 配置为 true 则会在第一个微应用 mount 完成后开始预加载其他微应用的静态资源
 * 配置为 'all' 则主应用 start 后即开始预加载所有微应用静态资源
 * 配置为 string[] 则会在第一个微应用 mounted 后开始加载数组内的微应用资源
 * 配置为 function 则可完全自定义应用的资源加载时机 (首屏应用及次屏应用)
 */

start({
  prefetch: "all",
});
```

### 4、跨域问题

由于 qiankun 是通过 fetch 去获取子应用注册时配置的静态资源 url，所有静态资源必须是支持跨域的，那就得设置允许源。

- Access-Control-Allow-Origin：跨域在服务端是不允许的。只能通过给 Nginx 配置 Access-Control-Allow-Origin \*后，才能使服务器能接受所有的请求源（Origin）。
- Access-Control-Allow-Headers: 设置支持的 Content-Type

### 5、应用间通信

qiankun 通过发布订阅模式来实现应用间通信，状态由框架来统一维护，每个应用在初始化时由框架生成一套通信方法，应用通过这些方法来更改全局状态和注册回调函数，全局状态发生改变时触发各个应用注册的回调函数执行，将新旧状态传递到所有应用。

initGlobalState

TODO...

### 6、打包部署

```js
// 打包部署基本上是和 Nginx 配置相关
```

DEMO 效果查看：<br/>
<a href="http://demo.ycy88.com/" target="_blank">「qiankun」DEMO - 基座</a><br />
<a href="http://demo.ycy88.com/micro-vue" target="_blank">「qiankun」DEMO - 加载子应用项目</a><br />

::: tip qiankun 与 single-spa 区别
乾坤基于 single-spa，加强了微应用集成能力，却抛弃了微模块的能力。所以，它们的区别就是微服务的粒度，乾坤的所能服务的粒度是应用级别，而 single-spa 则是模块级别。它们都能将前端进行拆分，只是拆分的粒度不同罢了。

微应用加载器：“微”的粒度是应用，也就是 HTML，它只能做到应用级别的分享 <br/>
微模块加载器：“微”的粒度是模块，也就是 JS 模块，它能做到模块级别的分享
:::

DEMO 源码：<a href="https://github.com/bobo88/project-basis/tree/main/qiankun-basis" target="_blank">「qiankun」DEMO 源码</a><br />

---

- [「qiankun」 from 阿里](https://qiankun.umijs.org/zh)
- [基于 qiankun 的微前端最佳实践 -（同时加载多个微应用）](https://tehub.com/a/8xrFr58LyQ)
- [Vue+微前端(QianKun)落地实施和最后部署上线总结](https://juejin.cn/post/6973156414210441247)
- [前端微应用框架(qiankun)调研](https://www.cnblogs.com/weichen913/p/17677981.html)
- [基于 qiankun 的微前端最佳实践（万字长文） - 从 0 到 1 篇](https://juejin.cn/post/6844904158085021704)
