# 经典排序算法

## 一、十大排序算法

### 1. 冒泡排序（Bubble Sort）

冒泡排序是一种简单的排序算法。它多次遍历待排序的元素列表，每次比较相邻的两个元素，如果它们的顺序错误就交换它们。重复这个过程直到没有交换发生，即列表已经排序完成。

时间复杂度：最坏情况 O(n^2)，平均情况 O(n^2)

### 2. 选择排序（Selection Sort）

选择排序是一种简单直观的排序算法。它的工作原理是每次从待排序的数据中选择最小（或最大）的元素，将其放在已排序序列的末尾，直到全部元素排序完成。

时间复杂度：最坏情况 O(n^2)，平均情况 O(n^2)

### 3. 插入排序（Insertion Sort）

插入排序是一种简单直观的排序算法。它的工作原理是将待排序的数据分成已排序和未排序两部分，然后每次从未排序的部分取一个元素插入到已排序的部分，直到全部元素排序完成。

时间复杂度：最坏情况 O(n^2)，平均情况 O(n^2)

### 4. 希尔排序（Shell Sort）

希尔排序是插入排序的一种改进版本，也称为缩小增量排序。它通过将整个待排序的数据分成若干个子序列，对每个子序列进行直接插入排序，然后逐步缩小子序列的长度，最终完成排序。

时间复杂度：最坏情况 O(n log^2 n)，平均情况取决于步长序列的选择。

### 5. 归并排序（Merge Sort）

归并排序采用分治法，将待排序的数据分成两部分，分别进行递归排序，然后将已排序的两部分合并起来。归并排序具有稳定性和适应性。

时间复杂度：最坏情况 O(n log n)，平均情况 O(n log n)

### 6. 快速排序（Quick Sort）

快速排序也采用分治法，通过选择一个基准元素，将数据分成两部分，小于基准的放在左边，大于基准的放在右边，然后对左右两部分递归进行排序。

时间复杂度：最坏情况 O(n^2)，平均情况 O(n log n)

### 7. 堆排序（Heap Sort）

堆排序利用堆的性质进行排序，它首先将数据建成一个最大堆（或最小堆），然后将堆顶元素与堆底元素交换，依次缩小堆的范围，重复这个过程直到整个堆有序。

时间复杂度：最坏情况 O(n log n)，平均情况 O(n log n)

### 8. 计数排序（Counting Sort）

计数排序是一种非比较排序算法，它通过统计每个元素的出现次数，然后将元素按照顺序输出。计数排序适用于元素取值范围较小的情况。

时间复杂度：最坏情况 O(n + k)，其中 k 是元素取值范围。

### 9. 桶排序（Bucket Sort）

桶排序将元素分配到有限数量的桶中，然后对每个桶中的元素进行排序，最后按照桶的顺序将元素输出。桶排序适用于元素均匀分布在一个范围内的情况。

时间复杂度：最坏情况 O(n^2)，平均情况 O(n + k)，其中 k 是桶的数量。

### 10. 基数排序（Radix Sort）

基数排序按照每个元素的位数进行排序，它可以按照个位、十位、百位等依次进行排序。基数排序适用于元素是非负整数的情况。

时间复杂度：最坏情况 O(d \* (n + k))，其中 d 是最大元素的位数，k 是元素的基数。

## 二、代码实例

> 以数组 [1, 50, 20, 39, 12, 58, 66, 99, 2, 5, 4] 为例

### 1. Javascript 版本

