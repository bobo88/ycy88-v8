# Node 清单 - HelloWorld

Node.js® 是一个开源、跨平台的 JavaScript 运行时环境。 用于方便地搭建响应速度快、易于扩展的网络应用。

Node.js 它不是一个 js 文件，而是对 Chrome V8 引擎进行封装的一个运行环境，它可以使 Javascript 代码运行在服务端，使其实现和 PHP、Java 等服务端语言类似的功能。
::: tip Node 与 npm 的关系
包含关系。Node.js 内置了 npm， npm 全称是 node package manager（包管理工具）。
:::

## 一、Node 的安装：

1. 从 <a href="https://nodejs.org/zh-cn/download/" target="_blank">官网</a> 直接下载 Node 的安装包，然后一路 next 安装即可。
2. 验证 Node 是否安装成功：

```js
// 在终端窗口运行以下命令，如果能输出相关版本信息，则表示 node 安装成功
$ node -v      // print: v16.14.0

$ npm -v       // print: 8.3.1
```

![An image](/images/prev/node_helloworld.png)

## 二、搭建一个 web 服务器：

你已经安装了 Node，让我们尝试构建第一个 Web 服务器。

```js
// 1. 编写一个 app.js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// 2. 在 app.js 所在目录，运行以下命令开启web服务器
$ node app.js

// 3. 在浏览器中输入 127.0.0.1:3000 即可发现页面中显示了 “Hello World” 字样
```

## 三、备注：

我配置了三个 web 服务器，运行在 node 环境中，使用 Nginx 进行代理，用来测试「负载均衡」功能。

![An image](/images/prev/node_nginx.png)

<!-- HTTP 是 Node.js 中的一等公民，设计时考虑到了流式和低延迟，这使得 Node.js 非常适合作为网络库或框架的基础。 -->

DEMO 源码：<br />
<a href="https://github.com/bobo88/project-basis/tree/main/nginx-test" target="_blank">DEMO -- Nginx Test</a><br />
