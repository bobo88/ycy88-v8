# 168. Excel表列名称

```js
;(function () {
  /**
     * 168. Excel表列名称
     * 给你一个整数 columnNumber ，返回它在 Excel 表中相对应的列名称。
     * 
     *  A -> 1
        B -> 2
        C -> 3
        ...
        Z -> 26
        AA -> 27
        AB -> 28 
        ...
     * 
     * 
     * 输入：columnNumber = 701
     * 输出："ZY"
     * 
     * 输入：columnNumber = 2147483647
     * 输出："FXSHRXW"
     * 
    */

  function convertToTitle(columnNumber: number): string {
    // 方法一： === Wrong ===
    // // Tips1:  'A'.charCodeAt() --> 65
    // // Tips2:  String.fromCharCode(65) --> 'A'
    // let azArr: string[] = new Array(26).fill(0).map((item, index) => String.fromCharCode(index + 65));
    // let res: number[] = [];
    // while (columnNumber > 26) {
    //     let result = columnNumber % 26;
    //     res.unshift(result)
    //     columnNumber = Math.floor(columnNumber / 26);
    // }
    // columnNumber && res.unshift(columnNumber);
    // // res中凡是有0，均需要替换成26，且前一位数字需要减一
    // let newRes: number[] = [...res];
    // res.map((item, index) => {
    //     if (index > 0 && item === 0) {
    //         newRes[index] = 26;
    //         newRes[index - 1]--;
    //     }
    // })
    // // console.log(newRes)
    // return newRes.map(item => {
    //     return azArr[item - 1]
    // }).join('')

    // 方法二：
    let ans: string[] = []
    while (columnNumber > 0) {
      const a0 = ((columnNumber - 1) % 26) + 1
      ans.push(String.fromCharCode(a0 - 1 + 'A'.charCodeAt(0)))
      columnNumber = Math.floor((columnNumber - a0) / 26)
    }
    ans.reverse()
    return ans.join('')

    // 方法三：
    // const sb = [];
    // while (columnNumber !== 0) {
    //     columnNumber--;
    //     sb.push(String.fromCharCode(columnNumber % 26 + 'A'.charCodeAt(0)));
    //     columnNumber = Math.floor(columnNumber / 26);
    // }
    // return sb.reverse().join('');
  }

  let columnNumber = 1
  let columnNumber2 = 28
  let columnNumber3 = 702
  let columnNumber4 = 2147483647
  let columnNumber5 = 52
  console.log(convertToTitle(columnNumber))
  console.log(convertToTitle(columnNumber2))
  console.log(convertToTitle(columnNumber3))
  console.log(convertToTitle(columnNumber4))
  console.log(convertToTitle(columnNumber5))
})()
```
