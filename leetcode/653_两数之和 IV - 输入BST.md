# 653. 两数之和 IV

```js
;(function () {
  /**
   * 653. 两数之和 IV - 输入 BST
   * 给定一个二叉搜索树 root 和一个目标结果 k，如果 BST 中存在两个元素且它们的和等于给定的目标结果，则返回 true。
   *
   * 输入: root = [5,3,6,2,4,null,7], k = 9
   * 输出: true
   *
   * 输入: root = [5,3,6,2,4,null,7], k = 28
   * 输出: false
   *
   */
  class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
      this.val = val === undefined ? 0 : val
      this.left = left === undefined ? null : left
      this.right = right === undefined ? null : right
    }
  }

  function findTarget(root: TreeNode | null, k: number): boolean {
    // 方法一：数组includes
    // let bool = false;
    // let res: number[] = [];
    // function preorder(root: TreeNode | null) {
    //     if (!root) return
    //     if (res.includes(k - root.val)) {
    //         bool = true
    //         return
    //     }
    //     res.push(root.val)
    //     preorder(root.left)
    //     preorder(root.right)
    // }
    // preorder(root)
    // return bool

    // 方法二：哈希Set
    // let bool = false;
    // const set = new Set();
    // const helper = (root: TreeNode | null, k: number): boolean => {
    //     if (!root) return false
    //     if (set.has(k - root.val)) {
    //         return true
    //     }
    //     set.add(root.val)
    //     return helper(root.left, k) || helper(root.right, k)
    // }
    // return helper(root, k)

    // 方法三：深度优先搜索 + 中序遍历 + 双指针
    // ========= 搜索树 + 中序遍历 = 有序数组。
    const list: number[] = []
    const inorderTraversal = (root: TreeNode | null) => {
      if (!root) {
        return
      }
      inorderTraversal(root.left)
      list.push(root.val)
      inorderTraversal(root.right)
    }
    inorderTraversal(root)
    let left = 0,
      right = list.length - 1
    while (left < right) {
      if (list[left] + list[right] === k) {
        return true
      }
      if (list[left] + list[right] < k) {
        left++
      } else {
        right--
      }
    }
    return false

    // 方法四：迭代 + 中序遍历 + 双指针
  }
})()
```
