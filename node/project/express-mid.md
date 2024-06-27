# Express 中间件机制

在 Express 中间件的机制中，每个中间件函数通过调用 `next()` 函数来将控制权传递给下一个中间件。这种机制确保了请求能够按顺序经过一系列的中间件处理，直到最终到达路由处理程序或错误处理程序。

## 一、Express 中间件机制

1. **中间件函数**

   - 中间件函数是一个具有 `(req, res, next)` 参数的函数，其中：
     - `req` 是请求对象。
     - `res` 是响应对象。
     - `next` 是一个函数，用于将控制权传递给下一个中间件。

2. **定义中间件**

   - 中间件可以通过 `app.use()` 或者特定的 HTTP 方法（如 `app.get()`、`app.post()` 等）来定义。例如：

     ```javascript
     const express = require('express')
     const app = express()

     // 定义一个全局中间件
     app.use((req, res, next) => {
       console.log('This is a middleware')
       next() // 将控制权传递给下一个中间件
     })

     // 定义一个路由处理程序
     app.get('/', (req, res) => {
       res.send('Hello, World!')
     })

     app.listen(3000, () => {
       console.log('Server is running on port 3000')
     })
     ```

3. **中间件的执行流程**

   - 当 Express 接收到一个请求时，它会按顺序执行与该请求路径和方法匹配的中间件函数。
   - 每个中间件函数都可以执行以下操作：
     - 对请求对象 `req` 或响应对象 `res` 进行修改。
     - 结束请求-响应循环（如通过 `res.send()`、`res.json()` 等）。
     - 调用 `next()` 将控制权传递给下一个中间件。
     - 如果当前中间件不调用 `next()` 或者不结束请求-响应循环，请求将挂起。

4. **错误处理中间件**

   - 错误处理中间件的函数签名与普通中间件不同，它有四个参数 `(err, req, res, next)`：
     ```javascript
     app.use((err, req, res, next) => {
       console.error(err.stack)
       res.status(500).send('Something broke!')
     })
     ```

5. **例子：多个中间件**

   - 下面是一个包含多个中间件的示例，它们会按顺序执行：

     ```javascript
     const express = require('express')
     const app = express()

     // 中间件1
     app.use((req, res, next) => {
       console.log('Middleware 1')
       req.customProperty = 'Middleware 1 was here'
       next()
     })

     // 中间件2
     app.use((req, res, next) => {
       console.log('Middleware 2')
       console.log(req.customProperty) // 输出 'Middleware 1 was here'
       next()
     })

     // 路由处理程序
     app.get('/', (req, res) => {
       res.send('Hello, World!')
     })

     app.listen(3000, () => {
       console.log('Server is running on port 3000')
     })
     ```

## 二、总结

- **next()** 是关键：通过调用 `next()`，中间件将控制权传递给下一个中间件，确保请求能够按顺序经过所有中间件处理。
- **顺序执行**：中间件按定义顺序执行，除非某个中间件结束了请求-响应循环。
- **错误处理**：错误处理中间件用于捕获并处理在其他中间件或路由处理程序中发生的错误。

这种机制使得 Express 的中间件体系非常灵活和强大，能够处理各种复杂的请求处理逻辑。
