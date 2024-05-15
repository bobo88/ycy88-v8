# 设计模式 - 策略模式

```js
/**
 * 策略模式的定义:
 * 定义一系列的算法， 把他们封装起来，并且他们之间可以相互替换
 * 核心：将算法的使用 和 算法的实现 分离开来
 */

// 方法一
class PS {
  calc(salary) {
    return salary * 4
  }
}
class PA {
  calc(salary) {
    return salary * 3
  }
}
class PB {
  calc(salary) {
    return salary * 2
  }
}

class Bouns {
  constructor() {
    this.salary = null
    this.strategy = null
  }
  setSalary(salary) {
    this.salary = salary
  }
  setStrategy(strategy) {
    this.strategy = strategy
  }
  getBouns() {
    return this.strategy.calc(this.salary)
  }
}
let bouns = new Bouns()
bouns.setSalary(10000)
bouns.setStrategy(new PS())
console.log('方法一：', bouns.getBouns())

// 方法二
let strategies = {
  S: function (salary) {
    return salary * 4
  },
  A: function (salary) {
    return salary * 3
  },
  B: function (salary) {
    return salary * 2
  },
}

let getBouns = function (level, salary) {
  return strategies[level](salary)
}
console.log('方法二：', getBouns('S', 10000))
```
