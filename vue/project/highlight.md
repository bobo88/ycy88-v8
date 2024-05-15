# VUE3 实践：highlight

## 一、安装

```bash
## 这个是highlight.js基础依赖
npm install --save highlight.js
## 安装支持vue3 的@highlightjs/vue-plugin 依赖
npm install --save @highlightjs/vue-plugin
```

## 二、main.js 引入

```js
// highlight 的样式，依赖包，组件
import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'

//注册组件
app.use(hljsVuePlugin)
```

## 三、.vue 文件中使用

```vue
<template>
  <div>
    <highlightjs
      language="JavaScript"
      :autodetect="false"
      :code="code"
    ></highlightjs>
  </div>
</template>

<script setup lang="ts">
let code = 'import { createApp } from "vue";import App from "./App.vue";'
</script>

<style scoped lang="scss"></style>
```

## 四、模板字符串碰到 script 无法识别

::: danger ⚠️ 警告
模板字符串加入了 script 标签后会报错。
:::

原因：运行 JS 的时候由上至下，先识别模板字符串里面的 script 标签，会认为标签结束了，所以后面会报错(其实和字符串里面无法放 script 标签是一个道理)。

所以需要利用转义字符 <code>"\\"</code>。

```vue
<template>
  <div>
    <highlightjs
      language="JavaScript"
      :autodetect="false"
      :code="code"
    ></highlightjs>
  </div>
</template>

<script setup lang="ts">
let code = `
<template>
  <div class="vab-app-main">
    <NormalTableTwo />
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import NormalTableTwo from '@/components/NormalTableTwo'

  const dialogVisible = ref(false)
<\/script>
`
</script>

<style scoped lang="scss"></style>
```

## 五、DEMO 截图

![An image](/images/vue/highlight.png)

---

- [http://highlight.cndoc.wiki/doc](http://highlight.cndoc.wiki/doc)
