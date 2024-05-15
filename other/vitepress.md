# Vitepress 常用用法汇总

## 1）代码块的基本语法

代码块的基本效果就是 ：代码高亮展示，用于区分于其他的普通文本。

````
语法格式：
    ```语言名称
        代码内容
    ```

例如：一个java的代码块
    ```java
      System.out.println("hello world");
    ```
````

## 2）展示行号

默认情况下，vitepress 中的代码块是不展示行号的。

展示行号有两种方式：

- 方式一 ： 全局配置文件中配置 `lineNumbers:true` 属性
- 方式二 ：代码块中添加 `:line-numbers` / `:no-line-numbers` 标记来启用或禁用行号,这种方式会覆盖方式一的配置。

## 3）指定代码行高亮

::: info 指定代码行高亮
代码块的作用是将块内的内容进行高亮展示，区别于其他的文本。<br/>
在代码块中，也可以指定某些行高亮，突出重点的代码行。<br/>
具体的表现就是 ： 指定的行就像多了阴影一样。
:::

::: info 语法格式
语法格式 ： 在 `:line-numbers` 之后添加 `{xxx}`即可<br/>
`指定单行` ： {5} : 表示底行高亮<br/>
`指定多行`：{2-5} : 表示 第 2 到第 5 行 高亮<br/>
`指定多个单行` ：{2,3,8} : 表示 第 2 第 3 第 8 行 高亮<br/>
`单行与多行混合` ：{2,3,6-8} : 表示 第 2 第 3 第 6 到第 8 行 高亮<br/>
:::

#### 代码块-行高亮-单行: `java:line-numbers {2}`

```java:line-numbers {2}
public class HelloWorld{
    public static void main(String[] args){
        System.out.println("hello world");
    }
}
```

#### 代码块-行高亮-多行: `java:line-numbers {2-4}`

```java:line-numbers {2-4}
public class HelloWorld{
    public static void main(String[] args){
        System.out.println("hello world");
    }
}
```

#### 代码块-行高亮-多个单行: `java:line-numbers {2,4}`

```java:line-numbers {2,4}
public class HelloWorld{
    public static void main(String[] args){
        System.out.println("hello world");
    }
}
```

#### 代码块-行高亮-单行与多行混合: `java:line-numbers {1,3-5}`

```java:line-numbers {1,3-5}
public class HelloWorld{
    public static void main(String[] args){
        System.out.println("hello world");
    }
}
```

## 4）代码聚焦

`代码聚焦`的效果是 ：凸显指定的内容，并模糊其他的部分，从而使重点突出。

::: info 基本语法
基本语法 ：`// [!code focus]`
:::

::: info 补充
用法 ： 在需要聚焦的行后添加上述标注即可。
补充 ： `// [!code focus:xxx]` : xxx 是一个数字，代表要聚焦的行数
:::

#### 代码块-聚焦-单行

> `// [!code focus]`

```java
public class HelloWorld{
    public static void main(String[] args){
        System.out.println("hello world"); // [!code focus]
    }
}
```

#### 代码块-聚焦-连续多行

> `// [!code focus:3]`

```java
public class HelloWorld{
    public static void main(String[] args){ // [!code focus:3]
        System.out.println("hello world");
    }
}
```

## 5）代码删除/新增标记

这个功能就类似于 git 中的代码的删除与新增的展示效果。

::: info 基本语法
基本语法 ：
删除标注 ：`// [!code --]`
新增标注 ：`// [!code ++]`
:::

#### 代码块-删除/新增标记

```java
public class HelloWorld{
    public static void main(String[] args){
        System.out.println("hello world"); // [!code --]
        System.out.println("hello new world"); // [!code ++]
    }
}
```

## 6）代码错误/警告标记

这个也算是一个特殊的标记吧，可以提示读者哪些代码有错误。
这个功能的效果也是通过行的颜色来表示的。

::: info 基本语法
基本语法 ：
错误标注 ：`// [!code warning]`
警告标注 ：`// [!code error]`
:::

#### 代码块-错误/警告标记

```java
public class HelloWorld{
    public static void main(String[] args){
        System.out.println("hello world"); // [!code warning]
        System.out.println("hello new world"); // [!code error]
    }
}
```

---

- [VitePress-07-文档中代码块的使用全解](https://blog.csdn.net/qq_39505245/article/details/135941800)
