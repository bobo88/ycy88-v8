# 文章管理系统实践（二）

## 二、Route：设置路由

路由配置入口文件 `routes/index.ts`，负责汇总不同模块的路由，并将其集成到一个主路由中。

## 1. **导入模块:**

```ts
import express from 'express'
import tagindexRoute from './tagindex.route'
import arctypeRoute from './arctype.route'
import archivesRoute from './archives.route'
import logsRoute from './logs.route'
```

- 导入 Express 模块和其他模块中定义的路由。

## 2. **创建主路由:**

```ts
const router = express.Router()
```

- 使用 `express.Router()` 创建一个主路由实例。

## 3. **定义默认路由:**

```ts
const defaultRoutes = [
  {
    path: '/tagindex',
    route: tagindexRoute
  },
  {
    path: '/arctype',
    route: arctypeRoute
  },
  {
    path: '/archives',
    route: archivesRoute
  },
  {
    path: '/logs',
    route: logsRoute
  }
  // ...略
]
```

- 定义一个包含多个对象的数组，每个对象表示一个模块的路由信息，包括路径 `path` 和对应的路由实例 `route`。

## 4. **集成路由:**

```ts
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})
```

- 使用 `router.use` 方法将每个模块的路由添加到主路由中。这样，每个模块的路由都将以其定义的路径进行挂载，形成整个应用的路由树。

5. **导出主路由:**
   ```ts
   export default router
   ```
   - 导出整个主路由，使其可以在应用的入口文件中被引用和使用。

## 5. 代码片段（整合版）

### 1）route 路由配置入口

```ts
// === （2）routes/index.ts
import express from 'express'
import tagindexRoute from './tagindex.route'
import arctypeRoute from './arctype.route'
import archivesRoute from './archives.route'
import logsRoute from './logs.route'

const router = express.Router()

const defaultRoutes = [
  {
    path: '/tagindex',
    route: tagindexRoute
  },
  // 栏目管理
  {
    path: '/arctype',
    route: arctypeRoute
  },
  // 文章管理
  {
    path: '/archives',
    route: archivesRoute
  },
  // ...略
  // 日志管理
  {
    path: '/logs',
    route: logsRoute
  }
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

export default router
```

### 2）route 具体路由配置

```ts
// === (3) routes/arctype.route.ts
import express from 'express'
import {
  cGetArctypeList,
  cGetArctypeListAll
  // ... 略
} from '../controllers/ArctypeController'

const router = express.Router()

/**
 *
 * @api {post} /arctype/create 栏目新增
 * @apiName addArctype
 * @apiGroup 栏目管理
 *
 * @apiParam  {Number} reid 上级栏目ID，顶级栏目时传0
 * @apiParam  {Number} topid 顶级栏目ID，顶级栏目时传0
 * @apiParam  {String} typename 栏目名称
 * @apiParam  {String} [channeltype] 栏目类型（可选）
 * @apiParam  {Number} sortrank 排序
 * @apiParam  {Number} ishidden 是否隐藏，0：显示，1：隐藏
 * @apiParam  {Number} [ispart]   栏目属性（可选）
 * @apiParam  {String} [seotitle] SEO标题
 * @apiParam  {String} [keywords] 关键词
 * @apiParam  {String} [description] 栏目描述
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {Object} data null
 * @apiSuccess {String} message 信息内容
 *
 */
router.post('/create', cCreateArctype) // 栏目管理-新增

// ... 略
export default router
```
