# Node 系列之 Koa

::: tip
KOA - 基于 Node.js 平台的下一代 web 开发框架，「洋葱模型」。
:::

Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造， 致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。 通过利用 async 函数，Koa 帮你丢弃回调函数，并有力地增强错误处理。 Koa 并没有捆绑任何中间件， 而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序。

::: tip 核心工作

1. 将 node 原生的 req 和 res 封装成一个 context 对象。
2. 基于 async/await 的中间件洋葱模型机制。
   :::

## 一、安装：

1、Koa 依赖 node v7.6.0 或 ES2015 及更高版本和 async 方法支持.

```html
=> 时间节点: 2013年12月ES6 草案发布 2015年6月ES6 正式发布，并且更名为“ECMAScript
2015” 2016年6月ES7 发布，又名“ECMAScript 2016” 2017年6月ES8
发布，又名“ECMAScript 2017” -- ES8新增 async/await 2018年6月ES9
发布，又名“ECMAScript 2018” 2019年6月ES10 发布，又名“ECMAScript 2019”
```

::: tip
=> 时间节点（Node.js):
---- Node.js 7.6.0 2017-02-21
:::

```js
// 2、切换node版本（如果node版本高于此版本则忽略当前命令）
$ nvm install 7

// 3、安装依赖
$ npm i koa

// 4、HelloWorld案例 (my-koa-app.js)：
const Koa = require('koa');
const app = new Koa();
app.use(async ctx => {
  ctx.body = 'Hello World';
});
app.listen(3000);

// 5、运行案例
$ node my-koa-app.js
```

app.listen(...) 方法只是以下方法的语法糖:

```js
const Koa = require('koa');
const app = new Koa();
app.listen(3000);

// ====== 等价于

const http = require('http');
const Koa = require('koa');
const app = new Koa();
http.createServer(app.callback()).listen(3000);

// 源码： koa/lib/application.js
// 部分节选
listen(...args) {
  debug('listen');
  const server = http.createServer(this.callback());
  return server.listen(...args);
}
```

这意味着您可以将同一个应用程序同时作为 HTTP 和 HTTPS 或多个地址：

```js
const http = require('http')
const https = require('https')
const Koa = require('koa')
const app = new Koa()
http.createServer(app.callback()).listen(3000)
https.createServer(app.callback()).listen(3001)
```

app 实例上的属性和方法有：

- app.listen(...)
- app.callback()
- app.use(function): 将给定的中间件方法添加到此应用程序。
  - app.use() 返回 this, 因此可以链式表达.
- app.keys= : 设置签名的 Cookie 密钥。
  - app.keys = ['im a newer secret', 'i like turtle'];
- app.context: app.context 是从其创建 ctx 的原型。

```js
app.context.db = db()

app.use(async (ctx) => {
  console.log(ctx.db)
})
```

## 二、Koa 的核心：

- 上下文(Context)：<br/>
  Koa Context 将 node 的 request 和 response 对象封装到单个对象中，为编写 Web 应用程序和 API 提供了许多有用的方法。 这些操作在 HTTP 服务器开发中频繁使用，它们被添加到此级别而不是更高级别的框架，这将强制中间件重新实现此通用功能。

