# MongoDB 事务支持

MongoDB 从 **4.0 版本** 开始支持多文档的 **ACID 事务**（Atomicity, Consistency, Isolation, Durability），这使得 MongoDB 在处理一些复杂的操作时，能够保证数据的一致性和完整性，类似于传统关系型数据库中的事务功能。事务可以让多个读写操作作为一个整体执行，保证这些操作要么全部成功，要么全部回滚。

### 1. 事务的概念

在数据库操作中，事务是一组原子化的操作，它具有以下四个特性（ACID）：

- **原子性（Atomicity）**：事务中的操作要么全部成功，要么全部失败并回滚。
- **一致性（Consistency）**：事务执行完成后，数据库从一种有效状态转变为另一种有效状态。
- **隔离性（Isolation）**：并发事务之间是相互隔离的，不会互相影响。MongoDB 使用**可重复读（Read Concern "snapshot"）**，保证事务中的操作在并发环境下不会受到其他事务的干扰。
- **持久性（Durability）**：一旦事务提交成功，数据即便在系统崩溃后也能保持持久。

### 2. MongoDB 的事务特性

MongoDB 的事务支持在 **副本集（Replica Set）** 和 **分片集群（Sharded Cluster）** 中运行。事务可以跨多个文档甚至多个集合执行，这使得它可以处理复杂的业务逻辑。事务的特性如下：

- **多文档事务**：MongoDB 默认的写入操作是单文档的原子性，但通过事务，可以保证多个文档的原子性操作。
- **跨集合事务**：事务可以跨多个集合执行，使得数据之间的关系更容易维护。
- **跨分片事务**：在 MongoDB 4.2 及更高版本中，支持跨分片集群的事务，解决了大规模分布式系统中的一致性问题。

### 3. 事务的基本用法

在 MongoDB 中，事务需要在 **会话（session）** 中启动。会话提供了执行事务的上下文。

#### 3.1 单副本集事务

示例：在同一副本集中的多个集合执行事务

```javascript
const session = db.getMongo().startSession() // 启动一个会话
session.startTransaction() // 开始事务

try {
  const usersCollection = session.getDatabase('myDatabase').users
  const ordersCollection = session.getDatabase('myDatabase').orders

  usersCollection.updateOne({ _id: 1 }, { $set: { balance: 200 } }, { session })

  ordersCollection.insertOne({ orderId: 1, userId: 1, total: 100 }, { session })

  session.commitTransaction() // 提交事务
} catch (error) {
  session.abortTransaction() // 回滚事务
  throw error
} finally {
  session.endSession() // 结束会话
}
```

- `startSession()`：启动一个会话。
- `startTransaction()`：在会话中开始一个事务。
- `commitTransaction()`：提交事务。
- `abortTransaction()`：遇到错误时回滚事务。
- `session`：每个数据库操作都必须在会话上下文中执行，以保证它们参与到同一事务中。

#### 3.2 跨分片集群的事务

在分片集群中，事务可以跨多个分片执行，但需要使用合适的 **分片键（shard key）** 来确保每个分片的数据能够正确定位。

```javascript
const session = db.getMongo().startSession()
session.startTransaction()

try {
  const productsCollection = session.getDatabase('shardedDB').products
  const salesCollection = session.getDatabase('shardedDB').sales

  productsCollection.updateOne(
    { productId: 1 },
    { $inc: { stock: -1 } },
    { session }
  )

  salesCollection.insertOne(
    { saleId: 1, productId: 1, quantity: 1 },
    { session }
  )

  session.commitTransaction()
} catch (error) {
  session.abortTransaction()
  throw error
} finally {
  session.endSession()
}
```

### 4. 注意事项

MongoDB 的事务功能非常强大，但在使用时也有一些需要注意的地方：

1. **性能开销**：

   - 事务在执行过程中会锁定相关的文档，这可能会导致并发性能下降。
   - 尽量只在确实需要 ACID 特性的操作中使用事务，避免在大部分简单操作中使用事务。

2. **事务大小限制**：

   - 每个事务有 16MB 的最大写入限制。
   - 一个事务中，写操作的总量不得超过此限制，因此在处理大数据时需要注意。

3. **事务的持续时间**：

   - 事务不能无限期地持续执行，MongoDB 会对长时间未提交的事务进行清理。因此，事务应尽量短小，减少锁定时间。

4. **副本集的事务行为**：

   - 在副本集事务中，如果事务期间发生主节点选举，事务会被中断并回滚。因此，在编写代码时应处理这种情况。

5. **事务隔离级别**：
   - MongoDB 事务默认使用 **"可重复读"（Repeatable Read）** 隔离级别，事务中的读操作总是看到一致的快照（snapshot）。

### 5. 应用场景

MongoDB 的事务功能适用于以下场景：

1. **银行转账**：在处理资金转移时，需要保证从一个账户扣款的同时另一个账户增加相应金额，事务可以确保整个操作的原子性。

   示例：从账户 A 转账到账户 B

   ```javascript
   db.accounts.updateOne({ _id: A }, { $inc: { balance: -100 } }, { session })
   db.accounts.updateOne({ _id: B }, { $inc: { balance: 100 } }, { session })
   ```

2. **电商订单处理**：在订单系统中，多个操作（如减少库存、记录订单、更新用户积分等）需要同时成功，才能保证订单处理的完整性。使用事务可以确保这些操作的原子性。
3. **数据一致性操作**：当多张表或集合之间的操作需要保持数据一致性时（如主从表的更新），事务能够确保所有表中的数据都同步更新，避免部分成功部分失败的情况。

### 6. 总结

MongoDB 的事务支持为开发者提供了更多的工具来处理复杂的业务场景，尤其是需要跨多个集合、多个文档的原子操作时。虽然 MongoDB 在单文档操作上已经是原子性的，但事务的引入使得它在分布式系统中能够处理更加复杂的业务逻辑，尤其是在多文档、多集合、跨分片的情况下。然而，由于事务会带来一定的性能开销，因此应在需要严格一致性的时候使用事务，而不是滥用。

通过合理使用事务，MongoDB 不仅可以适应 NoSQL 数据库的灵活性，还能在保证数据一致性的同时提供强大的扩展能力。
