# 技术调研支付功能（微信/支付宝）

## 一、微信支付

> 结论：在 H5 页面，引入微信支付功能，使用【H5 支付】方式，由 H5 页面呼起微信客户端进行支付。

- [微信支付对接官网](https://pay.weixin.qq.com/)

### 1. 整体流程

> 提交资料 ==> 签署协议 ==> 绑定场景。

- **提交资料**：在线提交营业执照、身份证、银行账户等基本信息，并按指引完成账户验证；
- **签署协议**：微信支付团队会在 1-2 个工作日内完成审核，审核通过后请在线签约，即可体验各项产品能力；
- **绑定场景**：如需自行开发完成收款，需将商户号与 APPID 进行绑定，或开通微信收款商业版（免开发）完成收款。

### 2. 应用场景分类

> [微信支付 - 接入指引](https://pay.weixin.qq.com/static/applyment_guide/applyment_index.shtml)

- 线下场所
- 公众号
- 微信小程序
- **_PC 网站_**
- APP
- 企业微信

备注：我们公司的应用场景目前归属于【_PC 网站_】这一范畴。【_PC 网站_】包含：PC 网站、H5 网站、APP 内嵌 H5 页面。

### 3. 支付产品

> [微信支付 - 产品中心](https://pay.weixin.qq.com/static/product/product_index.shtml)

- 付款码支付
- JSAPI 支付
- H5 支付
- 小程序支付
- Native 支付
- APP 支付
- 刷脸支付
- 刷掌支付

| **支付方式**    | **适用场景**                     | **实现方式**                   | **优点**                           | **适合 H5 界面**                |
| --------------- | -------------------------------- | ------------------------------ | ---------------------------------- | ------------------------------- |
| **JSAPI 支付**  | 微信内打开的 H5 页面             | 通过 `WeixinJSBridge` 调用支付 | 无需跳转，用户体验流畅             | **推荐**，微信内 H5 首选方式    |
| **H5 支付**     | 微信外浏览器中打开的 H5 页面     | 跳转微信完成支付后返回原页面   | 支持微信外浏览器，流程连贯         | **推荐**，微信外 H5 首选方式    |
| **小程序支付**  | 微信小程序内                     | 通过小程序支付组件             | 高度集成，体验流畅                 | **不推荐**，H5 不常用           |
| **付款码支付**  | 线下场景，通过商家扫描用户付款码 | 用户生成付款码，商家扫码       | 适合面对面支付                     | **不适用**，仅限线下            |
| **Native 支付** | PC 网页或二维码展示场景          | 生成支付二维码，用户扫码支付   | 常用于大屏展示，适合 PC 或实体场景 | **不适用**，H5 游戏体验较差     |
| **APP 支付**    | 移动 App 内                      | App 调用微信支付 SDK           | 专为移动 App 设计                  | **不适用**，H5 页面无法调用 SDK |
| **刷脸支付**    | 线下店面场景，通过刷脸设备支付   | 特定设备支持                   | 适合无人店等线下支付               | **不适用**，线上支付不支持      |
| **刷掌支付**    | 线下店面场景，通过刷掌设备支付   | 特定设备支持                   | 适合线下场景                       | **不适用**，线上支付不支持      |

### 4. 技术方案

> 确定了应用场景和支付产品，就能较好的确定技术方案。

以下三种方式度可以在 H5 端（PC 端）进行操作。

- **JSAPI 支付**：JSAPI 支付是指商户通过调用微信支付提供的 JSAPI 接口，在支付场景中调起微信支付模块完成收款。[微信支付 - JSAPI 支付](https://pay.weixin.qq.com/wiki/doc/apiv3/open/pay/chapter1_1_1.shtml)
- **Native 支付**：Native 支付是指商户系统按微信支付协议生成支付二维码，用户再用微信“扫一扫”完成支付的模式。该模式适用于 PC 网站、实体店单品或订单、媒体广告支付等场景。[微信支付 - Native 支付](https://pay.weixin.qq.com/wiki/doc/apiv3/open/pay/chapter2_7_0.shtml)
- **H5 支付**：[微信支付 - H5 支付](https://pay.weixin.qq.com/wiki/doc/apiv3/open/pay/chapter2_6_0.shtml)

**最终结论：**

- **微信内 H5**：选择 **JSAPI 支付**。
- **微信外浏览器 H5**：选择 **H5 支付**
  - H5 支付是指商户在微信客户端外的移动端网页展示商品或服务，用户在前述页面确认使用微信支付时，商户发起本服务呼起微信客户端进行支付。
  - 说明：要求商户已有 H5 商城网站，并且已经过 ICP 备案，即可申请接入。
  - [API 列表](https://pay.weixin.qq.com/wiki/doc/apiv3/open/pay/chapter2_6_3.shtml)

### 5. 技术具体实现流程

> 获取支付权限和配置 ==> 获取用户信息 ==> 调用统一下单接口 ==> 解析统一下单响应 ==> 前端唤起支付 ==> 支付结果通知 ==> 支付结果展示与反馈。

#### 1). 获取支付权限和配置

首先要在微信开放平台或微信公众号管理后台申请 H5 支付权限，并配置支付目录与授权域名。

- **商户平台配置**：确保已开通 H5 支付权限。
- **域名设置**：在微信商户后台设置 H5 支付的回调域名（必须为备案过的域名）。
- **支付授权目录**：将 H5 页面所在的目录添加到授权目录。

#### 2). 后端生成支付请求

在用户发起支付请求时，后端服务器与微信支付接口交互生成支付凭证。主要步骤如下：

##### 2.1 获取用户信息

如果用户通过微信公众号进入 H5 页面，可以通过 OAuth 2.0 接口获取用户的 `openid`，用于后续支付请求。

##### 2.2 调用统一下单接口

后端调用微信支付的统一下单接口，生成支付凭证。以下为主要参数：

- **appid**：公众账号 ID。
- **mch_id**：商户号。
- **nonce_str**：随机字符串。
- **sign**：签名，使用商户的 API 密钥。
- **body**：商品描述信息。
- **out_trade_no**：商户订单号。
- **total_fee**：订单金额（单位：分）。
- **spbill_create_ip**：用户的 IP 地址。
- **notify_url**：支付结果通知地址。
- **trade_type**：支付类型（H5 支付的`trade_type` 为 `"MWEB"`）。
- **scene_info**：场景信息（包括浏览器类型和域名），如：
  ```json
  {
    "h5_info": {
      "type": "Wap",
      "wap_url": "https://example.com",
      "wap_name": "H5 Payment"
    }
  }
  ```

##### 2.3 解析统一下单响应

成功调用统一下单接口后，微信支付返回 `prepay_id` 和 `mweb_url`，其中 `mweb_url` 是 H5 支付的入口。

#### 3). 前端唤起支付

在获取到 `mweb_url` 后，将其发送到前端，用户在点击支付按钮时，通过 `mweb_url` 跳转到微信支付页面。

- **跳转至支付页面**：用户点击支付按钮后，前端页面直接使用 `window.location.href` 跳转到 `mweb_url`。微信会引导用户完成支付操作。

#### 4). 支付结果通知

支付完成后，微信会异步通知支付结果给商户的 `notify_url`，商户服务器接收到通知后应做以下操作：

- **验证签名**：确保通知来源的真实性。
- **处理订单状态**：根据 `result_code` 判断支付结果，并更新数据库中订单状态。
- **返回成功响应**：确认处理成功后返回 XML 格式的成功响应，避免重复通知。

#### 5). 支付结果展示与反馈

完成支付后，微信会自动跳转回商户的指定页面，或用户可以返回 H5 页面。商户可以引导用户返回，并在页面上展示支付结果。

##### 建议的页面交互

- **轮询订单状态**：在用户回到 H5 页面时，可以通过前端轮询或后台轮询确认订单是否成功。
- **展示结果**：根据订单状态展示支付成功或失败的页面，给用户明确的支付反馈。

#### 技术实现代码示例

##### 后端代码（Node.js 示例）

```javascript
const crypto = require("crypto");
const axios = require("axios");

// 生成签名
function generateSignature(params, key) {
  const stringA = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  const stringSignTemp = `${stringA}&key=${key}`;
  return crypto
    .createHash("md5")
    .update(stringSignTemp)
    .digest("hex")
    .toUpperCase();
}

// 统一下单接口请求
async function createOrder() {
  const params = {
    appid: "your_app_id",
    mch_id: "your_mch_id",
    nonce_str: Math.random().toString(36).substring(2, 15),
    body: "Product Description",
    out_trade_no: "unique_order_number",
    total_fee: 100,
    spbill_create_ip: "user_ip",
    notify_url: "https://yourwebsite.com/notify",
    trade_type: "MWEB",
    scene_info: JSON.stringify({
      h5_info: {
        type: "Wap",
        wap_url: "https://yourwebsite.com",
        wap_name: "H5 Payment",
      },
    }),
  };

  // 添加签名
  params.sign = generateSignature(params, "your_api_key");

  // 发送请求
  const xmlData = convertToXml(params);
  const response = await axios.post(
    "https://api.mch.weixin.qq.com/pay/unifiedorder",
    xmlData,
    {
      headers: { "Content-Type": "text/xml" },
    }
  );

  const result = parseXml(response.data);
  return result.mweb_url; // 返回 mweb_url 供前端跳转
}
```

##### 前端代码

```javascript
// 获取后端的 mweb_url 后进行跳转
function pay(mweb_url) {
  window.location.href = mweb_url; // 跳转到微信支付页面
}
```

#### 注意事项

- **域名备案和 HTTPS**：H5 支付要求域名已备案，并且必须使用 HTTPS。
- **签名校验**：微信支付中的所有请求和响应都需要签名校验。
- **测试环境配置**：建议在正式环境前进行沙箱测试，确保支付逻辑无误。

## 二、支付宝

> **结论：因为目前只涉及到 H5 的页面支付功能，所以技术方案选择了官网中的 [支付宝开发平台 - 网页/移动应用](https://open.alipay.com/module/webApp)。**

支付宝开放平台基于支付宝海量用户，将强大的支付、营销、数据等能力，通过接口等形式开放给开发者，开发者可通过支付宝 SDK 等工具快速将能力集成至自身的网页或移动 APP 中。

### 1. 接入流程

- 创建应用
  - 在支付宝开放平台通过填写应用名称、LOGO 等基础信息，完成应用创建
- 开发配置
  - 完成密钥、网关等应用配置信息
- 提交审核和上线
  - 提交应用上线申请，审核通过后，可线上调用支付宝开放能力

### 2. 相关文档链接资料

- [开发文档](https://opendocs.alipay.com/open/01bxlm)
- [开发工具](https://opendocs.alipay.com/open/009ys9)
- [开放 API](https://opendocs.alipay.com/open/00a0ut)

### 3. 支付产品

> 支付宝的支付产品众多，结合目前公司的业务需求，首选【**_手机网站支付_**】方式，后续文档也将重点围绕此方式展开。

- 当面付
- APP 支付
- **手机网站支付**
- 电脑网站支付
- 刷脸付
- 预授权支付
- ...

### 4. 【手机网站支付】

- [官网文档地址（开发 > 服务端 > 支付产品 > 手机网站支付 > 产品介绍）](https://opendocs.alipay.com/open/203/105288)

手机网站支付是指商家在移动端网页展示商品或服务，用户在商家页面确认使用支付宝支付后，浏览器自动跳转支付宝 App 或支付宝网页完成付款的支付产品。该产品在签约完成后，需要技术集成方可使用。

## 三、其他支付方式（国外）

> TODO
