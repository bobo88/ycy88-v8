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

        navigator.sendBeacon(
          'http://localhost:3434/track',
          JSON.stringify(eventData)
        )
      }

      document.addEventListener('DOMContentLoaded', () => {
        trackEvent('page_view', { page: window.location.pathname })

        document.querySelectorAll('button').forEach((button) => {
          button.addEventListener('click', () => {
            trackEvent('button_click', { id: button.id })
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

## 二、后端代码

```js
// rd/app.js
const express = require('express')
const bodyParser = require('body-parser')
// 允许跨域
const cors = require('cors')
const app = express()

app.use(cors())
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

## 三、测试步骤

- 运行后端服务器： `node app.js`
- 打开前端页面： `fe/index.html` 在浏览器中
- 打开浏览器开发者工具，查看控制台和网络请求，确保埋点数据正确发送，并无错误。

![An image](/images/node/monitor-1.png)

![An image](/images/node/monitor-2.png)

![An image](/images/node/monitor-3.png)

![An image](/images/node/monitor-4.png)

## 四、参考资料

> TODO
