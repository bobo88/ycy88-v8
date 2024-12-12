# JWT Refresh Token 无感刷新机制

::: tip 整个流程

1. **后端**：登录 login API 接口改造 ==> 修改【身份验证中间件】 ==> refreshToken API 接口的实现。
2. **前端**：捕获 401 错误 ==> 请求刷新 token ==> 重新请求受保护的资源。

:::

![An image](/images/from-zero/rd/refresh-token.png)

## 一、后端（Express）代码实现

### 1. 登录 login API 接口改造

> 用户登录时，需要返回两个 token，一个是 access token，一个是 refresh token。access token 用于访问受保护的资源，refresh token 用于刷新 access token。

```ts
// Files: routes/auth.ts
import express from "express";
import { loginUser } from "../controllers/userController";

const router = express.Router();

// 用户登录
router.post("/login", loginUser);
// 其他：（略）
```

```ts
// Files: controllers/userController.ts
import { Request, Response } from "express";
import * as userService from "../services/userService";
import { storeRefreshToken } from "../services/storeRefreshToken";
import { sendResponse } from "../utils/response";

// 用户登录
export const loginUser = async (req: Request, res: Response) => {
  const { email, password, appId, deviceId, deviceName } = req.body;

  try {
    // 查找用户
    const user = await userService.checkIfUserExists(email);
    if (!user || !userService.validatePassword(password, user.password)) {
      return sendResponse(res, 401, "用户名或密码不正确", null);
    }

    // 生成 JWT
    // @ts-ignore
    const { accessToken, refreshToken } = userService.generateUserToken(user);

    // 存储 Refresh Token
    await storeRefreshToken(user._id as string, refreshToken, 7 * 24 * 60 * 60); // 7 天

    return sendResponse(res, 200, "User login successfully", {
      access_token: accessToken,
      refresh_token: refreshToken,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    return sendResponse(res, 500, "Error logging in user", null);
  }
};
// 其他：（略）
```

```ts
// Files: services/userService.ts
import { generateToken } from "../utils/auth";
// 生成用户 JWT
export const generateUserToken = (user: IUser) => {
  return generateToken(user);
};
// 其他：（略）
```

```ts
// Files: utils/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { IUser } from "../models/User";
import { sendResponse } from "./response";

// JWT 密钥（应保密，生产环境使用环境变量）
const JWT_SECRET = "abc-secret-key-sz-jwt"; // 请更改为安全的密钥
const REFRESH_TOKEN_SECRET = "your-refresh-token-secret"; // 请更改为安全的密钥

// 生成 JWT（两个token）：包含用户信息，并设置过期时间
export const generateToken = (user: IUser): object => {
  const accessToken = jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "1m" }
  );

  const refreshToken = jwt.sign(
    { id: user._id }, // Refresh Token 仅存储用户 ID
    REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" } // 过期时间 7 天
  );

  return { accessToken, refreshToken };
};
// 其他：（略）
```

### 2. 修改【身份验证中间件】

> 用来验证 JWT 的正确性，如果过期则返回 401 状态码。

```ts
// Files: utils/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { IUser } from "../models/User";
import { sendResponse } from "./response";

// JWT 密钥（应保密，生产环境使用环境变量）
const JWT_SECRET = "abc-secret-key-sz-jwt"; // 请更改为安全的密钥
const REFRESH_TOKEN_SECRET = "your-refresh-token-secret"; // 请更改为安全的密钥

// 验证 JWT
export const verifyToken = (
  token: string
): { id: string; username: string; role: string } | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as { id: string; username: string; role: string };
  } catch (error) {
    console.error("JWT verification failed:", error); // 记录错误信息
    return null;
  }
};

// 身份验证中间件
// 修改 authenticateUser，确保它符合中间件的签名
export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const token = req.headers["authorization"]; // 从请求头获取 token

  if (!token) {
    return sendResponse(res, 401, "未提供授权令牌", null); // 如果没有 token，直接返回响应
  }

  // === 这里千万要注意：前端的token格式  `Bearer ${token}`，所以需要去掉Bearer
  const decoded = verifyToken(token.split("Bearer ")[1]);

  if (!decoded) {
    return sendResponse(res, 401, "无效的授权令牌", null); // 如果 token 无效，返回响应
  }

  // 将用户信息附加到请求对象上，供后续使用
  // @ts-ignore
  req.user = decoded;
  next(); // 验证成功，继续执行后续的路由处理
};
// 其他：（略）
```

::: tip 注意事项
这里当 API 接口返回 401 时，前端需要做联调处理。

1. 自动请求 `refreshToken` 接口，获取新的 token；
2. 将新的 token 存储到本地，并重新发起请求。

> 前端的具体代码，请参考第二节的代码具体实现。

:::

### 3. refreshToken API 接口的实现

> refreshToken API 接口，用于刷新用户的 JWT token。通过在请求头中携带旧的 refresh token，来获取新的 access token。这样用户就能实现自动刷新 token，而不需要重新登录。**也就是【自动续期】，无感刷新**。

