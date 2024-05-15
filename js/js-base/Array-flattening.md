# 数组扁平化处理

```js
// 数组扁平化处理
let arr = [1, [2, 3], 4, [5, 6], 7]

// 方法一
let arr1 = arr.flat(Infinity)
console.log('方法一：', arr1)

// 方法二  利用apply + some
// 利用arr.some判断当数组中还有数组的话，递归调用steamroller2扁平函数(利用apply扁平), 用concat连接，最终返回arr;
function steamroller2(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat.apply([], arr)
  }
  return arr
}
console.log('方法二：', steamroller2(arr))

// 方法三   reduce方法
// 当数组中还有数组的话，递归调用steamroller3扁平函数(利用reduce扁平), 用concat连接，最终返回arr.reduce的返回值;
function steamroller3(arr) {
  return arr.reduce((prev, next) => {
    return prev.concat(Array.isArray(next) ? steamroller3(next) : next)
  }, [])
}
console.log('方法三：', steamroller3(arr))

// 方法四  循环数组+递归调用
function steamroller(arr) {
  // 1.创建一个新数组，保存扁平后的数据
  var newArr = []
  // 2.for循环原数组
  for (var i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      // 如果是数组，调用steamroller 将其扁平化
      // 然后在push 到newArr中
      newArr.push.apply(newArr, steamroller(arr[i]))
    } else {
      // 反之 不是数组，直接push进newArr
      newArr.push(arr[i])
    }
  }
  // 3.返回新的数组
  return newArr
}
console.log('方法四：', steamroller(arr))

// 方法五   es6 展开运算符
// 利用arr.some判断当数组中还有数组的话，递归调用flatten扁平函数(利用es6展开运算符扁平), 用concat连接，最终返回arr;
function steamroller4(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    // arr = [].concat.apply([], arr)
    arr = [].concat(...arr)
  }
  return arr
}
console.log('方法五：', steamroller4(arr))

// 方法六 利用正则表达式
let arrStr = JSON.stringify(arr).replace(/\[|\]/g, '')
let newArr = arrStr.split(',').map((i) => Number(i))
console.log('方法六：', newArr)
```

## 备注：flat 的实现逻辑

```js
// flat的实现逻辑
Array.prototype.flat = function (count) {
  let c = count || 1
  let len = this.length
  let ret = []
  if (this.length == 0) return this
  while (c--) {
    let _arr = []
    let flag = false
    if (ret.length == 0) {
      flag = true
      for (let i = 0; i < len; i++) {
        if (this[i] instanceof Array) {
          ret.push(...this[i])
        } else {
          ret.push(this[i])
        }
      }
    } else {
      for (let i = 0; i < ret.length; i++) {
        if (ret[i] instanceof Array) {
          flag = true
          _arr.push(...ret[i])
        } else {
          _arr.push(ret[i])
        }
      }
      ret = _arr
    }
    if (!flag && c == Infinity) {
      break
    }
  }
  return ret
}
```
