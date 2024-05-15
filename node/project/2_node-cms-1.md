# 文章管理系统实践（一）

## 一、搭建框架

基于经典的 MVC（Model-View-Controller）设计模式。路由负责请求的导向，控制器处理业务逻辑，服务层提供业务功能，而模型负责数据的定义和数据库的交互。

## 1、设计模式简述

### 1）**Controllers（控制器）:**

- **作用：** 控制器负责处理路由中的业务逻辑，接收请求，调用服务层处理业务，并返回响应给客户端。
- **关联性：** 控制器直接与路由相关联，每个路由对应一个控制器。控制器通过调用服务层中的方法来处理具体的业务逻辑。

### 2）**Models（模型）:**

- **作用：** 模型定义了数据的结构和与数据库的交互方法。它封装了数据的处理和操作。
- **关联性：** 控制器在处理业务逻辑时可能需要调用模型层的方法，以便进行数据库操作或获取特定的数据结构。

### 3）**Routes（路由）:**

- **作用：** 路由定义了路径和 HTTP 方法的映射，将请求从客户端导向相应的控制器。路由起到将请求分发到正确控制器的桥梁作用。
- **关联性：** 路由直接关联控制器，每个路由对应一个控制器。路由负责将请求参数传递给控制器，并将控制器的响应返回给客户端。

### 4）**Services（服务层）:**

- **作用：** 服务层处理业务逻辑、数据操作和第三方服务集成。它提供了通用和复杂的业务功能，被控制器调用以完成特定的业务需求。
- **关联性：** 服务层通常由控制器调用。控制器将请求的数据传递给服务层，服务层处理业务逻辑并可能与模型交互以完成数据操作，最后返回结果给控制器。

关联性的具体示例：

- 路由将请求分派到相应的控制器，控制器根据业务需求可能调用模型或服务层。
- 控制器中可能调用服务层的方法来处理复杂的业务逻辑，如验证用户身份、生成报告等。
- 控制器中可能调用模型的方法来查询数据库，获取数据。

### 流程图

![An image](/images/node/express-cms.png)

## 2、技术选型

### 1）主要技术栈

- Express
- mysql
- sequelize
- axios
- typescript
- log4js

### 2）框架目录结构

```markdown
/my-express-app
|-- .git/ # Git 版本控制文件夹
|-- .gitignore # Git 忽略文件配置
|-- node_modules/ # 包含项目依赖的 Node.js 模块
|-- package.json # 项目的元数据和依赖配置文件
|-- package-lock.json # 记录确切安装的包版本
|-- app.ts # 项目的入口文件，包含 Express 应用程序的初始化和配置
|-- routes/ # 包含路由文件，定义不同路径的路由处理程序
| |-- index.ts # 主页路由处理程序
| |-- users.ts # 用户相关路由处理程序
|-- controllers/ # 包含控制器文件，处理路由中的业务逻辑
| |-- userController.ts # 用户相关业务逻辑控制器
|-- models/ # 包含数据模型文件，定义数据库模型和数据结构
| |-- userModel.ts # 用户数据模型
|-- services/ # 包含服务层代码
| |-- BaseService.ts # 通用服务层基类
|-- views/ # 包含视图文件（如果使用模板引擎）
| |-- index.ejs # 主页视图模板
|-- config/ # 包含配置文件，如数据库连接、环境变量等
| |-- database.ts # 数据库连接配置文件
|-- public/ # 包含公共资源文件，如样式表、客户端脚本、图像等
| |-- styles/ # 样式表文件夹
| | |-- main.css # 主样式表文件
| |-- scripts/ # 客户端脚本文件夹
| | |-- main.ts # 主客户端脚本文件
| |-- images/ # 图像文件夹
| |-- logo.png # 项目 Logo 图像
|-- middlewares/ # 包含自定义中间件文件，处理请求和响应
| |-- authentication.ts # 认证中间件
|-- tests/ # 包含测试文件，用于单元测试和集成测试
| |-- unit/ # 单元测试文件夹
| | |-- userController.test.ts # 用户控制器的单元测试
| |-- integration/ # 集成测试文件夹
| |-- app.test.ts # 应用程序的集成测试
|-- uploads/ # 包含上传的文件
|-- utils/ # 包含实用工具函数或模块
| |-- helper.ts # 实用工具函数文件
|-- logs/ # 包含应用程序生成的日志文件
|-- db/ # 包含数据库脚本，如迁移文件、种子文件等
| |-- migrations/ # 数据库迁移脚本文件夹
| |-- 20240125120000_create_users_table.ts # 创建用户表的迁移脚本
| |-- seeds/ # 数据库种子文件夹
| |-- 20240125120001_seed_users.ts # 用户数据种子文件
```

