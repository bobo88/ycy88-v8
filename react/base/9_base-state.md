# React 清单 - state

状态是由组件管理的数据，可以通过 `this.state` 访问和 `this.setState` 更新。

```jsx
import React, { Component } from 'react'

class Clock extends Component {
  constructor(props) {
    super(props)
    this.state = { date: new Date() }
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({ date: new Date() })
  }

  render() {
    return <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
  }
}

export default Clock
```

## 一、state
