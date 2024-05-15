# 对比项目两个分支的代码差异

## 一、背景

项目要发版上线了，提交的有点多，又不确定到底改了哪些东西，直接把本地 dev 分支怼到 master 主干，心里有点慌。

保险起见的做法是将 dev 分支和 master 分支进行全量对比，看看是否有什么纰漏。

## 二、实现步骤

- 安装 VS Code
- VS Code 上安装 "GitLens — Git supercharged"
- VS Code 左侧栏 "源代码管理"
  - SEARCH & COMPARE
  - Compare References
  - 选择两个分支进行对比（也可以选择两个提交版本记录进行对比）

## 三、截图

1）找到对比入口；<br/>
<img width="600" src="/images/efficiency/gitCompare/git_compare.png" /><br/>
2）选择要对比的分支或版本：<br/>
<img width="600" src="/images/efficiency/gitCompare/git_compare2.png" /><br/>
3）查看所有改动：<br/>
<img width="600" src="/images/efficiency/gitCompare/git_compare3.png" /><br/>
