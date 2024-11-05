# uni-app 开发实战

## 一、项目初始化

下载 HBuilderX，并新建模板

<img width="100%" src="/images/mp/uni-app/uni-app.png" /><br/>

## 二、建立底部 tab

### 2.1 修改 pages.json

```json
{
  "pages": [
    //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
    {
      "path": "pages/index/index",
      "style": {
        "navigationStyle": "custom",
        "enablePullDownRefresh": true
      }
    },
    {
      "path": "pages/category/category",
      "style": {
        "navigationBarTitleText": "商品分类"
      }
    },
    {
      "path": "pages/cart/index",
      "style": {
        "navigationBarTitleText": "购物车"
      }
    },
    {
      "path": "pages/my/index",
      "style": {
        "navigationBarTitleText": "会员中心"
      }
    },
    {
      "path": "pages/coupons/index",
      "style": {
        "navigationBarTitleText": "优惠券"
      }
    }
  ],
  "globalStyle": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "uni-app",
    "navigationBarBackgroundColor": "#F8F8F8",
    "backgroundColor": "#F8F8F8"
  },
  "uniIdRouter": {},
  "tabBar": {
    "color": "#909399",
    "selectedColor": "#303133",
    "backgroundColor": "####FF",
    "borderStyle": "black",
    "list": [
      {
        "pagePath": "pages/index/index",
        "iconPath": "static/images//nav/home-off.png",
        "selectedIconPath": "static/images//nav/home-on.png",
        "text": "首页"
      },
      {
        "pagePath": "pages/category/category",
        "iconPath": "static/images//nav/fl-off.png",
        "selectedIconPath": "static/images//nav/fl-on.png",
        "text": "分类"
      },
      {
        "pagePath": "pages/coupons/index",
        "iconPath": "static/images//nav/coupon-off.png",
        "selectedIconPath": "static/images//nav/coupon-on.png",
        "text": "优惠券"
      },
      {
        "pagePath": "pages/cart/index",
        "iconPath": "static/images//nav/cart-off.png",
        "selectedIconPath": "static/images//nav/cart-on.png",
        "text": "购物车"
      },
      {
        "pagePath": "pages/my/index",
        "iconPath": "static/images//nav/my-off.png",
        "selectedIconPath": "static/images//nav/my-on.png",
        "text": "我的"
      }
    ]
  }
}
```

### 2.2 pages 目录新建 tab 相关模板，static 目录新建相关 icon

<img width="800" src="/images/mp/uni-app/uni-app-2.png" /><br/>

### 2.3 最终效果

<img width="600" src="/images/mp/uni-app/uni-app-3.png" /><br/>

## 三、引入 UI 组件库：uview-ui

官网： <a href="https://www.uviewui.com/" target="_blank">uview-ui</a>

::: tip 安装方式
安装方式有：Hbuilder X 方式 、NPM 方式。具体可参考：<a href="https://www.uviewui.com/components/install.html" target="_blank">uview-ui install</a>。

本文以 NPM 方式为例。
:::

::: warning 注意
uview-ui 只支持 VUE 2 版本。

vk-uview-ui 支持 VUE 2/3，<a href="https://ijry.github.io/uview-plus/" target="_blank">uview-plus</a> 支持 VUE 3 版本，firstui 支持 VUE 2/3。

但以上 UI 组件库的 star 和维护更新频率都不高，需要谨慎使用。
:::

### 3.1 关于 sass

```js
// 安装sass
npm i sass -D

// 安装sass-loader，注意需要版本10，否则可能会导致vue与sass的兼容问题而报错
npm i sass-loader@10 -D
```

### 3.2 安装 uview-ui

```js
// 安装
$ npm install uview-ui@2.0.31
```

### 3.3 配置 uview-ui

1. 引入 uView 主 JS 库

```js
// main.js
import uView from "@/uni_modules/uview-ui";
Vue.use(uView);
```

2. 在引入 uView 的全局 SCSS 主题文件<br/>
   在项目根目录的 uni.scss 中引入此文件。

