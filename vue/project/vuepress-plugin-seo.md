# vuepress-plugin-seo2

## 一、config.js

```js
// 全局meta配置
export default {
  lang: 'zh-CN',
  title: 'V8程序',
  description: 'V8程序',
  head: [
    ['meta', { name: 'og:title', content: 'V8程序' }],
    ['meta', { name: 'og:type', content: 'article' }],
    [
      'meta',
      {
        name: 'og:description',
        content: '程序员/管理/思考/全栈开发/前端/后端/博客文档/技术博客'
      }
    ],
    [
      'meta',
      {
        name: 'keywords',
        content: '程序员，思考，全栈开发，前端，后端，博客文档，技术博客'
      }
    ],
    [
      'meta',
      {
        name: 'og:image',
        content: 'https://fe.ycy88.com/images/think/work.png'
      }
    ]
  ],
  theme: hopeTheme({
    // 默认主题配置
    navbar: [...NAV_BAR],
    sidebar: sidebarFormatObj,
    lastUpdated: true,
    lastUpdatedText: '上次更新时间',
    plugins: {
      mdEnhance: {
        chart: true,
        echarts: true,
        tasklist: true,
        flowchart: true
      },
      seo: true
    }
  }),
  markdown: {
    lineNumbers: true
  },
  plugins: [
    searchPlugin({
      // 配置项
    })
  ]
}
```

## 二、具体页面配置

```
---
tag:
  - 量化标准表达
  - 项目管理
title: 量化的参考标准
description: 项目结果量化表达、招聘量化表达、SMART 原则
head:
  - - meta
    - name: og:title
      content: 量化的参考标准
  - - meta
    - name: og:description
      content: 项目结果量化表达、招聘量化表达、SMART 原则
---
```

## 三、参考地址

- [VuePress - Vue 驱动的静态网站生成器](https://v2.vuepress.vuejs.org/zh/)
- [VitePress 中文网](https://vitejs.cn/vitepress/)
- [vuepress-theme-hope-seo](https://vuepress-theme-hope.gitee.io/v2/zh/guide/advanced/seo.html)
- [vuepress-plugin-seo2 中文网](https://vuepress-theme-hope.gitee.io/v2/seo/zh/)
