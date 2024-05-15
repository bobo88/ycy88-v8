# Node 系列之 SocketIo

::: tip 简介
Socket.IO 是建立在 Node.js 上的实时应用程序框架，提供双向通信能力，适用于构建实时、跨平台的网络应用。
:::

## 一、Socket.IO 简介

**Socket.IO** 是一个实时应用程序框架，用于构建实时的、双向通信的网络应用。它建立在 WebSocket 协议之上，但也提供了对传统 HTTP 的回退支持，以确保在不支持 WebSocket 的环境中仍然可以实现实时通信。

### 主要特点：

- 实时双向通信： 提供了实时、双向的通信通道，使得服务器和客户端能够即时地推送数据。
- 跨平台支持： 可以在 Web、移动设备和服务器端之间进行实时通信，支持跨平台应用。
- 可靠性： Socket.IO 使用了一些技术来确保在不同网络条件下的通信的可靠性和稳定性。
- 事件驱动： 建立在事件驱动的架构上，通过事件进行消息的发送和接收。
- 自动回退： 当 WebSocket 不可用时，Socket.IO 可以回退到其他传输机制，如长轮询（long-polling）。

## 二、Socket.IO 使用示例：

### 1. 安装 Socket.IO：

使用 npm 安装 Socket.IO 库：

```bash
$ npm install socket.io
```

### 2. 在服务器端使用 Socket.IO：

```javascript
// server.js
const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', (socket) => {
  console.log('A user connected')

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

http.listen(3000, () => {
  console.log('Server is listening on port 3000')
})
```

### 3. 在客户端使用 Socket.IO：

```html
<!-- index.html -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.0.1/socket.io.js"></script>
<script>
  const socket = io()

  // 发送消息
  function sendMessage() {
    const message = document.getElementById('message').value
    socket.emit('chat message', message)
  }

  // 接收消息
  socket.on('chat message', (msg) => {
    const messages = document.getElementById('messages')
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(msg))
    messages.appendChild(li)
  })
</script>
```

## 三、结语

Socket.IO 提供了一种简单而又强大的方式来实现实时的双向通信，适用于构建聊天应用、实时协作工具等需要即时通信的场景。通过在服务器端和客户端使用 Socket.IO，开发者能够轻松构建出具有实时特性的应用程序。

---

- [https://socket.io/](https://socket.io/)
- [https://socket.io/zh-CN/ 中文网站](https://socket.io/zh-CN/)
