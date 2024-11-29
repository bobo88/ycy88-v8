# 1. 处理客户端请求

- **请求协议与方法**：
  - HTTP 协议：请求方法（GET、POST、PUT、DELETE）、请求头、响应头、状态码。
  - HTTPS：TLS/SSL 加密，确保数据传输的安全性。
  - 非 HTTP 协议：WebSocket、gRPC、GraphQL 等，用于特殊需求下的通信。
- **请求路由与解析**：
  - 路由机制：RESTful 设计、路径参数、查询参数的处理。
  - 请求体解析：JSON、XML、表单数据、文件上传（MIME、Multipart）。
  - 请求头解析：处理用户代理、语言、认证信息、跨域头（CORS）。
- **请求验证与过滤**：
  - 输入验证：必填项、格式校验、类型校验。
  - 防护机制：防止 SQL 注入、XSS、CSRF 攻击等。
  - 身份验证：Session、JWT、OAuth、API 密钥等。
- **速率限制与缓存**：
  - 速率限制：防止 DDoS 攻击与过度请求。
  - 请求缓存：客户端缓存、CDN 缓存、反向代理缓存（如 Nginx）。
