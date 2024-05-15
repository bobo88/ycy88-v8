# 搜索算法分类

## 1. 线性搜索（Sequential Search）

### 算法描述：

线性搜索是一种基本的搜索算法，它按顺序检查数组中的每个元素，直到找到目标元素或遍历完整个数组。线性搜索适用于未排序的数组，其时间复杂度为 O(n)。

### 算法步骤：

1. 从数组的第一个元素开始，逐个检查每个元素。
2. 如果找到目标元素，则返回其索引；否则，继续搜索下一个元素。
3. 如果遍历完整个数组仍未找到目标元素，则返回 -1，表示目标元素不在数组中。

## 2. 二分搜索（Binary Search）

### 算法描述：

二分搜索是一种高效的搜索算法，要求被搜索的数组必须是有序的。算法通过将目标值与数组的中间元素进行比较，从而将搜索范围缩小一半。如果目标值小于中间元素，则在左半部分继续搜索；如果目标值大于中间元素，则在右半部分继续搜索。这个过程不断迭代，直到找到目标元素或搜索范围为空。二分搜索的时间复杂度为 O(log n)。

### 算法步骤：

1. 将数组的中间元素与目标值进行比较。
2. 如果中间元素等于目标值，则返回其索引，搜索结束。
3. 如果目标值小于中间元素，则在左半部分继续二分搜索。
4. 如果目标值大于中间元素，则在右半部分继续二分搜索。
5. 重复以上步骤，直到找到目标元素或搜索范围为空。

## 3. 广度优先搜索（Breadth-First Search，BFS）

### 算法描述：

广度优先搜索是一种图搜索算法，用于在图或树中找到特定节点。算法从起始节点开始，逐层遍历其相邻节点，然后再遍历相邻节点的相邻节点，依此类推。这种搜索方式保证了先访问离起始节点近的节点。广度优先搜索通常使用队列来管理待访问的节点，其时间复杂度为 O(|V| + |E|)，其中 |V| 为节点数，|E| 为边数。

### 算法步骤：

1. 将起始节点加入队列，并标记为已访问。
2. 从队列中取出一个节点，并访问该节点。
3. 将该节点的未访问相邻节点加入队列，并标记为已访问。
4. 重复步骤 2 和步骤 3，直到队列为空。

## 4. 深度优先搜索（Depth-First Search，DFS）

### 算法描述：

深度优先搜索是一种图搜索算法，用于在图或树中找到特定节点。算法从起始节点开始，尽可能深地访问其相邻节点，直到无法再深入为止，然后回溯到上一层继续探索。深度优先搜索通常使用递归或栈来管理待访问的节点，其时间复杂度为 O(|V| + |E|)。

### 算法步骤：

1. 从起始节点开始，访问该节点并标记为已访问。
2. 递归地访问该节点的未访问相邻节点，直到无法再深入。
3. 回溯到上一层，继续探索其他未访问的节点。
4. 重复步骤 1、步骤 2 和步骤 3，直到所有节点都被访问。

## 5. A\*搜索算法（A-star）

### 算法描述：

A\*搜索算法是一种启发式搜索算法，用于在图或网络中找到从起始节点到目标节点的最短路径。算法维护两个值：实际代价（从起始节点到当前节点的实际代价）和估计总代价（实际代价加上启发式函数的估计值）。通过优先考虑估计总代价最小的节点，A\*算法尽可能快地找到最优解。A\*搜索算法通常使用优先队列来管理待访问的节点，其时间复杂度取决于启发式函数的质量。

### 算法步骤：

1. 将起始节点加入优先队列，并初始化实际代价和估计总代价。
2. 从优先队列中取出估计总代价最小的节点，并标记为已访问。
3. 对该节点的未访问相邻节点，更新其实际代价和估计总代价，并加入优先队列。
4. 重复步骤 2 和步骤 3，直到找到目标节点或优先队列为空。

## 二、代码实例

### 1. Javascript 版本

