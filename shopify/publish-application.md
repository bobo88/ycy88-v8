# Shopify 发布应用的流程详解

## 一、应用是什么?

> 应用是什么（费曼学习法）：简单来说，Shopify App 就是商店的功能增强器。你有了一个商店（Shopify），但是你可能还需要一些额外的东西来让它运行得更顺畅、功能更强大，App 就是这些额外的东西。 <br/> <br/> 想象你开了一家店，店里很简单，但是你想要有更多功能，比如自动发邮件、管理库存、提供客服支持。这个时候你就可以去下载一些 App，让你的店更好地服务顾客。这些 App 就像你手机里的应用，帮你解决不同的问题。 <br/> <br/> 类似 React/VUE 中的“组件 Components”，承担“拓展、增强、复用”的功能角色。

在 Shopify 中，**应用（Apps）** 是为商家提供的额外功能或工具，帮助他们优化商店的运营、销售、市场营销等多个方面。应用是 Shopify 商店的重要组成部分，它们可以通过扩展 Shopify 平台的核心功能，为商家提供更多的灵活性和自定义选项。

### 具体来说，Shopify 应用可以：

1. **扩展功能**：通过应用，可以为商店添加原生 Shopify 平台中没有的功能。例如，可以增加高级的库存管理系统、自动化营销工具、或者复杂的产品过滤器等。
2. **自动化任务**：帮助商家简化或自动化日常任务，比如自动发送营销邮件、更新库存、生成报告等。
3. **优化客户体验**：很多应用帮助提升客户在商店的购物体验，比如通过个性化推荐、快速搜索工具、增加社交媒体登录等。
4. **集成第三方服务**：通过应用，可以将商店与其他外部服务集成，如物流、支付网关、客户关系管理（CRM）系统等。

### Shopify 应用的分类

1. **公共应用（Public Apps）**：这些应用可以通过 **Shopify App Store** 找到，任何 Shopify 商店都可以安装。公共应用由 Shopify 生态中的开发者创建，经过 Shopify 审核后上线供所有商家使用。
2. **自定义应用（Custom Apps）**：这些应用仅适用于某些特定的商店。商家可以根据自己业务的需要，开发或定制应用来满足他们的特殊需求。自定义应用不会出现在 Shopify App Store 中，只在商店内部使用。

3. **私有应用（Private Apps）**：私有应用也是针对某一特定商店开发的，但与自定义应用不同，它主要用于提供高级集成功能（如与 ERP 或 WMS 系统集成），通常通过 API 直接访问商店数据。这些应用可以不通过 Shopify 的 App Store。

### Shopify 应用的构成

- **前端 UI**：应用通常有自己的用户界面，供商家在 Shopify 管理后台中进行设置或管理。
- **后台服务**：应用可能会有自己的服务器，处理和存储数据或与外部系统进行交互。
- **API**：Shopify 提供丰富的 API（例如产品、订单、客户数据等），应用可以通过这些 API 与 Shopify 进行交互，从而扩展 Shopify 的功能。

### 如何安装应用

1. **通过 Shopify App Store**：商家可以从 Shopify App Store 浏览和安装公开应用。
2. **通过自定义安装链接**：如果是自定义或私有应用，商家可以通过开发者提供的安装链接进行安装。

## 二、发布应用的具体流程

### 2.1 发布应用到 Shopify App Store

> 发布到 Shopify App Store 供所有商家使用（公开应用）。

TODO

### 2.2 自定义应用（Private Apps）

> 自定义应用（Private Apps）。

这里重点介绍如何开发和部署发布自定义应用。

