# 创建 Shopify 应用

> Shopify 开发涉及多个方面，包括 Shopify 应用开发、主题开发、以及通过 Shopify API 和 Shopify CLI 的集成。

## 一、**Shopify 应用开发 - 安装**

Shopify 应用（App）是增强 Shopify 店铺功能的一种方式，允许开发者创建独立的功能并集成到店铺中。这些应用可以在 Shopify 的 App Store 中发布，或者只为特定的商家使用（自定义应用）。

### 步骤:

- **准备开发环境**：

  - 安装 [Shopify CLI](https://shopify.dev/docs/apps/tools/cli)。
  - 安装并设置 [Node.js](https://nodejs.org/)，推荐使用 `nvm` 来管理 Node.js 版本。
  - 安装一个 `package manager`，如 `Yarn` 或 `npm`。
  - 安装 [Ngrok](https://ngrok.com/) 来实现本地开发时的 HTTPS 访问（Shopify 应用需要使用 HTTPS）。

参考官网地址：[https://shopify.dev/docs/api/shopify-cli](https://shopify.dev/docs/api/shopify-cli)。

```bash
# 注意：不同的Node版本可能会导致安装不成功，建议使用nvm安装node。（我用的是 V18.20.4）
npm install -g @shopify/cli@latest
```

- **创建一个 Shopify 应用**：
  使用 Shopify CLI 创建一个新的 Shopify 应用：参考官网[https://shopify.dev/docs/apps/build/scaffold-app](https://shopify.dev/docs/apps/build/scaffold-app)

  ```bash
  shopify app init
  ```

  ![An image](/images/shopify/ycy88-app.png)

  这个命令会引导你完成应用的初始化过程，包括设置应用名称、选择应用类型（Web 或 Mobile）、选择后端语言等。

  > 注意：这个下载过程会比较慢，一定要耐心等待，我试了几次才成功（中途一直以为是自己电脑网络卡顿还主动退出来几次）。

  这个命令会自动生成一个包含后端（Node.js/Express 或 Ruby on Rails）和前端（React）代码的完整项目结构。

- **本地开发**：
  Shopify CLI 提供了命令来启动应用并将其代理到 Shopify Store：

  ```bash
  shopify app dev
  ```

  ![An image](/images/shopify/ycy88-app-init.png)

  ![An image](/images/shopify/ycy88-app-files.png)

  这将启动本地服务器，并通过 Ngrok 暴露 HTTPS 端点，供 Shopify 应用调试。

> shopify app dev 启动后，点击键盘任何操作，会自动打开一个浏览器窗口，引导你创建用户，截图如下。

![An image](/images/shopify/create-account.png)

![An image](/images/shopify/use-way.png)

![An image](/images/shopify/create-account-2.png)

![An image](/images/shopify/create-account-3.png)

![An image](/images/shopify/create-account-4.png)

## 二、**Shopify 应用开发 - 创建 App**

> 创建自定义名称的 App，并设置 App 的权限。

- 1）npm init @shopify/app@latest
- 2）shopify app dev

![An image](/images/shopify/create-new-app.png)

![An image](/images/shopify/create-new-app-2.png)

![An image](/images/shopify/create-new-app-3.png)

![An image](/images/shopify/create-new-app-4.png)

> 在某个商店下创建 app。

![An image](/images/shopify/run-dev-1.jpg)

![An image](/images/shopify/run-dev-2.jpg)

![An image](/images/shopify/run-dev-3.jpg)

## 三、注意事项（解决报错）

### 3.1 安装报错

```bash
F:\bob-project\1-shopify>npm install -g @shopify/cli@latest
npm error code ETIMEDOUT
npm error syscall connect
npm error errno ETIMEDOUT
npm error network request to https://registry.npmjs.org/@shopify%2fcli failed, reason: connect ETIMEDOUT 2606:4700::6810:1d22:443
npm error network This is a problem related to network connectivity.
npm error network In most cases you are behind a proxy or have bad network settings.
npm error network
npm error network If you are behind a proxy, please make sure that the
npm error network 'proxy' config is set properly.  See: 'npm help config'
npm error A complete log of this run can be found in: C:\Users\yuanb\AppData\Local\npm-cache\_logs\2024-10-01T03_51_47_566Z-debug-0.log
```

由于超时错误（`ETIMEDOUT`），你可以尝试以下几种解决方法：

#### 1. **检查网络连接**

确保你的网络稳定，尝试访问其他网站或 ping npm 注册表以检查连接。

#### 2. **清除 npm 缓存**

使用以下命令清除缓存：

```bash
npm cache clean --force
```

#### 3. **检查代理设置**

如果你不在代理环境中，确保没有设置代理：

```bash
npm config delete proxy
npm config delete https-proxy
```

#### 4. **增加超时时间**

你可以增加 npm 的超时设置：

```bash
npm config set fetch-retry-mintimeout 20000
npm config set fetch-retry-maxtimeout 120000
```

#### 5. **使用不同的 npm 镜像**

可以尝试使用淘宝镜像：

```bash
npm config set registry https://registry.npm.taobao.org
```

然后再次尝试安装。

### 3.2 创建 app 报错

```bash
 shopify app init
```

```bash
 error ──────────────────────────────────────────────────────────────────────╮
│                                                                              │
│  Cloning into 'C:/Users/yuanb/AppData/Local/Temp/53c9e68cc22e2d3b7e2504d7c3  │
│  6966b6/download'...                                                         │
│  fatal: unable to access                                                     │
│  'https://github.com/Shopify/shopify-app-template-remix/': Failed to         │
│  connect to github.com port 443 after 21075 ms: Timed out
```

- 关掉网络代理（翻墙软件）
- 设置增加 git 请求超时时间
  ```bash
    git config --global http.postBuffer 524288000
    git config --global http.lowSpeedLimit 0
    git config --global http.lowSpeedTime 999999
  ```

<!-- - **使用 Shopify API**：
  Shopify 提供了丰富的 API，包括 Admin API、Storefront API 和 GraphQL API，允许开发者与商店数据进行交互。要使用这些 API，你需要在应用中创建 API 访问权限。

  - **Admin API**: 管理店铺订单、客户、库存等数据。
  - **Storefront API**: 允许开发者构建自定义的前端用户界面，获取产品和订单数据。
  - **GraphQL API**: 更高效的数据查询方式，可以减少请求次数。

### 技术栈：

- **后端**：Node.js (Express) 或 Ruby on Rails。
- **前端**：React.js，使用 Shopify 的 Polaris 组件库来创建一致的 UI 体验。 -->

<!--
## 2. **Shopify 主题开发**
Shopify 主题是店铺的前端展示，负责如何展示产品、订单等信息给客户。主题使用 Shopify 的 Liquid 模板语言进行开发，结合 HTML、CSS 和 JavaScript。

### 步骤：
- **准备开发环境**：
  - 安装 Shopify CLI。
  - 安装 `Theme Kit`，这是 Shopify 提供的用于开发主题的工具。

- **下载现有主题**：
  可以通过 Shopify CLI 下载现有店铺的主题进行修改：
  ```bash
  shopify theme pull
  ```

- **开发主题**：
  Shopify 主题开发使用 Liquid 语言，这是一种 Ruby 风格的模板语言。你将主要与 `.liquid` 文件打交道。
  - `layout` 文件夹包含店铺的基本布局文件。
  - `templates` 文件夹定义了 Shopify 的资源页面（如产品、收藏、订单等）的显示方式。
  - `sections` 文件夹允许创建可自定义的页面部分。

  你可以在 `.liquid` 文件中嵌入 HTML 和 Liquid 代码来动态渲染店铺数据。

- **实时开发和预览**：
  使用以下命令启动本地开发服务器并实时预览主题修改：
  ```bash
  shopify theme serve
  ```

### 推荐的工具：
- **Shopify Liquid**：学习 Shopify 的模板语言 [Liquid](https://shopify.dev/docs/themes/liquid)。
- **Themekit**：使用 Themekit CLI 实现快速的主题开发和部署。

## 3. **Shopify API 集成**
Shopify 提供了多个 API 来扩展其功能，包括 REST API 和 GraphQL API。无论是开发应用，还是需要与 Shopify 平台交互，这些 API 都非常重要。

- **Admin API**：
  用于访问 Shopify 商店的后台数据，如订单、产品、库存等。你可以通过 REST 或 GraphQL 方式调用它。

- **Storefront API**：
  主要用于构建自定义的前端展示或自定义购买流程。

### 常见 API 使用场景：
- 获取产品信息：
  ```graphql
  query {
    products(first: 5) {
      edges {
        node {
          id
          title
          description
          priceRange {
            minVariantPrice {
              amount
            }
          }
        }
      }
    }
  }
  ```

- 创建订单：
  通过 Admin API 创建客户订单和订单条目。

- 处理客户登录、数据管理：
  使用 Storefront API 集成自定义登录系统，或实现客户数据展示。

## 4. **部署 Shopify 应用**
一旦完成开发，应用可以通过以下方式部署：
- **私有部署**：应用仅供一个或几个特定商家使用。这种应用无需发布到 Shopify App Store。
- **公共应用**：如果你希望多个商家使用，可以通过 Shopify App Store 发布应用。在发布之前，需要对应用进行审核和认证。

## 5. **开发资源**
- **Shopify 开发文档**：[Shopify Dev](https://shopify.dev/)
- **Liquid 模板语言文档**：[Liquid Documentation](https://shopify.dev/docs/themes/liquid)
- **Shopify CLI**：[CLI Documentation](https://shopify.dev/docs/apps/tools/cli)
- **Shopify Polaris（UI 组件库）**：[Polaris Documentation](https://polaris.shopify.com/)

## 6. **总结**
- **Shopify 应用开发**：使用 Shopify CLI 开发 Node.js 或 Ruby 应用，并通过 Shopify API 与商店数据交互。
- **主题开发**：使用 Liquid 模板语言进行主题定制。
- **API 集成**：通过 Shopify 的 REST 和 GraphQL API 与商店交互。
- **部署和发布**：将应用发布到 Shopify App Store 或为特定商家部署私有应用。

从哪一部分开始取决于你的需求。如果你想扩展 Shopify 的功能，可以从应用开发开始。如果你想自定义店铺的外观，主题开发是你的方向。 -->
