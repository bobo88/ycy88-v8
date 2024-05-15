# 文章管理系统实践（三）

## 三、Controller：设置控制器文件

> 举例：栏目管理模块的控制器文件 `controllers/ArctypeController.ts`，包含了各种处理栏目相关业务逻辑的控制器方法，这些控制器方法被「具体路由配置文件（比如：routes/arctype.route.ts）」所引入和使用。

## 1. **导入模块和服务实例:**

```ts
import url from 'url'
import arctypeServicesInstance from '../services/ArctypeService'
```

- 导入了 `url` 模块，用于处理 URL 相关操作。
- 导入了 `ArctypeService` 的服务实例 `arctypeServicesInstance`，用于调用栏目管理相关的业务逻辑。

## 2. **栏目新增:**

```ts
export const cCreateArctype = (req: any, res: any, next: any) => {
  // ...
}
```

- 定义了栏目新增的控制器方法 `cCreateArctype`，该方法处理栏目新增的业务逻辑。

## 3. **栏目删除:**

```ts
export const cDeleteArctype = (req: any, res: any, next: any) => {
  // ...
}
```

- 定义了栏目删除的控制器方法 `cDeleteArctype`，该方法处理栏目删除的业务逻辑。

## 4. **栏目更新:**

```ts
export const cUpdateArctype = (req: any, res: any, next: any) => {
  // ...
}
```

- 定义了栏目更新的控制器方法 `cUpdateArctype`，该方法处理栏目更新的业务逻辑，包括判断必填参数是否漏传。

## 5. **栏目列表-分页:**

```ts
export const cGetArctypeList = (req: any, res: any, next: any) => {
  // ...
}
```

- 定义了获取栏目列表（分页）的控制器方法 `cGetArctypeList`，该方法处理获取栏目列表的业务逻辑。

## 6. **栏目列表-所有:**

```ts
export const cGetArctypeListAll = (req: any, res: any, next: any) => {
  // ...
}
```

- 定义了获取所有栏目列表的控制器方法 `cGetArctypeListAll`，该方法处理获取所有栏目列表的业务逻辑。

## 7. **栏目详情:**

```ts
export const cDetailArctype = (req: any, res: any, next: any) => {
  // ...
}
```

- 定义了获取栏目详情的控制器方法 `cDetailArctype`，该方法处理获取栏目详情的业务逻辑。

## 8. **栏目字典:**

```ts
export const cDictArctype = (req: any, res: any, next: any) => {
  // ...
}
```

- 定义了获取栏目字典的控制器方法 `cDictArctype`，该方法处理获取栏目字典的业务逻辑。

## 9. **代码片段（整合版）:**

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
