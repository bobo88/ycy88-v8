# MySQL

> SQL 基础、索引、存储过程、触发器、事务管理

MySQL 是一个流行的关系型数据库管理系统（RDBMS），支持广泛的 SQL 语法和功能。

## 一、SQL 基础

### 查询数据

```sql
-- 查询所有列
SELECT * FROM table_name;

-- 查询特定列
SELECT column1, column2 FROM table_name;

-- 条件查询
SELECT * FROM table_name WHERE condition;

-- 排序查询
SELECT * FROM table_name ORDER BY column_name;

-- 分组查询
SELECT column1, COUNT(*) FROM table_name GROUP BY column1;

-- 连接查询
SELECT * FROM table1 JOIN table2 ON table1.id = table2.id;
```

### 插入数据

```sql
INSERT INTO table_name (column1, column2, ...)
VALUES (value1, value2, ...);
```

### 更新数据

```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

### 删除数据

```sql
DELETE FROM table_name
WHERE condition;
```

## 二、索引

索引在 MySQL 中用于加快数据的检索速度，常见的索引类型包括普通索引、唯一索引、主键索引和全文索引。创建索引可以使用`CREATE INDEX`语句。

```sql
CREATE INDEX index_name ON table_name (column_name);
```

## 三、存储过程

存储过程是一组预编译的 SQL 语句，类似于函数，可以被多次调用。存储过程可以接受参数，并且可以包含控制流语句。

```sql
DELIMITER //

CREATE PROCEDURE procedure_name(param1 INT)
BEGIN
    SELECT * FROM table_name WHERE column1 = param1;
END //

DELIMITER ;
```

## 四、触发器

触发器是 MySQL 中的一种特殊的存储过程，它在特定的数据库操作（如 INSERT、UPDATE、DELETE）发生时自动执行。

```sql
CREATE TRIGGER trigger_name
AFTER INSERT ON table_name
FOR EACH ROW
BEGIN
    -- 触发器逻辑
    INSERT INTO log_table (message) VALUES ('New row inserted');
END;
```

## 五、事务管理

MySQL 支持事务以保证数据的一致性和完整性。事务通过`BEGIN TRANSACTION`、`COMMIT`和`ROLLBACK`语句进行管理。

```sql
-- 开始事务
BEGIN TRANSACTION;

-- 提交事务
COMMIT;

-- 回滚事务
ROLLBACK;
```

## 六、高级用法

SQL 的高级部分涉及到更复杂的查询、性能优化、窗口函数、CTE（公共表达式）、事务隔离级别和锁定机制等。

### 1）复杂查询

#### 子查询

子查询是嵌套在其他查询中的查询语句，可以用作查询条件、表达式或者作为其他子查询的一部分。

```sql
SELECT column1, column2
FROM table1
WHERE column1 IN (SELECT column1 FROM table2 WHERE condition);
```

#### 联合查询

联合查询用于将多个查询的结果合并成一个结果集。常见的联合查询有 UNION、UNION ALL、INTERSECT 和 MINUS。

```sql
SELECT column1 FROM table1
UNION
SELECT column1 FROM table2;
```

#### EXISTS 和 NOT EXISTS

EXISTS 和 NOT EXISTS 用于检查子查询是否返回任何行。

```sql
SELECT column1 FROM table1 t1
WHERE EXISTS (SELECT 1 FROM table2 t2 WHERE t1.id = t2.id);
```

### 2）性能优化

#### 索引优化

优化查询性能的重要手段之一是创建合适的索引。除了普通索引外，还有唯一索引、主键索引和全文索引等。

```sql
CREATE INDEX index_name ON table_name (column_name);
```

#### 查询优化器

MySQL 的查询优化器负责分析查询语句，确定最优执行计划以提高查询效率。

### 3）窗口函数

窗口函数允许在查询结果集的特定窗口上计算聚合值，例如计算排名、累计和、移动平均等。

```sql
SELECT column1, column2,
       ROW_NUMBER() OVER (PARTITION BY column1 ORDER BY column2) AS row_number
FROM table_name;
```

### 4）公共表达式（CTE）

公共表达式（Common Table Expression，CTE）是一种临时结果集，只在查询执行期间存在，提供更简洁的 SQL 语法和更好的可读性。

```sql
WITH cte_name AS (
    SELECT column1, column2 FROM table1 WHERE condition
)
SELECT * FROM cte_name;
```

### 5）事务隔离级别和锁定机制

#### 事务隔离级别

事务隔离级别定义了一个事务中的修改如何可见给其他事务，包括读取未提交数据、可重复读、读取已提交和串行化等级别。

```sql
SET TRANSACTION ISOLATION LEVEL level_name;
```

#### 锁定机制

MySQL 使用锁定机制来控制并发访问数据库中的数据，包括行级锁、表级锁和页级锁等。

```sql
SELECT * FROM table_name FOR UPDATE;
```

### 6）示例

```sql
-- 使用窗口函数计算每个部门的平均工资及排名
WITH dept_avg_salary AS (
    SELECT department_id, AVG(salary) AS avg_salary,
           RANK() OVER (PARTITION BY department_id ORDER BY AVG(salary) DESC) AS salary_rank
    FROM employees
    GROUP BY department_id
)
SELECT department_id, avg_salary, salary_rank
FROM dept_avg_salary
WHERE salary_rank <= 3;
```

## 七、总结

MySQL 作为一种常用的关系型数据库管理系统，提供了丰富的 SQL 语法和功能，包括数据查询、操作、索引管理、存储过程、触发器和事务管理等。这些功能使得 MySQL 成为处理复杂数据操作和高并发请求的强大工具。
