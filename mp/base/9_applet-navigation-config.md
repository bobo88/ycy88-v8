# 小程序导航

页面导航指的是页面之间的互相跳转。在浏览器中实现页面导航的方式有如下两种

- `<a>`链接
- location.href

而我们今天讨论的小程序之间的页面导航方式有如下两种：

- 声明式导航： navigator
- 编程式导航： wx.switchTab({}) / wx.navigateTo({})

## 一、声明式导航

```xml
<!--pages/user/user.wxml-->
<view class="navigate-box">
  <!-- 跳转到tabBar页面 -->
  <navigator url="/pages/index/index" open-type="switchTab" class="navigate-item">
    <button size="mini" class="btn-item" type="default" plain>首页</button>
  </navigator>
  <!-- 跳转到非tabBar页面 -->
  <navigator url="/pages/info/info" open-type="navigate" class="navigate-item">
    <button size="mini" class="btn-item" type="default" plain>info</button>
  </navigator>
  <!-- 后退: 这个按钮应该放在info页面更合适，但为了demo更直观，所以放这里 -->
  <navigator open-type="navigateBack" delta="1" class="navigate-item">
    <button size="mini" class="btn-item" type="default" plain>navigateBack</button>
  </navigator>
</view>
```

## 二、编程式导航

```xml
<!--pages/user/user.wxml-->
<view class="navigate-box">
  <!-- 编程式导航 -->
  <button size="mini" class="btn-item" type="default" plain bindtap="gotoIndex">首页:F</button>
  <button size="mini" class="btn-item" type="default" plain bindtap="gotoInfo">info:F</button>
  <button size="mini" class="btn-item" type="default" plain bindtap="gotoBack">navigateBack:F</button>
</view>
```

```js
// pages/user/user.ts
Page({
  gotoIndex() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  gotoInfo() {
    wx.navigateTo({
      url: '/pages/info/info'
    })
  },
  gotoBack() {
    wx.navigateBack()
  }

  // ...
})
```

## 三、导航传参

```xml
<!--pages/user/user.wxml-->
<view class="navigate-box">
  <!-- 导航传参数 -->
  <navigator url="/pages/info/info?name=Bob&addr=SZ" open-type="navigate" class="navigate-item">
    <button size="mini" class="btn-item" type="default" plain>带参数：info - name=Bob&addr=SZ</button>
  </navigator>
</view>
```

```xml
<!--pages/info/info.wxml-->
<view wx:if="{{navigateInfo.name}}">导航传递过来的参数：{{navigateInfo.name}} - {{navigateInfo.addr}}</view>
```

```js
// pages/info/info.ts
Page({
  data: {
    navigateInfo: {}
  },
  // 通过 onLoad 的参数 options 来获取导航传递过来的参数数据。
  onLoad(options) {
    // @ts-ignore
    if (options) {
      this.setData({
        navigateInfo: options
      })
    }
  }
})
```

## 四、DEMO 截图

![An image](/images/mp/mp_navigate.png)
![An image](/images/mp/mp_navigate2.png)
