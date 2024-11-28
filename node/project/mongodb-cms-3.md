# 如何实现【用户登录注册】的双重加密？

## 1. 项目开发

### 1.1 如何实现【用户登录注册】的双重加密？

::: tip 整体逻辑

- 用户注册：后端将密码加密处理为 hash 值，存储到数据库中。
- 用户登录：
  - 1）用户密码不能明文传送，需要加密处理；
  - 2）后端获取数据需要进行 2 步解密比对操作：
    - A、将非明文密码解密处理（密钥 KEY 与前端加密时的 KEY 保持一致）；
    - B、将解密后的密码与数据库（mongoDB）中的 hash 密码进行比对，一致则登录 OK。

:::

#### 1.1.1. 前端加密

```ts
// === src/utils/cryptoUtils.ts
import CryptoJS from "crypto-js";

// 定义加密和解密所需的密钥和初始化向量
const SECRET_KEY = "你自己的秘钥"; // 16 字节密钥
const IV = "你自己的秘钥"; // 16 字节初始化向量

// 加密函数，返回加密后的密码字符串
export const encryptPassword = (password: string): string => {
  const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);
  const iv = CryptoJS.enc.Utf8.parse(IV);

  const encrypted = CryptoJS.AES.encrypt(password, key, { iv: iv });
  return encrypted.toString(); // 返回加密后的密码
};

// 解密函数，返回解密后的密码字符串
export const decryptPassword = (encryptedPassword: string): string => {
  const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);
  const iv = CryptoJS.enc.Utf8.parse(IV);

  const decrypted = CryptoJS.AES.decrypt(encryptedPassword, key, { iv: iv });
  return decrypted.toString(CryptoJS.enc.Utf8); // 返回解密后的密码
};
```

```ts
// === src/api/user.ts
// 导入加密工具
import { encryptPassword } from "@/utils/cryptoUtils";
// 登录接口
// 备注：这里对应的是【用户登录：- 1）用户密码不能明文传送，需要加密处理；】
export async function login(data: any) {
  if (loginRSA) {
    data = await encryptedData(data);
  }
  const { username, password, verificationCode } = data;
  // 使用默认值，如果 password 为 undefined，则使用一个默认字符串
  const encryptedPassword = encryptPassword(password || "123456");

  data = {
    email: username.trim(),
    password: encryptedPassword,
    code: verificationCode.trim(),
  };
  const res = request({
    url: "/auth/login",
    method: "post",
    data,
  });
  return res;
}
// ...其他逻辑（略）
```

#### 1.1.2 后端逻辑

> 技术栈是：Express + MongoDB + Mongoose + JWT。

::: tip 整体逻辑

- 1）用户登录时，前端将用户名和密码（通过`crypto-js`加密后）发送给后端。
- 2）后端接收到密码后，使用`crypto-js`解密密码，并与数据库中的密码进行比对。
  - 第一步：解密用户传递过来的密码
    - `const decryptedPassword = decryptPassword(inputPassword);`
  - 第二步：哈希算法比对密码
    - `return comparePassword(decryptedPassword, storedPassword);`
- 3）如果密码匹配，则生成 `JWT` 令牌并返回给前端。
- 4）前端接收到 `JWT` 令牌后，将其存储在本地（如 `localStorage`），并在后续请求中将其添加到请求头中。
  - 设置在封装好的 axios 请求拦截器里面：
    ```js
    // 规范写法 不可随意自定义
    if (token) config.headers["Authorization"] = `${token}`;
    ```

:::

> 参考：[知识清单 - 安全性](/backend/base/1_safety)。

下面是详细的配置步骤：

> 1）第一层加密工具

```ts
// === src/utils/crypto.ts
import CryptoJS from "crypto-js";

// 假设使用 AES 加密时的密钥（应从安全存储获取，而非硬编码）
// 注意：这是第一层加密
// 定义加密和解密所需的密钥和初始化向量
const SECRET_KEY = "你自己的秘钥"; // 16 字节密钥
const IV = "你自己的秘钥"; // 16 字节初始化向量

// 加密函数，返回加密后的密码字符串
export const encryptPassword = (password: string): string => {
  const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);
  const iv = CryptoJS.enc.Utf8.parse(IV);

  const encrypted = CryptoJS.AES.encrypt(password, key, { iv: iv });
  return encrypted.toString(); // 返回加密后的密码
};

// 解密函数，返回解密后的密码字符串
export const decryptPassword = (encryptedPassword: string): string => {
  const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);
  const iv = CryptoJS.enc.Utf8.parse(IV);

  const decrypted = CryptoJS.AES.decrypt(encryptedPassword, key, { iv: iv });
  return decrypted.toString(CryptoJS.enc.Utf8); // 返回解密后的密码
};
```

