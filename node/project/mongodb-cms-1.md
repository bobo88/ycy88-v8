# MongoDB CMS Database

> 我要实现的目标是：**_每篇文章应包含其自身的评论和关联的用户信息，同时，系统需要确保不同的用户仅能访问自己有权限查看的特定文章。_**

## 数据库设计思路

1. **文章表** (`articles`): 文章的基本信息，包括内容、作者、分类、标签、评论等。
2. **评论表** (`comments`): 存储文章的评论，每个评论包含评论内容、作者、时间等。
3. **用户表** (`users`): 存储用户信息，并包括角色和权限控制信息。
4. **权限表** (`permissions`): 为每个用户配置可以访问的文章（通过引用文章 ID）。

::: warning 注意
使用 MongoDB Compass 插入数据时，不需要 `ObjectId` 和 `ISODate` 等字段，MongoDB 会自动生成。

```json
// 比如：插入一条评论数据 (comments)
{
  "_id": "603d2e0f9e3f1b3a4a1f1c7a",
  "article_id": "603d2e0f9e3f1b3a4a1f1c6a",
  "user_id": "603d2e0f9e3f1b3a4a1f1c5a",
  "content": "这篇文章写得很好！",
  "created_at": "2024-01-01T12:00:00Z",
  "status": "approved"
}
```

:::

## 1. 文章表（`articles`）

每篇文章除了包含基本的信息外，还需要嵌套评论字段，并且需要存储与用户关联的访问控制信息。

### `articles` 集合设计

```json
{
  "_id": ObjectId("603d2e0f9e3f1b3a4a1f1c6a"),  // MongoDB 自动生成的 ObjectId
  "title": "如何搭建一个内容管理系统",  // 文章标题
  "slug": "how-to-build-a-cms",  // 文章的 URL 路径（slug）
  "content": "这里是文章的内容...",  // 文章的 HTML 或 Markdown 内容
  "excerpt": "这篇文章介绍了如何搭建一个内容管理系统",  // 文章摘要
  "author": ObjectId("603d2e0f9e3f1b3a4a1f1c1a"),  // 作者的 User ID，引用 users 集合
  "category": ObjectId("603d2e0f9e3f1b3a4a1f1c2a"),  // 文章分类的 ID，引用 categories 集合
  "tags": [
    ObjectId("603d2e0f9e3f1b3a4a1f1c3a"),  // 标签的 ID，引用 tags 集合
    ObjectId("603d2e0f9e3f1b3a4a1f1c4a")
  ],  // 文章的多个标签，引用 tags 集合
  "status": "published",  // 文章状态（draft, published, archived）
  "published_at": ISODate("2024-01-01T12:00:00Z"),  // 发布时间
  "created_at": ISODate("2024-01-01T12:00:00Z"),  // 创建时间
  "updated_at": ISODate("2024-01-01T12:00:00Z"),  // 更新时间
  "comments": [  // 嵌套评论数据
    {
      "user_id": ObjectId("603d2e0f9e3f1b3a4a1f1c5a"),  // 评论用户的 ID，引用 users 集合
      "content": "这篇文章写得很详细，受益匪浅！",  // 评论内容
      "created_at": ISODate("2024-01-01T12:00:00Z")  // 评论时间
    },
    {
      "user_id": ObjectId("603d2e0f9e3f1b3a4a1f1c6a"),  // 另一个评论用户的 ID
      "content": "这篇文章内容太基础了，希望能有更深入的分析",  // 另一条评论
      "created_at": ISODate("2024-01-02T12:00:00Z")
    }
  ],
  "allowed_users": [  // 允许访问此文章的用户列表
    ObjectId("603d2e0f9e3f1b3a4a1f1c1a"),  // 只允许特定用户访问
    ObjectId("603d2e0f9e3f1b3a4a1f1c5a")
  ]
}
```