```javascript
// 线性搜索（Sequential Search）
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i // 返回目标元素的索引
    }
  }
  return -1 // 目标元素不在数组中
}

// 二分搜索（Binary Search）
function binarySearch(arr, target) {
  let left = 0
  let right = arr.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)

    if (arr[mid] === target) {
      return mid // 返回目标元素的索引
    } else if (arr[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return -1 // 目标元素不在数组中
}

// 广度优先搜索（Breadth-First Search，BFS）
function bfs(graph, start, target) {
  const n = graph.length
  const visited = new Array(n).fill(false)
  const queue = []

  visited[start] = true
  queue.push(start)

  while (queue.length > 0) {
    const current = queue.shift()

    if (current === target) {
      return true // 找到目标节点
    }

    for (const neighbor of graph[current]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true
        queue.push(neighbor)
      }
    }
  }

  return false // 没有找到目标节点
}

// 深度优先搜索（Depth-First Search，DFS）
function dfs(graph, start, target) {
  const n = graph.length
  const visited = new Array(n).fill(false)

  return dfsHelper(graph, start, target, visited)
}

function dfsHelper(graph, current, target, visited) {
  if (current === target) {
    return true // 找到目标节点
  }

  visited[current] = true

  for (const neighbor of graph[current]) {
    if (!visited[neighbor]) {
      if (dfsHelper(graph, neighbor, target, visited)) {
        return true
      }
    }
  }

  return false // 没有找到目标节点
}

// A*搜索算法（A-star）
function aStarSearch(graph, start, target) {
  const n = graph.length
  const heuristic = new Array(n).fill(0) // 启发式函数值
  const cost = new Array(n).fill(Number.MAX_SAFE_INTEGER) // 从起点到当前节点的实际代价
  const totalCost = new Array(n).fill(Number.MAX_SAFE_INTEGER) // 估计总代价

  for (let i = 0; i < n; i++) {
    heuristic[i] = calculateHeuristic(i, target) // 计算启发式函数值
  }

  cost[start] = 0 // 起点到起点的实际代价为0
  totalCost[start] = heuristic[start] // 起点到目标的总代价为启发式函数值

  const priorityQueue = new PriorityQueue((a, b) => a.totalCost - b.totalCost)
  priorityQueue.enqueue({ vertex: start, totalCost: totalCost[start] })

  while (!priorityQueue.isEmpty()) {
    const currentNode = priorityQueue.dequeue()

    const current = currentNode.vertex

    if (current === target) {
      return cost[current] // 返回从起点到目标的实际代价
    }

    for (const neighbor of graph[current]) {
      const newCost = cost[current] + 1 // 假设每条边的代价为1
      if (newCost < cost[neighbor]) {
        cost[neighbor] = newCost
        totalCost[neighbor] = newCost + heuristic[neighbor]
        priorityQueue.enqueue({
          vertex: neighbor,
          totalCost: totalCost[neighbor]
        })
      }
    }
  }

  return -1 // 没有找到从起点到目标的路径
}

function calculateHeuristic(current, target) {
  // 这里可以根据具体情况实现启发式函数，例如曼哈顿距离、欧几里得距离等
  return Math.abs(current - target)
}

// 优先队列的实现
class PriorityQueue {
  constructor(compareFunction) {
    this.queue = []
    this.compare = compareFunction || ((a, b) => a - b)
  }

  enqueue(element) {
    this.queue.push(element)
    this.bubbleUp()
  }

  dequeue() {
    const max = this.queue[0]
    const end = this.queue.pop()
    if (this.queue.length > 0) {
      this.queue[0] = end
      this.sinkDown()
    }
    return max
  }

  isEmpty() {
    return this.queue.length === 0
  }

  bubbleUp() {
    let index = this.queue.length - 1
    while (index > 0) {
      const current = this.queue[index]
      const parentIndex = Math.floor((index - 1) / 2)
      const parent = this.queue[parentIndex]

      if (this.compare(parent, current) < 0) {
        this.queue[parentIndex] = current
        this.queue[index] = parent
        index = parentIndex
      } else {
        break
      }
    }
  }

  sinkDown() {
    let index = 0
    const length = this.queue.length
    const current = this.queue[0]

    while (true) {
      const leftChildIndex = 2 * index + 1
      const rightChildIndex = 2 * index + 2
      let leftChild, rightChild
      let swap = null

      if (leftChildIndex < length) {
        leftChild = this.queue[leftChildIndex]
        if (this.compare(leftChild, current) > 0) {
          swap = leftChildIndex
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.queue[rightChildIndex]
        if (
          (swap === null && this.compare(rightChild, current) > 0) ||
          (swap !== null && this.compare(rightChild, leftChild) > 0)
        ) {
          swap = rightChildIndex
        }
      }

      if (swap === null) {
        break
      }

      this.queue[index] = this.queue[swap]
      this.queue[swap] = current
      index = swap
    }
  }
}

// 例子：有向图的邻接表表示
const graph = [
  [1, 2], // 0
  [3, 4], // 1
  [5], // 2
  [6, 7], // 3
  [8], // 4
  [9], // 5
  [10], // 6
  [10], // 7
  [10], // 8
  [], // 9
  [] // 10
]

const arr = [1, 50, 20, 39, 12, 58, 66, 99, 2, 5, 4]

// 线性搜索
const linearResult = linearSearch(arr, 58)
console.log(
  'Linear Search:',
  linearResult !== -1 ? `Found at index ${linearResult}` : 'Not found'
)

// 二分搜索（前提是数组已排序）
arr.sort((a, b) => a - b)
const binaryResult = binarySearch(arr, 58)
console.log(
  'Binary Search:',
  binaryResult !== -1 ? `Found at index ${binaryResult}` : 'Not found'
)

// 广度优先搜索
const bfsResult = bfs(graph, 0, 10)
console.log('BFS:', bfsResult ? 'Path exists' : 'Path does not exist')

// 深度优先搜索
const dfsResult = dfs(graph, 0, 10)
console.log('DFS:', dfsResult ? 'Path exists' : 'Path does not exist')

// A*搜索算法
const aStarResult = aStarSearch(graph, 0, 10)
console.log(
  'A* Search:',
  aStarResult !== -1 ? `Path cost is ${aStarResult}` : 'Path does not exist'
)
```

### 2. Java 版本

