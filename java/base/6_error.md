# Java 异常处理

## 一、异常分类

在 Java 中，异常可以分为以下几类：

1. **检查异常（Checked Exceptions）：** 这些异常在编译时必须被处理，否则代码将无法通过编译。常见的检查异常包括 `IOException`、`SQLException` 等。

2. **未检查异常（Unchecked Exceptions）：** 也称为运行时异常，这些异常在编译时不会被检查，通常是由程序错误或逻辑错误导致的。常见的未检查异常包括 `NullPointerException`、`ArrayIndexOutOfBoundsException` 等。

3. **错误（Errors）：** 这些是无法通过程序代码处理的严重问题，通常是由于系统故障或资源耗尽导致的。常见的错误包括 `OutOfMemoryError`、`StackOverflowError` 等。

## 二、异常处理

### 1）try-catch-finally

在 Java 中，异常处理通常使用 `try-catch-finally` 语句块来实现。

**语法：**

```java
try {
    // 可能会抛出异常的代码
} catch (ExceptionType1 e1) {
    // 处理 ExceptionType1 类型的异常
} catch (ExceptionType2 e2) {
    // 处理 ExceptionType2 类型的异常
} finally {
    // 最终会执行的代码块，无论是否发生异常
}
```

在 `try` 块中放置可能抛出异常的代码，在 `catch` 块中捕获并处理异常，`finally` 块中放置无论是否发生异常都需要执行的代码。

**示例：**

```java
public class Example {
    public static void main(String[] args) {
        try {
            int result = 10 / 0; // 可能抛出 ArithmeticException
        } catch (ArithmeticException e) {
            System.out.println("发生算术异常: " + e.getMessage());
        } finally {
            System.out.println("这是 finally 块，无论如何都会执行。");
        }
    }
}
```

### 2） throws 声明

`throws` 关键字用于在方法声明中指明该方法可能抛出的异常。这可以将异常传递给调用方法的地方处理。

**语法：**

```java
public void methodName() throws ExceptionType {
    // 方法体
}
```

**示例：**

```java
public class Example {
    public static void main(String[] args) {
        try {
            riskyMethod();
        } catch (Exception e) {
            System.out.println("捕获到异常: " + e.getMessage());
        }
    }

    public static void riskyMethod() throws Exception {
        throw new Exception("这是一个异常");
    }
}
```

### 3）自定义异常

自定义异常是指用户自己定义的异常类，通常继承自 `Exception` 类或其子类。

**步骤：**

1. 创建一个继承自 `Exception` 的类。
2. 在类中定义构造方法。

**示例：**

```java
// 定义自定义异常
class CustomException extends Exception {
    public CustomException(String message) {
        super(message);
    }
}

// 使用自定义异常
public class Example {
    public static void main(String[] args) {
        try {
            testCustomException();
        } catch (CustomException e) {
            System.out.println("捕获到自定义异常: " + e.getMessage());
        }
    }

    public static void testCustomException() throws CustomException {
        throw new CustomException("这是一个自定义异常");
    }
}
```

## 三、最佳实践

1. **精细化异常处理：** 尽量使用精细化的异常处理，即捕获并处理特定类型的异常，而不是使用通用的 `Exception` 类型。

2. **避免捕获所有异常：** 不要过度使用 `catch(Exception e)` 来捕获所有异常，而应该根据具体情况选择捕获特定类型的异常。

3. **及时释放资源：** 在 `finally` 块中释放资源，确保资源的正确释放，避免资源泄漏。

4. **日志记录：** 在捕获和处理异常时，记录异常信息到日志中，以便排查和分析问题。

5. **异常链传递：** 在处理异常时，可以通过 `Throwable` 的构造函数将当前异常与原始异常进行链接，形成异常链，以便追踪异常的来源。

## 四、项目代码片段

### 1）代码片段（1）

> 以下代码片段展示了一个控制器方法，处理文件导入并在过程中使用了异常处理机制。

```java
// 代码片段（1）：From ～ OrderStorageOutController.java
import cn.com.gthz.core.exception.ServiceException;

try {
    List<StorageOutListGoodsWeightInfo> list = ExcelUtil.read(file, StorageOutListGoodsWeightInfo.class);
    result = storageOutWeightService.importGoodsTemp(list, orderId, outListId, warehouseId, false);
} catch (Exception e) {
    throw new ServiceException("导入失败!");
}
return Result.ok().value(result);

// 其他：略
```

### 2）代码片段（2）

> `ServiceException` 是一个自定义异常类（**提供统一的封装**），继承自 `RuntimeException`。这个类的目的是提供一个更具体的异常，用于在服务层捕获和处理异常情况。

```java
// 代码片段（2）：From ～ ServiceException.java
package cn.com.gthz.core.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceException extends RuntimeException {
    /**
     * 状态码
     */
    private Integer code;
    /**
     * 异常信息
     */
    private String msg;

    public ServiceException(String msg){
        this.code = 500;
        this.msg = msg;
    }
}

// 其他：略
```

### 3）代码片段（3）

> `RuntimeException` 是 `Java` 标准库中的一个类，是所有运行时异常的父类。这些异常不需要在方法或构造函数的 `throws` 子句中声明。

```java
// 代码片段（3）：From ～ RuntimeException.java
public class RuntimeException extends Exception {
    // 其他：略
}
```

---

- [Java 异常处理](https://www.runoob.com/java/java-exceptions.html)
