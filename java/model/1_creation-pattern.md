# 「创建型模式」汇总

> 对象实例化的模式，创建型模式用于 **解耦对象的实例化过程**，确保对象创建时的 **一致性** 和 **灵活性**。

::: tip 模式汇总

- 单例模式
- 工厂方法模式
- 抽象工厂
- 建造者模式
- 原型模式

:::

## 一、单例模式

### 1）定义/描述

::: tip 定义/描述
单例模式确保一个类只有一个实例，并提供全局访问点。该模式常用于需要全局唯一实例的场景，例如配置管理器、线程池等。
:::

### 2）实现方式

单例模式可以通过懒汉式和饿汉式两种方式实现：

- **懒汉式**：实例在第一次使用时创建，节省资源，但需要考虑线程安全。
- **饿汉式**：实例在类加载时创建，线程安全但可能浪费资源。

### 3）优缺点

**优点：**

- 全局唯一实例，节省资源。
- 提供全局访问点。

**缺点：**

- 不适合多线程环境，需要处理线程安全问题。
- 难以扩展和测试。

### 4）具体代码片段

**懒汉式单例模式（线程安全）**

```java
public class LazySingleton {
    private static LazySingleton instance;

    private LazySingleton() {}

    public static synchronized LazySingleton getInstance() {
        if (instance == null) {
            instance = new LazySingleton();
        }
        return instance;
    }
}
```

**饿汉式单例模式**

```java
public class HungrySingleton {
    private static final HungrySingleton instance = new HungrySingleton();

    private HungrySingleton() {}

    public static HungrySingleton getInstance() {
        return instance;
    }
}
```

**双重检查锁定（DCL）单例模式**

```java
public class DCLSingleton {
    private static volatile DCLSingleton instance;

    private DCLSingleton() {}

    public static DCLSingleton getInstance() {
        if (instance == null) {
            synchronized (DCLSingleton.class) {
                if (instance == null) {
                    instance = new DCLSingleton();
                }
            }
        }
        return instance;
    }
}
```

**静态内部类单例模式**

```java
public class StaticInnerClassSingleton {
    private StaticInnerClassSingleton() {}

    private static class Holder {
        private static final StaticInnerClassSingleton INSTANCE = new StaticInnerClassSingleton();
    }

    public static StaticInnerClassSingleton getInstance() {
        return Holder.INSTANCE;
    }
}
```

### 5）应用场景

- **配置管理**：需要全局唯一实例来存储配置信息。
- **线程池**：确保线程池的唯一实例，避免多线程环境中的资源竞争。
- **缓存**：实现全局唯一缓存实例，提高性能。
- **日志记录**：确保日志记录器的唯一实例，便于统一管理日志输出。

## 二、工厂方法模式

### 1）定义/描述

::: tip 定义/描述
工厂方法模式定义了一个创建对象的接口，但由子类决定实例化哪一个类。工厂方法使一个类的实例化延迟到其子类。这个模式的目的是将对象的创建过程延迟到子类，避免在父类中硬编码具体类的实例化。
:::

### 2）实现方式

工厂方法模式涉及以下角色：

- **抽象产品（Product）**：定义产品的接口。
- **具体产品（ConcreteProduct）**：实现抽象产品接口的具体类。
- **抽象工厂（Creator）**：声明工厂方法用于返回产品实例，通常是抽象类。
- **具体工厂（ConcreteCreator）**：实现工厂方法，返回具体产品实例。

### 3）优缺点

**优点：**

- 符合单一职责原则：工厂方法将对象的创建过程封装起来。
- 符合开放-关闭原则：新增产品类时，只需添加对应的具体工厂，不需要修改已有代码。
- 易于扩展和维护：可以方便地增加新的产品和工厂。

**缺点：**

- 增加了系统的复杂性，需要更多的类和接口。
- 每增加一个具体产品类，都需要增加相应的具体工厂类。

### 4）具体代码片段

**产品接口**

```java
public interface Product {
    void use();
}
```

**具体产品**

```java
public class ConcreteProductA implements Product {
    @Override
    public void use() {
        System.out.println("Using Product A");
    }
}

public class ConcreteProductB implements Product {
    @Override
    public void use() {
        System.out.println("Using Product B");
    }
}
```

