# 移动端小程序 - 优化

::: danger 问题
问题：首页默认进来有滚动条，点击后，滚动条消失
:::

::: tip 解决方案
解决方案：【不显示横向滚动条的情况下实现横向滚动】
:::

代码如下：

```html
<u-scroll-list scroll-x="true">
  <!-- 这里放置横向滚动内容 -->
  <view class="scroll-item">Item 1</view>
  <view class="scroll-item">Item 2</view>
  <view class="scroll-item">Item 3</view>
  <!-- 添加更多项目 -->
</u-scroll-list>
```

或者：

```html
<view style="display: flex; overflow-x: auto;">
  <u-scroll-list>
    <!-- 这里放置横向滚动内容 -->
    <view class="scroll-item">Item 1</view>
    <view class="scroll-item">Item 2</view>
    <view class="scroll-item">Item 3</view>
    <!-- 添加更多项目 -->
  </u-scroll-list>
</view>
```
