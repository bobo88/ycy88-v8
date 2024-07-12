# Electron 简介

::: tip Electron 核心
Electron 的核心是 **进程通信**。

Electron 应用由主进程和渲染进程组成，它们之间通过 IPC（Inter-Process Communication，进程间通信）进行通信。主进程负责管理应用程序的生命周期和窗口，而渲染进程负责显示用户界面和执行用户交互。
主进程和渲染进程之间的通信是通过 `ipcMain` 和 `ipcRenderer` 模块来实现的。
这些模块提供了 `send` 和 `on` 方法，用于在不同的进程之间发送和接收消息。
例如，主进程可以使用 `ipcMain.on` 方法监听来自渲染进程的消息，并使用 `ipcMain.send` 方法向渲染进程发送消息。同样，渲染进程可以使用 `ipcRenderer.on` 方法监听来自主进程的消息，并使用 `ipcRenderer.send` 方法向主进程发送消息。
:::

::: tip Electron 简介
Electron 是一个开源框架，主要用于构建跨平台的桌面应用程序。它由 GitHub 开发，并基于 Chromium 和 Node.js，使开发者能够使用 Web 技术（如 HTML、CSS 和 JavaScript）来创建桌面应用。
:::

## 核心特点

1. **跨平台支持**：Electron 支持 Windows、macOS 和 Linux 等操作系统，允许开发者一次编写代码，然后在多个平台上运行。
2. **Web 技术栈**：使用 HTML、CSS 和 JavaScript 等前端技术，可以快速上手并开发复杂的桌面应用程序。
3. **Node.js 集成**：Electron 集成了 Node.js，使得应用程序能够访问操作系统级别的 API，从而实现诸如文件系统访问、网络通信等功能。
4. **Chromium 内核**：Electron 使用 Chromium 作为浏览器内核，保证了高性能的渲染效果和现代的 Web 标准支持。

## 优点

- **开发效率高**：前端开发者无需学习新的编程语言或工具，即可利用现有的 Web 技术进行桌面应用开发。
- **强大的生态系统**：通过 Node.js 和 npm，开发者可以利用丰富的开源库和工具，快速扩展应用功能。
- **灵活性强**：可以同时使用 Web 和 Node.js 的 API，灵活处理各种应用需求。

## 缺点

- **应用体积较大**：每个 Electron 应用都包含一个完整的 Chromium 内核，导致应用体积相对较大。
- **性能问题**：由于使用 Web 技术，相比原生应用在性能上可能有所不及，尤其在处理复杂动画或大量数据时。
- **资源消耗高**：Electron 应用可能会占用更多的内存和 CPU 资源，影响应用的运行效率。

## 示例代码

以下是一个简单的 Electron 应用示例，展示了如何创建一个基本的窗口并加载 HTML 文件：

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

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

这个示例代码展示了如何通过 Electron 创建一个主窗口，并在应用启动时加载一个 HTML 文件作为应用的主界面。

---

- [https://www.electronjs.org/zh/](https://www.electronjs.org/zh/)
