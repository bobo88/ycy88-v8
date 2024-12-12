# jwt 的 token 失效机制

::: tip 核心概念汇总

1. **JWT 是什么？**
   - JWT （JSON Web Token） 是目前最流行的跨域认证解决方案。
   - 特点：自包含、无状态、安全性、可扩展、可跨域、可加密。
   - 缺点：无法主动失效、无法主动更新。
2. **JWT 的 token 失效机制：**
   - **使用 JWT 要非常明确的一点：JWT 失效的唯一途径就是等待时间过期。**
   - 黑名单机制：将失效的 token 存储在数据库中，每次请求时，检查 token 是否在黑名单中。
   - 白名单机制：将有效的 token 存储在数据库中，每次请求时，检查 token 是否在白名单中。
     - _不管是记录白名单还是黑名单，都需要一个记录的地方。对于分布式系统，还是需要每次使用前去记录的地方查询对比，和 session 方案没本质区别。_
3. **最佳实践：**
   - **JWT 失效机制**：合理设置过期时间，使用 Refresh Token 延长会话。
     - 使用 Refresh Token 延长会话，可以避免频繁刷新 Token，提高用户体验。
     - Refresh Token 的过期时间应该比 JWT 的过期时间更长。
     - _参考以上【黑/白名单机制】。_
   - **最小化信息存储**：避免存储敏感数据，简化 JWT Payload。
     - 服务器的黑名单（或白名单）只存储 `jti`，而不是整个 JWT。
   - **安全存储与传输**：使用 HttpOnly Cookie 存储，确保通过 HTTPS 传输。
   - **密钥管理与加密算法**：使用强加密算法，定期轮换密钥。
   - **防止重放攻击**：通过 `jti` 防止 Token 被重放。
   - **最小权限原则**：控制角色和权限，实施细粒度权限管理。
   - **跨服务认证**：实现 JWT 跨服务认证，使用 API Gateway 简化验证。

:::

**JWT （JSON Web Token）** 是目前最流行的跨域认证解决方案，是一种基于 Token 的认证授权机制。从 JWT 的全称可以看出，JWT 本身也是 Token，一种规范化之后的 **JSON 结构的 Token**。

因为 `JWT` 是无状态的，所以它的有效期完全由其本身决定，也就是说服务端无法让一个 `token` 失效。

