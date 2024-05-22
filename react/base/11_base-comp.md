# React 清单 - 组件

## 一、类组件

```jsx
import React, { Component } from 'react'

class Welcome extends Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}

export default Welcome
```

## 二、函数式组件

```jsx
import React from 'react'

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}

export default Welcome
```

## 三、组件通信传参

### 1. 类组件

TODO...

### 2. 函数式组件

```jsx
import React, { useState } from 'react'

// 子组件
function Son(props) {
  return (
    <>
      <h3>子组件 - {props.num}</h3>
      <button onClick={() => props.setNum(2)}>修改num</button>
    </>
  )
}
// 父组件
function Father(props) {
  return <Son num={props.num} setNum={props.setNum} />
}
function App() {
  const [num, setNum] = useState(1)
  return <Father num={num} setNum={setNum} />
}
export default App
```

```jsx
// createContext(): Provider / Consumer

// useContext
```
