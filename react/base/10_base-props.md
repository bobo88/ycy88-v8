# React 清单 - props

属性是由父组件传递给子组件的数据，只读不可变。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}

const element = <Welcome name="Sara" />
ReactDOM.render(element, document.getElementById('root'))
```

## 一、props
