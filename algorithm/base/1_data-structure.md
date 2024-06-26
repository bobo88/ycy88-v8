# 数据结构

::: tip 概念
数据结构：计算机存储或组织数据的方式。

算法： 解决问题的方式。
:::

## 数据结构分类：

- 数组（Array）:
  - 一组相同类型的元素按顺序存储在一块连续的内存空间中。
  - 通过索引访问元素，具有常数时间的随机访问。
- 堆（Heap）:
  - 一种特殊的树形结构，通常用于实现优先队列。
  - 具有最大堆和最小堆两种形式，用于高效地找到最大或最小元素。
- 栈（Stack）:
  - 后进先出（LIFO）的数据结构。
  - 只允许在栈顶进行插入和删除操作。
- 队列（Queue）:
  - 先进先出（FIFO）的数据结构。
  - 可以在队尾插入元素，在队头删除元素。
- 链表（Linked List）:
  - 由节点组成的线性数据结构。
  - 每个节点包含数据和指向下一个节点的指针。
- 树 / 二叉树（Tree / Binary Tree）:
  - 树是一种非线性数据结构，具有层次关系。
  - 二叉树每个节点最多有两个子节点。
- 图（Graph）:
  - 由节点（顶点）和边组成的数据结构。
  - 用于表示对象之间的关系。
- 散列表（Hash Table）/ 跳表（Skip List）:
  - 散列表通过散列函数将键映射到索引，用于快速查找、插入和删除。
  - 跳表是一种有序的链表结构，可以用于快速查找。

::: warning 提示
数据结构种类很多，但它们存在的目的都是在不同的应用场景，尽可能高效地增删查改。
:::

## 一、数组

![An image](/images/algorithm/icon_array.png)

## 二、堆

![An image](/images/algorithm/icon_heap.png)

## 三、栈

![An image](/images/algorithm/icon_stack.png)

## 四、队列

![An image](/images/algorithm/icon_queue.png)

## 五、链表

![An image](/images/algorithm/icon_linklist.png)

## 六、树 / 二叉树

![An image](/images/algorithm/icon_tree.png)

## 七、图

![An image](/images/algorithm/icon_tu.png)

## 八、散列表

![An image](/images/algorithm/icon_hashlist.png)

## 九、跳表

![An image](/images/algorithm/icon_skiplist.png)

## 十、常见数据结构的应用场景

### 1. **数组（Array）**：

- 生活应用：购物清单（例如，列出要购买的物品），日历中的日期（例如，一年中的每一天），电话号码簿中的联系人列表等都可以用数组来表示。

### 2. **链表（Linked List）**：

- 生活应用：火车上的车厢连接（每节车厢都指向下一节车厢），一串珠子的链子等都可以看作是链表的实例。

### 3. **栈（Stack）**：

- 生活应用：书堆（每本书放在上面），餐厅的盘子堆（每个盘子都放在顶部），玩具堆等都可以看作是栈的应用，后放入的先取出。

### 4. **队列（Queue）**：

- 生活应用：排队等候服务（例如，在银行柜台或者售票窗口排队），超市结账柜台等都可以看作是队列的应用，先到先服务。

### 5. **树（Tree）**：

- 生活应用：家谱（以祖先为根节点的家族关系树），公司组织结构（以公司领导为根节点的组织树），文件系统等都可以看作是树形结构的应用。

### 6. **图（Graph）**：

- 生活应用：地图上的路网（道路和交叉口形成的网络），社交网络中的好友关系（人与人之间的连接），电力网络中的电站和输电线路等都可以看作是图的应用。

### 7. **哈希表（Hash Table）**：

- 生活应用：电话簿中根据姓名查找电话号码（姓名对应电话号码的映射），图书馆中根据书名查找书籍位置（书名对应书籍位置的映射）等都可以看作是哈希表的应用。

### 8. **堆（Heap）**：

- 生活应用：医院急诊室中的医疗优先级（患者根据病情优先级排队），航空公司中的订票优先级（乘客根据航班时间和舱位等级排队）等都可以看作是堆的应用。

### 9. **集合（Set）**：

- 生活应用：去重后的购物清单（列出不重复的购买物品），某活动参与者的名单等都可以看作是集合的应用。

### 10. **字典（Map）**：

- 生活应用：城市地图中的地点和坐标（地点对应经纬度坐标的映射），书籍的索引（关键词对应书籍页码的映射）等都可以看作是字典的应用。

---

- [图解！24 张图彻底弄懂九大常见数据结构！](https://cloud.tencent.com/developer/article/1634155)
