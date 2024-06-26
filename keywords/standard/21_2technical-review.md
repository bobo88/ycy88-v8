# 技术评审规范

::: tip 技术评审规范
技术评审规范范围：方案设计、数据库设计、接口设计。
:::

## 一、评审目的

技术评审的目的是确保项目采用的技术方案、数据库设计和接口设计在质量和安全性上都是可靠的，以满足项目需求和未来的可维护性、扩展性。通过评审，确保团队对项目的技术实现有清晰的认识，降低技术风险。

## 二、评审流程

技术评审的流程主要包括方案设计、数据库设计、接口设计三个方面。在评审前，评审小组成员应提前阅读相关文档，并准备好问题和建议。

1. **召开评审会议：** 主持人介绍评审目的和流程，评审小组成员逐一提出问题和建议。
2. **方案设计评审：** 评审方案的清晰性、模块划分、技术选型、安全性和性能等方面。
3. **数据库设计评审：** 评审数据库表结构、索引、事务处理、数据备份与恢复等方面。
4. **接口设计评审：** 评审接口规范、错误处理和安全性等方面。
5. **总结和记录：** 记录评审中的问题和建议，为后续改进提供参考。

## 三、评审规范（checklist）

### 1. 方案设计

- **清晰性：** 技术方案是否清晰地描述了解决方案，包括架构、模块、组件等。
- **模块划分：** 模块划分是否合理，各模块之间的职责是否明确。
- **技术选型：** 所选技术是否适合解决问题，是否考虑到未来的可维护性和扩展性。
- **安全性：** 是否考虑了潜在的安全风险，并采取了相应的防范措施。
- **性能：** 方案是否满足性能需求，是否有潜在的性能瓶颈。
- **文档完整性：** 技术方案文档是否完整，包含足够的细节信息。

### 2. 数据库设计

- **表结构：** 数据库表结构是否合理，是否符合范式设计原则。
- **索引：** 是否合理选择了索引，以提高查询效率。
- **事务处理：** 是否考虑了事务处理，确保数据的一致性和完整性。
- **数据备份与恢复：** 是否有有效的数据备份和恢复策略。
- **数据库变更策略：** 是否有明确的数据库变更策略，防止对生产环境的影响。

### 3. 接口设计

- **接口规范：** 接口是否符合规范，包括参数传递、返回结果等。
- **错误处理：** 是否考虑了各种异常情况的错误处理机制。
- **安全性：** 对外接口是否做了必要的安全性控制。
- **接口文档：** 接口文档是否详细，是否便于开发人员理解和使用。

## 四、参考文档

- 技术方案文档
- 数据库设计文档
- 接口设计文档

## 技术方案文档（参考）

### 1. 项目概述

- 项目名称
- 项目背景和目标
- 项目范围和边界

### 2. 架构设计

- 技术架构概述
- 模块划分和职责
- 依赖关系和接口

### 3. 技术选型

- 前端技术栈
- 后端技术栈
- 数据库选择及理由
- 第三方库和工具的使用

### 4. 安全设计

- 安全需求分析
- 数据传输和存储的加密机制
- 用户认证和授权策略
- 防范常见攻击手段

### 5. 性能设计

- 性能目标和指标
- 数据库性能优化策略
- 缓存策略
- 异步处理和并发控制

### 6. 扩展性和维护性

- 模块化设计
- 插件化和可拔插架构
- 日志和异常处理
- 代码规范和文档规范

### 7. 部署和维护

- 部署流程和工具
- 灰度发布和回滚计划
- 监控和日志收集
- 定期维护计划

### 8. 风险分析和应对策略

- 技术风险识别
- 针对每项风险的应对策略
- 紧急故障恢复计划

## 数据库设计文档（参考）

### 1. 数据库结构

- 表结构设计
- 主键和外键关系
- 索引设计
- 视图和存储过程

### 2. 数据库范式设计

- 范式分析
- 范式设计选择和理由

### 3. 事务和并发控制

- 事务处理策略
- 并发控制机制
- 锁定策略

### 4. 数据备份和恢复

- 定期备份计划
- 备份存储和恢复流程
- 灾难恢复计划

### 5. 数据安全性

- 数据权限和访问控制
- 数据加密机制
- 数据完整性保障

### 6. 数据库性能优化

- 查询性能优化
- 索引优化
- 统计信息维护

### 7. 数据迁移和升级

- 数据迁移计划
- 数据库版本升级策略

## 接口设计文档（参考）

### 1. 接口规范

- 接口命名规范
- 请求方法和路径
- 请求参数和响应格式

### 2. 错误处理

- 错误码定义
- 异常情况处理流程
- 错误信息格式

### 3. 安全性

- 接口访问权限控制
- 参数校验和输入过滤
- 敏感信息保护

### 4. 异步和同步接口设计

- 异步接口设计原则
- 同步接口的并发控制
- 回调机制和状态通知

### 5. 版本控制

- 接口版本管理策略
- 向后兼容性和向前兼容性
- 废弃接口的处理

### 6. 文档和测试

- 接口文档的撰写规范
- 接口测试用例设计
- Mock 数据的生成

### 7. 客户端和服务端通信

- 数据传输格式和协议
- 长连接和短连接设计
- 客户端和服务端的状态同步

---

- [技术评审，你拿什么来吐槽？](https://juejin.cn/post/6844904017194123277)
