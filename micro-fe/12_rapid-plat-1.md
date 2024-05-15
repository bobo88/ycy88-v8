# 团队标准工程搭建实践（一）

::: tip 主要事项
【封装基础组件（基于 Element Plus）】：input、button、select 等。
:::

## 一、目标

搭建平台框架（子应用级别？），负责与后端进行 CRUD 交互。

- 1）搭建基于 VUE3/TS 的项目框架；
- 2）确定引入的 Element UI 版本，并基于此版本二次封装组件库；
- 3）如何协调组件库的使用升级（基于 Element UI 二次封装的组件库）？
- 4）与后端进行 CRUD 页面级别的 API 接口联调。
- 5）...

## 二、搭建基于 VUE3/TS 的项目框架

> 基于 [Vue Admin Plus](https://vue-admin-beautiful.com/admin-plus/#/index)。

## 三、封装组件库

> 确定引入的 Element UI 版本，并基于此版本二次封装组件库。

### 1）确定引入的 Element UI 版本

> 引入 Element Plus 2.15.14（Aug 24, 2023）。

### 2）基于此 Element UI 版本，二次封装基本组件库

> 封装后，比如，el-input 使用调整为 yb-input。

::: tip 语法特性（一）
【如何实现组件属性透传】我们在一个组件内部没有声明任何 prop 时，调用该组件，传入相关的属性，会直接将属性传到根节点上。
:::

【验证～语法特性（一）】以 el-button 为例，封装成 yb-button。

```vue
<script lang="tsx">
// 1、二次封装（From：components/yb-button/index.vue）
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
export default defineComponent({
  name: 'YbButton',
  components: { ElButton },
  props: {
    icon: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => <el-button>{slots.default?.()}</el-button>
  }
})
</script>
```

```vue
<template>
  <!-- 2、使用自定义button（From：views/basic/index.vue）-->
  <div>
    <yb-button type="primary" size="mini" plain>abc</yb-button>
  </div>
</template>
<script setup name="BasicIndex">
onMounted(() => {})
</script>
<style></style>
```

```html
<!-- 3、页面呈现效果的代码片段如下 -->
<button
  aria-disabled="false"
  type="button"
  class="el-button el-button--primary el-button--mini is-plain"
>
  <!--v-if-->
  <span class="">abc</span>
</button>
```

如果把二次封装的基础组件外面再套一层 DIV，代码如下：

```vue
<script lang="tsx">
// 1、二次封装（From：components/yb-button/index.vue）
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
export default defineComponent({
  name: 'YbButton',
  components: { ElButton },
  props: {
    icon: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    return () => (
      <div>
        <el-button>{slots.default?.()}</el-button>
      </div>
    )
  }
})
</script>
```

那么页面最终的代码呈现效果如下（<span style="color:#f00">不符合预期</span>）：

```html
<!-- 3、页面呈现效果的代码片段如下（透传的button属性都添加到最外层的DIV上面了，而不在具体的button上面） -->
<div type="primary" size="mini" plain="">
  <button aria-disabled="false" type="button" class="el-button">
    <!--v-if-->
    <span class="">abc</span>
  </button>
</div>
```

::: tip 语法特性（二）
【如何实现组件属性透传】通过 vm.$attrs 进行透传。

官方对「vm.$attrs」的定义：包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件——在创建高级别的组件时非常有用。
:::

```vue
<script lang="tsx">
// 1、二次封装（From：components/yb-button/index.vue）
// === 使用 vm.$attrs
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
export default defineComponent({
  name: 'YbButton',
  components: { ElButton },
  props: {
    icon: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots，attrs }) {
    return () => (
      <div>
        <el-button {...attrs}>{slots.default?.()}</el-button>
      </div>
    )
  }
})
</script>
```

那么页面最终的代码呈现效果如下（<span style="color:green">基本符合预期</span>）：

```html
<!-- 3、页面呈现效果的代码片段如下（使用了 attrs） -->
<div type="primary" size="mini" plain="">
  <button
    aria-disabled="false"
    type="button"
    class="el-button el-button--primary el-button--mini is-plain"
  >
    <!--v-if-->
    <span class="">abc</span>
  </button>
</div>
```

::: tip 语法特性（三）
【如何实现组件属性透传】「inheritAttrs: false」的妙用

如果你不想要一个组件自动地继承 attribute，你可以在组件选项中设置 inheritAttrs: false。
:::

```vue
<script lang="tsx">
// 1、二次封装（From：components/yb-button/index.vue）
// === 使用 vm.$attrs
// === 使用 inheritAttrs: false,
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
export default defineComponent({
  name: 'YbButton',
  components: { ElButton },
  inheritAttrs: false,
  props: {
    icon: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots，attrs }) {
    return () => (
      <div>
        <el-button {...attrs}>{slots.default?.()}</el-button>
      </div>
    )
  }
})
</script>
```

那么页面最终的代码呈现效果如下（<span style="color:green">符合预期</span>）：

```html
<!-- 3、页面呈现效果的代码片段如下（使用了 attrs 和 inheritAttrs: false） -->
<div>
  <button
    aria-disabled="false"
    type="button"
    class="el-button el-button--primary el-button--mini is-plain"
  >
    <!--v-if-->
    <span class="">abc</span>
  </button>
</div>
```

::: tip 语法特性（四）
【如何实现组件事件透传】$listeners 合并到 $attrs。
:::

```vue
<script lang="tsx">
// 1、二次封装（From：components/yb-button/index.vue）
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
export default defineComponent({
  name: 'YbButton',
  components: { ElButton },
  inheritAttrs: false,
  props: {
    icon: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots，attrs }) {
    console.log('🚀 ~ setup ~ attrs:', attrs)
    return () => (
      <div>
        <el-button {...attrs} v-on="$attrs">
          {slots.default?.()}
        </el-button>
      </div>
    )
  }
})
</script>
```

```vue
<!-- 2、使用自定义button -->
<template>
  <div>
    <yb-button type="primary" size="mini" plain @custom="custom('123')">
      abc
    </yb-button>
  </div>
</template>
<script setup name="BasicIndex">
// 注意：这里自定义了一个事件，封装组件能在 $attrs 里面监听到。
const custom = (num) => {
  console.log(num)
}
</script>
<style></style>
```

![An image](/images/vue/vue-attrs.png)

::: tip 语法特性（五）
【如何实现组件属性透传】渲染函数：TODO
:::

### 3）封装业务组件

> 基于二次封装的组件库，封装特定的业务组件（比如列表页面、详情页面等）。

## 三、注意事项

---

- [如何更优雅二次封装 ElementUI](https://www.jianshu.com/p/9b5f9b522023)
- [vue 如何二次封装一个高频可复用的组件](https://cloud.tencent.com/developer/article/2197233)
- [移除 $listeners「$listeners 合并到 $attrs」](https://v3-migration.vuejs.org/zh/breaking-changes/listeners-removed.html)
- [透传 Attributes](https://cn.vuejs.org/guide/components/attrs)
- [vue3 中$attrs 的变化与 inheritAttrs 的使用 ](https://www.cnblogs.com/IwishIcould/p/16815907.html)
- [一文搞懂 Vue3 中的透传属性](https://juejin.cn/post/7086724982486597668)
- [一个透传技巧，治好了我的重度代码洁癖\_\_Vue.js](https://vue-js.com/topic/605edb744590fe0031e59711)
- [Vue3 中 ElementPlus 组件二次封装，实现原组件属性、插槽、事件监听、方法的透传](https://blog.csdn.net/weixin_43729943/article/details/135882287)