## 3、代码片段（截取）

### 1）app.ts 入口

```ts
// === （1）app.ts
import express from 'express'
import session from 'express-session'
import requestIp from 'request-ip'
import cookieParser from 'cookie-parser'
import { configureResponseMiddleware } from './middleware/responseMiddleware'

import bodyParser from 'body-parser'
import routes from './routes'
// 添加日志管理
import logger, { requestLoggerMiddleware } from './logger'
import dotenv from 'dotenv'

// 加载并配置dotenv
dotenv.config()

const app = express()

// 设置EJS作为视图引擎
app.set('view engine', 'ejs')

// 设置视图文件夹
app.set('views', __dirname + '/views')

// 配置 express-session 中间件
app.use(
  session({
    secret: 'yzt-cms-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // 设置为 true 时，需要启用 HTTPS
      maxAge: 3600000 // 设置会话过期时间，单位为毫秒
    }
  })
)

// 使用 cookie-parser 中间件
app.use(cookieParser())

// 使用 request-ip 中间件
app.use(requestIp.mw())

app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'))

configureResponseMiddleware(app)

// content-type：application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(requestLoggerMiddleware)

app.use('/', routes)

// 设置apidoc接口文档访问
app.use('/apidoc', express.static('apidoc'))
app.use('/assets', express.static('assets'))

// === 添加全局报错捕获程序，避免因为单个报错导致整个项目无法运行
app.use((err: Error, req: any, res: any, next: any) => {
  // 错误处理逻辑
  console.error(err) // 打印错误信息

  logger.error(`系统服务出现异常: ${err}, ${err.stack}`)

  // 返回合适的错误响应
  res.status(500).json({ code: 500, message: '系统服务出现异常', data: null })
})

// 设置监听端口
const PORT = process.env.PORT || 8082
app.listen(PORT, () => {
  logger.info(`服务器运行端口： ${PORT}.`)
  console.log(`服务器运行端口： ${PORT}.`)
})
```

### 2）route 路由配置入口

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

### 3）route 具体路由配置

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

### 4）控制器

```ts
// === (4) controllers/ArctypeController.ts
import url from 'url'
import arctypeServicesInstance from '../services/ArctypeService'

// 栏目新增
export const cCreateArctype = (req: any, res: any, next: any) => {
  // ...
}

// 栏目删除
export const cDeleteArctype = (req: any, res: any, next: any) => {
  // ...
}

// 栏目更新
export const cUpdateArctype = (req: any, res: any, next: any) => {
  // 判断必填参数是否漏传
  let { id, typename } = req.body
  if (!id) {
    return res.error(400, 'Invalid parameters. id参数必传.')
  }
  if (!typename) {
    return res.error(400, 'typename参数必传')
  }
  arctypeServicesInstance
    .updateArctype(req.body)
    .then((result: any) => {
      res.status(result.code).json(result || [])
    })
    .catch((error: any) => {
      console.log('Error:', error)
      // 处理其他可能的错误情况
      next(error)
    })
}

// 栏目列表-分页
export const cGetArctypeList = (req: any, res: any, next: any) => {
  // ...
}

// 栏目列表-所有
export const cGetArctypeListAll = (req: any, res: any, next: any) => {
  // ...
}

// 栏目详情
export const cDetailArctype = (req: any, res: any, next: any) => {
  // ...
}
// 栏目字典
export const cDictArctype = (req: any, res: any, next: any) => {
  arctypeServicesInstance
    .dictArctype()
    .then((result: any) => {
      res.status(result.code).json(result || [])
    })
    .catch((error: any) => {
      console.log('Error:', error)
      // 处理其他可能的错误情况
      next(error)
    })
}
```

### 5）服务层：栏目 service

