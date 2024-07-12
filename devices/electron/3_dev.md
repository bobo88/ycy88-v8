# Electron 具体开发实践

> electron 做桌面应用，我把主要需要用到的技术点或者注意事项汇总列举出来了。

## 1. 页面布局

页面布局是构建应用程序界面的基本步骤。

- **HTML**：使用标准 HTML 定义页面结构。
- **CSS**：使用 CSS 进行样式设计，确保界面美观。
- **JavaScript**：使用 JavaScript 实现动态交互。
- **前端框架**：可使用前端框架如 React、Vue、Angular 等，提升开发效率和代码可维护性。

## 2. 图标引入

设置应用程序和窗口的图标。

- **应用程序图标**：通过 `package.json` 中的 `icon` 字段设置应用图标。
- **窗口图标**：在 `BrowserWindow` 配置中设置图标。
  ```js
  const mainWindow = new BrowserWindow({
    icon: 'path/to/icon.png'
  })
  ```

## 3. 页面跳转和通信

在 Electron 中管理页面跳转和进程间通信。

- **页面跳转**：使用 `mainWindow.loadFile()` 或 `mainWindow.loadURL()` 进行页面加载。
- **进程间通信**：使用 IPC 模块在主进程和渲染进程之间进行通信。

  ```js
  // 主进程
  const { ipcMain } = require('electron')
  ipcMain.on('message', (event, arg) => {
    event.reply('reply', 'pong')
  })

  // 渲染进程
  const { ipcRenderer } = require('electron')
  ipcRenderer.send('message', 'ping')
  ipcRenderer.on('reply', (event, arg) => {
    console.log(arg) // 输出 'pong'
  })
  ```

## 4. 文件操作

处理文件读写等操作。

- **文件读写**：使用 Node.js 的 `fs` 模块。
  ```js
  const fs = require('fs')
  fs.readFile('path/to/file', 'utf8', (err, data) => {
    if (err) throw err
    console.log(data)
  })
  ```
- **文件对话框**：使用 `dialog` 模块显示文件选择对话框。
  ```js
  const { dialog } = require('electron')
  dialog
    .showOpenDialog({
      properties: ['openFile']
    })
    .then((result) => {
      console.log(result.filePaths)
    })
    .catch((err) => {
      console.log(err)
    })
  ```

## 5. 数据存储

管理应用数据的存储和持久化。

- **本地存储**：使用 `localStorage` 或 `IndexedDB` 存储小型数据。
- **文件存储**：使用 JSON 文件存储数据。
- **数据库**：集成 SQLite、MySQL 或 MongoDB 等数据库进行数据管理。

## 6. 应用菜单

创建和管理应用程序菜单。

- **主菜单**：使用 `Menu` 模块创建应用菜单。
  ```js
  const { Menu } = require('electron')
  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [{ role: 'quit' }]
    }
  ])
  Menu.setApplicationMenu(menu)
  ```

## 7. 系统托盘

在系统托盘中显示图标和菜单。

- **托盘图标**：使用 `Tray` 模块创建托盘图标。
  ```js
  const { Tray, Menu } = require('electron')
  const tray = new Tray('path/to/tray-icon.png')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' }
  ])
  tray.setContextMenu(contextMenu)
  ```

## 8. 窗口管理

创建和管理应用程序窗口。

- **窗口创建**：使用 `BrowserWindow` 模块创建新窗口。
  ```js
  const { BrowserWindow } = require('electron')
  const newWindow = new BrowserWindow({
    width: 800,
    height: 600
  })
  newWindow.loadFile('path/to/another.html')
  ```

## 9. 应用打包

将应用打包为独立的可执行文件。

- **Electron Builder**：使用 `electron-builder` 打包应用。
  ```sh
  npm install electron-builder --save-dev
  ```
  在 `package.json` 中配置 `build` 脚本。
  ```json
  "scripts": {
    "build": "electron-builder"
  }
  ```

## 10. 自动更新

实现应用程序的自动更新功能。

- **Electron Updater**：使用 `electron-updater` 实现自动更新。
  ```sh
  npm install electron-updater --save
  ```
  在主进程中设置更新逻辑。
  ```js
  const { autoUpdater } = require('electron-updater')
  autoUpdater.checkForUpdatesAndNotify()
  ```

## 11. 安全性

确保应用程序的安全性。

- **内容安全策略**：设置 CSP 头以防止 XSS 攻击。
  ```html
  <meta http-equiv="Content-Security-Policy" content="script-src 'self';" />
  ```
- **禁用远程模块**：使用 `contextIsolation` 和 `nodeIntegration` 选项。

  ```js
  const mainWindow = new BrowserWindow({
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  ```

---

- [https://github.com/SmallRuralDog/vue3-music](https://github.com/SmallRuralDog/vue3-music)
