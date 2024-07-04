# 简述 Typescript 的原理本质

![TS](/images/ts/ts-js.jpg)

<!-- 我认为，**存在即合理**，至少在「存在」的当时情境下，是合理的。 -->

Typescript 的出现和存在，它的合理性又是什么？它的作用是什么？或者说它到底解决了什么问题？

_众所周知，JS 是一门弱类型语言，而我们今天要讲的 Typescript 则是基于 JS 做了增强（超集）并具有强类型的特性。但是 Typescript 不是一门全新的语言，更不是所谓的强类型语言。_

> 类型系统、语言增强 ==> （编译） ==> JS。

Typescript = Type + Javascript。

## 一、静态类型检查

> 静态类型检查指的是在 **编译阶段** 对代码进行类型检查，而不是在运行时。编译器会在编译代码时根据类型规则检查代码的每一部分，并报告类型不匹配的错误。

_TypeScript 的静态类型检查通过在编译阶段对代码进行类型验证，提供了更高的代码安全性、可维护性和开发效率。它帮助开发者在开发过程中及早发现错误，并提供强大的工具支持，从而提高整个开发过程的可靠性和效率。_

## 二、生成文档

> TypeScript 通过结合 TSDoc 标准和 TypeDoc 工具，可以方便地生成详细的 API 文档。开发者只需在代码中使用标准化的注释，然后使用 TypeDoc 工具解析注释并生成文档。这种方式不仅提高了代码的可读性和可维护性，还能够自动化生成文档，减轻了手动维护文档的负担。

### 1. 使用 TSDoc

**TSDoc** 是一个用于编写 TypeScript 注释的标准。通过标准化注释，工具可以解析注释并生成相应的文档。

```typescript
/**
 * Adds two numbers together.
 *
 * @param a - The first number.
 * @param b - The second number.
 * @returns The sum of `a` and `b`.
 */
function add(a: number, b: number): number {
  return a + b
}
```

在上面的例子中，注释使用了 TSDoc 的语法，包含了函数的描述、参数说明以及返回值说明。

### 2. 使用 TypeDoc

**TypeDoc** 是一个流行的 TypeScript 文档生成器，可以解析 TypeScript 源代码中的注释并生成 HTML 文档。

**安装 TypeDoc**：

```bash
npm install typedoc --save-dev
```

**配置 TypeDoc**：

创建一个 `typedoc.json` 配置文件：

```json
{
  "entryPoints": ["src/index.ts"],
  "out": "docs"
}
```

**生成文档**：

```bash
npx typedoc
```

TypeDoc 会根据配置文件中的入口文件生成文档并输出到指定目录。

### 3. 示例

以下是一个完整的示例：

**项目结构**：

```
/my-project
  /src
    /index.ts
  /docs
  typedoc.json
  package.json
```

**src/index.ts**：

```typescript
/**
 * Represents a person.
 */
interface Person {
  /**
   * The person's name.
   */
  name: string

  /**
   * The person's age.
   */
  age: number
}

/**
 * Greets a person.
 *
 * @param person - The person to greet.
 * @returns A greeting message.
 */
function greet(person: Person): string {
  return `Hello, ${person.name}!`
}
```

**typedoc.json**：

```json
{
  "entryPoints": ["src/index.ts"],
  "out": "docs"
}
```

**package.json**：

```json
{
  "scripts": {
    "doc": "typedoc --options typedoc.json"
  },
  "devDependencies": {
    "typedoc": "^0.22.0"
  },
  "dependencies": {
    "typescript": "^5.5.3"
  }
}
```

> 记得要安装 `typescript`。

**生成文档**：

在项目根目录下运行以下命令：

```bash
npm run doc
```

TypeDoc 会读取 `typedoc.json` 配置文件，并根据 `src/index.ts` 文件中的注释生成 HTML 文档，输出到 `docs` 目录。

![TS](/images/ts/ts-doc-build.png)

![TS](/images/ts/ts-doc.png)

## 三、如何架构设计

