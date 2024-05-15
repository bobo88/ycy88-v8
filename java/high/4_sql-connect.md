# Java 数据库连接

## 一、作用

Java 数据库连接的作用是在 Java 程序中与数据库进行交互，包括执行 SQL 查询、更新数据、事务管理等操作，从而实现对数据库的读写功能。

## 二、具体步骤

1. **加载驱动程序：** 使用 `Class.forName()` 方法加载数据库驱动程序。

```java
Class.forName("com.mysql.jdbc.Driver");
```

2. **建立连接：** 使用 `DriverManager.getConnection()` 方法建立与数据库的连接。

```java
String url = "jdbc:mysql://localhost:3306/mydatabase";
String username = "username";
String password = "password";
Connection connection = DriverManager.getConnection(url, username, password);
```

3. **创建 Statement 或 PreparedStatement：** 使用 `Connection.createStatement()` 或 `Connection.prepareStatement()` 方法创建 Statement 或 PreparedStatement 对象，用于执行 SQL 语句。

```java
Statement statement = connection.createStatement();
```

4. **执行 SQL 语句：** 使用创建的 Statement 或 PreparedStatement 对象执行 SQL 语句。

```java
ResultSet resultSet = statement.executeQuery("SELECT * FROM mytable");
```

5. **处理结果集：** 对执行 SQL 语句后返回的 ResultSet 进行处理，获取查询结果。

```java
while (resultSet.next()) {
    String column1Value = resultSet.getString("column1");
    // 处理结果
}
```

6. **关闭连接：** 在程序结束时或不再需要连接时，使用 `Connection.close()` 方法关闭数据库连接，释放资源。

```java
connection.close();
```

## 三、注意事项

- **异常处理：** 需要在代码中适当处理数据库连接可能出现的异常，避免出现未处理的异常导致程序崩溃或资源泄漏。
- **连接池管理：** 对于频繁进行数据库操作的应用程序，建议使用连接池管理数据库连接，提高性能和资源利用率。
- **安全性考虑：** 在连接数据库时，需要谨慎处理敏感信息，如数据库密码等，避免泄露导致安全风险。
