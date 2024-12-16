# IP 限流方案

> 常用的限流分类是：基于资源的限流和基于时间的限流。

- [限流的分类](/from-zero-rd/do/current-limit)

::: tip 限流的本质和目的
限流的本质是系统的一种保护机制，目的是在资源有限的情况下，通过控制请求的流量，避免资源的过载和服务的崩溃，实现流量的可控性和服务的高可用性。
:::

我们从标题可以看出，我们是针对 IP 进行限流，所以我们应该要做的三个事情是：

1. **识别**：如何统计 IP 的请求量
2. **判断**：如何判断 IP 是否超过限制
3. **处理**：如何处理超过限制的 IP

## 一、如何统计 IP 的请求量

### **1.1 识别 IP**

在统计 IP 请求量之前，首先要确保能够正确地识别请求方的 IP 地址。

#### **方法：**

1. **直接从 HTTP 请求中获取**：

   - 通过服务器的网络接口直接获取客户端 IP 地址。
   - **示例（Express.js）：**
     ```javascript
     const ip = req.ip; // 或 req.connection.remoteAddress
     ```

2. **通过 `X-Forwarded-For` 标头识别**：

   - 在反向代理或负载均衡环境下，请求的真实 IP 通常存储在 `X-Forwarded-For` 头中。
   - **示例（Express.js）：**
     ```javascript
     const ip = req.headers["x-forwarded-for"] || req.ip;
     ```

3. **处理多级代理的情况**：

   - `X-Forwarded-For` 可能包含多个 IP（多个代理经过的路径），真实 IP 通常是最左边的 IP。
   - **示例：**
     ```javascript
     const ip = (req.headers["x-forwarded-for"] || req.ip).split(",")[0].trim();
     ```

4. **特殊情况处理**：
   - 若有 VPN 或代理环境，可能需要结合其他用户标识（如 `user-agent`）进行辅助识别。

### **1.2 统计 IP 请求量**

识别 IP 后，需要在短时间内统计每个 IP 的请求数量。以下是常见统计方法：

#### **1. 基于内存的统计**

- **适用场景**：单实例服务器，小规模流量。
- **实现方式**：使用哈希表记录每个 IP 的请求量。

  - **示例（Node.js）：**

    ```javascript
    const ipRequests = {};

    function logRequest(ip) {
      if (!ipRequests[ip]) {
        ipRequests[ip] = 1;
      } else {
        ipRequests[ip]++;
      }
    }
    ```

- **优点**：简单高效，低延迟。
- **缺点**：不适合分布式系统或长时间统计。

#### **2. 基于 Redis 的分布式统计**

- **适用场景**：分布式环境，大规模流量。
- **实现方式**：使用 Redis 的原子操作和过期时间统计请求量。

  - **示例（使用 Redis 和 Node.js）：**

    ```javascript
    const redis = require("ioredis");
    const client = new redis();

    async function logRequest(ip) {
      const key = `rate_limit:${ip}`;
      const count = await client.incr(key);

      if (count === 1) {
        await client.expire(key, 60); // 设置 60 秒过期
      }

      return count;
    }
    ```

- **优点**：支持分布式，过期时间可控。
- **缺点**：依赖 Redis，增加了外部依赖。

#### **3. 使用滑动窗口计数器**

- **适用场景**：需要更平滑的限流效果。
- **实现方式**：

  - 将时间划分为多个小窗口，每个窗口分别统计请求数。
  - 滑动窗口通过加权计算准确统计当前时间段的请求总数。
  - **实现示例：**

    ```javascript
    const redis = require("ioredis");
    const client = new redis();

    async function logRequest(ip) {
      const key = `sliding_window:${ip}`;
      const currentTime = Date.now();
      const windowSize = 60 * 1000; // 60 秒

      // 删除过期请求
      await client.zremrangebyscore(key, 0, currentTime - windowSize);

      // 添加当前请求
      await client.zadd(key, currentTime, currentTime);

      // 获取当前窗口内的请求数量
      const count = await client.zcard(key);

      return count;
    }
    ```

