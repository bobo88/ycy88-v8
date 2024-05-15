# 面向对象的编程思想

::: tip 专题简介
面向对象的编程思想：以 Java 和 Javascript 为例。
:::

## 一、三大特性：

> 封装、继承、多态

## 1. **封装（Encapsulation）：**

**Java：**

```java
public class Car {
    private String model;

    public void setModel(String newModel) {
        if (isValidModel(newModel)) {
            model = newModel;
        } else {
            System.out.println("Invalid model");
        }
    }

    public String getModel() {
        return model;
    }

    private boolean isValidModel(String model) {
        // Validation logic
        return !model.isEmpty();
    }
}
```

**JavaScript：**

```javascript
function Car() {
  let model

  this.setModel = function (newModel) {
    if (isValidModel(newModel)) {
      model = newModel
    } else {
      console.log('Invalid model')
    }
  }

  this.getModel = function () {
    return model
  }

  function isValidModel(model) {
    // Validation logic
    return model !== ''
  }
}
```

## 2. **继承（Inheritance）：**

**Java：**

```java
public class SportsCar extends Car {
    private boolean isConvertible;

    public boolean isConvertible() {
        return isConvertible;
    }

    public void setConvertible(boolean convertible) {
        isConvertible = convertible;
    }
}
```

**JavaScript：**

```javascript
function SportsCar() {
  Car.call(this) // Inherit from Car
  let isConvertible

  this.isConvertible = function () {
    return isConvertible
  }

  this.setConvertible = function (convertible) {
    isConvertible = convertible
  }
}
```

## 3. **多态（Polymorphism）：**

**Java：**

```java
public interface Shape {
    void draw();
}

public class Circle implements Shape {
    @Override
    public void draw() {
        System.out.println("Drawing a circle");
    }
}

public class Square implements Shape {
    @Override
    public void draw() {
        System.out.println("Drawing a square");
    }
}
```

**JavaScript：**

```javascript
class Shape {
  draw() {
    console.log('Drawing a shape')
  }
}

class Circle extends Shape {
  draw() {
    console.log('Drawing a circle')
  }
}

class Square extends Shape {
  draw() {
    console.log('Drawing a square')
  }
}
```

## 二、五大原则：

> 单一职责、开闭原则、里氏替换原则、依赖倒置原则、接口隔离原则

## 1. **单一职责原则（Single Responsibility Principle）：**

**Java：**

```java
public class FileManager {
    public void saveToFile(String data, String fileName) {
        // Save data to file
    }

    public String readFromFile(String fileName) {
        // Read data from file
        return "";
    }
}
```

**JavaScript：**

```javascript
function FileManager() {
  this.saveToFile = function (data, fileName) {
    // Save data to file
  }

  this.readFromFile = function (fileName) {
    // Read data from file
    return ''
  }
}
```

## 2. **开闭原则（Open/Closed Principle）：**

**Java：**

```java
public abstract class Shape {
    abstract void draw();
}

public class Circle extends Shape {
    @Override
    void draw() {
        System.out.println("Drawing a circle");
    }
}

public class Square extends Shape {
    @Override
    void draw() {
        System.out.println("Drawing a square");
    }
}
```

**JavaScript：**

```javascript
class Shape {
  draw() {
    console.log('Drawing a shape')
  }
}

class Circle extends Shape {
  draw() {
    console.log('Drawing a circle')
  }
}

class Square extends Shape {
  draw() {
    console.log('Drawing a square')
  }
}
```

## 3. **里氏替换原则（Liskov Substitution Principle）：**

**Java：**

```java
public class Bird {
    void fly() {
        System.out.println("Flying");
    }
}

public class Sparrow extends Bird {
    void chirp() {
        System.out.println("Chirping");
    }
}
```

**JavaScript：**

```javascript
class Bird {
  fly() {
    console.log('Flying')
  }
}

class Sparrow extends Bird {
  chirp() {
    console.log('Chirping')
  }
}
```

## 4. **依赖倒置原则（Dependency Inversion Principle）：**

**Java：**

```java
interface Engine {
    void start();
}

class Car {
    private Engine engine;

    Car(Engine engine) {
        this.engine = engine;
    }

    void start() {
        engine.start();
    }
}
```

**JavaScript：**

```javascript
class Engine {
  start() {
    console.log('Engine started')
  }
}

class Car {
  constructor(engine) {
    this.engine = engine
  }

  start() {
    this.engine.start()
  }
}
```

## 5. **接口隔离原则（Interface Segregation Principle）：**

**Java：**

```java
interface Worker {
    void work();
}

interface Eater {
    void eat();
}

class Robot implements Worker {
    @Override
    public void work() {
        System.out.println("Robot working");
    }
}
```

**JavaScript：**

```javascript
class Worker {
  work() {
    console.log('Working')
  }
}

class Eater {
  eat() {
    console.log('Eating')
  }
}

class Robot extends Worker {
  // Robot can only work, not eat
}
```

以上代码示例展示了在 Java 和 JavaScript 中如何实现面向对象编程思想中的封装、继承、多态，以及如何应用单一职责、开闭原则、里氏替换原则、依赖倒置原则、接口隔离原则。