```js
app.use(async ctx => {
  ctx; // 这是 Context
  ctx.request; // 这是 koa Request
  ctx.response; // 这是 koa Response
});

// ====== Context 具体方法和访问器.
ctx.req             // Node 的 request 对象.
ctx.res             // Node 的 response 对象.
ctx.request         // koa 的 Request 对象.
ctx.response        // koa 的 Response 对象.
ctx.state           // 推荐的命名空间，用于通过中间件传递信息和你的前端视图。
ctx.app             // 应用程序实例引用
ctx.app.emit        // Koa 应用扩展了内部 EventEmitter。ctx.app.emit 发出一个类型由第一个参数定义的事件。
ctx.cookies.get(name, [options])          // 通过 options 获取 cookie name: signed 所请求的cookie应该被签名
ctx.cookies.set(name, value, [options])   // 通过 options 设置 cookie name 的 value
ctx.throw([status], [msg], [properties])  // 用来抛出一个包含 .status 属性错误的帮助方法，其默认值为 500。
ctx.assert(value, [status], [msg], [properties]) // 当 !value 时抛出一个类似 .throw 错误的帮助方法。这与 node 的 assert() 方法类似. koa 使用 http-assert 作为断言。
ctx.respond         // 为了绕过 Koa 的内置 response 处理，你可以显式设置 ctx.respond = false;。 如果您想要写入原始的 res 对象而不是让 Koa 处理你的 response，请使用此参数。

// ====== Request 别名: 以下访问器和 Request 别名等效
ctx.header
ctx.headers
ctx.method
ctx.method=
ctx.url
ctx.url=
ctx.originalUrl
ctx.origin
ctx.href
ctx.path
ctx.path=
ctx.query
ctx.query=
ctx.querystring
ctx.querystring=
ctx.host
ctx.hostname
ctx.fresh
ctx.stale
ctx.socket
ctx.protocol
ctx.secure
ctx.ip
ctx.ips
ctx.subdomains
ctx.is()
ctx.accepts()
ctx.acceptsEncodings()
ctx.acceptsCharsets()
ctx.acceptsLanguages()
ctx.get()

// ====== Response 别名: 以下访问器和 Response 别名等效
ctx.body
ctx.body=
ctx.status
ctx.status=
ctx.message
ctx.message=
ctx.length=
ctx.length
ctx.type=
ctx.type
ctx.headerSent
ctx.redirect()
ctx.attachment()
ctx.set()
ctx.append()
ctx.remove()
ctx.lastModified=
ctx.etag=
```

- 请求(Request): <br/>
  Koa Request 对象是在 node 的 原生请求对象之上的抽象，提供了诸多对 HTTP 服务器开发有用的功能。

```js
request.header              // 请求头对象。
request.header=             // 设置请求头对象。
request.headers             // 请求头对象。别名为 request.header.
request.headers=            // 设置请求头对象。别名为 request.header=.
request.method              // 请求方法。
request.method=             // 设置请求方法，对于实现诸如 methodOverride() 的中间件是有用的。
request.length              // 返回以数字返回请求的 Content-Length，或 undefined。
request.url                 // 获取请求 URL.
request.url=                // 设置请求 URL, 对 url 重写有用。
request.originalUrl         // 获取请求原始URL。
request.origin              // 获取URL的来源，包括 protocol 和 host。
request.href                // 获取完整的请求URL，包括 protocol，host 和 url。
request.path                // 获取请求路径名。
request.path=               // 设置请求路径名，并在存在时保留查询字符串。
request.querystring         // 根据 ? 获取原始查询字符串.
request.querystring=        // 设置原始查询字符串。
request.search              // 使用 ? 获取原始查询字符串。
request.search=             // 设置原始查询字符串。
request.host                // 存在时获取主机（hostname:port）。
request.hostname            // 存在时获取主机名。
request.URL                 // 获取 WHATWG 解析的 URL 对象。
request.type                // 获取请求 Content-Type, 不含 "charset" 等参数。
request.charset             // 存在时获取请求字符集，或者 undefined： ctx.request.charset; // => "utf-8"
request.query               // 获取解析的查询字符串, 当没有查询字符串时，返回一个空对象。
request.query=              // 将查询字符串设置为给定对象。
request.fresh               // 检查请求缓存是否“新鲜”，也就是内容没有改变。
request.stale               // 与 request.fresh 相反.
request.protocol            // 返回请求协议，“https” 或 “http”。
request.secure              // 通过 ctx.protocol == "https" 来检查请求是否通过 TLS 发出。
request.ip                  // 请求远程地址。
request.ips                 // 当 X-Forwarded-For 存在并且 app.proxy 被启用时，这些 ips 的数组被返回，从上游 - >下游排序。 禁用时返回一个空数组。
request.subdomains          // 以数组形式返回子域。
request.is(types...)        // 检查传入请求是否包含 Content-Type 消息头字段， 并且包含任意的 mime type。如果没有请求主体，返回 null。 如果没有内容类型，或者匹配失败，则返回 false。 反之则返回匹配的 content-type。
request.accepts(types)      // 检查给定的 type(s) 是否可以接受，如果 true，返回最佳匹配，否则为 false。
request.acceptsEncodings(encodings)    // 检查 encodings 是否可以接受，返回最佳匹配为 true，否则为 false。
request.acceptsCharsets(charsets)      // 检查 charsets 是否可以接受，在 true 时返回最佳匹配，否则为 false。
request.acceptsLanguages(langs)        // 检查 langs 是否可以接受，如果为 true，返回最佳匹配，否则为 false。
request.idempotent          // 检查请求是否是幂等的。
request.socket              // 返回请求套接字。
request.get(field)          // 返回请求头(header), field 不区分大小写.
```

