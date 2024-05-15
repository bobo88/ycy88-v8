# 栈

栈（Stack）是一种基于后进先出（Last In, First Out，LIFO）原则的数据结构。在栈中，最后添加的元素最先被访问。栈可以通过数组或链表来实现。

## 一、栈的操作

### 1）栈支持两个主要操作：

- 压栈（Push）：
  - 向栈顶添加元素，即将元素放入栈中。
- 弹栈（Pop）：
  - 从栈顶移除元素，即取出栈顶的元素。

### 2）其他可能的操作：

- 查看栈顶元素（Peek）：
  - 获取栈顶元素的值，但不将其从栈中移除。
- 判断栈是否为空：
  - 检查栈中是否有元素。

## 二、栈的应用场景

### 1）主要应用场景

- 函数调用： 函数调用时，局部变量和返回地址等信息被压入栈中，函数执行完毕后再弹出。
- 表达式求值： 计算表达式中的括号匹配问题，以及中缀表达式转换为后缀表达式等。
- 浏览器历史记录： 在浏览器中，通过前进和后退按钮实现网页浏览历史的管理，可以使用栈结构。
- 撤销操作： 许多应用程序提供撤销（Undo）功能，可以使用栈来存储历史状态，使用户能够撤销操作。

在实现栈时，可以使用数组或链表。数组实现的栈通常需要提前指定大小，而链表实现的栈可以动态调整大小。

### 2）具体实例

#### A、数组形式

在 JavaScript 中，可以使用数组来实现栈。JavaScript 数组天然支持在数组末尾进行元素的添加和删除操作，这正好符合栈的后进先出（LIFO）原则。以下是一个简单的栈的实现示例：

```javascript
// 栈的实现类
class Stack {
  constructor() {
    this.items = []
  }

  // 压栈操作
  push(element) {
    this.items.push(element)
  }

  // 弹栈操作
  pop() {
    if (this.isEmpty()) {
      return '栈已空'
    }
    return this.items.pop()
  }

  // 查看栈顶元素
  peek() {
    if (this.isEmpty()) {
      return '栈为空'
    }
    return this.items[this.items.length - 1]
  }

  // 判断栈是否为空
  isEmpty() {
    return this.items.length === 0
  }

  // 获取栈中元素个数
  size() {
    return this.items.length
  }

  // 清空栈
  clear() {
    this.items = []
  }
}

// 示例
const stack = new Stack()

stack.push(1)
stack.push(2)
stack.push(3)

console.log(stack.peek()) // 输出 3
console.log(stack.pop()) // 输出 3
console.log(stack.size()) // 输出 2
console.log(stack.isEmpty()) // 输出 false

stack.clear()
console.log(stack.isEmpty()) // 输出 true
```

上述示例中，`Stack` 类包含了压栈、弹栈、查看栈顶元素、判断栈是否为空、获取栈中元素个数、清空栈等操作。通过使用数组的 `push` 和 `pop` 方法，可以方便地实现栈的基本功能。

#### B、链表形式

使用链表实现栈同样是一种常见的方式。在 JavaScript 中，可以通过定义一个链表节点（Node）和一个栈类（Stack）来实现。以下是一个简单的链表实现的栈的例子：

```javascript
// 定义链表节点
class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

// 栈的实现类
class Stack {
  constructor() {
    this.top = null // 栈顶节点
    this.size = 0 // 栈中元素个数
  }

  // 压栈操作
  push(element) {
    const newNode = new Node(element)
    newNode.next = this.top
    this.top = newNode
    this.size++
  }

  // 弹栈操作
  pop() {
    if (this.isEmpty()) {
      return '栈已空'
    }

    const removedNode = this.top
    this.top = removedNode.next
    removedNode.next = null
    this.size--

    return removedNode.data
  }

  // 查看栈顶元素
  peek() {
    if (this.isEmpty()) {
      return '栈为空'
    }
    return this.top.data
  }

  // 判断栈是否为空
  isEmpty() {
    return this.size === 0
  }

  // 获取栈中元素个数
  getSize() {
    return this.size
  }

  // 清空栈
  clear() {
    this.top = null
    this.size = 0
  }
}

// 示例
const stack = new Stack()

stack.push(1)
stack.push(2)
stack.push(3)

console.log(stack.peek()) // 输出 3
console.log(stack.pop()) // 输出 3
console.log(stack.getSize()) // 输出 2
console.log(stack.isEmpty()) // 输出 false

stack.clear()
console.log(stack.isEmpty()) // 输出 true
```

在上述示例中，`Node` 类表示链表的节点，每个节点包含一个数据域 `data` 和一个指向下一个节点的指针 `next`。`Stack` 类表示栈，使用链表来实现栈的基本操作。压栈操作将新节点添加到链表的头部，而弹栈操作将链表头部的节点移除。这样的实现方式允许栈的大小可以动态变化，而不受固定数组大小的限制。
