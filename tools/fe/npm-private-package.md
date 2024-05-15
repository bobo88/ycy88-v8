# npm 包发布到私有 npm 服务器过程

## 一、 添加私有仓库

::: tip
添加私有仓库，并且设置当前仓库为私有库。
:::

使用 nrm 设置仓库 http://xxx.privatelib.cn。参考之前的技术文档【nrm的作用】

- nrm add xxx http://xxx.privatelib.cn
- nrm use xxx

## 二、 npm 增加用户

::: tip
如果私有仓库尚未注册过用户则需要注册
:::

```js
$ npm adduser
// OR 有注册过用户名和密码，但是需要登录的情况下
$ npm login
```

然后根据提示设置用户名和密码

## 三、 设置 package.json 文件

::: tip
json 文件说明, 如果没有该文件请 npm init 创建，或者手动创建
:::

```json
{
  "name": "yb-toolkit-vue",
  "version": "0.0.1",
  "description": "Vue项目工具包",
  "main": "lib/yb-toolkit-vue.umd.js",
  "keyword": "yb vue element toolkit",
  "private": false,
  "scripts": {
    // ...
  },
  "dependencies": {
    // ...
  },
  "devDependencies": {
    // ...
  },
  "eslintConfig": {
    // ...
  },
  "postcss": {
    "plugins": {
      "autoprefixer": {}
    }
  },
  "browserslist": [
    // ...
  ]
}
```

## 四、 发布包

::: tip
执行 npm publish ，若果执行没问题，则发布成功
:::

```js
npm publish
```

::: warning 注意
如果发布失败，多半都是版本号未升级的原因。每次更新时都要修改版本号，也就是修改 package.json 里面的 version。
:::

当然版本号的升级根据的自己的团队的规范和更新内容而定。

## 五、 使用命令升级版本号

```js
// 1. 升级小版本号：将 1.0.0 升级到 1.0.1
$ npm version patch

// 2. 升级次版本号：将 1.0.0 升级到 1.1.0
$ npm version minor

// 3. 升级主版本号：将 1.0.0 升级到 2.0.0
$ npm version major
```

```jsx
版本号基本是由三位数字组成：
   1   .   0   .   0
[MAJOR].[MINOR].[PATCH]
```

## 六、 升级版本号同时发布包

::: tip 技巧
把发布发布命令 npm version patch && npm publish 封装为 npm 脚本
:::

```json
{
  "script": {
    "patch": "npm version patch && npm publish"
  }
  // ...
}
```

## 七、 安装我们发布的包

安装之前先确认好我们的仓库是否为私有库，如果是则可以安装。

```js
$ npm i yb-toolkit-vue
```

参考：<br />
<a href="https://blog.csdn.net/qq_34510843/article/details/125251921" target="_blank">npm 包发布到私有 npm 服务器过程</a><br />
<a href="https://segmentfault.com/a/1190000039790154" target="_blank">使用 npm 命令行更新版本号</a><br />