```js
// 冒泡排序（Bubble Sort）
function bubbleSort(arr) {
  const n = arr.length
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
}

// 选择排序（Selection Sort）
function selectionSort(arr) {
  const n = arr.length
  for (let i = 0; i < n; i++) {
    let minIndex = i
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    ;[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
  }
}

// 插入排序（Insertion Sort）
function insertionSort(arr) {
  const n = arr.length
  for (let i = 1; i < n; i++) {
    let key = arr[i]
    let j = i - 1
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j]
      j--
    }
    arr[j + 1] = key
  }
}

// 希尔排序（Shell Sort）
function shellSort(arr) {
  const n = arr.length
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      let temp = arr[i]
      let j = i
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap]
        j -= gap
      }
      arr[j] = temp
    }
  }
}

// 归并排序（Merge Sort）
function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr
  }

  const mid = Math.floor(arr.length / 2)
  const left = arr.slice(0, mid)
  const right = arr.slice(mid)

  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  let result = []
  let leftIndex = 0
  let rightIndex = 0

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex])
      leftIndex++
    } else {
      result.push(right[rightIndex])
      rightIndex++
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex))
}

// 快速排序（Quick Sort）
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr
  }

  const pivot = arr[0]
  const left = []
  const right = []

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }

  return quickSort(left).concat(pivot, quickSort(right))
}

// 堆排序（Heap Sort）
function heapSort(arr) {
  const n = arr.length

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i)
  }

  for (let i = n - 1; i > 0; i--) {
    ;[arr[0], arr[i]] = [arr[i], arr[0]]
    heapify(arr, i, 0)
  }
}

function heapify(arr, n, i) {
  let largest = i
  const left = 2 * i + 1
  const right = 2 * i + 2

  if (left < n && arr[left] > arr[largest]) {
    largest = left
  }

  if (right < n && arr[right] > arr[largest]) {
    largest = right
  }

  if (largest !== i) {
    ;[arr[i], arr[largest]] = [arr[largest], arr[i]]
    heapify(arr, n, largest)
  }
}

// 计数排序（Counting Sort）
function countingSort(arr) {
  const max = Math.max(...arr)
  const count = Array(max + 1).fill(0)

  for (const num of arr) {
    count[num]++
  }

  let index = 0
  for (let i = 0; i <= max; i++) {
    while (count[i] > 0) {
      arr[index] = i
      index++
      count[i]--
    }
  }
}

// 桶排序（Bucket Sort）
function bucketSort(arr) {
  const buckets = []
  const n = arr.length

  for (let i = 0; i < n; i++) {
    buckets[i] = []
  }

  for (let i = 0; i < n; i++) {
    const bucketIndex = Math.floor((n * arr[i]) / (Math.max(...arr) + 1))
    buckets[bucketIndex].push(arr[i])
  }

  for (let i = 0; i < n; i++) {
    buckets[i].sort((a, b) => a - b)
  }

  let index = 0
  for (let i = 0; i < n; i++) {
    for (const num of buckets[i]) {
      arr[index] = num
      index++
    }
  }
}

// 基数排序（Radix Sort）
function radixSort(arr) {
  const max = Math.max(...arr)
  const maxDigitCount = String(max).length

  for (let k = 0; k < maxDigitCount; k++) {
    const digitBuckets = Array.from({ length: 10 }, () => [])

    for (let i = 0; i < arr.length; i++) {
      const digit = getDigit(arr[i], k)
      digitBuckets[digit].push(arr[i])
    }

    arr = [].concat(...digitBuckets)
  }

  return arr
}

function getDigit(num, place) {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10
}

// 示例数组
const exampleArray = [1, 50, 20, 39, 12, 58, 66, 99, 2, 5, 4]

// 调用排序函数
bubbleSort([...exampleArray])
console.log('Bubble Sort:', exampleArray)

selectionSort([...exampleArray])
console.log('Selection Sort:', exampleArray)

insertionSort([...exampleArray])
console.log('Insertion Sort:', exampleArray)

shellSort([...exampleArray])
console.log('Shell Sort:', exampleArray)

console.log('Merge Sort:', mergeSort([...exampleArray]))

console.log('Quick Sort:', quickSort([...exampleArray]))

heapSort([...exampleArray])
console.log('Heap Sort:', exampleArray)

countingSort([...exampleArray])
console.log('Counting Sort:', exampleArray)

bucketSort([...exampleArray])
console.log('Bucket Sort:', exampleArray)

console.log('Radix Sort:', radixSort([...exampleArray]))
```

### 2. Java 版本

