# Java 标准库

## 一、Java 标准库

### 1. 常用类库

1. **String**

   - **概述**: String 类用于表示字符串，它是一个不可变的类，一旦创建了字符串对象，它的值就不能改变。
   - **常用方法**:
     - `length()`: 返回字符串的长度
     - `charAt(int index)`: 返回指定索引处的字符
     - `substring(int beginIndex, int endIndex)`: 返回字符串的子字符串
     - `toLowerCase() / toUpperCase()`: 将字符串转换为小写/大写
     - `trim()`: 去除字符串两端的空白字符
     - `split(String regex)`: 根据正则表达式分割字符串

2. **Math**

   - **概述**: Math 类包含用于执行基本数学运算的方法，如初等指数、对数、平方根和三角函数。
   - **常用方法**:
     - `abs(double a)`: 返回绝对值
     - `max(double a, double b) / min(double a, double b)`: 返回两个数中的较大值/较小值
     - `sqrt(double a)`: 返回平方根
     - `pow(double a, double b)`: 返回第一个参数的第二个参数次幂
     - `random()`: 返回一个随机数，范围在 0.0 到 1.0 之间

3. **Random**

   - **概述**: Random 类用于生成伪随机数。
   - **常用方法**:
     - `nextInt()`: 返回一个随机的整数
     - `nextInt(int bound)`: 返回一个在 0（包括）到指定值（不包括）之间的随机整数
     - `nextDouble()`: 返回一个随机的双精度浮点数，范围在 0.0 到 1.0 之间
     - `nextBoolean()`: 返回一个随机的布尔值

4. **Date**

   - **概述**: Date 类表示特定的瞬间，精确到毫秒。
   - **常用方法**:
     - `getTime()`: 返回自 1970 年 1 月 1 日 00:00:00 GMT 以来此 Date 对象表示的毫秒数
     - `after(Date when)`: 测试此日期是否在指定日期之后
     - `before(Date when)`: 测试此日期是否在指定日期之前
     - `compareTo(Date anotherDate)`: 比较两个日期

5. **Calendar**
   - **概述**: Calendar 类用于操作日期和时间的工具类。
   - **常用方法**:
     - `get(int field)`: 返回给定日历字段的值
     - `set(int field, int value)`: 将给定的日历字段设置为给定值
     - `add(int field, int amount)`: 根据日历规则，为给定的日历字段添加或减去指定的时间量
     - `getTime()`: 返回一个表示此 Calendar 时间值（从历元至现在的毫秒偏移量）的 Date 对象

### 2. 集合框架

1. **ArrayList**

   - **概述**: ArrayList 类是一个可以动态改变大小的数组。
   - **常用方法**:
     - `add(E e)`: 将指定的元素追加到此列表的末尾
     - `get(int index)`: 返回此列表中指定位置的元素
     - `set(int index, E element)`: 用指定的元素替代此列表中指定位置的元素
     - `remove(int index)`: 移除此列表中指定位置的元素
     - `size()`: 返回此列表的元素数

2. **LinkedList**

   - **概述**: LinkedList 类是一个元素链表实现，既可以作为列表使用，也可以作为队列使用。
   - **常用方法**:
     - `add(E e)`: 将指定的元素追加到此列表的末尾
     - `get(int index)`: 返回此列表中指定位置的元素
     - `remove(int index)`: 移除此列表中指定位置的元素
     - `size()`: 返回此列表的元素数
     - `addFirst(E e)`: 在此列表的开头插入指定的元素
     - `addLast(E e)`: 将指定的元素追加到此列表的末尾
     - `removeFirst()`: 移除并返回此列表的第一个元素
     - `removeLast()`: 移除并返回此列表的最后一个元素

3. **HashSet**

   - **概述**: HashSet 类实现了 Set 接口，背后是一个哈希表（实际上是 HashMap）。
   - **常用方法**:
     - `add(E e)`: 将指定的元素添加到此 set 中（如果尚未存在）
     - `remove(Object o)`: 如果存在，移除此 set 中的指定元素
     - `contains(Object o)`: 如果此 set 包含指定的元素，则返回 true
     - `size()`: 返回此 set 中的元素的数量

4. **TreeSet**

   - **概述**: TreeSet 类实现了 Set 接口，背后是一个红黑树（实际上是 TreeMap）。
   - **常用方法**:
     - `add(E e)`: 将指定的元素添加到此 set 中
     - `remove(Object o)`: 如果存在，移除此 set 中的指定元素
     - `contains(Object o)`: 如果此 set 包含指定的元素，则返回 true
     - `size()`: 返回此 set 中的元素的数量
     - `first()`: 返回当前 set 中的第一个（最低）元素
     - `last()`: 返回当前 set 中的最后一个（最高）元素

