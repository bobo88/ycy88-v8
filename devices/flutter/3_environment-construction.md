# 环境搭建

::: tip 环境搭建
TODO
:::

## 一、选择操作系统

你想把 Flutter 安装在哪个操作系统呢？

- Windows
- macOS
- Linux
- chrome OS

参考地址：[安装和环境配置](https://flutter.cn/docs/get-started/install)

## 二、以 Windows 为例

### 2.1 获取 Flutter SDK

[flutter_windows_3.7.7-stable.zip](https://storage.flutter-io.cn/flutter_infra_release/releases/stable/windows/flutter_windows_3.7.7-stable.zip)

::: warning 解压 Flutter SDK

1. 请勿将 Flutter 有特殊字符或空格的路径下。

2. 请勿将 Flutter 安装在需要高权限的文件夹内，例如 C:\Program Files\。

:::

```
<!-- 或者使用命令 -->
git clone https://github.com/flutter/flutter.git -b stable
```

### 2.2 更新 path 环境变量

在 系统属性/高级/环境变量(N)/Path 中新增【D:\flutter\bin】（我的本机解压路径）

查看是否配置成功：

```
C:\Users\yuanb>where flutter dart
D:\flutter\bin\flutter
D:\flutter\bin\flutter.bat
D:\flutter\bin\dart
D:\flutter\bin\dart.bat
```

### 2.3 运行 flutter doctor

```
flutter doctor
```

![An image](/images/flutter/flutter_1.png)

参考地址：[在 Windows 操作系统上安装和配置 Flutter 开发环境](https://flutter.cn/docs/get-started/install/windows)

## 三、设置 Android 开发环境

### 3.1 安装 Android Studio

1）下载并安装 [Android Studio](https://developer.android.google.cn/studio)。

2）运行 Android Studio，并进入 ‘Android Studio Setup Wizard’，这会安装最新的 Android SDK， Android SDK Platform-Tools 以及 Android SDK Build-Tools，这些都是在开发 Android Flutter 应用时所需要的。

3）运行 flutter doctor 确保 Flutter 已经定位到了你的 Android Studio 的安装位置。如果 Flutter 并未定位到，运行 flutter config --android-studio-dir `<directory>` 设置你的 Android Studio 的安装目录。

### 3.2 配置 Android 设备

### 3.3 配置 Android 模拟器

### 3.4 同意 Android 协议

```
TODO...
```

## 四、编辑工具设定

选择 VS Code

### 4.1 安装 VS Code

VS Code 是一个可以运行和调试 Flutter 的轻量级编辑器。
[VS Code](https://code.visualstudio.com/)

### 4.2 安装 Flutter 和 Dart 插件

1）打开 VS Code。

2）打开 View > Command Palette…（命令面板...）。

3）输入「install」，然后选择 Extensions: Install Extensions。

4）在扩展搜索输入框中输入「flutter」，然后在列表中选择 Flutter 并单击 Install。此过程中会自动安装必需的 Dart 插件。

5）点击 Reload to Activate 以重新启动 VS Code。

### 4.3 通过 Flutter Doctor 命令验证是否安装成功

1）打开 View > Command Palette…。

2）输入 “doctor”，选择 Flutter: Run Flutter Doctor。

3）打开 OUTPUT 面板查看是否有错误，确保在不同的输出选项 (Output Options) 的下拉列表中选择了 Flutter。

## 五、创建应用

1）打开 View > Command Palette。

2）输入「flutter」，选择 Flutter: New Project。

3）选择 Application。

4）新建或选择新项目将存放的上层目录。

5）输入项目名称，例如 my_app，并点击 Enter。

6）等待项目创建完成，并且 main.dart 文件展现在编辑器中。

::: tip 提示
每当创建一个新的 Flutter 应用时，一些 Flutter IDE 插件会请你输入一个类似 com.example 的包名，包名（在 iOS 里叫 Bundle ID）一般都是公司域名的反写。如果你的应用打算上架商店，建议一开始的时候把这个全网唯一的包名设置好，因为应用上架之后就不能再修改了。
:::

## 六、运行到浏览器（chrome）

1）定位到 VS Code 的状态栏（窗口底部的蓝色栏）：

2）从 Device Selector 区域选择一个设备。

![An image](/images/flutter/flutter_2.png)

3）运行 Run > Start Debugging 或按下 F5。

4）等待应用启动——启动进度会在 Debug Console 中展示。

## 七、尝试热重载 (hot reload)

1）打开 lib/main.dart。

2）修改字符串

```js
Flutter Demo Home Page
```

改为

```js
Flutter Demo Home Page 588
```

::: warning 提示
不要 停止应用。保持应用处于运行状态。
:::

3）保存修改: invoke Save All, or click Hot Reload lightning bolt .

![An image](/images/flutter/flutter_3.png)

你会发现修改后的字符串几乎马上出现在正在运行的应用程序上。
