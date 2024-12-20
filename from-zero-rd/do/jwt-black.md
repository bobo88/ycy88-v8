# JWT 黑名单机制和实现

在一个账户多端登录的场景下，如果修改密码需要让所有已登录设备的 Token 同时失效，可以通过 **黑名单机制** 来实现。

如果你使用的是 MongoDB，可以将多端登录的 Token 信息存储在 MongoDB 中，这样便于管理和查询。

## **1. 数据模型设计**

为管理多端登录的 Token 信息，可以设计一个 `UserToken` 集合，用来存储用户的所有 Token 信息。

### 数据结构示例：

```json
{
  "_id": "64b123abc...", // MongoDB 自生成的唯一 ID
  "userId": "1234567890", // 用户 ID
  "jti": "uuid1", // Token 的唯一标识
  "deviceId": "deviceA", // 设备 ID（前端提供）
  "issuedAt": "2024-12-20T10:00:00Z", // Token 签发时间
  "expiresAt": "2024-12-20T11:00:00Z", // Token 过期时间
  "isInvalidated": false // 是否失效
}
```

## **2. 生成 Token 并存储**

在生成 `accessToken` 和 `refreshToken` 后，将其唯一标识（`jti`）和相关信息存储到 MongoDB。

### 示例代码：

```typescript
import { v4 as uuidv4 } from "uuid";
import UserToken from "./models/UserToken"; // 假设你有一个 Mongoose 模型

// 生成 JWT
export const generateToken = async (
  user: IUser,
  deviceId: string
): Promise<object> => {
  const jti = uuidv4(); // 生成唯一标识
  const issuedAt = new Date();
  const expiresAt = new Date(issuedAt.getTime() + 60 * 1000); // 1 分钟有效期

  const accessToken = jwt.sign(
    { id: user._id, username: user.username, role: user.role, jti, deviceId },
    JWT_SECRET,
    { expiresIn: "1m" }
  );

  const refreshToken = jwt.sign(
    { id: user._id, jti, deviceId },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  // 存储 Token 信息到 MongoDB
  await UserToken.create({
    userId: user._id,
    jti,
    deviceId,
    issuedAt,
    expiresAt,
    isInvalidated: false,
  });

  return { accessToken, refreshToken, jti };
};
```

## **3. 修改密码使所有 Token 失效**

当用户修改密码时，需要将该用户的所有 Token 标记为失效。

### 示例代码：

```typescript
const invalidateAllTokens = async (userId: string) => {
  await UserToken.updateMany({ userId }, { $set: { isInvalidated: true } });
};
```

## **4. 手动注销某个设备**

用户可以选择注销某个设备的登录状态。需要根据 `deviceId` 定位 Token 并将其标记为失效。

### 示例代码：

```typescript
const logoutDevice = async (userId: string, deviceId: string) => {
  await UserToken.updateMany(
    { userId, deviceId },
    { $set: { isInvalidated: true } }
  );
};
```

## **5. 校验 Token 的有效性**

每次验证 Token 时，除了检查其签名和有效期外，还需要查询 MongoDB，确认该 Token 是否已被标记为失效。

### 示例代码：

```typescript
const verifyToken = async (token: string): Promise<boolean> => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    // 查询 MongoDB 中的 Token 信息
    const tokenInfo = await UserToken.findOne({ jti: decoded.jti });

    // 如果 Token 不存在或已失效，则拒绝访问
    if (!tokenInfo || tokenInfo.isInvalidated) {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
};
```

## **6. 定时清理过期的 Token**

为了减少数据库的存储压力，可以定期清理已过期的 Token。

### 示例代码：

```typescript
const cleanExpiredTokens = async () => {
  const now = new Date();
  await UserToken.deleteMany({ expiresAt: { $lt: now } });
};

// 示例：使用 Node.js 定时器每小时清理一次
setInterval(cleanExpiredTokens, 3600 * 1000);
```

## **总结**

通过 MongoDB 实现多端登录管理的方案包括：

1. **为每个 Token 引入唯一标识（JTI）和设备标识（deviceId）**。
2. **在 MongoDB 中存储 Token 信息**，包括用户 ID、签发时间、过期时间等。
3. **提供批量失效和单端注销功能**，通过修改 `isInvalidated` 字段实现。
4. **校验 Token 的有效性时查询数据库**，确认 Token 状态。
5. **定期清理过期的 Token**，以优化存储资源。

这种方式能很好地支持多端登录，并方便地管理 Token 的生命周期和状态。
