# Electron 打包流程

> 最快捷的打包方式是使用 [Electron Forge](https://www.electronforge.io/)。

## 一、electron-builder 打包

> 将应用打包为独立的可执行文件。

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

  > Mac 上打包后，生成了一个`.dmg`文件，双击打开后，会提示安装，点击安装即可。
  > ![electron](/images/devices/electron-build.png)
