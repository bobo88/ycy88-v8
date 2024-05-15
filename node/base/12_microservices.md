# Node 系列之微服务

::: tip 一句话
BFF，英文全称：Backend For Frontend，指为前端应用开发的后端服务，主要做聚合和裁剪的逻辑。
:::

## 一、BFF 的定位

TODO...

## 二、注意点

日志，安全，高可用，高并发，限流，rpc 服务，负载均衡，监控，压力测试等

## 三、BFF 劣势有哪些

- 重复开发：每个设备开发一个 BFF 应用，也会面临一些重复开发的问题展示，增加开发成本
- 维护问题：需要维护各种 BFF 应用,以往前端也不需要关心并发，现在并发压力却集中到了 BFF 上
- 链路复杂：流程变得繁琐，BFF 引入后，要同时走前端、服务端的研发流程，多端发布、互相依赖，导致流程繁琐
- 浪费资源: BFF 层多了，资源占用就成了问题，会浪费资源，除非有弹性伸缩扩容

---

- [微服务架构中的 BFF 到底是啥？](https://blog.csdn.net/qq_42945742/article/details/109543131)
- [手把手带你学习 Midwayjs 实战，学不会算我输](https://jishuin.proginn.com/p/763bfbd79bac)
- [中台背景下如何用 Node 做 BFF 层](https://itindex.net/detail/61090-%E4%B8%AD%E5%8F%B0-%E8%83%8C%E6%99%AF-node)
- [飞猪基于 Serverless 的云+端实践与思考](https://blog.csdn.net/yunqiinsight/article/details/117258089)
- [使用 Node.js 构建 BFF 层（一）](https://juejin.cn/post/6996935339386339336)
- [使用 Node.js 构建 BFF 层（二）](https://juejin.cn/post/6997704376777179172)
