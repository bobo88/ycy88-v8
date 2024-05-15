# MySQL 小试牛刀

## 一、下载安装

官网下载地址：<a href="https://dev.mysql.com/downloads/installer/" target="_blank">MySQL download</a><br />

### 1.1 安装的步骤，基本上一路 Next 即可

<img width="600" src="/images/tools/mysql/mysql.png" /><br/>
<img width="600" src="/images/tools/mysql/mysql_2.png" /><br/>
<img width="600" src="/images/tools/mysql/mysql_3.png" /><br/>
<img width="600" src="/images/tools/mysql/mysql_4.png" /><br/>
<img width="600" src="/images/tools/mysql/mysql_5.png" /><br/>
<img width="600" src="/images/tools/mysql/mysql_6.png" /><br/>
<img width="600" src="/images/tools/mysql/mysql_7.png" /><br/>

### 1.2 配置环境变量（window）

```
1.找到 MySQL 安装路径（注意是 bin 文件下）
2.右键打开 "此电脑"属性，先点击 "高级系统设置"，再点击 "环境变量"
3.在 "系统变量"中选择 "Path"，点击 "编辑"
4.点击 "新建"，将MySQL的安装路径添加上去，之后点击 "确定"
5.一路确定保存设置
```

## 二、建表

### 2.1 使用可视化工具：Navicat

### 2.2 建立 Test 表

<img width="100%" src="/images/tools/mysql/mysql_8.png" /><br/>

## 三、具体使用

### 3.1 利用 koa 脚手架（koa-generator）初始化项目

```js
// 1. 全局安装
$ npm install -g koa-generator

// 2. 初始化项目
$ koa2 -e koa2-bff

// 3. 下载安装依赖
$ npm i

// 4. 安装 mysql 等
$ npm i mysql axios
$ npm i cross-env -D

// 5. 添加配置： mysql等相关
// 5.1 修改 package.json
"scripts": {
  // 省略其他
  "dev": "cross-env NODE_ENV=dev ./node_modules/.bin/nodemon bin/www",
},

// 5.2 新建 conf 目录
// a) 新建 conf/controller/user.js
// b) 新建 conf/db/db.js 和 conf/db/mysql.js
// c) 新建 conf/model/resModel.js

// 5.3 调整 routes/user.js
// ======= 备注：5.2和5.3修改文件详见下文 =======
```

### 3.2 承接上文（5.2/5.3 新增和修改文件详情）

```js
// conf/controller/user.js
const axios = require('axios')
const { exec } = require('../db/mysql')

// 获取百度美女图
const beautyList =
  'https://image.baidu.com/search/acjson?tn=resultjson_com&logid=11675912631845458643&ipn=rj&ct=201326592&is=&fp=result&fr=ala&word=%E7%BE%8E%E5%A5%B3%E5%9B%BE&cg=girl&queryWord=%E7%BE%8E%E5%A5%B3%E5%9B%BE&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=&z=&ic=&hd=&latest=&copyright=&s=&se=&tab=&width=&height=&face=&istype=&qc=&nc=&expermode=&nojc=&isAsync=&pn=60&rn=30&gsm=3c&1670313780014='

//--------------------------------- USER LIST -------------------------------------------------------------
// 1、API：-- 获取用户列表
const userList = async (pageIndex) => {
  const resData = await axios.get(beautyList)
  let pageSize = 20
  let limitStart = pageSize * (pageIndex - 1)
  let sqlTotal = 'SELECT COUNT(*) as total FROM test_user WHERE 1=1 '
  let sql = `SELECT * FROM test_user WHERE 1=1 `
  sql += `ORDER BY id DESC `
  if (pageIndex) {
    sql += `LIMIT ${limitStart}, ${pageSize} `
  } else {
    sql += `LIMIT 0, 5 `
  }
  sql += ';'
  sqlTotal += ';'
  let rows = await exec(sqlTotal)
  return {
    total: rows[0].total || 0,
    list: await exec(sql),
    beautyList: resData.data.data || []
  }
}

module.exports = {
  userList
}
```

