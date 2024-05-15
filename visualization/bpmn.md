# bpmn 流程引擎

## 一、概念

流程引擎是一种软件工具或服务，用于管理、执行和监控业务流程。它通常基于业务流程管理（BPM）和工作流技术，能够自动化和优化组织内的各种业务流程。

## 二、作用

1. **流程自动化：** 流程引擎能够自动化执行各种业务流程，包括流程实例的启动、任务的分配和执行、流程状态的管理等。
2. **流程优化：** 通过流程引擎，组织可以对现有的业务流程进行优化和改进，提高流程执行效率、降低成本并提升服务质量。

3. **流程监控：** 流程引擎提供了对业务流程的实时监控和分析功能，可以查看流程实例的执行情况、任务的处理状态等，并及时发现和解决问题。

4. **灵活性和可扩展性：** 流程引擎通常具有灵活的配置和定制能力，能够根据组织的需求进行定制和扩展，以适应不同的业务场景和需求变化。

5. **标准化和规范化：** 流程引擎基于业界通用的流程标准和规范，如 BPMN（Business Process Model and Notation），保证了流程的标准化和规范化。

## 三、服务端工作

### 1）技术选型

Activiti、**Flowable**、Camunda。

Activiti、Flowable 和 Camunda 都是流程引擎框架，都是由同一批开发者开发的。它们之间的关系可以理解为：

- **Activiti** 是最早由 Alfresco 公司开发的开源流程引擎，后来由于一些商业原因，Activiti 项目进行了分叉，形成了后来的 Flowable 和 Camunda。
- **Flowable** 是 Activiti 的一个分支，由 Activiti 核心开发者维护和发展。Flowable 在设计上继承了 Activiti 的大部分特性，并在此基础上进行了改进和优化。Flowable 支持 BPMN 2.0、CMMN 和 DMN 标准。
- **Camunda** 也是 Activiti 的一个分支，由 Activiti 核心开发者发起并继续开发的。Camunda 专注于 BPMN 2.0 标准，提供了更丰富的功能和更强大的性能。Camunda 有更完善的企业级支持和解决方案，同时也有更多的企业用户和案例。

因此，从技术选型的角度来看：

- 如果你对 Activiti 有一定的了解，并且已经在项目中使用了 Activiti，那么你可以继续沿用 Activiti，并考虑将来迁移到 Flowable 或 Camunda。
- 如果你对 BPMN 2.0 标准有较高的要求，并且希望有更多的功能和性能优势，那么你可以考虑选择 Camunda。
- 如果你对 Activiti 的特性已经比较熟悉，并且希望在此基础上继续开发和维护，那么你可以选择 Flowable，因为它是 Activiti 的一个分支，与 Activiti 兼容性较高。

### 2）Flowable 详细介绍

::: tip Flowable 概念
Flowable 是一个基于 Java 的开源 BPM 框架，它主要基于 Activiti 中的一些组件，并在此基础上进行了扩展和升级。
:::

::: tip Flowable 架构
Flowable 架构主要分为四部分：工作流引擎、应用程序接口（API）、模型器和任务表单设计器。

- **工作流引擎**：Flowable 的核心组件，包括运行时引擎和执行引擎。它管理整个流程的生命周期，监控、控制任务的执行以及记录流程实例的状态等信息。
- **应用程序接口（API）**：根据 RESTful 风格，提供给外部系统访问 Flowable 引擎的接口，可以通过编写调用 API 的客户端程序来使用 Flowable 引擎服务。
- **模型器**：用于创建和修改流程定义文件，支持基于 Web 的图形化编辑器。
- **任务表单设计器**：用于创建和修改任务表单，支持基于 Web 的表单设计器。

:::

### 3）后端开发主要工作

::: info 后端开发主要工作

1. **流程引擎集成：**

   - 在项目中引入 Flowable 相关的依赖，如 flowable-spring-boot-starter、flowable-rest、flowable-engine 等。
   - 配置 Flowable 引擎的运行环境，包括数据库配置、流程引擎配置等。
   - 创建流程定义（BPMN 文件），定义流程模型、流程节点、流程变量等信息。

2. **业务逻辑实现：**

   - 根据业务需求，编写与流程相关的业务逻辑代码，包括启动流程实例、处理任务、查询流程实例等功能。
   - 在服务层（Service）中编写与 Flowable 引擎交互的逻辑代码，调用 Flowable 提供的 API 进行流程控制和管理。

3. **接口开发：**

   - 提供 RESTful API 接口，用于前端调用 Flowable 引擎相关的功能，包括启动流程实例、处理任务、查询流程状态等。

4. **权限控制：**

   - 设计并实现权限控制机制，确保用户只能访问其具有权限的流程实例和任务。

5. **持久化存储：**

   - 将流程定义、流程实例、任务等数据持久化存储到数据库中，使用 Flowable 提供的数据库模型进行数据存储。

6. **通知与提醒：**
   - 实现任务的提醒与通知功能，例如邮件通知、短信提醒等，确保相关人员能及时了解并处理待办任务。

:::

在使用 BPMN 的后端结构中，通常可以划分为三个层次：dispatch（调度层）、流程层和具体流程层。下面对这三个层次进行简要解释：