```ts
// File: routes/auth.ts
import express from "express";
import { refreshUser } from "../controllers/userController";

const router = express.Router();

// 刷新 Token 接口
router.post("/refresh-token", refreshUser);

export default router;
// 其他：（略）
```

```ts
// File: controllers/userController.ts
import { Request, Response } from "express";
import * as userService from "../services/userService";
import { storeRefreshToken } from "../services/storeRefreshToken";
import { sendResponse } from "../utils/response";

// 刷新 Token 接口
export const refreshUser = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  try {
    if (!refreshToken) {
      return sendResponse(res, 400, "Refresh Token is required", null);
    }

    // 验证 Refresh Token 是否有效
    const userData = userService.verifyRefreshToken(refreshToken);
    if (!userData) {
      return sendResponse(res, 403, "Invalid or expired Refresh Token", null);
    }

    // 检查存储中是否存在该 Refresh Token
    const isStored = await userService.checkRefreshTokenInStore(
      userData.id,
      refreshToken
    );
    if (!isStored) {
      return sendResponse(
        res,
        403,
        "Refresh Token not found or invalidated",
        null
      );
    }

    // 生成新的 Access Token 和 Refresh Token
    // 注意这里：解构赋值（refreshToken: newRefreshToken）的写法
    // @ts-ignore
    const { accessToken, refreshToken: newRefreshToken } =
      userService.generateUserToken(userData);

    // === 注意：这里有两种方式，要么更新存储中的 Refresh Token，要么直接使用旧的 Refresh Token
    // 1. 更新存储中的 Refresh Token：只要在时间段内有请求，则一直有效
    // 2. 直接使用旧的 Refresh Token：过期时间与旧的 Refresh Token 一致
    // 更新存储中的 Refresh Token
    await storeRefreshToken(userData.id, newRefreshToken, 7 * 24 * 60 * 60); // 更新为 7 天

    return sendResponse(res, 200, "Token refreshed successfully", {
      access_token: accessToken,
      refresh_token: newRefreshToken,
    });
  } catch (error) {
    return sendResponse(res, 500, "Error refreshing token", null);
  }
};
// 其他：（略）
```

```ts
// Files: services/userService.ts
import User, { IUser } from "../models/User";
import RefreshToken from "../models/RefreshToken";
import { generateToken } from "../utils/auth";
import jwt from "jsonwebtoken";

const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "your-refresh-token-secret";

// 验证 Refresh Token
export function verifyRefreshToken(token: string): any {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  } catch (error) {
    console.log("🚀 ~ verifyRefreshToken ~ error:", error);
    return null; // 无效的 Token
  }
}

// 检查存储中的 Refresh Token
export async function checkRefreshTokenInStore(
  userId: string,
  token: string
): Promise<boolean> {
  // 查找 MongoDB 中是否存在该 Refresh Token
  // 注意：这里的字段名需要与存储中的字段名一致
  const storedToken = await RefreshToken.findOne({
    userId: userId,
    refreshToken: token,
  });
  if (!storedToken) {
    return false; // 如果没有找到，返回 false
  }

  // 检查 Token 是否已过期
  if (storedToken.expiresAt < new Date()) {
    return false; // 如果已过期，返回 false
  }

  return true; // Token 有效
}
// 其他：（略）
```

```ts
// Files: services/storeRefreshToken.ts
import RefreshToken from "../models/RefreshToken";

export async function storeRefreshToken(
  userId: string,
  token: string,
  ttl: number
): Promise<void> {
  // 计算过期时间
  const expiresAt = new Date(Date.now() + ttl * 1000);

  // 删除旧的 Refresh Token（可选）
  await RefreshToken.deleteMany({ userId });

  // 创建新的 Refresh Token 记录
  const newRefreshToken = new RefreshToken({
    userId,
    // 注意这个字段的名称
    refreshToken: token,
    expiresAt,
  });
  await newRefreshToken.save();
}
// 其他：（略）
```

```ts
// Files: models/RefreshToken.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IRefreshToken extends Document {
  userId: string;
  refreshToken: string;
  expiresAt: Date;
  createdAt: Date;
}

const refreshTokenSchema = new Schema<IRefreshToken>({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  refreshToken: {
    type: String,
    required: true,
    unique: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// TTL 索引，用于自动清理过期 Token
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const RefreshToken = mongoose.model<IRefreshToken>(
  "RefreshToken",
  refreshTokenSchema
);

export default RefreshToken;
```

## 二、前端（VUE3）代码实现

> 前端的主要工作就是，在用户登录成功后，将 Refresh Token 存储在本地存储中，并在每次请求时，将 access token 添加到请求头中。当请求失败时，检查错误码，如果是 401，则表示 access token 已过期，需要重新获取 access token，**这个时候调用后端的【refreshToken API 接口】，拿到新的 access token 和 Refresh Token**，并更新本地存储中的 access token 和 Refresh Token。

