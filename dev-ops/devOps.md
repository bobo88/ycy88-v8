# DevOps 架构

![An image](/images/tools/DevOps/DevOps2.png)
DevOps（Development 和 Operations 的组合词）是一组过程、方法与系统的统称，用于促进开发（应用程序/软件工程）、技术运营和质量保障（QA）部门之间的沟通、协作与整合。

它是一种重视“软件开发人员（Dev）”和“IT 运维技术人员（Ops）”之间沟通合作的文化、运动或惯例。透过自动化“软件交付”和“架构变更”的流程，来使得构建、测试、发布软件能够更加地快捷、频繁和可靠。

它的出现是由于软件行业日益清晰地认识到：为了按时交付软件产品和服务，开发和运维工作必须紧密合作。

可以把 DevOps 看作开发（软件工程）、技术运营和质量保障（QA）三者的交集。

传统的软件组织将开发、IT 运营和质量保障设为各自分离的部门。在这种环境下如何采用新的开发方法（例如敏捷软件开发），这是一个重要的课题：按照从前的工作方式，开发和部署不需要 IT 支持或者 QA 深入的、跨部门的支持，而却需要极其紧密的多部门协作。然而 DevOps 考虑的还不止是软件部署。它是一套针对这几个部门间沟通与协作问题的流程和方法。

需要频繁交付的企业可能更需要对 DevOps 有一个大致的了解。Flickr 发展了自己的 DevOps 能力，使之能够支撑业务部门“每天部署 10 次”的要求 ── 如果一个组织要生产面向多种用户、具备多样功能的应用程序，其部署周期必然会很短。这种能力也被称为持续部署，并且经常与精益创业方法联系起来。从 2009 年起，相关的工作组、专业组织和博客快速涌现。

DevOps 的引入能对产品交付、测试、功能开发和维护（包括 ── 曾经罕见但如今已屡见不鲜的 ──“热补丁”）起到意义深远的影响。在缺乏 DevOps 能力的组织中，开发与运营之间存在着信息“鸿沟”── 例如运营人员要求更好的可靠性和安全性，开发人员则希望基础设施响应更快，而业务用户的需求则是更快地将更多的特性发布给最终用户使用。这种信息鸿沟就是最常出问题的地方。

## 一、关键词

- 协作
  - DevOps 背后的关键前提是协作。开发和运营团队合并为一个职能团队，在整个开发和部署周期中进行沟通、共享反馈和开展协作。通常，这意味着开发和运营团队合并成一个团队，并在整个应用生命周期中开展工作。
- 自动化
  - DevOps 的其中一项基本实践是：尽可能实现软件开发生命周期的自动化，让开发人员有更多时间来编写代码和开发新功能。自动化是 CI/CD 管道的一个关键要素，它有助于减少人为错误并提高团队工作效率。借助自动化流程，团队可以在较短的迭代时间内实现持续改进，从而快速响应客户的反馈。
- 持续管理
  - 持续改进被确立为敏捷开发实践以及精益制造和改进 Kata 的主要内容。其重点在于注重实验，最大限度减少浪费，同时优化速度、成本和交付便利性。持续改进还与持续交付息息相关，使 DevOps 团队能够不断推送更新，提高软件系统的效率。持续不断地发布新版本，意味着团队会不断推送代码变更，从而消除浪费、提高开发效率并创造更多客户价值。
- 行动以客户为本
  - DevOps 团队利用与客户和最终用户的短程反馈回路，围绕用户需求开发产品和服务。DevOps 实践通过使用实时现场监控和快速部署，实现对用户反馈的快速收集和响应。团队可以即刻了解用户与软件系统的实时交互情况，并利用该洞察信息制定进一步的改进措施。
- 胸有成竹地进行创造

  - 此原则在于了解客户需求，创造能解决实际问题的产品或服务。团队不应“在泡沫中构建”，也不应基于对消费者使用软件方式的臆测来开发软件。相反，DevOps 团队应从创建到实施全方位了解产品的各个方面。

