# 队列

队列（Queue）是一种基于先进先出（First In, First Out，FIFO）原则的数据结构。在队列中，最先添加的元素最先被访问，类似于排队的概念。队列可以使用数组或链表来实现。

## 一、队列的操作

### 1）队列的常用操作

1. **入队（enqueue）：**

   - 将元素添加到队列的尾部。

2. **出队（dequeue）：**

   - 从队列的头部移除并返回元素。

3. **查看队头元素（front）：**

   - 返回队列头部的元素，但不将其移除。

4. **判断队列是否为空（isEmpty）：**

   - 检查队列是否不含任何元素。

5. **获取队列长度（getSize）：**
   - 返回队列中元素的个数。

### 2）队列的其他操作

1. **清空队列（clear）：**

   - 移除队列中的所有元素，使其成为空队列。

2. **队列的遍历：**

   - 从队头到队尾依次访问队列中的元素。

3. **循环队列：**
   - 实现队列的循环利用，使得队列的空间可以重复利用。

## 二、队列的应用场景

### 1）主要应用场景

1. **任务调度：**

   - 多任务系统中，使用队列来管理待执行的任务，确保按照顺序执行。

2. **广度优先搜索（BFS）：**

   - 在图的遍历中，使用队列来按层次访问节点，实现广度优先搜索。

3. **打印队列：**

   - 打印任务按照先来先服务的原则排队执行。

4. **消息队列：**

   - 在异步编程中，通过消息队列来处理事件和消息。

5. **缓冲区管理：**

   - 数据传输过程中，使用队列进行缓冲区管理，确保数据的有序传输。

6. **图像处理：**
   - 图像处理中的滤波、特征检测等操作可以使用队列进行任务调度。

队列在这些场景中的应用可以提高任务的有序执行、优化算法的效率以及管理数据的流动，是一种非常常见且有用的数据结构。

### 2）具体实例

#### A、数组形式

```javascript
// 队列的实现类
class Queue {
  constructor() {
    this.items = []
  }

  // 入队操作
  enqueue(element) {
    this.items.push(element)
  }

  // 出队操作
  dequeue() {
    if (this.isEmpty()) {
      return '队列已空'
    }
    return this.items.shift()
  }

  // 查看队头元素
  front() {
    if (this.isEmpty()) {
      return '队列为空'
    }
    return this.items[0]
  }

  // 判断队列是否为空
  isEmpty() {
    return this.items.length === 0
  }

  // 获取队列长度
  size() {
    return this.items.length
  }

  // 清空队列
  clear() {
    this.items = []
  }
}

// 示例
const queue = new Queue()

queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)

console.log(queue.front()) // 输出 1
console.log(queue.dequeue()) // 输出 1
console.log(queue.size()) // 输出 2
console.log(queue.isEmpty()) // 输出 false

queue.clear()
console.log(queue.isEmpty()) // 输出 true
```

在上述示例中，`Queue` 类包含了入队、出队、查看队头元素、判断队列是否为空、获取队列长度和清空队列等基本操作。使用数组的 `push` 方法进行入队操作，使用 `shift` 方法进行出队操作，实现了队列的基本功能。

#### B、链表形式

下面是使用链表实现队列的示例，包括链表节点类 `Node` 和队列类 `Queue`：

```javascript
// 定义链表节点
class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

// 队列的实现类
class Queue {
  constructor() {
    this.front = null // 队头节点
    this.rear = null // 队尾节点
    this.size = 0 // 队列长度
  }

  // 入队操作
  enqueue(element) {
    const newNode = new Node(element)

    if (this.isEmpty()) {
      this.front = newNode
      this.rear = newNode
    } else {
      this.rear.next = newNode
      this.rear = newNode
    }

    this.size++
  }

  // 出队操作
  dequeue() {
    if (this.isEmpty()) {
      return '队列已空'
    }

    const removedNode = this.front
    this.front = removedNode.next
    removedNode.next = null

    if (this.front === null) {
      this.rear = null // 如果队列为空，重置队尾节点
    }

    this.size--

    return removedNode.data
  }

  // 查看队头元素
  frontElement() {
    if (this.isEmpty()) {
      return '队列为空'
    }
    return this.front.data
  }

  // 判断队列是否为空
  isEmpty() {
    return this.size === 0
  }

  // 获取队列长度
  getSize() {
    return this.size
  }

  // 清空队列
  clear() {
    this.front = null
    this.rear = null
    this.size = 0
  }
}

// 示例
const queue = new Queue()

queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)

console.log(queue.frontElement()) // 输出 1
console.log(queue.dequeue()) // 输出 1
console.log(queue.getSize()) // 输出 2
console.log(queue.isEmpty()) // 输出 false

queue.clear()
console.log(queue.isEmpty()) // 输出 true
```

在上述示例中，`Node` 类表示链表的节点，包含数据域 `data` 和指向下一个节点的指针 `next`。`Queue` 类表示队列，使用链表来实现队列的基本操作。入队操作将新节点添加到链表的尾部（队尾），出队操作将链表头部的节点移除（队头）。链表实现的队列不受固定数组大小的限制，可以动态调整大小。
