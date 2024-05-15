# 简述 RESTful API

![An image](/images/java/restful.png)

<!-- ![An image](/images/java/restful-2.webp) -->
<!-- ![An image](/images/java/restful-3.jpeg) -->

::: tip RESTful API
`RESTful API`全称 Resource Representational State Transfer，即资源在网络中以某种形式进行状态转移。

它是一种网络应用程序基于 HTTP 的设计风格。
:::

## 一、相关概念

**REST API** 也称为 RESTful API，是遵循 REST 架构规范的应用编程接口（API 或 Web API），支持与 RESTful Web 服务进行交互。REST 是表述性状态传递的英文缩写，由计算机科学家 Roy Fielding 创建。

<!-- - **定义：** RESTful API 是一种基于 REST 原则的应用程序编程接口。它强调资源的状态以及通过 HTTP 方法的操作。
- **架构风格：** RESTful API 遵循 REST 架构风格的原则，包括资源标识、状态的无状态性、资源的自描述性和使用标准 HTTP 方法等。
- **通信方式：** RESTful API 通常使用 HTTP 协议进行通信，通过 HTTP 请求方法（如 GET、POST、PUT、DELETE）来执行对资源的操作。
- **资源：** RESTful API 将应用程序的数据和功能封装为资源，每个资源具有唯一的 URI（Uniform Resource Identifier）标识。
- **状态：** RESTful API 强调资源的状态和状态转换，客户端通过 HTTP 方法来实现资源的操作和状态更改。
- **主要应用场景：** Web 服务、移动应用程序、浏览器应用程序、资源管理应用、社交媒体、电子商务。 -->

::: tip REST 原则

- **客户端-服务器架构（Client-Server Architecture）**：客户端和服务器之间的职责要分离。
- **无状态（Statelessness）**：
- **可缓存性（Cacheability）**：
- **统一接口（Uniform Interface）**：
  - 资源标识（Resource Identification）：每个资源通过 URI 唯一标识。
  - 资源操作（Resource Manipulation Through Representations）：客户端使用资源的表示（如 JSON、XML）来操作资源。
  - 自描述消息（Self-descriptive Messages）：每个消息（请求或响应）包含足够的信息来描述如何处理消息。
  - 超媒体作为应用状态的引擎（HATEOAS, Hypermedia As The Engine Of Application State）：客户端通过超媒体（如链接）来发现和导航资源。

:::

::: tip REST 实现的核心概念

- **资源（Resources）**：资源是网络上的一个实体或对象，通常通过 URI（统一资源标识符）标识。资源的状态可以通过表示来传输。
- **表示（Representation）**：表示是资源的具体信息内容，可以是 JSON、XML、HTML 等。客户端和服务器通过交换资源的表示来进行通信。
- **HTTP 方法（HTTP Methods）**：RESTful 服务通常使用 HTTP 协议的标准方法来操作资源。
  - `GET`：检索资源。
  - `POST`：创建资源。
  - `PUT`：更新资源。
  - `DELETE`：删除资源。
  - `PATCH`：部分更新资源。

:::

![An image](/images/java/restful-2.png)

## 二、REST 示例

假设有一个简单的 RESTful API 用于管理用户资源，基于 HTTP 方法的操作示例如下：

- `GET /users`：检索所有用户。
- `GET /users/{id}`：检索特定 ID 的用户。
- `POST /users`：创建新用户。
- `PUT /users/{id}`：更新特定 ID 的用户。
- `DELETE /users/{id}`：删除特定 ID 的用户。

| 请求方式 | URL                                   | 动作         |
| -------- | ------------------------------------- | ------------ |
| GET      | http://[hostname]/api/users           | 检索用户列表 |
| GET      | http://[hostname]/api/users/[user_id] | 检索单个用户 |
| POST     | http://[hostname]/api/users           | 创建新用户   |
| PUT      | http://[hostname]/api/users/[user_id] | 更新用户信息 |
| DELETE   | http://[hostname]/api/users/[user_id] | 删除用户     |

::: tip RESTful API 接口规范
RESTful API 接口规范体现在这几个方面：1、版本号；2、资源路径；3、请求方式；4、查询参数；5、响应参数；6、状态码。其中，命名版本号可以解决版本不兼容问题，在设计 RESTful API 的一种实用的做法是使用版本号。
:::

![An image](/images/java/restful.webp)

---

- [REST API 设计规范：最佳实践和示例](https://apifox.com/apiskills/rest-api-design-specification/)
- [【Restful】你还不懂 Restful API 规范吗？](https://cloud.tencent.com/developer/article/1861049)
- [一切尽在不言中 RESTful API 设计指南](http://it.hzqiuxm.com/%E4%B8%80%E5%88%87%E5%B0%BD%E5%9C%A8%E4%B8%8D%E8%A8%80%E4%B8%AD/)
