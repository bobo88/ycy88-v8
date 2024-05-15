# antv 报错汇总

## 一、x6 与 x6-vue-shape 版本不匹配

报错："export 'Scheduler' was not found in '@antv/x6'

```js
// 项目代码 - 原始场景
{
  // 其他略...
  "dependencies": {
    "@antv/x6": "^2.0.6",
    "@antv/x6-vue-shape": "^1.2.10",
  },
}
```

::: tip 解决方案
x6 是 x6-vue-shape 统一使用 1.x 版本或者 2.x 版本。
:::

```js
// 统一使用 1.x 版本即可
{
  "dependencies": {
    "@antv/x6": "^1.34.12",
    "@antv/x6-vue-shape": "^1.2.10",
  },
}
```

- [antv/x6 版本列表](https://github.com/antvis/X6/releases)
