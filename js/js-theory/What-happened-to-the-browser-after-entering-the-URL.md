# 浏览器

_从用户在浏览器地址栏输入网址，到看到整个页面，中间都发生了哪些事情？_

```text
一个完整的HTTP请求过程如下：
    1、用户在浏览器输入URL
    2、域名解析（DNS的寻址）
    3、TCP三次握手
    4、握手成功后建立TCP通道，发起HTTP请求
    5、服务器响应HTTP请求，返回对应的响应报文
    6、客户端开始解析渲染
```

## 一、HTTP 请求阶段

- 1、`DNS`解析

  - 原因：人类容易记住域名，而计算机在网络通信过程中，无法认识域名，只能识别 IP 地址
  - DNS（Domain Name System）是“域名系统”的缩写。
  - 工作原理：将 域名 转换为 IP 地址
  - 查询解析过程： 操作系统本地的 hosts 文件 --> 本地 DNS 解析器缓存 --> 本地 DNS 服务器 --> 根 DNS 服务器
  - 备注：
    - 访问根 DNS 服务器时，会根据这个域名（比如.com）来判断是谁来授权管理，并返回一个负责该顶级域名服务器的一个 IP
    - 负责.com 域的服务器收到请求后，如果自己无法解析，会找管理.com 域的下一级 DNS 服务器地址(`http://google.com`)给本地 DNS 服务器
    - 不管经历几次往返查询，最终都是将结果（IP 地址）返回给本地 DNS 服务器，由此 DNS 服务器再返回给客户机
    - 从客户端到本地 DNS 服务器是属于递归查询，而 DNS 服务器之间的交互查询就是迭代查询

- 2、`TCP`协议的三次握手和四次挥手

  - 前言：http 是一种建立在 TCP 连接基础上的通信协议，要做一次 http 请求，首先就是要建立 TCP 连接
  - `TCP`连接是全双工通道，要建立一条全双工的数据通道，首先确认通道双方的数据收发能力是必须的，而三次握手，做的正是这个校验的操作：
    - 第一次握手：由客户端向服务端发起连接请求，服务端收到客户的请求，确认了客户端的消息发送是没有问题的
    - 第二次握手：由服务端向客户端发送可以建立连接的确认消息，客户端收到后，即可确认服务端的收发都是正常的
    - 第三次握手：由客户端向服务端发送确认消息，服务端收到后，即确认了客户端的接收能力是正常的，至此可以愉快的开始交流了
  - `TCP`连接验证通过（也就是说经过三次握手验证通过），并进行数据交互完成后，自然是要关闭通道，节省资源的，但关闭通道的前提是双方都要确认对方已经没有数据要发送了，所以就有了四次挥手的操作：
    - 第一次挥手：由客户端 1 通知客户端 2，己方已经没有消息要发送给客户端 2 了
    - 第二次挥手：由客户端 2 通知客户端 1，已收到通知
    - 第三次挥手：由客户端 2 通知客户端 1，己方已经没有消息要发送给客户端 1 了
    - 第四次挥手：由客户端 1 通知客户端 2，已收到通知
    - 简单来说，流程是： 1 --> 2， `2 -- 1， 2 -- 1，` 1 -- 2。
  - 经过四次挥手操作后，客户端 1、2 都已经确认双方不会再发送消息，随关闭通道
  - 备注：
    - 全双工（full-duplex）的系统允许二台设备间同时进行双向数据传输。一般的电话、手机就是全双工的系统，因为在讲话时同时也可以听到对方的声音。全双工的系统可以用一般的双向车道形容。两个方向的车辆因使用不同的车道，因此不会互相影响

