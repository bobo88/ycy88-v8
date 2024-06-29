# VUE2 封装自定义插件 toast

## 1. 创建插件文件

首先，创建一个插件文件，命名为 `toastPlugin.js`，用于封装 `toast` 的功能。

```javascript
// plugins/toastPlugin.js

import Vue from 'vue'
import ToastComponent from './ToastComponent.vue'

const ToastConstructor = Vue.extend(ToastComponent)

let instance

const Toast = {
  install(Vue, options = {}) {
    const { container } = options

    if (!instance) {
      instance = new ToastConstructor()
      instance.$mount(
        container
          ? container
          : document.body.appendChild(document.createElement('div'))
      )
    }

    Vue.prototype.$toast = {
      show(message) {
        instance.message = message
        instance.show()
      },
      hide() {
        instance.hide()
      }
    }
  }
}

export default Toast
```

## 2. 创建 Toast 组件

创建一个 `ToastComponent.vue` 文件，用于定义 `toast` 组件的模板和逻辑。

```vue
<!-- ToastComponent.vue -->

<template>
  <div class="toast" v-show="visible">
    {{ message }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      visible: false
    }
  },
  methods: {
    show() {
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, 3000)
    },
    hide() {
      this.visible = false
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border-radius: 4px;
  display: none;
}
.toast.show {
  display: block;
}
</style>
```

## 3. 在 main.js 中使用插件

在 Vue 2 的入口文件 `main.js` 中引入并使用自定义的 `toast` 插件。

```javascript
import Vue from 'vue'
import App from './App.vue'
import ToastPlugin from './plugins/toastPlugin'

Vue.use(ToastPlugin, {
  // 可选参数，指定 toast 渲染的容器
  container: document.getElementById('toast-container')
})

new Vue({
  render: (h) => h(App)
}).$mount('#app')
```

## 4. 在组件中使用 Toast

现在，你可以在任何组件中使用 `$toast` 提供的方法来显示和隐藏 `toast`。

```vue
<template>
  <button @click="showToast">Show Toast</button>
</template>

<script>
export default {
  methods: {
    showToast() {
      this.$toast.show('Hello from toast!')
    }
  }
}
</script>
```

## 解释和注意事项

- **插件文件 (`toastPlugin.js`)**：在插件中使用 `Vue.extend()` 创建一个 `ToastComponent` 的构造函数，并且通过 `Vue.prototype.$toast` 将 `show` 和 `hide` 方法注入到 Vue 的原型链中，从而可以在所有组件中通过 `this.$toast` 访问。

- **Toast 组件 (`ToastComponent.vue`)**：这是一个简单的消息提示框组件，通过 `show` 和 `hide` 方法控制消息的显示和隐藏。

- **使用插件 (`main.js`)**：在应用的入口文件中使用 `Vue.use(ToastPlugin)` 安装插件，使得 `$toast` 可以在整个应用中使用。可以通过 `options` 参数传递配置，如指定渲染的容器等。

- **在组件中使用 Toast**：在任何组件中，通过 `this.$toast.show('message')` 来显示 `toast` 消息。

通过这样的封装，你可以方便地在 Vue 2 项目中使用自定义的 `toast` 插件，实现消息提示功能，并且能够在整个应用中统一管理和调用。
