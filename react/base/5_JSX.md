# React 清单 - JSX

::: tip JSX
JSX 的全称是 Javascript and XML，React 率先使用 JSX，它是一种可以在 JS 中编写 XML 的语言。VUE 中也支持 JSX 写法。
:::

```html
<!-- JSX语法 -->
1、标签必须闭合 2、类名用 className, style 必须写成 json 形式 3、JSX 语法里面写
JS 代码，代码块用 {} 4、事件名或者属性采用驼峰命名法（camelCase小驼峰命名）
onclick -> onClick onchange -> onChange class -> className font-size -> fontSize
5、JSX 防止注入攻击 6、用户定义的组件必须以大写字母开头 7、JSX中注释写在
{/*...我是一段注释...*/} 中，参考第3点
备注：编写JSX内容时，用括号（）将内容包裹起来
```

## JSX 是 JS 的语法糖

::: tip 深入 JSX
实际上，JSX 仅仅只是 React.createElement(component, props, ...children) 函数的语法糖。
:::
Babel 会把 JSX 转译成一个名为 React.createElement() 函数调用。

以下两种示例代码完全等效：

```jsx
const element = <h1 className="greeting">Hello, world!</h1>
```

```js
const element = React.createElement(
  'h1',
  { className: 'greeting' },
  'Hello, world!'
)
```

## JSX 中的 Props

有多种方式可以在 JSX 中指定 props。

```jsx
// 1. JavaScript 表达式作为 Props
<MyComponent foo={1 + 2 + 3 + 4} />

// 2. 字符串字面量
<MyComponent message="hello world" />
// 等价
<MyComponent message={'hello world'} />

// 3. Props 默认值为 “True”
<MyTextBox autocomplete />
// 等价
<MyTextBox autocomplete={true} />

// 4. 属性展开
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}
// 等价
function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}

// 引申：保留部分props，传递剩余props
const Button = props => {
  const { kind, ...other } = props;
  const className = kind === "primary" ? "PrimaryButton" : "SecondaryButton";
  return <button className={className} {...other} />;
};

const App = () => {
  return (
    <div>
      <Button kind="primary" onClick={() => console.log("clicked!")}>
        Hello World!
      </Button>
    </div>
  );
};
```

参考：
<a href="https://zh-hans.reactjs.org/docs/jsx-in-depth.html" target="_blank">深入 JSX</a><br />
