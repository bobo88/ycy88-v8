# 注解（Annotations）基础

Java 中的注解（Annotations）是一种元数据，可以为代码提供额外的信息。在 Java 中，注解广泛应用于代码生成、编译时检查和运行时处理等方面。注解可以通过反射机制进行操作。以下是关于注解基础的介绍，包括自定义注解、元注解和反射操作注解。

## 自定义注解

自定义注解是指由用户定义的注解，用于标记类、方法、字段等。自定义注解可以包含元素，就像方法一样。

### 示例

定义一个自定义注解`@MyAnnotation`，并将其应用于类和方法上。

```java
import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.METHOD})
public @interface MyAnnotation {
    String value() default "default value";
    int number() default 0;
}
```

- **@Retention**：指定注解的生命周期，`RetentionPolicy.RUNTIME`表示注解在运行时可用。
- **@Target**：指定注解可以应用的元素类型，例如类、方法、字段等。

使用自定义注解：

```java
@MyAnnotation(value = "ClassLevel", number = 1)
public class MyClass {

    @MyAnnotation(value = "MethodLevel", number = 2)
    public void myMethod() {
        // Method implementation
    }
}
```

## 元注解

元注解是用于定义其他注解的注解。常见的元注解包括：

- **@Retention**：指定注解的保留策略。
- **@Target**：指定注解的适用范围。
- **@Inherited**：指定注解是否可以被子类继承。
- **@Documented**：指定注解是否包含在 Javadoc 中。

### 示例

使用元注解定义注解：

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@Inherited
@Documented
public @interface MyFieldAnnotation {
    String description() default "This is a field annotation";
}
```

## 反射操作注解

通过反射可以在运行时获取注解信息，并对其进行操作。

### 示例

获取并操作注解：

```java
import java.lang.reflect.Method;

public class AnnotationReflectionExample {
    public static void main(String[] args) throws Exception {
        Class<MyClass> clazz = MyClass.class;

        // 获取类上的注解
        if (clazz.isAnnotationPresent(MyAnnotation.class)) {
            MyAnnotation classAnnotation = clazz.getAnnotation(MyAnnotation.class);
            System.out.println("Class annotation value: " + classAnnotation.value());
            System.out.println("Class annotation number: " + classAnnotation.number());
        }

        // 获取方法上的注解
        Method method = clazz.getMethod("myMethod");
        if (method.isAnnotationPresent(MyAnnotation.class)) {
            MyAnnotation methodAnnotation = method.getAnnotation(MyAnnotation.class);
            System.out.println("Method annotation value: " + methodAnnotation.value());
            System.out.println("Method annotation number: " + methodAnnotation.number());
        }
    }
}
```

## 完整示例

综合以上内容，以下是一个完整的示例，包括自定义注解、元注解以及反射操作注解。

### 自定义注解和元注解

```java
import java.lang.annotation.*;

// 自定义注解
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.METHOD})
public @interface MyAnnotation {
    String value() default "default value";
    int number() default 0;
}
```

### 使用自定义注解

```java
@MyAnnotation(value = "ClassLevel", number = 1)
public class MyClass {

    @MyAnnotation(value = "MethodLevel", number = 2)
    public void myMethod() {
        // Method implementation
    }
}
```

### 反射操作注解

```java
import java.lang.reflect.Method;

public class AnnotationReflectionExample {
    public static void main(String[] args) throws Exception {
        Class<MyClass> clazz = MyClass.class;

        // 获取类上的注解
        if (clazz.isAnnotationPresent(MyAnnotation.class)) {
            MyAnnotation classAnnotation = clazz.getAnnotation(MyAnnotation.class);
            System.out.println("Class annotation value: " + classAnnotation.value());
            System.out.println("Class annotation number: " + classAnnotation.number());
        }

        // 获取方法上的注解
        Method method = clazz.getMethod("myMethod");
        if (method.isAnnotationPresent(MyAnnotation.class)) {
            MyAnnotation methodAnnotation = method.getAnnotation(MyAnnotation.class);
            System.out.println("Method annotation value: " + methodAnnotation.value());
            System.out.println("Method annotation number: " + methodAnnotation.number());
        }
    }
}
```

## 总结

- **自定义注解**：通过`@interface`关键字定义，可以包含元素，类似于方法。
- **元注解**：用于定义其他注解的注解，包括`@Retention`、`@Target`、`@Inherited`和`@Documented`。
- **反射操作注解**：通过反射机制在运行时获取注解信息，并进行相应操作。