- **优点**：限流更平滑，无突刺效应。
- **缺点**：实现复杂，性能略低。

#### **4. 使用令牌桶算法统计**

- **适用场景**：需要严格控制请求速率的场景。
- **实现方式**：通过动态生成令牌来限制请求速率。

  - **实现示例：**

    ```javascript
    const redis = require("ioredis");
    const client = new redis();

    async function logRequest(ip) {
      const key = `token_bucket:${ip}`;
      const maxTokens = 100; // 最大令牌数
      const refillRate = 1; // 每秒生成令牌数

      // 获取当前令牌数
      const tokens = await client.get(key);
      const currentTokens = Math.min(
        maxTokens,
        (tokens || maxTokens) + refillRate
      );

      if (currentTokens <= 0) {
        return false; // 请求被拒绝
      }

      await client.set(key, currentTokens - 1, "EX", 60); // 更新令牌数并设置过期时间
      return true; // 请求允许
    }
    ```

- **优点**：动态控制请求速率，性能稳定。
- **缺点**：实现复杂，需要精确时间同步。

::: tip 小结

- 小型系统：可以用内存统计方式（如简单计数器）。
- 分布式系统：推荐使用 Redis 进行分布式统计。
- 严格限流：选择滑动窗口或令牌桶算法。

:::

## 二、如何判断 IP 是否超过限制

判断 IP 是否超过限制一般会通过以下几个方法：

1. **请求计数器：**

   - 为每个 IP 分配一个计数器，记录每个 IP 在单位时间内发起的请求次数。
   - 如果请求次数超过设定的阈值，就判断该 IP 超出了限制。

2. **存储结构：**

   - 使用内存存储（如 Redis、Memcached 等）来存储每个 IP 在某段时间内的请求次数。
   - 设置有效时间（如 1 分钟）来限制计数器的生命周期，防止内存被大量请求数据占用。

3. **时间窗口：**

   - 每当一个请求到达时，检查该请求时间是否在设定的时间窗口内。如果在窗口内，增加该 IP 的请求计数；如果超过了窗口的有效期，重置计数器。

4. **判断条件：**
   - 判断每个 IP 的请求次数是否超出限制，比如：
     - 如果每分钟请求次数大于某个预设值（如 100 次），则判定该 IP 超限。
     - 对于更精细的判断，可以通过滑动窗口或令牌桶算法来处理请求分布。

## 三、如何处理超过限制的 IP

当某个 IP 的请求超过限制时，需要对其进行处理，避免该 IP 继续发起请求。以下是一些常见的处理策略：

1. **返回 429 状态码：**

   - 如果某个 IP 超过限制，直接返回 HTTP 429 Too Many Requests 状态码，提示用户请求过于频繁。

2. **封禁或限制请求：**
   - 临时封禁：将超过限制的 IP 加入黑名单，禁止访问一定时间（如 10 分钟、1 小时等），然后恢复。
   - 阻止进一步请求：直接拒绝该 IP 的请求，不再响应。
3. **降级服务：**

   - 对超过限制的 IP，可以降低服务质量，例如返回更低频次的数据或简化的结果，防止过度请求消耗系统资源。

4. **限流重试：**

   - 提供一个重试的机制，超出限制的 IP 可以等待一段时间（例如 10 秒、1 分钟），然后再重新请求。如果请求次数继续超过限制，则延长等待时间或禁止访问。

5. **日志记录：**

   - 将超过限制的 IP 进行日志记录，帮助管理员了解哪些 IP 在恶意请求服务，以便做进一步的分析和防御措施。

6. **通知用户：**
   - 可以通过邮件、短信等方式通知用户，其 IP 已被限流，提示其行为异常并要求改善。

::: tip 限流方案总结：

1. **限流策略选择**：根据业务需求选择适合的限流算法（如固定窗口、滑动窗口、漏桶、令牌桶等）。
2. **判断超限**：使用请求计数器和时间窗口检测 IP 的请求频率，判断是否超过限制。
3. **处理超限**：对超限的 IP 进行处理，可以返回错误状态码、临时封禁、限速等。

:::
