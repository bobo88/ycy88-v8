# MongoDB 的安全性配置

确保 MongoDB 连接的 **安全性** 在生产环境中至关重要，尤其是在处理敏感数据时。MongoDB 默认的安装没有启用很多安全功能，因此为了防止未授权访问，必须采取一系列安全措施。以下是确保 MongoDB 连接安全性的常见做法：

### 1. 启用 **身份验证（Authentication）**

在默认情况下，MongoDB 可能没有启用用户身份验证，任何人都可以直接访问数据库。这在生产环境中是不安全的。

#### 1.1 创建管理员用户

首先，在 MongoDB 启用身份验证之前，创建一个具有管理权限的用户。你可以使用 `mongo` shell 连接到 MongoDB 实例，创建一个管理员用户。

```bash
use admin
db.createUser({
  user: "admin",
  pwd: "securePassword",
  roles: [ { role: "root", db: "admin" } ]
})
```

#### 1.2 启用身份验证

在 `mongod.conf` 文件中启用身份验证，修改或添加以下配置：

```yaml
security:
  authorization: 'enabled'
```

重启 MongoDB 服务：

```bash
sudo systemctl restart mongod
```

启用身份验证后，所有访问 MongoDB 的连接都需要提供正确的用户名和密码。

#### 1.3 配置数据库用户

针对不同的数据库，创建相应的用户，并赋予其最小权限。例如，针对特定应用程序的数据库用户，你可以创建具有读写权限的用户：

```bash
use myAppDB
db.createUser({
  user: "appUser",
  pwd: "appPassword",
  roles: [ { role: "readWrite", db: "myAppDB" } ]
})
```

### 2. 使用 **TLS/SSL 加密连接**

为确保数据在网络传输过程中不被窃听，MongoDB 支持使用 **TLS/SSL** 来加密客户端与服务器之间的通信。

#### 2.1 生成 SSL 证书

首先，生成自签名证书或使用证书颁发机构（CA）生成的证书。以下是使用 `openssl` 生成自签名证书的示例：

```bash
openssl req -newkey rsa:4096 -nodes -keyout mongodb.key -x509 -days 365 -out mongodb.crt
cat mongodb.key mongodb.crt > mongodb.pem
```

将 `.pem` 文件放置在 MongoDB 服务器的安全位置。

#### 2.2 配置 MongoDB 使用 TLS/SSL

编辑 `mongod.conf` 文件，添加 TLS/SSL 支持：

```yaml
net:
  ssl:
    mode: requireSSL
    PEMKeyFile: /path/to/mongodb.pem
    CAFile: /path/to/ca.pem
```

- `requireSSL` 表示 MongoDB 服务器只接受经过加密的连接。
- `PEMKeyFile` 是包含私钥和证书的 `.pem` 文件。
- `CAFile` 是证书颁发机构的根证书，用于验证客户端证书（可选）。

重启 MongoDB 服务后，MongoDB 将强制使用加密连接。

#### 2.3 客户端配置 SSL

在连接 MongoDB 时，客户端也需要启用 TLS/SSL 连接。使用 `mongo` shell：

```bash
mongo --ssl --sslCAFile /path/to/ca.pem --sslPEMKeyFile /path/to/client.pem --host mongodb.example.com --port 27017 --username admin --password
```

### 3. 使用 **防火墙（Firewall）** 限制访问

为了防止外部未授权的连接，MongoDB 的端口应受到防火墙的保护。

#### 3.1 仅允许特定 IP 访问

使用 `iptables` 或 `ufw` 配置防火墙，限制 MongoDB 的连接来源。

- 如果你使用 `ufw`，可以使用如下命令允许特定 IP 地址访问：

```bash
sudo ufw allow from 192.168.1.100 to any port 27017
```

- 如果使用 `iptables`，可以这样配置：

```bash
sudo iptables -A INPUT -p tcp -s 192.168.1.100 --dport 27017 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 27017 -j DROP
```

这种方式可以确保只有受信任的 IP 地址才能访问 MongoDB。

### 4. 设置 **访问控制列表（Access Control List，ACL）**

MongoDB 提供基于角色的访问控制（RBAC），允许为不同用户分配最小的权限。可以使用 MongoDB 提供的内置角色，或自定义角色，控制用户只能执行特定的操作。

#### 4.1 内置角色示例

- **read**：只能读取数据。
- **readWrite**：可以读写数据。
- **dbAdmin**：可以进行数据库管理操作。
- **root**：最高权限，几乎可以做任何事情。

你可以根据实际情况为用户分配最小必要的权限：

```bash
use myAppDB
db.createUser({
  user: "reportUser",
  pwd: "password123",
  roles: [ { role: "read", db: "myAppDB" } ]
})
```

#### 4.2 自定义角色

你还可以根据业务需求自定义角色，例如只允许用户在特定集合上执行查询操作：

```bash
db.createRole({
  role: "customReadRole",
  privileges: [
    { resource: { db: "myAppDB", collection: "articles" }, actions: [ "find" ] }
  ],
  roles: []
});
```

### 5. 使用 **防止 MongoDB 注入攻击**

MongoDB 也可能受到类似 SQL 注入攻击的威胁，尤其是在应用程序直接处理用户输入时。

#### 5.1 使用预定义查询

避免动态构建查询语句，使用预定义的查询结构。例如，使用 `$eq` 运算符，而不是直接拼接用户输入：

```javascript
db.collection.find({ username: { $eq: userInput } })
```

#### 5.2 数据验证

确保对用户输入的数据进行有效的验证和过滤，避免恶意代码注入到数据库查询中。你可以使用 Mongoose 等 ODM 库，它们内置了对数据类型的严格验证功能。

### 6. 日志审计和监控

启用 **日志审计** 和 **监控** 来检测和响应潜在的安全问题。

#### 6.1 启用审计日志

MongoDB Enterprise 提供了 **审计日志** 功能，可以记录谁访问了数据库，执行了哪些操作，方便审计和排查安全问题。

```yaml
auditLog:
  destination: file
  format: BSON
  path: /var/log/mongodb/auditLog.bson
```

#### 6.2 使用 MongoDB Ops Manager 或者 Cloud Manager

这些工具提供了强大的监控功能，可以帮助你实时了解 MongoDB 的运行状态，包括连接数、查询性能、内存使用情况等。这些工具还可以配置安全告警，当出现异常连接或攻击行为时及时通知你。

### 7. 禁用 **无验证绑定（Bind to all IPs）**

默认情况下，MongoDB 可能绑定到所有网络接口，这使得它对外网开放，增加了攻击面。

#### 7.1 配置特定 IP 绑定

修改 `mongod.conf` 文件中的 `bindIp` 配置项，将 MongoDB 绑定到特定的内部 IP 地址：

```yaml
net:
  bindIp: 127.0.0.1
```

这样，MongoDB 只接受来自本地的连接，外部 IP 无法直接访问。

### 8. 使用 **备份和恢复机制**

确保启用了可靠的备份机制，以防止数据丢失。MongoDB 支持多种备份方式，如定期备份和 oplog 备份，建议定期测试备份恢复方案，确保数据在发生意外时可以快速恢复。

### 总结

要确保 MongoDB 在生产环境中的安全性，必须从多个角度进行防护，包括启用认证和授权、加密通信、限制访问来源、设置访问控制、预防注入攻击等。采取这些措施后，你的 MongoDB 实例将更具安全性，能够更好地抵御外部攻击和未授权访问。

通过身份验证、TLS/SSL 加密、防火墙、RBAC、监控与审计等多层次的防护措施，可以有效保障 MongoDB 数据库的安全性。
