# Electron 的通信原理分析

> _相关源码请查看：[https://github.com/bobo88/VUE3-Electron-chat](https://github.com/bobo88/VUE3-Electron-chat)。_

> 下面是一个简单的示例，展示如何在 Electron 应用中使用 `ipcMain` 和 `ipcRenderer` 模块进行主进程和渲染进程之间的通信。

![An image](/images/mp/electron-msg-1.png)

![An image](/images/mp/electron-msg-2.png)

![An image](/images/mp/electron-msg-3.png)

_相关源码请查看：[https://github.com/bobo88/VUE3-Electron-chat](https://github.com/bobo88/VUE3-Electron-chat)。_

## 一、主进程代码 (`main.js`)

```javascript
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  win.loadFile('index.html')

  // 监听渲染进程发送的消息
  ipcMain.on('message-from-renderer', (event, arg) => {
    console.log(arg) // 打印消息
    // 向渲染进程发送消息
    event.sender.send('message-from-main', '主进程收到消息: ' + arg)
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
```

## 二、预加载脚本 (`preload.js`)

```javascript
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (message) => ipcRenderer.send('message-from-renderer', message),
  onMessage: (callback) => ipcRenderer.on('message-from-main', callback)
})
```

## 三、渲染进程代码 (`index.html`)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>IPC Example</title>
  </head>
  <body>
    <h1>IPC Example</h1>
    <button id="sendButton">发送消息</button>
    <p id="response"></p>

    <script>
      const sendButton = document.getElementById('sendButton')
      const responseParagraph = document.getElementById('response')

      sendButton.addEventListener('click', () => {
        window.electronAPI.sendMessage('Hello from Renderer!')
      })

      window.electronAPI.onMessage((event, message) => {
        responseParagraph.innerText = message
      })
    </script>
  </body>
</html>
```

## 四、说明

- **主进程 (`main.js`)**

  - 创建一个窗口并加载 `index.html`。
  - 使用 `ipcMain.on` 监听来自渲染进程的消息，并使用 `event.sender.send` 向渲染进程发送消息。

- **预加载脚本 (`preload.js`)**

  - 使用 `contextBridge.exposeInMainWorld` 将 IPC 方法暴露给渲染进程。
  - 提供 `sendMessage` 和 `onMessage` 方法，分别用于发送和接收消息。

- **渲染进程 (`index.html`)**
  - 使用暴露的 API 与主进程通信。
  - 在按钮点击时发送消息，并在接收到主进程的响应时更新页面内容。

通过这种方式，您可以在主进程和渲染进程之间进行双向通信，实现更复杂的应用逻辑。