```ts
// === (5) services/ArctypeService.ts
import { Op } from 'sequelize'
import BaseService from './BaseService'
import { sequelizeModel } from '../models/initModel'
import { messages } from '../config/messages'

class ArctypeService extends BaseService {
  constructor() {
    super('yb_cms_arctype')
  }
  // 数据格式化成树状结构关系
  formatArcTypeList(list: any) {
    const map: any = {}
    const roots: any = []

    // 将所有栏目对象添加到map对象中
    for (const item of list) {
      item.children = []
      map[item.id] = item
    }

    // 将子栏目对象添加到父栏目对象的children数组中
    for (const item of list) {
      const parent = map[item.reid]
      if (parent) {
        parent.children.push(item)
      } else {
        roots.push(item)
      }
    }

    return roots
  }
  // 递归遍历栏目嵌套关系
  filterRelatedItems(a: [], b: []) {
    const result: any = []
    function findRelatedItems(item: any) {
      result.push(item)
      const children = a.filter((child: any) => child.reid === item.id)
      children.forEach((child) => findRelatedItems(child))
    }
    b.forEach((item) => findRelatedItems(item))
    return result
  }

  // 栏目新增
  async createArctype(jsonData: any) {
    // 顶级ID处理
    if (jsonData.topid === 0 && jsonData.reid > 0) {
      jsonData.topid = jsonData.reid
    }
    const transaction = await sequelizeModel.transaction()
    try {
      const res: number = await this.create(jsonData, { transaction })
      // 提交事务
      await transaction.commit()
      // res: 0 表示没有记录被删除，1 表示成功删除一条记录
      if (res) {
        return this.createResponse(200, messages[200], {})
      } else {
        return this.createResponse(200, messages.notFoundItem, {})
      }
    } catch (error) {
      // 回滚事务
      if (transaction) {
        await transaction.rollback()
      }
      // 处理其他可能的错误情况
      return this.createResponse(500, messages[500], null)
    }
  }

  // 栏目删除
  async deleteArctype(id: Array<any>) {
    // ...
  }

  // 栏目更新
  async updateArctype(jsonData: any) {
    // ...
  }

  // 获取栏目-默认查询状态为显示状态
  async getList(req: any) {
    // ...
  }

  // 获取栏目列表 - 条件查询
  async getListAll(req: any) {
    // ...
  }

  // 栏目详情
  async detailArctype(id: any) {
    try {
      const result: number = await this.findByPk(id, {
        // transaction,
      })
      // 成功时返回响应对象
      return this.createResponse(200, messages[200], result)
    } catch (error) {
      // 处理其他可能的错误情况
      return this.createResponse(500, messages[500], null)
    }
  }

  async dictArctype() {
    // ...
  }
}

export default new ArctypeService()
```

### 6）基础 BaseService

```ts
// === (6) services/BaseService.ts
import { Model } from 'sequelize'
import { Attributes, FindOptions, Identifier } from 'sequelize/types/model'
// models管理
import initModels from '../models/initModel'

// 封装统一的返回结构体
class Response {
  constructor(public code: number, public message: string, public data: any) {}
}

// 抽象类
abstract class BaseService {
  model: any
  modelName: string

  constructor(modelName: string) {
    this.modelName = modelName
    this.model = initModels[this.modelName as keyof typeof initModels]
  }

  protected createResponse(code: number, message: string, data: any): Response {
    return new Response(code, message, data)
  }

  // 保存
  save(options?: any) {
    return this.model.save(options)
  }
  // 新增
  create(values?: any, options?: any) {
    return this.model.create(values, options)
  }
  bulkCreate(records: any, options?: any) {
    return this.model.bulkCreate(records, options)
  }
  // 查询数据库中符合条件的所有记录
  findAll<M extends Model>(options?: FindOptions<Attributes<M>>): Promise<M[]> {
    return this.model.findAll(options)
  }
  // 查询
  findAndCountAll<M extends Model>(
    options?: FindOptions<Attributes<M>>
  ): Promise<M[]> {
    return this.model.findAndCountAll(options)
  }

  // 根据主键（Primary Key）查找单个模型实例
  findByPk(identifier: Identifier, options?: any) {
    return this.model.findByPk(identifier, options)
  }

  // T
  findOne(options?: any) {
    return this.model.findOne(options)
  }

  // 更新数据库中已有记录
  update(values: any, options: any) {
    return this.model.update(values, options)
  }
  // 更新
  bulkUpdate(values: any, options: any) {
    return this.model.bulkUpdate(values, options)
  }

  // 删除数据库中记录
  destroy(options?: any) {
    return this.model.destroy(options)
  }

  max(field: any, options?: any): any {
    return this.model.max(field, options)
  }

  // ... TODO
}

export default BaseService
```

### 7）模型 models：连接数据库

```ts
// === (7) models/initModel.ts
import { Dialect, Sequelize } from 'sequelize'
import DB_INFO from '../config/db'
import { initModels } from './init-models'

export const sequelizeModel = new Sequelize(
  DB_INFO.db_name,
  DB_INFO.username,
  DB_INFO.password,
  {
    host: DB_INFO.host,
    port: DB_INFO.port,
    dialect: DB_INFO.dialect as Dialect
  }
)

var models = initModels(sequelizeModel)

export default models
```

## 4、参考资料

> dede cms

---

- [Egg — 企业级 Node.js 框架实践，解析 web 应用服务端特性](https://ainyi.com/128)
- [koa 框架(二) mvc 模式及实现一个 koa 框架的 web 服务](https://blog.csdn.net/weixin_44178305/article/details/127954698)
- [干货！一篇能带你搞懂前端 Nest.js 核心原理的文章](https://juejin.cn/post/7118642542475739172)
