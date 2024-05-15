# I/O 进阶

::: tip I/O 进阶
NIO、文件读写优化、序列化与反序列化。
:::

## 一、NIO (New I/O)

NIO 是 Java 中的一种高效的 I/O 处理方式，它提供了更多的控制和更高的性能，特别适用于需要处理大量连接的网络应用程序。NIO 主要包括以下几个关键组件：

1. **通道（Channel）：** 通道是 NIO 中用于传输数据的对象，可以理解为输入流和输出流的结合体。通道可以通过网络、文件、管道等方式传输数据。

2. **缓冲区（Buffer）：** 缓冲区是 NIO 中用于存储数据的对象，它是一个连续的、有限容量的内存区域，用于暂存要读取或写入的数据。

3. **选择器（Selector）：** 选择器是 NIO 中用于监控多个通道的对象，可以用来实现一个线程处理多个通道的 I/O 操作，提高系统的效率。

NIO 的主要优点在于它的非阻塞 I/O 模型，它允许一个线程同时处理多个通道的 I/O 操作，提高了系统的并发性能和吞吐量。

## 二、文件读写优化

1. **缓冲流（BufferedStream）：** 使用缓冲流可以减少 I/O 操作的次数，提高读写效率。例如，可以使用 `BufferedReader` 和 `BufferedWriter` 来进行文本文件的读写操作。

2. **文件通道（FileChannel）：** 直接使用文件通道进行文件读写操作，而不是通过字节流或字符流，可以提高性能。文件通道支持直接内存访问，可以减少数据在内存和磁盘之间的拷贝操作。

3. **内存映射文件（Memory-mapped File）：** 内存映射文件允许文件被映射到内存中的一个地址空间，从而可以直接在内存中对文件进行读写操作，避免了系统调用和数据拷贝，提高了性能。

## 三、序列化与反序列化

::: tip 作用
序列化和反序列化是 Java 中用于对象持久化和网络通信的机制，可以将对象转换为字节流进行存储、传输和共享。
:::

::: tip 原理
序列化过程将 **对象转换为字节序列**，包括对象的字段值和类描述信息，并写入输出流；**反序列化过程**从输入流中读取字节序列并根据类描述信息重新构造对象。
:::

::: tip 总结
序列化和反序列化是 Java 编程中重要的机制，它们可以实现对象的持久化、网络通信、分布式系统和缓存存储等功能，提高了程序的灵活性、可扩展性和性能。
:::

序列化是指将对象转换为字节流的过程，而反序列化是指将字节流转换为对象的过程。在 Java 中，可以通过实现 `Serializable` 接口来实现对象的序列化和反序列化。例如：

```java
import java.io.*;

class MyClass implements Serializable {
    private static final long serialVersionUID = 1L;
    private int id;
    private String name;

    // 省略构造函数和其他方法

    public void serialize(String filename) throws IOException {
        try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream(filename))) {
            out.writeObject(this);
        }
    }

    public static MyClass deserialize(String filename) throws IOException, ClassNotFoundException {
        try (ObjectInputStream in = new ObjectInputStream(new FileInputStream(filename))) {
            return (MyClass) in.readObject();
        }
    }
}
```

以上代码展示了一个简单的序列化和反序列化示例。对象可以通过 `serialize()` 方法序列化到文件中，然后通过 `deserialize()` 方法从文件中反序列化回来。

通过合理地利用 NIO、文件读写优化和序列化与反序列化等技术，可以提高 Java 程序的性能和效率，特别是在处理大量数据和复杂业务逻辑时。

---

- [Java 序列化](https://www.runoob.com/java/java-serialization.html)