```scss
/* uni.scss */
@import "@/uni_modules/uview-ui/theme.scss";
```

3. 引入 uView 基础样式

```vue
<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "@/uni_modules/uview-ui/index.scss";
</style>
```

4. 配置 easycom 组件模式<br/>
   此配置需要在项目根目录的 pages.json 中进行。

```json
// pages.json
{
  // 如果您是通过uni_modules形式引入uView，可以忽略此配置
  "easycom": {
    "^u-(.*)": "@/uni_modules/uview-ui/components/u-$1/u-$1.vue"
  },

  // 此为本身已有的内容
  "pages": [
    // ......
  ]
}
```

<img width="600" src="/images/mp/uni-app/uni-app-4.png" /><br/>

## 四、自定义 UI 组件库

::: tip 自定义 UI 组件库
VUE 3 / uni-app / 高可用性 / 高拓展性
:::

TODO...

## 五、平台差异化处理

不同平台代码差异化处理，比如微信小程序 tab 为 5 个，H5 底部 tab 为 4 个。

- 使用 #ifdef 和 #endif

```json
{
  // 省略其他
  "tabBar": {
    // 省略其他
    "list": [
      {
        "pagePath": "pages/index/index",
        "iconPath": "static/images//nav/home-off.png",
        "selectedIconPath": "static/images//nav/home-on.png",
        "text": "首页"
      },
      {
        "pagePath": "pages/category/category",
        "iconPath": "static/images//nav/fl-off.png",
        "selectedIconPath": "static/images//nav/fl-on.png",
        "text": "分类"
      },
      // #ifdef MP-WEIXIN
      {
        "pagePath": "pages/coupons/index",
        "iconPath": "static/images//nav/coupon-off.png",
        "selectedIconPath": "static/images//nav/coupon-on.png",
        "text": "优惠券"
      },
      // #endif
      {
        "pagePath": "pages/cart/index",
        "iconPath": "static/images//nav/cart-off.png",
        "selectedIconPath": "static/images//nav/cart-on.png",
        "text": "购物车"
      },
      {
        "pagePath": "pages/my/index",
        "iconPath": "static/images//nav/my-off.png",
        "selectedIconPath": "static/images//nav/my-on.png",
        "text": "我的"
      }
    ]
  }
}
```

设置 H5 不显示 tabBar

```json
/* #ifndef H5 */
"tabBar": {
  "color": "#7A7E83",
  "selectedColor": "#3cc51f",
  "borderStyle": "black",
  "backgroundColor": "#ffffff",
  "list": [{
    "pagePath": "pages/tab/home/index",
    "text": "首页"
  }, {
    "pagePath": "pages/tab/list/index",
    "text": "列表"
  }, {
    "pagePath": "pages/tab/user/index",
    "text": "我的"
  }]
},
// #endif
```

## 六、uButton 自定义样式

使用第三方组件库，代码运行在不同平台，表现出较为明显的差异性。

<img width="600" src="/images/mp/uni-app/uni-app-5.png" />
<img width="600" src="/images/mp/uni-app/uni-app-6.png" /><br/>

根本原因在于：因为在小程序端，原本是一层的元素，被它搞成两层了，所以我们传递过去的 class 属性只应用在外层，而内层才是真正 button。

如果想 CSS 层面解决该问题，那就是都将它们都作为选择器即可：

```css
.u-button,
u-button {
  margin-bottom: 10rpx;
  width: 50%;
}
```

<img width="800" src="/images/mp/uni-app/uni-app-7.png" /><br/>

## 七、常用场景 DEMO 验证

### 7.1 轮播图（swiper）

### 7.2 公告消息滚动（notice）

### 7.3 商品列表展示

### 7.4 coupon 页面（验证 tab 切换 + 弹窗）

- 完整代码如下：

::: details pages/index/index.vue 相关代码

