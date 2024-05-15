# Node 系列之 Fastify

::: tip 简介
Fastify 是一个专注于高性能和低开销的 Node.js Web 框架，采用框架化设计和强大插件系统，适用于构建快速、可维护的现代 Web 服务。
:::

## 一、Fastify 简介

**Fastify** 是一个为构建高性能的 Web 服务而设计的 Node.js 框架。它具有以下主要特点：

### 主要特点：

- 高性能： Fastify 被设计为当前最快的 Node.js 框架之一，具有低开销和快速的请求响应时间。
- 低开销： Fastify 通过最小化框架本身的开销来提高性能，使其在处理请求时更加高效。
- 框架化： Fastify 使用 JSON Schema 来验证请求和响应，强调明确的输入输出约定，提高了代码的可读性和可维护性。
- 插件支持： Fastify 提供了强大的插件系统，使得开发者能够轻松地扩展框架的功能。
- 支持异步： 支持异步请求处理，能够有效利用 Node.js 的异步特性。
- HTTP2 和 WebSocket： Fastify 支持 HTTP2 和 WebSocket，适用于构建现代的、实时性要求高的 Web 服务。

## 二、Fastify 使用示例：

### 1. 安装 Fastify：

使用 npm 安装 Fastify：

```bash
$ npm install fastify
```

### 2. 创建 Fastify 应用：

```javascript
// app.js
const fastify = require('fastify')({ logger: true })

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

fastify.listen(3000, '0.0.0.0', (err, address) => {
  if (err) throw err
  console.log(`Server listening on ${address}`)
})
```

### 3. 运行 Fastify 应用：

```bash
$ node app.js
```

现在，你可以访问 http://localhost:3000 查看你的 Fastify 应用。

## 三、结语

Fastify 是一个专注于性能和低开销的 Node.js 框架，通过采用框架化的设计和强大的插件系统，使得开发者能够构建高效、可维护的 Web 服务。如果你关注性能，并希望在 Web 服务中使用现代特性，Fastify 是一个值得考虑的选择。

---

- [https://www.fastify.cn/](https://www.fastify.cn/)
