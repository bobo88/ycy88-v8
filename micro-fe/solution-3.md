# 集成方案-样式隔离

## 一、主应用配置

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

## 二、子应用配置

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
        return ".vueapp-space";
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
    <div id="app" class="vueapp-space"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```
