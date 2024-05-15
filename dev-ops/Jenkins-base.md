# Jenkins 简述

Jenkins 是一个开源的自动化工具，主要用于持续集成和持续部署（CI/CD）流程的自动化。

## 一、**特点**：

- **灵活性**：Jenkins 提供了丰富的插件生态系统，用户可以根据需要安装插件以扩展其功能，从而适应几乎所有类型的项目和技术。
- **易用性**：Jenkins 提供了用户友好的界面，使用户可以轻松配置和监控构建过程，同时也支持脚本化配置。
- **可扩展性**：Jenkins 可以通过其插件体系以及分布式架构扩展其功能和性能，适应从小型项目到大规模企业级部署的不同需求。

## 二、**作用**：

- **持续集成 (CI)**：Jenkins 自动化执行软件项目的构建和测试，确保开发的新代码持续集成到主分支中，及时发现和修复问题。
- **持续部署 (CD)**：Jenkins 能够在代码通过所有测试后自动部署到生产环境，确保软件的快速迭代和高效发布。
- **任务调度与监控**：Jenkins 不仅可以处理构建和部署，还可以定期执行其他任务，如数据库备份、清理工作区等，并实时监控任务状态。

## 三、**原理**：

- **触发器**：Jenkins 可以通过多种方式触发构建，如代码提交、定时计划、手动触发等。
- **构建流程**：一旦触发，Jenkins 会执行预设的构建流程，这可能包括代码拉取、执行构建脚本、运行测试及生成报告等步骤。
- **反馈与通知**：构建完成后，Jenkins 可以通过邮件、即时消息等方式通知用户构建和测试结果，帮助团队及时响应开发和部署过程中的问题。

## 四、**Jenkins Pipeline 配置脚本（举例）**：

```groovy
def createVersion() {
    // 此函数用于生成一个基于当前日期和时间的版本号，格式为yyyyMMddHHmmss_BUILD_ID，
    // 例如：20191210175842_69
    return new Date().format('yyyyMMddHHmmss') + "_${env.BUILD_ID}"
}

pipeline {
  agent any
  // 指定管道可以在Jenkins上的任何可用代理上运行

  environment {
    // 定义环境变量
    JOB_NAME="${env.JOB_NAME}" // 将JOB_NAME设置为Jenkins环境变量中的JOB_NAME
    tag=createVersion() // 调用createVersion函数，为这次构建生成一个唯一的版本标记
    GitUrl="https://github.com/bobo88/nuxt-web.git" // 定义Git仓库的URL
  }

  stages {
    // 定义多个阶段，每个阶段执行不同的任务

    stage("CheckOut Code Pull"){
      // 第一个阶段，名为"CheckOut Code Pull"
      steps{
        script{
          // 在script块中可以执行Groovy脚本
          println("${BranchName}")
          // 打印当前使用的分支名（BranchName需要在某处定义或作为参数传递）

          checkout([$class: 'GitSCM', branches: [[name: "${BranchName}"]],
            // 使用GitSCM插件检出代码，从指定的BranchName分支
            doGenerateSubmoduleConfigurations: false,
            // 不自动生成子模块配置
            extensions: [],
            // 不使用任何额外的SCM扩展
            submoduleCfg: [],
            // 没有子模块配置
            userRemoteConfigs: [[url: "${GitUrl}"]]])
            // 使用先前定义的GitUrl作为远程仓库URL
        }
      }
    }
    stage('编译安装') {
      // 第二个阶段，名为"编译安装"
      steps {
          // 定义要在此阶段执行的步骤
          sh '''
          // 修改PATH环境变量，加入node.js的路径，以便能够使用yarn命令
          export PATH=$PATH:/Users/yuanbo/.nvm/versions/node/v18.16.0/bin/
          // 使用yarn安装项目依赖
          yarn
          // 使用yarn执行构建任务
          yarn build
          '''
      }
    }
  }
}
```

这个脚本定义了一个 Jenkins Pipeline，包括从 GitHub 仓库拉取代码并在 Jenkins 代理上执行编译和构建任务。通过环境变量来传递必要的配置，如 Git 仓库地址和分支名。整个流程被分为两个主要阶段：代码检出和编译安装，其中使用到了多个 Jenkins 特定的功能和 Groovy 脚本编程。

---

- [Jenkins 构建伟大，无所不能](https://www.jenkins.io/zh/)
- [W3C-jenkins](https://www.w3cschool.cn/jenkins/)