```java
import java.util.Arrays;

public class SortingAlgorithms {

    // 冒泡排序（Bubble Sort）
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // 交换元素
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }

    // 选择排序（Selection Sort）
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n; i++) {
            int minIndex = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            // 交换元素
            int temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }

    // 插入排序（Insertion Sort）
    public static void insertionSort(int[] arr) {
        int n = arr.length;
        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }

    // 希尔排序（Shell Sort）
    public static void shellSort(int[] arr) {
        int n = arr.length;
        for (int gap = n / 2; gap > 0; gap /= 2) {
            for (int i = gap; i < n; i++) {
                int temp = arr[i];
                int j;
                for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                    arr[j] = arr[j - gap];
                }
                arr[j] = temp;
            }
        }
    }

    // 归并排序（Merge Sort）
    public static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }

    private static void merge(int[] arr, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;

        int[] leftArr = new int[n1];
        int[] rightArr = new int[n2];

        for (int i = 0; i < n1; ++i) {
            leftArr[i] = arr[left + i];
        }
        for (int j = 0; j < n2; ++j) {
            rightArr[j] = arr[mid + 1 + j];
        }

        int i = 0, j = 0;
        int k = left;
        while (i < n1 && j < n2) {
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
            k++;
        }

        while (i < n1) {
            arr[k] = leftArr[i];
            i++;
            k++;
        }

        while (j < n2) {
            arr[k] = rightArr[j];
            j++;
            k++;
        }
    }

    // 快速排序（Quick Sort）
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                // 交换元素
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        // 交换元素
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }

    // 堆排序（Heap Sort）
    public static void heapSort(int[] arr) {
        int n = arr.length;
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }
        for (int i = n - 1; i > 0; i--) {
            // 交换元素
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;

            heapify(arr, i, 0);
        }
    }

    private static void heapify(int[] arr, int n, int i) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }

        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }

        if (largest != i) {
            // 交换元素
            int temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;

            heapify(arr, n, largest);
        }
    }

    // 计数排序（Counting Sort）
    public static void countingSort(int[] arr) {
        int n = arr.length;
        int max = Arrays.stream(arr).max().orElse(0);
        int min = Arrays.stream(arr).min().orElse(0);

        int range = max - min + 1;

        int[] count = new int[range];
        int[] output = new int[n];

        for (int i : arr) {
            count[i - min]++;
        }

        for (int i = 1; i < range; i++) {
            count[i] += count[i - 1];
        }

        for (int i = n -

 1; i >= 0; i--) {
            output[count[arr[i] - min] - 1] = arr[i];
            count[arr[i] - min]--;
        }

        System.arraycopy(output, 0, arr, 0, n);
    }

    // 桶排序（Bucket Sort）
    public static void bucketSort(int[] arr) {
        int n = arr.length;
        int max = Arrays.stream(arr).max().orElse(0);
        int min = Arrays.stream(arr).min().orElse(0);
        int range = max - min + 1;

        int bucketSize = 5; // 桶的大小，可以根据实际情况调整
        int bucketCount = (range / bucketSize) + 1;
        int[][] buckets = new int[bucketCount][bucketSize];

        for (int i = 0; i < n; i++) {
            int bucketIndex = (arr[i] - min) / bucketSize;
            insertIntoBucket(buckets[bucketIndex], arr[i]);
        }

        int index = 0;
        for (int i = 0; i < bucketCount; i++) {
            for (int j = 0; j < bucketSize; j++) {
                if (buckets[i][j] != 0) {
                    arr[index++] = buckets[i][j];
                }
            }
        }
    }

    private static void insertIntoBucket(int[] bucket, int value) {
        int i;
        for (i = 0; i < bucket.length; i++) {
            if (bucket[i] == 0) {
                bucket[i] = value;
                break;
            }
        }

        if (i == bucket.length) {
            // 如果桶满了，可以选择其他排序算法对桶内元素进行排序，这里选择插入排序
            insertionSort(bucket);
        }
    }

    // 基数排序（Radix Sort）
    public static void radixSort(int[] arr) {
        int max = Arrays.stream(arr).max().orElse(0);
        for (int exp = 1; max / exp > 0; exp *= 10) {
            countingSortByDigit(arr, exp);
        }
    }

    private static void countingSortByDigit(int[] arr, int exp) {
        int n = arr.length;
        int[] output = new int[n];
        int[] count = new int[10];

        for (int i = 0; i < n; i++) {
            count[(arr[i] / exp) % 10]++;
        }

        for (int i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        for (int i = n - 1; i >= 0; i--) {
            output[count[(arr[i] / exp) % 10] - 1] = arr[i];
            count[(arr[i] / exp) % 10]--;
        }

        System.arraycopy(output, 0, arr, 0, n);
    }

    public static void main(String[] args) {
        int[] arr = {1, 50, 20, 39, 12, 58, 66, 99, 2, 5, 4};

        // 冒泡排序
        bubbleSort(arr.clone());
        System.out.println("Bubble Sort: " + Arrays.toString(arr));

        // 选择排序
        selectionSort(arr.clone());
        System.out.println("Selection Sort: " + Arrays.toString(arr));

        // 插入排序
        insertionSort(arr.clone());
        System.out.println("Insertion Sort: " + Arrays.toString(arr));

        // 希尔排序
        shellSort(arr.clone());
        System.out.println("Shell Sort: " + Arrays.toString(arr));

        // 归并排序
        mergeSort(arr.clone(), 0, arr.length - 1);
        System.out.println("Merge Sort: " + Arrays.toString(arr));

        // 快速排序
        quickSort(arr.clone(), 0, arr.length - 1);
        System.out.println("Quick Sort: " + Arrays.toString(arr));

        // 堆排序
        heapSort(arr.clone());
        System.out.println("Heap Sort: " + Arrays.toString(arr));

        // 计数排序
        countingSort(arr.clone());
        System.out.println("Counting Sort: " + Arrays.toString(arr));

        // 桶排序
        bucketSort(arr.clone());
        System.out.println("Bucket Sort: " + Arrays.toString(arr));

        // 基数排序
        radixSort(arr.clone());
        System.out.println("Radix Sort: " + Arrays.toString(arr));
    }
}
```
