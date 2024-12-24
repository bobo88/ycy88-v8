# 日志管理实践

- ‌RabbitMQ‌：设计偏向于消息传递的可靠性和灵活性，适合处理高并发场景下的消息传递 ‌.

- ‌Kafka‌：一个分布式流式处理平台，基于 Zookeeper 协调的分布式消息系统，适用于大规模数据处理和日志管理 ‌.

> 考虑到我们的场景，包括 **用户购买记录、登录修改状态、用户操作日志** 等需要长期保存的数据，我们选择使用 **Kafka** 作为日志管理系统的核心组件。

::: tip **Kafka** 的主要特点

1. **高吞吐量**：Kafka 能够处理大规模的实时数据流，支持每秒钟处理百万级别的消息。
2. **分布式架构**：Kafka 是一个分布式系统，可以横向扩展，支持多节点部署，具备高可用性和容错能力。
3. **持久化存储**：Kafka 能够将消息持久化到磁盘，并支持日志回溯，即便消费者没有及时处理，数据依然不会丢失。
4. **可扩展性**：Kafka 支持水平扩展，增加更多节点可以提高吞吐量和存储容量。
5. **高可靠性**：通过数据复制，Kafka 确保消息不会丢失，即使部分节点出现故障，也能继续运行。
6. **顺序读写**：Kafka 优化了磁盘的顺序读写，提供了非常高的性能，尤其是在高吞吐量的场景中。
7. **实时流处理**：Kafka 与流处理框架（如 Kafka Streams、Apache Flink、Apache Spark）紧密集成，支持实时数据流处理。
8. **支持多种消费模式**：Kafka 支持单消费者、多个消费者和消费者组，能够灵活地处理不同的消息消费需求。
9. **支持批量消息处理**：Kafka 支持批量写入和批量读取消息，提升了数据的处理效率。
10. **灵活的消息订阅机制**：Kafka 采用发布-订阅模型，允许多个消费者独立消费消息，同时还能实现消息的广播和分发。

:::

## Kafka 的使用（Express）

![An image](/images/from-zero/rd/kafka.png)
![An image](/images/from-zero/rd/kafka.gif)
![An image](/images/from-zero/rd/kafka.webp)
![An image](/images/from-zero/rd/kafka-2.webp)

- [https://kafka.js.org/docs/getting-started](https://kafka.js.org/docs/getting-started)

## Kafka 的使用（Go）

> TODO
