# 详解字符串 String 中的常见方法

_字符串 String 中的方法比较多，我将其中的常见方法进行大致归类，详情请参考下文：_

_备注：下面 demo 中将会使用的测试字符串_

```js
// 测试用的字符串
let str = '12Abc34'
let str2 = ' 12Abc34 '
```

## 一、关于返回指定位置的字符

```js
// - charAt :
//    - 作用： 返回指定位置的字符
//    - 语法： str.charAt(index)
//    - 解释： index必需，表示字符串中某个位置的数字，即字符在字符串中的下标

// - charCodeAt :
//    - 作用： 返回指定位置的字符的 Unicode 编码。这个返回值是 0 - 65535 之间的整数
//    - 语法： str.charCodeAt(index)
//    - 解释： index必需，表示字符串中某个位置的数字，即字符在字符串中的下标
console.log(str.charAt(2)) // A
console.log(str.charCodeAt(2)) // 65
```

## 二、关于字符串补全

```js
// - padStart :
//    - 作用： 用于头部补全
//    - 语法： str.padStart(targetLength [, padString])
//    - 解释：
//      targetLength: 当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
//      padString: 填充字符串。此参数的缺省值为 " "。

// - padEnd :
//    - 作用： 用于尾部补全
//    - 语法： str.padEnd(targetLength [, padString])
//    - 解释：
//      targetLength: 当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
//      padString: 填充字符串。此参数的缺省值为 " "。

// - repeat :
//    - 作用： 构造并返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本
//    - 语法： str.repeat(count)
//    - 解释： count： 介于 0 和 +Infinity 之间的整数。表示在新构造的字符串中重复了多少遍原字符串。
console.log(str.padStart(9, 'X')) // XX12Abc34
console.log(str.padEnd(9, 'Y')) // 12Abc34YY
console.log(str.repeat(2)) // 12Abc3412Abc34
```

## 三、关于正则匹配

```js
// - match :
//    - 作用： 检索返回一个字符串匹配正则表达式的结果
//    - 语法： str.match(regexp)
//    - 解释：
//      regexp: 一个正则表达式对象。如果不传此参数，你将会得到一个包含空字符串的 Array ：[""]

// - matchAll :
//    - 作用： 返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器
//    - 语法： str.matchAll(regexp)
//    - 返回值： 一个迭代器（不可重用，结果耗尽需要再次调用方法，获取一个新的迭代器）
//    - 解释：
//      regexp: 一个正则表达式对象。RegExp必须是设置了全局模式g的形式，否则会抛出异常TypeError。

// - replace :
//    - 作用： 返回一个由替换值（replacement）替换部分或所有的模式（pattern）匹配项后的新字符串。
//    - 语法： str.replace(regexp|substr, newSubStr|function)
//    - 解释：
//      regexp (pattern)：一个RegExp 对象或者其字面量。
//      substr (pattern)：一个将被 newSubStr 替换的 字符串。
//      newSubStr (replacement)：用于替换掉第一个参数在原字符串中的匹配部分的字符串。
//      function (replacement)：一个用来创建新子字符串的函数，该函数的返回值将替换掉第一个参数匹配到的结果。

// - replaceAll :
//    - 作用： 返回一个新字符串，新字符串所有满足 pattern 的部分都已被replacement 替换
//    - 语法： str.replaceAll(regexp|substr, newSubstr|function)
//    - 解释：
//      regexp: 一个正则表达式对象。RegExp必须是设置了全局模式g的形式，否则会抛出异常TypeError。

// - search :
//    - 作用： 执行正则表达式和 String 对象之间的一个搜索匹配
//    - 语法： str.search(regexp)
//    - 返回值：如果匹配成功，则 search() 返回正则表达式在字符串中首次匹配项的索引;否则，返回 -1
//    - 解释：
//      regexp： 一个正则表达式（regular expression）对象
let regx = /[A-Z]/g
console.log(str.match(regx)) // ["A"]
console.log(str.matchAll(regx)) // RegExpStringIterator {}
console.log(str.replace(/\d/g, '*')) // **Abc**
console.log(str.replaceAll(/\d/g, '*')) // **Abc**
console.log('12AAAbc34'.replaceAll('A', '*')) // 12***bc34
console.log(str.search('A')) // 2
```

## 四、关于字符串截取与拼接

