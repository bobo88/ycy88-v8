# 171. Excel 表列序号

```js
;(function () {
  /**
     * 171. Excel 表列序号
     * 给你一个字符串 columnTitle ，表示 Excel 表格中的列名称。返回 该列名称对应的列序号 。
     * 
        A -> 1
        B -> 2
        C -> 3
        ...
        Z -> 26
        AA -> 27
        AB -> 28 
        ...
     * 
     * 
     * 输入: columnTitle = "A"
     * 输出: 1
     * 
     * 输入: columnTitle = "AB"
     * 输出: 28
     * 
    */

  function titleToNumber(columnTitle: string): number {
    // 方法一：
    let ans: number = 0
    let titleArr: string[] = columnTitle.split('')
    titleArr.reverse()
    let mul: number = 1
    titleArr.map((item, index) => {
      ans += (item.charCodeAt(0) + 1 - 65) * mul
      mul *= 26
    })
    return ans

    // 方法二： 简化版
    // let number: number = 0;
    // let multiple: number = 1;
    // let ACodeNum: number = 'A'.charCodeAt(0);
    // for (let i = columnTitle.length - 1; i >= 0; i--) {
    //     const k = columnTitle[i].charCodeAt(0) - ACodeNum + 1;
    //     number += k * multiple;
    //     multiple *= 26;
    // }
    // return number;
  }

  console.log(titleToNumber('A'))
  console.log(titleToNumber('AB'))
  console.log(titleToNumber('ZZ'))
})()
```