![An image](/images/tools/DevOps/DevOps.png)

## 二、DORA 指标

DevOps 从业人员依靠 DORA 开发的四个关键指标来衡量其 DevOps 实践的有效性。

- 变更的提前期：从检查代码到发布再到生产，代码变更的提前期有多长？

  - 高效能团队通常以小时为单位衡量提前期，而中低效能团队则以天、周甚至月为单位衡量提前期。
  - 测试自动化、主干开发和小批量工作是缩短提前期的关键因素。这些实践可让开发人员快速收到有关他们所提交代码的质量反馈，以便他们能够识别和修复所有缺陷。如果开发人员处理单独分支上存在的重大变更，并依靠手动测试进行质量控制，提前期则势必很长。

- 部署频率：您交付到生产环节的频率和速度有多快？

  - 高效能团队可以按需部署变更，而且通常每天要执行多次。较低效能团队通常仅会每周或每月部署一次。
  - 按需部署的能力需要一个自动化的部署管道，其中包含前面各节所提及的自动化测试和反馈机制，并最大限度地减少人为干预的需求。

- 恢复服务的时间：检测到事件时，补救和恢复服务需要多长时间？

  - 高效能团队可以快速从系统故障中恢复（通常不到一个小时），而较低效能团队可能需要长达一周的时间才能从故障中恢复。
  - 从故障中快速恢复的能力取决于能否快速识别故障发生的时间，以及部署修复程序或回滚导致故障的所有变更。这通常是通过持续监控系统运行状况并在发生故障时向操作人员发出警报来实现的。运营人员必须拥有解决事件所需的流程、工具和权限。

- 变更失败率：生产中需要立即补救或回滚的部署失败率有多高？
  - 高效能团队的变更失败率在 0%-15％ 的范围内。
  - 可缩短提前期的相同实践（测试自动化、主干开发和小批量工作）与降低变更失败率相关。所有这些实践都使缺陷更容易识别和补救。
  - 跟踪和报告更改失败率不仅对于识别和修复错误很重要，对于确保新的代码版本符合安全要求也非常重要。

![An image](/images/tools/DevOps/DevOps3.png)

## 三、DevOps 生命周期关键阶段

### 1. 发现

- 工具： Mural、 Miro、 Jira Product Discovery
- 在“发现”阶段，DevOps 团队将研究并定义项目的范围。需特别指出的是，该阶段涉及到用户研究、建立目标和定义成功等活动。
- 像 Mural 和 Miro 这样的工具可以让整个软件团队去收集想法并开展研究。Jira Product Discovery 将这些信息组织成可操作的输入，并为开发团队排定行动的优先级。在确定优先级时，还需要牢记待办事项列表中的用户反馈。

### 2. 规划

- 工具：Jira Software、Confluence、slack
- 基于敏捷开发手册，我们建议您使用一些工具，帮助开发和运营团队将工作分解为更小的可管理工作块，以便更快地进行部署。这样，您就可以尽早从用户那里获取信息，并根据用户反馈优化产品。寻找能够提供冲刺规划、事务跟踪且允许协作的工具，如 Jira。
- 另一种不错的做法是持续收集用户反馈，将其整理成可操作的输入，然后为您的开发团队确定这些操作的优先级。您可以寻找可以促进“异步头脑风暴”的工具（如果您愿意的话）。让所有人都能分享和评论任何内容：想法、战略、目标、要求、路线图和文档，这一点非常重要。

### 3. 构建

- 用于开发的相同生产环境
  - 工具：kubernetes、docker
  - 将 Puppet 和 Chef 主要用于运营的同时，开发人员使用 Kubernetes 和 Docker 等开源工具来调配单个开发环境。基于虚拟的一次性生产副本进行编码有助于您完成更多工作。
  - 当每个团队成员在多个配置完全相同的环境中工作时，“在我的计算机上能运行！”这句话就不是开玩笑了，因为这是事实（这种情况才有意思）。
