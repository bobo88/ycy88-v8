# Vue 3 全局 Loading 插件

完整步骤如下：

```md
1. 步骤 1：创建 Loading 插件
   > 创建 `components/Loading/index.ts` 文件，定义插件安装方法，包含 `show` 和 `hide` 方法，并将其注入到 Vue 的全局属性中。
2. 步骤 2：创建 Loading 组件
   > 创建 `components/Loading/index.vue` 文件，定义 Loading 组件，包含显示和隐藏的逻辑，以及相关的样式和动画效果。
3. 步骤 3：在 `main.ts` 中注册插件
   > 在 `main.ts` 文件中，使用 `app.use` 注册插件，并进行类型声明以便在 TypeScript 中使用。
4. 步骤 4：在组件中使用 Loading 插件
   > 在任意组件中，通过 `this.$loading.show()` 和 `this.$loading.hide()` 方法控制 Loading 组件的显示和隐藏。
```

实现的原理和本质：

> **在 Vue 3 中，自定义插件的实现主要依赖于 Vue 提供的插件机制、全局属性、虚拟节点（VNode）的创建与渲染。**<br/>
> 1）插件通常通过暴露一个 install 方法来实现，该方法在 Vue 应用实例上调用，并接收 app 作为参数。<br/>
> 2）全局属性 (app.config.globalProperties) 是 Vue 提供的一个功能，允许在整个应用中共享某些方法或属性。<br/>
> 3）虚拟节点（VNode）是 Vue 的核心概念之一，它是对真实 DOM 节点的抽象表示。在插件中，通过 createVNode 创建一个虚拟节点，并通过 render 将其挂载到 document.body 中。

## 目录结构

```
src/
│
├── components/
│   └── Loading/
│       ├── index.ts
│       └── index.vue
│
├── main.ts
└── App.vue
```

## 1. 创建 Loading 插件

`components/Loading/index.ts`

```typescript
import type { App, VNode } from 'vue'
import Loading from './index.vue'
import { createVNode, render } from 'vue'

interface LoadingOptions {
  animationDuration?: number
  backgroundColor?: string
}

export default {
  install(app: App, options: LoadingOptions = {}) {
    const vnode: VNode = createVNode(Loading, { ...options })
    render(vnode, document.body)

    let loadingCount = 0

    app.config.globalProperties.$loading = {
      show() {
        loadingCount++
        if (loadingCount === 1) {
          vnode.component?.exposed?.show()
        }
      },
      hide() {
        if (loadingCount > 0) {
          loadingCount--
          if (loadingCount === 0) {
            vnode.component?.exposed?.hide()
          }
        }
      }
    }

    // 添加卸载逻辑
    app.unmount = ((originalUnmount) => {
      return (...args) => {
        render(null, document.body)
        originalUnmount(...args)
      }
    })(app.unmount)
  }
}
```

## 2. 创建 Loading 组件

`components/Loading/index.vue`

```vue
<template>
  <div v-if="isShow" class="loading">Loading...</div>
</template>

<script setup lang="ts">
import { ref, defineExpose, onMounted } from 'vue'

interface Props {
  animationDuration?: number
  backgroundColor?: string
}

const props = defineProps<Props>()
const isShow = ref<boolean>(false)

const show = () => {
  isShow.value = true
  setTimeout(() => {
    const loadingElement = document.querySelector('.loading')
    if (loadingElement) loadingElement.classList.add('loading-show')
  }, 0) // Next tick
}

const hide = () => {
  const loadingElement = document.querySelector('.loading')
  if (loadingElement) loadingElement.classList.remove('loading-show')
  setTimeout(() => {
    isShow.value = false
  }, props.animationDuration || 300) // Wait for transition to finish
}

defineExpose({
  isShow,
  show,
  hide
})

onMounted(() => {
  const loadingElement = document.querySelector('.loading')
  if (loadingElement && props.backgroundColor) {
    loadingElement.style.backgroundColor = props.backgroundColor
  }
})
</script>

<style lang="scss" scoped>
.loading {
  background: black;
  opacity: 0.8;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  transition: opacity 0.3s ease;
  opacity: 0;
}

.loading-show {
  opacity: 1;
}
</style>
```

## 3. 在 `main.ts` 中注册插件

`main.ts`

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import Loading from './components/Loading'

const app = createApp(App)

// 类型声明
type LoadingType = {
  show: () => void
  hide: () => void
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $loading: LoadingType
  }
}

app.use(Loading, {
  animationDuration: 300,
  backgroundColor: 'rgba(0, 0, 0, 0.8)'
})

app.mount('#app')
```

## 4. 在组件中使用 Loading 插件

任何组件，例如 `App.vue`：

```vue
<template>
  <div>使用自定义组件显示出一个 loading</div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted } from 'vue'

onMounted(() => {
  const instance = getCurrentInstance()
  instance?.proxy?.$loading.show()

  setTimeout(() => {
    instance?.proxy?.$loading.hide()
  }, 5000)
})
</script>

<style lang="scss" scoped></style>
```

## 详细解释

### 插件定义 (`components/Loading/index.ts`)

- **`createVNode` 和 `render`**：使用 Vue 的 `createVNode` 和 `render` 函数动态创建并渲染 `Loading` 组件到 `document.body`。
- **`globalProperties`**：将 `show` 和 `hide` 方法注入到 Vue 的全局属性中，使得它们可以在任何组件中使用。
- **卸载逻辑**：通过扩展 `app.unmount` 方法，确保在应用卸载时清理渲染的 `Loading` 组件。

### 组件定义 (`components/Loading/index.vue`)

- **`ref` 和 `defineExpose`**：通过 `ref` 控制 `isShow` 状态，并使用 `defineExpose` 将 `show` 和 `hide` 方法暴露给外部使用。
- **`onMounted`**：在组件挂载时设置自定义样式，如背景颜色。
- **样式和动画**：通过 CSS 过渡和类名的切换实现显示和隐藏动画。

### 注册插件 (`main.ts`)

- **类型声明**：扩展 Vue 的 `ComponentCustomProperties` 接口，使得 TypeScript 可以正确识别 `$loading` 属性。
- **插件注册**：通过 `app.use` 注册 `Loading` 插件，并传递自定义配置选项。

### 使用插件

- **`getCurrentInstance`**：在组件的生命周期钩子中获取当前实例，并调用 `$loading.show` 和 `$loading.hide` 方法控制 Loading 的显示和隐藏。

这样，你的全局 Loading 插件就成功地集成到了 Vue 3 项目中，并且可以在任何组件中轻松使用。
