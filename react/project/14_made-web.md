# React 高级 - 搭建网站

::: tip 搭建网站
本文档主要从大方向规划网站的功能点，并逐个开发搭建完成。
:::

首先，明确网站搭建需要实现的功能：

- 1、引入功能全面的 UI 组件库
- 2、封装： ajax 请求 / hooks / 组件 ...
- 3、配置多环境：本地 / 测试 / 预生产 / 开发 ...
- 4、自动化流程：测试 / 打包部署 ...
- 5、认证方式： jwt
- 6、其他配置：Typescript / Todo ...

然后就是针对上述功能点逐个进行实现。

项目默认基于 create-react-app 脚手架生成。

## 一、引入 【ant design】

```js
// 1. 引入UI组件库
$ yarn add antd

// 2. 使用UI组件库
import { DatePicker } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
ReactDOM.render(<DatePicker />, mountNode);
```

## 二、引入 【axios】

```js
// 1. 引入 axios 依赖
$ yarn add axios

// 2. 配置 axios 相关文件
// utils/http 文件
// 	    配置【axios】的拦截和请求封装
// 	    前置拦截
// 	    后置拦截
// api/index 文件
//	    引入 utils/http
//	    编写具体的api接口地址
```

::: details 点击查看 utils/http.js 代码

```js
/**
 * 网络请求配置
 */
import axios from 'axios'
import { API_PATH } from './config'

let env = API_PATH || ''

axios.defaults.timeout = 100000
axios.defaults.baseURL = env || 'http://www.ycy88.com/api'

/**
 * http request 拦截器
 */
axios.interceptors.request.use(
  (config) => {
    console.log('-------------- Req 前置拦截器 ---------------------')
    config.data = JSON.stringify(config.data)
    config.headers = {
      'Content-Type': 'application/json'
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * http response 拦截器
 */
axios.interceptors.response.use(
  (response) => {
    console.log('-------------- Res 后置拦截器 ---------------------')
    if (response.data.errCode === 2) {
      console.log('过期')
    }
    return response
  },
  (error) => {
    console.log('-------------- Res 后置拦截器 Error ---------------------')
    console.log('请求出错：', error)
  }
)

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get(url: string, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then((response) => {
        landing(url, params, response.data)
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url: string, data: object) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      (response) => {
        //关闭进度条
        resolve(response.data)
      },
      (err) => {
        reject(err)
      }
    )
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url: string, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      (response) => {
        resolve(response.data)
      },
      (err) => {
        msgFunc(err)
        reject(err)
      }
    )
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url: string, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      (response) => {
        resolve(response.data)
      },
      (err) => {
        msgFunc(err)
        reject(err)
      }
    )
  })
}

//统一接口处理，返回数据
const HTTP = function (fecth: string, url: string, param = {}) {
  let _data = ''
  console.log(_data)
  return new Promise((resolve, reject) => {
    switch (fecth) {
      case 'get':
        console.log('begin a get request,and url:', url)
        get(url, param)
          .then(function (response) {
            resolve(response)
          })
          .catch(function (error) {
            console.log('get request GET failed.', error)
            reject(error)
          })
        break
      case 'post':
        post(url, param)
          .then(function (response) {
            resolve(response)
          })
          .catch(function (error) {
            console.log('get request POST failed.', error)
            reject(error)
          })
        break
      default:
        break
    }
  })
}

//失败提示
function msgFunc(err: any) {
  if (err && err?.response) {
    switch (err.response.status) {
      case 400:
        alert(err.response.data.error.details)
        break
      case 401:
        alert('未授权，请登录')
        break

      case 403:
        alert('拒绝访问')
        break

      case 404:
        alert('请求地址出错')
        break

      case 408:
        alert('请求超时')
        break

      case 500:
        alert('服务器内部错误')
        break

      case 501:
        alert('服务未实现')
        break

      case 502:
        alert('网关错误')
        break

      case 503:
        alert('服务不可用')
        break

      case 504:
        alert('网关超时')
        break

      case 505:
        alert('HTTP版本不受支持')
        break
      default:
    }
  }
}

/**
 * 查看返回的数据
 * @param url
 * @param params
 * @param data
 */
function landing(url: string, params = {}, data: any) {
  if (data && data?.code === -1) {
  }
}

export default HTTP
```

:::

## 三、引入【支持 TS】

```js
// 1. 安装typescript及声明类型
$ yarn add typescript @types/react @types/react-dom @types/node @types/jest

// 2. 配置tsconfig.json
// 其他： tsc --init 可以生成tsconfig.json
```

## 四、【配置多环境】

