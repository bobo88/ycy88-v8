# 数组的 reduce

## 数组 reduce 的格式含义

```js
/**
 * 格式一：
 * arr.reduce(function(prev, cur, index, arr){
 * ...
 * })
 *
 * 格式二：
 * arr.reduce(function(prev, cur, index, arr){
 * ...
 * }, init)
 *
 *  其中，各参数的含义是；
 * arr: 表示原数组
 * prev: 表示上一次调用回调时的返回值，或者初始值 init；
 * index: 表示当前正在处理的数组元素的索引，若提供 init 值，则索引为0，否则索引为1；
 * init: 表示初始值。
 */
```

## 常见的用法

```js
// 数组的reduce
let arr = [1, 2, 3, 4]
// 求和
let sum = arr.reduce((prev, cur) => prev + cur)
console.log('求和为：', sum)

// 求积
let mul = arr.reduce((prev, cur) => prev * cur)
console.log('求积为：', mul)

let arr2 = [1, 1, 2, 2, 3, 5, 4, 4, 5, 5, 6]
// 计算每个元素出现的次数
let itemTimes = arr2.reduce((prev, cur) => {
  // 注意：对象用in来判断是否存在
  if (cur in prev) {
    prev[cur]++
  } else {
    prev[cur] = 1
  }
  return prev
}, {})
console.log('计算每个元素出现的次数:', itemTimes)

// 数组去重
let newArr = arr2.reduce((prev, cur) => {
  if (prev.includes(cur)) {
    return prev
  } else {
    return prev.concat(cur)
  }
}, [])
console.log('数组去重: ', newArr)

// 将多维数组转为一维数组
let arr3 = [1, 2, 3, [4, 5], [6, 7], [8, 9, [10]]]
let flatArr = function (arr) {
  return arr.reduce((prev, cur) => {
    return prev.concat(Array.isArray(cur) ? flatArr(cur) : cur)
  }, [])
}
console.log('将二维数组转为一维数组: ', flatArr(arr3))
```
