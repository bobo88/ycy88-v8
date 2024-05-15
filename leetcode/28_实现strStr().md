# 28、实现strStr()

```js
;(function () {
  /**
     * 28. 实现 strStr()

     * 实现 strStr() 函数。
     * 给你两个字符串 haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串出现的第一个位置（下标从 0 开始）。
     * 如果不存在，则返回  -1 。
     * 
     * 说明：
     * 1. 当 needle 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。
     * 2. 对于本题而言，当 needle 是空字符串时我们应当返回 0 。这与 C 语言的 strstr() 以及 Java 的 indexOf() 定义相符。
     * 
     * 输入：haystack = "hello", needle = "ll"
     * 输出：2
     * 
     * 输入：haystack = "aaaaa", needle = "bba"
     * 输出：-1
     * 
    */
  function strStr(haystack: string, needle: string): number {
    // 方法一：
    // return haystack.indexOf(needle)

    // 方法二：暴力匹配
    const n = haystack.length,
      m = needle.length
    for (let i = 0; i + m <= n; i++) {
      let flag = true
      for (let j = 0; j < m; j++) {
        if (haystack[i + j] !== needle[j]) {
          flag = false
          break
        }
      }

      if (flag) {
        return i
      }
    }
    return -1

    // 方法三： KMP
  }

  // let haystack = "hello", needle = "ll";
  let haystack = 'aaaaa',
    needle = 'bba'
  strStr(haystack, needle)
  console.log(
    '🚀 ~ file: 69_y实现strStr28.ts ~ line 25 ~  strStr(haystack, needle)',
    strStr(haystack, needle)
  )
})()
```
