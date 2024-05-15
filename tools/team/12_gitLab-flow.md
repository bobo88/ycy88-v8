# Gitlab Flow

Git Flow 分支较多，非常适用于版本发布的工作流程。但不太适合代码部署非常频繁的敏捷开发场景。

GitHub Flow 对 Git Flow 做了简化，并充分利用了 GitHub 的 Pull Request 功能，是一个非常轻便的基于分支的工作流。它只维护一个长期分支 master，其它的无论是做什么用途的分支都算临时分支，用完即删除。如此，无论何时发布 master，其都是最新的内容。

GitLab Flow 则是吸收了 Git Flow 和 GitHub Flow 的优点，遵循“上游优先”的策略，做到既简单容易操作，又能满足不同的工作流程。

流程特点：

- 快速的版本迭代
- 方便稳定的代码部署以及发布
- 更好的错误溯源、更少的系统性流程错误
- 清晰的 code review

## 一、GitLab Flow 的持续发布

Gitlab flow 分成两种情况，适应不同的开发流程。
<img width="400" src="/images/tools/gitlabflow/gitlabflow.png" />

对于“持续发布”的项目，它建议在 master 分支以外，再建立不同的环境分支。比如，“开发环境”的分支是 master，“预发环境”的分支是 pre-production，“生产环境”的分支是 production。

开发分支是预发分支的“上游”，预发分支又是生产分支的”上游”。代码的变化，必须由“上游”向“下游”发展。比如，生产环境出现了 bug，这时就要新建一个功能分支，先把它合并到 master，确认没有问题，再 cherry-pick 到 pre-production，这一步也没有问题，才进入 production。

只有紧急情况，才允许跳过上游，直接合并到下游分支。

## 二、GitLab Flow 的版本发布

<img width="400" src="/images/tools/gitlabflow/gitlabflow-2.png" />

对于“版本发布”的项目，建议的做法是每一个稳定版本，都要从 master 分支拉出一个分支，比如 2-3-stable、2-4-stable 等等。

以后，只有修补 bug，才允许将代码合并到这些分支，并且此时要更新小版本号。

![An image](/images/tools/gitlabflow/gitlabflow-3.jpg)

参考：<br />
<a href="https://www.cnblogs.com/xiaoqi/p/gitlab-flow.html" target="_blank">高效团队的 gitlab flow 最佳实践</a><br />

<!-- https://docs.gitlab.cn/jh/topics/gitlab_flow.html -->

<!-- https://www.cnblogs.com/xiaoqi/p/gitlab-flow.html -->

<!-- https://cloud.tencent.com/developer/article/1646937 -->
