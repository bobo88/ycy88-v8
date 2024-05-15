# 前端监控系统搭建

本文主要简单的论述一下前端监控系统的必要性，并分析前端监控的具体实施步骤，以及简单列举一下目前市面上存在的一些成熟的前端监控解决方案等。

## 一、前端监控的必要性

可能很多人会认为 “只要后端稳定可控，应用就是稳定可控的”。

但是如下几个场景是否我们也经常碰到过呢？

- 页面资源（CSS/JS/Image...）请求出现错误，比如资源路径不对，或者前端代码出现报错异常
- 页面请求出现跨域情况
- 页面加载很缓慢，出现超时白屏的可能性
- 业务场景下，如何分析用户在页面中的行为以及用户的体验

上述的场景可能隐藏在我们项目中的任何一个地方，换句话说，就是在我们的开发过程中，我们可能无法及时知晓问题的存在。可能更多的时候是用户使用过程中发现了问题并反馈给我们，然后我们再着手调整或者修复这些问题。

但这是被动的！！！

前端监控的意义就是为了“化被动为主动”。

## 二、前端监控的应用场景分类

### 1. 追踪异常

项目中的异常总体可以分为两大类，一类是前端异常，一类是接口异常。

- 前端异常：
  - JS 代码执行异常
  - Promise 异常
  - 静态资源加载异常
  - console.error 异常
  - 跨域异常
- 接口异常：接口异常属于后端的异常，但是接口异常会直接导致前端页面错误，因此这类异常是我们判断线上问题根源的重要依据。
  - 未响应/超时响应异常
  - 4xx 请求异常
  - 5xx 服务器异常
  - 权限不足

### 2. 性能监控

- 分析页面加载时间：白屏时间 / 首屏时间 / 页面完全加载时间 / 静态资源加载耗时
- 请求接口数量
- 请求资源总量
- ......

### 3. 埋点监控

- PV / UV
- 用户行为
- 用户转化
- ......

## 三、前端监控的流程步骤

- 采集阶段：数据的采集
  - 【前端数据采集】
- API 阶段：搭建 API 应用，接收采集到的数据
  - 【后端数据接收】
- 数据存储阶段：API 应用对接数据库，将采集到的数据存起来
  - 【数据清洗存储】
- 查询统计阶段：对采集到的数据进行查询，统计，分析
  - 【数据统计分析】
- 可视化阶段：前端通过 API 查询统计数据，做可视化展示
  - 【数据可视化】
- 报警阶段：API 对接报警通知服务，如钉钉实时提醒等
  - 【实时报警提示】
- 部署阶段：应用整体部署上线

## 四、前端监控的实现方案

### 4.1 前端异常

处理方案是：全局捕获，用 window.addEventListener('error') 和 window.addEventListener('unhandledrejection') 即可

```js
// 可以全局捕获到 JS 异常和资源加载异常
window.addEventListener(
  'error',
  function (err) {
    console.log('捕获到异常---: ', err)
  },
  true
)
```

```js
// 1. 模拟 promise 异常错误
new Promise((resolve, reject) => {
  reject(new Error('自定义异常'))
})

// 2. promise 错误捕获
window.addEventListener('unhandledrejection', (error) => {
  // 打印异常原因
  console.log('unhandledrejection捕获到异常---: ', error.reason)
  // 上报错误
  // todo...
  // 阻止控制台打印
  error.preventDefault()
})
```

- 捕获资源异常
  ![An image](/images/tools/monitor/frontend_monitor.png)

- 捕获 Promise 异常
  ![An image](/images/tools/monitor/frontend_monitor_2.png)

### 4.2 接口异常

处理方案是：全局封装 Axios（以 VUE/React 项目为例）拦截器

```js
// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // 发生异常会走到这里
    if (error.response) {
      let response = error.response
      if (response.status >= 400) {
        handleError(response)
      }
    } else {
      // 如果没有响应，可以看作是接口超时异常，调用异常处理函数时传一个 null 即可。
      handleError(null)
    }
    return Promise.reject(error)
  }
)
```

### 4.3 异常处理函数（封装）

```js
// 1. 定义
const handleError = (error: any, type: 1 | 2) {
  if(type == 1) {
    // 处理接口异常，一般需要的数据字段如下：
    // code：http 状态码
    // url：接口请求地址
    // method：接口请求方法
    // params：接口请求参数
    // error：接口报错信息
  }
  if(type == 2) {
    // 处理前端异常，常见异常如下：
    // ReferenceError：引用错误
    // RangeError：超出有效范围
    // TypeError：类型错误
    // URIError：URI 解析错误
  }
}

// 2. 使用
// 处理前端异常：handleError(error, 1)
// 处理接口异常：handleError(error, 2)
```

### 4.4 获取环境数据

基础的环境数据应该包括如下数据：

- app：应用的名称/标识
- env：应用环境，一般是开发，测试，生产
- version：应用的版本号
- user_id：触发异常的用户 ID
- user_name：触发异常的用户名
- page_route：异常的页面路由
- page_title：异常的页面名称

## 五、成熟的前端监控解决方案

前端监控发展到现在，必然会有成熟的第三方平台。目前国内最常用的有三个：

- sentry： 收费
- webfunny: 免费
- fundebug： 收费

<!-- 查询统计阶段：数据查询和统计分析
这里有个优化点，因为频繁请求会加重接口负担，因此数据也可以本地先存储一部分，达到一定量之后再请求接口，一次性存入。 -->

---

- [搭建前端监控，如何采集异常数据？](https://segmentfault.com/a/1190000041962607)
- [webfunny 官网](https://www.webfunny.cn/)
- [用户行为监控之 webfunny](https://www.jianshu.com/p/002cfde813dd)
- [深入了解前端监控原理](https://juejin.cn/post/6899430989404045320)
- [5 分钟撸一个前端性能监控工具](https://juejin.cn/post/6844903662020460552)
- [万字长文，解读前端性能监控原理](https://juejin.cn/post/7169875222005301261)
