# 数据库读写分离方案

## 1. 读写分离

读写分离是数据库系统为解决单机数据库的性能瓶颈而出现的一种技术。简单来说，就是将数据库的读和写操作分别放在不同的服务器上，从而提高数据库的并发处理能力。

## 2. 读写分离方案

常见的读写分离方案有以下几种：

- 共享存储
- 消息队列
- 数据库代理

### 2.1 共享存储
