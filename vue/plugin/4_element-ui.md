# VUE 全家桶之 ElementUI

::: tip 概念
Element，一套为开发者、设计师和产品经理准备的桌面端组件库，包含各种常用场景的组件以及国际化多语言的配置等。<br/>
主要基于 VUE 2（Element） 和 VUE 3（Element Plus）。
:::

Element 也有 React/Angular 相关的组件库版本。但本文着重介绍 VUE 版本（基于 VUE 2） 的组件库，其他组件库的安装和使用大同小异。

<p style="color:#069">引申： 
React相关的组件库有 <a href="https://ant.design/index-cn" target="_blank">Ant Design</a>，
VUE相关的移动端组件库有 <a href="https://vant-contrib.gitee.io/vant/#/zh-CN/home" target="_blank">Vant</a>。
</p>

## 一、Element 的安装和使用：

```js
// 1. 安装
$ npm i element-ui -S

// 2. 完整引入
// 在VUE项目的入口配置文件 main.js 里面配置如下代码：
import Vue from 'vue';
import ElementUI from 'element-ui';                 // 第一步： 引入组件库
import 'element-ui/lib/theme-chalk/index.css';      // 第二步： 引入组件库的样式
import App from './App.vue';

Vue.use(ElementUI);                                 // 第三步： 使用组件库

new Vue({
  el: '#app',
  render: h => h(App)
});

// 2.1 按需引入
// 借助 babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的。
// 2.1.1 安装 babel-plugin-component
$ npm install babel-plugin-component -D
// 2.1.2 将 .babelrc 修改为:
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
// 2.1.3 配置 main.js
import Vue from 'vue';
import { Button, Select } from 'element-ui';
import App from './App.vue';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */

new Vue({
  el: '#app',
  render: h => h(App)
});
```

```html
<!-- OR: 安装 - CDN方式引入 -->
<!-- 引入样式 -->
<link
  rel="stylesheet"
  href="https://unpkg.com/element-ui/lib/theme-chalk/index.css"
/>
<!-- 引入组件库 -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
```

参考地址：<br/>
<a href="https://element.eleme.cn/#/zh-CN" target="_blank">Element（中文版）</a><br />
<a href="https://element-plus.gitee.io/zh-CN/" target="_blank">Element Plus（中文版）</a><br />
