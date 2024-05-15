# 组件库的 npm 包发布和维护

基于 elementPlus 开发的组件库，进行 npm 私库发布和维护的流程

## 一、npm 仓库介绍

npm 是一个包管理工具，分为私有库和公有库，在日常工作中, 我们在开发过程中, 总是会出现一些共用的组件或者公共方法, 如果每次每个项目都要黏贴复制,还会出错, 为了降低开发成本可以把它独立为一个 npm 库, 一般都是搭建在公司私有库, 但是,我们可以使用自己的私有源来做测试

## 二、npm 私有仓库的搭建

搭建私有仓库的工具很多，这里使用的是 verdaccio 搭建私有仓库，它是免费的而且是傻瓜式的安装.

### node 版本

本地的 node 版本需要大于等于 12

### 安装 Verdaccio

全局安装

```js
npm install verdaccio -g
```

安装完成后输入以下命令启动

```
verdaccio
```

查看是否安装成功
然后访问
http://localhost:4873/

前台启用使用 verdaccio 命令
后台启用可以使用 pm2 或者其他进程的保护工具, 终端关闭不影响

### 使用本地库

`verdaccio`服务启动完成可以使用 nrm 工具进行源地址切换
具体的可以参考我之前写的 npm 添加源和修改源以及查看源

全局安装 nrm

```
npm install -g nrm
```

查看已有的配置
nrm ls
添加本地库到 nrm

```
# 添加配置项
nrm add npmLocal http://localhost:4873
```

### 切换 npm 源至私库

```
nrm use localNpm
```

### npm 私有仓库注册账号

根据提示输入用户名和密码，为后续 npm 包的发布做准备

```
npm adduser --registry http://localhost:4873/
```

### 切换 npm 源至私库

```
nrm use npmLocal
```

查看 npm 所有源的列表信息

```
nrm ls
```

## 三、npm 包的发布

新建一个测试文件夹
执行以下命令初始化组件库项目

```
npm init
```

对组件库进行打包

```
npm build
```

### npm 私库发布

确保现在你的 npm 源是自己的 nrm ls 查看一下 前面带有 \* 就是目前正在使用的源

在刚刚的项目底下输入

```
npm login
```

按照提示输入你的账号密码邮箱,登录完成之后执行以下命令

```
npm publish
```

这个时候访问 http://localhost:4873/ 就会有拟新增的那个包

### npm 公库发布

你可以发布到 npm 上,这个时候确认你本地的源是 npm 的,然后去注册账号密码邮箱 npm 官网,然后执行以下命令登录 npm 的账号

```
npm login
```

进行发布

```
npm publish
```

## 四、npm 包的版本管理

在已有的 npm 包的组件库如何去管理组件的库版本

### 查看 npm 包版本

执行以下命令查某个 package 在 npm 服务器上所有发布过的版本

```
# 查看yh-ui的包版本
npm view yh-ui versions
```

执行 npm ls 可查看当前仓库依赖树上所有包的版本信息。

### SemVer 规范

npm 包 中的模块版本都需要遵循 SemVer 规范——由 Github 起草的一个具有指导意义的，统一的版本号表示规则。实际上就是 Semantic Version(语义化版本)的缩写。

::: tip
SemVer 规范官网：https://semver.org/
:::

### 标准版本

SemVer 规范的标准版本号采用 X.Y.Z 的格式，其中 X、Y 和 Z 为非负的整数，且禁止在数字前方补零。X 是主版本号、Y 是次版本号、而 Z 为修订号。每个元素必须以数值来递增。

- 主版本号(major)：当你做了不兼容的 API 修改
- 次版本号(minor)：当你做了向下兼容的功能性新增
- 修订号(patch)：当你做了向下兼容的问题修正。
  例如：1.9.1 -> 1.10.0 -> 1.11.0

### 版本更新

在修改 npm 包某些功能后通常需要发布一个新的版本，我们通常的做法是直接去修改 package.json 到指定版本。如果操作失误，很容易造成版本号混乱，我们可以借助符合 Semver 规范的命令来完成这一操作：

```js
npm version patch // 升级修订版本号
npm version minor //升级次版本号
npm version major //d升级主版本号
```

版本更新之后再执行发布流程,这样版本就更新了

```
npm publish
```

## 五、npm 删除、废弃版本

前面提到过，在一个 npm 包正式发布前，大多会有测试版本。
版本一多，就很容易混淆，甚至忘记版本号。。。

### 删除版本

删除版本前，一定要确认这个版本的包已经没有依赖（废弃）了。

```js
// 假设我的包名是yh-ui测试版本号是1.0.2
// 删除指定版本
npm unpublish yh-ui@1.0.2

// 强制删除包的指定版本
npm unpublish yh-ui@1.0.2 --force

// 删除包
npm unpublish yh-ui

// 强制删除包
npm unpublish yh-ui force
```

### 废弃版本

什么是废弃版本？就是 npm 包还在，但是受某些因素影响，该包不再维护，不再更新了。

简单来说，就是不影响使用，但是在安装废弃版本的时候会有提示。

```js
// 假设我的包名是yh-ui版本号是1.0.2
npm deprecate yh-ui '不再维护'
npm deprecate yh-ui@1.0.2 '不再维护'
```
