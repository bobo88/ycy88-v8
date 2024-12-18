# 集成方案-样式隔离

::: tip 样式隔离的分类

> 注意：可以实现双重样式隔离的，即 **主应用配置** 和 **子应用配置** 同时设置。

1. **主应用污染子应用**：样式严格隔离，样式不会污染到子应用。
2. **子应用污染主应用**：配置命名空间，样式不会污染到主应用。

> **子应用污染子应用** 在默认沙箱机制下不太容易出现，但在某些场景下（如 DOM 容器未隔离、全局样式冲突）仍然可能发生，需要通过严格的隔离机制避免。

:::

## 一、主应用配置

> 将主应用的样式隔离配置为严格模式（是 Vue 的 **Scoped CSS** 特性生成的样式规则：`.logo[data-v-7ba5bd90]`），样式将不会污染到子应用。

```ts
// main.ts
start({
  prefetch: "all",
  sandbox: {
    strictStyleIsolation: true, // 启用严格样式隔离
    experimentalStyleIsolation: false, // 启用实验性样式隔离
  },
});
```

**主应用的样式隔离配置为严格模式后，主应用的样式将不会污染到子应用。**

![An image](/images/from-zero/fe/qiankun-styles.jpg)

查看页面样式效果，你会发现如下图所示：

![An image](/images/from-zero/fe/qiankun-styles-4.jpg)

- 你看到的 `#shadow-root (open)` 表示当前元素被 Shadow DOM 封装了。
  - `open` 表示该 Shadow DOM 是公开的，可以通过 JavaScript 访问。
  - 在 Shadow DOM 内的样式和元素不会影响到外部 DOM，也不会被外部样式污染。

::: tip Shadow DOM 的特性

1. **样式隔离**：Shadow DOM 内的样式不会影响外部 DOM，外部样式也不会影响它。
2. **封装性**：Shadow DOM 可以封装组件的 HTML 结构，外部无法直接修改内部结构。
3. **独立 DOM 树**：Shadow DOM 形成一个独立的 DOM 树，挂载在主 DOM 树上。

:::

::: danger 不设置样式隔离的情况

![An image](/images/from-zero/fe/qiankun-styles-3.jpg)

:::

## 二、子应用配置

> 配置命名空间，样式不会污染到主应用。

```js
// postcss.config.js
module.exports = {
  plugins: {
    "postcss-selector-namespace": {
      namespace(css) {
        if (
          // 不想被添加「别名前缀」 的样式文件，可以在这里过滤掉
          css.includes("demo.scss")
        ) {
          return "";
        }
        return ".user-mgt-space";
      },
    },
  },
};
```

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <link rel="icon" href="<%= BASE_URL %>favicon.ico" />
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <noscript>
      <strong
        >We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work
        properly without JavaScript enabled. Please enable it to
        continue.</strong
      >
    </noscript>
    <div id="app" class="user-mgt-space"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

**子应用所有样式都会被添加上 `.user-mgt-space` 前缀，从而避免样式冲突。**

![An image](/images/from-zero/fe/qiankun-styles-2.jpg)