**实现原理：** 在 Axios 拦截器中，拦截请求，如果请求失败，并且错误码为 401，则调用后端的【refreshToken API 接口】，拿到新的 access token 和 Refresh Token，并更新本地存储中的 access token 和 Refresh Token。

```ts
// src/utils/request.ts
import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosRequestConfig,
} from "axios";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import { refreshTokenLogin } from "@/api/user";

let isRefreshing = false;
let failedQueue: Array<Function> = [];

// 创建一个 axios 实例
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "/", // 后端 API 的基础 URL（根据实际情况修改）
  timeout: 10000, // 请求超时时间
});

// 请求拦截器：在请求发送之前对请求进行处理
axiosInstance.interceptors.request.use(
  (config: any) => {
    // 使用 AxiosRequestConfig 类型
    const token = localStorage.getItem("token"); // 从 localStorage 中获取 Token
    if (token) {
      // 如果有 Token，设置到请求头 Authorization 中
      (config.headers as any)["Authorization"] = `Bearer ${token}`; // 强制转换 headers 类型
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error); // 如果请求出错，返回拒绝的 Promise
  }
);

// 响应拦截器：在收到响应后对响应进行处理
axiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => {
    // 获取响应中的 code 和 status
    const { code, status } = response.data;
    // 判断返回的 code 或 status 进行不同的处理
    if (code === 0 || code === 200 || status === "ok" || status === true) {
      // 业务逻辑成功，或者响应状态为 'ok'
      return response; // 返回响应数据
    } else {
      // 根据返回的 code 处理不同的错误情况
      switch (code) {
        case 400:
          console.error("Bad Request: Invalid input.");
          break;
        case 404:
          console.error("Not Found: The resource could not be found.");
          break;
        case 500:
          console.error("Server Error: Internal Server Error.");
          break;
        default:
          console.error("Unexpected response code: ", code);
          break;
      }
    }

    // 根据 HTTP 状态码判断
    // @ts-ignore
    if (status === 401) {
      console.log("==================== 401进来了 🚀 ~ status:", status);
    } else if (status === 500) {
      // 服务器内部错误
      console.error("Server Error: ", response.data);
    } else if (status === 404) {
      // 资源未找到
      console.error("Not Found: The requested resource does not exist.");
    }

    return Promise.reject(response); // 返回拒绝的 Promise
  },
  async (error: any) => {
    // 处理请求失败的情况
    if (error.response) {
      const status = error.response.status;

      const originalRequest = error.config;
      if (status === 401 && !originalRequest._retry) {
        // 根据 HTTP 状态码判断
        // 如果响应状态是 401 且 token 失效，触发 refresh-token
        if (isRefreshing) {
          // 如果正在刷新 token，加入队列
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axios(originalRequest);
          });
        }
        // @ts-ignore
        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // 刷新 token
          const refreshToken = localStorage.getItem("refresh_token"); // 或从 cookie 获取
          const response = await refreshTokenLogin({
            refreshToken,
          });

          const { access_token } = response.data?.data || {};
          // 保存新的 accessToken
          localStorage.setItem("token", access_token);

          // 更新所有待处理的请求
          failedQueue.forEach((prom) => prom.resolve(access_token));
          failedQueue = [];

          originalRequest.headers["Authorization"] = "Bearer " + access_token;
          // 继续发送请求
          return axios(originalRequest);
        } catch (err) {
          // 刷新 token 失败，跳转到登录页面
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("token");
          localStorage.removeItem("userInfo");
          window.location.href = "/login"; // 或其他逻辑
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      } else if (status === 500) {
        // 服务器错误
        console.error("Server Error: ", error.response.data);
      } else if (status === 404) {
        // 请求的资源未找到
        console.error("Resource Not Found: ", error.response.data);
      }
    }
    return Promise.reject(error); // 返回拒绝的 Promise
  }
);

// 导出 axios 实例： 在VUE组件中使用的时候，就可以直接使用 axiosInstance 调用 get、post、put、delete 方法了
export default axiosInstance;
// 其他：（略）
```

## 三、注意事项

### 1. 解构赋值的字段名差异

mongoDB 的存储的字段名要注意，不要写错。key 的字段名是区分大小写的，比如 `access_token` 和 `accessToken` 是不同的字段。在解构赋值的时候，要确保字段名一致。否则，会导致解构赋值失败，从而无法正确刷新 token。

### 2. 前后配置需要一致

1. 比如`Bearer ${token}`，前后配置需要一致，否则会导致 token 无法正确解析。
2. 比如 token 的加解密方式中的 key，也需要前后保持一致，否则会出现解密失败的情况。

### 3. RefreshToken 的有效期

> 注意：这里有两种方式，要么更新存储中的 Refresh Token，要么直接使用旧的 Refresh Token。

1. **更新存储中的 Refresh Token**：只要在时间段内有请求，则一直有效（也就是说设置 7 天到期的话，如果 7 天内任意时间有请求，则过期时间重新计算为新的 7 天）；
2. **直接使用旧的 Refresh Token**：过期时间与旧的 Refresh Token 一致（也就是说设置 7 天到期的话，7 天后必须重新登录）。
