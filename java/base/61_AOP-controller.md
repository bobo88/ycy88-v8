# AOP 控制器

## 一、基本概念

在 Java 开发中，AOP（Aspect-Oriented Programming，面向切面编程）是一种编程范式，它通过在程序运行期间动态地将横切关注点（cross-cutting concerns）与核心业务逻辑进行解耦，从而提高了代码的模块化和可维护性。AOP 通过将横切关注点抽象为切面（Aspect），并在需要的地方将切面织入到应用程序中，以实现对特定行为的统一处理。

在 Spring 框架中，AOP 是一个重要的功能模块，它可以帮助开发人员更轻松地实现诸如日志记录、事务管理、安全控制等横切关注点。在 Spring MVC 中，控制器（Controller）是 MVC 模式中的一个组件，负责接收 HTTP 请求并将其转发给合适的处理程序（Handler）。通过结合 AOP 和控制器，可以实现对控制器中特定方法的横切关注点的统一处理。

下面是一个简单的示例，演示了如何使用 AOP 在 Spring MVC 中控制器中添加日志记录功能：

```java
// 定义切面类，实现日志记录功能
@Component
@Aspect
public class LoggingAspect {

    @Before("execution(* com.example.controller.*.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        System.out.println("Logging before method: " + joinPoint.getSignature().getName());
    }

    @AfterReturning(pointcut = "execution(* com.example.controller.*.*(..))", returning = "result")
    public void logAfterReturning(JoinPoint joinPoint, Object result) {
        System.out.println("Logging after returning from method: " + joinPoint.getSignature().getName());
    }
}

// 定义控制器类
@RestController
public class MyController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello World";
    }
}
```

在上述示例中，LoggingAspect 类定义了一个切面，其中的 logBefore 和 logAfterReturning 方法分别在控制器中的方法执行前后记录日志。通过在方法上使用@Aspect 注解声明该类为切面，并在切面方法上使用@Before 和@AfterReturning 等注解定义切点和通知类型。然后，在控制器类中的 hello 方法上添加@GetMapping 注解，将该方法映射为处理 GET 请求的处理程序，当客户端发送 GET 请求时，LoggingAspect 中定义的切面将被织入到 hello 方法中，从而实现对该方法的日志记录功能。

## 二、事务

- 分类
  - 申明式事务
  - 编程式事务
- 传播行为
  - require
  - require_new
  - supports
  - not_supports
  - never
  - nested
  - mandatory
- 隔离级别
  - 允许脏读
  - 读已提交
  - 可重复度
  - 序列化
