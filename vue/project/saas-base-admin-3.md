# 打造企业通用脚手架-DEMO

::: tip 搭建思路

1. 框架选型：Vue Vben Admin
2. DEMO 验证：结合 SaaS 平台特性，逐一验证功能点是否完备
3. 输出结论 / 技术文档沉淀

:::

## 一、技术选型（Vue Vben Admin）

### 简介

Vue Vben Admin 是一个免费开源的中后台模版。使用了最新的 vue3,vite2,TypeScript 等主流技术开发，开箱即用的中后台前端解决方案。

### 特性

- 最新技术栈：使用 Vue3/vite2 等前端前沿技术开发
- TypeScript: 应用程序级 JavaScript 的语言
- 主题：可配置的主题
- 国际化：内置完善的国际化方案
- Mock 数据：内置 Mock 数据方案
- 权限：内置完善的动态路由权限生成方案
- 组件：二次封装了多个常用的组件

### 官方地址

- [vue-vben-admin](https://github.com/vbenjs/vue-vben-admin)
- [vue-vben-admin: github 中文](https://github.com/vbenjs/vue-vben-admin/blob/main/README.zh-CN.md)
- [线上 DEMO](https://vben.vvbin.cn/#/login?redirect=/dashboard)
- [官方中文文档](https://doc.vvbin.cn/)
- [官方中文文档 - github 地址](https://github.com/vbenjs/vue-vben-admin-doc)

## 二、开始

### Install and use：

本地环境需要安装 pnpm、Node.js 和 Git
::: warning 注意
推荐使用 pnpm，否则依赖可能安装不上。

Node.js 版本要求 12.x 以上，且不能为 13.x 版本，这里推荐 14.x 及以上。
:::

```Shell
# Get the project code
git clone https://github.com/anncwb/vue-vben-admin.git

# Installation dependencies
cd vue-vben-admin
pnpm install

# run
pnpm serve

# build
pnpm build
```

### 运行后效果截图：

<img src="/images/special/vben-base-admin.png">

- 参考：[Vben Admin 开始](https://doc.vvbin.cn/guide/)

## 三、文档解读（结合源码）

### 3.1 项目配置 [详情](https://doc.vvbin.cn/guide/settings.html)

用于修改项目的配色、布局、缓存、多语言、组件默认配置。

---

### 3.2 路由

- TODO

---

### 3.3 菜单

- TODO

---

### 3.4 权限

- TODO

---

### 3.5 Mock&联调[详情](https://doc.vvbin.cn/guide/mock.html)

#### Mock 服务[详情](https://doc.vvbin.cn/guide/mock.html#mock-%E6%9C%8D%E5%8A%A1)

本项目使用 vite-plugin-mock 来进行 mock 数据处理。项目内 mock 服务分本地和线上。

本地 mock 采用 Node.js 中间件进行参数拦截（不采用 mock.js 的原因是本地开发看不到请求参数和响应结果）。

- 如何新增 mock 接口

  - 如果你想添加 mock 数据，只要在根目录下找到 mock 文件，添加对应的接口，对其进行拦截和模拟数据。

```ts
// 项目源码解析：仅展示核心代码，其他代码略

// 1. 全局ts类型配置：types/global.d.ts
declare interface ViteEnv {
  VITE_USE_MOCK: boolean
  VITE_PUBLIC_PATH: string
  VITE_GLOB_APP_TITLE: string
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
}

// 2. 环境配置： .env.[development/production/...]
// # Whether to open mock
VITE_USE_MOCK = true

// 3. 创建plugins（获取环境配置中的具体配置）：src/config/application.ts
const plugins = await createPlugins({
  isBuild,
  root,
  enableAnalyze: VITE_ENABLE_ANALYZE === 'true',
  enableMock: VITE_USE_MOCK === 'true',
  compress: VITE_BUILD_COMPRESS
})

// 4. createPlugins的具体实现：src/plugins/index.ts
import { configMockPlugin } from './mock'
// vite-plugin-mock：根据配置情况，判断是否使用mock
if (enableMock) {
  vitePlugins.push(configMockPlugin({ isBuild }))
}

// 5. 通过插件注入代码
import { viteMockServe } from 'vite-plugin-mock'
export function configMockPlugin({ isBuild }: { isBuild: boolean }) {
  return viteMockServe({
    ignore: /^_/,
    mockPath: 'mock',
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    injectCode: `
      import { setupProdMockServer } from '../mock/_createProductionServer';

      setupProdMockServer();
      `
  })
}
```

- [Mockjs 使用](https://juejin.cn/post/6953199521031520292)

---

### 3.6 组件注册

- TODO

---

### 3.7 样式

- TODO

---

### 3.8 外部模块

- TODO

---

### 3.9 构建&部署

- TODO

---

## 四、DEMO 验证

### 4.1 登录流程

```shell
# 涉及文件
# 调用：actions方法
F:\admin-base\src\views\sys\login\LoginForm.vue

# 定义：store - actions 方法
F:\admin-base\src\store\modules\user.ts

# 定义：API接口
F:\admin-base\src\api\sys\user.ts

# Mock：请求API接口数据mock
F:\admin-base\mock\sys\user.ts
```

## 五、注意事项

## 六、备注
