# React 清单 - Hooks

Hook 是 【React 16.8】 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

Hook 就是 JavaScript 函数，但是使用它们会有两个额外的规则：

- 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。
- 只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。

## 一、常见的 React Hook

::: tip 1. State Hook
useState 让函数式组件能够使用 state <br/>
useState 会返回一对值：当前状态和一个让你更新它的函数
:::

```tsx
// 1. State Hook
import React, { useState } from 'react'

function Example() {
  // useState() 方法里面唯一的参数就是初始 state。
  // 声明一个叫 “count” 的 state 变量。
  const [count, setCount] = useState(0)
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
// 注意：不像 class 中的 this.setState，更新 state 变量总是替换它而不是合并它。
// class 示例对应的是： this.state / this.setState()
```

注意： Hook 在 class 内部是不起作用的。但你可以使用它们来取代 class 。

::: tip 2. Effect Hook
useEffect 让函数式组件可以模拟生命周期方法，并进行副作用操作 <br/>
useEffect 相当于 class Component 中的 componentDidMount、componentDidUpdate、componentWillUnmount 三个生命周期的综合。<br/>
如果你的 effect 返回一个函数，React 将会在执行清除操作时调用它。<br/>
effect 的清除阶段在每次重新渲染时都会执行。
:::

<h4 style="color:#f60">Tip: 使用多个 Effect 实现关注点分离 （对比VUE 2.x 和 VUE3.x）</h4>

与 VUE 2.x 的 Options API 开发模式类似，React 的 class 组件中的生命周期函数经常包含不相关的逻辑，又把相关的逻辑分离到几个不同的方法中。<br/>
所以在 VUE 3 中提出了 Composition API 开发模式，这与 React Hook 是 异曲同工 之处，均是将业务逻辑进行高内聚，实现关注点分离。

```jsx
// 2.  Effect Hook
import React, { useState, useEffect } from 'react'

function Example() {
  const [count, setCount] = useState(0)

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`
  })

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}

// 提示： effect 的清除阶段在每次重新渲染时都会执行。
// 提示： 通过跳过 Effect 进行性能优化
// 截取上述代码的一部分进行修改
useEffect(() => {
  // 使用浏览器的 API 更新页面标题
  document.title = `You clicked ${count} times`
}, [count]) // 仅在 count 更改时更新
// 未来版本，可能会在构建时自动添加第二个参数。

// 备注： 在 class 组件中，我们可以通过在 componentDidUpdate 中添加对 prevProps 或 prevState 的比较逻辑解决
```

::: tip 3. 自定义 Hook
Hook 是一种复用状态逻辑的方式，它不复用 state 本身。每个组件间的 state 是完全独立的。 <br/>
自定义 Hook 更像是一种约定而不是功能。如果函数的名字以 “use” 开头并调用其他 Hook，我们就说这是一个自定义 Hook。
:::

自定义 Hook 必须以 “use” 开头吗？必须如此。这个约定非常重要。不遵循的话，由于无法判断某个函数是否包含对其内部 Hook 的调用，React 将无法自动检查你的 Hook 是否违反了 Hook 的规则。

```jsx
import { useState, useEffect } from 'react'

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null)

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline)
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange)
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange)
    }
  })

  return isOnline
}
```

::: tip 4. 其他 Hook
useContext 让你不使用组件嵌套就可以订阅 React 的 Context。 <br/>
useReducer 可以让你通过 reducer 来管理组件本地的复杂 state。
:::

```html
<!-- ====== 基础 Hook -->
useState useEffect useContext

<!-- ====== 额外的 Hook -->
useReducer
<!-- useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。 -->
useCallback useMemo useRef useImperativeHandle useLayoutEffect useDebugValue
useDeferredValue useTransition useId

<!-- ====== Library Hooks -->
useSyncExternalStore useInsertionEffect
```

DEMO 验证：<br />
<a href="https://ycy88.com/other" target="_blank">Hook useState/useEffect VS class 组件</a><br />

参考：<br />
<a href="https://zh-hans.reactjs.org/docs/hooks-intro.html" target="_blank">Hook 简介</a><br />
<a href="https://github.com/facebook/react/blob/main/packages/react/src/ReactHooks.js" target="_blank">facebook/react/ReactHooks.js 源码</a><br />
<a href="https://zh-hans.reactjs.org/docs/hooks-faq.html" target="_blank">Hooks FAQ</a><br />
<a href="https://www.npmjs.com/package/eslint-plugin-react-hooks" target="_blank">eslint-plugin-react-hooks</a><br />
