# vuepress 设置代码高亮

VuePress 使用了 Prism (opens new window)来为 markdown 中的代码块实现语法高亮。Prism 支持大量的编程语言，你需要做的只是在代码块的开始倒勾中附加一个有效的语言别名。

### 输入

````html
在页面中输入如下代码： ``` js export default { name: 'MyComponent', // ... } ```
````

### 输出

```js
export default {
  name: 'MyComponent'
  // ...
}
```

更多的编程语言支持可以参考：<a href="https://prismjs.com/#supported-languages" target="_blank">https://prismjs.com/</a>