**抽象工厂**

```java
public abstract class Creator {
    public abstract Product createProduct();
}
```

**具体工厂**

```java
public class ConcreteCreatorA extends Creator {
    @Override
    public Product createProduct() {
        return new ConcreteProductA();
    }
}

public class ConcreteCreatorB extends Creator {
    @Override
    public Product createProduct() {
        return new ConcreteProductB();
    }
}
```

**使用工厂方法模式**

```java
public class FactoryMethodDemo {
    public static void main(String[] args) {
        Creator creatorA = new ConcreteCreatorA();
        Product productA = creatorA.createProduct();
        productA.use();

        Creator creatorB = new ConcreteCreatorB();
        Product productB = creatorB.createProduct();
        productB.use();
    }
}
```

### 5）应用场景

- **框架设计**：框架通常会提供一组抽象产品和抽象工厂，让具体应用来实现具体产品和工厂，确保框架的扩展性。
- **数据库连接**：不同数据库有不同的连接实现，通过工厂方法模式可以在运行时选择具体的数据库连接对象。
- **日志记录**：不同日志系统（如日志文件、数据库、远程服务器）的记录方式不同，通过工厂方法模式可以动态选择具体的日志记录实现。

## 三、抽象工厂模式

### 1）定义/描述

::: tip 定义/描述
抽象工厂模式提供一个创建一系列相关或相互依赖对象的接口，而无需指定它们具体的类。它通过将具体产品的创建推迟到具体工厂子类，从而实现产品族的创建。
:::

### 2）实现方式

抽象工厂模式涉及以下角色：

- **抽象工厂（AbstractFactory）**：声明一组创建一系列产品的方法。
- **具体工厂（ConcreteFactory）**：实现抽象工厂接口，负责创建具体产品对象。
- **抽象产品（AbstractProduct）**：为每种产品声明接口。
- **具体产品（ConcreteProduct）**：实现抽象产品接口的具体类。

### 3）优缺点

**优点：**

- 符合开放-关闭原则：增加新的产品族时，只需增加相应的具体工厂类，不需要修改已有代码。
- 符合单一职责原则：工厂负责创建对象，客户端负责使用对象，职责分离。
- 提高了系统的一致性：创建一系列相关产品时，可以保证它们之间的协调一致。

**缺点：**

- 增加了系统的复杂性：需要定义多个工厂和产品接口类。
- 扩展产品等级结构时比较困难：如果需要增加一个新的产品等级，需要修改抽象工厂及所有具体工厂类。

### 4）具体代码片段

**抽象产品**

```java
// 产品A接口
public interface ProductA {
    void use();
}

// 产品B接口
public interface ProductB {
    void eat();
}
```

**具体产品**

```java
// 具体产品A1
public class ConcreteProductA1 implements ProductA {
    @Override
    public void use() {
        System.out.println("Using Product A1");
    }
}

// 具体产品A2
public class ConcreteProductA2 implements ProductA {
    @Override
    public void use() {
        System.out.println("Using Product A2");
    }
}

// 具体产品B1
public class ConcreteProductB1 implements ProductB {
    @Override
    public void eat() {
        System.out.println("Eating Product B1");
    }
}

// 具体产品B2
public class ConcreteProductB2 implements ProductB {
    @Override
    public void eat() {
        System.out.println("Eating Product B2");
    }
}
```

**抽象工厂**

```java
public interface AbstractFactory {
    ProductA createProductA();
    ProductB createProductB();
}
```

**具体工厂**

```java
// 具体工厂1
public class ConcreteFactory1 implements AbstractFactory {
    @Override
    public ProductA createProductA() {
        return new ConcreteProductA1();
    }

    @Override
    public ProductB createProductB() {
        return new ConcreteProductB1();
    }
}

// 具体工厂2
public class ConcreteFactory2 implements AbstractFactory {
    @Override
    public ProductA createProductA() {
        return new ConcreteProductA2();
    }

    @Override
    public ProductB createProductB() {
        return new ConcreteProductB2();
    }
}
```

**使用抽象工厂模式**

