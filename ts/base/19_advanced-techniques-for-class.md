# TS 高级 - 类的高级技巧

在 TypeScript 中，类的高级技巧包括一系列用于增强类功能和提高代码可读性的模式和技术。

## 1. **抽象类和抽象方法：**

> 使用 `abstract` 关键字定义抽象类和抽象方法，抽象类不能被实例化，而是用于被子类继承。抽象方法在抽象类中只声明而不实现，需要在子类中实现。

```ts
abstract class Shape {
  abstract draw(): void
}

class Circle extends Shape {
  draw() {
    console.log('Drawing a circle')
  }
}
```

## 2. **构造函数参数属性：**

> 在构造函数参数前添加访问修饰符（public、private、protected）可以简洁地创建和初始化类的属性。

```ts
class Person {
  constructor(public name: string, private age: number) {
    // name 和 age 被自动创建并初始化
  }
}
```

## 3. **Getter 和 Setter：**

> 使用 getter 和 setter 方法可以控制对类属性的访问，并执行一些额外的逻辑。

```ts
class Rectangle {
  private _width: number

  get width(): number {
    return this._width
  }

  set width(value: number) {
    if (value > 0) {
      this._width = value
    } else {
      console.error('Width must be greater than 0')
    }
  }
}
```

## 4. **静态属性和方法：**

> 使用 `static` 关键字定义静态属性和方法，它们属于类而不是实例，可以通过类名直接访问。

```ts
class MathUtil {
  static PI: number = 3.14

  static calculateArea(radius: number): number {
    return this.PI * radius * radius
  }
}

console.log(MathUtil.calculateArea(5)) // 输出: 78.5
```

## 5. **Mixins（混入）：**

> Mixins 是一种将多个类的功能组合到一个类中的技术。通过组合不同的类，可以实现代码重用和更灵活的组合。

```ts
class Printable {
  print() {
    console.log('Printing...')
  }
}

class Loggable {
  log() {
    console.log('Logging...')
  }
}

interface MyMixin extends Printable, Loggable {}

function applyMixin(obj: MyMixin) {
  obj.print()
  obj.log()
}

const myObject: MyMixin = {}
applyMixin(myObject) // 输出: Printing... Logging...
```
