# Electron 应用发布流程

> _发布 Electron 应用涉及多个步骤，包括打包应用、创建可执行文件、签名以及发布更新。_

## 步骤 1：准备项目

确保你的 Electron 项目结构清晰，包含以下必要文件：

- 主进程文件（如 `main.js`）
- 渲染进程文件（如 `index.html`, `renderer.js`）
- `package.json`
- 预加载脚本（如 `preload.js`）

## 步骤 2：安装打包工具

使用 `electron-builder` 进行打包和发布。首先，安装 `electron-builder`：

```sh
npm install electron-builder --save-dev
```

## 步骤 3：配置 `package.json`

在 `package.json` 中添加打包配置：

```json
{
  "name": "your-app-name",
  "version": "1.0.0",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "dist": "electron-builder"
  },
  "build": {
    "appId": "com.yourdomain.yourapp",
    "productName": "Your App Name",
    "directories": {
      "buildResources": "build"
    },
    "files": [
      "dist/**/*",
      "node_modules/**/*",
      "main.js",
      "preload.js",
      "index.html"
    ],
    "win": {
      "target": "nsis"
    },
    "mac": {
      "target": "dmg"
    },
    "linux": {
      "target": "AppImage"
    }
  },
  "devDependencies": {
    "electron": "^VERSION",
    "electron-builder": "^VERSION"
  }
}
```

## 步骤 4：构建项目

首先，确保你的项目构建输出（如 Webpack 或其他构建工具）在 `dist` 目录中。如果你的项目需要编译，请确保运行以下命令以构建项目：

```sh
npm run build
```

## 步骤 5：打包应用

使用 `electron-builder` 打包应用：

```sh
npm run dist
```

这个命令会在 `dist` 目录中生成适用于 Windows、macOS 和 Linux 的安装文件。

## 步骤 6：代码签名（可选）

代码签名可以提高用户对你的应用的信任度，并避免一些安全警告。对于 macOS 和 Windows，你需要签名证书。

### macOS 签名

1. 申请 Apple 开发者账号。
2. 使用 `Xcode` 创建签名证书。
3. 在 `build` 配置中添加签名信息：

```json
"mac": {
  "identity": "Developer ID Application: Your Name (Team ID)"
}
```

### Windows 签名

1. 申请 Windows 代码签名证书。
2. 在 `build` 配置中添加签名信息：

```json
"win": {
  "signingHashAlgorithms": ["sha256"],
  "certificateFile": "path/to/your/certificate.pfx",
  "certificatePassword": "your-certificate-password"
}
```

## 步骤 7：发布更新

使用 Electron 的自动更新功能，你可以将更新发布到远程服务器，并在用户启动应用时自动下载和安装更新。

### 配置自动更新

1. 在 `main.js` 中添加自动更新代码：

```javascript
const { autoUpdater } = require('electron-updater')

app.on('ready', () => {
  autoUpdater.checkForUpdatesAndNotify()
})
```

2. 在 `build` 配置中添加发布信息：

```json
"publish": [
  {
    "provider": "github",
    "owner": "your-github-username",
    "repo": "your-repo-name"
  }
]
```

3. 创建 GitHub 发布，并上传构建的安装文件和更新文件。

## 步骤 8：发布应用

将打包后的应用文件上传到你选择的分发平台（如 GitHub、S3 或其他文件托管服务）。

## 总结

发布一个 Electron 应用涉及以下关键步骤：

1. 准备项目结构。
2. 安装并配置 `electron-builder`。
3. 构建项目并打包应用。
4. （可选）进行代码签名。
5. 配置并发布更新。
6. 将应用发布到分发平台。

---

- [发布和更新：https://www.electronjs.org/zh/docs/latest/tutorial/tutorial-publishing-updating](https://www.electronjs.org/zh/docs/latest/tutorial/tutorial-publishing-updating)
- [Mac App Store 应用程序提交指南：https://www.electronjs.org/zh/docs/latest/tutorial/mac-app-store-submission-guide](https://www.electronjs.org/zh/docs/latest/tutorial/mac-app-store-submission-guide)
