# 前端调试时开启服务器的方法

## 一、 http-server

http-server 是一个超轻量级 web 服务器。

```js
// 1. 安装
$ npm i http-server -g

// 2. 使用 (在想要跑临时服务器的目录下运行如下命令)
$ http-server
// OR: 指定端口
$ http-server --port 3000
// OR: 命令简写
$ hs -p 4000
```

## 二、live-server

```js
// 1. 全局安装
$ npm i -g live-server

// 2. 使用 (在想要跑临时服务器的目录下运行如下命令)
$ live-server
```

## 三、工具自带或安装插件

比如 HBuilder 打开项目可以直接点击「运行」即可。

或者 VScode 安装相关插件（比如「live-server(Five Server)」)也可以右击项目运行「Open with Five Server」。

## 四、TODO
