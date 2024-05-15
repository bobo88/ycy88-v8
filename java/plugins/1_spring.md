# Spring

::: tip 核心功能
Spring IOC、AOP、Spring MVC。
:::

## 一、IOC（Inversion of Control，控制反转）

在传统的程序设计中，通常由程序本身来控制对象的创建和管理，而在 Spring 中，控制权发生了颠倒，对象的创建和管理交给了 Spring 容器。这种控制反转的思想使得程序更加灵活，降低了组件之间的耦合度。

```java
// 一、IOC（Inversion of Control，控制反转）
public class MyService {
    private MyRepository repository;

    // 使用构造器注入
    public MyService(MyRepository repository) {
        this.repository = repository;
    }

    // 使用setter方法注入
    public void setRepository(MyRepository repository) {
        this.repository = repository;
    }
}
```

## 二、AOP（Aspect-Oriented Programming，面向切面编程）

`AOP` 是一种编程范式，用于解耦业务逻辑和横切关注点（如日志、事务、安全等），通过将这些横切关注点模块化，并在需要的时候将其动态地切入到业务逻辑中，从而提高了代码的可维护性和可重用性。

```java
// 二、AOP（Aspect-Oriented Programming，面向切面编程）
@Aspect
@Component
public class LoggingAspect {

    @Before("execution(public * com.example.MyService.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        System.out.println("Before executing " + joinPoint.getSignature());
    }
}
```

## 三、Spring MVC（Model-View-Controller，模型-视图-控制器）

`Spring MVC` 是基于 MVC 设计模式的 Web 应用程序开发框架，它将应用程序分为模型、视图和控制器三个部分，通过 `DispatcherServlet` 统一管理请求和响应，实现了请求的分发和处理，视图的渲染以及结果的返回。

```java
// 三、Spring MVC（Model-View-Controller，模型-视图-控制器）
@Controller
public class MyController {

    @Autowired
    private MyService service;

    @RequestMapping("/hello")
    public String hello(Model model) {
        String message = service.getMessage();
        model.addAttribute("message", message);
        return "hello"; // 视图名称
    }
}
```
