# 逻辑或/逻辑与的用法

**首先，我们先了解一下，哪些表达式会可以转换为 false：**

- null
- NaN
- 0
- '' or "" or ``
- undefined

**然后，我们要清楚 ’&&‘、’||‘、'!' 的具体语法含义：**

- &&:
  - 语法结构：expr1 && expr2
  - 解释：在 `expr1` 能转换为 `true` 的情况下，则执行 `expr2`，否则不执行 `expr2`。
- ||:
  - 语法结构：expr1 || expr2
  - 解释：在 `expr1` 能转换为 `true` 的情况下，则不执行 `expr2`，否则执行 `expr2`。
- !:
  - 语法结构：!expr1
  - 解释：将 `expr1` 进行取反操作

**另外，需要了解的一些基础知识：**

- `&&` 运算符会在 `||` 运算符之前执行
- `!!` 双重否定可以将表达式的类型转换为布尔型，可以使用 `===` （全等）操作符
- 引用类型转换了 Boolean 均为 true，所以空数组和空对象进行布尔转换时均转换为 true

## demo 时刻：

```js
// '&&'、'||'、'!'的常见用法
// -------------- demo ---------------
let a = true
let b = false
let res1, res2, res3, res4
res1 = a && b // false
res2 = b && a // false
res3 = a || b // true
res4 = b || a // true
// a/b 均为简单的布尔型变量
console.log('res1-4:', res1, res2, res3, res4) // false, false, true, true

// -------------- demo ---------------
let funA = function () {
  console.log('Function A is called')
  return true
}
let funB = function () {
  console.log('Function B is called')
  return false
}
let res5, res6, res7, res8
res5 = funA() && funB() // false
res6 = funB() && funA() // false
res7 = funA() || funB() // true
res8 = funB() || funA() // true
console.log('res5-8:', res5, res6, res7, res8) // false, false, true, true
// 通过上面打印出来的 Function A/B is called，可以得到以下结果
// - res5: funA 和 funB 均执行了
// - res6: funB 执行了，而 funA 并没有执行
// - res7: funA 执行了，而 funB 并没有执行
// - res8: funA 和 funB 均执行了
// 结论：
//    &&中，前一个表达式为false，就会不执行后面的表达式，短路与。
//    ||中，前一个表达式为true，就会不执行后面的表达式，短路或。

// -------------- demo ---------------
let res9 = true || (false && false) // true
let res10 = (true || false) && false // false
console.log('res9/res10:', res9, res10) // true false
// 结论：
//    `&&` 运算符会在 `||` 运算符之前执行
//    如果你不确定运算符的优先级，或者懒得去记住这些优先级，给运算表达式中添加 `()` 是个不错的选择

// -------------- demo ---------------
let res11 = !1 // false
let res12 = !0 // true
let res13 = !'A' // false
let res14 = !null // true
let res15 = !{} // false
console.log('res11-15:', res11, res12, res13, res14, res15) // false, true, false, true, false

// -------------- demo ---------------
let res16 = {}
console.log('res16 == true得到的值为: ', res16 == true) // false
console.log('res16 === true得到的值为: ', res16 === true) // false
console.log('res16 == false得到的值为: ', res16 == false) // false
console.log('res16 === false得到的值为: ', res16 === false) // false
console.log('取反操作1: ', !res16 == false) // true
console.log('取反操作2: ', !res16 === false) // true
console.log('取反操作3: ', !!res16 == true) // true
console.log('取反操作4: ', !!res16 === true) // true
// 结论：
//    - 空对象{}，比较特殊，不管用 `==` 还是 `===`，它既不等于 `true`，也不等于 `false`
//    - 更深层次的原因是：任意值与布尔值比较，都会将两边的值转化为Number。
//    - 而空对象{}转化为NaN，由于NaN与任何数都不相等

// -------------- demo ---------------
let res17 = 1
console.log('res17 == true得到的值为: ', res17 == true) // true
console.log('res17 === true得到的值为: ', res17 === true) // false
console.log('!!res17 === true得到的值为: ', !!res17 === true) // true
// 结论：
//    - 任意值与布尔值比较，都会将两边的值转化为Number
//    - `!!` 可以将 数值型 的res17 转换为 真正的 布尔型

// -------------- demo ---------------
let res18 = null
console.log(res18 > 0) // false
console.log(res18 == 0) // false
console.log(res18 >= 0) // true
// 结论：
//    - `res18 >= 0` 与 `res18 > 0` ：null 尝试转为number ,则为0
//    - `res18 == 0` ：null在设计上，在此处不尝试转型. 所以 结果为false
```
