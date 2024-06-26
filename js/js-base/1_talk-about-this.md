# this

::: tip 执行上下文
this 的指向，是在调用函数时根据执行上下文所动态确定的。
:::

如果构造函数中显式返回一个值，且返回的是一个对象，那么 this 就指向这个返回的对象；如果返回的不是一个对象，那么 this 仍然指向实例。

函数具有 length 属性，表示形参的个数。

## 总结

1. 谁调用指向谁，多层调用的时候只看它的直接上级。
2. 箭头函数没有 this，他的 this 指向它定义位置的上下文，箭头函数不会创建自己的执行上下文，而是将 this 指向外部函数已经创建的执行上下文。

## 函数调用方式不同,this 的指向。

1. 普通函数的调用，this 指向的是 window
2. 对象方法的调用，this 指的是该对象，且是最近的对象
3. 构造函数的调用，this 指的是实例化的新对象
4. apply 和 call 调用，this 指向参数中的对象
5. 匿名函数的调用，this 指向的是全局对象 window
6. 定时器中的调用，this 指向的是全局变量 window