- **`comments`**: 文章的评论数据被嵌套在文章文档内，方便一次性读取文章及其评论。
- **`allowed_users`**: 这是一个数组，包含了可以访问此文章的用户 ID。只有这些用户可以看到这篇文章。

## 2. 评论表（`comments`）

评论表不再直接存储所有评论内容，而是只需要存储独立的评论数据。每个评论都与文章和用户关联。

### `comments` 集合设计

```json
{
  "_id": ObjectId("603d2e0f9e3f1b3a4a1f1c7a"),  // 评论 ID
  "article_id": ObjectId("603d2e0f9e3f1b3a4a1f1c6a"),  // 被评论的文章 ID，引用 articles 集合
  "user_id": ObjectId("603d2e0f9e3f1b3a4a1f1c5a"),  // 评论的用户 ID，引用 users 集合
  "content": "这篇文章写得很好！",  // 评论内容
  "created_at": ISODate("2024-01-01T12:00:00Z"),  // 评论时间
  "status": "approved"  // 评论状态（pending, approved, rejected）
}
```

- **`article_id`**: 关联文章 ID，评论属于某篇文章。
- **`user_id`**: 关联评论者的用户 ID。
- **`status`**: 评论的状态，用于管理评论审核。

## 3. 用户表（`users`）

用户表存储用户的信息，并且为每个用户添加角色和访问权限。每个用户的权限控制会影响他们是否能访问某些文章。

### `users` 集合设计

```json
{
  "_id": ObjectId("603d2e0f9e3f1b3a4a1f1c1a"),  // 用户 ID
  "username": "admin",  // 用户名
  "email": "admin@example.com",  // 用户邮箱
  "password": "hashed_password",  // 用户密码，存储加密后的密码
  "role": "admin",  // 用户角色（admin, editor, subscriber）
  "created_at": ISODate("2024-01-01T12:00:00Z"),  // 用户创建时间
  "updated_at": ISODate("2024-01-01T12:00:00Z"),  // 用户更新时间
  "allowed_articles": [  // 用户可以访问的文章 ID 列表
    ObjectId("603d2e0f9e3f1b3a4a1f1c6a"),
    ObjectId("603d2e0f9e3f1b3a4a1f1c7b")
  ]
}
```

- **`allowed_articles`**: 用户可以访问的文章 ID 列表。这个字段与文章表中的 `allowed_users` 字段相对应，确保只有授权的用户可以查看特定文章。

## 4. 权限表（`permissions`）

可以为每个用户或角色配置可以访问的文章。这个表的设计有助于将权限集中管理。

### `permissions` 集合设计

```json
{
  "_id": ObjectId("603d2e0f9e3f1b3a4a1f1c8a"),  // 权限 ID
  "user_id": ObjectId("603d2e0f9e3f1b3a4a1f1c1a"),  // 用户 ID，引用 users 集合
  "article_id": ObjectId("603d2e0f9e3f1b3a4a1f1c6a"),  // 文章 ID，引用 articles 集合
  "permission_type": "view",  // 权限类型（view, edit, delete）
  "created_at": ISODate("2024-01-01T12:00:00Z")  // 权限分配时间
}
```

- **`permission_type`**: 权限类型，表明该用户对该文章的权限，如 "view"（查看），"edit"（编辑），"delete"（删除）等。

## 总结

1. **文章表** (`articles`) 中嵌入了评论 (`comments`) 和允许访问的用户列表 (`allowed_users`)，确保了每篇文章能存储自己的评论信息，并且有权限控制。
2. **评论表** (`comments`) 不再嵌套在文章中，而是独立存储，包含文章 ID 和用户 ID，以支持更复杂的查询。
3. **用户表** (`users`) 通过 `allowed_articles` 字段来控制每个用户能访问哪些文章。
4. **权限表** (`permissions`) 为每个用户和文章设置具体的访问权限。

![An image](/images/node/mongodb/create-database.jpg)

这种设计方式能够让每个用户只访问特定的文章，并且在文章内嵌套其评论，使得文章管理和评论管理更加高效和灵活。
