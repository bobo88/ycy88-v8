# 前端实现自动键入字段的中间件

> [后端实现自动键入字段的中间件](/from-zero-rd/do/middleware)。

## 介绍

在很多前后端分离的应用中，前端需要自动添加一些设备信息、时间戳、签名等字段，以便进行后端验证和记录。为了避免在每个请求中手动添加这些字段，可以使用请求拦截器在发送请求之前自动将这些字段加入到请求体中。

## 目标

**通过使用 Axios 请求拦截器，在每次发送请求时自动将以下字段加入到请求体中**：

- `deviceId`: 设备 ID，可以使用设备的唯一标识符（如 UUID 或 IP 地址）。
- `deviceName`: 设备名称，可以通过浏览器的 `userAgent` 获取。
- `ts`: 当前时间戳，用于标识请求的时间。
- `sign`: 签名字段，用于确保请求的合法性。

## 步骤

### 1. 安装 Axios

如果你还没有安装 Axios，可以通过以下命令进行安装：

```bash
npm install axios
```

### 2. 创建请求拦截器

通过 Axios 的请求拦截器来自动加入所需字段。

#### 完整代码示例

```typescript
import axios from "axios";

// 创建 Axios 实例
const api = axios.create({
  baseURL: "http://localhost:5173/api/v1", // 替换为实际 API 地址
  headers: {
    "Content-Type": "application/json",
  },
});

// 获取设备信息
const getDeviceInfo = () => {
  const deviceId = "your-device-id"; // 替换为动态生成的设备ID（例如 UUID 或者设备 IP）
  const deviceName = navigator.userAgent; // 使用浏览器的 userAgent 作为设备名
  const ts = Date.now(); // 当前时间戳
  return { deviceId, deviceName, ts };
};

// 签名生成函数，通常根据请求的参数和一个私钥进行加密
const generateSign = (params: any, secret: string) => {
  const sortedParams = Object.keys(params)
    .sort()
    .reduce((acc: any, key: string) => {
      acc[key] = params[key];
      return acc;
    }, {});
  const queryString = new URLSearchParams(sortedParams).toString();
  return `${queryString}&secret=${secret}`; // 签名规则可以根据需要定制
};

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 获取设备信息
    const { deviceId, deviceName, ts } = getDeviceInfo();

    // 生成签名并将签名添加到请求体中
    const sign = generateSign(config.data, "your-secret-key"); // 可以将请求体传入签名函数

    // 修改请求体，将自动键入的字段加入
    config.data = {
      ...config.data, // 保留原有的请求体数据
      deviceId,
      deviceName,
      ts,
      sign,
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 测试请求
api
  .post("/login", { username: "user123", password: "password123" })
  .then((response) => {
    console.log("Response:", response);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

### 3. 请求体示例

假设你发起了以下请求：

```json
{
  "username": "user123",
  "password": "password123"
}
```

**请求体**（在发送时自动加上）：

```json
{
  "username": "user123",
  "password": "password123",
  "deviceId": "your-device-id",
  "deviceName": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  "ts": 1607513123456,
  "sign": "generated-signature"
}
```

### 4. 签名算法

在实际应用中，`sign` 字段通常用于验证请求的合法性。签名的生成方式可以根据实际需求进行自定义。通常的做法是将请求体的参数与一个密钥结合，进行加密或哈希操作。

在上面的例子中，`generateSign` 函数简单地将请求参数按字典序排序，并附加一个 `secret` 密钥生成签名。你可以根据实际需求选择不同的签名算法。

### 5. 请求头示例

**前端请求体**（发送时）：

```plaintext
POST /api/v1/login HTTP/1.1
Host: localhost:5173
Content-Type: application/json
...
{
  "username": "user123",
  "password": "password123",
  "deviceId": "your-device-id",
  "deviceName": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  "ts": 1607513123456,
  "sign": "generated-signature"
}
```

### 6. 总结

- 通过 **Axios 拦截器**，你可以在每次发送请求时自动将设备信息、时间戳、签名等字段加入到请求体中，而无需在每个请求中手动添加这些字段。
- 这种方式能够确保请求的一致性，减少重复代码，同时增强系统的安全性（如签名校验）。
- 签名的生成方法可以根据你的需求调整，通常涉及对请求体参数进行排序、加密或者哈希处理。

## 常见问题

1. **如何获取设备的唯一标识符（`deviceId`）？**

   - 设备标识符可以通过设备的 UUID、IP 地址，或用户的浏览器 `userAgent` 等信息生成。具体实现方式可以参考项目的需求。

::: tip 设备唯一标识符（Device ID）获取与实现方案
UUID（通用唯一识别码）是最常见的设备唯一标识符生成方式。UUID 的生成依赖于算法，确保每个生成的值都是唯一的。在前端，通常会将 UUID 存储在浏览器的 localStorage 中，以便跨会话使用。

- uuid 库：`npm install uuid`
- 生成 UUID：`import { v4 as uuidv4 } from 'uuid';`
- 获取 UUID：`const deviceId = localStorage.getItem('deviceId') || uuidv4();`
- 存储 UUID：`localStorage.setItem('deviceId', deviceId);`
- 使用 UUID：`{ deviceId }`

```js
import { v4 as uuidv4 } from "uuid";

// 获取或生成设备的 UUID
const deviceId = localStorage.getItem("deviceId") || uuidv4();

// 如果没有设备 ID，生成一个新的 UUID 并保存到 localStorage 中
if (!localStorage.getItem("deviceId")) {
  localStorage.setItem("deviceId", deviceId);
}

console.log("Device ID:", deviceId);
```

:::

2. **如何生成签名（`sign`）？**

   - 签名通常是根据请求的参数和一个密钥生成的，可以使用哈希算法（如 MD5、SHA-256）或对参数进行排序后加密生成。签名规则根据不同的后端验证机制而有所不同。

3. **为什么要使用请求拦截器？**
   - 请求拦截器可以让你在请求发出之前统一处理请求体，避免在每个请求中重复编写相同的逻辑，提高代码的可维护性。

## 参考资料

- [Axios 官方文档](https://axios-http.com/)
- [MDN Web Docs - navigator.userAgent](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent)
- [JavaScript 签名生成](https://www.geeksforgeeks.org/javascript-hash-strings-using-sha-256/)
