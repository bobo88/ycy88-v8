# React 清单 - 生命周期

::: tip 生命周期
Mounting(挂载)：已插入真实 DOM <br/>
Updating(更新)：正在被重新渲染 <br/>
Unmounting(卸载)：已移出真实 DOM <br/>
:::

## 一、旧的生命周期：

![An image](/images/prev/lifecycle_react_old.jpeg)

```js
// 1. 挂载
constructor
componentWillMount
render
componentDidMount

// 2. 更新
componentWillReceiveProps
shouldComponentUpdate
componentWillUpdate
render
componentDidUpdate

// 3. 卸载
componentWillUnmount
```

## 二、新的生命周期：

![An image](/images/prev/lifecycle_react_new.jpg)

```js
// 1. 挂载
constructor
getDerivedStateFromProps
render
componentDidMount

// 2. 更新
getDerivedStateFromProps
shouldComponentUpdate
render
getSnapshotBeforeUpdate
componentDidUpdate

// 3. 卸载
componentWillUnmount
```

## 三、新旧生命周期对比

```js
// 1. 挂载
// 旧 ------------------------------- 新
// constructor                      constructor                 // 相同
// componentWillMount               getDerivedStateFromProps    // 不同
// render                           render                      // 相同
// componentDidMount                componentDidMount           // 相同

// 2. 更新
// 旧 ------------------------------- 新
// componentWillReceiveProps        getDerivedStateFromProps    // 不同
// shouldComponentUpdate            shouldComponentUpdate       // 相同
// componentWillUpdate                                          // 不同
// render                           render                      // 相同
//                                  getSnapshotBeforeUpdate     // 不同
// componentDidUpdate               componentDidUpdate          // 相同

// 3. 卸载
// componentWillUnmount             componentWillUnmount        // 相同
```

得出结论：React 从 v16.3 开始废弃 componentWillMount componentWillReceiveProps componentWillUpdate 三个钩子函数（三个带 Will 的）。

## 四、父子组件生命周期的执行顺序

以 React 18 为例，结合上面的 新的生命周期 图来分析：

```js
// 1. 父子组件初始化
// Parent 组件： constructor
// Parent 组件： getDerivedStateFromProps
// Parent 组件： render
// Child  组件： constructor
// Child  组件： getDerivedStateFromProps
// Child  组件： render
// Child  组件： componentDidMount
// Parent 组件： componentDidMount

// 2. 子组件修改自身状态 state
// Child 组件： getDerivedStateFromProps
// Child 组件： shouldComponentUpdate
// Child 组件： render
// Child 组件： getSnapshotBeforeUpdate
// Child 组件： componentDidUpdate

// 3. 修改父组件中传入子组件的 props
// Parent 组件： getDerivedStateFromProps
// Parent 组件： shouldComponentUpdate
// Parent 组件： render
// Child  组件： getDerivedStateFromProps
// Child  组件： shouldComponentUpdate
// Child  组件： render
// Child  组件： getSnapshotBeforeUpdate
// Parent 组件： getSnapshotBeforeUpdate
// Child  组件： componentDidUpdate
// Parent 组件： componentDidUpdate

// 4. 卸载子组件
// Parent 组件： getDerivedStateFromProps
// Parent 组件： shouldComponentUpdate
// Parent 组件： render
// Parent 组件： getSnapshotBeforeUpdate
// Child  组件： componentWillUnmount
// Parent 组件： componentDidUpdate

// 5. 重新挂载子组件
// Parent 组件： getDerivedStateFromProps
// Parent 组件： shouldComponentUpdate
// Parent 组件： render
// Child  组件： constructor
// Child  组件： getDerivedStateFromProps
// Child  组件： render
// Parent 组件： getSnapshotBeforeUpdate
// Child  组件： componentDidMount
// Parent 组件： componentDidUpdate
```

父子组件生命周期执行顺序总结：

- 当子组件自身状态改变时，不会对父组件产生副作用的情况下，父组件不会进行更新，即不会触发父组件的生命周期
- 当父组件中状态发生变化（包括子组件的挂载以及卸载）时，会触发自身对应的生命周期以及子组件的更新
  - render 以及 render 之前的生命周期，则 父组件先执行
  - render 以及 render 之后的声明周期，则子组件先执行，并且是与父组件交替执行
  - 当子组件进行卸载时，只会执行自身的 componentWillUnmount 生命周期，不会再触发别的生命周期

DEMO 验证：<br />
<a href="https://ycy88.com/other" target="_blank">父子组件生命周期的执行顺序</a><br />

参考：<br />
<a href="https://juejin.cn/post/6914112105964634119" target="_blank">深入详解 React 生命周期</a><br />