```java
public class AbstractFactoryDemo {
    public static void main(String[] args) {
        // 使用工厂1创建产品族
        AbstractFactory factory1 = new ConcreteFactory1();
        ProductA productA1 = factory1.createProductA();
        ProductB productB1 = factory1.createProductB();
        productA1.use();
        productB1.eat();

        // 使用工厂2创建产品族
        AbstractFactory factory2 = new ConcreteFactory2();
        ProductA productA2 = factory2.createProductA();
        ProductB productB2 = factory2.createProductB();
        productA2.use();
        productB2.eat();
    }
}
```

### 5）应用场景

- **UI 系统**：支持不同操作系统（如 Windows、MacOS）的 UI 组件创建。
- **产品族**：比如创建不同品牌的家电（如电视、冰箱、洗衣机等）时，可以保证同一品牌家电的一致性。
- **数据库访问**：不同数据库（如 MySQL、PostgreSQL）在数据访问层的操作封装。

## 工厂方法模式 VS 抽象工厂模式

::: danger 工厂方法模式 ｜ 抽象工厂模式

- 定义：
  - **工厂方法模式**：定义一个用于创建对象的接口，让子类决定实例化哪一个类。工厂方法使一个类的实例化延迟到其子类。
  - **抽象工厂模式**：提供一个创建一系列相关或相互依赖对象的接口，而无需指定它们具体的类。一个抽象工厂通常会包含多个工厂方法，用于创建一组相关的产品对象。
- 主要区别：
  - 1）产品的数量和结构：
    - **工厂方法模式**：关注一个产品等级结构（一个产品类的家族），每个工厂方法负责创建一种产品。
    - **抽象工厂模式**：关注多个产品等级结构（多个产品类的家族），每个抽象工厂负责创建一系列相关的产品。
  - 2）抽象层次：
    - **工厂方法模式**：在子类中实现创建对象的方法，工厂方法由具体工厂类实现。
    - **抽象工厂模式**：提供创建一系列相关对象的方法，这些方法通常在抽象工厂类中声明，并在具体工厂类中实现。
  - 3）使用场景：
    - **工厂方法模式**：当一个类不知道它所需要的对象的具体类型时，使用工厂方法模式；或者当一个类希望通过其子类来指定创建对象的具体类型时，使用工厂方法模式。
    - **抽象工厂模式**：当需要创建一组相关或相互依赖的对象时，使用抽象工厂模式；或者当系统需要独立于它的产品的创建、组合和表示时，使用抽象工厂模式。

:::

### 类图对比

**工厂方法模式**：

```
   Creator
    |
+-----------+
| Factory   |
+-----------+
| create()  |<-------+
+-----------+        |
                     |
                +----------+
                | Product  |
                +----------+
                | operation|
                +----------+
```

**抽象工厂模式**：

```
   AbstractFactory
    |
+-----------------+
| FactoryA        |
| FactoryB        |
+-----------------+
| createProductA  |<--------+
| createProductB  |         |
+-----------------+         |
                            |
                     +---------------+
                     | AbstractProduct|
                     +--------------- +
                     | operationA     |
                     | operationB     |
                     +--------------- +
```

### 示例代码

**工厂方法模式**：

```java
// 产品接口
interface Product {
    void use();
}

// 具体产品
class ConcreteProduct implements Product {
    public void use() {
        System.out.println("Using ConcreteProduct");
    }
}

// 工厂接口
interface Factory {
    Product createProduct();
}

// 具体工厂
class ConcreteFactory implements Factory {
    public Product createProduct() {
        return new ConcreteProduct();
    }
}
```

**抽象工厂模式**：

```java
// 抽象产品A
interface ProductA {
    void use();
}

// 抽象产品B
interface ProductB {
    void eat();
}

// 具体产品A1
class ConcreteProductA1 implements ProductA {
    public void use() {
        System.out.println("Using ProductA1");
    }
}

// 具体产品B1
class ConcreteProductB1 implements ProductB {
    public void eat() {
        System.out.println("Eating ProductB1");
    }
}

// 抽象工厂
interface AbstractFactory {
    ProductA createProductA();
    ProductB createProductB();
}

// 具体工厂1
class ConcreteFactory1 implements AbstractFactory {
    public ProductA createProductA() {
        return new ConcreteProductA1();
    }
    public ProductB createProductB() {
        return new ConcreteProductB1();
    }
}
```

### 总结

