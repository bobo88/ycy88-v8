# 小程序简介

::: tip 什么是小程序
小程序是一种不需要下载安装即可使用的应用，它实现了应用“触手可及”的梦想，用户扫一扫或者搜一下即可打开应用。也体现了“用完即走”的理念，用户不用关心是否安装太多应用的问题。应用将无处不在，随时可用，但又无需安装卸载。
:::

小程序是一种全新的连接用户与服务的方式，它可以在微信内被便捷地获取和传播，同时具有出色的使用体验。

同时，小程序也百花齐放，除了微信小程序外，还有支付宝小程序、百度小程序等。

::: danger 注意
本系列文章如果不特别注明或提及，“小程序” 特指 “微信小程序”。
:::

<!-- *<font color="#FF6600">选型主要考虑：跨端 / 案例生态 / 技术栈。</font>* -->

小程序的开发选型主要有以下几种：

```html
选型主要考虑：跨端 / 案例生态 / 技术栈。 1. 原生original 2. uni-app 3. taro 4.
mpvue
```

## 一、原生 original

- Todo
- ...
- 学习成本：
- 特点：单个平台无法多端

## 二、uni-app

- 官网地址：https://uniapp.dcloud.io/
- 开发者：DCloud
- 技术栈： Vue
- 支持平台： 微信小程序 / H5 / App / 支付宝小程序 / 百度小程序
- 学习成本：Vue、小程序
- 特点：_<font color="#00BFFF">开发简单，小项目效率高，入门容易 debug 难，不适合中大型项目</font>_
- uni-app 其实内置了 mpvue，类似 mpvue 的加强版
- 项目搭建流程：
  - 下载 `HBuilderX` ：官方 IDE 下载地址 - https://www.dcloud.io/hbuilderx.html
  - 创建项目：
    - 点击工具栏里的文件 -> 新建 -> 项目
    - 选择 uni-app 类型，输入工程名，选择模板，点击创建，即可成功创建
  - 运行项目：
    - 浏览器运行：点击工具栏的运行 -> 运行到浏览器 -> 选择浏览器，即可在浏览器里面体验 uni-app 的 H5 版
    - 运行 App 到手机或模拟器：
    - 在微信开发者工具里运行：
    - 在支付宝小程序开发者工具里运行：
    - 在百度开发者工具里运行：
    - Other......
  - 发布 uni-app：
    - 发布为 H5：
    - 发布为小程序：
    - Other......

## 三、taro

- 官网地址： https://taro.jd.com/
- 开发者：京东
- 技术栈： React / Vue
- 支持平台：微信小程序 / H5 / App / 支付宝小程序 / 百度小程序
- 学习成本： React、RN、小程序、XCode、Android Studio
- 特点：_<font color="#00BFFF">Todo</font>_
- 项目搭建流程：
  - 1. todo
  - 2. todo
  - 3. todo

## 四、mpvue

- 官网地址：http://mpvue.com/
- 开发者： 美团
- 技术栈：Vue
- 支持平台： 微信小程序 / H5
- 学习成本：
- 特点：_<font color="#f00">官方不再维护</font>_
- 项目搭建流程：
  - 1. 全局安装 vue-cli：`npm i -g vue-cli`
  - 2. 创建项目基于 `mpvue-quickstart` 模板：`vue init mpvue/mpvue-quickstart my-project`
  - 3. 安装依赖&运行：`cd my-project` && `npm i` && `npm run dev`
  - 4. 搭建小程序开发环境：下载 `微信开发者工具`
  - 5. 调试开发 `mpvue` ：项目目录与微信开发者工具进行绑定
  - 6. 注意：新增的页面需要重新 `npm run dev` 来进行编译
  - 7. Todo...

## 五、其他

- `setData` 的优化
  - 尽可能减少 `setData` 调用的频次
  - 尽可能减少单次 `setData` 传输的数据
- taro 在性能优化上做的更细致，使用 uni-app 需要自己注意代码优化
