# 小程序事件绑定与传参

小程序中常用的事件包括：

- tap:
  - 绑定方式： bindtap 或 bind:tap，手指触摸后马上离开，类似于 HTML 中的 click 事件
- input:
  - 绑定方式： bindinput 或 bind:input，文本框的输入事件
- change:
  - 绑定方式： bindchange 或 bind:change，状态改变时触发

我们以 tap 事件为例，做个简单的 DEMO：

## 一、事件绑定

```html
<!--index.wxml-->
<view class="container">
  <image src="{{logo}}" alt="logo" />
  <view class="usermotto">
    <text class="user-motto">{{motto}}</text>
    <view class="operate-box">
      <button bind:tap="changeMotto" type="primary" class="btn-primary">
        changeMotto信息
      </button>
    </view>
  </view>
</view>
```

```js
// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    motto: 'Hello World，小程序',
    logo: '/images//yb.png',
  },
  // 事件处理函数
  changeMotto() {
    this.setData({
      motto: '信息已经更改！'
    })
  },
  onLoad() {

  },
})
```

```scss
/**index.scss**/
.usermotto {
  margin-top: 50px;
  text-align: center;
}
.operate-box {
  padding: 20px;
  .btn-primary {
    width: 400rpx !important;
  }
}
```

![An image](/images/mp/mp_event.png)

## 二、事件传参

小程序里面的事件传参，与我们平时的 JS 编写或者 VUE 框架的编写方式是有点区别的。

::: warning 警告
比如下面的代码是不会生效的：
:::

```jsx
// <!-- 节选上述DEMO案例 -->
<button bind:tap="changeMotto('我是参数信息')" type="primary" class="btn-primary">changeMotto信息</button>

// 事件处理函数: 不会生效
changeMotto(info) {
  this.setData({
    motto: info
  })
},
```

需要在当前组件上设置 data- 开头的自定义属性。

```jsx
// 节选部分
<button bind:tap="changeMotto" data-info="我是自定义的需要修改的信息" type="primary" class="btn-primary">changeMotto信息</button>

// 事件处理函数： 生效
changeMotto(e: any) {
  console.log(e)
  this.setData({
    motto: e.target.dataset.info
  })
},
```

![An image](/images/mp/mp_event2.png)
