# 初探 Node

Node.js 不是一门语言也不是框架，它只是基于 Google V8 引擎的 JavaScript 运行时环境

## 一、Nodejs 特点：

- 异步 IO
- 事件驱动
- 单线程
- ......

## 二、Node.js 的主要使用场景:

- 跨平台:

  - 前端（web + H5）
  - 移动端（Hybrid) / cordova / react-native / weex
  - PC 端 / electron

- Node 后端:

  - 核心特性 / web 应用
  - Api / rpc / 测试 / 部署 / 最佳实践
  - 微服务 / 厂商支持

- 前端:

  - react / vue / angular ...
  - 应用实践
  - 架构

- 工具:
  - 各种预编译 / 构建工具
  - webpack / gulp / 工程化
  - hack 技巧 / npm 等

## 三、Node.js 核心模块/API

```md
## 核心模块

- **global：** 全局变量
- **http / https：** HTTP / HTTPS 模块
- **dns：** 域名服务器
- **events：** 事件触发器
- **fs：** 文件系统
- **process：** 进程
- **path：** 路径
- **url：** 网址
- **console：** 控制台
- **Error：** 错误
- **module：** 模块
- **util：** 实用工具

## 其他模块

- **assert：** 断言
- **perf_hooks：** 性能钩子
- **buffer：** 缓冲区
- **child_process：** 子进程
- **cluster：** 集群
- **crypto：** 加密
- **debugger：** 调试器
- **dgram：** 数据报
- **inspector：** 检查器
- **Intl：** 国际化
- **net：** 网络
- **os：** 操作系统
- **string_decoder：** 字符串解码器
- **readline：** 逐行读取
- **repl：** 交互式解释器
- **report：** 诊断报告
- **stream：** 流
- **timers：** 定时器
- **tls：** 安全传输层
- **tty：** 终端
- **v8：** 引擎
- **vm：** 虚拟机
- **zlib：** 压缩
- **worker_threads：** 工作线程

## 实验模块 / 旧版模块

- **querystring：** 查询字符串
- **async_hooks：** 异步钩子
- **trace_events：** 跟踪事件
- **diagnostics_channel：** 诊断通道
- **wasi WebAssembly：** 系统接口
- **webcrypto Web：** 加密
- **webstream Web：** 流

## 废弃模块

- **domain：** 域
- **punycode：** 域名代码
```

## 四、Node.js 相关的主流框架

```js
// 1. Express
// 2. Koa
// 3. Nuxt (VUE)
// 4. Next (React)
// 5. Socket.io
// 6. Nest
// ......
```

::: tip
WEB 服务器的主要任务是： 处理 HTTP 请求。

HTTP 是 Node.js 中的一等公民，设计时考虑到了流式和低延迟，这使得 Node.js 非常适合作为网络库或框架的基础。

Node.js 中的回调函数，错误优先，即第一个参数是 error。
:::
