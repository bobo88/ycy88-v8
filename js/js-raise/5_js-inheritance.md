# js 继承

:::tip
<b>ES5 和 ES6 继承的区别</b><br/>
ES5 继承：是先创建子类的实例，再将父类的属性绑定到子类的 this 上。<br/>
ES6 继承：是先创建父类的实例对象 this,再用子类的构造函数修改 this，因为子类没有自己的 this，所以必须调用父类的 super()方法，否则新建实例会报错。
:::

## 1. 构造函数继承

使用 call 来改变父类 this 的指向，来调用父类的属性和方法。
缺点：只能继承父类实例上的属性和方法，不能继承父类原型上的属性和方法

```js
//构造函数继承
let Parent = function (name) {
  this.name = 'baba'
}
let Child = function () {
  Parent.call(this)
  this.age = 28
}
let child1 = new Child()
```

## 2. 原型链继承

子类的原型指向父类的实例来继承父类的属性和方法
优点：可以继承父类的实例方法和属性，也能继承父类原型上的属性和方法
缺点：对于引用类型改变，多个实例会相互影响。
创建子类的实例时不能像父类的构造函数中传递参数。

```js
let Parent = function () {
  this.name = ['我是父类的属性name,我是个数组，引用类型']
  this.age = 50
}
Parent.property.say = function () {
  console.log('我是父类property上的方法。')
}
let Child = function () {
  this.role = '我是儿子'
}
Child.property = new Parent()
let child1 = new Child()
let child2 = new Child()
child1.name[0] = '我是child1我改变了名字'
child1.age = 28
child2.name[0] = '我是child2我也改了名字'
child.age = 20
console.log(child1)
/**
{
    name:[我是child2我也改了名字],
    age:28,
    role:"我是儿子",
    say:function(){console.log("我是父类property上的方法。");}
}
**/
console.log(child2)
/**
{
    name:[我是child2我也改了名字],
    age:20,role:"我是儿子",
    say:function(){console.log("我是父类property上的方法。");}
}
 **/
```

## 3. 组合继承（原型链和构造函数组合继承）

将原型链继承和构造函数组合到一起继承，通过原型链来继承父类原型上的属性和方法，通过构造函数继承父类实例的属性和方法。
缺点：使用子类创建实例的时候，原型中会存在两份相同的属性和方法。

```js
let Parent = function (name) {
  this.name = ['父类']
}
Parent.prototype.say = '父类原型上的属性'
let Child = function () {
  Parent.call(this)
  this.childName = '子类'
}
Child.prototype = new Parent()
let child1 = new Child()
child1.name[0] = 222
console.dir(child1)
/***
 * 结果为
 {
    childName:"子类",
    name:[222],
    [[Property]]:{
        name:['父类'],
        say:'父类原型上的属性'
    }
 }
* */
```

## 4. class 继承

class 创建一个父类，然后通过 extends 继承父类，在子类的 constructor 调用 spuer()

```js
class Parent {
  constructor() {
    this.name = '我是父类继承过来的属性'
  }
  say() {
    console.log('我是父类的方法')
  }
}
class Child extends Parent {
  constructor() {
    super()
    this.age = 24
  }
}
let child1 = new Child()
```
