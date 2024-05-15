# 找出数组中最大值的几种方法

```js
// 找出数组中最大值的几种方法
// 原数组
const originArr = [1, 2, 3, 5, 100, -100, 100, 20, 50, 60, 12, 99]

// 方法一：利用reduce
let getMax1 = originArr.reduce((prev, cur) => {
  if (prev > cur) {
    return prev
  } else {
    return cur
  }
})
console.log('getMax1:', getMax1)

// 方法二：利用sort（a-b排序从小到大，b-a排序从大到小）
let getMax2 = originArr.sort((a, b) => b - a)[0]
console.log('getMax2:', getMax2)

// 方法三：利用Math.max
let getMax3 = Math.max(...originArr)
console.log('getMax3:', getMax3)

// 方法四：普通的for循环
let getMax4 = originArr[0]
for (let i = 0; i < originArr.length; i++) {
  originArr[i] > getMax4 ? (getMax4 = originArr[i]) : null
}
console.log('getMax4:', getMax4)

// 方法五：ES5的apply
let getMax5 = Math.max.apply(null, originArr)
console.log('getMax5:', getMax5)

// 方法六：利用数组的flat方法
let getMax6 = originArr.flat()[0]
console.log('getMax6:', getMax6)

// 方法七：利用filter / forEach / map，原理与for类似
let getMax7 = originArr[0]
// filter:
originArr.filter((i) => {
  i > getMax7 ? (getMax7 = i) : null
})
// map:
// originArr.map(i => {
//     i > getMax7 ? getMax7 = i : null
// })
// forEach:
// originArr.forEach(i => {
//     i > getMax7 ? getMax7 = i : null
// })
console.log('getMax7:', getMax7)
```