- 3、浏览器`HTTP`请求并发数和`TCP`连接的关系

  - 当我们打开一个网页时，浏览器对网页中对 http 并发请求是有个数限制的。
    - 限制是针对域名的，即针对同一域名（包括二级域名）在同一时间支持的并发请求数量的限制。
    - 如果请求数目超出限制，则会阻塞
    - 不同浏览器的默认请求数目限制不同
    - 引申：有时候为了加速获取页面资源的速度，会将图片等静态资源使用不同的一级域名
  - 浏览器与服务器建立一个 TCP 连接后，是否会在完成一个 http 请求后断开？什么条件下会断开？
    - `HTTP/1.0`中，如果不设置头字段`Connection: keep-alive`，一个 http 请求收到服务器响应后，会断开对应的`TCP`链接
    - `HTTP/1.1`将`Connection`写入了标准，默认值为`keep-alive`。除非强制设置为`Connection: close`，才会在请求后断开 TCP 连接。
    - 所以，默认情况下建立的`TCP`连接不会断开。
  - 一个 TCP 连接可以同时发送几个 HTTP 请求？
    - `HTTP/1.1`中，单个 TCP 连接，在同一时间只能处理一个 http 请求
    - `HTTP2`提供了`多路传输`功能，多个 http 请求，可以同时在同一个 TCP 连接中进行传输。
  - 浏览器 http 请求的并发性是如何体现的？并发请求的数量有没有限制？
    - 页面资源请求时，浏览器会同时和服务器建立多个 TCP 连接，在同一个 TCP 连接上顺序处理多个 HTTP 请求。所以浏览器的并发性就体现在可以建立多个 TCP 连接，来支持多个 http 同时请求。
    - Chrome 浏览器最多允许对同一个域名 Host 建立 6 个 TCP 连接，不同的浏览器有所区别。
  - 可以修改浏览器的默认并发连接数，可能有助于提升打开网站的速度，但是连接数也不是越大越好。

- 4、`HTTPS` 和 `HTTP（HTTP2）` 的区别

  - 时间点：`HTTP/0.9`（1991 年）、`HTTP/1.0`（1996 年）、`HTTP/1.1`（1999 年）、`HTTP/2.0`（2015 年）
  - `HTTP/1.0`与`HTTP/1.1`的区别：

    - 缓存处理
    - 带宽优化及网络连接的使用
    - 错误通知的管理
    - Host 头处理
    - 长连接

  - `HTTP/1.x`与`HTTP/2.0`的区别：

    - 新的二进制格式（Binary Format）：HTTP1.x 的解析是基于文本，HTTP2.0 的协议解析采用二进制格式
    - 多路复用（MultiPlexing）：即连接共享，即每一个 request 都是是用作连接共享机制的
    - header 压缩：
    - 服务端推送（server push）

  - `HTTP`与`HTTPS`的区别：

    - HTTPS 协议需要到 CA 申请证书，一般免费证书很少，需要交费
    - HTTP 协议运行在 TCP 之上，所有传输的内容都是明文，HTTPS 运行在 SSL/TLS 之上，SSL/TLS 运行在 TCP 之上，所有传输的内容都经过加密的
    - HTTP 和 HTTPS 使用的是完全不同的连接方式，用的端口也不一样，前者是 80，后者是 443
    - HTTPS 可以有效的防止运营商劫持，解决了防劫持的一个大问题

  - `HTTP`的基本优化：
    - 影响一个 HTTP 网络请求的因素主要有两个：带宽和延迟
    - 带宽跟网络基础建设有关
    - 延迟：
      - 浏览器阻塞（HOL blocking）：参考上面的浏览器请求并发数限制
      - DNS 查询（DNS Lookup）： 参考上面的`DNS解析`进行优化
      - 建立连接（Initial connection）：参考上面`TCP`的三次握手和四次挥手

## 二、HTTP 响应阶段