```vue
<!-- pages/index/index.vue -->
<template>
  <view class="index">
    <view class="swiper">
      <u-swiper
        v-if="banners"
        :list="banners"
        indicator
        circular
        keyName="picUrl"
        height="375rpx"
        @click="tapBanner"
      >
      </u-swiper>

      <u-notice-bar
        class="notice"
        v-if="goodsDynamic"
        icon="bag"
        :text="goodsDynamic"
        direction="column"
        mode="link"
        :disableTouch="false"
        @click="noticeclick"
      ></u-notice-bar>
    </view>

    <u-notice-bar
      v-if="notice"
      class="notice mt10"
      icon="volume"
      :text="notice.title"
      mode="link"
      url="/pages/notice/list"
    ></u-notice-bar>

    <view v-if="goods" class="goods-recommend">
      <view class="ttt">
        <text>商品列表</text>
      </view>
      <view class="goods-container">
        <view
          v-for="(item, index) in goods"
          :key="index"
          class="goods-box"
          bindtap="toDetailsTap"
        >
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      banners: undefined,
      goodsDynamic: undefined,
      notice: undefined,
      page: 1,
      goods: [],
    };
  },
  onLoad(e) {
    this._banners();
    this._notice();
    this._goods();
  },
  onShow() {
    this._goodsDynamic();
  },
  created() {},
  onShareAppMessage() {},
  onReachBottom() {
    // this.page += 1
    // this._goods()
  },
  onPullDownRefresh() {
    // this.page = 1
    this._banners();
    this._notice();
    this._goods();
    // uni.stopPullDownRefresh()
  },
  methods: {
    goSearch() {
      uni.navigateTo({
        url: "/pages/search/index",
      });
    },
    async _banners() {
      // DEMO 写死数据
      const res = {
        code: 0,
        data: [
          {
            businessId: 0,
            dateAdd: "2019-12-29 09:58:08",
            dateUpdate: "2020-02-20 09:54:27",
            id: 49755,
            linkType: 0,
            linkUrl: "",
            paixu: 0,
            picUrl:
              "https://dcdn.it120.cc/2019/12/29/8396f65d-d615-46d8-b2e5-aa41820b9fe5.png",
            shopId: 0,
            status: 0,
            statusStr: "显示",
            title: "首页轮播图",
            type: "index",
            userId: 951,
          },
          {
            businessId: 0,
            dateAdd: "2019-12-29 09:57:57",
            dateUpdate: "2020-02-20 09:54:31",
            id: 49754,
            linkType: 0,
            paixu: 0,
            picUrl:
              "https://dcdn.it120.cc/2019/12/29/daca65ee-4347-4792-a490-ccbac4b3c1d7.png",
            shopId: 0,
            status: 0,
            statusStr: "显示",
            title: "首页轮播图",
            type: "index",
            userId: 951,
          },
          {
            businessId: 0,
            dateAdd: "2019-12-29 09:57:43",
            dateUpdate: "2020-02-20 09:54:37",
            id: 49753,
            linkType: 0,
            paixu: 0,
            picUrl:
              "https://dcdn.it120.cc/2019/12/29/2e79921a-92b3-4d1d-8182-cb3d524be5fb.png",
            shopId: 0,
            status: 0,
            statusStr: "显示",
            title: "首页轮播图",
            type: "index",
            userId: 951,
          },
        ],
        msg: "success",
      };
      this.banners = res.data;
    },
    tapBanner(index) {
      const linkUrl = this.banners[index].linkUrl;
      if (linkUrl) {
        uni.navigateTo({
          linkUrl,
        });
      }
    },
    async _goodsDynamic() {
      // DEMO 写死数据
      this.goodsDynamic = [
        "小红买了100吨钢材",
        "小明买了1000吨无烟煤",
        "小李买了5000吨焦煤",
      ];
    },
    async _notice() {
      // DEMO 写死数据
      this.notice = {
        title: "通知：煤炭最新资讯*********，点我查看详情！",
      };
    },
    async _goods() {
      const res = {
        code: 0,
        data: {
          result: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
          totalPage: 3,
          totalRow: 25,
        },
        msg: "success",
      };
      this.goods = res.data.result;
    },
    noticeclick(e) {
      console.log(e);
    },
  },
};
</script>
<style lang="scss">
.index {
  .top-box {
    padding: 16rpx 8rpx;
    display: flex;
    align-items: center;
    background-color: #ffffff;

    .t {
      padding-left: 8rpx;
      font-size: 28rpx;
      color: #333;
    }

    .search {
      padding: 0 8rpx;
      flex: 1;
    }
  }

  .swiper {
    position: relative;
    .notice {
      position: absolute;
      bottom: 46rpx;
      left: 5%;
      width: 90%;
      color: #fff;
      font-size: 24rpx;
      opacity: 0.8;
      border-radius: 32rpx;
      overflow: hidden;
      box-sizing: border-box;
    }
  }
  .mt10,
  .mt10 .u-notice-bar {
    margin-top: 10rpx;
  }

  .ttt {
    padding: 24rpx 24rpx 0;
  }
  .goods-recommend {
    padding-bottom: 24rpx;
  }
  .goods-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    box-sizing: content-box;
    padding: 0 24rpx;
  }

  .goods-box {
    width: 339rpx;
    min-height: 400rpx;
    background-color: rgba(0, 0, 0, 0.2);
    overflow: hidden;
    margin-top: 24rpx;
    border-radius: 5px;
    border: 1px solid #d1d1d1;
    padding-bottom: 10rpx;
  }
}
</style>
```

