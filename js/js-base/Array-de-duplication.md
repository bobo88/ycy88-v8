# 数组去重

```js
// 数组去重
let arr = [1, 1, 2, 2, 3, 5, 4, 4, 5, 5, 6]
console.info('原数组为：', arr)
```

## 方法一：利用 Set 进行数组去重

```js
// 利用Set进行数组去重
let setArr = [...new Set(arr)]
console.info('利用Set进行数组去重:', setArr)
```

## 方法二：利用 for 循环进行去重

```js
// 利用for循环进行去重
let forArr = []
for (let i = 0; i < arr.length; i++) {
  if (!forArr.includes(arr[i])) {
    forArr.push(arr[i])
  }
}
console.log('利用for循环进行去重:', forArr)
```

## 方法三：利用 indexOf 进行数组去重

```js
// 利用indexOf进行数组去重
let indexOfArr = []
for (let i = 0; i < arr.length; i++) {
  if (indexOfArr.indexOf(arr[i]) === -1) {
    indexOfArr.push(arr[i])
  }
}
console.log('利用indexOf进行数组去重:', indexOfArr)
```

## 方法四：利用对象进行数组去重

```js
// 利用对象进行数组去重
let tempObj = {}
let objGetArr = []
for (let i = 0; i < arr.length; i++) {
  if (!tempObj[arr[i]]) {
    tempObj[arr[i]] = 1
    objGetArr.push(arr[i])
  }
}
console.log('利用对象进行数组去重:', objGetArr)
```

## 方法五：利用 reduce 进行数组去重

```js
// 利用reduce进行数组去重
let newArr = arr.reduce((prev, cur) => {
  if (prev.includes(cur)) {
    return prev
  } else {
    return prev.concat(cur)
  }
}, [])
console.info('利用reduce进行数组去重: ', newArr)
```
