# vue-simple-password-meter

**Vue Simple Password Meter** 是一个简单的密码强度检测器组件，使用原生 JavaScript 编写，极其轻量（压缩后小于 1KB + Gzipped）。该版本兼容 Vue 3。

## 安装

使用 npm 或 yarn 安装该组件：

```bash
npm install vue-simple-password-meter --save
```

或者使用 yarn：

```bash
yarn add vue-simple-password-meter
```

## 使用

### 基本用法

直接使用 `v-model` 来绑定密码，并将其传递给组件：

```vue
<template>
  <div id="app">
    <label>Password</label>
    <input type="password" v-model="password" />
    <password-meter :password="password" />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import PasswordMeter from "vue-simple-password-meter";

export default defineComponent({
  components: {
    PasswordMeter,
  },
  setup() {
    const password = ref("");

    return {
      password,
    };
  },
});
</script>
```

### 密码强度评分

通过 `@score` 事件获取密码强度评分，评分从 `0` 到 `4`，表示密码强度的不同等级：

```vue
<template>
  <div id="app">
    <label>Password</label>
    <input type="password" v-model="password" />
    <span v-if="score === 0">Use better password</span>
    <password-meter @score="onScore" :password="password" />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import PasswordMeter from "vue-simple-password-meter";

export default defineComponent({
  name: "App",
  components: {
    PasswordMeter,
  },
  setup() {
    const password = ref("");
    const score = ref(null);

    const onScore = (payload) => {
      console.log(payload.score); // 评分：0 到 4
      console.log(payload.strength); // 强度分类：'risky', 'guessable', 'weak', 'safe', 'secure'
      score.value = payload.score;
    };

    return {
      password,
      onScore,
      score,
    };
  },
});
</script>
```
