# 字符串处理

在 Java 中，字符串处理是非常常见的操作，涉及到字符串的拼接、截取、替换等多种操作。除了直接使用字符串类（`String`）外，还可以使用 `StringBuilder` 和 `StringBuffer` 类来进行字符串的操作，特别是在需要频繁修改字符串内容时，使用这两个类可以提高性能。

## 一、字符串常见操作

### 1）拼接字符串

```java
String str1 = "Hello";
String str2 = "World";
String result = str1 + " " + str2;
System.out.println(result); // Output: Hello World
```

### 2）获取字符串长度

```java
String str = "Hello World";
int length = str.length();
System.out.println(length); // Output: 11
```

### 3）截取子字符串

```java
String str = "Hello World";
String subStr = str.substring(6); // 从索引 6 开始截取到末尾
System.out.println(subStr); // Output: World
```

### 4）替换字符串中的内容

```java
String str = "Hello World";
String replacedStr = str.replace("World", "Java");
System.out.println(replacedStr); // Output: Hello Java
```

### 5）检索子字符串的位置

```java
String str = "Hello World";
int index = str.indexOf("World");
System.out.println(index); // Output: 6
```

## 二、StringBuilder 和 StringBuffer 的使用

`StringBuilder` 和 `StringBuffer` 类提供了可变的、线程安全的字符串操作功能，适用于频繁修改字符串内容的场景。两者的使用方式几乎相同，唯一的区别在于 `StringBuffer` 是线程安全的，而 `StringBuilder` 不是。

```java
StringBuilder sb = new StringBuilder();
sb.append("Hello");
sb.append(" ");
sb.append("World");
String result = sb.toString();
System.out.println(result); // Output: Hello World
```

以上代码使用 `StringBuilder` 将多个字符串拼接在一起，并最终转换为一个新的字符串。`StringBuilder` 和 `StringBuffer` 还提供了其他一些常用的方法，如 `insert()`、`delete()`、`reverse()` 等，用于字符串的插入、删除和翻转操作。
