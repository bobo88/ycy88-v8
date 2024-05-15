# 链表

链表是一种线性数据结构，其中元素以节点的形式存储，每个节点包含数据和指向下一个节点的指针。相比数组，链表的大小可以动态调整，无需提前分配固定大小的内存空间。以下是链表的常用操作以及一些应用场景。

## 一、链表的操作

## 1）链表的常用操作

1. **插入节点（Insert）：**

   - 在链表中添加新的节点，可以在链表头部、尾部或指定位置插入。

2. **删除节点（Delete）：**

   - 从链表中移除指定节点，可以删除头节点、尾节点或指定位置的节点。

3. **查找节点（Search）：**

   - 在链表中查找包含特定数据的节点。

4. **获取链表长度（Get Length）：**

   - 计算链表中节点的数量。

5. **遍历链表（Traverse）：**
   - 依次访问链表中的每个节点。

## 2）链表的其他操作

1. **反转链表：**

   - 将链表的方向颠倒，即头部变为尾部，尾部变为头部。

2. **合并链表：**

   - 将两个链表合并成一个。

3. **检测环：**

   - 判断链表中是否存在环。

4. **求交点：**
   - 找到两个链表的交点。

## 二、链表的应用场景

## 1）链表的应用场景

1. **内存分配：**

   - 操作系统中，动态分配内存使用链表来管理空闲内存块。

2. **LRU 缓存淘汰算法：**

   - Least Recently Used 缓存淘汰算法中，使用双向链表来维护使用顺序，将最近使用的放在头部。

3. **多项式运算：**

   - 使用链表来表示多项式，方便进行加法、减法等运算。

4. **编辑器的撤销功能：**

   - 实现编辑器中的撤销操作，可以使用链表来保存历史编辑记录。

5. **任务调度：**
   - 在任务调度中，使用链表来管理就绪队列、等待队列等。

链表的灵活性使得它在各种场景中都有广泛的应用。链表分为单向链表、双向链表和循环链表等不同类型，每种类型都有其独特的特点和适用场景。

## 2）具体实例：单向链表

```javascript
// 定义单向链表节点
class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

// 定义单向链表
class LinkedList {
  constructor() {
    this.head = null
  }

  // 插入节点到链表头部
  insertAtHead(data) {
    const newNode = new Node(data)
    newNode.next = this.head
    this.head = newNode
  }

  // 删除指定数据的节点
  deleteNode(data) {
    if (this.head === null) {
      return
    }

    if (this.head.data === data) {
      this.head = this.head.next
      return
    }

    let current = this.head
    while (current.next !== null && current.next.data !== data) {
      current = current.next
    }

    if (current.next !== null) {
      current.next = current.next.next
    }
  }

  // 查找节点是否存在
  searchNode(data) {
    let current = this.head
    while (current !== null) {
      if (current.data === data) {
        return true
      }
      current = current.next
    }
    return false
  }

  // 打印链表
  printList() {
    let current = this.head
    while (current !== null) {
      console.log(current.data + ' -> ')
      current = current.next
    }
    console.log('null')
  }
}

// 示例使用
const linkedList = new LinkedList()

linkedList.insertAtHead(3)
linkedList.insertAtHead(2)
linkedList.insertAtHead(1)

console.log('Original Linked List:')
linkedList.printList() // 输出: 1 -> 2 -> 3 -> null

linkedList.deleteNode(2)

console.log('\nLinked List after deleting node with data 2:')
linkedList.printList() // 输出: 1 -> 3 -> null

console.log('\nDoes node with data 3 exist? ' + linkedList.searchNode(3)) // 输出: true
console.log('Does node with data 2 exist? ' + linkedList.searchNode(2)) // 输出: false
```

上述实例展示了一个简单的单向链表的实现，包括插入节点到链表头部、删除指定数据的节点、查找节点是否存在以及打印链表等操作。链表在插入和删除操作上具有优势，特别适用于频繁变动的数据集。
