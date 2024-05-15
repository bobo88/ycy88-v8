# Java I/O 流

## 一、概念

在 Java 中，I/O（Input/Output）流是用来处理输入和输出数据的一种机制。它通过流的方式将数据从源头（输入）传输到目的地（输出），并提供了一组类和方法来实现数据的读取和写入操作。

Java 中的 I/O 流主要分为两种类型：

1. **字节流（Byte Streams）：** 字节流以字节为单位进行读写操作，适用于处理二进制数据。`InputStream` 和 `OutputStream` 是字节流的抽象类，常见的字节流类包括 `FileInputStream`、`FileOutputStream`、`BufferedInputStream`、`BufferedOutputStream` 等。

2. **字符流（Character Streams）：** 字符流以字符为单位进行读写操作，适用于处理文本数据。`Reader` 和 `Writer` 是字符流的抽象类，常见的字符流类包括 `FileReader`、`FileWriter`、`BufferedReader`、`BufferedWriter` 等。

## 二、作用

1. **读取数据：** 通过输入流从外部数据源（如文件、网络连接、内存等）读取数据到程序中。
2. **写入数据：** 通过输出流将程序中的数据写入到外部目标（如文件、网络连接、内存等）中。
3. **处理数据：** 可以对读取的数据进行处理、转换、过滤等操作，然后再写入到输出目标中。
4. **连接程序和外部资源：** I/O 流提供了连接程序和外部资源的通道，使得程序能够与文件系统、网络、其他程序等进行数据交换和通信。

## 三、最佳实践

1. **使用缓冲流：** 对于频繁的读写操作，建议使用缓冲流（如 `BufferedInputStream`、`BufferedOutputStream`、`BufferedReader`、`BufferedWriter`），以提高读写性能。
2. **正确关闭流：** 使用完流后，应该及时关闭流以释放资源，避免资源泄漏。可以使用 try-with-resources 语句（Java 7 引入）来自动关闭流。
3. **适当处理异常：** 在处理 I/O 操作时，要注意捕获和处理可能抛出的异常，以保证程序的稳定性和可靠性。
4. **使用适当的字符编码：** 在处理文本数据时，应该使用适当的字符编码（如 UTF-8）来避免字符集转换导致的乱码问题。
5. **使用 NIO：** 对于需要高性能的 I/O 操作，可以考虑使用 NIO（New I/O）包提供的非阻塞 I/O 和多路复用技术。 NIO 包括 `java.nio` 包和 `java.nio.channels` 包，提供了更灵活和高效的 I/O 方式。

## 四、代码举例

使用 Java 的字节流（`FileInputStream` 和 `FileOutputStream`）来实现文件的复制操作：

```java
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class FileCopyExample {
    public static void main(String[] args) {
        String sourceFile = "source.txt";
        String targetFile = "target.txt";

        try (
            FileInputStream fis = new FileInputStream(sourceFile);
            FileOutputStream fos = new FileOutputStream(targetFile);
        ) {
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = fis.read(buffer)) != -1) {
                fos.write(buffer, 0, bytesRead);
            }
            System.out.println("File copied successfully!");
        } catch (IOException e) {
            System.err.println("Error copying file: " + e.getMessage());
        }
    }
}
```

在这个示例中：

- `FileInputStream` 用于从源文件读取数据。
- `FileOutputStream` 用于将数据写入目标文件。
- 我们使用 `try-with-resources` 语句来自动关闭流，无需手动关闭。
- 我们定义了一个字节数组作为缓冲区，用于临时存储从输入流读取的数据。
- 使用 `read()` 方法从输入流中读取数据，并使用 `write()` 方法将数据写入输出流。

这只是 Java I/O 流的一个简单示例，实际应用中可能涉及更复杂的操作和更多的异常处理。

---

- [Java 流(Stream)、文件(File)和 IO](https://www.runoob.com/java/java-files-io.html)
