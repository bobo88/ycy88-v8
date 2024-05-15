# nodemon

::: tip 概念
nodemon 是一个自动重启 node 应用的工具，当监听的文件或监听目录下的文件发生修改时，自动重启应用。
:::

## 一、使用教程

```js
// 1. 安装
$ npm i -g nodemon    // 全局安装
$ npm i -D nodemon    // 本地安装

// 2. 启动项目
$ nodemon [your node app]

// 3. 其他
$ nodemon ./server.js localhost 8080   // 如果没有在应用中指定主机和端口，可以在命令中指定
$ nodemon --debug ./server.js 80       // 开启debug模式
```

## 二、配置文件

支持本地和全局配置文件。配置文件一般命名为 nodemon.json，可以放置在当前目录或者你的根目录。如果配置了其他名称的配置文件，可以通过* --config *选项指定。

配置文件的优先级：

- 命令行传入的参数（优先级最高）
- 本地配置文件 （优先级次之）
- 全局配置文件 （优先级最低）

```js
// 1. 监听多个目录
// nodemon默认监听当前的工作目录。如果你想自己控制监听范围，可以使用* --watch *参数增加指定的路径：
nodemon --watch app --watch libs app/server.js

// 2. 指定监听对象的扩展名
// nodemon默认监听对象扩展名有.js/.mjs/.coffee/.litcoffee/.json。如果你使用* --exec 选项并监听app.py，nodemon会监听以.py为扩展名的文件。你也可以使用-e 或者 --ext*来指定自己的列表
nodemon -e js,pug

// 3. 忽略文件
// nodemon默认在.js文件修改时，重启应用。有时候也许，你想忽略某些文件/目录/文件名称模式（匹配文件名），来阻止nodemon过早的重启应用。
nodemon --ignore lib/ --ignore tests/             // 忽略指定文件
nodemon --ignore lib/app.js                       // 指定某个文件被忽略
nodemon --ignore 'lib/*.js'                       // 指定pattern，可以忽略匹配文件（但是要确定要用引号包含参数）

// 4. 应用没有重新启动
nodemon -L

// 5. 延迟重启，单位默认为ms
nodemon --delay 10 server.js
nodemon --delay 2.5 { "delay": "2500" }     // 二者等价
```

参考地址：<br/>
<a href="https://www.npmjs.com/package/nodemon" target="_blank">nodemon</a> <br/>
