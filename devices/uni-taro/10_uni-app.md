# uni-app 微信小程序踩坑汇总

## 一、低版本兼容：

[参考地址](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)

## 二、转发分享功能：

```js
// 1）转发设置与禁止：
// 禁止当前页面转发分享，代码层面设置：
uni.hideShareMenu({})

// 2）分享朋友圈的设置：
// 2.1 要有onShareAppMessage，并return
// 2.2 不是web-view页面
// 2.3 onLoad里写上如下代码，点亮分享到朋友圈：
wx.showShareMenu({
  withShareTicket: true,
  menus: ['shareAppMessage', 'shareTimeline']
})

// 微信小程序，页面默认只有【转发】功能，可以在代码层面设置页面具备【分享朋友圈】功能

// 设置分享状态
// 小程序页面默认不可被分享到朋友圈，开发者需主动设置“分享到朋友圈”。页面允许被分享到朋友圈，需满足两个条件：

// 首先，页面需设置允许“发送给朋友”。具体参考 Page.onShareAppMessage 接口文档
// 满足条件 1 后，页面需设置允许“分享到朋友圈”，同时可自定义标题、分享图等。具体参考 Page.onShareTimeline 接口文档
// 满足上述两个条件的页面，可被分享到朋友圈。
```

[开放能力 /分享到朋友圈](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share-timeline.html)