> 官网地址：[https://shopify.dev/docs/apps/launch](https://shopify.dev/docs/apps/launch)

#### 2.2.1 要求清单 [官网地址参考](https://shopify.dev/docs/apps/launch/app-requirements-checklist)

1. 禁止和限制的应用程序配置
2. 安装和设置
3. 功能和质量
4. 应用程序性能
5. 应用程序列表
6. 安全及商户风险
7. ......

#### 2.2.2 使用受保护的数据 [官网地址参考](https://shopify.dev/docs/apps/launch/protected-customer-data)

- 请求访问受保护的客户数据
- 使用受保护的客户数据
- 要求
- 数据保护审查
- ......

#### 2.2.3 关于部署 [官网地址参考](https://shopify.dev/docs/apps/launch/deployment)

- [方式一：将你的应用部署到 Heroku](https://shopify.dev/docs/apps/launch/deployment/deploy-web-app/deploy-to-heroku)
  - [官网 ~ 安装 Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
  - ![An image](/images/shopify/install-heroku-cli.png)
  - ？？？无法注册 Heroku 账户
- [方式二：将应用程序部署到 Fly.io](https://shopify.dev/docs/apps/launch/deployment/deploy-web-app/deploy-to-fly)
  - [安装 Installing PowerShell on Windows](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.4)
  - [安装 Installing PowerShell on Windows（Github）](https://github.com/PowerShell/PowerShell/releases/tag/v7.4.5)
- [应用程序配置](https://shopify.dev/docs/apps/build/cli-for-apps/app-configuration)

## 三、注意事项

> **Shopify Partner 账户 vs. Shopify 商店账户**

### 3.1 **Shopify 商店账户**（普通会员与 Plus 区别）

- **普通 Shopify 商店**：主要用于运营电子商务商店。你可以安装第三方开发的应用，但不能发布应用到 Shopify App Store。
- **Shopify Plus 商店**：针对企业级商家，提供更多自定义功能、API 访问、流量支持等高级功能，适合大规模商家使用。
- **普通商店** 和 **Plus 商店** 都可以安装自己开发的自定义应用（Private Apps），但只有 **Shopify Partner 账户** 才能开发公开应用（Public Apps）。

### 3.2 **Shopify Partner 账户**

- **用于开发和发布应用**。
- 你需要注册一个 **Shopify Partner 账户**，通过该账户可以开发、测试、部署应用，并且将应用发布到 Shopify App Store。
- Shopify Partner 账户是免费的，适合开发者、代理商和第三方服务提供商使用。
  - **注册 Shopify Partner 账户**：
  - 前往 [Shopify Partner Dashboard](https://partners.shopify.com/) 注册一个免费的 Shopify Partner 账户。

### 3.3 总结

- **普通 Shopify 商铺**（非 Plus 商店）**不能直接发布应用**到 Shopify App Store，但可以开发和安装**自定义应用（Private Apps）**。
- 要发布应用到 Shopify App Store，**需要通过 Shopify Partner 账户** 开发并提交应用，审核通过后可以发布。

### 3.4 部署方式的区别

在部署 Shopify 私有应用（Private App）时，你可以选择多种托管方式。以下是几种常见的选择，以及它们的优劣：

#### 1) **部署 Web 应用**

- **描述**: 将你的私有应用部署到自托管的服务器或你拥有的 Web 环境（例如 AWS、Google Cloud、VPS、传统服务器）。
- **适合**: 适合有自己的服务器管理经验和能力，或希望完全控制部署环境和配置的开发者。
- **优点**:
  - 完全控制部署环境。
  - 灵活选择服务器和配置。
- **缺点**:
  - 需要自行管理服务器、维护、扩展。
  - 相对复杂，适合有经验的开发者。

#### 2) **部署到托管服务**

- **描述**: 使用托管服务（如 AWS、Google Cloud、DigitalOcean 等）部署应用，让服务提供商负责服务器维护、扩展和管理。
- **适合**: 希望拥有部分控制权，但不想管理底层基础设施的开发者。
- **优点**:
  - 更简单的部署和维护流程。
  - 提供自动扩展、高可用等功能。
- **缺点**:
  - 成本高于自托管。
  - 某些细节仍需自行管理（如负载均衡、SSL 证书等）。

#### 3) **部署至 Fly.io**

- **描述**: [Fly.io](https://fly.io) 是一种轻量化的云平台，专注于全球分布式的应用部署。Fly.io 可以将应用快速部署到靠近用户的地理位置，从而提高性能。
- **适合**: 适合希望快速全球化部署的开发者，并且不希望过多关注基础设施管理。
- **优点**:
  - 全球多点部署，延迟低。
  - 快速上手，易于管理。
  - 支持 Docker 镜像部署。
- **缺点**:
  - 功能有限，适合小型或中型项目。
  - 可能不适合需要复杂基础设施的项目。

#### 4) **部署至 Heroku**

- **描述**: [Heroku](https://www.heroku.com) 是一个流行的 PaaS（平台即服务），专注于简化应用的部署和管理。它提供易用的部署流程，特别适合 Web 应用开发。
- **适合**: 希望快速部署且不关心底层基础设施管理的开发者。
- **优点**:
  - 部署非常简单（支持直接通过 Git 部署）。
  - 自动化扩展和基础设施管理。
  - 集成众多附加组件（如数据库、缓存、日志等）。
- **缺点**:
  - 免费计划资源受限，商业计划价格较高。
  - 对复杂配置和自定义的控制有限。

#### 如何选择？

- **初学者或希望快速部署**：推荐 **Heroku**，它的操作最为简单，适合开发者快速上线应用，特别是在早期阶段。
- **需要全球分布式部署**：**Fly.io** 是一个优秀选择，特别适合需要低延迟的应用。
- **需要更高控制和灵活性**：如果你希望更灵活的环境和全球化服务，可以选择 **托管服务** 或 **自托管 Web 应用**。

对于大多数希望快速部署 Shopify 私有应用的开发者，**Heroku** 和 **Fly.io** 都是很好的选择，它们简化了基础设施的管理，适合不需要复杂配置的应用。

---

- [官网 - Build：关于如何构建和开发应用程序的指导](https://shopify.dev/docs/apps/build/scaffold-app)
- [官网 - Design：关于应用程序的设计部分，包括用户界面等](https://shopify.dev/docs/apps/design)
- [官网 - Launch：发布应用的流程和步骤](https://shopify.dev/docs/apps/launch)
- [Become a Shopify Partner.Unlock business growth.](https://www.shopify.com/partners/blog/26569987-getting-your-app-in-the-shopify-app-store)
