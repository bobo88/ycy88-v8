# TS 高级 - 模块

在 TypeScript 中，模块是一种组织和封装代码的方式，用于将相关的功能进行划分并提供可重用性。

## 一、模块概念

### 1.1 内部模块（命名空间）

内部模块，也称为命名空间，通过 `namespace` 关键字定义，可用于将代码组织在一个独立的命名空间中，避免全局命名冲突。内部模块的成员需要使用 `export` 关键字显式导出，以供外部访问。

```typescript
// MyNamespace.ts
namespace MyNamespace {
  export function myFunction() {
    console.log('Hello from MyNamespace!')
  }
}

// 使用内部模块的成员
MyNamespace.myFunction()
```

### 1.2 外部模块（模块）

外部模块通过 `module` 关键字（不推荐）或直接使用 ES6 的 `import/export` 语法定义和导出模块。外部模块允许使用文件路径或模块名引入其他模块。

```typescript
// MyModule.ts
module MyModule {
  export function myFunction() {
    console.log('Hello from MyModule!')
  }
}

// 使用外部模块的成员
MyModule.myFunction()
```

## 二、ES6 模块

### 2.1 导出与导入

ES6 模块通过 `export` 导出变量、函数、类等，并使用 `import` 导入其他模块的成员。这种方式更加现代且推荐使用。

```typescript
// MyModule.ts
export const myVariable: number = 10

// AnotherModule.ts
import { myVariable } from './MyModule'
console.log(myVariable) // 输出: 10
```

### 2.2 默认导出

一个模块可以有一个默认导出，通过 `export default` 导出，导入时可以使用不带花括号的方式。

```typescript
// MyModule.ts
const defaultExport: string = 'Default Export'
export default defaultExport

// AnotherModule.ts
import myDefaultExport from './MyModule'
console.log(myDefaultExport) // 输出: Default Export
```

## 三、模块的高级特性

### 3.1 模块路径解析策略

TypeScript 使用模块解析策略来定位和加载模块。解析策略包括相对路径、绝对路径、Node.js 模块解析等。理解模块路径解析有助于正确引入模块。

### 3.2 动态导入

使用 `import()` 函数可以实现动态导入模块，返回一个 Promise，有助于按需加载模块。

```typescript
const modulePath = './MyModule'
import(modulePath).then((myModule) => {
  myModule.myFunction()
})
```

### 3.3 模块别名

使用 `import * as aliasName` 或 `import { member as aliasName }` 可以给导入的模块或成员起别名，提高代码的可读性。

```typescript
import { myFunction as aliasFunction } from './MyModule'
aliasFunction()
```

### 3.4 模块合并

在声明文件中，可以使用 `declare module` 合并多个模块的声明，以提供更好的类型支持。

```typescript
// MyModule.d.ts
declare module 'MyModule' {
  export function myFunction(): void
}

// AnotherModule.ts
import { myFunction } from 'MyModule'
myFunction()
```

总体而言，模块是 TypeScript 中组织和封装代码的重要机制，提高了代码的可维护性和可重用性。在选择模块化方式时，应根据项目需求和代码结构灵活运用内部模块（命名空间）、外部模块（模块）、ES6 模块等语法。
