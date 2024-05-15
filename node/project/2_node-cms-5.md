# 文章管理系统实践（五）

## 五、模型 models：连接数据库

> 用于连接数据库的模型文件 `models/initModel.ts`。

## 1. **导入模块和配置信息:**

```ts
import { Dialect, Sequelize } from 'sequelize'
import DB_INFO from '../config/db'
import { initModels } from './init-models'
```

- 导入了 Sequelize 框架中的 `Dialect` 和 `Sequelize` 类，用于数据库连接和操作。
- 导入了数据库配置信息 `DB_INFO`，存储在 `config/db.ts` 文件中。
- 导入了 `initModels` 函数，用于初始化 Sequelize 模型。

### 1）init-models.ts 文件是 sequelize-auto 自动生成的。

> `sequelize-auto` 是 Sequelize 提供的一个命令行工具，用于根据已存在的数据库表生成 Sequelize 模型。通过这个工具，你可以避免手动编写 Sequelize 模型的过程，特别是在有大量表结构需要映射时。

### 2）生成 init-models.ts 文件的相关命令和文件如下：

首先，在 package.json 里面配置运行命令：ts-node ./utils/sequelizeAutoModel.ts

```json
{
  "name": "node-cms",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "start": "nodemon --exec cross-env NODE_ENV=prod ts-node app.ts --watch .",
    "dev": "pm2 start ecosystem.config.ts",
    "model": "ts-node ./utils/sequelizeAutoModel.ts",
    "apidoc": "apidoc -i routes/ -o apidoc/"
    // ... 略
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "apidoc": "^1.0.3",
    "axios": "^1.4.0",
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "pm2": "^5.3.0",
    "sequelize": "^6.32.0",
    "sequelize-auto": "^0.8.8",
    "ts-node": "^10.9.1",
    "validator": "^13.0.0"
    // ... 略
  }
  // ... 略
}
```

其次，在 utils 目录中创建 sequelizeAutoModel.ts 文件，内容如下：

```ts
import DB_INFO from '../config/db'
import child_process from 'child_process'

const { exec } = child_process
const modelName = process.argv[2]

const database: { [index: string]: any } = {
  // [required] * 数据库地址
  // host: DB_INFO.host,
  host: 'XXXXX', // XXXXX 表示代指
  // [required] * 数据库名称
  // database: DB_INFO.db_name,
  database: 'XXXXX', // XXXXX 表示代指
  // 数据库用户名
  // user: DB_INFO.username,
  user: 'XXXXX', // XXXXX 表示代指
  // 数据库密码
  pass: 'XXXXX', // XXXXX 表示代指
  // 数据库端口号
  port: 3306,
  // Sequelize的构造函数“options”标记对象的JSON文件路径
  config: '',
  // 输出文件路径
  output: './models',
  // 数据库类型：postgres, mysql, sqlite
  dialect: DB_INFO.dialect,
  // 包含在model的配置参数中define的模型定义的JSON文件路径
  additional: '',
  // 要导出的表名，多个表名逗号分隔，空值就导出所有表模型
  tables: modelName || '',
  // 要跳过的表名，多个表名逗号分隔
  'skip-tables': '',
  // 使用驼峰命名模型和字段
  camel: true,
  // 是否写入文件
  'no-write': false,
  // 从中检索表的数据库架构
  schema: false,
  // 将模型输出为typescript文件
  lang: 'ts',
  // xxx
  define: {
    // underscored: true,
  }
}

let connectShell = 'sequelize-auto'
for (const i in database) {
  const value = database[i]
  if (value) {
    if (value === true) {
      connectShell += ` --${i}`
    } else {
      connectShell += ` --${i} ${value}`
    }
  }
}

exec(connectShell, (err, stdout, stderr) => {
  console.log(`stderr: ${stderr}`)
  console.log(`stdout: ${stdout}`)
  if (err) {
    console.log(`exec error: ${err}`)
  }
})
```

最后，运行`yarn model`后就会自动在`models`目录中生成`init-models.ts`，代码如下所示：

```ts
import type { Sequelize } from 'sequelize'
import { yb_cms_arctype as _yb_cms_arctype } from './yb_cms_arctype'
import type {
  yb_cms_arctypeAttributes,
  yb_cms_arctypeCreationAttributes
} from './yb_cms_arctype'
// ... 略

export {
  _yb_cms_arctype as yb_cms_arctype
  // ... 略
}

export type {
  yb_cms_arctypeAttributes
  // ... 略
}

export function initModels(sequelize: Sequelize) {
  const yb_cms_arctype = _yb_cms_arctype.initModel(sequelize)
  // ... 略

  return {
    yb_cms_arctype: yb_cms_arctype
    // ... 略
  }
}
```

## 2. **创建 Sequelize 实例:**

```ts
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
```

- 使用 `new Sequelize` 创建 Sequelize 实例，传入数据库名称、用户名、密码以及连接配置信息（主机、端口、数据库方言）。
- 方言（`dialect`）是指数据库类型，根据配置文件中的 `DB_INFO.dialect` 来确定。

## 3. **初始化模型:**

```ts
var models = initModels(sequelizeModel)
```

- 使用 `initModels` 函数初始化 Sequelize 模型，传入前面创建的 Sequelize 实例。
- 这个函数返回一个包含所有模型的对象，其中每个模型对应数据库中的一张表。

## 4. **导出模型实例:**

```ts
export default models
```

- 导出初始化后的模型实例，以便在其他文件中引用。

## 5. **代码片段（整合版）:**

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