```js
// 1. 安装dotenv：
$ yarn add dotenv-cli

// 2. 根目录创建env等文件： 【.env】、【.env.dev】、【.env.test】、【.env.prod】等
REACT_APP_API_PATH = 'http://ycy88.com/dev' // 比如 .env.dev 里面配置

// 3. src/utils目录下配置 【config.ts】
export const API_PATH = process.env.REACT_APP_API_PATH;

// 4. 修改package.json配置文件
"scripts": {
    "serve": "dotenv -e .env.dev craco start",
    "dev": "dotenv -e .env.dev craco start",
    "start": "dotenv -e .env.dev craco start",
    "build": "dotenv -e .env.prod craco build",
    "build:dev": "dotenv -e .env.dev craco build",
    "build:test": "dotenv -e .env.test craco build",
    "test": "craco test",
    "eject": "craco eject"
},
```

## 五、引入【redux】

配置编写 store 相关文件

```js
// 1. 安装依赖：
$ yarn add react-redux
$ yarn add @reduxjs/toolkit
$ yarn add redux-persist    // React-redux持久化

// 2. 创建 Redux 状态（单个）
// ====== src/store/counterSlice.js
import { createSlice } from '@reduxjs/toolkit'
export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})
export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer

// 3. 将单个Redux注入全局桶
// ====== store/index.js
import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux";
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import counterReducer from './counterSlice'

const reducers = combineReducers({
  counter: counterReducer,
});
const persistConfig = {
  key: 'root',
  storage
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
});
export default store;
```

将 store 注入全局组件中

```jsx
// ====== src/index.js             // 入口文件
import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
// React-redux
import { Provider } from 'react-redux'
import store from './store'
// 持久化：本质还是把store存到 local Storage 里面
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

const root = createRoot(document.getElementById('root'))
// 持久化
let persistor = persistStore(store)
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* ... */}
    </PersistGate>
  </Provider>
)
```

## 六、引入【react-router】

```js
// 1. 安装依赖：
$ yarn add react-router-dom

// 2. 配置route ：类似vue
// ====== src/routes/index.js
import React, { lazy } from "react";
// 懒加载路由
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/about/About'));
const routes = [
  {
    key: 'index',
    path: '/',
    element: <Home />
  },
  {
    key: 'home',
    path: '/home',
    element: <Home />
  },
  {
    key: '404',
    path: '/*',
    element: <About />
  },
];
export default routes;

// ====== src/index.js      // 完整的入口文件代码
import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
// React-redux
import { Provider } from 'react-redux'
import store from './store'
// 持久化：本质还是把store存到 local Storage 里面
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
// 全局样式
import '@/assets/scss/index.scss';

// React-router
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import routes from './routes'
// 布局 & 路由页面
import Layout from '@/layout/Layout'
// 全局loading组件
import Loading from '@/components/loading/loading';

const root = createRoot(document.getElementById("root"));
// 路由表配置
const renderRoutes = (routes) => {
    return routes.map(item => {
        if (item && item.children) {
            return (
                <Route path={item.path} element={item.element} key={item.key}>
                    { renderRoutes(item.children) }
                </Route>
            );
        } else {
            return (
                <Route path={item.path} element={item.element} key={item.key}></Route>
            );
        }
    });
};
// 持久化
let persistor = persistStore(store);
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Suspense fallback={<Loading />}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            { renderRoutes(routes) }
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Suspense>
        </PersistGate>
    </Provider>
);
```

## 七、引入【scss】

```js
// 1. 安装依赖：
$ yarn add sass node-sass@npm:sass

// 2. 文件名调整为： 【.scss】
```

## 八、路径别名配置

```js
// 1. 安装依赖：
$ yarn add @craco/craco

// 2. 根目录下 新建 craco.config.js
const path = require('path')
const pathResolve = (pathUrl) => path.join(__dirname, pathUrl)
module.exports = {
  webpack: {
    // 设置别名
    alias: {
      '@': pathResolve('src'),
      '@assets': pathResolve('src/assets'),
      '@images': pathResolve('src/assets/image'),
      '@components': pathResolve('src/components'),
      '@hooks': pathResolve('src/hooks'),
      '@pages': pathResolve('src/pages'),
      '@utils': pathResolve('src/utils')
    }
  }
}

// 3. 配置package.json -- 与“配置多环境”相结合
"scripts": {
  "serve": "dotenv -e .env.dev craco start",
  "dev": "dotenv -e .env.dev craco start",
  "start": "dotenv -e .env.dev craco start",
  "build": "dotenv -e .env.prod craco build",
  "build:dev": "dotenv -e .env.dev craco build",
  "build:test": "dotenv -e .env.test craco build",
  "test": "craco test",
  "eject": "craco eject"
},
```

参考：<a href="https://github.com/dilanx/craco/blob/master/packages/craco/README.md#configuration-overview" target="_blank">Craco</a><br />

## 九、项目完善： todo

案例源码：<br />
<a href="https://github.com/bobo88/test-actions" target="_blank">React 网站（园博吧）</a><br />
