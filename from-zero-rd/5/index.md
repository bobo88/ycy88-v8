# 5. 安全性

- **认证与授权**：
  - 身份验证：基于 Token（JWT、OAuth2）、Session 管理、API 密钥。
  - 角色与权限控制：基于角色的访问控制（RBAC）、基于资源的权限控制（ABAC）。
- **数据加密与安全通信**：
  - 加密协议：TLS/SSL（HTTPS）、数据传输加密。
  - 敏感数据存储：加密存储、哈希存储（密码保护）。
- **防止常见漏洞**：
  - SQL 注入、XSS、CSRF 等攻击防护。
  - API 安全：API 密钥管理、速率限制、身份验证。
- **日志与审计**：
  - 安全日志记录：敏感操作日志、审计跟踪。
  - 防篡改与防伪：确保日志的完整性与真实性。