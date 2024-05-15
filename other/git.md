# Git 原理

<!-- ![An image](/images/other/file-git.png) -->

## 一、相关概念（原理）

> Git 是一种分布式版本控制系统。从根本上来讲 Git 是一个内容寻址（content-addressable）文件系统，并在此之上提供了一个版本控制系统的用户界面。

1. **快照存储：** Git 不是基于文件的变化存储的，而是基于快照（snapshot）。每次提交（commit）都会创建一个完整的文件系统快照，这使得在项目历史中轻松切换、回滚和分支操作变得更为高效。

2. **分支：** 在 Git 中，分支（branch）的创建和切换是非常轻量级的操作。每个分支都是一个独立的指向提交（commit）的指针。这样，不同的开发者可以在不干扰彼此工作的情况下并行开发，而合并（merge）不同分支的变更也相对简便。

3. **三个区域：** Git 有三个主要的区域，分别是工作目录（Working Directory）、暂存区（Staging Area）、和仓库（Repository）。工作目录是实际的文件目录，暂存区是一个缓存区域，而仓库则是存储项目的历史版本。

4. **提交对象：** 每次提交都会生成一个提交对象，包含了指向前一次提交的指针、作者信息、时间戳、以及一个指向实际内容快照的指针。提交对象形成了一个有向无环图，记录了整个项目的历史。

5. **哈希值：** Git 使用哈希值来唯一标识提交和文件内容。这确保了数据的完整性，因为对内容的任何改动都会导致哈希值的变化。

6. **无连接网络：** Git 是一种分布式版本控制系统，每个开发者的本地仓库都包含完整的项目历史。这样，即使在没有网络连接的情况下，开发者仍然可以进行提交、分支操作等本地版本控制操作。

## 二、常见操作（原理）

> TODO

---

- [图解 git 原理的几个关键概念](https://tonybai.com/2020/04/07/illustrated-tale-of-git-internal-key-concepts/)
- [Git 原理入门](https://www.ruanyifeng.com/blog/2018/10/git-internals.html)
- [用 21 张图，把 Git 工作原理彻底说清楚](https://cloud.tencent.com/developer/article/1893386)
- [Git 实现原理](https://huweicai.com/git-implementation/)
- [深入理解 Git 实现原理](https://zhuanlan.zhihu.com/p/45510461)
- [简单 Git 教程](https://nulab.com/zh-cn/learn/software-development/git-tutorial/)
