# vuePress 全局搜索功能

## 一、search

为你的文档网站提供本地搜索能力。

```
npm i -D @vuepress/plugin-search@next
```

```js
import { searchPlugin } from '@vuepress/plugin-search'

export default {
  plugins: [
    searchPlugin({
      // 配置项
    })
  ]
}
```

::: tip 本地搜索索引
本地搜索索引
:::

该插件会根据你的页面，在本地生成搜索索引，然后在用户访问站点时加载搜索索引文件。换句话说，这是一个轻量级的内置搜索能力，不会进行任何外部请求。

然而，当你的站点包含大量页面时，搜索索引文件也会变得非常大，它可能会拖慢你的页面加载速度。在这种情况下，我们建议你使用更成熟的解决方案 - docsearch 。

## 二、docsearch

```
npm i -D @vuepress/plugin-docsearch@next
```

```js
// .vuepress/config.js
import { docsearchPlugin } from '@vuepress/plugin-docsearch'

export default {
  plugins: [
    docsearchPlugin({
      // 你的选项
      // appId, apiKey 和 indexName 是必填的
    })
  ]
}
```

访问 DocsSearch 提交网站 URL，审核通过后 DocSearch 团队会将 apiKey 和 indexName 发送到你的邮箱，然后将其配置到 config.js 里面。

## 三、参考网址

- [search](https://v2.vuepress.vuejs.org/zh/reference/plugin/search.html)
- [vuepress-theme-hope - search](https://vuepress-theme-hope.gitee.io/v2/zh/guide/feature/search.html)
- [VuePress 2.0 中使用 Algolia DocSearch 文档搜索功能的配置](https://www.imcao.cn/2022/06/24/docsearch/)
- [algolia 官网文档](https://www.algolia.com/doc/)
- [docsearch.algolia.com](https://docsearch.algolia.com/)
