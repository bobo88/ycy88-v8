# 微信小程序实践 - 支付

::: tip 结论：
1）微信支付/银联支付：均需要进行企业级的申请接入操作；

2）审核接入通过后，根据相关文档进行对接联调。
:::

## 一、实现步骤：

1）申请接入权限：发起微信支付。调用前需在小程序微信公众平台  -功能 - 微信支付入口申请接入微信支付。

2）调用支付接口：

```js

uni.request({
  url: '后端接口地址,获取支付核心数据',
  method: 'POST',
  data: { 接口需要什么参数就传给接口,包含扣款金额,订单 id 等 },
  success(obj) {
    //调用微信官方支付接口弹出付款界面,输入密码扣款
    wx.requestPayment({
      timeStamp: obj.xxxx.timeStamp, //后端返回的时间戳
      nonceStr: obj.xxxx.nonceStr, //后端返回的随机字符串
      package: obj.xxxx.packageValue, //后端返回的 prepay_id
      signType: 'MD5', //后端签名算法,根据后端来,后端 MD5 这里即为 MD5
      paySign: obj.xxxx.paySign, //后端返回的签名
      success (res) {
        console.log('用户支付扣款成功', res)
      },
      fail (res) {
        console.log('用户支付扣款失败', res)
      }
    })
  }
})
```

## 二、步骤截图：

1）申请接入权限：

> TODO

2）开发流程指引：https://pay.weixin.qq.com/wiki/doc/apiv3/open/pay/chapter2_8_2.shtml

> TODO

3）业务流程图

> TODO