- `HTTP`状态码

  - 定义：`响应状态码`，用来表示一个 HTTP 请求是否成功。
  - 信息型响应：

    - `100 Continue`
    - `101 Switching Protocol`
    - `102 Processing (WebDAV (en-US)) 102`
    - `103 Early Hints `

  - 成功响应

    - `200 OK`：请求成功
    - `201 Created`
    - `202 Accepted`
    - `203 Non-Authoritative Information`
    - `204 No Content`
    - `205 Reset Content`
    - `206 Partial Content`
    - `207 Multi-Status (WebDAV (en-US))`
    - `208 Already Reported (WebDAV (en-US))`
    - `226 IM Used (HTTP Delta encoding)`

  - 重定向

    - `300 Multiple Choice`
    - `301 Moved Permanently`：被请求的资源已永久移动到新位置，并且将来任何对此资源的引用都应该使用本响应返回的若干个 URI 之一
    - `302 Found`：请求的资源现在临时从不同的 URI 响应请求
    - `303 See Other`
    - `304 Not Modified`
    - `305 Use Proxy `
    - `306 unused`：在最新版的规范中，306 状态码已经不再被使用
    - `307 Temporary Redirect`
    - `308 Permanent Redirect`

  - 客户端错误
    - `400 Bad Request`
      - 语义有误，当前请求无法被服务器理解。除非进行修改，否则客户端不应该重复提交这个请求
      - 请求参数有误
    - `401 Unauthorized`：当前请求需要用户验证
    - `402 Payment Required`
    - `403 Forbidden`：服务器已经理解请求，但是拒绝执行它
    - `404 Not Found`：请求失败，请求所希望得到的资源未被在服务器上发现
    - `405 Method Not Allowed`：请求行中指定的请求方法不能被用于请求相应的资源
    - `406 Not Acceptable`
    - `407 Proxy Authentication Required`
    - `408 Request Timeout`：请求超时
    - `409 Conflict`
    - `410 Gone`
    - `411 Length Required`
    - `412 Precondition Failed`
    - `413 Payload Too Large`
    - `414 URI Too Long`
    - `415 Unsupported Media Type`
    - `416 Range Not Satisfiable`
    - `417 Expectation Failed`
    - `418 I'm a teapot`
    - `421 Misdirected Request`
    - `422 Unprocessable Entity (WebDAV (en-US))`
    - `423 Locked (WebDAV (en-US))`
    - `424 Failed Dependency (WebDAV (en-US))`
    - `425 Too Early`
    - `426 Upgrade Required`
    - `428 Precondition Required`
    - `429 Too Many Requests`
    - `431 Request Header Fields Too Large`
    - `451 Unavailable For Legal Reasons`
  - 服务端错误
    - `500 Internal Server Error`：服务器遇到了不知道如何处理的情况
    - `501 Not Implemented`：此请求方法不被服务器支持且无法被处理
    - `502 Bad Gateway`：此错误响应表明服务器作为网关需要得到一个处理这个请求的响应，但是得到一个错误的响应
    - `503 Service Unavailable`：服务器没有准备好处理请求
    - `504 Gateway Timeout`：当服务器作为网关，不能及时得到响应时返回此错误代码
    - `505 HTTP Version Not Supported`
    - `506 Variant Also Negotiates`
    - `507 Insufficient Storage`
    - `508 Loop Detected (WebDAV (en-US))`
    - `510 Not Extended`
    - `511 Network Authentication Required`
  - 参考： https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status

- 当响应完成之后，就会通过四次挥手关闭连接，至此响应阶段结束
- `HTTP`报文

## 三、浏览器渲染阶段

```text
浏览器的解析渲染流程，简单来说，如下所示：
    1、第一次自上而下走完后，只生成`DOM树`
    2、CSS处理完成生成`CSSOM`
    3、`DOM树 + CSSOM`，合并生成`Render Tree渲染树`
    4、CPU根据`Render Tree渲染树`进行页面绘图
    5、备注：构建DOM的过程中，如果碰到script标签时，会先执行js脚本，然后再继续构建DOM
```

- 进程 Process

  - 是计算机中已运行程序的实体
  - 浏览器是多进程的
    - 1、Browser 进程
    - 2、第三方插件进程
    - 3、GPU 进程
    - 4、浏览器渲染进程（浏览器内核）（Renderer 进程，内部是多线程的）
  - 简单来说，就是在浏览器中打开一个网页相当于新起了一个进程（进程内有自己的多线程）

