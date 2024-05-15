# Gateway

::: tip Gateway
Gateway、微服务
:::

## 一、Gateway 是什么

![An image](/images/dev-ops/gateway.png)

## 1）概念

在微服务架构中，Gateway（网关）是一个用于管理和处理微服务之间通信的服务。它作为系统的入口点，负责处理外部请求、路由请求到相应的微服务、提供安全性和监控等功能。

## 2）作用

- 安全认证：对用户请求做身份认证、权限校验；
  - 可能涉及使用令牌(Token)、OAuth 等机制，以及与认证服务的集成。
- 服务路由：将用户请求路由到微服务，并实现负载均衡；
  - 可能涉及到服务发现、动态路由配置等。
- 流量控制：对用户请求做限流操作；
  - 通过设置请求速率限制、并发连接数控制等方式来实现。
- 日志监控：收集、记录和分析网关以及微服务的日志信息，用于监控系统的运行状况、故障排除以及性能分析。
  - 涉及到使用 ELK（Elasticsearch, Logstash, Kibana）等日志分析工具。
- 熔断保护：实施熔断机制，当微服务发生故障或异常时，防止错误的传播到整个系统，提高系统的容错性。
  - 可以通过使用 Hystrix 等熔断框架来实现。

## 二、Gateway 怎么用

## 1）常见实现方式

- **Nginx**。 使用 Nginx 的反向代理和负载均衡可实现对 api 服务器的负载均衡及高可用。
- **zuul**。Zuul 是 Netflix 出品的一个基于 JVM 路由和服务端的负载均衡器。Netflix 开源，功能丰富，使用 JAVA 开发，易于二次开发；需要运行在 web 容器中，如 Tomcat。但是缺乏管控，无法动态配置；依赖组件较多；处理 Http 请求依赖的是 Web 容器，性能不如 Nginx；
- **spring cloud gateway**。gateway 是 spring 出品的 基于 spring 的网关项目，集成断路器，路径重写，性能比 Zuul 好。

## 2）具体设置

> 文件配置（路由、过滤器等）以及跨域设置：（略）

## 三、其他备注

> TODO

---

- [Gateway 服务网关 (入门到使用) ](https://www.cnblogs.com/buchizicai/p/17093564.html)
- [Gateway 网关-网关作用介绍](https://blog.csdn.net/LMGD_/article/details/128400626)
- [Gateway 网关](https://www.cnblogs.com/wenxuehai/p/16262799.html)
