# React 搭建后台管理系统

> 🔔 提示：不一定需要从零开始搭建项目。选择使用现有的开源项目，如 `Ant Design Pro`，可以节省大量时间和精力，同时还可以利用其已经实现的功能和最佳实践。

::: warning 注意
对于大多数后台管理系统项目，使用 `Ant Design Pro` 会是一个高效且实用的选择。如果项目需求特别复杂或定制化程度非常高，则可以考虑从零开始搭建项目。
:::

## 一、基于`Ant Design Pro`自定义

### 1）下载代码并运行

> clone 源代码

```bash
$ git clone git@github.com:ant-design/ant-design-pro.git
```

![An image](/images/react/react-clone.png)

> 安装依赖

```bash
$ yarn
```

> 执行运行命令

```bash
$ yarn dev
```

![An image](/images/react/react-run.png)

![An image](/images/react/react-run-2.png)

或通过以下方式

```bash
$ npm i @ant-design/pro-cli -g
$ pro create my-app


$ cd my-app
$ yarn
$ yarn start # 打开浏览器访问 http://localhost:8000
```

### 2）自定义内容

> === 去掉「多语言」。

![An image](/images/react/ant-design-pro.png)

> === 开启 Mock：设置运行命令 `MOCK=true`

```json
// package.json
{
  "scripts": {
    "dev": "npm run start:dev",
    "start:dev": "cross-env REACT_APP_ENV=dev MOCK=true UMI_ENV=dev max dev"
    // ...略
  }
  // ...略
}
```

> === 新增页面：

[查看官方文档](https://pro.ant.design/zh-CN/docs/new-page)

> === 封装 API 请求逻辑（`app.tsx` 和 `requestErrorConfig.ts`）：

[查看官方文档](https://pro.ant.design/zh-CN/config/runtime-api)

```tsx
// app.tsx（部分代码）
import { errorConfig } from './requestErrorConfig'
/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig
}
```

```tsx
// requestErrorConfig.ts（部分代码）
export const errorConfig: RequestConfig = {
  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      console.log('=== 请求拦截器: ', 'Bob', config)
      // 拦截请求配置，进行个性化处理。
      const url = config?.url?.concat('?token = 123')
      return { ...config, url }
    }
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      console.log('=== 响应拦截器: ', 'Bob', response)
      // 拦截响应数据，进行个性化处理
      const { data } = response as unknown as ResponseStructure

      if (data?.success === false) {
        message.error('请求失败！')
      }
      return response
    }
  ]
}
```

更多细节，[详情查看「Ant Design Pro 官方文档」](https://pro.ant.design/zh-CN/docs/overview)

### 3）项目运行效果截图

![An image](/images/react/ant-design-pro-2.png)

![An image](/images/react/ant-design-pro-3.png)

<!-- ![An image](/images/react/react-run.png) -->

## 二、从零构建后台管理系统

> TODO

---

- [Ant Design 5.0](https://ant.design/index-cn)
- [ANT DESIGN PRO 开箱即用的中台前端/设计解决方案](https://pro.ant.design/zh-CN)

<!-- - [admin-antd-react](http://admin-antd-react.liqingsong.cc/v2_vite/guide/) -->

<!-- https://docs.pingcode.com/ask/ask-ask/276864.html -->
