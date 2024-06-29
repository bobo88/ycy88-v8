# VUE3 用 Hooks 实现全局插件

在 Vue 3 中，可以通过组合式 API 和 Hooks 形式创建全局插件。

## 创建全局插件的步骤

1. **创建插件的核心逻辑**：定义使用 Hook 的逻辑，控制显示和隐藏等功能。
2. **定义插件**：通过 `install` 方法将 Hook 的逻辑挂载到 Vue 的全局属性中。
3. **注册插件**：在 `main.ts` 中注册插件，使其在全局范围内可用。
4. **在组件中使用插件**：通过组合式 API 调用插件方法。

## 步骤 1：创建插件的核心逻辑

创建一个文件来定义插件的核心逻辑，例如 `useLoading.ts`：

```typescript
import { ref, reactive } from 'vue'

const isLoading = ref<boolean>(false)

export function useLoading() {
  const show = () => {
    isLoading.value = true
  }

  const hide = () => {
    isLoading.value = false
  }

  return {
    isLoading,
    show,
    hide
  }
}
```

## 步骤 2：定义插件

创建一个文件来定义插件，例如 `loadingPlugin.ts`：

```typescript
import { App } from 'vue'
import { useLoading } from './useLoading'

export default {
  install(app: App) {
    const loading = useLoading()

    app.config.globalProperties.$loading = loading
  }
}
```

## 步骤 3：注册插件

在 `main.ts` 中注册插件：

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import LoadingPlugin from './loadingPlugin'

const app = createApp(App)

app.use(LoadingPlugin)

app.mount('#app')
```

## 步骤 4：在组件中使用插件

在任意组件中使用插件，例如 `App.vue`：

```vue
<template>
  <div>
    <button @click="toggleLoading">Toggle Loading</button>
    <div v-if="$loading.isLoading">Loading...</div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()

const toggleLoading = () => {
  if (instance?.proxy?.$loading.isLoading) {
    instance.proxy.$loading.hide()
  } else {
    instance.proxy.$loading.show()
  }
}
</script>
```

## 总结

以上步骤通过使用 Vue 3 的组合 API 和 Hooks 形式创建了一个全局插件。这个插件能够在整个应用范围内控制 Loading 的显示和隐藏。核心逻辑通过 `useLoading` Hook 实现，插件定义通过 `install` 方法将 Hook 的逻辑挂载到全局属性中，最后在组件中通过组合式 API 使用该插件。这样可以提高代码的可复用性和模块化程度。