```java
import java.util.LinkedList;
import java.util.Queue;

public class SearchingAlgorithms {

    // 线性搜索（Sequential Search）
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i; // 返回目标元素的索引
            }
        }
        return -1; // 目标元素不在数组中
    }

    // 二分搜索（Binary Search）
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (arr[mid] == target) {
                return mid; // 返回目标元素的索引
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return -1; // 目标元素不在数组中
    }

    // 广度优先搜索（Breadth-First Search，BFS）
    public static boolean bfs(int[][] graph, int start, int target) {
        int n = graph.length;
        boolean[] visited = new boolean[n];
        Queue<Integer> queue = new LinkedList<>();

        visited[start] = true;
        queue.offer(start);

        while (!queue.isEmpty()) {
            int current = queue.poll();

            if (current == target) {
                return true; // 找到目标节点
            }

            for (int neighbor : graph[current]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.offer(neighbor);
                }
            }
        }

        return false; // 没有找到目标节点
    }

    // 深度优先搜索（Depth-First Search，DFS）
    public static boolean dfs(int[][] graph, int start, int target) {
        int n = graph.length;
        boolean[] visited = new boolean[n];

        return dfsHelper(graph, start, target, visited);
    }

    private static boolean dfsHelper(int[][] graph, int current, int target, boolean[] visited) {
        if (current == target) {
            return true; // 找到目标节点
        }

        visited[current] = true;

        for (int neighbor : graph[current]) {
            if (!visited[neighbor]) {
                if (dfsHelper(graph, neighbor, target, visited)) {
                    return true;
                }
            }
        }

        return false; // 没有找到目标节点
    }

    // A*搜索算法（A-star）
    public static int aStarSearch(int[][] graph, int start, int target) {
        int n = graph.length;
        int[] heuristic = new int[n]; // 启发式函数值
        int[] cost = new int[n]; // 从起点到当前节点的实际代价
        int[] totalCost = new int[n]; // 估计总代价

        for (int i = 0; i < n; i++) {
            heuristic[i] = calculateHeuristic(i, target); // 计算启发式函数值
            cost[i] = Integer.MAX_VALUE; // 初始化实际代价为无穷大
            totalCost[i] = Integer.MAX_VALUE; // 初始化总代价为无穷大
        }

        cost[start] = 0; // 起点到起点的实际代价为0
        totalCost[start] = heuristic[start]; // 起点到目标的总代价为启发式函数值

        PriorityQueue<Node> priorityQueue = new PriorityQueue<>(Comparator.comparingInt(node -> node.totalCost));
        priorityQueue.offer(new Node(start, totalCost[start]));

        while (!priorityQueue.isEmpty()) {
            Node currentNode = priorityQueue.poll();

            int current = currentNode.vertex;

            if (current == target) {
                return cost[current]; // 返回从起点到目标的实际代价
            }

            for (int neighbor : graph[current]) {
                int newCost = cost[current] + 1; // 假设每条边的代价为1
                if (newCost < cost[neighbor]) {
                    cost[neighbor] = newCost;
                    totalCost[neighbor] = newCost + heuristic[neighbor];
                    priorityQueue.offer(new Node(neighbor, totalCost[neighbor]));
                }
            }
        }

        return -1; // 没有找到从起点到目标的路径
    }

    private static int calculateHeuristic(int current, int target) {
        // 这里可以根据具体情况实现启发式函数，例如曼哈顿距离、欧几里得距离等
        return Math.abs(current - target);
    }

    private static class Node {
        int vertex;
        int totalCost;

        public Node(int vertex, int totalCost) {
            this.vertex = vertex;
            this.totalCost = totalCost;
        }
    }

    public static void main(String[] args) {
        // 例子：有向图的邻接表表示
        int[][] graph = {
            {1, 2},     // 0
            {3, 4},     // 1
            {5},        // 2
            {6, 7},     // 3
            {8},        // 4
            {9},        // 5
            {10},       // 6
            {10},       // 7
            {10},       // 8
            {},         // 9
            {}          // 10
        };

        int[] arr = {1, 50, 20, 39, 12, 58, 66, 99, 2, 5, 4};

        // 线性搜索
        int linearResult = linearSearch(arr, 58);
        System.out.println("Linear Search: " + (linearResult != -1 ? "Found at index " + linearResult : "Not found"));

        // 二分搜索（前提是数组已排序）
        Arrays.sort(arr);
        int binaryResult = binarySearch(arr, 58);
        System.out.println("Binary Search: " + (binaryResult != -1 ? "Found at index " + binaryResult : "Not found"));

        // 广度优先搜索
        boolean bfsResult = bfs(graph, 0, 10);
        System.out.println("BFS: " + (bfsResult ? "Path exists" : "Path does not exist"));

        // 深度优先搜索
        boolean dfsResult = dfs(graph, 0, 10);
        System.out.println("DFS: " + (dfsResult ? "Path exists" : "Path does not exist"));



 // A*搜索算法
        int aStarResult = aStarSearch(graph, 0, 10);
        System.out.println("A* Search: " + (aStarResult != -1 ? "Path cost is " + aStarResult : "Path does not exist"));
    }
}
```