- 响应(Response): <br/>
  Koa Response 对象是在 node 的原生响应对象之上的抽象，提供了诸多对 HTTP 服务器开发有用的功能。

```js
response.header               // 响应头对象。
response.headers              // 响应头对象。别名是 response.header。
response.socket               // 响应套接字。 作为 request.socket 指向 net.Socket 实例。
response.status               // 获取响应状态。
response.status=              // 通过数字代码设置响应状态
response.message              // 获取响应的状态消息. 默认情况下, response.message 与 response.status 关联.
response.message=             // 将响应的状态消息设置为给定值。
response.length=              // 将响应的 Content-Length 设置为给定值。
response.length               // 以数字返回响应的 Content-Length，或者从ctx.body推导出来，或者undefined。
response.body                 // 获取响应主体。
response.body=                // 响应体设置: string 写入、Buffer 写入、Stream 管道、Object || Array JSON-字符串化、null 无内容响应
response.get(field)           // 不区分大小写获取响应头字段值 field。
response.has(field)           // 如果当前在响应头中设置了由名称标识的消息头，则返回 true. 消息头名称匹配不区分大小写.
response.set(field, value)    // 设置响应头 field 到 value: ctx.set('Cache-Control', 'no-cache');
response.append(field, value) // 用值 val 附加额外的消息头 field。ctx.append('Link', '<http://127.0.0.1/>');
response.set(fields)          // 用一个对象设置多个响应头fields
response.remove(field)        // 删除消息头 field。
response.type                 // 获取响应 Content-Type, 不含 "charset" 等参数。
response.type=                // 设置响应 Content-Type 通过 mime 字符串或文件扩展名。
response.is(types...)         // 非常类似 ctx.request.is(). 检查响应类型是否是所提供的类型之一。这对于创建操纵响应的中间件特别有用。
response.redirect(url, [alt]) // 执行 [302] 重定向到 url. ctx.redirect('back', '/index.html'); OR ctx.redirect('http://google.com');
response.attachment([filename], [options])               // 将 Content-Disposition 设置为 “附件” 以指示客户端提示下载。
response.headerSent           // 检查是否已经发送了一个响应头。 用于查看客户端是否可能会收到错误通知。
response.lastModified         // 将 Last-Modified 消息头返回为 Date, 如果存在。
response.lastModified=        // 将 Last-Modified 消息头设置为适当的 UTC 字符串。您可以将其设置为 Date 或日期字符串。ctx.response.lastModified = new Date();
response.etag=                // 设置包含 " 包裹的 ETag 响应， 请注意，没有相应的 response.etag getter。
response.vary(field)          // 设置 field 的 vary。
response.flushHeaders()       // 刷新任何设置的消息头，然后是主体(body)。
```

参考地址：<br/>
<a href="https://koa.bootcss.com/" target="_blank">Koa（中文版）</a><br />
<a href="https://koajs.com/" target="_blank">Koa（英文版）</a><br />