5. **HashMap**

   - **概述**: HashMap 类基于哈希表实现 Map 接口。它不保证映射的顺序，特别是它不保证该顺序恒久不变。
   - **常用方法**:
     - `put(K key, V value)`: 将指定的值与此映射中的指定键关联
     - `get(Object key)`: 返回指定键所映射的值
     - `remove(Object key)`: 如果存在，移除指定键的映射关系
     - `containsKey(Object key)`: 如果此映射包含指定键的映射关系，则返回 true
     - `size()`: 返回此映射中的键值映射关系数

6. **TreeMap**
   - **概述**: TreeMap 类基于红黑树实现 Map 接口。它根据其键的自然顺序对映射进行排序，或者根据创建映射时提供的比较器进行排序，具体取决于使用的构造方法。
   - **常用方法**:
     - `put(K key, V value)`: 将指定的值与此映射中的指定键关联
     - `get(Object key)`: 返回指定键所映射的值
     - `remove(Object key)`: 如果存在，移除指定键的映射关系
     - `containsKey(Object key)`: 如果此映射包含指定键的映射关系，则返回 true
     - `size()`: 返回此映射中的键值映射关系数
     - `firstKey()`: 返回此映射中当前第一个（最低）键
     - `lastKey()`: 返回此映射中当前最后一个（最高）键

## 二、示例代码

### 使用 String 类

```java
public class StringExample {
  public static void main(String[] args) {
    String str = "Hello, World!";
    System.out.println("Length: " + str.length());
    System.out.println("Character at index 1: " + str.charAt(1));
    System.out.println("Substring: " + str.substring(7, 12));
    System.out.println("Lowercase: " + str.toLowerCase());
  }
}
```

### 使用 ArrayList 类

```java
import java.util.ArrayList;

public class ArrayListExample {
  public static void main(String[] args) {
    ArrayList<String> list = new ArrayList<>();
    list.add("Apple");
    list.add("Banana");
    list.add("Orange");

    System.out.println("List size: " + list.size());
    System.out.println("First element: " + list.get(0));

    list.remove(1);
    System.out.println("After removal, list size: " + list.size());
  }
}
```

### 使用 HashMap 类

```java
import java.util.HashMap;

public class HashMapExample {
  public static void main(String[] args) {
    HashMap<String, Integer> map = new HashMap<>();
    map.put("Apple", 1);
    map.put("Banana", 2);
    map.put("Orange", 3);

    System.out.println("Value for 'Banana': " + map.get("Banana"));

    map.remove("Banana");
    System.out.println("After removal, contains 'Banana': " + map.containsKey("Banana"));
  }
}
```

### 使用 TreeMap

```java
import java.util.TreeMap;

public class TreeMapExample {
  public static void main(String[] args) {
    TreeMap<String, Integer> map = new TreeMap<>();
    map.put("Apple", 1);
    map.put("Banana", 2);
    map.put("Orange", 3);

    System.out.println("TreeMap size: " + map.size());
    System.out.println("Value for 'Banana': " + map.get("Banana"));

    map.remove("Banana");
    System.out.println("After removal, TreeMap size: " + map.size());

    System.out.println("First key: " + map.firstKey());
    System.out.println("Last key: " + map.lastKey());
  }
}
```

### 使用 HashSet

```java
import java.util.HashSet;

public class HashSetExample {
  public static void main(String[] args) {
    HashSet<String> set = new HashSet<>();
    set.add("Apple");
    set.add("Banana");
    set.add("Orange");

    System.out.println("HashSet size: " + set.size());
    System.out.println("HashSet contains 'Banana': " + set.contains("Banana"));

    set.remove("Banana");
    System.out.println("After removal, HashSet size: " + set.size());
    System.out.println("HashSet contains 'Banana': " + set.contains("Banana"));
  }
}
```

### 使用 TreeSet

```java
import java.util.TreeSet;

public class TreeSetExample {
  public static void main(String[] args) {
    TreeSet<String> set = new TreeSet<>();
    set.add("Apple");
    set.add("Banana");
    set.add("Orange");

    System.out.println("TreeSet size: " + set.size());
    System.out.println("TreeSet contains 'Banana': " + set.contains("Banana"));

    set.remove("Banana");
    System.out.println("After removal, TreeSet size: " + set.size());
    System.out.println("TreeSet contains 'Banana': " + set.contains("Banana"));

    System.out.println("First element: " + set.first());
    System.out.println("Last element: " + set.last());
  }
}
```
