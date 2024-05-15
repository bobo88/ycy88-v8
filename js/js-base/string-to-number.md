# 如何将字符串型转换为数值型

## 常用的三种方式：

```js
// 将字符串型转换为数值型
let str = '123'
let str2 = '123R'
let str3 = 'R123'
let str4 = 'Infinity'
// 引申到布尔值 和 null等
let bool = true
let nullObj = null
let num = '1e3'
// 方式一： Number(str)
console.log(Number(str)) // 123
console.log(Number(str2)) // NaN
console.log(Number(str3)) // NaN
console.log(Number(str4)) // Infinity
console.log(Number(bool)) // 1
console.log(Number(nullObj)) // 0
console.log(Number(num)) // 1000
// 方式二： +str
console.log(+str) // 123
console.log(+str2) // NaN
console.log(+str3) // NaN
console.log(+str4) // Infinity
console.log(+bool) // 1
console.log(+nullObj) // 0
console.log(+num) // 1000
// 方式三： parseInt(str)
console.log(parseInt(str)) // 123
console.log(parseInt(str2)) // 123
console.log(parseInt(str3)) // NaN
console.log(parseInt(str4)) // NaN
console.log(parseInt(bool)) // NaN
console.log(parseInt(nullObj)) // NaN
console.log(parseInt(num)) // 1
```

_通过上面的代码我们可以分析得出几个结论：_

- `Number` :
  - 对任何不合法的数字都会返回 NaN
  - 但能转换`Infinity`、null，布尔值等
- `+` :
  - 和 `Number`的返回结果基本上类似
- `parseInt` :
  - 不是所有非数字都会返回 NaN。第一个字符不是数字时才返回 NaN