- **工厂方法模式**：适用于只需要创建一个产品的情况，通过让子类实现工厂方法来决定创建哪个具体产品。
- **抽象工厂模式**：适用于需要创建一组相关产品的情况，通过一个接口创建多个产品系列的对象，确保它们之间的相互依赖性和一致性。

## 四、建造者模式

### 1）定义/描述

::: tip 定义/描述
建造者模式（Builder Pattern）是一种创建型设计模式，它允许使用多个简单对象一步一步构建一个复杂对象。建造者模式将对象的构造过程与表示过程分离，使得同样的构建过程可以创建不同的表示。
:::

### 2）实现方式

建造者模式通常涉及以下几个角色：

- **Product（产品）**：要创建的复杂对象。
- **Builder（建造者）**：抽象建造者，定义了创建产品各个子部件的抽象方法。
- **ConcreteBuilder（具体建造者）**：实现了抽象建造者接口，负责具体子部件的创建。
- **Director（指挥者）**：构建一个使用 Builder 接口的对象，负责安排复杂对象的构建次序。

### 3）优缺点

**优点**：

- **分离构造代码和表示代码**：可以对构造过程逐步细化，而不必关心产品的具体表示。
- **更好的控制对象的创建过程**：通过具体建造者类，实现了对复杂对象各部分创建的细粒度控制。
- **灵活性和可扩展性**：通过具体建造者的不同实现，可以创建不同表示的对象。

**缺点**：

- **复杂性增加**：每一个具体产品都需要一个具体建造者类，增加了系统的复杂性。
- **适用范围有限**：如果产品内部变化很大或者产品间差异很大，建造者模式的使用会非常复杂。

### 4）具体代码片段

以构建一个复杂的电脑对象为例：

```java
// 产品：电脑
class Computer {
    private String CPU;
    private String GPU;
    private String RAM;
    private String storage;

    // 设置组件的方法
    public void setCPU(String CPU) {
        this.CPU = CPU;
    }

    public void setGPU(String GPU) {
        this.GPU = GPU;
    }

    public void setRAM(String RAM) {
        this.RAM = RAM;
    }

    public void setStorage(String storage) {
        this.storage = storage;
    }

    @Override
    public String toString() {
        return "Computer [CPU=" + CPU + ", GPU=" + GPU + ", RAM=" + RAM + ", Storage=" + storage + "]";
    }
}

// 抽象建造者
abstract class ComputerBuilder {
    protected Computer computer = new Computer();

    public abstract void buildCPU();
    public abstract void buildGPU();
    public abstract void buildRAM();
    public abstract void buildStorage();

    public Computer getComputer() {
        return computer;
    }
}

// 具体建造者：高配电脑
class HighEndComputerBuilder extends ComputerBuilder {
    public void buildCPU() {
        computer.setCPU("Intel Core i9");
    }

    public void buildGPU() {
        computer.setGPU("NVIDIA RTX 3080");
    }

    public void buildRAM() {
        computer.setRAM("32GB");
    }

    public void buildStorage() {
        computer.setStorage("1TB SSD");
    }
}

// 具体建造者：低配电脑
class LowEndComputerBuilder extends ComputerBuilder {
    public void buildCPU() {
        computer.setCPU("Intel Core i3");
    }

    public void buildGPU() {
        computer.setGPU("Integrated GPU");
    }

    public void buildRAM() {
        computer.setRAM("8GB");
    }

    public void buildStorage() {
        computer.setStorage("256GB SSD");
    }
}

// 指挥者
class Director {
    private ComputerBuilder builder;

    public Director(ComputerBuilder builder) {
        this.builder = builder;
    }

    public void construct() {
        builder.buildCPU();
        builder.buildGPU();
        builder.buildRAM();
        builder.buildStorage();
    }

    public Computer getComputer() {
        return builder.getComputer();
    }
}

// 客户端代码
public class BuilderPatternDemo {
    public static void main(String[] args) {
        // 构建高配电脑
        ComputerBuilder highEndBuilder = new HighEndComputerBuilder();
        Director director = new Director(highEndBuilder);
        director.construct();
        Computer highEndComputer = director.getComputer();
        System.out.println("High-end Computer: " + highEndComputer);

        // 构建低配电脑
        ComputerBuilder lowEndBuilder = new LowEndComputerBuilder();
        Director director2 = new Director(lowEndBuilder);
        director2.construct();
        Computer lowEndComputer = director2.getComputer();
        System.out.println("Low-end Computer: " + lowEndComputer);
    }
}
```

