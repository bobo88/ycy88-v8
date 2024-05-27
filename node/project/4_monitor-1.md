# 前端监控系统搭建（一）

> MVP 版本验证可行性。

`navigator.sendBeacon` 是一种用于在浏览器卸载文档（页面关闭或导航到新页面）时，异步地将少量数据发送到服务器的方法。它通常用于页面分析、日志记录和其他需要在页面关闭时发送数据的应用场景。

## 一、前端代码

```html
<!-- fe/index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <button>click me!</button>

    <script>
      function trackEvent(eventName, data) {
        const eventData = {
          event: eventName,
          ...data,
          timestamp: new Date().toISOString()
        }
        console.log('🚀 ~ trackEvent ~ eventData:', eventData)

        const blob = new Blob([JSON.stringify(eventData)], {
          type: 'application/json'
        })
        navigator.sendBeacon('http://localhost:3434/track', blob)
      }

      document.addEventListener('DOMContentLoaded', () => {
        trackEvent('page_view', { page: window.location.pathname })

        document.querySelectorAll('button').forEach((button) => {
          button.addEventListener('click', () => {
            trackEvent('button_click', { id: button.id, abc: '123' })
          })
        })

        document.querySelectorAll('form').forEach((form) => {
          form.addEventListener('submit', () => {
            trackEvent('form_submit', { id: form.id })
          })
        })
      })
    </script>
  </body>
</html>
```

::: danger 注意下面的代码片段：因为 `navigator.sendBeacon` 期望数据为 `Blob` 对象或 `DOMString`。

```js
const blob = new Blob([JSON.stringify(eventData)], {
  type: 'application/json'
})
navigator.sendBeacon('http://localhost:3434/track', blob)
```

:::

## 二、后端代码

```js
// rd/app.js
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

// 设置CORS配置
const corsOptions = {
  origin: 'http://127.0.0.1:1234', // 前端所在的域
  methods: ['POST', 'GET'], // 允许的方法
  allowedHeaders: ['Content-Type'], // 允许的头信息
  credentials: true // 允许凭据
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

app.post('/track', (req, res) => {
  const eventData = req.body
  console.log('Received event data:', eventData)
  res.status(200).send('Event data received')
})

app.listen(3434, () => {
  console.log('Server is running on port 3434')
})
```

```json
// package.json
{
  "name": "rd",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "express": "^4.19.2"
  }
}
```

::: danger 注意下面的代码片段：设置跨域配置。

```js
// 设置CORS配置
const corsOptions = {
  origin: 'http://127.0.0.1:1234', // 前端所在的域
  methods: ['POST', 'GET'], // 允许的方法
  allowedHeaders: ['Content-Type'], // 允许的头信息
  credentials: true // 允许凭据
}
```

:::

## 三、测试步骤

- 运行后端服务器： `node app.js`
- 打开前端页面： `fe/index.html` 在浏览器中
- 打开浏览器开发者工具，查看控制台和网络请求，确保埋点数据正确发送，并无错误。

![An image](/images/node/monitor-1.png)

![An image](/images/node/monitor-2.png)

![An image](/images/node/monitor-3.png)

![An image](/images/node/monitor-4.png)

> 能正常获取上报的信息数据。
> ![An image](/images/node/monitor-5.png)

## 四、参考资料

> TODO