- [SessionID（会话标识符）是什么？](/from-zero-fe/1/1.1-js#_7-2-浏览器特性)

## 一、token 失效机制

Token 失效机制是保证系统安全性的重要部分。通过合理的失效设计，可以减少攻击风险，防止被盗 Token 长时间滥用。以下是 Token 失效机制的常见实现方式及其具体补充：

### **1. 时间失效**

通过设置有效期限制 Token 的使用时间。

#### **(1) 短期有效的 Access Token**

- 设置较短的有效期（如 5-15 分钟）。
- 优点：即使 Token 被截获，攻击者使用时间受限。
- 实现：
  - 在生成 Token 时，添加 `exp`（过期时间）。
    ```json
    {
      "sub": "1234567890",
      "name": "John Doe",
      "exp": 1714656000 // Unix 时间戳
    }
    ```
  - 后端验证时检查 Token 是否过期。

#### **(2) 长期有效的 Refresh Token**

- 用于延长会话有效期，通常有效期较长（如 7 天或 30 天）。
- 客户端用 Refresh Token 获取新的 Access Token。
- 实现：
  - 在 Access Token 过期时，后端验证 Refresh Token 是否有效，签发新的 Access Token。

### **2. 主动注销机制**

在用户登出或敏感操作后，主动让 Token 失效。

#### **实现方式：**

- **后端黑名单机制**：

  - 在用户登出时，将 Token 的唯一标识（如 `jti` 或 Token 哈希值）加入黑名单。
  - 在每次请求时，检查 Token 是否在黑名单中。
  - 黑名单存储可以使用 Redis 实现：

    ```javascript
    const redis = require("redis");
    const client = redis.createClient();

    function addToBlacklist(tokenId) {
      client.set(tokenId, "blacklisted", "EX", 3600); // 设置过期时间
    }

    function isBlacklisted(tokenId, callback) {
      client.get(tokenId, callback);
    }
    ```

- **删除 Refresh Token**：
  - 在数据库中存储 Refresh Token，当用户注销时，移除对应记录。

### **3. IP 和设备绑定失效**

限制 Token 的使用环境，通过校验客户端信息使 Token 失效。

#### **实现方式：**

- 在 Token 中嵌入客户端的 IP、User-Agent 等信息。
- 后端每次校验 Token 时，验证这些信息是否与当前请求一致。
- 示例：
  ```json
  {
    "sub": "1234567890",
    "name": "John Doe",
    "ip": "192.168.0.1",
    "userAgent": "Mozilla/5.0"
  }
  ```

### **4. 超时失效（会话过期）**

Token 在一段时间未使用后自动失效。

#### **实现方式：**

- 设置滑动过期时间（Sliding Expiration）：

  - 每次使用 Token 时，刷新其过期时间。
  - 示例：用户请求刷新时，更新 Token 的过期时间。
    ```javascript
    function generateToken(payload) {
      const expiration = Math.floor(Date.now() / 1000) + 900; // 15 分钟
      return jwt.sign({ ...payload, exp: expiration }, secretKey);
    }
    ```

- 服务端记录 Token 的最后使用时间：
  - 结合 Redis 或数据库记录最后一次验证时间，判断是否超时。

### **5. 异常检测失效**

当检测到异常行为时，强制让 Token 失效。

#### **触发场景：**

- 检测到多地点或多设备登录同一账号。
- 多次失败的登录尝试。
- 短时间内的高频请求。

#### **实现方式：**

- 使用异常事件触发 Token 加入黑名单。
- 例如：
  - 一个用户从多个地理位置使用同一 Token 时，触发安全机制强制失效。
  - 通过 Redis 或数据库存储设备和位置信息。

### **6. 强制失效机制**

管理员手动或系统定时让所有 Token 强制失效。

#### **实现方式：**

- **全局签发版本号 (Token Versioning)**：
  - 为每个用户分配一个版本号，在 Token 中携带。
  - 当需要强制失效时，更新版本号，旧 Token 即失效。
  - 示例：
    - 用户数据库记录：
      ```json
      { "userId": 123, "tokenVersion": 2 }
      ```
    - Token Payload：
      ```json
      { "userId": 123, "tokenVersion": 2 }
      ```

### **总结：**

Token 失效机制的核心在于**多层防护**：

1. **时间约束**：通过有效期限制使用范围。
2. **行为约束**：结合用户行为检测异常。
3. **动态控制**：主动注销、全局失效等增强安全性。

根据业务场景合理组合这些机制，既能提高安全性，也能避免用户体验受损。

## 二、token 失效原因

Token 失效的原因主要涉及以下四个方面：

1. **时间相关**：如超时、滑动过期机制缺失。
2. **用户行为**：如注销、误操作。
3. **环境变动**：如设备冲突、网络环境变化。
4. **安全策略**：如异常检测、权限调整。

## 三、token 失效解决方案

### **1. 短期 Token + 刷新机制（用户登录返回两个 JWT）**

**场景**：用户登录后需要持续访问资源，短期 Token 过期可能中断操作。

#### **解决方案**：

- **短期 Access Token**：
  - 设置短生命周期的 Access Token（如 5-15 分钟）。
  - 通过短期有效 Token 减少暴露时间，提高安全性。
- **长期 Refresh Token**：
  - 通过 Refresh Token 在后台静默获取新的 Access Token，无需用户重复登录。
- **实现步骤**：
  1. 用户登录后，服务器返回 Access Token 和 Refresh Token。
  2. Access Token 过期时，客户端自动使用 Refresh Token 请求新的 Access Token。
  3. 如果 Refresh Token 也失效，要求用户重新登录。

#### **优点**：

- 提高安全性，减少长期 Token 暴露风险。
- 静默刷新不会影响用户体验。

#### **注意事项**：

- Refresh Token 存储在安全位置（如 HttpOnly Cookie）。
- 设计 Refresh Token 的失效机制，避免滥用。

### **2. 提前刷新机制**

**场景**：用户操作较长时间未主动发出请求，Token 可能在用户下次操作时过期。

#### **解决方案**：

- 客户端定时检测 Token 剩余有效时间，提前触发刷新。
- 刷新条件：
  - Token 剩余有效时间低于某个阈值（如 2 分钟）。
- **实现步骤**：
  1. 客户端在获取 Token 后开始倒计时。
  2. 每次发送请求时，检查 Token 是否即将过期。
  3. 如果接近过期时间，提前请求新的 Token。

#### **优点**：

- 减少因 Token 过期导致的中断操作。
- 提高用户体验，避免频繁登录。

### **3. 滑动过期机制 (Sliding Expiration)**

**场景**：用户频繁操作，Token 需要不断续期，但又不希望 Refresh Token 被频繁调用。

#### **解决方案**：

- 每次使用 Token 时，更新其过期时间。
- **实现方式**：
  - 后端重新签发带有新过期时间的 Token。
  - 或通过 Redis 等缓存技术，更新 Token 的会话有效时间。
- **示例逻辑**：
  1. 用户发送请求时，检查 Token 的剩余有效时间。
  2. 如果 Token 快要过期，重新签发 Token 并返回。
  3. 如果请求超时，Token 失效，用户需重新登录。

#### **优点**：

- 保持 Token 活跃性，避免频繁重新登录。
- 安全性可控，可配合请求频率限制。

### **4. 单点登录 (SSO) 与全局注销**

**场景**：用户通过单点登录访问多个系统，Token 在某一系统失效后需要同步更新。

#### **解决方案**：

- **Token 版本控制**：
  - 每个用户记录一个全局版本号 (`tokenVersion`)。
  - Token 中包含版本号，验证时对比服务器记录。
  - 版本更新后，旧版本的 Token 即失效。
- **集中 Token 存储**：
  - 使用 Redis 或数据库集中存储 Token。
  - Token 失效时，立即从存储中删除或标记为无效。

#### **优点**：

- 提高统一管理能力，支持多系统协同。
- 实时注销功能提高安全性。

### **5. 异常处理机制**

**场景**：用户因网络问题或操作不当导致 Token 失效，影响正常使用。

#### **解决方案**：

- **友好提示与自动重试**：
  - 前端检测到 Token 失效（如 401 状态码）后，提示用户重新登录或自动刷新 Token。
  - 示例：
    ```javascript
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response.status === 401) {
          // 自动刷新 Token
          const newToken = await refreshAccessToken();
          error.config.headers["Authorization"] = `Bearer ${newToken}`;
          return axios.request(error.config);
        }
        return Promise.reject(error);
      }
    );
    ```
- **用户通知**：
  - 如果 Token 长时间未使用，主动向用户发送重新登录通知。

#### **优点**：

- 提高用户体验，减少因失效导致的困惑。

### **6. 备选方案：双 Token 验证**

**场景**：高敏感操作需要额外验证。

#### **解决方案**：

- 结合 Access Token 和 CSRF Token：
  - 常规操作使用 Access Token。
  - 高敏感操作（如转账、密码修改）需额外验证 CSRF Token。
- 强化请求签名机制，确保每次请求的唯一性。

### **总结：**

根据业务需求选择合适的 Token 失效解决方案，推荐组合使用以下策略：

1. **短期 Access Token + 长期 Refresh Token**（基本方案）。
2. **提前刷新机制**（提升用户体验）。
3. **滑动过期机制**（适用于长时间操作）。
4. **全局 Token 管理**（适用于 SSO 场景）。

## 四、黑白名单方案

- 黑名单方案：所有黑名单中的 JWT 将不可使用。
- 白名单方案：不在白名单中的 JWT 将不可使用。

### **1. 黑名单方案**

**机制**：  
将被禁止使用的 JWT 标记到黑名单中，无论其是否在有效期内，均拒绝该 Token 的访问请求。

#### **实现方式**：

1. **存储黑名单**：
   - 使用 Redis 或数据库存储黑名单中的 JWT 或其唯一标识（如 JTI）。
   - 每次请求时校验当前 JWT 是否在黑名单中。
2. **加入黑名单的场景**：
   - 用户主动注销。
   - 系统检测到异常行为（如伪造、暴力请求等）。
   - Token 被标记为强制失效（如密码修改或权限调整）。
3. **定期清理**：
   - 定时清理黑名单中过期的 JWT，以减少存储压力。

#### **优点**：

- **灵活性**：允许根据需求动态使特定 JWT 失效。
- **安全性**：支持主动失效，防止已被盗用的 Token 被继续使用。

#### **缺点**：

- **额外存储开销**：需要维护一份黑名单存储。
- **性能消耗**：每次请求需要检查 Token 是否在黑名单中。

#### **适用场景**：

- 用户可能主动注销，或需要强制下线的场景。
- 支持动态控制和实时调整 Token 有效性的需求。

### **2. 白名单方案**

**机制**：  
只有白名单中的 JWT 才被允许使用，未在白名单的 JWT 即使格式正确、未过期也将被拒绝。

#### **实现方式**：

1. **存储白名单**：
   - 将所有有效 JWT 或其唯一标识（如 JTI）存储在 Redis 或数据库中。
   - 在每次请求时验证当前 JWT 是否存在于白名单中。
2. **白名单的更新**：
   - 用户登录成功后，将新生成的 JWT 添加到白名单。
   - 用户注销、超时或黑名单策略生效时，从白名单中移除相应的 JWT。
3. **配合失效机制**：
   - 设置白名单中 JWT 的过期时间与其签发时的 `exp` 保持一致。
   - 失效后自动从白名单中清理。

#### **优点**：

- **更严格的控制**：任何非白名单的 Token 都会被拒绝，即使其未被盗用或未过期。
- **可实现全局注销**：随时可以清空白名单，迫使所有用户重新登录。

#### **缺点**：

- **额外存储和性能开销**：所有有效 Token 必须存储，尤其在高并发场景下存储量较大。
- **依赖后端验证**：JWT 的无状态特性被削弱，每次请求都需查询白名单。

#### **适用场景**：

- 高敏感操作或严格权限管理。
- 需要更高安全性，要求任何异常 Token 都无法访问资源。

### **对比分析**

| **特性**     | **黑名单方案**             | **白名单方案**                |
| ------------ | -------------------------- | ----------------------------- |
| **存储需求** | 仅存储被禁止的 JWT         | 存储所有有效 JWT              |
| **性能消耗** | 请求时校验是否在黑名单中   | 请求时校验是否在白名单中      |
| **灵活性**   | 动态标记失效，易于扩展     | 更严格控制，适用于高敏感场景  |
| **安全性**   | 基于已有 JWT 的额外保护    | 所有 JWT 必须经过验证才能使用 |
| **适用场景** | 用户主动注销或异常检测场景 | 高敏感操作、严格权限管理场景  |

## 五、其他问题

::: tip 如何基于 JWT 进行身份验证？

> 步骤如下：

1. 用户向服务器发送用户名、密码、验证码等信息用于登录系统。
2. 如果用户用户名、密码、验证码等信息校验正确的话，服务端会返回已经签名的 Token，也就是 JWT。
3. 用户以后每次向后端发请求都在 Header 中带上这个 JWT 。
4. 服务端检查 JWT 并从中获取用户相关信息。

> 两点建议：

1. 建议将 JWT 存放在 localStorage 中，放在 Cookie 中会有 CSRF 风险。
2. 请求服务端并携带 JWT 的常见做法是将其放在 HTTP Header 的 Authorization 字段中（Authorization: Bearer Token）。

:::

::: tip 如何防止 JWT 被篡改？
对于 JWT 而言，即使 JWT 被泄露或者捕获，黑客也没有办法篡改 TOKEN.因为服务端拿到了 JWT 会解析出其中的 Header、Payload、以及 Signature，通过密钥再次生成一个 Signature 与 JWT 中的 Signature 对比。所以黑客只要不知道我们的密钥是没有办法伪造 Token 的。
:::

::: tip 如何防止被抓包伪造获取 token？

##### **1. 加密与验证机制**

- **使用 HTTPS**：确保所有通信内容（包括 Token）经过加密传输。
- **Token 签名与验证**：采用 JWT 等方式，对 Token 进行签名，并在服务器端验证签名的有效性。
- **Token 加密**：对 Token 内容加密，确保即使被窃取也无法直接使用。

##### **2. 限制 Token 使用范围**

- **短生命周期 Token**：设置较短的有效期，并通过 Refresh Token 机制刷新。
- **绑定客户端信息**：将 Token 与 IP 地址、User-Agent 等绑定，防止跨设备使用。
- **双 Token 验证**：配合 CSRF Token 增强安全性。

##### **3. 防止伪造请求与抓包**

- **请求签名机制**：加入 `timestamp` 和 `nonce`，对请求生成唯一签名，服务端验证合法性。
- **动态密钥与加密**：在前后端通信中使用动态生成的密钥进行加密。
- **前端防调试**：混淆代码，检测调试工具，防止攻击者直接分析前端逻辑。
- **CORS 限制**：配置服务器 CORS 策略，验证请求来源。

##### **4. 用户行为与监控**

- **登录设备管理**：记录 Token 使用的设备和 IP，异常时失效 Token。
- **限速与防暴力破解**：限制获取 Token 的接口调用频率，加入 CAPTCHA。
- **实时监控与报警**：监控异常 Token 活动，触发安全报警。

:::

## 六、完整 JWT 示例

::: tip JWT 示例

```plaintext
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.
eyJpc3MiOiJhdXRoLm15YXBwLmNvbSIsInN1YiI6IjEyMzQ1Njc4OTAiLCJhdWQiOiJteWFwcCIsImV4cCI6MTcxNjI0OTY5NiwiaWF0IjoxNzE2MjQ2MDk2LCJqdGkiOiJhYmNkMTIzNCIsIm5hbWUiOiJKb2huIERvZSIsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4ifQ
.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

1. **Header**：

   ```json
   {
     "alg": "HS256",
     "typ": "JWT"
   }
   ```

2. **Payload**：

   ```json
   {
     "iss": "auth.myapp.com",
     "sub": "1234567890",
     "aud": "myapp",
     "exp": 1716249696,
     "iat": 1716246096,
     "jti": "abcd1234",
     "name": "John Doe",
     "email": "john.doe@example.com",
     "role": "admin"
   }
   ```

3. **Signature**：  
   一段由密钥生成的哈希值。

:::

---

- [使用黑名单完成，Jwt 退出登录操作](https://juejin.cn/post/7276324625838161980)
- [JWT 引入后的问题及优化方案：无感续签与 token 失效管理？](https://segmentfault.com/q/1010000044878661)
- [JWT、 超详细、分析、token、鉴权、组成、优势 下](https://developer.aliyun.com/article/1168639)
- [JWT 还能这样的去理解嘛？？](https://open.alipay.com/portal/forum/post/150001033)
- [JWT 还能这样的去理解嘛？？](https://cloud.tencent.com/developer/article/2381130)
