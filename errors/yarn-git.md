# yarn & git 相关报错

## 一、husky install error

项目安装依赖的时候，yarn 最后报了个错，是 husky install 没有成功。

原因：没有 git 环境， husky 是配合 git 来操作的。

解决：

```js
git init
```

然后再 yarn 就可以了。
