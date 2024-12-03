# 项目运行报错（部分汇总）

::: warning 报错（1）

➜ Local: http://localhost:3001/
➜ Network: use --host to expose

为什么通过 ip:3001 访问不了？

> 表示你的应用程序只监听了本地回环地址 localhost，即只允许从本机访问它。要使其能够从其他设备（例如通过 IP 地址访问）访问，你需要告诉它监听所有网络接口或指定一个公开的 IP 地址。

```bash
npm run dev -- --host 0.0.0.0
```

> [Nuxt3 中设置接口代理](https://juejin.cn/post/7256954816793608248)

> [Nuxt3 反向代理配置](https://cloud.tencent.com/developer/article/2352865)

:::
