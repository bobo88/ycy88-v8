# TS 高级 - 多重泛型约束

## 一、概念

多重泛型约束是 TypeScript 中的一种高级特性，它允许我们为泛型参数指定多个约束条件。当我们希望泛型参数具有多个方面的能力或行为时，可以使用多重泛型约束来实现更精细的类型控制。

## 二、语法

多重泛型约束的语法如下：

```typescript
function functionName<T extends Constraint1 & Constraint2>(arg: T): void {
  // 函数体
}
```

其中，`T` 是泛型参数，`extends` 后面是多个约束条件，使用 `&` 连接。这表示泛型参数 `T` 必须同时符合 `Constraint1` 和 `Constraint2`。

## 三、具体实例

考虑一个实际的例子，假设我们想要实现一个函数，该函数接受两个对象，这两个对象必须同时具备可比较和可打印的能力。我们可以使用多重泛型约束来解决这个问题：

```typescript
interface Comparable {
  compareTo(other: any): number
}

interface Printable {
  print(): void
}

function compareAndPrint<T extends Comparable & Printable>(
  obj1: T,
  obj2: T
): void {
  // 比较对象
  const result = obj1.compareTo(obj2)

  // 打印结果
  console.log(`Comparison Result: ${result}`)

  // 打印对象
  obj1.print()
  obj2.print()
}

// 创建实现 Comparable 和 Printable 接口的对象
const object1 = {
  compareTo(other: any) {
    // 实现比较逻辑
    return 0
  },
  print() {
    console.log('Printing Object 1...')
  }
}

const object2 = {
  compareTo(other: any) {
    // 实现比较逻辑
    return 1
  },
  print() {
    console.log('Printing Object 2...')
  }
}

// 使用多重泛型约束的函数
compareAndPrint(object1, object2)
```

在这个例子中，`compareAndPrint` 函数使用了多重泛型约束，确保传入的两个对象同时满足 `Comparable` 和 `Printable` 接口的要求。这样，我们可以在函数内部安全地调用比较和打印的方法，而不用担心传入的对象不具备这些方法。

总体来说，多重泛型约束提供了更强大的类型约束能力，使得我们能够更精确地定义泛型的行为和能力。
