# Hooks Use

React Hooks 是 React 16.8 引入的一组功能，它们让你在不编写 class 组件的情况下使用状态和其他 React 特性。Hooks 的主要目的是让代码更简洁、更易于理解和维护。

## 一、 `useState`

`useState` 是一个用于在函数组件中添加状态的 Hook。它返回一个状态值和一个更新该状态的函数。

### 语法：

```javascript
const [state, setState] = useState(initialState)
```

### 示例：

```javascript
import React, { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

## 二、 `useEffect`

`useEffect` 是一个在函数组件中执行副作用的 Hook。它可以用来代替生命周期方法，比如 `componentDidMount` 和 `componentDidUpdate`。

### 语法：

```javascript
useEffect(() => {
  // effect
  return () => {
    // cleanup
  }
}, [dependencies])
```

### 示例：

```javascript
import React, { useState, useEffect } from 'react'

function Example() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `You clicked ${count} times`
  }, [count]) // Only re-run the effect if count changes

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

## 三、 `useContext`

`useContext` 允许你在组件中使用上下文。它可以用来避免通过层层传递 props。

### 语法：

```javascript
const value = useContext(MyContext)
```

### 示例：

```javascript
import React, { useContext } from 'react'

const MyContext = React.createContext()

function Display() {
  const value = useContext(MyContext)
  return <div>{value}</div>
}

function App() {
  return (
    <MyContext.Provider value="Hello, World!">
      <Display />
    </MyContext.Provider>
  )
}
```

## 四、 `useReducer`

`useReducer` 是一种用来管理复杂状态逻辑的 Hook。它类似于 Redux，但它是内置的并且更轻量。

### 语法：

```javascript
const [state, dispatch] = useReducer(reducer, initialState)
```

### 示例：

```javascript
import React, { useReducer } from 'react'

const initialState = { count: 0 }

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      throw new Error()
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  )
}
```

## 五、 `useRef`

`useRef` 返回一个可变的 ref 对象，该对象的 `.current` 属性被初始化为传递的参数。它在整个组件的生命周期内持续存在。

### 语法：

```javascript
const refContainer = useRef(initialValue)
```

### 示例：

```javascript
import React, { useRef, useEffect } from 'react'

function TextInputWithFocusButton() {
  const inputEl = useRef(null)

  const onButtonClick = () => {
    inputEl.current.focus()
  }

  return (
    <div>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </div>
  )
}
```

## 六、 `useMemo`

`useMemo` 返回一个 memoized 值。当你需要记住计算结果并在依赖项未改变时重用它，以避免不必要的计算时使用。

### 语法：

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])
```

### 示例：

```javascript
import React, { useMemo, useState } from 'react'

function ExpensiveComponent({ a, b }) {
  const [count, setCount] = useState(0)

  const expensiveValue = useMemo(() => {
    return computeExpensiveValue(a, b)
  }, [a, b])

  return (
    <div>
      <p>Expensive value: {expensiveValue}</p>
      <button onClick={() => setCount(count + 1)}>Re-render</button>
    </div>
  )
}

function computeExpensiveValue(a, b) {
  console.log('Computing...')
  return a + b
}
```

## 七、 `useCallback`

`useCallback` 返回一个 memoized 回调函数。当你需要记住一个回调函数，并在依赖项未改变时重用它，以避免不必要的函数重建时使用。

### 语法：

```javascript
const memoizedCallback = useCallback(() => {
  doSomething(a, b)
}, [a, b])
```

### 示例：

```javascript
import React, { useState, useCallback } from 'react'

function CallbackComponent() {
  const [count, setCount] = useState(0)

  const handleClick = useCallback(() => {
    console.log('Button clicked', count)
  }, [count])

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={handleClick}>Log Count</button>
    </div>
  )
}
```

## 八、总结

- **`useState`**: 用于管理组件内部的状态。
- **`useEffect`**: 用于执行副作用（例如数据获取、订阅等）。
- **`useContext`**: 用于共享状态。
- **`useReducer`**: 用于复杂状态逻辑的管理。
- **`useRef`**: 用于访问 DOM 元素或存储 mutable 值。
- **`useMemo`**: 用于记住计算结果。
- **`useCallback`**: 用于记住回调函数。

---

- [react-use](https://github.com/streamich/react-use)
- [react-hooks](https://github.com/alibaba/hooks)
