# 面试：你是如何做项目架构的？

> 在面试中，如何回答项目架构经验的问题？

## 一、待改进的回答

在面试中，当被问及项目架构经验时，如果你只回答“抽离了哪些公共组件”或者“做了哪几个技术选型”，这个回答可能显得过于片面，缺乏深度和广度。虽然抽离公共组件是项目架构中的一部分，但它并不能全面反映你在项目架构设计和实施方面的经验。以下是可能导致回答不够全面的几点：

### 1. **缺乏系统性**

- 项目架构涉及多个层面的设计，包括前端架构、后端架构、数据库设计、微服务划分、API 设计、CI/CD 流程、性能优化、安全性考虑等。单单提到“抽离公共组件”无法展示你在这些方面的考虑和实践。

### 2. **没有提到架构决策**

- 架构设计不仅仅是技术上的选择，还包括对业务需求的理解、技术选型的理由、如何权衡性能与开发效率、如何应对未来扩展需求等。只提到“抽离公共组件”没有体现你在做架构决策时的思考过程。

### 3. **忽略了设计模式和最佳实践**

- 架构设计中通常会涉及到使用设计模式（如 MVC、MVVM、Observer 等）、SOLID 原则、模块化开发、分层架构等。抽象和复用组件只是其中一部分，没有提及这些设计模式和最佳实践，可能会让面试官觉得你的经验不够深入。

### 4. **没有考虑架构的可扩展性和维护性**

- 一个好的架构需要考虑如何应对未来需求的变化，如何保持代码的可维护性、如何进行单元测试、集成测试等。只提到“抽离公共组件”可能会让人觉得你没有从长远角度思考架构的可扩展性和维护性。

### 5. **缺少实际案例**

- 面试官通常希望听到实际的案例和你在其中扮演的角色、解决了什么问题、如何做出架构上的决策等。只提到“抽离公共组件”没有具体的案例支撑，可能让面试官觉得你的回答缺乏实际操作经验。

## 二、如何改进回答？

当面试官问到你的项目架构经验时，建议你从以下几个方面来构建你的回答：

1. **概述架构设计的整体思路**：

   - 描述你在项目中如何设计整体架构，涉及哪些主要部分（前端、后端、数据库、API 等），以及如何将这些部分整合在一起。

2. **详细描述各个组件的设计**：

   - 讨论你如何划分模块和组件，如何处理依赖关系，如何进行组件抽象和复用。

3. **讨论架构决策和权衡**：

   - 说明你在设计架构时面对的挑战和权衡（例如选择技术栈、考虑性能与开发效率的平衡、应对复杂业务逻辑等），以及你是如何做出最终决策的。

4. **实际案例和结果**：

   - 通过具体的项目案例，展示你如何实施架构设计，以及架构设计为项目带来的好处（例如性能提升、开发效率提高、代码可维护性增强等）。

5. **架构演变和改进**：
   - 如果你有在项目中优化和演进架构的经验，可以提到你如何识别架构中的不足，并做出改进。

通过这种方式，能够更全面地展示你在项目架构设计方面的能力和经验。

## 三、为什么技术选型 ≠ 架构？

只停留在技术栈的选型上，确实不能算作完整的架构设计。

### 1. **架构是全局视角**

- 架构设计不仅仅是选择技术栈，而是从全局视角出发，规划整个系统的结构、模块间的关系、数据流、组件之间的交互等。它关注的是系统的整体设计，包括性能、扩展性、安全性、容错性、维护性等多个方面。技术栈的选型只是实现架构的一部分，而非架构的全部。

### 2. **架构涉及系统性问题**

- 架构设计需要解决如何将系统各部分高效且可靠地连接在一起，这包括模块化设计、分布式系统设计、负载均衡、数据存储策略、缓存策略、日志与监控、API 设计等。这些问题往往比技术栈的选型更为复杂，也更具决定性。

### 3. **技术栈选型是架构设计的一个结果**

- 技术栈的选择通常是基于架构设计中的需求和约束条件的结果。例如，考虑到系统的性能需求、团队的技术能力、未来的扩展性、第三方集成需求等，架构师才会选择合适的编程语言、框架、数据库、消息队列等技术栈。但架构设计首先要确定的是系统需要什么样的架构模式和结构，技术栈只是帮助实现这一目标的工具。

### 4. **架构关注设计模式和原则**

- 架构设计中包含大量的设计模式和设计原则，如 SOLID 原则、面向对象设计原则、微服务设计模式等。这些设计模式和原则帮助设计一个灵活、可维护、易扩展的系统结构。技术栈的选型虽然重要，但如果没有这些设计原则的指导，技术栈本身并不能解决架构层面的复杂性问题。

### 5. **架构考虑生命周期和演进**

- 架构设计需要考虑系统的整个生命周期，包括系统的迭代、演进、扩展和维护。好的架构不仅解决当前的问题，还要为未来的变化留有余地。而技术栈的选择通常只解决实现层面的问题，难以直接应对这些长期的架构演进需求。

### 6. **架构需要协调多个非功能性需求**

- 架构设计必须协调诸如性能、可扩展性、安全性、容错性、可维护性等多个非功能性需求，这些需求往往相互冲突，需要进行权衡和优化。而技术栈的选择更多是围绕功能需求展开的，未必能直接解决这些架构层面的挑战。

### 总结

架构设计是一项复杂而全局的任务，它涉及如何将一个系统的各个部分有机地组合在一起，以满足各种功能性和非功能性的需求。技术栈的选型只是实现架构的一个步骤，不能替代架构设计本身。因此，仅仅停留在技术栈的选择上，并不能算作完整的架构设计。
