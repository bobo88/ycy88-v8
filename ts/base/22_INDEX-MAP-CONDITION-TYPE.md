# TS 高级 - 索引-映射-条件类型

## 1. **索引类型**

### 1.1 字符串索引

字符串索引允许通过字符串键来访问对象的属性。使用 `keyof` 关键字获取对象的键集合。

```typescript
interface Person {
  name: string
  age: number
  job: string
}

type PersonKey = keyof Person // "name" | "age" | "job"
```

### 1.2 数字索引

数字索引允许通过数字键来访问对象的属性。

```typescript
interface ArrayType {
  [index: number]: string
}

const myArray: ArrayType = ['a', 'b', 'c']
const element: string = myArray[0]
```

## 2. **映射类型**

### 2.1 `Partial<T>`

`Partial<T>` 创建一个新类型，使所有属性都变成可选。

```typescript
interface MyObject {
  name: string
  age: number
}

type PartialMyObject = Partial<MyObject>
// { name?: string; age?: number; }
```

### 2.2 `Readonly<T>`

`Readonly<T>` 创建一个新类型，使所有属性都变成只读。

```typescript
interface MyObject {
  name: string
  age: number
}

type ReadonlyMyObject = Readonly<MyObject>
// { readonly name: string; readonly age: number; }
```

### 2.3 `Record<K, T>`

`Record<K, T>` 创建一个包含指定键和值类型的新类型。

```typescript
type MyRecord = Record<string, number>
// { [key: string]: number; }
```

## 3. **条件类型**

条件类型允许根据类型的关系在类型系统中进行条件分支，通常与泛型结合使用。

```typescript
type Check<T> = T extends string ? boolean : number

const result1: Check<string> = true // 类型是 boolean
const result2: Check<number> = 42 // 类型是 number
```

条件类型使得类型的处理可以根据不同的条件进行选择，提供更高层次的灵活性和泛化能力。深入理解这些 TypeScript 高级类型特性，可以使代码更具表达力，同时在编译时提供更强大的类型检查。
