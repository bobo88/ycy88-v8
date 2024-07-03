# SSM 是什么？

SSM 框架是 Spring、Spring MVC 和 MyBatis 三个框架的组合，用于构建 Java EE 应用程序。这个组合在实际项目开发中非常流行，因其灵活性和易用性而广受欢迎。

## 一、Spring

### 概念和作用

Spring 是一个开源的 Java 应用程序框架，提供了全面的基础设施支持，主要用于简化企业级应用程序的开发。

- **IoC（控制反转）**：通过依赖注入（Dependency Injection）管理对象的创建和生命周期，从而实现松耦合。
- **AOP（面向切面编程）**：通过分离横切关注点（如事务管理、日志记录等）来提高模块化。
- **事务管理**：提供声明式事务管理，简化数据库事务的处理。
- **集成各种框架**：Spring 可以无缝集成各种框架，如 Hibernate、JPA、MyBatis 等。

### 基本用法

`applicationContext.xml` 配置示例：

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- 配置数据源 -->
    <bean id="dataSource" class="org.apache.commons.dbcp2.BasicDataSource">
        <property name="driverClassName" value="com.mysql.cj.jdbc.Driver"/>
        <property name="url" value="jdbc:mysql://localhost:3306/mydb"/>
        <property name="username" value="root"/>
        <property name="password" value="password"/>
    </bean>

    <!-- 配置SqlSessionFactory -->
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <property name="dataSource" ref="dataSource"/>
    </bean>

    <!-- 配置Mapper扫描 -->
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="basePackage" value="com.example.mapper"/>
    </bean>

    <!-- 配置事务管理器 -->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>

    <!-- 启用注解驱动 -->
    <bean class="org.springframework.transaction.annotation.AnnotationTransactionAspect"/>
</beans>
```

## 二、Spring MVC

### 概念和作用

Spring MVC 是 Spring 框架的一个模块，提供了强大的 Web 应用程序开发支持。它基于 MVC（Model-View-Controller）设计模式，简化了 Web 应用程序的开发。

- **DispatcherServlet**：前端控制器，用于接收和分派请求。
- **Controller**：处理用户请求并返回模型和视图。
- **View**：渲染模型数据为用户可视化界面。
- **Model**：包含应用程序的数据和业务逻辑。

### 基本用法

`dispatcher-servlet.xml` 配置示例：

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                            http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <!-- 启用Spring MVC注解驱动 -->
    <mvc:annotation-driven/>

    <!-- 配置视图解析器 -->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/views/"/>
        <property name="suffix" value=".jsp"/>
    </bean>

    <!-- 扫描Controller包 -->
    <context:component-scan base-package="com.example.controller"/>

</beans>
```

Controller 示例：

```java
package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HelloController {

    @RequestMapping("/hello")
    public String hello(Model model) {
        model.addAttribute("message", "Hello, Spring MVC!");
        return "hello";
    }
}
```

## 三、MyBatis

### 概念和作用

MyBatis 是一个优秀的持久层框架，它消除了几乎所有的 JDBC 代码和手动设置参数以及检索结果集的工作。MyBatis 使用简单的 XML 或注解来配置和映射原生类型，接口和 Java 的 POJOs（Plain Old Java Objects）为数据库中的记录。

- **Mapper**：接口绑定 SQL 语句。
- **SqlSession**：用于执行 SQL 命令和映射查询结果。
- **XML 配置文件**：用于定义 SQL 映射。

### 基本用法

`mybatis-config.xml` 配置示例：

```xml
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <settings>
        <setting name="cacheEnabled" value="true"/>
        <setting name="lazyLoadingEnabled" value="true"/>
    </settings>
    <typeAliases>
        <package name="com.example.model"/>
    </typeAliases>
    <mappers>
        <package name="com.example.mapper"/>
    </mappers>
</configuration>
```

Mapper 接口示例：

```java
package com.example.mapper;

import com.example.model.User;
import org.apache.ibatis.annotations.Select;

public interface UserMapper {

    @Select("SELECT * FROM users WHERE id = #{id}")
    User getUserById(int id);
}
```

## 四、整合 SSM 框架

通过 Spring 进行统一管理，Spring 的 IoC 容器将 Spring MVC 和 MyBatis 整合在一起，使得它们可以相互协作。

### 主要步骤

1. **配置数据源和 SqlSessionFactory**：在 Spring 配置文件中配置数据源和 SqlSessionFactory。
2. **配置 Mapper 扫描**：使用 MapperScannerConfigurer 扫描 MyBatis 的 Mapper 接口。
3. **配置事务管理器**：在 Spring 中配置事务管理器以支持事务。
4. **配置 Spring MVC**：设置 DispatcherServlet、视图解析器和扫描 Controller 包。

综合配置示例：

```xml
<!-- applicationContext.xml -->
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                            http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
                            http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd">

    <!-- 配置数据源 -->
    <bean id="dataSource" class="org.apache.commons.dbcp2.BasicDataSource">
        <property name="driverClassName" value="com.mysql.cj.jdbc.Driver"/>
        <property name="url" value="jdbc:mysql://localhost:3306/mydb"/>
        <property name="username" value="root"/>
        <property name="password" value="password"/>
    </bean>

    <!-- 配置SqlSessionFactory -->
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <property name="dataSource" ref="dataSource"/>
    </bean>

    <!-- 配置Mapper扫描 -->
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="basePackage" value="com.example.mapper"/>
    </bean>

    <!-- 配置事务管理器 -->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>
    <tx:annotation-driven/>

    <!-- 启用注解驱动 -->
    <context:component-scan base-package="com.example"/>
</beans>
```

## 五、总结

SSM 框架（Spring、Spring MVC、MyBatis）组合提供了一个强大的工具集，用于构建现代 Java EE 应用程序。Spring 提供了全面的基础设施支持，Spring MVC 处理 Web 请求和响应，而 MyBatis 负责数据持久化。通过 Spring IoC 容器进行整合，这三个框架可以无缝协作，提高开发效率，减少样板代码。