> 2）第二层加密工具

```ts
// === src/utils/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { IUser } from "../models/User";
import { sendResponse } from "./response";

// JWT 密钥（应保密，生产环境使用环境变量）
// TODO: 使用环境变量
// 注意：这是第二层加密
const JWT_SECRET = "这里同样设置为你的秘钥"; // 请更改为安全的密钥

// 生成 JWT
export const generateToken = (user: IUser): string => {
  return jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// 比较密码（用于登录时验证密码）
export const comparePassword = (
  password: string,
  hashedPassword: string
): boolean => {
  return bcrypt.compareSync(password, hashedPassword);
};

// 哈希密码（用于用户注册时存储密码）
export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10);
};

// 验证 JWT
export const verifyToken = (
  token: string
): { id: string; username: string; role: string } | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as { id: string; username: string; role: string };
  } catch (error) {
    return null;
  }
};

// 身份验证中间件
// 修改 authenticateUser，确保它符合中间件的签名
export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers["authorization"]; // 从请求头获取 token

  if (!token) {
    sendResponse(res, 401, "未提供授权令牌", null); // 如果没有 token，直接返回响应
    return; // 结束函数执行
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    sendResponse(res, 401, "无效的授权令牌", null); // 如果 token 无效，返回响应
    return; // 结束函数执行
  }

  // 将用户信息附加到请求对象上，供后续使用
  // @ts-ignore
  req.user = decoded;

  next(); // 验证成功，继续执行后续的路由处理
};
```

> 3）API 路由

```ts
// === src/routes/auth.ts
import express from "express";
import { registerUser, loginUser } from "../controllers/userController";

const router = express.Router();

// 用户注册
router.post("/register", registerUser);

// 用户登录
router.post("/login", loginUser);

export default router;
```

> 4）Controller

```ts
// === src/controllers/userController.ts
import { Request, Response } from "express";
import * as userService from "../services/userService";
import { sendResponse } from "../utils/response";

// 用户注册
export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;

  try {
    // 检查用户是否已存在
    const userExists = await userService.checkIfUserExists(email);
    if (userExists) {
      return sendResponse(res, 400, "User already exists", null);
    }

    // 创建用户
    const newUser = await userService.createUser(
      username,
      email,
      password,
      role
    );

    // 生成 JWT
    const token = userService.generateUserToken(newUser);

    return sendResponse(res, 201, "User registered successfully", { token });
  } catch (error) {
    return sendResponse(res, 500, "Error registering user", null);
  }
};

// 用户登录
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // 查找用户
    const user = await userService.checkIfUserExists(email);
    if (!user || !userService.validatePassword(password, user.password)) {
      return sendResponse(res, 401, "用户名或密码不正确", null);
    }

    // 生成 JWT
    const token = userService.generateUserToken(user);

    return sendResponse(res, 200, "User login successfully", {
      token,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    return sendResponse(res, 500, "Error logging in user", null);
  }
};
```

> 5）Service

```ts
// === src/services/userService.ts
import User, { IUser } from "../models/User";
import { generateToken, hashPassword, comparePassword } from "../utils/auth";
import { decryptPassword } from "../utils/crypto";

// 检查用户是否存在
export const checkIfUserExists = async (email: string) => {
  return await User.findOne({ email });
};

// 创建新用户
export const createUser = async (
  username: string,
  email: string,
  password: string,
  role: string
) => {
  // 使用哈希密码
  const hashedPassword = hashPassword(password);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    role: role || "subscriber",
  });
  return await newUser.save();
};

// 检查密码是否正确
export const validatePassword = (
  inputPassword: string,
  storedPassword: string
) => {
  // 第一步：解密用户传递过来的密码
  const decryptedPassword = decryptPassword(inputPassword);
  // 第二步：哈希算法比对密码
  return comparePassword(decryptedPassword, storedPassword);
};

// 生成用户 JWT
export const generateUserToken = (user: IUser) => {
  return generateToken(user);
};
```

## 2. 项目部署

### 2.1. 部署到服务器

> 在 ubuntu 上面部署，需要安装 node.js 和 mongodb。

#### 2.1.1. 安装 Node.js

#### 2.1.2. 安装 MongoDB

#### 2.1.3. 安装 pm2

## 3. 注意事项

### 3.1 域名或端口冲突

> 你把 Express 项目部署到 192.168.1.1 这台服务器上面，那么你的 **测试 mongoDB** 就必须放在 192.168.1.1 这台服务器上，否则会出现端口冲突。
