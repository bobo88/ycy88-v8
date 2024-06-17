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

### 1）使用字节流复制文件内容

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

### 2）使用字符流读取和写入

使用字符流读取和写入文件内容。

```java
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.io.Writer;

public class FileReadWriteExample {
    public static void main(String[] args) {
        // Write to file
        try (Writer writer = new FileWriter("example.txt")) {
            writer.write("Hello, World!\nThis is a test file.");
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Read from file
        try (Reader reader = new FileReader("example.txt")) {
            int data;
            while ((data = reader.read()) != -1) {
                System.out.print((char) data);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

## 五、其他知识点

### 1）缓冲流

缓冲流用于提高 I/O 操作的效率，通过减少直接对底层设备（如文件系统）的访问次数。

#### BufferedReader 和 BufferedWriter

这些类用于字符流的缓冲。

**示例：使用 BufferedReader 读取文件**

```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class BufferedReaderExample {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(new FileReader("example.txt"))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

**示例：使用 BufferedWriter 写入文件**

```java
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class BufferedWriterExample {
    public static void main(String[] args) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("example.txt"))) {
            writer.write("Hello, World!");
            writer.newLine();
            writer.write("This is a buffered writer example.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

#### BufferedInputStream 和 BufferedOutputStream

这些类用于字节流的缓冲。

**示例：使用 BufferedInputStream 和 BufferedOutputStream 复制文件**

```java
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class BufferedStreamExample {
    public static void main(String[] args) {
        try (BufferedInputStream inputStream = new BufferedInputStream(new FileInputStream("source.txt"));
             BufferedOutputStream outputStream = new BufferedOutputStream(new FileOutputStream("destination.txt"))) {

            byte[] buffer = new byte[1024];
            int length;
            while ((length = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, length);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### 2）序列化

Java 提供了对象序列化机制，将对象转换为字节流，从而可以保存到文件或通过网络传输。

#### Serializable 接口

实现 Serializable 接口的类可以被序列化。

**示例：序列化和反序列化对象**

```java
import java.io.*;

class Person implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + '}';
    }
}

public class SerializationExample {
    public static void main(String[] args) {
        Person person = new Person("John", 30);

        // 序列化对象
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("person.ser"))) {
            oos.writeObject(person);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // 反序列化对象
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream("person.ser"))) {
            Person deserializedPerson = (Person) ois.readObject();
            System.out.println(deserializedPerson);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```

### 3）文件操作

Java 提供了丰富的文件操作 API，可以进行文件和目录的创建、删除、重命名等操作。

#### Files 工具类

`java.nio.file.Files` 提供了大量静态方法来简化文件操作。

**示例：使用 Files 复制文件**

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class FilesCopyExample {
    public static void main(String[] args) {
        Path source = Paths.get("source.txt");
        Path destination = Paths.get("destination.txt");

        try {
            Files.copy(source, destination);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### 4）读取和写入属性文件

属性文件通常用于配置 Java 应用程序，`java.util.Properties` 类提供了方便的方法来读取和写入属性文件。

**示例：读取和写入属性文件**

```java
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Properties;

public class PropertiesExample {
    public static void main(String[] args) {
        Properties properties = new Properties();

        // 写入属性文件
        try (FileOutputStream output = new FileOutputStream("config.properties")) {
            properties.setProperty("database.url", "jdbc:mysql://localhost:3306/mydb");
            properties.setProperty("database.username", "user");
            properties.setProperty("database.password", "password");
            properties.store(output, null);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // 读取属性文件
        try (FileInputStream input = new FileInputStream("config.properties")) {
            properties.load(input);
            System.out.println(properties.getProperty("database.url"));
            System.out.println(properties.getProperty("database.username"));
            System.out.println(properties.getProperty("database.password"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### 5）内存映射文件

内存映射文件可以将文件的一部分或全部映射到内存中，这对于处理大文件非常有效。

**示例：使用内存映射文件读取大文件**

```java
import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;

public class MemoryMappedFileExample {
    public static void main(String[] args) {
        try (RandomAccessFile file = new RandomAccessFile("largefile.txt", "r")) {
            FileChannel channel = file.getChannel();
            MappedByteBuffer buffer = channel.map(FileChannel.MapMode.READ_ONLY, 0, channel.size());

            for (int i = 0; i < buffer.limit(); i++) {
                System.out.print((char) buffer.get());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### 6）使用 Java NIO

Java NIO 提供了非阻塞 I/O 操作的支持，适用于高性能应用程序。

**示例：使用 NIO 复制文件**

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class NioFileCopyExample {
    public static void main(String[] args) {
        Path source = Paths.get("source.txt");
        Path destination = Paths.get("destination.txt");

        try {
            Files.copy(source, destination);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

---

- [Java 流(Stream)、文件(File)和 IO](https://www.runoob.com/java/java-files-io.html)
