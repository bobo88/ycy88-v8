# 手把手刷链表算法

## 一、 双指针技巧秒杀七道链表题目

### 1.1 合并两个有序链表

```ts
// 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
// 输入：l1 = [1,2,4], l2 = [1,3,4]
// 输出：[1,1,2,3,4,4]
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  // 方法一：递归
  if (!list1) {
    return list2
  } else if (!list2) {
    return list1
  } else if (list1.val < list2.val) {
    list1.next = mergeTwoLists(list1.next, list2)
    return list1
  } else {
    list2.next = mergeTwoLists(list1, list2.next)
    return list2
  }

  // 方法二：遍历
  const prehead = new ListNode(-1)
  let prev = prehead
  while (!list1 || !list2) {
    if (list1.val > list2.val) {
      prev.next = list2
      list2 = list2.next
    } else {
      prev.next = list1
      list1 = list1.next
    }
    prev = prev.next
  }
  // !list1.next ? (prev.next = list1.next) : (prev.next = list2.next);
  prev.next = list1 === null ? list2 : list1
  return prehead

  // const prehead = new ListNode(-1);
  // let prev = prehead;
  // while (list1 !== null && list2 !== null) {
  //   if (list1.val < list2.val) {
  //     prev.next = list1;
  //     list1 = list1.next;
  //   } else {
  //     prev.next = list2;
  //     list2 = list2.next;
  //   }
  //   prev = prev.next;
  // }
  // prev.next = list1 === null ? list2 : list1;
  // return prehead.next;
}
```

### 1.2 链表的分解

### 1.3 合并 k 个有序链表

### 1.4 寻找单链表的倒数第 k 个节点

### 1.5 寻找单链表的中点

### 1.6 判断单链表是否包含环并找出环起点

### 1.7 判断两个单链表是否相交并找出交点

## 二、 递归魔法：反转单链表

## 三、 如何 K 个一组反转链表

## 四、 如何判断回文链表

参考：<br />
<a href="https://labuladong.github.io/algo/" target="_blank">LABULADONG 的算法网站</a><br />
