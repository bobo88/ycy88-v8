# Next 搭建 SSR 网站

[访问具体案例](https://ycy88.com/)

## 一、为什么选择 Next.js

| **功能**                  | 描述                                                                 |
| ------------------------- | -------------------------------------------------------------------- |
| **零配置**                | 自动编译并打包。从一开始就为生产环境而优化。                         |
| **混合模式： SSG 和 SSR** | 在一个项目中同时支持构建时预渲染页面（SSG）和请求时渲染页面（SSR）。 |
| **增量静态生成**          | 在构建之后以增量的方式添加并更新静态预渲染的页面。                   |
| **支持 TypeScript**       | 自动配置并编译 TypeScript。                                          |
| **快速刷新**              | 快速、可靠的实时编辑体验，已在 Facebook 级别的应用上规模上得到验证。 |
| **基于文件系统的路由**    | 每个 pages 目录下的组件都是一条路由。                                |
| **API 路由**              | 创建 API 端点（可选）以提供后端功能。                                |
| **内置支持 CSS**          | 使用 CSS 模块创建组件级的样式。内置对 Sass 的支持。                  |
| **代码拆分和打包**        | 采用由 Google Chrome 小组创建的、并经过优化的打包和拆分算法。        |

## 二、构建项目

> 创建一个 Next.js 应用

```bash
npx create-next-app nextjs-blog

cd nextjs-blog

yarn dev
```

::: warning Node 版本
注意：运行 nextjs 项目，node 版本需要大于 **v18.17.0**。
:::

![An image](/images/react/nextjs-1.png)

![An image](/images/react/nextjs-2.png)

![An image](/images/react/nextjs-3.png)

## 三、具体操作

> Next.js 13 的更新，你可以选择使用 `app` 目录或传统的 `pages` 目录来组织你的页面。

::: tip 目录结构
使用 `app` 目录。
:::

### 1）目录结构示例

#### 使用 `app` 目录结构：

```
my-next-app/
├── app/
│   ├── page.tsx
│   ├── about/
│   │   └── page.tsx
│   └── layout.tsx
├── public/
├── styles/
├── next.config.js
└── package.json
```

#### 使用 `pages` 目录结构：

```
my-next-app/
├── pages/
│   ├── index.tsx
│   ├── about.tsx
├── public/
├── styles/
├── next.config.js
└── package.json
```

### 2）新增 `about` 页面

![An image](/images/react/nextjs-4.png)

![An image](/images/react/nextjs-5.png)

#### 步骤

1. **创建 `about` 页面**：

   ```bash
   mkdir -p app/about
   touch app/about/page.tsx
   ```

2. **实现 `about` 页面内容**：

   ```tsx
   // app/about/page.tsx
   import Image from 'next/image'

   export default function About() {
     return (
       <main className="main-box">
         <Image src="/next.svg" width={200} height={200} />

         <h1>About page</h1>
       </main>
     )
   }
   ```

3. **确保布局文件中有导航**：

   ```tsx
   // app/layout.tsx
   import { ReactNode } from 'react'

   const Layout = ({ children }: { children: ReactNode }) => {
     return (
       <html lang="en">
         <body>
           <header>
             <nav>
               <a href="/">Home</a>
               <a href="/about">About</a>
             </nav>
           </header>
           <main>{children}</main>
         </body>
       </html>
     )
   }

   export default Layout
   ```

### 3）引入 Sass

1. **安装 Sass**：

   ```bash
   npm install sass
   ```

2. **创建 Sass 文件**：

   ```bash
   touch styles/global.scss
   ```

3. **在全局样式中使用 Sass**：

   ```scss
   // styles/global.scss
   body {
     font-family: Arial, sans-serif;
     background-color: #f0f0f0;

     h1 {
       color: #333;
     }

     p {
       color: #666;
     }
   }
   ```

4. **在 `app` 入口文件中引入 Sass**：

   ```tsx
   // app/layout.tsx
   import '../styles/global.scss'
   import { ReactNode } from 'react'

   const Layout = ({ children }: { children: ReactNode }) => {
     return (
       <html lang="en">
         <body>
           <header>
             <nav>
               <a href="/">Home</a>
               <a href="/about">About</a>
             </nav>
           </header>
           <main>{children}</main>
         </body>
       </html>
     )
   }

   export default Layout
   ```

### 4）API 请求封装

1. **创建 API 服务文件**：

   ```bash
   mkdir -p services
   touch services/api.ts
   ```

2. **实现 API 请求封装**：

   ```ts
   // services/api.ts
   import axios from 'axios'

   const api = axios.create({
     baseURL: 'https://api.example.com',
     timeout: 1000
   })

   export const fetchData = async () => {
     const response = await api.get('/data')
     return response.data
   }
   ```

3. **在页面中使用 API**：

   ```tsx
   // app/page.tsx
   import { FC, useEffect, useState } from 'react'
   import { fetchData } from '../services/api'

   const HomePage: FC = () => {
     const [data, setData] = useState(null)

     useEffect(() => {
       const getData = async () => {
         const result = await fetchData()
         setData(result)
       }

       getData()
     }, [])

     return (
       <div>
         <h1>欢迎来到我的 Next.js 应用</h1>
         {data && <p>数据: {JSON.stringify(data)}</p>}
       </div>
     )
   }

   export default HomePage
   ```

### 5）配置跨域请求（本地）

1. **安装 `http-proxy-middleware` 依赖**：

```bash
 npm install http-proxy-middleware
```

2. **创建 `next.config.js` 文件**：

   ```ts
   // next.config.js
   const { createProxyMiddleware } = require('http-proxy-middleware')

   module.exports = {
     async rewrites() {
       return [
         {
           source: '/api/:path*',
           destination: 'https://www.cnuseful.com/api/:path*' // 后端服务器地址
         }
       ]
     }
   }
   ```

3. **实现 API 请求封装**：

   ```ts
   // services/api.ts
   import axios from 'axios'

   const api = axios.create({
     baseURL: '',
     timeout: 1000
   })

   export const fetchData = async () => {
     const response = await api.get('/api/index/weather')
     return response.data
   }
   ```

4. **在页面中使用 API**：

   ```tsx
   // app/page.tsx
   'use client'

   import Image from 'next/image'
   import { FC, useEffect, useState } from 'react'
   import { fetchData } from '../services/api'

   export default function Home() {
     const [data, setData] = useState(null)

     useEffect(() => {
       const getData = async () => {
         const result = await fetchData()
         setData(result)
       }

       getData()
     }, [])

     return (
       <main className="main-box">
         <Image src="/next.svg" alt="xx" width={200} height={200} />

         <h1>欢迎来到我的 Next.js 应用</h1>

         {data && <p>数据: {JSON.stringify(data)}</p>}
       </main>
     )
   }
   ```

![An image](/images/react/nextjs-6.png)

### 6）打包和部署

1. **打包项目**：

   ```bash
   npm run build
   ```

2. **启动项目**：

   ```bash
   npm start
   ```

3. **部署到 Vercel**（推荐）：

   - 注册 Vercel 账号并安装 Vercel CLI。
   - 在项目根目录运行：
     ```bash
     vercel
     ```
   - 按照提示进行操作，完成项目部署。

4. **其他部署方式**：
   - **静态导出**：
     ```bash
     npm run export
     ```
     生成的静态文件将位于 `out` 目录中。
   - **服务器部署**：
     - 将打包后的项目部署到支持 Node.js 的服务器上，例如 Heroku、DigitalOcean 等。

## 四、注意事项

> 选择：`静态导出`，修改配置，然后重启 `nginx`。

## 五、项目展示

- [你点击我试试 ～ ycy88.com](http://ycy88.com/)。

![An image](/images/react/nextjs-7.png)

![An image](/images/react/nextjs-8.png)

---

- [www.nextjs.cn](https://www.nextjs.cn/)
- [nextjs 英文官网](https://nextjs.org/)
- [Next 网站～ www.trip.com](https://www.trip.com/)
- [document.saasfly.io](https://document.saasfly.io/zh-cn/)
- [https://show.saasfly.io/zh](https://show.saasfly.io/zh)
- [nextui.org](https://nextui.org/)
- [Nextjs 开发优质资源汇总（建议收藏）](https://www.zhouyy.top/article/tailwind)
- [https://www.manfreddemoblog.top/](https://www.manfreddemoblog.top/)
