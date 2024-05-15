# 微信小程序实践 - 分享

::: tip 结论
1）【转发】【分享到朋友圈】可以针对页面单独设置开启/关闭功能；

2）【转发】【分享到朋友圈】均可单独设置特定文案和图片。
:::

## 一、转发分享功能设置：

- 1）转发设置与禁止：
  - 禁止当前页面转发分享，代码层面设置：

```js
// 禁止当前页面【发送给朋友】
uni.hideShareMenu({})
```

- 2）分享朋友圈的设置：
  - a）要有 onShareAppMessage，并 return
  - b）不是 web-view 页面
  - c）onLoad 里写上如下代码，点亮分享到朋友圈：

```js

// 完整代码
onShareAppMessage(e) {
  return {
    title: '购物车测试分享 2023',
    path: '/pages/cart/index',
  }
},
onLoad(e) {
  wx.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage', 'shareTimeline'],
  })
},
onShareTimeline: function (res) {
  return {
    title: `登录分享测试2023`,
    imageUrl: `https://bbs.txwb.com/images/wmapp/share.jpg`,
    query: '',
  }
},
```

3）设置特定分享文案：

## 二、备注：

1）微信小程序，页面默认只有【转发】功能，可以在代码层面设置页面具备【分享朋友圈】功能；

2）特定页面，也可以关闭【转发】【分享朋友圈】功能；

3）微信小程序的【转发】【分享朋友圈】不局限商品详情页，首页/购物车页面/个人中心页面等均可以自由设置。

## 三、参考资料：

1）https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share-timeline.html （开放能力 /分享到朋友圈）

2）http://login.txwb.com/AT/wbcx/Easy/202105/385882.html （出现分享朋友圈按钮灰色）

## 四、验证截图：

Tips：以【购物车】页面为例

1）页面默认情况下：

> TODO

2）设置当前页面可以分享到朋友圈：

> TODO

3）禁止【发送给朋友】【分享到朋友圈】：

> TODO

4）设置【转发】【分享】文案：

> TODO