```js
// - split :
//    - 作用： 使用指定的分隔符字符串将一个String对象分割成子字符串数组，以一个指定的分割字串来决定每个拆分的位置
//    - 语法： str.split([separator[, limit]])
//    - 解释：
//      separator： 指定表示每个拆分应发生的点的字符串
//      limit： 一个整数，限定返回的分割片段数量

// - substring :
//    - 作用： 返回一个字符串在开始索引到结束索引之间的一个子集, 或从开始索引直到字符串的末尾的一个子集
//    - 语法： str.substring(indexStart[, indexEnd])
//    - 解释：
//      indexStart: 需要截取的第一个字符的索引，该索引位置的字符作为返回的字符串的首字母
//      indexEnd: 可选。一个 0 到字符串长度之间的整数，以该数字为索引的字符不包含在截取的字符串内

// - slice :
//    - 作用： 提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串
//    - 语法： str.slice(beginIndex[, endIndex])
//    - 解释：
//      beginIndex: 从该索引（以 0 为基数）处开始提取原字符串中的字符
//      endIndex: 可选。在该索引（以 0 为基数）处结束提取字符串

// - concat :  ***** 强烈建议使用赋值操作符（+, +=）代替 concat 方法 *****
//    - 作用： 将一个或多个字符串与原字符串连接合并，形成一个新的字符串并返回
//    - 语法： str.concat(str2, [, ...strN])
//    - 解释：
//      str2 [, ...strN]: 需要连接到 str 的字符串

// - substr :  ***** 并非JavaScript核心语言的一部分，未来将可能会被移除掉 *****
//    - 作用： 返回一个字符串中从指定位置开始到指定字符数的字符
//    - 语法： str.substr(start[, length])
//    - 解释：
//      start： 开始提取字符的位置
//      length：可选。提取的字符数
console.log(str.split('')) // ["1", "2", "A", "b", "c", "3", "4"]
// 注意：slice和substring的差别在于slice的参数可以是负数，而substring不行
console.log(str.substring(2, 5)) // Abc
console.log(str.slice(2, 5)) // Abc
console.log(str.concat('x', 'y', 'z')) // 12Abc34xyz
console.log(str.substr(2, 3)) // Abc
```

## 五、关于字符串搜索

```js
// - indexOf :
//    - 作用： 方法返回调用它的 String 对象中第一次出现的指定值的索引，从 fromIndex 处进行搜索。如果未找到该值，则返回 -1
//    - 语法： str.indexOf(searchValue [, fromIndex])
//    - 解释：
//      searchValue: 要被查找的字符串值
//      fromIndex: 可选, 数字表示开始查找的位置。可以是任意整数，默认值为 0

// - lastIndexOf :
//    - 作用：返回调用String对象的指定值最后一次出现的索引，在一个字符串中的指定位置fromIndex处从后向前搜索。如果没找到这个特定值则返回-1
//    - 语法： str.lastIndexOf(searchValue[, fromIndex])
//    - 解释：
//      searchValue: 要被查找的字符串值。如果searchValue是空字符串，则返回fromIndex
//      fromIndex: 可选, 待匹配字符串searchValue的开头一位字符从 str的第fromIndex位开始向左回向查找

// - includes :
//    - 作用： 用于判断一个字符串是否包含在另一个字符串中，根据情况返回 true 或 false
//    - 语法： str.includes(searchString[, position])
//    - 解释：
//      searchString: 要在此字符串中搜索的字符串
//      position 可选: 从当前字符串的哪个索引位置开始搜寻子字符串，默认值为 0

// - startsWith :
//    - 作用： 用来判断当前字符串是否以另外一个给定的子字符串开头，并根据判断结果返回 true 或 false
//    - 语法： str.startsWith(searchString[, position])
//    - 解释：
//      searchString: 要搜索的子字符串
//      position 可选: 在 str 中搜索 searchString 的开始位置，默认值为 0

// - endsWith :
//    - 作用： 用来判断当前字符串是否是以另外一个给定的子字符串“结尾”的，根据判断结果返回 true 或 false
//    - 语法： str.endsWith(searchString[, length])
//    - 解释：
//      searchString: 要搜索的子字符串
//      length 可选: 作为 str 的长度。默认值为 str.length
console.log('12AAAbc34'.indexOf('A')) // 2
console.log('12AAAbc34'.lastIndexOf('A')) // 4
console.log(str.includes('A')) // true
console.log(str.startsWith('A', 2)) // true
console.log(str.endsWith('A')) // false
console.log(str.endsWith('A', 3)) // true
```

## 六、关于字符串大小写 & 移除前后空白

```js
// // 大小写相关
// toLocaleLowerCase: ƒ toLocaleLowerCase()
// toLocaleUpperCase: ƒ toLocaleUpperCase()
// toLowerCase: ƒ toLowerCase()
// toUpperCase: ƒ toUpperCase()

// // 移除字符串首尾空白
// trim: ƒ trim()
// trimEnd: ƒ trimEnd()
// trimStart: ƒ trimStart()
// trimLeft: ƒ trimStart()
// trimRight: ƒ trimEnd()
console.log(str.toLowerCase()) // `12abc34`
console.log(str.toUpperCase()) // `12ABC34`
console.log(str2.trim()) // `12Abc34`
console.log(str2.trimEnd()) // ` 12Abc34`  与 trimRight 效果一致
console.log(str2.trimStart()) // `12Abc34 `  与 trimLeft 效果一致
```
