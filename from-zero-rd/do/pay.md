# 支付

## 一、支付宝

> Express。

### 1. 平台配置

- 先前往 **支付宝开发平台-开发者中心** 完成开发者接入的一些准备工作，包括创建应用、为应用添加功能包、设置 **应用的接口加签方式** 等。
  - 可以使用 **支付宝开放平台秘钥工具** 获取所需的公私钥，并在平台上上传公钥。
  - 本 SDK 默认采用 `PKCS1` 的格式解析密钥，与密钥工具的默认生成格式不一致。 请使用密钥工具【格式转换】功能转为 `PKCS1`，或在本 SDK 初始化时显式指定 `keyType: 'PKCS8'`。
- 在设置加签方式结束之后，记录必要信息用于初始化 SDK。
  - 公钥证书模式（推荐）： `appId`、应用私钥、应用公钥证书文件、支付宝公钥证书文件、支付宝根证书文件
  - 公钥模式：`appId`、应用私钥、应用公钥、支付宝公钥

### 2. 初始化 SDK

#### 2.1 公钥证书模式

```js
const AlipaySdk = require("alipay-sdk").default;
const alipaySdk = new AlipaySdk({
  appId: "2021005107671363",
  privateKey: fs.readFileSync("./cert/private_key.pem"),
  alipayPublicKey: fs.readFileSync("./cert/alipay_public_key.pem"), // 支付宝公钥证书文件路径
  appCertPath: "./cert/appCertPublicKey.crt",
  alipayRootCertPath: "./cert/alipayRootCert.crt",
  // 网关地址
  gateway: "https://openapi.alipay.com/gateway.do",
  //   gateway: "https://openapi.alipaydev.com/gateway.do",
  timeout: 5000, // 增加超时时间
  charset: "utf-8",
  signType: "RSA2",
});
```

#### 2.2 公钥模式

```js
const AlipaySdk = require("alipay-sdk").default;
const alipaySdk = new AlipaySdk({
  appId: "2021005107671363",
  privateKey: fs.readFileSync("./cert/private_key.pem"),
  alipayPublicKey: "支付宝公钥",
  // 网关地址
  gateway: "https://openapi.alipaydev.com/gateway.do",
  charset: "utf-8",
  signType: "RSA2",
});
```

### 3. 支付

```js
const result = await alipaySdk.exec("alipay.trade.page.pay", {
  bizContent: {
    outTradeNo: "20150320010101001",
    productCode: "FAST_INSTANT_TRADE_PAY",
    totalAmount: "88.88",
    subject: "Iphone6 16G",
    body: "Iphone6 16G", // 商品描述
    passbackParams: "merchantBizType%3d3C%26merchantBizNo%3d2016010101111",
    // 公共参数
    timeoutExpress: "30m",
    // 通知地址
    notifyUrl: "http://domain.com/notify",
    // 返回地址
    returnUrl: "http://domain.com/return", // 支付成功后，支付宝跳转的页面
  },
});
```

### 4. 支付宝回调

```js
app.post("/notify", async (req, res) => {
  const result = await alipaySdk.exec("alipay.trade.page.pay", {
    bizContent: {
      outTradeNo: "20150320010101001", // 订单号
      productCode: "FAST_INSTANT_TRADE_PAY",
      totalAmount: "88.88",
      subject: "Iphone6 16G",
      body: "Iphone6 16G", // 商品描述
      passbackParams: "merchantBizType%3d3C%26merchantBizNo%3d2016010101111",
      // 公共参数
      timeoutExpress: "30m",
      // 通知地址
      notifyUrl: "http://domain.com/notify",
      // 返回地址
      returnUrl: "http://domain.com/return", // 支付成功后，支付宝跳转的页面
    },
  });
});
```

### 5. 支付宝验签

```js
const result = await alipaySdk.exec("alipay.trade.page.pay", {
  bizContent: {
    outTradeNo: "20150320010101001", // 订单号
    productCode: "FAST_INSTANT_TRADE_PAY",
    totalAmount: "88.88",
    subject: "Iphone6 16G",
    body: "Iphone6 16G", // 商品描述
    passbackParams: "merchantBizType%3d3C%26merchantBizNo%3d2016010101111",
    // 公共参数
    timeoutExpress: "30m",
    // 通知地址
    notifyUrl: "http://domain.com/notify",
    // 返回地址
    returnUrl: "http://domain.com/return", // 支付成功后，支付宝跳转的页面
  },
});
```

> 支付宝密钥工具。

![An image](/images/from-zero/rd/alipay-tools.jpg)

> 支付宝密钥公钥等信息查看获取。

![An image](/images/from-zero/rd/alipay-key.jpg)

- [支付宝开放中心：https://open.alipay.com/develop/manage](https://open.alipay.com/develop/manage)

::: danger 支付宝报错: invalid-signature 错误原因: 验签出错，建议检查签名字符串或签名私钥与应用公钥是否匹配，网关生成的验签字符串为：xxx

**原因**：我把支付宝返回的 html 数据中的 action 直接以链接的形式打开，导致支付宝的验签失败。
![An image](/images/from-zero/rd/alipay.jpg)
![An image](/images/from-zero/rd/alipay-1.jpg)

**解决**：Express 直接 send 返回支付宝的 html 数据，然后前端直接渲染支付宝的 html 数据，这样支付宝的验签就不会失败了（它会自动跳转到支付页面）。
![An image](/images/from-zero/rd/alipay-2.jpg)

:::

## 二、微信

> TODO

---

- [https://www.npmjs.com/package/alipay-sdk](https://www.npmjs.com/package/alipay-sdk)