:::

::: details pages/coupons/index.vue 相关代码

```vue
<!-- pages/coupons/index.vue -->
<template>
  <view>
    <u-sticky bgColor="#ffffff">
      <u-subsection
        activeColor="#e64340"
        :list="tabs"
        :current="current"
        @change="tabchange"
      ></u-subsection>
    </u-sticky>
    <page-box-empty
      v-if="!coupons || coupons.length == 0"
      title="暂无优惠券"
      sub-title="可以去看看可领取优惠券哦～"
      :show-btn="false"
    />
    <view
      v-if="current == 0 || current == 1 || current == 2"
      class="coupons"
      v-for="(item, index) in coupons"
      :key="index"
    >
      <image class="icon" src="/static/images//coupons-active.svg"></image>
      <view class="profile">
        <view class="name">
          <view class="t">代金券</view>
          <view class="n">{{ item.name }}</view>
        </view>
        <view class="price">
          <view class="tj">满{{ item.moneyHreshold }}</view>
          <view v-if="item.moneyType == 0" class="amount"
            ><text>￥</text>{{ item.moneyMin }}</view
          >
          <view v-if="item.moneyType == 1" class="amount"
            ><text></text>{{ item.moneyMin }}<text>%</text></view
          >
        </view>
        <view class="btn" @click="getCounpon(item)">立即领取</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        {
          name: "可领",
          status: "-1",
        },
        {
          name: "可用",
          status: "0",
        },
        {
          name: "失效",
          status: "2",
        },
      ],
      current: 1,
      coupons: undefined,
      curItem: undefined,
      couponPwdShow: false,
      couponPwd: undefined,
    };
  },
  created() {},
  mounted() {},
  onReady() {},
  onLoad(e) {
    this._myCoupons(1);
  },
  onShow() {},
  methods: {
    async tabchange(e) {
      this.current = e;
      this._myCoupons(this.current);
    },
    async _myCoupons(status) {
      this.coupons = null;
      // DEMO写死的数据
      const res = {
        code: 0,
        data: [
          {
            batchSendUid: -1,
            dateEndDays: 17,
            dateEndType: 1,
            dateStartType: 1,
            id: 10662,
            moneyHreshold: 0.0,
            moneyMax: 2.0,
            moneyMin: 1.0,
            moneyType: 0,
            name: "门店优惠中",
            needAmount: 0.0,
            needScore: 0,
            needSignedContinuous: 0,
            numberGit: 2349,
            numberGitNumber: 1322,
            numberLeft: 7875,
            numberPersonMax: 10,
            numberTotle: 9999,
            numberUsed: 0,
            onlyFreight: true,
            pic: "https://7.s2m.cc/cuser/951/2022/03/11/4f5d2773-1d09-4956-bd50-e6ad107825de.png",
            sendBirthday: false,
            sendInviteM: false,
            sendInviteS: false,
            sendRegister: false,
            shopId: 6040,
            showInFront: true,
            status: 0,
            statusStr: "正常",
          },
          {
            batchSendUid: -1,
            dateEndDays: 30,
            dateEndType: 1,
            dateStartType: 1,
            id: 8488,
            moneyHreshold: 0.0,
            moneyMax: 10.0,
            moneyMin: 5.0,
            moneyType: 1,
            name: "测试比例优惠券",
            needAmount: 0.0,
            needScore: 0,
            needSignedContinuous: 0,
            numberGit: 8,
            numberGitNumber: 1,
            numberLeft: 892,
            numberPersonMax: 10,
            numberTotle: 900,
            numberUsed: 0,
            onlyFreight: false,
            pwd: "Y",
            sendBirthday: false,
            sendInviteM: false,
            sendInviteS: false,
            sendRegister: false,
            shopId: 0,
            showInFront: true,
            status: 0,
            statusStr: "正常",
          },
          {
            batchSendUid: -1,
            dateEndDays: 7,
            dateEndType: 1,
            dateStartType: 1,
            id: 5453,
            moneyHreshold: 0.0,
            moneyMax: 1.0,
            moneyMin: 1.0,
            moneyType: 0,
            name: "一人一份",
            needAmount: 0.0,
            needScore: 0,
            needSignedContinuous: 0,
            numberGit: 1311,
            numberGitNumber: 1305,
            numberLeft: 999999995,
            numberPersonMax: 1,
            numberTotle: 999999999,
            numberUsed: 2,
            onlyFreight: false,
            pwd: "Y",
            sendBirthday: false,
            sendInviteM: false,
            sendInviteS: false,
            sendRegister: false,
            shopId: 0,
            showInFront: true,
            status: 0,
            statusStr: "正常",
          },
          {
            batchSendUid: -1,
            dateEndDays: 15,
            dateEndType: 1,
            dateStartType: 1,
            id: 223,
            moneyHreshold: 3000.0,
            moneyMax: 40.0,
            moneyMin: 40.0,
            moneyType: 0,
            name: "新店优惠",
            needAmount: 0.0,
            needScore: 0,
            needSignedContinuous: 0,
            numberGit: 16644,
            numberGitNumber: 8588,
            numberLeft: 989367,
            numberPersonMax: 999999,
            numberTotle: 995699,
            numberUsed: 64,
            onlyFreight: false,
            sendBirthday: false,
            sendInviteM: false,
            sendInviteS: false,
            sendRegister: false,
            shopId: 0,
            showInFront: true,
            status: 0,
            statusStr: "正常",
            type: "",
          },
          {
            batchSendUid: -1,
            dateEndDays: 15,
            dateEndType: 1,
            dateStartType: 1,
            id: 222,
            moneyHreshold: 2000.0,
            moneyMax: 25.0,
            moneyMin: 25.0,
            moneyType: 0,
            name: "新店优惠",
            needAmount: 0.0,
            needScore: 0,
            needSignedContinuous: 0,
            numberGit: 18631,
            numberGitNumber: 11696,
            numberLeft: 994822,
            numberPersonMax: 999999,
            numberTotle: 999999,
            numberUsed: 64,
            onlyFreight: false,
            sendBirthday: false,
            sendInviteM: false,
            sendInviteS: false,
            sendRegister: true,
            shopId: 0,
            showInFront: true,
            status: 0,
            statusStr: "正常",
            type: "",
          },
        ],
        msg: "success",
      };
      // 模拟tab为第一个时才有数据
      this.coupons = status === 0 ? res.data : [];
    },
    async getCounpon(item, pwd) {
      uni.showModal({
        title: "提示",
        content: "对不起，您的积分不足！",
        showCancel: false,
      });
      return;
    },
    goIndex() {
      uni.switchTab({
        url: "../index/index",
      });
    },
  },
};
</script>
<style lang="scss">
.coupons {
  display: flex;
  justify-content: space-between;
  margin-top: 24rpx;
  margin-left: 24rpx;
  width: 702rpx;
  height: 258rpx;
  background-color: #ffffff;
  box-shadow: 0 0 16rpx 0 rgba(36, 44, 69, 0.2);
  border-radius: 8rpx;
}

.coupons .icon {
  margin-left: 64rpx;
  margin-top: 44rpx;
  width: 160rpx;
  height: 144rpx;
}

.coupons .profile {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.coupons .profile .name {
  display: flex;
  margin-top: 32rpx;
}

.coupons .profile .name .t {
  width: 80rpx;
  height: 30rpx;
  background: #feb21c;
  border-radius: 4rpx;

  font-family: PingFangSC-Medium;
  font-size: 20rpx;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 30rpx;
  text-align: center;
}

.coupons .profile .name .n {
  margin-left: 16rpx;
  margin-right: 24rpx;
  font-family: PingFangSC-Medium;
  font-size: 30rpx;
  color: #333333;
  letter-spacing: 0;
  line-height: 30rpx;
}

.coupons .profile .price {
  display: flex;
  align-items: baseline;
  margin-top: 24rpx;
}

.coupons .profile .price .tj {
  font-family: PingFangSC-Regular;
  font-size: 20rpx;
  color: #999999;
  letter-spacing: 0;
  line-height: 20rpx;
}

.coupons .profile .price .amount {
  font-family: PingFangSC-Medium;
  font-size: 56rpx;
  color: #feb21c;
  letter-spacing: 0;
  line-height: 56rpx;
  margin-right: 24rpx;
}

.coupons .profile .price .amount text {
  margin-left: 16rpx;
  font-family: PingFangSC-Regular;
  font-size: 20rpx;
  color: #feb21c;
  letter-spacing: 0;
  line-height: 20rpx;
}

.disabled1 {
  background: #999999 !important;
  color: #ffffff !important;
}

.disabled2 {
  color: #999999 !important;
}

.coupons .profile .btn {
  margin-top: 24rpx;
  width: 182rpx;
  height: 60rpx;
  text-align: center;

  background: #ffffff;
  border: 2rpx solid #979797;
  border-right: none;
  border-radius: 200rpx 2rpx 2rpx 200rpx;

  font-family: PingFangSC-Regular;
  font-size: 24rpx;
  color: #999999;
  letter-spacing: 0;
  line-height: 60rpx;
}

.bottom {
  width: 100vw;
  height: 24rpx;
}

.koulingcoupon {
  margin-top: 32rpx;
}

.block-btn {
  margin: 32rpx 0;
}

.hecheng {
  margin-top: 16rpx;
}
</style>
```

:::

- H5 & 小程序截图：<br/>
  <img width="800" src="/images/mp/uni-app/uni-app-8.png" /><br/>
  <img width="800" src="/images/mp/uni-app/uni-app-9.png" /><br/>

::: warning 验证实录

1. 样式需要尽可能的写全：为写上 box-sizing:border-box; 的情况下，H5 和小程序有兼容性问题；
2. style 标签不要带 scoped：根本原因是上述 第六点，导致设置的 class 样式有兼容性问题；
3. 只要组件安装在项目的 components 目录下或 uni_modules 目录下，并符合 components/组件名称/组件名称.vue 目录结构。就可以不用引用、注册，直接在页面中使用。

:::

## 八、分享功能

### 8.1 微信小程序分享

```jsx
<button class="invite-button" open-type="share" @click="share">
  分享好友 小程序
</button>

onShareAppMessage(){
  return{
    title:'邀请好友领取海量现金券!',
    path:'/pages/my/index',//页面 path ，必须是以 / 开头的完整路径
    imageUrl:'https://docs.ycy88.com/assets/img/gh_code.051547d2.jpg',
    desc:'我正在使用xxxApp，赶紧跟我一起来体验！',
  }
},
```

## 九、TODO
