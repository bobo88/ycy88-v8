# GitFlow

::: tip GitFlow 概念
是一种代码开发合并管理流程的思维模式或者是管理方法。
:::

Gitflow 越来越受欢迎，有利于基于主干的工作流，现在被认为是现代持续软件开发和 DevOps 实践的最佳实践。

## 一、GitFlow 特点

- 代码共享
- 不同环境下代码互不干扰
- 管理好代码与环境的一致性
- 优点
  - 适应场景多
  - 不影响开发进度
  - 分支使用相对有条理
  - 确保线上的版本稳定
- 缺点
  - 因为分支太多，所以会出现 git log 混乱的局面
  - 同时维护 Main 和 Develop 两个分支很多时候是没必要的，因为在很多场景下 Main 中的内容和 Develop 中的内容是差不多的

## 二、GitFlow 中分支的定义

1. Main 分支： 稳定版本代码分支。
   - 用作发布环境，上面的每次提交都是可以发布的。
2. Feature 分支： 功能分支。
   - 用于开发功能（需求），用于开发环境
3. Develop 分支: 开发分支。
   - 一旦 Feature 分支内功能开发完成就将 Feature 中的代码合并到 Develop 分支中，合并完成后，删除该功能分支。这个分支对应的是集成测试环境。
4. Release 分支：预发分支，做发布前的准备工作，对应的是预发环境。
   - 这个分支可以确保们开发继续向前，不会因为要发布不而被停滞住。
   - 一旦 Release 分支达到了可发布的状态，我们需要把 Release 分支同时向 Main，Develop 分支上合并，保持代码的一致性，然后把 Release 分支删除。
5. Hotfix 分支： 线上 bug 修缮用的分支。
   - 每次修改线上代码的 bug 时都要用 hotfix 来维护，完成后向 Develop 和 Main 同时合并。完成后删除分支。

## 三、Gitflow 的整体流程

```html
1. Develop from Main: 开发分支 from 主干 2. Release from Develop: 预发分支 from
开发分支 3. Feature from Develop: 功能分支 from 开发分支

<!-- 功能开发完毕后 合并到 开发分支 -->
4. 当 Feature 完成时，它被合并到 Develop 分支中；

<!-- 预生产OK后，部署到 开发分支和主干 -->
5. 当 Release 完成后，它被合并到 Develop 和 Main；

<!-- 有 bug 需要修复时 -->
6. 如果 Main 检测到问题，Hotfix 则创建一个分支 Main 7. 一旦 Hotfix
完成，它就会合并到 Develop 和 Main
```

![An image](/images/tools/gitflow.svg)

参考：<br />
<a href="https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow" target="_blank">Gitflow Workflow</a><br />
<a href="https://blog.csdn.net/weixin_46674610/article/details/115396404" target="_blank">gitflow 是什么，有哪些优缺点？</a><br />
