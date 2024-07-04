# 实践：如何管理 `*.d.ts` 文件

管理 TypeScript 项目中的 `.d.ts` 文件是确保类型安全和代码可维护性的关键。

::: tip 🔔 提示
一般有两种方式来管理 `*.d.ts` 文件：

1. 所有 `*.d.ts` 文件都放在 `src/types` 目录下
2. 每个模块都单独管理自己的 `*.d.ts` 文件，全局的类型声明放在 `global.d.ts` 文件中

:::

## 1. 项目结构

组织 `.d.ts` 文件的目录结构，使其易于查找和维护。一个常见的做法是在 `types` 或 `@types` 目录下按模块或功能划分：

```
/src
  /components
  /services
  /models
  /controllers
  /utils
  /config
  /tests
  /types
    /components
      Button.d.ts
      Form.d.ts
    /services
      ApiService.d.ts
      UserService.d.ts
    /models
      User.d.ts
      Product.d.ts
    /global.d.ts
  index.ts
```

## 2. 全局类型声明

将全局类型声明放在单独的 `global.d.ts` 文件中，以便项目中的任何部分都可以访问这些类型：

```typescript
// types/global.d.ts
declare namespace MyApp {
  interface Config {
    apiUrl: string
    port: number
  }

  interface User {
    id: number
    name: string
    email: string
  }
}
```

## 3. 模块化类型声明

对于特定模块的类型声明，使用模块导出和导入的方式进行管理：

```typescript
// types/models/User.d.ts
export interface User {
  id: number
  name: string
  email: string
}

// types/models/Product.d.ts
export interface Product {
  id: number
  name: string
  price: number
}
```

在代码中导入使用：

```typescript
// services/userService.ts
import { User } from '../types/models/User'

export class UserService {
  getUser(): User {
    return { id: 1, name: 'John Doe', email: 'john@example.com' }
  }
}
```

## 4. 使用第三方类型定义

安装并使用第三方库的类型定义文件（如 `@types`），并将其放在 `devDependencies` 中：

```bash
npm install @types/lodash --save-dev
```

在代码中使用：

```typescript
import * as _ from 'lodash'

const arr: number[] = [1, 2, 3]
const doubled = _.map(arr, (num) => num * 2)
```

## 5. 自定义类型定义

为自定义的库或外部依赖创建类型定义文件，并将这些文件放在 `types` 目录下。可以使用 `declare module` 来声明这些模块：

```typescript
// types/customLibrary.d.ts
declare module 'customLibrary' {
  export function customFunction(param: string): void
}
```

在代码中使用：

```typescript
import { customFunction } from 'customLibrary'

customFunction('test')
```

## 6. 类型合并

使用 TypeScript 的类型合并功能，扩展现有类型定义：

```typescript
// types/models/ExtendedUser.d.ts
import { User } from './User'

export interface ExtendedUser extends User {
  address: string
  phone: string
}
```

## 7. 自动生成声明文件

使用 TypeScript 编译器自动生成声明文件，确保声明文件与实现保持同步：

```bash
# 使用 TypeScript 编译器生成声明文件
tsc --declaration --emitDeclarationOnly
```

在 `tsconfig.json` 中配置生成声明文件的选项：

```json
{
  "compilerOptions": {
    "declaration": true,
    "emitDeclarationOnly": true,
    "outDir": "./types"
  }
}
```

## 8. 版本控制

将 `.d.ts` 文件纳入版本控制系统，并与代码库一起维护。确保在提交代码时，更新相应的类型声明文件。

## 9. 静态分析和代码质量

使用 `ESLint` 和 `TSLint` 等工具进行静态分析，确保类型声明文件的质量和一致性：

```bash
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
```

配置 `.eslintrc.json` 文件：

```json
{
  "parser": "@typescript-eslint/parser",
  "extends": ["plugin:@typescript-eslint/recommended"],
  "rules": {
    "@typescript-eslint/explicit-function-return-type": "off"
  }
}
```

## 总结

有效管理 `.d.ts` 文件，能提高 TypeScript 项目的类型安全性和可维护性。通过清晰的项目结构、模块化的类型声明、全局类型声明、自定义类型定义、自动生成声明文件、版本控制和静态分析，可以确保类型声明文件的质量和一致性。这些最佳实践将帮助你在大型 TypeScript 项目中更好地管理和使用类型声明文件。
