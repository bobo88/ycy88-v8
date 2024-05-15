# 原型与原型链

::: tip 原型与原型链
原型对象：绝⼤部分的函数(少数内建函数除外)都有⼀个 `prototype` 属性，这个属性是原型对象⽤来创建新对象实例，⽽所有被创建的对象都会共享原型对象，因此这些对象便可以访问原型对象的属性。

原型链：原因是每个对象都有 `__proto__` 属性，此属性指向该对象的构造函数的原型。
对象可以通过 `__proto__` 与上游的构造函数的原型对象连接起来，⽽上游的原型对象也有⼀个 `__proto__`，这样就形成了原型链。
:::

```html
<!-- 几个与 原型/原型链 密切相关的关键词 -->
prototype: 构造函数独有的 __proto__: 实例对象独有的 constructor:
原型对象里面的属性
```

先看一段代码：

```js
function Student(name) {
  this.name = name
}
Student.prototype.school = 'Shenzhen University'

let stu1 = new Student('Bob')
console.log(stu1.name) // print: ??
console.log(stu1.school) // print: ??
console.log(stu1.abc) // print: ??
console.log(stu1.__proto__) // print: ??
console.log(stu1.__proto__.__proto__) // print: ??
console.log(stu1.__proto__.__proto__.__proto__) // print: ??
```

这是一段非常简单的构造函数进行实例化的代码。

首先，我们需要弄清楚 new 这个关键词运行时发生了什么？为什么实例 stu1 可以访问 school 属性？上述代码的打印结果是什么？

这里面就涉及到原型与原型链的相关知识。

先看一张我画的原型链草图。
![An image](/images/prev/prototype.png)

```html
<!-- 原型链草图 分析 -->
1.
实例对象（以stu1为例）均有`__proto__`属性指向其构造函数（Student）的原型对象（Student
prototype）； 2. 构造函数（Student）的属性`prototype`属性指向其原型对象（Student
prototype）； 3. 原型对象（Student
prototype）的属性`constructor`指向创建对象构造函数本身（Student）； 4.
原型对象其实就是一个对象实例，也就是说「Student prototype」实际上就是 Object
构造函数new出来的实例，所以「Student prototype」有`__proto__`属性指向 「Object
prototype」； 5. 「Object prototype」有`__proto__`属性指向 `null`； 6. 在
stu1实例对象
上查找属性或方法，会先在其自身查找，然后沿着上图红线方向依次查找，直至null。属性找不到会返回`undefined`，方法找不到会提示报错；
7. 上图红线就是一条「原型链」。
```

现在我们来回顾一下上面代码的打印结果：

```js
function Student(name) {
  this.name = name
}
Student.prototype.school = 'Shenzhen University'

let stu1 = new Student('Bob')
console.log(stu1.name) // print: Bob
console.log(stu1.school) // print: Shenzhen University
console.log(stu1.abc) // print: undefined
console.log(stu1.__proto__) // print: Student prototype
console.log(stu1.__proto__.__proto__) // print: Object prototype
console.log(stu1.__proto__.__proto__.__proto__) // print: null
```

再来衍生一下相关知识：

```js
function Student(name) {
  this.name = name
}
Student.prototype.school = 'Shenzhen University'

let stu1 = new Student('Bob')
console.log(stu1.__proto__ === Student.prototype) // print: true
console.log(stu1.__proto__.constructor === Student) // print: true
```

::: warning 注意
上述代码和草图分析均忽略了 「Function」构造函数这条线，但这并不影响你对原型和原型链的理解和分析。
:::

思考一下以下代码为何都打印 true？

```js
function Student(name) {
  this.name = name
}
Student.prototype.school = 'Shenzhen University'

console.log(Student.constructor === Function) // print: true
console.log(Student.__proto__ === Function.prototype) // print: true
```

::: tip
Student / Object 等构造函数，均是函数实例对象，都是由 Function 构造函数 new 出来的实例。
:::
