# 后端实现自动键入字段的中间件

> [前端实现自动键入字段的中间件](/from-zero-fe/do/middleware)。

在开发 API 时，常常需要自动将一些通用字段添加到请求中，这些字段可能包括 `appId`、`deviceId`、`deviceName`、`timestamp (ts)` 和 `sign` 等。为了避免在每个请求中手动添加这些字段，可以通过在后端实现一个中间件来自动填充这些字段。

本文将介绍如何在 Express 中实现一个自动键入字段的中间件，确保每个请求都包含这些字段，而无需在前端每次发送请求时手动处理。

## 1. 中间件简介

中间件是在 Express 中用于处理请求和响应的函数。通过中间件，可以在请求处理的生命周期中对请求进行预处理，例如自动添加通用字段、验证请求数据、记录日志等。

在本例中，我们将编写一个中间件，用于在每个请求中自动添加 `appId`、`deviceId`、`deviceName`、`timestamp (ts)` 和 `sign` 等字段。

## 2. 设计思路

- **自动生成 `deviceId`**：如果设备没有提供 `deviceId`，我们可以根据客户端信息生成一个唯一的标识符（如 UUID）。该标识符可以存储在客户端的 `localStorage` 或 `cookies` 中，并随每次请求发送。
- **自动生成 `sign`**：`sign` 字段是根据请求中的一些字段（如 `appId`、`deviceId`、`deviceName`、`timestamp`）通过一定的算法（如哈希算法）生成的签名，用于确保请求的合法性。
- **自动添加其他字段**：根据需要，我们还可以自动添加 `appId`、`deviceName` 和 `timestamp` 等字段。

## 3. 实现步骤

### 3.1 安装依赖

在项目中使用 `uuid` 和 `crypto` 库来生成唯一的 `deviceId` 和 `sign`。

```bash
npm install uuid
```

### 3.2 编写中间件

在 `middlewares` 目录下创建一个 `autoFieldsMiddleware.ts` 文件，代码如下：

```typescript
import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

/**
 * 自动键入通用字段的中间件
 */
const autoFieldsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1. 获取请求中的 deviceId，如果没有则生成新的 UUID
  let deviceId =
    req.body.deviceId || req.headers["x-device-id"] || req.cookies?.deviceId;

  if (!deviceId) {
    deviceId = uuidv4(); // 如果没有 deviceId，则生成一个新的 UUID
    res.cookie("deviceId", deviceId, {
      maxAge: 365 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    }); // 1年有效期
  }

  // 2. 获取设备名称，默认为用户代理（User-Agent）
  const deviceName = req.headers["user-agent"] || "Unknown Device";

  // 3. 获取当前时间戳 (ts)
  const ts = Date.now();

  // 4. 构建 sign，sign 通常是用字段的值通过加密算法生成的签名
  const appId = "yourAppId"; // 这里可以从配置或环境变量中获取
  const sign = generateSign(appId, deviceId, deviceName, ts);

  // 5. 自动添加字段到请求体中
  req.body.appId = appId;
  req.body.deviceId = deviceId;
  req.body.deviceName = deviceName;
  req.body.ts = ts;
  req.body.sign = sign;

  next();
};

/**
 * 生成请求签名的方法
 * @param appId 应用 ID
 * @param deviceId 设备 ID
 * @param deviceName 设备名称
 * @param ts 时间戳
 * @returns 签名
 */
const generateSign = (
  appId: string,
  deviceId: string,
  deviceName: string,
  ts: number
) => {
  const data = `${appId}${deviceId}${deviceName}${ts}`;
  return crypto.createHash("sha256").update(data).digest("hex"); // 使用 sha256 哈希生成签名
};

export default autoFieldsMiddleware;
```

### 3.3 在 Express 中使用中间件

在 `app.ts` 或 `server.ts` 中，将刚刚编写的中间件应用到路由处理之前。

```typescript
import express from "express";
import autoFieldsMiddleware from "./middlewares/autoFieldsMiddleware";

const app = express();

// 使用 JSON 解析请求体
app.use(express.json());

// 将自动键入字段的中间件添加到请求处理流程中
app.use(autoFieldsMiddleware);

// 示例路由
app.post("/api/v1/login", (req, res) => {
  console.log("Received request:", req.body);
  res.json({ message: "Login successful", data: req.body });
});

// 启动服务器
app.listen(5173, () => {
  console.log("Server is running on http://localhost:5173");
});
```

### 3.4 前端请求示例

前端无需再手动添加这些字段，只需正常发送请求即可。设备的 `deviceId` 会通过中间件自动添加。

```javascript
fetch("http://localhost:5173/api/v1/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "user123",
    password: "password123",
  }),
});
```

### 3.5 请求和响应示例

**请求头**：

```plaintext
POST /api/v1/login HTTP/1.1
Host: localhost:5173
Content-Type: application/json
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36
```

**请求体**：

```json
{
  "username": "user123",
  "password": "password123",
  "appId": "yourAppId",
  "deviceId": "b3e7176a-9b9e-42f7-8f28-1c5cb2a39ff3",
  "deviceName": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  "ts": 1607513123456,
  "sign": "fd1e1f72f8f35cf8b6db77b56cbd7b3a0f2135a47e6598cd447d95358b4f1ccf"
}
```

::: warning 提示
请求体中新加的字段只有在后端可以看到，客户端是看不到的。

> 如果在请求发送前，后端通过中间件自动添加字段，这些字段是在后端进行处理和添加的，因此客户端并不会主动看到这些自动添加的字段。客户端只会看到原始请求体中的内容，而不会看到后端添加的部分。

1. **客户端请求体（前端发送的内容）**

```json
{
  "username": "user123",
  "password": "password123"
}
```

2. **最终发送到后端的请求体（经过中间件处理）：**

```json
{
  "username": "user123",
  "password": "password123",
  "appId": "yourAppId",
  "deviceId": "generated-device-id",
  "deviceName": "Mozilla/5.0",
  "ts": 1607513123456,
  "sign": "calculated-signature"
}
```

:::

**响应体**：

```json
{
  "message": "Login successful",
  "data": {
    "username": "user123",
    "password": "password123",
    "appId": "yourAppId",
    "deviceId": "b3e7176a-9b9e-42f7-8f28-1c5cb2a39ff3",
    "deviceName": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "ts": 1607513123456,
    "sign": "fd1e1f72f8f35cf8b6db77b56cbd7b3a0f2135a47e6598cd447d95358b4f1ccf"
  }
}
```

## 4. 总结

通过在 Express 中实现一个自动键入字段的中间件，可以大大简化前端请求的工作，自动为每个请求添加必要的字段，例如 `deviceId`、`appId`、`deviceName`、`ts` 和 `sign` 等。

- 前端只需专注于发送核心请求数据，后端负责处理设备信息和生成签名。
- 通过中间件，后端可以统一管理这些通用字段，确保请求的一致性和安全性。
