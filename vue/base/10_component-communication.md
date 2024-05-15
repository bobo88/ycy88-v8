# VUE 清单 - 组件通信

::: warning VUE3
文档中未明确指出版本的地方，则特指最新的 VUE3 版本。
:::
vue 是数据驱动视图更新的框架，项目是由多个不同组件组合嵌套而成，那么组件之间的数据通信就非常重要了。

下面简单介绍几种组件间的通信方法：

## 父子组件通信

- 方式一：props / emits

```xml
<!-- 方式一： props / emits -->
<!-- 父组件 -->
<template>
    <Child :data-desc="desc" @changeDesc="changeDesc" />
</template>
<script lang="ts" setup>
    import { ref } from 'vue'
    import Child from './Child'

    const desc = ref('我是描述')

    const changeDesc = (value) => {
        desc.value = value
    }
</script>


<!-- 子组件 -->
<template>
  <div>
    <p>From Parent: {{ dataDesc }}</p>
    <button @click="changeHandle">改变父组件的描述内容</button>
  </div>
</template>
<script lang="ts" setup>
  const props = defineProps({
    dataDesc: String,
  })

  const emit = defineEmits(['changeDesc'])

  const changeHandle = () => {
    emit('changeDesc', '我来自子元素')
  }
</script>
```

- 方式二：v-model / emits

```xml
<!-- 方式二： v-model / emits -->
<!-- 父组件 -->
<template>
    <Child v-model="title" v-model:desc="desc" />
</template>
<script lang="ts" setup>
    import { ref } from 'vue'
    import Child from './Child'

    const title = ref('我是标题')
    const desc = ref('我是描述')
</script>


<!-- 子组件 -->
<template>
  <div>
    <p>From Parent: {{ modelValue }} -- {{ desc }}</p>
    <button @click="changeHandle">改变父组件的描述内容</button>
  </div>
</template>
<script lang="ts" setup>
  const props = defineProps({
    modelValue: String,
    desc: String,
  })

  const emit = defineEmits(['update:modelValue', 'update:desc'])

  const changeHandle = () => {
    emit('update:modelValue', 'Change Title')
    emit('update:desc', '我来自子元素')
  }
</script>
```

- 方式三：ref / emits

```xml
<!-- 方式三： ref / emits -->
<!-- 父组件 -->
<template>
    <Child ref="refChild" @changeDesc="changeDesc" />
</template>
<script lang="ts" setup>
    import { ref } from 'vue'
    import Child from './Child'

    const desc = ref('我是描述')
    const refChild = ref(null)

    watchEffect(() => {
        if (refChild.value) {
            refChild.value.sayHi = desc.value
        }
    })
</script>

<!-- 子组件 -->
<template>
  <div>
    <p>From Parent: {{ sayHi }}</p>
    <button @click="changeHandle">改变父组件的描述内容</button>
  </div>
</template>
<script lang="ts" setup>
  const sayHi = ref('')

  defineExpose({
    sayHi // 明确的暴露接口
  })

  const emit = defineEmits(['changeDesc'])

  const changeHandle = () => {
    emit('changeDesc', '我来自子元素')
  }
</script>
```

## 非父子组件通信

::: tip
「非父子组件通信」的方式是可以适用于「父子组件通信」的，反之不成立。
:::

- 方式四：provide / inject
  ::: warning provide / inject
  适用范围：祖孙组件（包含父子组件）
  :::

```xml
<!-- 方式四： provide / inject -->
<!-- 父组件 -->
<template>
    <Child @changeDesc="changeDesc" />
</template>
<script lang="ts" setup>
    import { ref } from 'vue'
    import Child from './Child'

    const title = ref('我是标题')
    const desc = ref('我是描述')
    const changeDesc = (value) => {
      desc.value = value
    }

    provide('parent', {
      title,
      desc,
      changeDesc
    })
</script>

<!-- 子组件 -->
<template>
  <div>
    <p>From Parent: {{ parentData.title }} -- {{ parentData.desc }}</p>
    <button @click="changeHandle">改变父组件的描述内容</button>
  </div>
</template>
<script lang="ts" setup>
  const parentData = inject('parent')
  const { changeDesc } = parentData

  const changeHandle = () => {
    changeDesc('From子元素')
  }
</script>
```

- 方式五：EventBus(mitt)

Mitt 是一个体积极小的第三方消息发布/订阅式 JavaScript 库

第一步： 安装 Mitt；

```js
// 安装 Mitt
$ npm i mitt
```

第二步：在 src/utils 下新建一个 bus.js 文件；

```js
/* bus.js */
import mitt from 'mitt'

const bus = {}
const emitter = mitt()

bus.$on = emitter.on
bus.$off = emitter.off
bus.$emit = emitter.emit

export default bus
```

```xml
<!-- 方式五： EventBus(mitt) -->
<!-- 父组件 -->
<template>
    <Child />
</template>
<script lang="ts" setup>
    import { ref } from 'vue'
    import Child from './Child'
    // 引入第二步中配置的bus（路径自定义）
    import bus from "/@/utils/bus"

    const desc = ref('我是描述')

    bus.$on('desc', (data: string) => {
      desc.value = data
    })

    onMounted(() => {
      bus.$emit('bobo', desc.value)
    })
</script>

<!-- 子组件 -->
<template>
  <div>
    <p>From Parent: {{ parentDesc }}</p>
    <button @click="changeHandle">改变父组件的描述内容</button>
  </div>
</template>
<script lang="ts" setup>
    // 引入第二步中配置的bus（路径自定义）
    import bus from "/@/utils/bus"

    const parentDesc = ref('')

    bus.$on('bobo', (data: string) => {
        parentDesc.value = data
    })

    const changeHandle = () => {
        bus.$emit('desc', 'From子元素')
    }
</script>
```

- 方式六：Vuex / pinia

参考：
<a href="/vue/Pinia.html">VUE 全家桶之 Pinia</a><br />

::: warning $attrs / $listeners
VUE2 中可以通过「$attrs / $listeners」来进行祖孙（包括父子）组件间通信。<br/>
但是VUE3中移除了$listeners，且调整了$attrs。
:::
