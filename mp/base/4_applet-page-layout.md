# 小程序页面布局

## 一、新建 about 文件夹

建好文件夹后，右击该文件夹名称，选择「新建 Page」，然后输入 about 即可自动生成 about 页面相关的四个文件（about.json / about.ts / about.wxml / about.wxss）。

::: tip 提示
项目初始化时如果选择「Typescript + Sass」模式，about.wxss 可以调整为 about.scss。
:::

## 二、about.wxml

```html
<!--pages/about/about.wxml-->
<p>单行布局</p>
<view class="line-box">
  <view class="item item-a">A</view>
  <view class="item item-b">B</view>
  <view class="item item-c">C</view>
</view>

<p>滚动布局</p>
<scroll-view class="scroll-box" scroll-y>
  <view class="item item-a">A</view>
  <view class="item item-b">B</view>
  <view class="item item-c">C</view>
</scroll-view>

<p>轮播图</p>
<swiper class="swiper-box" indicator-dots>
  <swiper-item class="swiper-item item-a">A</swiper-item>
  <swiper-item class="swiper-item item-b">B</swiper-item>
  <swiper-item class="swiper-item item-c">C</swiper-item>
</swiper>

<p>按钮相关</p>
<view class="btn-box">
  <button size="mini" class="btn-item" type="default">默认按钮</button>
  <button size="mini" class="btn-item" type="primary">主色调按钮</button>
  <button size="mini" class="btn-item" type="warn">警告按钮</button>
</view>

<p>图片相关</p>
<image src="/images//yb.png"></image>
```

## 三、about.scss

```scss
/* pages/about/about.scss */
.item {
  width: 200rpx;
  height: 100rpx;
  line-height: 100rpx;
}
.swiper-box {
  height: 200rpx;
}
.swiper-item {
  width: 100%;
  height: 200rpx;
  line-height: 200rpx;
}
.item-a {
  background: #409eff;
}
.item-b {
  background: #67c23a;
}
.item-c {
  background: #f56c6c;
}
.line-box {
  padding: 10px 0;
  display: flex;
  justify-content: space-around;
  color: #fff;
  text-align: center;
}
.scroll-box {
  padding: 10px;
  width: 200rpx;
  height: 180rpx;
  color: #fff;
  text-align: center;
}
.swiper-box {
  color: #fff;
  text-align: center;
}
.btn-box {
  display: flex;
  justify-content: space-around;
  .btn-item {
    display: block;
  }
}
```

## 四、布局 DEMO 效果

![An image](/images/mp/mp_layout.png)