> 管理 `TypeScript` 项目中的 `.d.ts` 文件是确保类型安全和代码可维护性的关键。组织 `.d.ts` 文件的目录结构，使其易于查找和维护。一个常见的做法是在 `types` 或 `@types` 目录下按模块或功能划分。

_详情可以参考【实践：如何管理 \*.d.ts 文件】_

```bash
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

## 四、TypeScript 编译器的工作流程

### 1）TypeScript 编译器的工作流程

1. **Scanner 扫描器**（词法分析，生成 Token 流）

   - 任务：将源代码文本转换为一系列 Token（词法单元）。
   - 具体步骤：读取源代码的字符流，识别出有意义的词法单元（如关键字、标识符、操作符、数字、字符串等），并生成 Token 流。
   - 结果：Token 流是语法分析器（Parser）进一步处理的基础。

2. **Parser 解析器**（生成 AST）

   - 任务：将 Token 流转换为抽象语法树（AST）。
   - 具体步骤：根据语言的语法规则，解析 Token 流，构建出对应的 AST 结构。AST 是代码的树状表示形式，节点表示语法元素（如表达式、语句、声明等）。
   - 结果：AST 是后续编译阶段（如语义分析、类型检查等）的基础。

3. **Binder 绑定器**（创建 Symbol，关联 AST，形成语义）

   - 任务：为 AST 中的各个节点创建符号（Symbol）并建立关联，进行初步的语义分析。
   - 具体步骤：遍历 AST，创建符号表（Symbol Table），为每个标识符（如变量、函数、类等）分配一个符号，并建立符号与 AST 节点之间的关联。
   - 结果：符号表和 AST 节点关联，为后续的类型检查提供基础。

4. **Checker 检查器**（类型检查）

   - 任务：对 AST 进行类型检查，确保代码的类型安全性。
   - 具体步骤：使用符号表和类型系统，检查 AST 中的每个节点是否符合类型规则，标记类型不匹配的错误。
   - 结果：类型检查确保代码在类型方面的正确性，减少运行时错误。

5. **Emitter 发射器**（输出编译后的文件）
   - 任务：将 AST 转换为目标代码（通常是 JavaScript），并生成输出文件。
   - 具体步骤：遍历 AST，根据目标语言的语法规则生成对应的代码，并输出到文件中。这个阶段还可能进行一些优化，如删除无用的代码。
   - 结果：生成的目标代码文件（通常是 JavaScript 文件）可以在目标环境中运行（如浏览器、Node.js 等）。

### 2）具体代码示例

下面是一个简单的 TypeScript 代码示例及其编译流程概述：

#### TypeScript 代码示例

```typescript
let x: number = 10
x = 'hello' // 类型错误
```

#### 编译流程

1. **Scanner**：

   - 输入：`let x: number = 10; x = "hello";`
   - 输出：Token 流（`[let, x, :, number, =, 10, ;, x, =, "hello", ;]`）

2. **Parser**：

   - 输入：Token 流
   - 输出：AST
     ```
     Program
     ├── VariableStatement
     │   ├── VariableDeclaration
     │   │   ├── Identifier (x)
     │   │   ├── TypeAnnotation (number)
     │   │   └── NumericLiteral (10)
     └── ExpressionStatement
         └── AssignmentExpression
             ├── Identifier (x)
             └── StringLiteral ("hello")
     ```

3. **Binder**：

   - 输入：AST
   - 输出：符号表和关联的 AST
     ```
     Symbol Table
     ├── x: number
     ```

4. **Checker**：

   - 输入：AST 和符号表
   - 输出：类型检查结果
     - 错误：`Type 'string' is not assignable to type 'number'.`

5. **Emitter**：
   - 输入：通过类型检查的 AST
   - 输出：JavaScript 代码
     ```javascript
     var x = 10
     x = 'hello' // 编译器会标记错误，但仍然生成 JavaScript 代码
     ```

![TS](/images/ts/ts-ast.png)

---

- [https://ts-ast-viewer.com/#](https://ts-ast-viewer.com/#)
- [https://radixweb.com/blog/typescript-vs-javascript](https://radixweb.com/blog/typescript-vs-javascript)
