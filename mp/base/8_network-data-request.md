# 微信小程序发送请求

::: tip 微信小程序发送网络请求的关键词是 wx.request

1. 域名必须是 HTTPS 协议的，不能用 IP 或者 localhost 等
2. 域名需要在小程序里面进行合法化配置
3. 调试时，可以选择「不做上述校验」，但正式发布不可以
   :::

```xml
<!--pages/req/req.wxml-->
<view class="req-box">
  <view wx:if="{{appList.length === 0}}" class="nodata">
    没有数据
  </view>
  <view wx:else>
    <view class="limit-tit">App store 下载Top10</view>
    <view class="app-list">
      <view wx:for="{{appList}}" wx:key="item" class="item">
        <image src="{{item['im:image'][2].label}}" mode="scaleToFill" class="item"></image>
      </view>
    </view>
  </view>
</view>
```

```ts
// pages/req/req.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    appList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // @ts-ignore
    let that = this
    wx.request({
      url: 'https://itunes.apple.com/cn/rss/topgrossingapplications/limit=10/json',
      method: 'GET',
      success: function (res) {
        let resData: any = res.data
        that.setData({
          appList: resData.feed.entry
        })
      }
    })
  }
  // ... 省略
})
```

```scss
/* pages/req/req.scss */
.req-box {
  display: flex;
  justify-content: space-around;
  text-align: center;
  .nodata {
    padding: 100rpx;
  }
  .limit-tit {
    padding: 10rpx;
    font-weight: bold;
  }
  .app-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 20rpx;
    .item {
      margin-bottom: 20rpx;
      width: 120rpx;
      height: 120rpx;
      border: 1rpx solid #ccc;
      border-radius: 30rpx;
    }
  }
}
```

```json
// req.json 配置文件
{
  "usingComponents": {},
  "navigationBarBackgroundColor": "#f60",
  "navigationBarTextStyle": "white",
  "navigationBarTitleText": "微信接口功能演示",
  "backgroundColor": "#eeeeee",
  "backgroundTextStyle": "light"
}
```

![An image](/images/mp/mp_request.png)

### 配置合法化域名

![An image](/images/mp/mp_request2.png)
