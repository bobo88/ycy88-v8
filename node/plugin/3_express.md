# Node 系列之 Express

::: warning 注意
本文状态：未完待续...<br/>
基于 node-express-boilerplate 进行开发；<br/>
技术栈包含：Express/Mongoose 等。
:::

## Express 简述

> 高度包容、快速而极简的 Node.js Web 框架

## 第一部分 构建 Web 服务器

## 一、node-express-boilerplate

### 1）RESTful API Node Server Boilerplate

> 一个样板/启动项目，用于使用 Node.js、Express 和 Mongoose 快速构建 RESTful API。

### 2）快速启动

> 创建项目 -- 安装依赖 -- 新建.env 文件 -- 安装 MongoDB -- 运行。

a. 创建项目

```js
npx create-nodejs-express-app <project-name>
```

OR

```js
npm init nodejs-express-app <project-name>
```

b. 安装依赖

```js
yarn install
```

c. 新建.env 文件，直接 copy .env.example 即可

d. 安装 MongoDB

> 文章后面会详细介绍

e. 运行

```js
// Running locally
yarn dev

// 试生产
yarn start
```

### 3）Features

> 简述 node-express-boilerplate 的特色

- NoSQL 数据库：使用 Mongoose 的 MongoDB 对象数据建模
- 身份验证和授权：使用 passport
- 验证：使用 Joi 请求数据验证
- 日志：使用 winston 和 morgan
- 测试：使用 Jest 的单元和集成测试
- 错误处理：集中式错误处理机制
- API 文档：带有 swagger-jsdoc 和 swagger-ui-express
- 过程管理：使用 PM2 的先进生产过程管理
- 依赖关系管理：使用纱线
- 环境变量：使用 dotenv 和 cross-env
- 安全性：使用头盔设置安全 HTTP 标头
- Santizing：针对 xss 和查询注入清理请求数据
- CORS:Cross-OriginResource-Sharing 使用 CORS 启用
- 压缩：gzip 压缩和压缩
- CI：与 Travis CI 的持续集成
- Docker support
- 代码覆盖范围：使用工作服
- 代码质量：带密码
- Git 钩子：带有 husky 和 lint-staged
- 衣料：带 ESLint 且更漂亮
- 编辑器配置：使用 EditorConfig 的一致编辑器配置

### 4）使用文档简述

> TODO

## 二、安装 MongoDB

> TODO

## 三、API 接口撰写

> TODO

### 1）Apifox 工具

> TODO

### 2）生成 Swagger 类似接口文档

> Apifox 将接口导出为 md 文档，利用其他工具将 md 文档转为 doc 文档或者 PDF 文档等。<br/>
> 如使用 Mdnice 即可将 Markdown 导出为 PDF 格式。

注意：Swagger 规范里是没有顺序的概念的，也没有分组的概念。

- [导出 API 接口指南](https://apifox.com/help/app/export/)

### 3）TODO

> TODO

## 第二部分 框架优化

## 一、引入 MySQL

> 在 express 项目中操作数据库的步骤

- ① 安装操作 MySQL 数据库的第三方模块(mysql)
- ② 通过 mysql 模块连接到 MySQL 数据库
- ③ 通过 mysql 模块执行 SQL 语句

### 1）项目安装 mysql 模块

> yarn add mysql

### 2）本机安装 mysql

> 以 Windows 系统为例

```js
// ===== 常见命令 =====
// 1. 启动mysql
net start mysql

// 2. 启动登录
mysql -u root -p   // 回车，输入默认的那个极其安全的密码。

// 3. 停止服务
net stop mysql

// 4. 修改密码
ALTER USER root@localhost IDENTIFIED BY 123456
```

- [MySQL 小试牛刀](https://fe.ycy88.com/backend/MySQL.html)
- 官网：https://www.mysql.com/cn/
- 下载社区版：https://dev.mysql.com/downloads/mysql/
  - ![An image](/images/node/express/mysql.png)
- [xx](https://blog.csdn.net/qq_36923376/article/details/83590828)
  - ![An image](/images/node/express/mysql-2.png)

### 3）配置 mysql 模块

> 在使用 mysql 模块操作 MySQL 数据库之前，必须先对 mysql 模块进行必要的配置，主要的配置步骤如下：

```js
// == TODO
```

### 4）测试 mysql 模块能否正常工作

> TODO -- 增删改查

- [基于 express 框架操作 Mysql 数据库](https://blog.csdn.net/h18377528386/article/details/123376904)
- [express 服务器引入 mysql](https://blog.csdn.net/m0_45136861/article/details/114340541)
- [sequelize](https://sequelize.org/)

## 二、TODO

> TODO

## 第三部分 高级应用

## 一、TODO

> TODO

---

- [node-express-boilerplate 具体说明](https://www.5axxw.com/wiki/content/z3s21v)
- [node-express-boilerplate github](https://github.com/hagopj13/node-express-boilerplate)
- [express-es6-rest-api github](https://github.com/developit/express-es6-rest-api)
- [express-typescript-boilerplate github](https://github.com/w3tecch/express-typescript-boilerplate)
- [express 中文官网](https://expressjs.com/zh-cn/)
- [express 实战](https://bignerdcoding.gitbooks.io/express/content/gou-jian-api-jie-kou.html)

---

- [简单用 Express 写一下接口](https://juejin.cn/post/7072704649706504200)
- [Node.js - 使用 express 创建 API 接口](https://juejin.cn/post/7085128644745494536)
- [Node.js Express API Server 快速开始](https://docs.authing.cn/v2/quickstarts/apiServer/nodeJsExpress/)
- [构建 API 接口](https://bignerdcoding.gitbooks.io/express/content/gou-jian-api-jie-kou.html)
- [使用 Node、Express 和 MongoDB 快速开发 API 接口](https://wisestcoder.github.io/node-express-mongodb-api/)
- [如何使用 Node.js 开发 RESTful API 接口](https://cloud.tencent.com/developer/article/2045817)
- [Node.js 之 Express、路由、中间件、接口跨域解决方案详解（附实例）](https://developer.aliyun.com/article/990141)
- [用 node.js 编写 api 接口](https://www.cnblogs.com/tuspring/p/14340457.html)
