# 深拷贝&浅拷贝

深拷贝：是复制另外一个空间，两个不会受到影响。<br/>
浅拷贝：是拷贝一个地址链接，任何一个变化都会影响到另外一个的变化。<br>
解构赋值：一维数组是深拷贝，二维和多维是浅拷贝。

## 日常工作中如何深拷贝的？

JSON.parse(JSON.stringify(obj));<br>
副作用：对于一些特殊的，处理会出错，比如 function,RegExp,Date 等<br>
如何解决？ <br>

- 1.自己写一个深拷贝函数。
- 2.通过工具函数，lodash

## 手动实现一个深拷贝

思路：

1. 首先要判断数据的类型,null 和基础类型(String,Number,Booblean)直接返回.
2. 判断对象的类型，array 和可以 for in 的对象，通过 for in 递归拷贝.
3. 处理其他对象类型,function,Map,Set,Symbol,RegExp,Date 等.

```js
//手写深拷贝
/**
 * 参考地址:https://www.cnblogs.com/echolun/p/16157161.html
 *
 **/

//是否是对象
let isObject = (data, map = new Map()) => {
  const type = typeof data
  return data !== null && (type === 'object' || type === 'function')
}

//判断对象类型
let getObjectType = (obj) => {
  return Object.prototype.toString.call(obj)
}

//克隆正则
let cloneRegExp = (obj) => {
  const { source, flags, lastIndex } = obj
  let obj_ = new RegExp(source, flags)
  obj_.lastIndex = lastIndex
  return obj_
}
//克隆其他
let cloneOtherObject = (obj, type) => {
  const basicTypes = [
    '[object Boolean]',
    '[object Number]',
    '[object String]',
    '[object Date]'
  ]
  if (basicTypes.includes(type)) {
    return new obj.constructor(obj.valueOf())
  }
  if (type === '[object Symbol]') {
    return Object(obj.valueOf)
  }
  if (type === '[object RegExp]') {
    return cloneRegExp(obj)
  }
  if (type === '[object Function]') {
    return obj
  }
}
//深拷贝
let deepClone = (data, map = new Map()) => {
  if (!isObject(data)) {
    return data
  }
  let obj
  const objType = getObjectType(data)
  const ergodicTypes = [
    '[object Array]',
    '[object Object]',
    '[object Set]',
    '[object Map]'
  ]
  if (ergodicTypes.includes(objType)) {
    obj = new data.constructor()
  } else {
    return cloneOtherObject(data, objType)
  }
  //处理循环引用问题，防止栈溢出
  if (map.has(data)) {
    return map.get(data)
  }
  map.set(data, obj)
  //拷贝Set
  if (objType === '[object Set]') {
    obj.forEach((val, key) => {
      obj.add(key, deepClone(val))
    })
    return obj
  }
  //拷贝Map
  if (objType === '[object Map]') {
    obj.forEach((val, key) => {
      obj.set(key, deepClone(val))
    })
    return obj
  }
  //拷贝数组和{}
  for (let key in data) {
    obj[key] = deepClone(data[key], map)
  }
  return obj
}
let obj = {
  name: '听风',
  age: 29,
  other: {
    gender: 'male',
    arr: [1, 2, 3]
  }
}
deepClone(obj)
```