- 线程 Thread

  - 是操作系统能够进行运算调度的最小单位
  - 它被包含在进程之中，是进程中的实际运作单位
  - 一条线程指的是进程中一个单一顺序的控制流，一个进程中可以并行多个线程，每条线程并行执行不同的任务
  - 浏览器的`渲染进程`：
    - 1、GUI 渲染线程：负责渲染浏览器界面，解析 HTML，CSS，构建 DOM 树和 RenderObject 树，布局和绘制等
    - 2、JS 引擎线程：也称为 JS 内核，负责处理 Javascript 脚本程序
      - 注意：`GUI渲染线程`与`JS引擎线程`是`互斥`的
      - 所以如果 JS 执行的时间过长，这样就会造成页面的渲染不连贯，导致页面渲染加载阻塞
    - 3、事件触发线程：归属于浏览器而不是 JS 引擎，用来控制事件循环。比如执行代码块`setTimeOut`、鼠标点击事件和 Ajax 异步请求等

- 栈内存 Stack

  - 主要用于存放基本类型和对象变量的指针
  - 后进先出（LIFO）

- 解析 JS 代码：
  - JS 分为同步任务和异步任务
  - 同步任务都在主线程上执行，形成一个执行栈
  - 主线程之外，事件触发线程管理着一个任务队列，即`Task queue任务队列`
  - 注意: 总是要等待栈（主线程）中的代码执行完毕后才会去读取事件队列中的事件

备注： 浏览器的`渲染进程`是`多线程`的，js 是单线程的

- _1、拿到服务器的响应代码后：浏览器在内存条中开辟出一块栈内存，用来给代码的执行提供环境_
- _2、同时分配一个主线程去一行行的解析和执行代码_
- _3、当浏览器遇到 link/script/img 等请求时，都会开辟全新的线程去加载资源文件_
  - 开辟全新的线程会产生 `Task queue任务队列`
- _4、第一次自上而下走完后，只生成`DOM树`_
- _5、CSS 处理完成生成`CSSOM`_
  - js 和 css 可以并行加载，但是还是需要等待 js 执行完毕后，才能继续解析剩余等 DOM
  - css 放顶部：防止页面重绘
  - js 放底部：防止阻塞 DOM 渲染
- _6、`DOM树 + CSSOM`，合并生成`Render Tree渲染树`_
  - Layout（回流）：根据生成的渲染树，计算它们在设备视口（viewport）内的确切位置和大小，这个计算的阶段就是回流。
    - 放弃传统操作 DOM 的时代，基于 vue/react 开始数据影响视图模式： mvvm/mvc/(virtual dom)/(dom diff)...
    - 分离读写操作（现代的浏览器都有渲染队列的机制）
    - 样式集中改变（批量处理）
  - Painting（重绘）：根据渲染树以及回流得到的几何信息，得到节点的绝对像素
  - Display：将像素发送给 GPU，展示到页面上
  - 注意：回流一定会触发重绘，但是重绘不一定会回流
- _7、CPU 根据`Render Tree渲染树`进行页面绘图_
- _8、Event Loop 事件循环（找 Task queue 任务队列中的任务，将完成的任务插入主线程）_
- _9、`微任务（microtask）`和`宏任务（macrotask）`_

  - 在 ECMAScript 中，microtask 称为 jobs，macrotask 可称为 task
  - `微任务（microtask）`：Promise，process.nextTick 等
  - `宏任务（macrotask）`：主代码块，setTimeout，setInterval 等
  - 在当前的微任务没有执行完成时，是不会执行下一个宏任务的
  - 同一层级下，微任务永远比宏任务先执行，即 Promise.then 比 setTimeout 先执行

- _10、性能优化：减少 HTTP 的请求次数以及大小_
  - 资源合并压缩
  - 图片懒加载
  - 音视频走流文件 - m3u8
  - DNS/304 缓存
  - ......
