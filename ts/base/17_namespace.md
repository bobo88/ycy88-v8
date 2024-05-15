# TS 高级 - 命名空间

::: warning 注意
组织代码的方式，推荐使用模块（module），而不是命名空间（namespace）。
:::

命名空间是一种在 TypeScript 中组织代码的机制，它允许开发者将代码划分为具有独立作用域的模块，以避免全局作用域的污染。通过使用命名空间，你可以将相关的变量、函数和类组织在一起，形成一个逻辑上的单元。

## 命名空间

## 一、基本语法

```typescript
namespace MyNamespace {
  export const myVariable: number = 10

  export function myFunction() {
    console.log('Hello from MyNamespace!')
  }

  export class MyClass {
    // 类的实现
  }
}
```

- `namespace` 关键字用于声明一个命名空间，这里是 `MyNamespace`。
- `export` 关键字用于将成员暴露给命名空间外部，使其可以被访问。

## 二、使用命名空间的成员

```typescript
console.log(MyNamespace.myVariable) // 访问变量
MyNamespace.myFunction() // 调用函数

const myInstance = new MyNamespace.MyClass() // 使用类
```

- 使用命名空间的成员时，需要使用命名空间的名称作为前缀。
- 如果没有使用 `export`，则默认为私有，无法在命名空间外部访问。

## 注意：命名空间 vs 模块

命名空间（Namespace）和模块（Module）是 TypeScript 中用于组织和封装代码的两种不同的机制。它们有一些关键的区别：

## 1. 范围（Scope）

- **命名空间：** 命名空间创建了一个封闭的作用域，它在全局命名空间中创建一个含有命名空间内部定义的变量、函数、类等的容器。命名空间的成员在命名空间外部不可见，需要使用命名空间的名称进行访问。

  ```typescript
  namespace MyNamespace {
    export const myVariable: number = 10
  }

  console.log(MyNamespace.myVariable) // 访问命名空间中的变量
  ```

- **模块：** 模块是具有自己作用域的文件，模块中定义的变量、函数、类等默认是私有的，除非使用 `export` 明确地将它们暴露出去。模块的成员需要使用 `import` 关键字进行引入才能在其他文件中访问。

  ```typescript
  // MyModule.ts
  export const myVariable: number = 10

  // AnotherModule.ts
  import { myVariable } from './MyModule'
  console.log(myVariable) // 访问模块中的变量
  ```

## 2. 文件关联

- **命名空间：** 命名空间的定义可以跨越多个文件，通过多个文件中的命名空间合并成一个。每个文件中的命名空间都会在全局命名空间中添加新的定义。

  ```typescript
  // File1.ts
  namespace MyNamespace {
    export const myVariable: number = 10
  }

  // File2.ts
  namespace MyNamespace {
    export function myFunction() {
      console.log('Hello from MyNamespace!')
    }
  }

  // 使用合并后的命名空间
  MyNamespace.myFunction()
  ```

- **模块：** 每个文件都是一个模块，模块之间的关联需要使用 `import/export` 明确指定依赖关系。模块之间的关联是显式的，可以更好地控制文件之间的依赖关系。

  ```typescript
  // MyModule.ts
  export const myVariable: number = 10

  // AnotherModule.ts
  import { myVariable } from './MyModule'
  console.log(myVariable)
  ```

## 3. 兼容性和推荐性

- **命名空间：** 命名空间主要是为了在 TypeScript 中模拟模块化系统，但在现代 TypeScript 中，推荐使用模块来组织代码。命名空间在大型项目中可能引起命名冲突，而且它的模块化能力相对较弱。

- **模块：** 模块是推荐的组织代码的方式，特别是在大型项目中。它提供了更好的封装性、可维护性和可扩展性，同时更符合 JavaScript 社区广泛采用的 ES6 模块标准。

总体而言，随着 JavaScript 的发展，模块已经成为主流的组织和封装代码的方式，而命名空间主要用于向后兼容旧有的代码或在一些特殊场景中使用。在新的 TypeScript 项目中，建议使用模块。