```js
// conf/db/db.js
const env = process.env.NODE_ENV

// 配置
let MYSQL_CONF

if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '******',
    port: '3306',
    database: 'bff_schema'
  }
}

if (env === 'production') {
  // MYSQL_CONF = {
  //   host: 'localhost',
  //   user: 'root',
  //   password: 'password',
  //   port: '3306',
  //   database: 'yuanbo_web'
  // }
}

module.exports = {
  MYSQL_CONF
}
```

```js
// conf/db/mysql.js
const mysql = require('mysql')
const { MYSQL_CONF } = require('./db')

const mysqlConnect = mysql.createConnection(MYSQL_CONF)

// 开始连接
mysqlConnect.connect()

function exec(sql) {
  const promise = new Promise((resolve, reject) => {
    mysqlConnect.query(sql, (err, result) => {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
  return promise
}

module.exports = {
  exec,
  escape: mysql.escape
}
```

```js
// conf/model/resModel.js
class BaseModel {
  constructor(data, message) {
    if (typeof data === 'string') {
      this.message = data
      data = null
      message = null
    }
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.code = 0
  }
}

class ErrorModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.code = -1
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}
```

```js
// routes/user.js
const router = require('koa-router')()
// 引入 API 列表
const { userList } = require('../conf/controller/user')
const { SuccessModel, ErrorModel } = require('../conf/model/resModel')

router.prefix('/users')

router.get('/', async function (ctx, next) {
  ctx.body = 'this is a users response!'
  const body = ctx.request.body
  let { pageIndex = 1 } = body
  const listData = await userList(pageIndex)
  ctx.body = new SuccessModel(listData)
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
```

### 3.3 浏览器访问 localhost:3000/users/ 即可得到如下数据

<img width="100%" src="/images/tools/mysql/mysql_9.png" /><br/>

## 四、常见问题

### 4.1 koa/Express 无法连接 MySQL（throw err// Rethrow non-MySQL errors）

原因：MySQL8.0.4 以前 MySQL 的密码认证插件是 "mysql_native_password"，而现在使用的是 "caching_sha2_password"。

```js
// 进入mysql 输入密码例如：123456
mysql -u root -p

// 1.执行语句 alter user 'root'@'localhost' identified with mysql_native_password by 密码;
mysql> alter user 'root'@'localhost' identified with mysql_native_password by '123456';
Query OK, 0 rows affected (0.43 sec)

// 2.再执行语句 flush privileges;
mysql> flush privileges;
Query OK, 0 rows affected (0.05 sec)

//3.成功后 退出
mysql> quit
Bye
```

### 4.2 cmd 中输入 net start mysql 提示：服务名无效或者 MySQL 正在启动 MySQL 无法启动

```js
// 1. DOS窗口需要定位路径在 MySQL 的安装路径下 （特别注意：需要 “管理员身份运行”）
cd C:\Program Files\MySQL\MySQL Server 8.0\bin

// 2. 运行 mysqld --install
C:\Program Files\MySQL\MySQL Server 8.0\bin>mysqld --install
Service successfully installed.

// 3. 运行 mysqld --initialize：删除mysql下的data文件，重新执行 mysqld --initialize 就可以在当前路径下生成data文件夹
C:\Program Files\MySQL\MySQL Server 8.0\bin>mysqld --initialize

// 4. 运行 MySQL：启动mysql
C:\Program Files\MySQL\MySQL Server 8.0\bin>net start mysql
MySQL 服务正在启动 .
MySQL 服务已经启动成功。
```

参考：<br />
<a href="http://www.navicat.com.cn/" target="_blank">navicat 官网</a><br />
<a href="https://blog.csdn.net/weixin_50498482/article/details/124315351" target="_blank">最新 MySql 安装教学，非常详细</a><br />
