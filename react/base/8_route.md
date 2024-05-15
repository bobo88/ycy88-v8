# React 清单 - 路由

::: warning 版本注意
因 React router 的不同版本之间，有较多细节差异。本文暂不罗列这些细节变化，只针对目前最新的版本（v6.4 版本）进行技术研究和分析。
:::

## 一、路由的意义

在传统网站中，浏览器从 Web 服务器请求文档，下载文档相关的 CSS 和 JavaScript 文件，并渲染成 HTML。当用户点击一个链接时，它会重新开始一个新页面的过程。

为了实现更好和更快的用户体验，「客户端路由」这个概念就应运而生。它允许你在应用中点击链接时不刷新页面（换句话说也就是不用请求完整的全新页面），而只是针对性的获取更新页面中的某一部分。

## 二、安装 React router

```js
$ yarn add react-router-dom@6
// OR
$ npm i react-router-dom@6
```

## 三、使用 React router

::: warning
本文档的所有代码，均默认你已经初始化好了 React 项目（可以基于脚手架搭建，可参考「<a href="http://docs.ycy88.com/react/2_%E8%84%9A%E6%89%8B%E6%9E%B6.html" target="_blank">React 脚手架</a>」或其他文档）。
:::

1. 配置 src/index.jsx 文件

```jsx
import React from 'react'
import ReactDOM from 'react-dom' // react 17

// React-router
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// 路由页面配置表
import routes from './routes'
// 布局 & 路由页面
import Layout from './layout/Layout'

// 路由表配置
const renderRoutes = (routes) => {
  return routes.map((item) => {
    if (item && item.children) {
      return (
        <Route path={item.path} element={item.element} key={item.key}>
          {renderRoutes(item.children)}
        </Route>
      )
    } else {
      return (
        <Route path={item.path} element={item.element} key={item.key}></Route>
      )
    }
  })
}

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        {renderRoutes(routes)}
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
)
```

2. 新增 src/routes/index.jsx 文件

```jsx
import Home from '../pages/Home'
import List from '../pages/List'
import Detail from '../pages/Detail'
import Error from '../pages/404'

const routes = [
  {
    key: 'index',
    path: '/',
    element: <Home />
  },
  {
    key: 'list',
    path: '/list',
    element: <List />
  },
  {
    key: 'detail',
    path: '/detail',
    element: <Detail />
  },
  {
    key: '404',
    path: '/*',
    element: <Error />
  }
]

export default routes
```

3. 新增 src/layout/Layout.jsx 文件

```jsx
import { Outlet } from 'react-router-dom'

const LayoutCustom = () => {
  return (
    <>
      <h2>公共头部</h2>
      {/* 指定路由的位置 */}
      <Outlet />
      <h3>公共底部</h3>
    </>
  )
}

export default LayoutCustom
```

4. 在 src/pages 目录下新建四个文件：Home.jsx / List.jsx / Detail.jsx / 404.jsx

```jsx
// 以 Home.jsx 为例
const Home = () => {
  return <div className="main-wrap">Home</div>
}
export default Home
```

![An image](/images/react/react_router.png)

## 四、React router 详解

上述几个步骤走下来，我们已经实现了客户端路由的最基本功能。接下来我们重点分析下 React router 的详细使用。

::: tip 在 v6.4 中，引入了支持新数据 API 的新路由器：
createBrowserRouter / createMemoryRouter / createHashRouter

以下路由器不支持数据 API： BrowserRouter / MemoryRouter / HashRouter / NativeRouter / StaticRouter
:::

详解提纲：

- 路由器组件（Router Components）

  ```js
  // BrowserRouter / HashRouter / MemoryRouter / NativeRouter / Router / StaticRouter
  // 主要是定义路由的展现形式和场景等功能。比如，BrowserRouter就是干净的URL形式，HashRouter就是带有/#/等hash相关字符的URL形式。
  ```

- 路由（Route）

  - 路由可能是 React Router 应用程序中最重要的部分。它们将 URL 段与组件、数据加载和数据突变相结合。通过路由嵌套，复杂的应用程序布局和数据依赖变得简单和声明性。

  ```jsx
  // Route / action / errorElement / loader / shouldRevalidate
  {
      path: "/",                      // 匹配怎样的 URL
      element: <Root />,              // 匹配到了后，渲染哪个 Component
      errorElement: <ErrorPage />,    // 如果出错展示哪个 Component
  }
  // action / errorElement 均需要在使用 createBrowserRouter 的情况下有效。
  ```

- 组件（Components）

  ```js
  // Await / Form / Link / Link (RN) / NavLink / Navigate / Outlet / Route / Routes / ScrollRestoration

  // 1. Link: 配置跳转路由地址
  // 2. NavLink: 配置导航路由的地址，是Link的一种特殊类型，判断它是否“活跃”，可以添加 active 。注意配合使用「 end 」
  //             当Navlink上添加了end属性后，若父组件的子组件匹配成功，则父组件的导航没有高亮效果
  // 3. Navigate: 配置页面直接导航到哪个页面
  // 4. Outlet: 当<Route>产生嵌套时，渲染其对应的后续子路由，有点类似于vue里面的<router-view>
  ```

- Hooks

  ```js
  // useActionData / useAsyncError / useAsyncValue / useFetcher / useFetchers / useFormAction / useHref / useInRouterContext

  // useLinkClickHandler / useLinkPressHandler / useLoaderData / useLocation / useMatch / useMatches / useNavigate / useNavigation

  // useNavigationType / useOutlet / useOutletContext / useParams / useResolvedPath / useRevalidator / useRouteError

  // useRouteLoaderData / useRoutes / useSearchParams / useSearchParams (RN) / useSubmit

  // 比如：useParams / useSearchParams
  // routes/index.jsx （节选）
  {
      key: 'detail',
      path: '/detail',
      element: <Detail />,
      children: [
          {
              path: ':id',
              key: 'detail-id',
              element: <Detail />,
          }
      ]
  },
  // pages/Detail.jsx
  import React from 'react';
  import {
      useSearchParams,
      useParams,
  } from "react-router-dom";

  const Detail = () => {
      const { id } = useParams();
      console.log('useParams --> id: ', id)

      const [searchParams] = useSearchParams();
      console.log('useSearchParams --> name: ', searchParams.getAll('name'))

      return (
          <div className='main-wrap'>
          Detail
          </div>
      )
  }
  export default Detail;
  ```

  ![An image](/images/react/react_router_demo2.png)

- 实用工具

  ```js
  json / redirect

  createRoutesFromChildren /
    createRoutesFromElements /
    createSearchParams /
    defer /
    generatePath /
    isRouteErrorResponse /
    Location /
    matchPath /
    matchRoutes /
    renderMatches /
    resolvePath
  ```

## 五、注意事项

TODO...

DEMO 源码参考：<br />
<a href="https://github.com/bobo88/project-basis/tree/main/react-router-demo" target="_blank">「React router demo」</a><br />

参考：<br />
<a href="https://reactrouter.com/en/main" target="_blank">React router 英文官网</a><br />
<a href="https://www.reactrouter.cn/" target="_blank">React router v6 中文文档（非官网）</a><br />