[出现分享朋友圈按钮灰色](http://login.txwb.com/AT/wbcx/Easy/202105/385882.html)

## 三、微信用户一键登录（获取手机号）：

```js
// 获取手机号码的代码
<button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber"></button>
```

[开放能力 /用户信息 /获取手机号：](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/getPhoneNumber.html)

[uni-app 微信小程序授权登录：](https://blog.csdn.net/weixin_42232156/article/details/122452852)

[获取接口调用凭据：](https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/mp-access-token/getAccessToken.html)

::: warning 提示
注：getPhoneNumber 返回的 code 与 wx.login 返回的 code 作用是不一样的，不能混用。
:::

## 四、设置 API 合法性：

```pre
步骤一：
登录微信小程序后台：（首页）开发/开发管理 - 开发设置/服务器域名/修改

步骤二：
配置 request 合法域名等，注意必须是HTTPS的，域名必须经过ICP备案
```

[基础能力 /网络 /使用说明：](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html)

## 五、小程序分包策略：

```pre
原因：/common/vendor.js 过大

分析解决步骤：
1）将不同的版块进行分包拆解
2）根据【上传】时的报错提示，选择【查看文件列表】【代码依赖分析】等进行针对性的包体分析

解决方案：uni-app 开启【运行时是否压缩代码】，优化【components】里面代码
路径是：
a.  Hbuilder/运行/运行到小程序模拟器/运行时是否压缩代码；
b.  注意【components】里面的代码会打包到主包里面，还有第三方插件需要按需引入（比如echarts）。
```

[官网文档](https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages.html)

[小程序：uniapp 解决 vendor.js 体积过大的问题](https://blog.csdn.net/snowball_li/article/details/125440987)

## 六、uni.navigateTo 传值的几种方式：

```js
// 1）传入字符串
// 传递：
uni.navigateTo({
  url: `./registerDetail?companyOrgId=${this.companyOrgId}`,
});
// 接收：
onLoad(options) {
  this.info.companyOrgId = options.companyOrgId;
  console.log(options.companyOrgId);
},

// 2）传入对象
// 传递：
uni.navigateTo({
  url: './registerCode?info=' + encodeURIComponent(JSON.stringify(this.info))
});
// 接收：
onLoad(options){
  let userInfo = JSON.parse(decodeURIComponent(options.info));
  console.log('userInfo', userInfo);
}
```

[参考资料：](https://www.jianshu.com/p/dd69236da262)

## 七、区分 uni 页面跳转方式：

```pre
1）uni.navigateTo
uni.navigateTo跳转 非TabBar 上的路径

2）uni.switchTab
uni.switchTab跳转的必须是TabBar上的路径

3）uni.reLaunch
```

[参考资料：](https://uniapp.dcloud.net.cn/component/navigator.html)

[参考资料：](https://uniapp.dcloud.net.cn/api/router.html#navigateto)

[参考资料：](https://uniapp.dcloud.net.cn/api/router.html#switchtab)

## 八、服务号通知推送：

```pre
1）开通企业级服务号；

2）添加绑定运营者微信号：服务号首页/设置与开发/人员配置

3）功能->添加功能插件处看到申请模板消息功能的入口
```

## 九、微信支付：

```pre
官方API地址：
1）wx.requestPayment(Object object)：
==== https://developers.weixin.qq.com/miniprogram/dev/api/payment/wx.requestPayment.html
2）支付回调和查单实现指引：
==== https://pay.weixin.qq.com/wiki/doc/apiv3_partner/Practices/chapter1_1_1.shtml
3）小程序接入支付：
==== https://pay.weixin.qq.com/static/applyment_guide/applyment_detail_miniapp.shtml
4）小程序支付 - JSAPI下单：
==== https://pay.weixin.qq.com/wiki/doc/apiv3_partner/apis/chapter4_5_1.shtml
```

发起微信支付。调用前需在小程序微信公众平台 -功能 - 微信支付入口申请接入微信支付。

## 十、OCR 认证：

::: warning 提示
图片 base64 转换技术 与 PC 端 是有区别的！
:::

```js
// 1）选择图片：
wx.chooseMedia / chooseImage

// 2）图片转为base64：
var base64 = wx
  .getFileSystemManager()
  .readFileSync(res.tempFiles[0].tempFilePath, 'base64')
console.log('base64的内容: ', base64)

// 3） uni.uploadFile：上传接口
```

[参考地址](https://blog.csdn.net/Stitch_xiao/article/details/128728765)

## 十一、保存图片到系统相册：

```pre
wx.saveImageToPhotosAlbum(Object object)

https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.saveImageToPhotosAlbum.html

uni-app：https://uqrcode.cn/doc/ （uQRCode 中文文档）
```

## 十二、微信登录 OpenId 和 UnionId 区别：

```pre
OpenId：是用户和应用共同生成的唯一id

UnionId: 是用户和应用所有者共同生成的唯一id
```

举例：如公司 C 的微信账号同时有 A, B 两款应用，在做微信登录时。

1）用户通过 A 获取的 OpenId 和 B 获取的 OpenId 是不同且唯一的。

2）如果希望 A 应用的注册用户通过微信免注册登录 B, 则要使用 UnionId。

3）对于公司 C 账号下的应用，同一个微信用户获取的 UnionId 是唯一且一致的。

## 十三、微信下拉刷新：

```js
// TODO...
```

## 十四、小程序用户头像昵称获取规则调整公告：

```pre
收回接口：（用来获取用户昵称和头像）
wx.getUserProfile / wx.getUserInfo
==== https://developers.weixin.qq.com/community/develop/doc/00022c683e8a80b29bed2142b56c01
```

```pre
头像昵称填写：
==== https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/userProfile.html
```

```html
<!-- HTML - 最新获取头像昵称的代码写法：2023-01-29 -->
<button
  class="avatar-wrapper"
  open-type="chooseAvatar"
  @chooseavatar="onChooseAvatar"
>
  获取头像昵称
</button>
<input type="nickname" class="weui-input" placeholder="请输入昵称" />
```

```js
// JS - 最新获取头像昵称的代码写法：2023-01-29
onChooseAvatar(e) {
  const { avatarUrl } = e.detail
  this.userAvatar = avatarUrl
},
```

## 十五、组件【NumberBox 步进器】传参：（针对 uview）

```vue
<!-- 不传参写法： -->
<u-number-box v-model="value" @change="valChange"></u-number-box>

<script>
// 其他略...
methods: {
  valChange(e) {
    console.log('当前值为: ' + e.value)
  }
}
</script>
```

```vue
<!-- 传参写法： -->
<u-number-box
  v-model="item.quantity"
  @change="(e) => changeNumber(e, item)"
></u-number-box>

<script>
// 其他略...
methods: {
  changeNumber(e, item) {
    console.log('当前值为: ' + e.value)
  }
}
</script>
```

备注：【Checkbox 复选框 】同理。

## 十六、onShow 与 wx.chooseMedia 结合使用：

::: warning 提示
onShow 里面的方法会重新请求加载
:::

## 十七、公众号（服务号/订阅号）与小程序：

```pre
公众号与小程序的区别：
1. 技术：公众号基于H5，小程序基于微信自身开发环境与开发语言。
2. 定位：公众号服务于营销与信息传递，小程序面向产品与服务。

公众号：包括服务号和订阅号。
1. 服务号，用户只需要关注公众号，就能发送消息给用户。
2. 订阅消息需要用户主动订阅，然后才能接收消息，微信提供前端组件用于用户进行订阅。

模板消息推送
参考地址：https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Template_Message_Interface.html
根据接口文档，传入参数有token，用户id，模板id，以及跳转网址和data，即可将消息推送给关注的特定用户
```

## 十八、微信小程序自动运行配置

> 一定要记得配置这个。

![An image](/images/mp/addr-config.jpg)

- [首次配置](https://zh.uniapp.dcloud.io/quickstart-hx.html)

[尝试开发微信公众号消息推送功能并且和小程序关联：](https://zhuanlan.zhihu.com/p/130674021)

[微信小程序通过公众号服务号发送消息：](https://blog.csdn.net/wuguangrong888/article/details/127432924)

[公众号跳转微信小程序教程汇总：](https://zhuanlan.zhihu.com/p/586642045)

[微信订阅号和服务号的区别：](http://www.ccschy.com/shenghuo/37079.html)
