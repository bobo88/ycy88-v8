# Java 异常处理

## 一、异常分类

在 Java 中，异常可以分为以下几类：

1. **检查异常（Checked Exceptions）：** 这些异常在编译时必须被处理，否则代码将无法通过编译。常见的检查异常包括 `IOException`、`SQLException` 等。

2. **未检查异常（Unchecked Exceptions）：** 也称为运行时异常，这些异常在编译时不会被检查，通常是由程序错误或逻辑错误导致的。常见的未检查异常包括 `NullPointerException`、`ArrayIndexOutOfBoundsException` 等。

3. **错误（Errors）：** 这些是无法通过程序代码处理的严重问题，通常是由于系统故障或资源耗尽导致的。常见的错误包括 `OutOfMemoryError`、`StackOverflowError` 等。

## 二、异常处理

在 Java 中，异常处理通常使用 `try-catch-finally` 语句块来实现。基本的异常处理语法如下：

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

## 三、最佳实践

1. **精细化异常处理：** 尽量使用精细化的异常处理，即捕获并处理特定类型的异常，而不是使用通用的 `Exception` 类型。

2. **避免捕获所有异常：** 不要过度使用 `catch(Exception e)` 来捕获所有异常，而应该根据具体情况选择捕获特定类型的异常。

3. **及时释放资源：** 在 `finally` 块中释放资源，确保资源的正确释放，避免资源泄漏。

4. **日志记录：** 在捕获和处理异常时，记录异常信息到日志中，以便排查和分析问题。

5. **异常链传递：** 在处理异常时，可以通过 `Throwable` 的构造函数将当前异常与原始异常进行链接，形成异常链，以便追踪异常的来源。

---

- [Java 异常处理](https://www.runoob.com/java/java-exceptions.html)
