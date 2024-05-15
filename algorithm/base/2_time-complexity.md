# 时间复杂度

::: tip 时间复杂度
时间复杂度是衡量算法运行时间效率的一种方法，表示算法的运行时间与输入数据规模之间的关系。
:::

## 一、概念

计算机科学中，算法的时间复杂度是一个函数，它定性描述了该算法的运行时间。这是一个关于代表算法输入值的字符串的长度的函数。时间复杂度常用大 O 符号表述，不包括这个函数的低阶项和首项系数。使用这种方式时，时间复杂度可被称为是渐近的，它考察当输入值大小趋近无穷时的情况。

## 二、常见的时间复杂度

::: warning 时间复杂度
从上至下依次的时间复杂度越来越大，执行的效率越来越低。

O(1) < O(logn) < O(n) < O(nlogn) < O(n^2) < O(n^3) < O(2^n) < O(n!) < O(n^n)
:::

- 常数阶 O(1)
- 对数阶 O(logN)
- 线性阶 O(n)
- 线性对数阶 O(nlogN)
- 平方阶 O(n²)
- 立方阶 O(n³)
- K 次方阶 O(n^k)
- 指数阶(2^n)

好的，让我们详细解释每种时间复杂度的情况，并使用更具体的示例来说明。

## 1. **常数阶 O(1)**:

- 这表示算法的执行时间是固定的，与输入规模无关。
- 示例：访问数组的第一个元素。

```js
function constantTimeExample(arr) {
  return arr[0]
}

const arr = [1, 2, 3, 4, 5]
console.log(constantTimeExample(arr)) // 输出：1
```

## 2. **对数阶 O(logN)**:

- 这表示算法的执行时间与输入规模的对数成正比。
- 示例：二分查找。

```js
function binarySearch(arr, target) {
  let low = 0
  let high = arr.length - 1
  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    if (arr[mid] === target) return mid
    if (arr[mid] < target) low = mid + 1
    else high = mid - 1
  }
  return -1 // 没找到目标值
}

const arr = [1, 2, 3, 4, 5]
console.log(binarySearch(arr, 3)) // 输出：2
```

## 3. **线性阶 O(n)**:

- 这表示算法的执行时间与输入规模成线性关系。
- 示例：计算数组中所有元素的总和。

```js
function linearTimeExample(arr) {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]
  }
  return sum
}

const arr = [1, 2, 3, 4, 5]
console.log(linearTimeExample(arr)) // 输出：15
```

## 4. **线性对数阶 O(nlogN)**:

- 这表示算法的执行时间介于线性和对数之间。
- 示例：快速排序等基于比较的排序算法。

```js
function quickSort(arr) {
  if (arr.length <= 1) return arr
  const pivot = arr[0]
  const left = []
  const right = []
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) left.push(arr[i])
    else right.push(arr[i])
  }
  return [...quickSort(left), pivot, ...quickSort(right)]
}

const arr = [5, 3, 1, 4, 2]
console.log(quickSort(arr)) // 输出：[1, 2, 3, 4, 5]
```

## 5. **平方阶 O(n²)**:

- 这表示算法的执行时间与输入规模的平方成正比。
- 示例：计算矩阵的乘积。

```js
function matrixMultiplication(matrix1, matrix2) {
  const result = []
  const n = matrix1.length
  for (let i = 0; i < n; i++) {
    result[i] = []
    for (let j = 0; j < n; j++) {
      let sum = 0
      for (let k = 0; k < n; k++) {
        sum += matrix1[i][k] * matrix2[k][j]
      }
      result[i][j] = sum
    }
  }
  return result
}

const matrix1 = [
  [1, 2],
  [3, 4]
]
const matrix2 = [
  [5, 6],
  [7, 8]
]
console.log(matrixMultiplication(matrix1, matrix2)) // 输出：[[19, 22], [43, 50]]
```

## 6. **立方阶 O(n³)**:

- 这表示算法的执行时间与输入规模的立方成正比。
- 示例：计算矩阵的立方。

```js
function matrixCube(matrix) {
  const n = matrix.length
  const result = []
  for (let i = 0; i < n; i++) {
    result[i] = []
    for (let j = 0; j < n; j++) {
      let sum = 0
      for (let k = 0; k < n; k++) {
        sum += matrix[i][k] * matrix[k][j]
      }
      result[i][j] = sum
    }
  }
  return result
}

const matrix = [
  [1, 2],
  [3, 4]
]
console.log(matrixCube(matrix)) // 输出：[[7, 10], [15, 22]]
```

## 7. **K 次方阶 O(n^k)**:

- 这表示算法的执行时间与输入规模的 k 次方成正比。
- 示例：计算矩阵的 k 次方。

```js
function matrixPower(matrix, k) {
  let result = matrix
  for (let i = 1; i < k; i++) {
    result = matrixMultiplication(result, matrix)
  }
  return result
}

const matrix = [
  [1, 2],
  [3, 4]
]
console.log(matrixPower(matrix, 2)) // 输出：[[7, 10], [15,22]]
```

## 8. **指数阶(2^n)**:

- 这表示算法的执行时间呈指数级增长。
- 示例：计算斐波那契数列的第 n 项。

```js
function fibonacci(n) {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

console.log(fibonacci(5)) // 输出：5
```

---

- [看动画轻松理解时间复杂度（一）](https://www.cxyxiaowu.com/1996.html)
- [看动画轻松理解时间复杂度（二）](https://www.cxyxiaowu.com/1984.html)