- 基础架构即代码
  - 工具：Ansible、 Chef、 Docker、 Puppet、 Terraform
  - 开发人员创建模块化应用，因为它们更加可靠且可维护。那么，为什么不把这种想法扩展到 IT 基础架构呢？这可能难以应用于系统，因为它们一直在不断变化。所以我们通过使用代码进行调配来解决此问题。
  - 基础架构即代码意味着重新调配比修复更快，也更具一致性和可复制性。这也意味着您可以使用与生产环境类似的配置轻松地调整开发环境的不同变体。调配代码可以反复应用，以使服务器达到某一已知的基准。它可存储在版本控制中，可对它进行测试，纳入 CI（持续集成），并进行同行审查。
  - 将系统知识完备地编入代码后，您对运行手册和内部文件的需求就会逐渐消失。随之而来的是可重复的流程和可靠的系统。
- 源代码控制和协作编码
  - 工具：Bitbucket、 Github、 GitLab
  - 控制您的源代码至关重要。源代码控制工具有助于将代码存储在不同的链中，这样您就可以看到每项变更，并通过共享这些变更更轻松地进行协作。与其等待变更审批委员会批准后再部署到生产环境，您可以通过使用拉取请求执行同行审查，来提高代码质量和吞吐量。

![An image](/images/tools/DevOps/DevOps_Pipeline.png)

### 4. 持续交付

- 工具：Jenkins、 AWS、 Bitbucket、 CircleCI、 Sonarsource
  ![An image](/images/tools/DevOps/DevOps_cd.png)
- 持续集成是指每天多次向共享代码库签入代码，并且在每次都进行测试的一种做法。这样，您可以及早自动发现问题、在最容易修复的时候解决问题，并尽快为用户提供新功能。
- 通过拉取请求进行代码审查需要创建分支，而且十分盛行。DevOps North Star 是一个工作流程，它可以在不降低开发速度的情况下更快速地创建更少的分支，并保持测试严格性。
- 您可以寻找具有以下功能的工具：不仅可以自动将您的测试应用于开发分支，还可以在分支创建成功时选择推送到主干。除此之外，通过简单的集成，您可以根据团队的实时聊天警报获得持续反馈。

### 5. 测试

- 自动化测试
  ![An image](/images/tools/DevOps/DevOps_test.png)

### 6. 监控

![An image](/images/tools/DevOps/DevOps_observe.png)

- 应用程序和服务器性能监控
- 有两种类型的监控应该是自动的：服务器监控和应用程序性能监控。
- 手动“置顶”一个框或者测试您的 API 都是不错的抽查方式。但要了解应用（和环境）的趋势和整体运行状况，您需要能够全天候监控和记录数据的软件。持续的可观察性是 DevOps 团队取得成功的一项关键功能。
- 您可以寻找与您的群组聊天客户端集成的工具，以便警报直接送达团队的房间或专门的事件室。

### 7. 运维

### 8. 持续反馈

## 四、DevOps 管道的组件

### 4.1 持续集成/持续交付/部署 (CI/CD)

### 4.2 持续反馈

- 持续测试
  - 持续测试是每个 DevOps 管道的关键组件，也是持续反馈的其中一个主要推动因素。在 DevOps 流程中，变更不断地从开发转移到测试再到部署，这不仅可以实现更快的发布，而且还可以交付更高质量的产品。这意味着在整个管道中进行自动化测试，包括在每次构建更改时进行的单元测试、冒烟测试、功能测试和端到端测试。
- 持续监控
  - 持续监控是持续反馈的另一个重要组件。DevOps 方法需要使用预备、测试甚至开发环境中的持续监控功能。监控生产前环境中的异常行为有时很有用，但总的来说，这是一种用于持续评估生产中应用的运行状况和性能的方法。

### 4.3 持续运营

参考：<br />
<a href="https://www.atlassian.com/zh/devops/what-is-devops" target="_blank">DevOps 的 5 个关键原则</a><br />
