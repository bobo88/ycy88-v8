# 文章管理系统实践（四）

## 四、Service 服务层：栏目 service

> 举例：栏目管理模块的服务层文件 `services/ArctypeService.ts`，负责处理栏目相关的业务逻辑。

## 1. **导入模块和类:**

```ts
import { Op } from 'sequelize'
import BaseService from './BaseService'
import { sequelizeModel } from '../models/initModel'
import { messages } from '../config/messages'
```

- 导入了 `Op` 对象，该对象包含 Sequelize 操作符，用于执行复杂的查询。
- 导入了 `BaseService` 类，该类提供了一些基础的服务层方法。
- 导入了数据库模型的初始化实例 `sequelizeModel` 和消息配置文件 `messages`。

## 2. **定义 `ArctypeService` 类:**

```ts
class ArctypeService extends BaseService {
  constructor() {
    super('yb_cms_arctype')
  }
  // ...
}
```

- 继承了 `BaseService` 类，使用了构造函数指定了数据库表名。

## 3. **栏目新增:**

```ts
async createArctype(jsonData: any) {
  // ...
}
```

## 4. **代码片段（整合版）：**

### 1）服务层：栏目 service

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

### 2）基础 BaseService

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

## 5. **其他说明:**

- 在 `createArctype` 方法中，使用 Sequelize 的事务处理，确保新增栏目的原子性，防止出现部分操作成功而部分操作失败的情况。
- 在 `detailArctype` 方法中，通过调用 `this.findByPk` 方法查询栏目详情。
- 通过 `this.createResponse` 方法创建响应对象，统一格式的响应结果，方便统一处理和返回。
