# 条件渲染与列表渲染

关键词：

```js
// 小程序 -->  VUE
wx:if  -----> v-if
hidden -----> v-show
wx:for -----> v-for
wx:key -----> :key
```

上面几个关键词很好的阐述了小程序中的条件渲染以及列表渲染这两个技术点，它与 VUE 的相似度是很高的。

不管是从使用的形式上，还是它的底层原理。

## 一、条件渲染

### wx:if

```jsx
// .wxml
// 下面的 wx:if 根据双括号（Mustache语法）里面判断值来确定显示或隐藏 view 标签里面的内容（包括view本身）
// 如果是 false， 则直接不显示（查看页面源代码也无法看到）
;<view wx:if="{{isShow}}">IF content</view>

// .ts
Page({
  data: {
    isShow: false
  }
  // ... 省略
})
```

### hidden

```jsx
// .wxml
// 下面的 hidden 根据双括号（Mustache语法）里面判断值来确定显示或隐藏 view 标签里面的内容（包括view本身）
// 如果是 true， 则直接不显示（查看页面源代码可以看到）
;<view hidden="{{isBool}}">Hidden content</view>

// .ts
Page({
  data: {
    isBool: true
  }
  // ... 省略
})
```

查看源码可以看到 hidden 为 true 时，只是当前 view 的 display 样式变化而已。

```css
view[hidden] {
  display: none;
}
```

![An image](/images/mp/mp_wxif.png)

## 二、列表渲染

```jsx
// .wxml
;<view wx:for="{{users}}" wx:key="item">
  {{ index }} -- {{ item }}
</view>
// 或者手动指定索引和当前项的变量名
// <view wx:for="{{users}}" wx:for-index="idx" wx:for-item="itemName" wx:key="idx">索引是：{{idx}}，当前项是：{{itemName}}</view>

// .ts
Page({
  data: {
    users: ['xiaoming', 'xiaoli', 'xiaohong']
  }
  // ... 省略
})

// 最终页面显示出：'0 -- xiaoming', '1 -- xiaoli', '2 -- xiaohong'
```

注意：这里的 wx:key 很重要，它和 VUE 以及 React 中的 key 一样，都是 Diff 算法 的主要优化点。
