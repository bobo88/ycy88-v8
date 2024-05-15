# nrm的作用

::: tip 什么是 nrm
nrm 是一个 npm 源管理器，允许你快速地在 npm 源间切换。
:::

```js
// 1. 安装
$ npm i nrm -g

// 2. 使用
// 2.1 查看可选源
$ nrm ls
  // 运行上述命令（nrm ls），将会打印如下几个可选源
  // npm ---------- https://registry.npmjs.org/
  // yarn --------- https://registry.yarnpkg.com/
  // tencent ------ https://mirrors.cloud.tencent.com/npm/
  // cnpm --------- https://r.cnpmjs.org/
  // taobao ------- https://registry.npmmirror.com/
  // npmMirror ---- https://skimdb.npmjs.com/registry/

// 3. 切换
// 3.1 切换到 taobao 源
$ nrm use taobao

// 4. 增加
// 4.1 添加企业内部私有源
// 格式： nrm add <registry> <url>，其中reigstry为源名，url为源的路径
$ nrm add yb http://xxx.npm-public

// 5. 删除
// 5.1 格式：nrm del <registry>删除对应的源。注意不能删除 nrm 内置的源
$ nrm del abc

// 6. 测试速度
$ nrm test npm
// OR 测试所有
$ nrm test
```

参考：<br />
<a href="https://www.jianshu.com/p/98a2cdc64f68" target="_blank">什么是 nrm</a><br />
