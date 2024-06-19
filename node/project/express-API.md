# Express 实现需要认证的接口

<!-- ::: tip 整体步骤
1）后端接口：实现热门文章的CURD；
2）
::: -->

> 具体效果查看：[热门文章 🔥](https://ycy88.com/hot)。

## 一、实现热门文章的 CURD

> 使用的是 Express + mysql + sequelize + TS 等，具体可以参考【文章管理系统实践】系列文章。

### 1）app.ts

```ts
import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes'
// 添加日志管理
import log4js, { Logger } from 'log4js'
// 日志配置参数控制
import configLog4js from './config/log4js.json'
import accessLogger from './logger'
import dotenv from 'dotenv'

const app = express()

log4js.configure(configLog4js)
const logger: Logger = log4js.getLogger()

dotenv.config()

// content-type：application/json
app.use(bodyParser.json())

// 日志管理的使用
app.use(log4js.connectLogger(logger, accessLogger.NormalLogger))

app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', routes)
// 简单路由
app.get('/test', (req: any, res: any) => {
  res.json({ message: '欢迎访问node-cms后端服务' })
})

// 设置apidoc接口文档访问
app.use('/apidoc', express.static('apidoc'))

// 设置监听端口
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`服务器运行端口： ${PORT}.`)
})
```

### 2）routes 目录

```
├── routes
│   ├── index.ts
│   └── hot.route.ts
```

```ts
// index.ts
import express from 'express'
import hotRoute from './hot.route'

const router = express.Router()

const defaultRoutes = [
  {
    path: '/hot',
    route: hotRoute
  }
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

export default router
```

```ts
// hot.route.ts
import express from 'express'
import {
  getDepHotController,
  cGetArchivesListAll,
  cDeleteArchives,
  cCreateArchives,
  cUpdateArchives,
  cDetailArchives,
  cArchivesInfo
} from '../controllers/HotController'

const router = express.Router()

router.post('/list', getDepHotController)

router.get('/all', cGetArchivesListAll) // 所有

router.post('/create', cCreateArchives) // 文章新增

router.post('/update', cUpdateArchives)

router.post('/delete', cDeleteArchives) // 文章删除

router.get('/detail', cDetailArchives) // 文章详情

// ... 其他略

export default router
```

### 3）controllers 目录

> 略。参考【文章管理系统实践】系列文章。

### 4）models 目录

> sequelize-auto 自动生成，略。参考【文章管理系统实践】系列文章。

### 5）services 目录

> 略。参考【文章管理系统实践】系列文章。

### 6）VUE3 编写页面，并实现 API 接口联调。

> 略。

::: tip 当前实现效果
1）后端接口：实现热门文章的 CURD；

2）前后端联调：页面可视化实现热门文章的增删改查。
:::

> 截图一：数据库管理
> ![An image](/images/node/hot-1.png)

> 截图二：管理后台 - 热门文章列表
> ![An image](/images/node/hot-2.png)

> 截图三：Apifox - 热门文章 CRUD 验证
> ![An image](/images/node/hot-3.png)

> 截图四：部署后的真实效果
> ![An image](/images/node/hot-4.png)

## 特别注意：风险提示

::: danger 当前实现效果存在风险
文章的 CRUD 初步实现后，有一个较大的风险就是：他人可以通过 Apifox/Postman 等工具，直接调用接口，实现对文章的增删改查操作。

因此，在实现文章的增删改查操作之前，需要先实现登录功能，并使用 token 进行认证。

同时，还需要对 token 进行加密处理，防止被他人破解。
:::

## 二、实现登录接口

### 1）`sequelize-auto` 生成 `users` model 等

> 略。参考【文章管理系统实践】系列文章。

### 2）routes 目录

```
├── routes
│   ├── index.ts
│   ├── hot.route.ts
│   └── common.route.ts
```

> 引入 `common.route.ts`，里面包含「登录」接口。

```ts
// index.ts
import express from 'express'
import hotRoute from './hot.route'
import commonRoute from './common.route'

const router = express.Router()

const defaultRoutes = [
  {
    path: '/hot',
    route: hotRoute
  },
  {
    path: '/common',
    route: commonRoute
  }
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

export default router
```

> `hot.route.ts` 文件具体内容。主要增加 `authMiddleware` 配置（在 `utils` 目录下）。

```ts
// hot.route.ts
import express from 'express'
import authMiddleware from '../utils/authMiddleware'

import {
  getDepHotController,
  cGetArchivesListAll,
  cDeleteArchives,
  cCreateArchives,
  cUpdateArchives,
  cDetailArchives,
  cArchivesInfo
} from '../controllers/HotController'

const router = express.Router()

router.post('/list', getDepHotController)

router.get('/all', cGetArchivesListAll) // 所有

router.post('/create', authMiddleware, cCreateArchives) // 文章新增

router.post('/update', authMiddleware, cUpdateArchives)

router.post('/delete', authMiddleware, cDeleteArchives) // 文章删除

router.get('/detail', cDetailArchives) // 文章详情

router.get('/info', cArchivesInfo) // 文章详情

export default router
```

> `common.route.ts` 文件具体内容。

```ts
// common.route.ts
import express from 'express'
import { cLoginController } from '../controllers/CommonController'

const router = express.Router()

router.post('/login', cLoginController)

export default router
```

### 3）controllers 目录

> CommonController.ts 文件的具体代码。

```ts
import jwt from 'jsonwebtoken'
import { messages } from '../config/messages'
import initModels from '../models/initModel'

// 登录接口
export const cLoginController = async (req: any, res: any) => {
  try {
    // 获取请求体参数
    const { username, password } = req.body

    // 如果用户名和密码能与users表中的数据匹配，则返回登录成功的响应
    // 否则返回登录失败的响应
    // 在数据库中查找用户
    const user = await initModels['users'].findOne({ where: { username } })

    if (!user) {
      return res.status(400).json({
        code: 400,
        message: 'Invalid username or password.',
        data: null
      })
    }

    // 比较密码
    const isMatch = password === user.dataValues.password

    if (!isMatch) {
      return res.status(400).json({
        code: 400,
        message: 'Invalid username or password.',
        data: null
      })
    }

    // 创建 JWT 令牌
    const token = jwt.sign(
      { id: user.dataValues.id, username: user.dataValues.username },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    )

    // 返回成功响应
    res.status(200).json({ code: 200, message: messages[200], data: { token } })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ code: 500, message: messages[500], data: null })
  }
}

// 退出登录接口
export const cLogoutController = async (req: any, res: any) => {
  // todo
}
```

### 4）utils 目录

> authMiddleware.ts 文件的具体代码。

```ts
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) // 替换为你的 JWT 秘钥

    ;(req as any).user = decoded
    next()
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' })
  }
}

export default authMiddleware
```

> 截图一：数据库管理 - users 表
> ![An image](/images/node/hot-5.png)

> 截图二：管理后台 - 登录
> ![An image](/images/node/hot-6.png)

> 截图三：登录返回 token
> ![An image](/images/node/hot-7.png)

## 三、实现需要认证的接口

> 涉及到安全性，所以需要登录认证的接口包括：文章的新增、更新、删除。

## 四、注意事项

### 1）Nginx 代理配置

```bash
# 代理配置
server {
  listen       80;
  server_name admin.ycy88.com;

  location / {
    root   web/admin-ycy88;
    try_files $uri $uri/ /index.html;
    index index.html index.htm;
    add_header Access-Control-Allow-Origin '*';
    add_header Access-Control-Allow-Methods 'GET, POST, PUT, OPTIONS';
    add_header Access-Control-Expose-Headers 'Accept-Ranges, Content-Encoding, Content-Length, Content-Range';
  }

  location /apis/ {
    add_header      Access-Control-Allow-Origin '*';
    add_header      Access-Control-Allow-Headers "Accept, X-Token, Content-Type";
    add_header      Access-Control-Allow-Methods "GET, POST, DELETE, PATCH, PUT, OPTIONS";
    proxy_pass      http://localhost:3000/;
  }

  error_page 404 /index.html;
  location = /index.html {
    root web/admin-ycy88;  # 替换为你的构建文件路径
    internal;
  }

  error_page   500 502 503 504  /50x.html;
  location = /50x.html {
    root   html;
  }
}
```

### 2）http 与 https 的区别

> 注意 ⚠️：API 接口联调过程中，需要注意 https 与 http 是跨域状态（虽然大家都知道这个事情，但可能开发中容易遗漏这个点）。

## 五、待办事项

### 1）登录密码的加密处理

> TODO

目前密码是明文的，需要加密处理。

### 2）token 的生成与验证优化

> TODO
