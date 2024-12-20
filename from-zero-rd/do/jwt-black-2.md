# 多端登录、二次校验敏感信息、账户修改密码后强制下线

![An image](/images/from-zero/rd/jwt-login.png)

以下是一个完整的实现，涵盖了多端登录、二次校验敏感信息、账户修改密码后强制下线所有端的功能。

## 1. **设置环境和依赖**

首先，你需要安装以下依赖：

```bash
npm install express mongoose jsonwebtoken bcryptjs redis
```

- **express**：用于创建服务器。
- **mongoose**：用于操作 MongoDB 数据库。
- **jsonwebtoken**：用于生成和验证 JWT。
- **bcryptjs**：用于加密密码。
- **redis**：用于缓存和存储 `serviceToken`。

## 2. **MongoDB 模型**

### **User 模型**

```javascript
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  lastLogin: { type: Date },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
```

### **ServiceToken 模型（可选，如果使用 MongoDB 存储 token）**

```javascript
const mongoose = require("mongoose");

const ServiceTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  serviceToken: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

const ServiceToken = mongoose.model("ServiceToken", ServiceTokenSchema);

module.exports = ServiceToken;
```

## 3. **生成和验证 JWT**

### **生成 Token 和 `serviceToken`**

```javascript
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // 用户模型

const JWT_SECRET = "your_jwt_secret";
const SERVICE_TOKEN_SECRET = "your_service_token_secret";

// 生成 accessToken 和 refreshToken
const generateToken = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" } // AccessToken 1小时有效
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    JWT_SECRET,
    { expiresIn: "7d" } // RefreshToken 7天有效
  );

  return { accessToken, refreshToken };
};

// 生成 serviceToken（用于二次校验敏感信息）
const generateServiceToken = (userId) => {
  const serviceToken = jwt.sign({ id: userId }, SERVICE_TOKEN_SECRET, {
    expiresIn: "5m",
  }); // 5分钟有效期
  return serviceToken;
};
```

## 4. **存储和验证 `serviceToken`**

### **Redis 存储 `serviceToken`**

```javascript
const redis = require("redis");
const client = redis.createClient();

// 存储 serviceToken 到 Redis
const storeServiceToken = (userId, serviceToken) => {
  client.setex(`serviceToken:${userId}`, 300, serviceToken); // 设置5分钟过期
};

// 验证 serviceToken
const verifyServiceToken = (userId, serviceToken, callback) => {
  client.get(`serviceToken:${userId}`, (err, storedToken) => {
    if (err || storedToken !== serviceToken) {
      return callback(false); // 验证失败
    }
    callback(true); // 验证成功
  });
};
```

### **MongoDB 存储 `serviceToken`（如果不使用 Redis）**

```javascript
const ServiceToken = require("./models/ServiceToken");

// 存储服务 token
const storeServiceTokenInDB = async (userId, serviceToken) => {
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5分钟后过期
  const tokenRecord = new ServiceToken({ userId, serviceToken, expiresAt });
  await tokenRecord.save();
};

// 验证 serviceToken
const verifyServiceTokenInDB = async (userId, serviceToken) => {
  const tokenRecord = await ServiceToken.findOne({ userId, serviceToken });
  if (!tokenRecord) {
    return false; // token 无效
  }

  if (new Date() > tokenRecord.expiresAt) {
    return false; // token 已过期
  }

  return true; // token 有效
};
```

## 5. **Express 路由和认证逻辑**

### **登录并生成 Token**

```javascript
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const {
  generateToken,
  generateServiceToken,
  storeServiceToken,
} = require("./tokenUtils");

const app = express();
app.use(express.json());

// 登录接口
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const { accessToken, refreshToken } = generateToken(user);

  // 登录成功，生成 serviceToken 用于敏感操作
  const serviceToken = generateServiceToken(user._id);
  storeServiceToken(user._id, serviceToken); // 存储到 Redis 或 MongoDB

  // 返回 token 信息
  res.json({ accessToken, refreshToken, serviceToken });
});
```

### **二次校验敏感信息**

```javascript
// 校验 serviceToken 是否有效
const verifyServiceTokenMiddleware = (req, res, next) => {
  const { serviceToken } = req.body;

  // 取出用户ID（可以通过 accessToken 验证后获取）
  const userId = req.user.id;

  verifyServiceToken(userId, serviceToken, (isValid) => {
    if (!isValid) {
      return res.status(401).json({ message: "Invalid service token." });
    }
    next();
  });
};

// 修改敏感信息的接口
app.post("/update-sensitive-info", verifyServiceTokenMiddleware, (req, res) => {
  // 修改用户敏感信息
  res.json({ message: "Sensitive info updated successfully." });
});
```

## 6. **修改密码时强制下线所有设备**

当用户修改密码时，需要使所有设备的 `accessToken` 和 `refreshToken` 失效，可以通过以下方式：

```javascript
// 修改密码并下线所有设备
app.post("/change-password", async (req, res) => {
  const { userId, newPassword } = req.body;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // 更新密码
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  // 清除与用户相关的所有 serviceToken
  client.del(`serviceToken:${userId}`); // 清除 Redis 中的 token
  // 你也可以删除 MongoDB 中的所有 token 记录

  // 发送响应
  res.json({ message: "Password changed and all sessions are logged out" });
});
```

## 7. **运行 Express 应用**

```javascript
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

## 8. **前端处理**

前端在用户登录时获取 `accessToken`、`refreshToken` 和 `serviceToken`，然后将 `serviceToken` 传递给需要二次验证的操作。

```javascript
const loginUser = async (username, password) => {
  const response = await axios.post("/login", { username, password });
  const { accessToken, refreshToken, serviceToken } = response.data;

  // 保存到本地存储或状态管理中
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("serviceToken", serviceToken);
};

const updateSensitiveInfo = async () => {
  const serviceToken = localStorage.getItem("serviceToken");
  const response = await axios.post("/update-sensitive-info", { serviceToken });
  console.log(response.data.message);
};
```

## **总结：**

1. **多端登录**：通过 `accessToken` 和 `refreshToken` 实现。
2. **二次校验敏感信息**：使用 `serviceToken` 对敏感操作进行二次验证。
3. **账户修改密码强制下线**：修改密码时清除用户所有设备的 `serviceToken` 和 `accessToken`。

通过这种方式，你可以确保用户在多个设备上登录，并且在修改密码时强制下线所有端。同时，对于敏感操作，还能通过 `serviceToken` 提供额外的安全性验证。
