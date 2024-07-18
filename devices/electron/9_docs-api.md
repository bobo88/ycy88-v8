# Electron 的 API 文档

::: tip 提示
_本文只截取部分常用的 API 功能（从官方网站）。_
:::

::: danger 注意
_部分 API 功能只针对特定的操作系统，比如 `Windows` 或者 `macOS`。_
:::

> [Electron API 文档：https://www.electronjs.org/zh/docs/latest/api/app](https://www.electronjs.org/zh/docs/latest/api/app)

## 一、Main Process 模块

### 1）app：[【官网链接】](https://www.electronjs.org/zh/docs/latest/api/app)

> 控制应用程序的事件生命周期。

**进程：主进程**

下面的这个例子将会展示如何在最后一个窗口被关闭时退出应用：

```js
const { app } = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})
```

### 2）BaseWindow：[【官网链接】](https://www.electronjs.org/zh/docs/latest/api/base-window)

> 创建和控制窗口。

**Process: Main**

注意 BaseWindow 提供了一种在单个窗口中灵活组合多个 web 视图的方式。 对于只有单个全尺寸 web 视图的窗口，BrowserWindow 类可能是更简单的选择。

```js
// 在主进程中
const { BaseWindow, WebContentsView } = require('electron')

const win = new BaseWindow({ width: 800, height: 600 })

const leftView = new WebContentsView()
leftView.webContents.loadURL('https://electronjs.org')
win.contentView.addChildView(leftView)

const rightView = new WebContentsView()
rightView.webContents.loadURL('https://github.com/electron/electron')
win.contentView.addChildView(rightView)

leftView.setBounds({ x: 0, y: 0, width: 400, height: 600 })
rightView.setBounds({ x: 400, y: 0, width: 400, height: 600 })
```

### 3）BrowserWindow：[【官网链接】](https://www.electronjs.org/zh/docs/latest/api/browser-window)

> 创建并控制浏览器窗口。

**进程：主进程**

在 app 模块 emitted ready 事件之前，您不能使用此模块。

_可以通过内置的方法实现窗口的最大化、最小化、判断是否全屏、是否聚焦、是否是模态窗口等。_

```js
// 在主进程中.
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })

// Load a remote URL
win.loadURL('https://github.com')

// Or load a local HTML file
win.loadFile('index.html')
```

### 4）ipcMain：[【官网链接】](https://www.electronjs.org/zh/docs/latest/api/ipc-main)

> 从主进程到渲染进程的异步通信。

**进程：主进程**

ipcRenderer 是一个 EventEmitter 的实例。 当在主进程中使用时，它处理从渲染器进程（网页）发送出来的异步和同步信息。 从渲染器进程发送的消息将被发送到该模块。

欲了解用法示例，请查看 进程间通信（IPC）教程。

#### 发送消息

也可以从主进程向渲染进程发送消息，查阅 [webContents.send](https://www.electronjs.org/zh/docs/latest/tutorial/ipc) 获取更多信息。

- 发送消息时，事件名称为 `channel` 。
- 回复同步信息时，需要设置 `event.returnValue`。
- 可以使用 `event.reply(...)`将异步消息发送回发送者。 此方法将自动处理从非主 `frame` 发送的消息(比如： `iframes`)。相应的发送方法是: `event.sender.send(...) `它将总是把消息发送到主 `frame`

### 5）Menu：[【官网链接】](https://www.electronjs.org/zh/docs/latest/api/menu)

> 创建原生菜单和上下文菜单。

**进程：主进程**

```js
const { Menu } = require('electron')

const menu = Menu.buildFromTemplate([
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'delete' },
      { role: 'selectall' }
    ]
  }
])

Menu.setApplicationMenu(menu)
```

### 6）process：[【官网链接】](https://www.electronjs.org/zh/docs/latest/api/process)

> 提供有关当前进程的信息并控制其生命周期。

**进程：主进程和渲染进程**

```js
console.log(process.versions.node)
console.log(process.versions.chrome)
console.log(process.versions.electron)
```

- process.getSystemVersion()
  - 返回 string - 操作系统的版本。

```js
const version = process.getSystemVersion()
console.log(version)
// On macOS -> '10.13.6'
// On Windows -> '10.0.17763'
// On Linux -> '4.15.0-45-generic'
```

### 7）screen：[【官网链接】](https://www.electronjs.org/zh/docs/latest/api/screen)

> 提供有关屏幕大小、显示器等的信息。

**进程：主进程**

```js
const { screen } = require('electron')

const primaryDisplay = screen.getPrimaryDisplay()
const { width, height } = primaryDisplay.workAreaSize
```

### 8）session：[【官网链接】](https://www.electronjs.org/zh/docs/latest/api/session)

> 管理浏览器会话、cookie、缓存、代理设置等。

**进程：主进程**

```js
const { session } = require('electron')

const ses = session.fromPartition('persist:name')
ses.cookies.get({ url: 'http://www.google.com' }, (error, cookies) => {
  console.log(cookies)
})
```

### 9）webContents：[【官网链接】](https://www.electronjs.org/zh/docs/latest/api/web-contents)

> 渲染以及控制 web 页面，包括窗口内显示的内容。

**进程：主进程**

```js
const { webContents } = require('electron')

webContents.getAllWebContents().forEach((webContents) => {
  console.log(webContents.getTitle())
  console.log(webContents.getURL())
  console.log(webContents.openDevTools()) // 打开开发者工具
})
```

## 二、Renderer Process 模块

### 1）ipcRenderer：[【官网链接】](https://www.electronjs.org/zh/docs/latest/api/ipc-renderer)

> 从渲染进程到主进程的异步通信。

**进程：渲染进程**

`ipcRenderer` 是一个 `EventEmitter` 的实例。 你可以使用它提供的一些方法从渲染进程 (web 页面) 发送同步或异步的消息到主进程。 也可以接收主进程回复的消息。

```js
const { ipcRenderer } = require('electron')

ipcRenderer.send('message', 'Hello, world!')
```

`ipcRenderer`的常见方法有：`on`、`send`、`addListener`、`removeListener`等。

## 三、自定义 DOM 元素

### 1）[【从渲染进程打开窗口】](https://www.electronjs.org/zh/docs/latest/api/window-open)

> TODO

## 四、Chromium 和 Node.js

> TODO

## 五、类

> TODO

## 六、其他

> TODO
