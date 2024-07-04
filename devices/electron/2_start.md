# Electron 应用准备工作

在开始使用 Electron 开发应用之前，需要进行一系列的准备工作。这些步骤确保你的开发环境配置正确，并且为项目打下良好的基础。

## 1. 安装 Node.js 和 npm

Electron 是基于 Node.js 的，因此首先需要安装 Node.js 和 npm（Node 包管理器）。

### 安装步骤：

1. 访问 [Node.js 官方网站](https://nodejs.org/)，下载并安装最新的 LTS 版本。
2. 安装完成后，在终端中运行以下命令，验证安装是否成功：

   ```sh
   node -v
   npm -v
   ```

## 2. 安装 Electron

使用 npm 安装 Electron。

### 安装步骤：

1. 打开终端，运行以下命令来安装 Electron：

   ```sh
   npm install -g electron
   ```

2. 验证安装：

   ```sh
   electron -v
   ```

   ![electron](/images/devices/electron-v.png)

## 3. 设置项目目录

为你的 Electron 项目创建一个新的目录。

### 步骤：

1. 打开终端，运行以下命令：

   ```sh
   mkdir my-electron-app
   cd my-electron-app
   ```

2. 初始化一个新的 npm 项目：

   ```sh
   npm init -y
   ```

## 4. 安装 Electron 依赖

在你的项目目录中安装 Electron 作为本地依赖。

### 步骤：

1. 运行以下命令：

   ```sh
   npm install electron --save-dev
   ```

## 5. 创建主进程文件

Electron 应用的主进程文件通常命名为 `main.js` 或 `index.js`。

::: warning 注意你命名时的文件名要与 package.json 中的 main 字段对应

```json
{
  "name": "my-electron-app",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "start": "electron ."
  },
  "devDependencies": {
    "electron": "^31.1.0"
  }
}
```

:::

> 就会出现如下截图的报错。
> ![electron](/images/devices/electron-error.png)

### 步骤：

1. 在项目目录中创建一个新的文件 `index.js`，并添加以下内容：

   ```js
   const { app, BrowserWindow } = require('electron')
   const path = require('path')

   function createWindow() {
     const mainWindow = new BrowserWindow({
       width: 800,
       height: 600,
       webPreferences: {
         preload: path.join(__dirname, 'preload.js')
       }
     })

     mainWindow.loadFile('index.html')
   }

   app.whenReady().then(() => {
     createWindow()

     app.on('activate', () => {
       if (BrowserWindow.getAllWindows().length === 0) {
         createWindow()
       }
     })
   })

   app.on('window-all-closed', () => {
     if (process.platform !== 'darwin') {
       app.quit()
     }
   })
   ```

## 6. 创建预加载脚本

预加载脚本通常用于在 Electron 的渲染进程和主进程之间建立安全的通信。

### 步骤：

1. 在项目目录中创建一个新的文件 `preload.js`，并添加以下内容：

   ```js
   window.addEventListener('DOMContentLoaded', () => {
     const replaceText = (selector, text) => {
       const element = document.getElementById(selector)
       if (element) element.innerText = text
     }

     for (const dependency of ['chrome', 'node', 'electron']) {
       replaceText(`${dependency}-version`, process.versions[dependency])
     }
   })
   ```

## 7. 创建 HTML 文件

创建一个简单的 HTML 文件作为你的应用界面。

### 步骤：

1. 在项目目录中创建一个新的文件 `index.html`，并添加以下内容：

   ```html
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset="UTF-8" />
       <title>My Electron App</title>
     </head>
     <body>
       <h1>Hello World!</h1>
       <p>
         We are using Node.js <span id="node-version"></span>, Chromium
         <span id="chrome-version"></span>, and Electron
         <span id="electron-version"></span>.
       </p>
     </body>
   </html>
   ```

## 8. 更新 package.json 文件

在 `package.json` 文件中添加启动脚本。

### 步骤：

1. 打开 `package.json` 文件，找到 `"scripts"` 部分，添加 `"start"` 脚本：

   ```json
   "scripts": {
       "start": "electron ."
   }
   ```

## 9. 运行应用

所有准备工作完成后，可以运行你的 Electron 应用了。

### 步骤：

1. 在终端中运行以下命令：

   ```sh
   npm start
   ```

![electron](/images/devices/electron-success.png)
