# Shopify CLI 创建默认主题项目

带有 `Liquid` 代码的完整 Shopify 项目结构，需要创建一个 **Shopify 主题**，而不是 Shopify 应用。Shopify 主题是负责处理前端界面的部分，包含了所有的 `Liquid` 模板文件。你可以通过 Shopify CLI 工具来生成一个主题项目，并获取完整的项目结构，里面会包含所有的 `.liquid` 文件。

下面是如何生成带有 `Liquid` 代码的 Shopify 主题项目结构的步骤：

### 1. **安装 Shopify CLI**

如果你还没有安装 Shopify CLI，请使用以下命令来安装它：

```bash
npm install -g @shopify/cli
```

或者使用 `yarn`：

```bash
yarn global add @shopify/cli
```

### 2. **创建 Shopify 主题**

使用 Shopify CLI 工具，你可以很容易地生成一个新的 Shopify 主题项目，主题项目会包含所有的 `Liquid` 模板文件。

1. 打开终端并导航到你想要创建项目的目录。

2. 使用以下命令创建一个新的 Shopify 主题项目：

```bash
shopify theme init my-new-theme
```

- `my-new-theme` 是你想要的主题项目名称。该命令会拉取 Shopify 的默认主题模板并生成项目文件。

3. 进入项目目录：

```bash
cd my-new-theme
```

![An image](/images/shopify/new-theme.png)

4. 使用以下命令启动 Shopify 主题开发：

```bash
shopify theme dev
```

::: warning 注意
运行`shopify theme dev`命令时需要注意加上 store 的名称，例如：`shopify theme dev --store=your-store-name`，否则可能会出现权限问题。
:::

这个命令会启动本地服务器，你可以在浏览器中实时预览你的主题更改。这个项目包含了所有的 `Liquid` 模板文件，并且你可以根据需要进行编辑。

#### 相关截图：

![An image](/images/shopify/new-theme-error.png)

> 找到 store 的密码。

![An image](/images/shopify/see-store-password.png)

![An image](/images/shopify/see-store-password-2.png)

![An image](/images/shopify/new-theme-storename.png)

![An image](/images/shopify/new-theme-success.png)

![An image](/images/shopify/new-theme-success-2.png)

### 3. **Shopify 主题项目结构**

生成的 Shopify 主题项目会有一个类似以下的文件结构，包含了多个 `Liquid` 文件：

```
my-new-theme/
├── assets/
├── config/
├── layout/
│   └── theme.liquid
├── locales/
├── sections/
├── snippets/
├── templates/
│   ├── 404.liquid
│   ├── article.liquid
│   ├── blog.liquid
│   ├── cart.liquid
│   ├── collection.liquid
│   ├── index.liquid
│   ├── page.liquid
│   └── product.liquid
└── config/settings_schema.json
```

#### 核心文件和文件夹介绍：

- **`layout/`**：包含 `theme.liquid`，这是整个网站的布局文件，所有页面都包含它。
- **`templates/`**：包含不同页面类型的 `Liquid` 模板文件，例如 `index.liquid`（首页）、`product.liquid`（产品页）等。
- **`sections/`**：用于创建动态页面部分的文件夹。你可以在 Shopify 管理面板中配置页面的不同部分。
- **`snippets/`**：存放可以重复使用的小块 `Liquid` 代码片段。
- **`assets/`**：存放静态资源文件，如图片、样式表和 JavaScript 文件。

你可以在这些 `.liquid` 文件中编辑 HTML 结构和添加自定义的逻辑，如在支付按钮处添加自定义弹窗等。

### 4. **编辑 `Liquid` 文件**

例如，你可以在 `templates/cart.liquid` 中添加自定义弹窗功能：

```liquid
<form action="/checkout" method="post">
  <button type="submit" id="checkout-button">Proceed to Checkout</button>
</form>

<script>
  document.getElementById('checkout-button').addEventListener('click', function(event) {
    event.preventDefault();
    alert('自定义弹窗：你确定要继续支付吗？');
  });
</script>
```

### 5. **上传主题到 Shopify**

当你完成本地开发并想将修改应用到 Shopify 商店时，可以使用以下命令将主题上传到你的商店：

```bash
shopify theme push
```

这个命令会将你本地的主题上传到 Shopify 商店并应用。

### 6. **其他开发工具**

如果你更熟悉本地编辑器，可以结合 Shopify CLI 使用本地的编辑器（如 VSCode）来修改和预览主题，并且可以通过 `shopify theme serve` 来实时预览你在本地所做的修改。

### 总结

- 使用 `Shopify CLI` 可以快速生成一个包含完整 `Liquid` 代码的 Shopify 主题项目。
- 你可以通过 Shopify 主题项目修改和定制 `.liquid` 文件来控制页面的显示和功能。
- 通过 Shopify CLI 工具，你可以轻松地在本地开发和预览主题，并将其上传到 Shopify 商店。

这样，你就可以拥有一个带有 `Liquid` 代码的完整项目结构，并通过修改 `.liquid` 文件来定制 Shopify 前端功能。