### 5）应用场景

- **需要生成的产品对象有复杂的内部结构**：例如，生成复杂的对象（如车辆、电脑、房屋等），需要多个步骤逐步构建。
- **产品对象的创建过程需要独立于产品的组成部分**：例如，不同的产品有不同的创建过程，但创建步骤可以复用。
- **需要构造的对象是复杂的，并且其构造过程可以按步骤创建**：例如，创建对象需要多个步骤，而且这些步骤是相对固定的。

## 五、原型模式

### 1）定义/描述

::: tip 定义/描述
原型模式（Prototype Pattern）是一种创建型设计模式，它允许一个对象通过复制自身来创建新的对象，而不是通过类实例化。这种模式主要用于创建重复对象，同时保证性能。
:::

### 2）实现方式

原型模式的关键是实现一个具有 `clone` 方法的原型接口，通过该方法实现对象的自我复制。通常可以通过 Java 的 `Cloneable` 接口和 `clone` 方法来实现。

### 3）优缺点

**优点**：

- **性能高效**：通过内存中的二进制流进行对象的拷贝，比直接 new 一个对象效率高。
- **动态创建对象**：允许动态地创建对象，而不需要知道具体类的名称。
- **减少子类数量**：避免了创建与具体产品类平行的工厂类。

**缺点**：

- **复杂对象的深拷贝实现较复杂**：尤其是对象中包含对其他对象的引用时，深拷贝需要特殊处理。
- **内存管理风险**：需要处理对象深拷贝时的资源释放问题，否则容易出现内存泄漏。

### 4）具体代码片段

以下是使用原型模式创建对象的示例：

```java
// Prototype接口
abstract class Shape implements Cloneable {
    private String id;
    protected String type;

    abstract void draw();

    public String getType(){
        return type;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    // 实现Cloneable接口的clone方法
    public Object clone() {
        Object clone = null;
        try {
            clone = super.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return clone;
    }
}

// 具体原型类：Circle
class Circle extends Shape {
    public Circle(){
        type = "Circle";
    }

    @Override
    public void draw() {
        System.out.println("Inside Circle::draw() method.");
    }
}

// 具体原型类：Square
class Square extends Shape {
    public Square() {
        type = "Square";
    }

    @Override
    public void draw() {
        System.out.println("Inside Square::draw() method.");
    }
}

// 原型管理器类
class ShapeCache {
    private static Hashtable<String, Shape> shapeMap = new Hashtable<String, Shape>();

    public static Shape getShape(String shapeId) {
        Shape cachedShape = shapeMap.get(shapeId);
        return (Shape) cachedShape.clone();
    }

    // 对每种形状都运行数据库查询，并创建该形状
    // shapeMap.put(shapeKey, shape);
    // 例如，我们要添加三种形状
    public static void loadCache() {
        Circle circle = new Circle();
        circle.setId("1");
        shapeMap.put(circle.getId(), circle);

        Square square = new Square();
        square.setId("2");
        shapeMap.put(square.getId(), square);
    }
}

// 客户端代码
public class PrototypePatternDemo {
    public static void main(String[] args) {
        ShapeCache.loadCache();

        Shape clonedShape1 = (Shape) ShapeCache.getShape("1");
        System.out.println("Shape : " + clonedShape1.getType());

        Shape clonedShape2 = (Shape) ShapeCache.getShape("2");
        System.out.println("Shape : " + clonedShape2.getType());
    }
}
```

### 5）应用场景

- **需要重复创建相同或类似对象**：如对象的创建成本较高，通过复制已有对象可以提高性能。
- **避免类层次结构的复杂性**：如不需要为每种产品创建一个平行的工厂类。
- **对象的状态相对固定且变化较少**：如需要创建初始状态一致的对象。
- **需要动态创建对象的场合**：如根据运行时状态创建对象，原型模式可以灵活应对。

## 六、参考文章

- [设计模式](https://refactoringguru.cn/design-patterns)
- [设计模式（1）创建型模式](https://blog.csdn.net/qq40988670/article/details/108957213)
