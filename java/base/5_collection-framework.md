# 集合框架

集合框架（Collection Framework）是 Java 中用于存储和操作对象集合的一组接口和类。其中，List、Set 和 Map 是集合框架中的三个主要接口，它们分别用于处理有序列表、无序集合和键值对映射。

![An image](/images/java/list-set-map-1.png)

![An image](/images/java/list-set-map-2.png)

## 一、List

List 接口表示有序的元素集合，可以包含重复元素。List 允许按照索引（位置）访问集合中的元素，支持通过索引增删改查操作。常见的 List 实现类有 ArrayList、LinkedList 和 Vector。例如：

```java
List<String> list = new ArrayList<>();
list.add("apple");
list.add("banana");
list.add("apple");
System.out.println(list); // 输出：[apple, banana, apple]
```

## 二、Set

Set 接口表示无序的元素集合，不允许包含重复元素。Set 保证了元素的唯一性，并提供了一些基本的集合操作，如添加、删除、查找等。常见的 Set 实现类有 HashSet、LinkedHashSet 和 TreeSet。例如：

```java
Set<String> set = new HashSet<>();
set.add("apple");
set.add("banana");
set.add("apple"); // 重复元素不会被添加
System.out.println(set); // 输出：[banana, apple]
```

## 三、Map

Map 接口表示键值对映射关系的集合，每个键都唯一，并且对应一个值。Map 提供了根据键查找值的功能，并支持增删改查操作。常见的 Map 实现类有 HashMap、LinkedHashMap 和 TreeMap。例如：

```java
Map<String, Integer> map = new HashMap<>();
map.put("apple", 1);
map.put("banana", 2);
System.out.println(map.get("apple")); // 输出：1
```
