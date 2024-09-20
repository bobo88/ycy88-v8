# 给 theme 配置环境变量

使用 `.env` 文件也是一种常见的方式来管理环境变量，尤其是在项目开发中，它能使配置更加清晰和便于维护。Shopify 项目中，也可以使用 `.env` 文件来设置和管理环境变量。

### 1. 创建 `.env` 文件

首先，在项目的根目录下创建一个 `.env` 文件。如果文件已经存在，可以直接编辑它。

使用以下命令创建或打开 `.env` 文件：

```bash
nano .env
```

### 2. 添加 Shopify 环境变量

在 `.env` 文件中，添加你需要的环境变量，例如 Shopify 商店 URL：

```bash
SHOPIFY_FLAG_STORE=my-shop.myshopify.com
```

确保你将 `my-shop.myshopify.com` 替换为你自己的 Shopify 商店 URL。

### 3. 加载 `.env` 文件中的环境变量

通常，项目会使用 `dotenv` 这样的库来自动加载 `.env` 文件中的环境变量。如果你正在开发一个 Node.js 应用，确保你安装并使用了 `dotenv` 库：

#### 安装 `dotenv` 库（如果尚未安装）

在项目的根目录下运行：

```bash
npm install dotenv
```

#### 在项目中加载 `.env` 文件

在项目的入口文件（如 `index.js` 或 `app.js`）中，添加以下代码来加载 `.env` 文件：

```javascript
require('dotenv').config()
```

这样，当你运行项目时，`.env` 文件中的环境变量会自动加载到 `process.env` 对象中，且可以在代码中使用。

### 4. 使用环境变量

在代码中，访问这些环境变量：

```javascript
const shopifyStoreUrl = process.env.SHOPIFY_FLAG_STORE
console.log(`Your Shopify store is: ${shopifyStoreUrl}`)
```

### 5. 验证

你可以通过以下命令验证 `.env` 文件是否生效：

```bash
node index.js  # 或者启动项目的命令
```

这会在控制台输出你配置的商店 URL。

### 注意事项

- **不要将 `.env` 文件提交到版本控制系统**，因为它通常包含敏感信息（如 API 密钥）。可以在 `.gitignore` 文件中添加 `.env` 来忽略它。

```bash
# .gitignore
.env
```

通过 `.env` 文件管理 Shopify 的环境变量能够保持项目配置的清晰和安全。
