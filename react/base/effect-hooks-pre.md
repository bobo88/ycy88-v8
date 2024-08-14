# hooks 添加前/后置方法

在 React 中，你可以使用 `useEffect` hook 来执行副作用，同时可以利用 JavaScript 的闭包特性来实现前置和后置方法的调用。

### 1. **前置方法**：在 `useEffect` 函数执行之前调用的逻辑。

### 2. **后置方法**：在 `useEffect` 函数执行之后调用的逻辑。通常是通过返回一个清理函数来实现。

下面是如何实现的步骤：

### 示例代码

```javascript
import React, { useEffect } from 'react'

function MyComponent() {
  // 定义前置方法
  const beforeEffect = () => {
    console.log('前置方法执行')
    // 在此处执行任何需要在 useEffect 之前运行的逻辑
  }

  // 定义后置方法
  const afterEffect = () => {
    console.log('后置方法执行')
    // 在此处执行任何需要在 useEffect 之后运行的逻辑
  }

  useEffect(() => {
    // 调用前置方法
    beforeEffect()

    // useEffect 主体逻辑
    console.log('useEffect 逻辑执行')

    // 返回一个清理函数，作为后置方法
    return () => {
      afterEffect()
    }
  }, []) // 依赖数组为空，意味着只在组件挂载和卸载时执行

  return (
    <div>
      <p>React useEffect 前置和后置方法示例</p>
    </div>
  )
}

export default MyComponent
```

### 代码解读

1. **前置方法 `beforeEffect`**：

   - 在 `useEffect` 的主体逻辑之前调用。这里你可以放任何需要在副作用逻辑执行前运行的代码。

2. **后置方法 `afterEffect`**：

   - 在 `useEffect` 的清理函数中调用。清理函数是在组件卸载或更新时执行，用于清理副作用，类似于执行后置方法。

3. **`useEffect` 内部逻辑**：

   - 这里的 `console.log('useEffect 逻辑执行')` 是你的主要副作用代码。

4. **依赖数组**：
   - 如果你只希望在组件挂载和卸载时执行这些方法，可以将依赖数组留空 (`[]`)。
   - 如果希望在某些状态或 props 变化时重新执行，可以将它们放入依赖数组中。

### 运行结果

- 当组件首次渲染时，`beforeEffect` 会先执行，然后是 `useEffect` 的主体逻辑。
- 当组件卸载或依赖项变化时，`afterEffect` 会执行，用于清理副作用。

这种模式可以让你在 React 的 `useEffect` 中很方便地添加前置和后置的逻辑。
