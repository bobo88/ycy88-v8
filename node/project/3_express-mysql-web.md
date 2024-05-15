# Express+MySQL 搭建实战

> Express：高度包容、快速而极简的 Node.js Web 框架

## 第一部分 构建 Web 服务器

> node-express-boilerplate：一个样板/启动项目，用于使用 Node.js、Express 和 Mongoose 快速构建 RESTful API。

## 一、二开

> 基于 node-express-boilerplate 构建，将 Mongoose 调整为 MySql。

### 1）文件目录结构

```bash
src\
 |--config\         # 环境变量和配置相关的东西： Environment variables and configuration related things
 |--controllers\    # 路由控制器（控制器层）：Route controllers (controller layer)
 |--docs\           # 接口文档文件： Swagger files
 |--middlewares\    # 自定义express中间件： Custom express middlewares
 |--models\         # Mongoose模型（数据层）： Mongoose models (data layer)
 |--routes\         # 路由（路线）：Routes
 |--services\       # 业务逻辑（服务层）： Business logic (service layer)
 |--utils\          # 实用程序类和函数： Utility classes and functions
 |--validations\    # 请求数据验证架构：Request data validation schemas
 |--app.js          # Express应用： Express app
 |--index.js        # 应用程序入口点： App entry point
```

### 2）项目流程图

> 简单介绍项目的架构流程，以及代码主要运行流程。

![An image](/images/node/express/express-mysql.png)

## 二、运行项目

> 步骤：下载源码 -- 安装依赖 -- 代码调整 -- 运行项目

```bash
# 1. 下载源码
$ git clone https://github.com/hagopj13/node-express-boilerplate.git

# 2. 安装依赖
$ yarn # OR: npm i

# 3. 代码调整
# 3.1 新建 .env 文件
$ TODO
# 3.2 新建 .env 文件
# 3.3 新建 .env 文件

# 4. 运行项目
$ yarn dev
```

## 三、CRUD 全链路

> 以 USER 用户表为例

### 1）Create

> Create：创建用户信息

TOOO

### 2）Read

> Read：读取用户信息

TOOD

### 3）Update

> Update：更新用户信息

TOOD

### 4）Delete

> Delete：删除用户信息

TOOD

## 第二部分 框架优化

## 一、TODO

> TODO

## 二、TODO

> TODO

## 第三部分 高级应用

## 一、TODO

> TODO

---

- [node-express-boilerplate 仓库地址](https://github.com/hagopj13/node-express-boilerplate)
- [使用 Sequelize](https://www.liaoxuefeng.com/wiki/1022910821149312/1101571555324224)
- [Sequelize 官网](https://sequelize.org/)
- [Sequelize Docs 中文版](https://demopark.github.io/sequelize-docs-Zh-CN/)
- [Using Sequelize ORM with Node.js & MySQL](https://usecsv.com/community/sequelize-with-nodejs)
- [Nodejs 之 ORM 框架](https://juejin.cn/post/6844903936466354183)
- [Nodejs ORM 框架 Sequelize 快速入门](https://juejin.cn/post/7008441612485263396)
- [在 sequelize 里面定义实例方法 methods 和静态方法 statics](https://www.jianshu.com/p/e392063784ff)
- [使用 bcrypt 对数据加密](https://www.cnblogs.com/comyan/p/14074907.html)
- [Node.js 第七篇：Node.js 中使用 bcryptjs](https://www.cnblogs.com/lpl666/p/12873011.html)
- [CMS-项目的技术架构](https://blog.csdn.net/weixin_42528266/article/details/103854543)
- [Node 服务端框架 Express-Sequelize-Mysql 模型架构设计](https://blog.csdn.net/weixin_43295498/article/details/125569635)
- [node-js-express-sequelize-mysql](https://www.bezkoder.com/node-js-express-sequelize-mysql/)
- [mysql-connection-with-node-js-using-sequelize-and-express](https://www.turing.com/kb/mysql-connection-with-node-js-using-sequelize-and-express)
- [ORM 框架-Sequelize](https://juejin.cn/post/6893870075783643144)

---

- [11](https://lo-victoria.com/build-a-rest-api-with-nodejs-routes-and-controllers)
- [22](https://github.com/sequelize/sequelize-auto)
- [33](https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/core-concepts/getting-started.md)
- [44](https://demopark.github.io/sequelize-docs-Zh-CN/core-concepts/model-querying-basics.html)

<!-- ```
- 运行流程：从上至下（文件有包含关系）
  - index.js
  - app.js
  - routes/index.js：路由。引入包含 权限路由/用户路由等。
  - middlewares：提供权限/验证/报错等中间件函数。
    - utils/pick.js
  - validations/index.js：定义验证内容。对请求参数等进行校验。
  - controllers/index.js：
  - services/index.js：
``` -->
