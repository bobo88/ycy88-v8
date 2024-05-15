# 设计模式 - 代理模式

::: tip 设计模式 - 代理模式
代理模式（Proxy Pattern）为其他对象提供一种代理以控制对这个对象的访问。代理模式属于结构型设计模式，分为静态代理和动态代理两种形式。
:::

## 一、概念

### 1、定义

代理模式（Proxy Pattern）为其他对象提供一种代理以控制对这个对象的访问。代理模式属于结构型设计模式，分为静态代理和动态代理两种形式。

## 二、概要

### 1、主要角色

- **抽象主题（Subject）：** 定义了真实主题和代理主题的共同接口。
- **真实主题（Real Subject）：** 实现了抽象主题接口，是被代理的对象。
- **代理主题（Proxy Subject）：** 实现了抽象主题接口，并持有对真实主题的引用，可以在其操作前后加入额外的逻辑。

### 2、工作流程

1. **客户端（Client）**：通过抽象主题接口调用真实主题或代理主题的方法。
2. **抽象主题（Subject）**：定义了真实主题和代理主题的共同接口。
3. **真实主题（Real Subject）**：实现了抽象主题接口，是被代理的对象。
4. **代理主题（Proxy Subject）**：实现了抽象主题接口，持有对真实主题的引用，并在其操作前后加入额外的逻辑。

## 三、静态代理

### 1、概念

静态代理是在编译时确定代理类，由程序员手动编写代理类的代码。

### 2、示例代码

#### 2.1 Java 示例

```java
// 抽象主题
interface Subject {
    void request();
}

// 真实主题
class RealSubject implements Subject {
    @Override
    public void request() {
        System.out.println("Real Subject: Handling request");
    }
}

// 代理主题
class ProxySubject implements Subject {
    private RealSubject realSubject;

    public ProxySubject(RealSubject realSubject) {
        this.realSubject = realSubject;
    }

    @Override
    public void request() {
        System.out.println("Proxy Subject: Pre-processing");
        realSubject.request();
        System.out.println("Proxy Subject: Post-processing");
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        RealSubject realSubject = new RealSubject();
        ProxySubject proxySubject = new ProxySubject(realSubject);

        proxySubject.request();
        // Output:
        // Proxy Subject: Pre-processing
        // Real Subject: Handling request
        // Proxy Subject: Post-processing
    }
}
```

#### 2.2 JavaScript 示例

```javascript
// 抽象主题
class Subject {
  request() {
    console.log('Default Subject: Handling request')
  }
}

// 真实主题
class RealSubject extends Subject {
  request() {
    console.log('Real Subject: Handling request')
  }
}

// 代理主题
class ProxySubject extends Subject {
  constructor(realSubject) {
    super()
    this.realSubject = realSubject
  }

  request() {
    console.log('Proxy Subject: Pre-processing')
    this.realSubject.request()
    console.log('Proxy Subject: Post-processing')
  }
}

// 客户端
const realSubject = new RealSubject()
const proxySubject = new ProxySubject(realSubject)

proxySubject.request()
// Output:
// Proxy Subject: Pre-processing
// Real Subject: Handling request
// Proxy Subject: Post-processing
```

## 四、动态代理

### 1、概念

动态代理是在运行时通过反射等机制动态生成代理类。

### 2、示例代码

#### 2.1 Java 示例

```java
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

// 抽象主题
interface Subject {
    void request();
}

// 真实主题
class RealSubject implements Subject {
    @Override
    public void request() {
        System.out.println("Real Subject: Handling request");
    }
}

// 代理主题
class DynamicProxySubject implements InvocationHandler {
    private Object realSubject;

    public Dynamic

ProxySubject(Object realSubject) {
        this.realSubject = realSubject;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("Dynamic Proxy Subject: Pre-processing");
        Object result = method.invoke(realSubject, args);
        System.out.println("Dynamic Proxy Subject: Post-processing");
        return result;
    }
}

// 客户端
public class Client {
    public static void main(String[] args) {
        RealSubject realSubject = new RealSubject();
        DynamicProxySubject dynamicProxySubject = new DynamicProxySubject(realSubject);

        Subject proxyInstance = (Subject) Proxy.newProxyInstance(
                Subject.class.getClassLoader(),
                new Class[]{Subject.class},
                dynamicProxySubject
        );

        proxyInstance.request();
        // Output:
        // Dynamic Proxy Subject: Pre-processing
        // Real Subject: Handling request
        // Dynamic Proxy Subject: Post-processing
    }
}
```

#### 2.2 JavaScript 示例

```javascript
// 抽象主题
class Subject {
  request() {
    console.log('Default Subject: Handling request')
  }
}

// 真实主题
class RealSubject extends Subject {
  request() {
    console.log('Real Subject: Handling request')
  }
}

// 代理主题
class DynamicProxySubject {
  constructor(realSubject) {
    this.realSubject = realSubject
  }

  createProxy() {
    return new Proxy(this.realSubject, {
      apply: (target, thisArg, args) => {
        console.log('Dynamic Proxy Subject: Pre-processing')
        const result = Reflect.apply(target, thisArg, args)
        console.log('Dynamic Proxy Subject: Post-processing')
        return result
      }
    })
  }
}

// 客户端
const realSubject = new RealSubject()
const dynamicProxySubject = new DynamicProxySubject(realSubject)

const proxyInstance = dynamicProxySubject.createProxy()
proxyInstance.request()
// Output:
// Dynamic Proxy Subject: Pre-processing
// Real Subject: Handling request
// Dynamic Proxy Subject: Post-processing
```

## 五、VUE 中实例

- Proxy：VUE3 中使用 proxy 对象来实现数据的代理。
  - VUE2：Object.defindProperty()方法
- computed 属性：
- 拦截器：
  - HTTP 相关的拦截器：使用拦截器 interceptor 可以提前对 request 请求和 response 返回进行一些预处理；
  - 路由跳转的拦截器。
- ...

---

- [设计模式之代理模式](https://dunwu.github.io/design/pages/5a865c/)
- [代理模式 | 菜鸟教程](https://www.runoob.com/design-pattern/proxy-pattern.html)