1. **调度层（Dispatch）：** 这一层主要负责接收前端请求，调度和分发请求到相应的流程处理器或具体流程实例。调度层是整个 BPMN 后端的入口，它负责处理前端的请求，并根据请求的类型和参数进行分发。调度层的设计可以考虑使用统一的接口或者路由来管理不同类型的请求。

2. **流程层（Process）：** 流程层是处理具体业务流程的核心部分，它包含了流程定义、流程实例管理、任务分配和处理等功能。在流程层中，可以定义和管理各种业务流程，包括流程的开始节点、流程的路由规则、任务节点的定义和配置等。流程层通常包含流程引擎的核心功能，负责流程的执行和控制。

3. **具体流程层（Specific Process）：** 具体流程层是指针对具体的业务流程进行定制和实现的部分。每个具体的业务流程都可以在具体流程层中进行定义和实现，包括流程的节点、流程的处理逻辑、流程的任务分配规则等。具体流程层可以根据业务需求进行定制和扩展，以满足不同业务场景的需求。

这三个层次相互配合，共同构建了一个完整的 BPMN 后端系统。调度层负责接收和分发请求，流程层负责处理流程的执行和控制，具体流程层负责定义和实现具体的业务流程。这样的架构设计可以使系统结构清晰，各个层次之间的职责清晰，便于后期的维护和扩展。

> 架构图：TODO

### 4）`.bpmn`文件长啥样？

> `bpmn` 文件是 `activiti` 配置流程定义的文件，一般一个 `bpmn` 文件定义一个流程,文件为 `xml` 格式,各种元素级别如下:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions id="definitions"
	xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemalocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd" targetnamespace="http://bpmn.io/schema/bpmn">
	<process id="process_id" name="流程名称" isexecutable="true">
		<startevent id="start_event_id" name="开始事件名称"></startevent>
		<usertask id="user_task_id" name="用户任务名称"></usertask>
		<endevent id="end_event_id" name="结束事件名称"></endevent>
		<sequenceflow id="sequence_flow_id" sourceref="start_event_id" targetref="user_task_id"></sequenceflow>
		<sequenceflow id="sequence_flow_id_2" sourceref="user_task_id" targetref="end_event_id"></sequenceflow>
	</process>
</definitions>
```

## 四、前端工作

### 1）前端开发主要工作

::: info 前端开发主要工作

1. **界面设计：**

   - 设计流程管理、任务处理等界面，包括流程图展示、任务列表、表单填写等功能的页面布局和交互设计。

2. **页面开发：**

   - 使用前端框架（如 Vue.js、React 等）开发前端页面，实现与用户交互的功能，包括任务列表展示、表单填写、流程图显示等页面的开发。

3. **交互逻辑实现：**

   - 实现用户与系统的交互逻辑，包括任务的领取、处理、驳回等操作的实现，以及前端与后端的数据交互。

4. **数据展示与处理：**

   - 从后端接口获取数据，并在页面上展示，同时处理用户的输入和操作，保证数据的准确性和完整性。

5. **权限控制：**

   - 实现前端的权限控制逻辑，根据用户的角色和权限动态展示页面内容，并限制用户的操作范围。

6. **性能优化与体验提升：**

   - 对页面进行性能优化，提升用户体验，包括页面加载速度优化、响应速度优化等方面的工作。

:::

### 2）VUE3 中引入 bpmn.js

> 设计器 bpmn.js。

bpmn.js 是一个 BPMN2.0 渲染工具包和 web 建模器, 使得画流程图的功能在 **前端** 来完成。
详见 [bpmnjs 官网](https://bpmn.io/)

```bash
$ npm i --save bpmn-js
```

### 3）LogicFlow 实践

- [LogicFlow 实践](./project/logicflow.md)

## 五、注意事项

<!-- > 三层结构：dispatch、流程（送快递的 bpmn，不管具体的处理，受制于.bpm 文件，嵌套循环下去）、具体流程（event handle，重新回到主程序）？？
> 单一职责
> 模型的任何操作都要触发 dispatch
> 静态模型，流程引擎是干净的
> 拉链，层层 -->

> TODO

---

- [flowable 官网-英文](https://www.flowable.com/open-source)
- [flowable 官网-中文](https://tkjohn.github.io/flowable-userguide/)
- [flowable GitHub 地址](https://github.com/flowable)
- [开源工作流引擎 Flowable 的面试题](https://www.cnblogs.com/BlogNetSpace/p/17351387.html)
- [[技术选型与调研] 流程引擎(工作流引擎|BPM 引擎)：Activiti、Flowable、Camunda ](https://www.cnblogs.com/johnnyzen/p/18024283/business-process-engine)
- [Flowable 开篇，流程引擎扫盲](https://juejin.cn/post/7148248663762927653)
- [bpmn.io](https://bpmn.io/)
- [基于 BPMN 流程引擎驱动的前端研发平台(阿里巴巴-前端技术专家:姜天意)](https://pic.huodongjia.com/ganhuodocs/2017-12-27/1514345051.86.pdf)
- [全网最详 bpmn.js 教材目录](https://juejin.cn/post/6844904017567416328)
- [LogicFlow](https://site.logic-flow.cn/)
