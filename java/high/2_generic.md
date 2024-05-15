# 泛型

## 一、概念 & 语法

泛型（Generics）是 Java 中的一种参数化类型的机制，允许在类或方法中使用类型参数来表示类或方法的参数类型。其语法包括使用尖括号（<>）定义泛型类型和泛型方法，例如：`ArrayList<String>`、`public <T> void printList(List<T> list)`。

## 二、作用

1. **类型安全：** 泛型可以在编译时检查代码的类型安全性，避免了在运行时出现类型转换错误的可能性。
2. **代码复用：** 泛型可以提高代码的复用性，使得类或方法能够适用于多种类型。
3. **性能优化：** 泛型能够在编译时进行类型检查和优化，避免了在运行时进行类型转换的性能损耗。

## 三、应用场景

1. **集合类：** Java 中的集合类（如 ArrayList、HashMap 等）广泛使用了泛型，以便在编译时确保集合中只能存储特定类型的元素。
2. **泛型方法：** 在编写泛型方法时，可以根据具体的需求传入不同类型的参数，从而实现通用的算法和逻辑。
3. **接口和类的泛型化：** 在定义接口和类时，可以使用泛型来定义参数化类型，使得接口和类能够适用于不同的数据类型。

## 四、最佳实践

1. **避免使用原始类型：** 在使用集合类或泛型类时，尽量避免使用原始类型，而应该使用泛型类型以提高类型安全性。
2. **使用通配符：** 在泛型类或方法中，可以使用通配符（通常是 `?`）来表示未知类型，从而增加灵活性。
3. **注意类型擦除：** 泛型信息在编译时会被擦除，因此在运行时无法获得泛型的具体类型信息，需要注意泛型类型的转换和边界问题。

## 五、具体实例

```java
import java.util.ArrayList;
import java.util.List;

public class GenericExample {
    public static void main(String[] args) {
        List<String> stringList = new ArrayList<>(); // 使用泛型的集合类
        stringList.add("Hello");
        stringList.add("World");
        printList(stringList); // 调用泛型方法
    }

    // 泛型方法，可以接受任意类型的 List，并打印其中的元素
    public static <T> void printList(List<T> list) {
        for (T item : list) {
            System.out.println(item);
        }
    }
}
```

以上示例展示了如何定义泛型集合类和泛型方法，并在程序中使用泛型来实现通用的打印方法。
