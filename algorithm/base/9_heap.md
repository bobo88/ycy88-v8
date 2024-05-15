# 堆

堆（Heap）是一种特殊的树状数据结构，通常用于实现优先队列。堆分为最大堆和最小堆两种类型，具体取决于父节点和子节点之间的关系。

## 一、主要特点：

1. **结构特性：** 堆是一个完全二叉树，即除了最后一层，其他层的节点都被充满，最后一层的节点尽量靠左排列。

2. **堆序性质：**
   - **最大堆（Max Heap）：** 每个父节点的值都大于或等于其子节点的值。
   - **最小堆（Min Heap）：** 每个父节点的值都小于或等于其子节点的值。

## 二、基本操作：

1. **插入（Insert）：** 将新元素插入到堆中，并保持堆的性质。

2. **删除最大/最小元素（Extract Max/Min）：** 删除并返回堆中的最大/最小元素，并保持堆的性质。

## 三、具体实例：

下面是一个 JavaScript 中最小堆的简单实现：

```javascript
class MinHeap {
  constructor() {
    this.heap = []
  }

  // 插入操作
  insert(value) {
    this.heap.push(value)
    this._heapifyUp()
  }

  // 删除最小元素操作
  extractMin() {
    if (this.isEmpty()) {
      return null
    }

    const min = this.heap[0]
    const lastElement = this.heap.pop()

    if (!this.isEmpty()) {
      this.heap[0] = lastElement
      this._heapifyDown()
    }

    return min
  }

  // 获取最小元素，不删除
  getMin() {
    return this.isEmpty() ? null : this.heap[0]
  }

  // 堆是否为空
  isEmpty() {
    return this.heap.length === 0
  }

  // 从最后一个元素开始向上调整堆，保持最小堆性质
  _heapifyUp() {
    let currentIndex = this.heap.length - 1

    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2)

      if (this.heap[currentIndex] < this.heap[parentIndex]) {
        // 交换当前节点与父节点
        ;[this.heap[currentIndex], this.heap[parentIndex]] = [
          this.heap[parentIndex],
          this.heap[currentIndex]
        ]
        currentIndex = parentIndex
      } else {
        break
      }
    }
  }

  // 从根节点开始向下调整堆，保持最小堆性质
  _heapifyDown() {
    let currentIndex = 0
    const length = this.heap.length

    while (true) {
      const leftChildIndex = 2 * currentIndex + 1
      const rightChildIndex = 2 * currentIndex + 2
      let smallestIndex = currentIndex

      if (
        leftChildIndex < length &&
        this.heap[leftChildIndex] < this.heap[smallestIndex]
      ) {
        smallestIndex = leftChildIndex
      }

      if (
        rightChildIndex < length &&
        this.heap[rightChildIndex] < this.heap[smallestIndex]
      ) {
        smallestIndex = rightChildIndex
      }

      if (smallestIndex !== currentIndex) {
        // 交换当前节点与较小子节点
        ;[this.heap[currentIndex], this.heap[smallestIndex]] = [
          this.heap[smallestIndex],
          this.heap[currentIndex]
        ]
        currentIndex = smallestIndex
      } else {
        break
      }
    }
  }
}

// 示例使用
const minHeap = new MinHeap()

minHeap.insert(5)
minHeap.insert(3)
minHeap.insert(8)
minHeap.insert(1)

console.log('Min Heap:')
console.log('Extracted Min:', minHeap.extractMin()) // 输出: 1
console.log('Min Element:', minHeap.getMin()) // 输出: 3
```

在这个例子中，我们创建了一个最小堆，演示了插入、删除最小元素以及获取最小元素的基本操作。在最小堆中，每次删除操作都会返回堆中的最小元素。这是最小堆的一个典型应用场景，例如用于任务调度中的优先队列。
