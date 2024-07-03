# 泛型

> Typescript 中也有「泛型」的概念。

## 一、概念 & 语法

泛型（Generics）是 Java 中的一种参数化类型的机制，允许在类或方法中使用类型参数来表示类或方法的参数类型。其语法包括使用尖括号（<>）定义泛型类型和泛型方法和通配符，例如：`ArrayList<String>`、`public <T> void printList(List<T> list)`。

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

## 五、类型参数

类型参数是用来指定泛型类型的具体类型。通常在定义泛型类、接口和方法时使用。

- **语法**：类型参数通常用尖括号`<>`括起来，常见的命名规范是单个大写字母，例如`T`、`E`、`K`、`V`等。
- **T**：`Type`，表示一个泛型类型，通常用在类、接口或方法中，表示任意类型。
- **E**：`Element`，表示集合的元素类型，通常用于集合框架中，例如`List<E>`、`Set<E>`等。
- **K**：`Key`，表示键的类型，通常用于键值对结构中，例如`Map<K, V>`中的键。
- **V**：`Value`，表示值的类型，通常用于键值对结构中，例如`Map<K, V>`中的值。

```java
public class Example {
    // 泛型方法，使用类型参数T
    public static <T> void printArray(T[] array) {
        for (T element : array) {
            System.out.println(element);
        }
    }

    public static void main(String[] args) {
        Integer[] intArray = {1, 2, 3};
        String[] stringArray = {"Hello", "World"};

        // 使用泛型方法
        printArray(intArray);
        printArray(stringArray);
    }
}

// 泛型类，使用类型参数E
public class GenericList<E> {
    private List<E> list = new ArrayList<>();

    public void add(E element) {
        list.add(element);
    }

    public E get(int index) {
        return list.get(index);
    }
}

// 泛型接口，使用类型参数K和V
public interface GenericMap<K, V> {
    void put(K key, V value);
    V get(K key);
}

// 泛型类实现泛型接口
public class GenericHashMap<K, V> implements GenericMap<K, V> {
    private Map<K, V> map = new HashMap<>();

    @Override
    public void put(K key, V value) {
        map.put(key, value);
    }

    @Override
    public V get(K key) {
        return map.get(key);
    }
}
```

## 六、通配符

通配符是泛型中一种特殊的类型参数，用于表示未知类型。常用的通配符有`?`、`? extends T`和`? super T`。

- **`?`**：表示任意类型。
- **`? extends T`**：表示类型是`T`或`T`的子类（上界）。
- **`? super T`**：表示类型是`T`或`T`的父类（下界）。

- **使用示例**：

```java
import java.util.ArrayList;
import java.util.List;

public class WildcardDemo {
    public static void main(String[] args) {
        List<Integer> intList = new ArrayList<>();
        intList.add(1);
        intList.add(2);
        printList(intList);

        List<String> stringList = new ArrayList<>();
        stringList.add("Hello");
        stringList.add("World");
        printList(stringList);
    }

    // 使用通配符?表示可以接受任何类型的List
    public static void printList(List<?> list) {
        for (Object element : list) {
            System.out.println(element);
        }
    }
}
```

- **上界通配符示例**：

```java
import java.util.List;
import java.util.ArrayList;

class Animal {
    public void sound() {
        System.out.println("Animal sound");
    }
}

class Dog extends Animal {
    @Override
    public void sound() {
        System.out.println("Bark");
    }
}

public class UpperBoundWildcardDemo {
    public static void main(String[] args) {
        List<Dog> dogs = new ArrayList<>();
        dogs.add(new Dog());
        makeAnimalsSound(dogs);
    }

    // 使用上界通配符? extends Animal，表示可以接受Animal及其子类的List
    public static void makeAnimalsSound(List<? extends Animal> animals) {
        for (Animal animal : animals) {
            animal.sound();
        }
    }
}
```

- **下界通配符示例**：

```java
import java.util.List;
import java.util.ArrayList;

public class LowerBoundWildcardDemo {
    public static void main(String[] args) {
        List<Object> objects = new ArrayList<>();
        addNumber(objects);
        objects.forEach(System.out::println);
    }

    // 使用下界通配符? super Integer，表示可以接受Integer及其父类的List
    public static void addNumber(List<? super Integer> list) {
        list.add(1);
        list.add(2);
        list.add(3);
    }
}
```

## 七、具体实例

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
