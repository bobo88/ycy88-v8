# 图片懒加载

::: tip 原理
在页面初始化的时候，img 图片的 src 实际上是放在 data-src 属性上的。<br/>
当元素处于可视范围内的时候，就把 data-src 赋值给 src 属性，完成图片加载。
:::

代码模拟具体的实现步骤：

```html
<!-- 1. 在一开始加载的时候 -->
<img data-src="http://xx.com/xx.png" src="" />

<!-- 2. 在进入可视范围内时 -->
<img data-src="http://xx.com/xx.png" src="http://xx.com/xx.png" />
```

## 方案一：getBoundingClientRect + scroll 事件 + 防抖函数】

1. 遍历图片是否到了可视区范围内
2. document.body.clientHeight 获取可视区高度
3. element.getBoundingClientRect() API 直接得到元素相对浏览的 top 值

## 方案二：【 IntersectionObserver 】：

1. IntersectionObserver 是一个新的 API，可以自动"观察"元素是否可见，Chrome 51+ 已经支持。
2. 由于可见（visible）的本质是，目标元素与视口产生一个交叉区，所以这个 API 叫做"交叉观察器"

```js
var io = new IntersectionObserver(callback, option)

// 开始观察
io.observe(document.getElementById('example'))

// 停止观察
io.unobserve(element)

// 关闭观察器
io.disconnect()
```

案例源码：<br />
<a href="https://github.com/bobo88/project-basis/tree/main/img-lazy-load-basis" target="_blank">图片懒加载 </a><br />
参考文章：<br />
<a href="https://segmentfault.com/a/1190000038413073" target="_blank">前端性能优化之图片懒加载</a><br />
