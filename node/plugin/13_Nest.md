# Node 系列之 Nest

::: tip 简介
Nest.js 是一个基于 TypeScript 的模块化、可伸缩的 Node.js 框架，旨在构建高效、可维护的服务器端应用程序。
:::

## 一、Nest.js 简介

**Nest.js** 是一个用于构建高效、可扩展的服务器端应用程序的框架，它基于 TypeScript（也支持 JavaScript）并借鉴了 Angular 的一些设计理念。Nest.js 旨在提供一种结构良好且模块化的方法，使得开发者能够构建可维护的后端应用。

### 主要特点：

- 模块化： Nest.js 使用模块化的设计，允许开发者将应用拆分为多个模块，每个模块负责一个特定的功能。
- 依赖注入： 借助 TypeScript 的装饰器和依赖注入系统，Nest.js 提供了一种可维护和可测试的方式来组织代码。
- Express.js 兼容： Nest.js 基于 Express.js 构建，因此可以直接使用 Express.js 的中间件和生态系统。
- 可伸缩和灵活： 支持构建大型、高度模块化和可伸缩的应用程序。同时，Nest.js 可以适应不同的应用场景，从小型项目到大型企业级应用。
- 自动化： Nest.js 提供了一些自动化工具，帮助开发者生成代码、模块和其他重复性的任务。
- WebSocket 支持： 内置 WebSocket 支持，方便构建实时应用程序。

## 二、Nest.js 使用示例：

### 1. 安装 Nest.js：

使用 Nest CLI 工具快速创建一个新项目：

```bash
$ npm i -g @nestjs/cli
$ nest new project-name
$ cd project-name
```

### 2. 创建控制器：

```typescript
// src/app.controller.ts
import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello Nest.js!'
  }
}
```

### 3. 创建模块：

```typescript
// src/app.module.ts
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'

@Module({
  controllers: [AppController]
})
export class AppModule {}
```

### 4. 启动应用：

```bash
$ npm run start
```

现在，你可以访问 http://localhost:3000 查看你的 Nest.js 应用。

## 三、结语

Nest.js 提供了一种现代化的、模块化的方式来构建服务器端应用程序，它的设计理念使得开发者能够更加轻松地维护和扩展代码。如果你正在寻找一个强大而又灵活的 Node.js 框架，Nest.js 是一个很值得考虑的选择。

---

- [干货！一篇能带你搞懂前端 Nest.js 核心原理的文章](https://juejin.cn/post/7118642542475739172)
- [浅谈 NestJS 设计思想（分层、IOC、AOP）](https://juejin.cn/post/7192528039945699386?from=search-suggest)
