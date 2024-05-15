# Git 团队协作流程

::: tip Git 概念
分布式版本控制系统，高效，灵活，易用。
:::

## 一、常见的 git 命令：

```js
git init        // 新建一个目录，将其初始化为git代码库
git clone       // 下载一个项目和它的整个代码历史
git pull        // 取回远程仓库的变化，并与本地分支合并。pull = fetch + merge
git add         // 添加当前目录的所有文件到暂存区（“.”号可暂存全部，也可以是文件名或目录）
git commit      // 提交暂存区到仓库区
git push        // 推送代码到远程库
git diff        // 显示暂存区和工作区的差异
git checkout    // 切换到指定分支，并更新工作区
git fetch       // 下载远程仓库的所有变动
git merge       // 合并指定分支到当前分支
```

::: tip 工作区/暂存区/本地仓库/远程仓库的区别
工作区（本地电脑）：IDE，写代码；<br />
暂存区（本地电脑）：修改后的代码；<br />
本地仓库（本地电脑）：确认修改的；<br />
远程仓库（远程服务器）：推送到服务器与别人共享
:::

## 二、团队协作流程：

::: tip
PR（Pull Request）：相关概念 Fork
:::

Todo 待完成 git 团队合作
![An image](/images/prev/gitpr.png)

::: warning
测试引入图片功能
:::

<!-- ![An image](/images/prev/beauty_1.png) -->

![An image](/images/prev/beauty_4.png)
