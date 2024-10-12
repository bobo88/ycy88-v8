# Express + mongoDB 搭建 CMS

在构建基于 **Node.js** 的 CMS 时，使用组合 **MERN 栈**（MongoDB、Express、React、Node.js），MongoDB 用于数据存储，Express 用于提供 Web 服务，Node.js 作为后端运行环境。

在 Express 框架中，使用 **MongoDB** 一般通过一个流行的 ODM（对象文档映射器）库 **Mongoose** 来简化操作。Mongoose 提供了一个更简洁和更结构化的方式来与 MongoDB 进行交互，同时还能为你的数据定义模式（Schema）。

## 1. 搭建 Express + MongoDB 的 CMS 框架步骤

### 1.1 安装 MongoDB 和 Mongoose

首先，你需要安装 **MongoDB** 以及 **Mongoose** 库：

```bash
npm install mongoose
```

### 1.2 连接 MongoDB 数据库

在 Express 应用中，你可以通过 Mongoose 连接到 MongoDB 数据库。以下是一个简单的连接示例：

```javascript
const express = require('express')
const mongoose = require('mongoose')

const app = express()

// 连接 MongoDB 数据库
mongoose
  .connect('mongodb://localhost:27017/cms', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB 连接成功'))
  .catch((err) => console.error('MongoDB 连接失败', err))

app.listen(3000, () => {
  console.log('服务器运行在 http://localhost:3000')
})
```

在这个例子中，`mongoose.connect` 方法用于连接本地的 MongoDB 数据库，`cms` 是数据库的名称。你可以将 `mongodb://localhost:27017/cms` 替换为你在生产环境中使用的远程 MongoDB URL。

### 1.3 定义数据模型（Schema 和 Model）

Mongoose 允许你定义数据模式（Schema），这为 CMS 中的文章、用户、评论等数据提供了结构化支持。

例如，可以为 CMS 中的 **文章（Article）** 定义一个简单的模式：

```javascript
const mongoose = require('mongoose')

// 定义文章的 Schema
const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  views: { type: Number, default: 0 },
  isRecommended: { type: Boolean, default: false },
  isPaid: { type: Boolean, default: false },
  visibility: {
    type: String,
    enum: ['public', 'private', 'members-only'],
    default: 'public',
  },
  createdAt: { type: Date, default: Date.now },
})

// 创建文章 Model
const Article = mongoose.model('Article', articleSchema)

module.exports = Article
```

这段代码定义了文章的 Schema，并为每篇文章设定了多个字段（标题、内容、浏览次数、是否推荐、是否收费等）。通过这个模式，你可以方便地对文章进行增删改查操作。

### 1.4 使用 Express 路由进行 CRUD 操作

接下来，你可以在 Express 的路由中定义对 MongoDB 的增删改查（CRUD）操作。例如，定义一个获取前 100 篇热门文章的接口：

```javascript
const express = require('express')
const Article = require('./models/Article') // 引入刚才定义的 Article 模型
const app = express()

// 获取前 100 篇热门文章
app.get('/articles/top', async (req, res) => {
  try {
    const topArticles = await Article.find()
      .sort({ views: -1 }) // 按浏览次数降序排列
      .limit(100) // 限制结果为前 100 条
    res.json(topArticles)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(3000, () => {
  console.log('服务器运行在 http://localhost:3000')
})
```

在上面的代码中：

- `Article.find()` 是一个查询操作，`sort({ views: -1 })` 是按浏览次数降序排序，`limit(100)` 限制返回的文章数量为 100。
- 这个路由 `/articles/top` 返回前 100 篇热门文章的 JSON 数据。

### 1.5 Express 与 MongoDB 的常见操作

1. **创建文章（Create）**：

   ```javascript
   app.post('/articles', async (req, res) => {
     const newArticle = new Article({
       title: req.body.title,
       content: req.body.content,
       views: 0,
       isRecommended: req.body.isRecommended,
       isPaid: req.body.isPaid,
       visibility: req.body.visibility,
     })
     try {
       const savedArticle = await newArticle.save()
       res.json(savedArticle)
     } catch (err) {
       res.status(500).json({ error: err.message })
     }
   })
   ```

2. **读取文章（Read）**：

   ```javascript
   app.get('/articles/:id', async (req, res) => {
     try {
       const article = await Article.findById(req.params.id)
       if (!article) return res.status(404).json({ message: '文章未找到' })
       res.json(article)
     } catch (err) {
       res.status(500).json({ error: err.message })
     }
   })
   ```

3. **更新文章（Update）**：

   ```javascript
   app.put('/articles/:id', async (req, res) => {
     try {
       const updatedArticle = await Article.findByIdAndUpdate(
         req.params.id,
         req.body,
         { new: true }
       )
       res.json(updatedArticle)
     } catch (err) {
       res.status(500).json({ error: err.message })
     }
   })
   ```

4. **删除文章（Delete）**：
   ```javascript
   app.delete('/articles/:id', async (req, res) => {
     try {
       const deletedArticle = await Article.findByIdAndDelete(req.params.id)
       if (!deletedArticle)
         return res.status(404).json({ message: '文章未找到' })
       res.json({ message: '文章已删除' })
     } catch (err) {
       res.status(500).json({ error: err.message })
     }
   })
   ```

## 2. 使用 MongoDB 与 Express 的优势

- **灵活的数据结构**：MongoDB 是文档数据库，支持不定结构的文档存储。对于 CMS 来说，文章可能有自定义字段或动态扩展的内容，MongoDB 能很好地适应这些需求。
- **高扩展性**：MongoDB 支持水平扩展，适合处理大规模、高并发的数据访问。在需要存储大量文章、用户和评论的 CMS 系统中，MongoDB 的分片功能可以轻松应对增长需求。
- **JSON 兼容性**：MongoDB 的 BSON 格式与 JavaScript 的 JSON 格式非常接近，Express 中的数据可以直接传递给 MongoDB，减少了数据转换的复杂性。

## 3. 注意事项

1. **索引优化**：为常用的查询字段（如 `views`、`createdAt`）创建索引，以提升查询性能，尤其是在查询大量文章时。
2. **事务支持**：尽管 MongoDB 从 4.0 版本开始支持多文档事务，但其事务机制不如 MySQL 完善。如果你的 CMS 需要严格的事务性操作，可以考虑结合其他工具或框架来实现。

3. **安全性**：确保你的 MongoDB 连接是安全的，特别是在生产环境中，启用认证、SSL 和适当的访问控制，以防止未授权访问。

## 总结

MongoDB 与 Express 是构建 CMS 系统的一个强大组合。MongoDB 提供了灵活的存储和高性能查询支持，适合处理不定结构的内容数据。Express 作为轻量级的 Web 框架，可以轻松地与 MongoDB 集成，帮助你快速搭建高效的 CMS 应用。
