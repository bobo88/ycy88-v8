# React 清单 - UI 组件库

::: tip 为什么我们需要用 UI 组件库？
我们在进行项目开发的过程中，会涉及很多页面以及组件的编写，会细化到 按钮/输入框/弹窗 等，如果所有版块都自己造轮子就比较耗时间而且开发过程中代码容易良莠不齐。

所以我们需要用第三方 UI 组件库（现成的通用轮子）来丰富我们的项目，我们可以直接使用这些组件库或基于这些组件库进行二次封装来实现我们的产品需求，这会大大提升我们的开发效率并降低后期维护的成本。
:::

个人粗浅的认为评价一款 UI 组件库的优劣主要集中在以下几点：

- Github 上 Star 数较多： 这表明这款 UI 组件库受关注的程度较高；
- 维护更新是否频繁：可以从它最近的 git 提交时间和提交频率上来判断，好几年未更新迭代的开源库和一直有人在开发维护的开源库，选择哪一款高下立见；
- 使用者和贡献者数量：可以在 Github 上直观的看到「Used by」和「Contributors」这两个数据，它能直观的让你了解这款开源库的火热程度；
- 文档是否齐全：作为国内开发者，我们可能更偏爱于中文文档齐全的开源库，不过，只要英文文档齐全且满足上述三个条件的开源库是值得尝试使用的。

## 一、React UI 组件库比较

```js
// Ant Design ---------------------- Material-ui
// star: 82.2k                      star: 81.9k
// Releases: 一周内                  Releases: 一周内
// Used by: 351k                    Used by: 935k
// Contributors: 1725               Contributors: 2613
// 文档: 中英文齐全                   文档: 中英文齐全

// 以上数据来源于： 2022年10月
```

<p style="color:#f60">结论：可以看出 Ant Design是一个优秀的React UI组件库，但毫无疑问，Material-UI是GitHub上最流行而常用的React组件库。</p>

## 二、组件库的安装和使用：

```js
// ====== Material-ui
// 1. 安装
$ yarn add @mui/material @emotion/react @emotion/styled
// OR
$ npm install @mui/material @emotion/react @emotion/styled

// 2. 使用
// Material-ui的使用非常简单，直接在页面模块中 按需引入 即可。其他组件库可以详见官网文档（地址附在文末）
import * as React from 'react';
import Button from '@mui/material/Button';

function App() {
  return <Button variant="contained">Hello World</Button>;
}
```

```js
// ====== Ant Design
// 1. 安装
$ yarn add antd
// OR
$ npm install antd --save

// 2. 使用
// 2.1 按需引入组件
import { DatePicker } from 'antd';
// 2.2 引入样式
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
// 2.3 具体使用
ReactDOM.render(<DatePicker />, mountNode);
```

参考地址：<br/>
<a href="https://ant.design/index-cn" target="_blank">Ant Design（中文版）</a><br />
<a href="https://mui.com/zh/" target="_blank">Material-ui</a><br />
