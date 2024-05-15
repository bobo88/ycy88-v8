# 开发规范 JS 篇

## 一、通用规范

### 1.1 文件编码

为了避免内容乱码，统一使用 UTF-8 编码保存。

在文件结尾处，保留一个空行。

### 1.2 代码检测

开启 eslint 代码规范和错误检查。

### 1.3 在严格模式模式下编码

```js
'use strict'
```

## 二、命名规范

- 变量命名采用小驼峰命名，如:addUser password studentID
- 常量命名采用单词所有字母大写,并用下划线分隔，如：FORM_NAME
- 对于对象、函数、和实例采用小驼峰（camelCase）命名法
- 对于类命名或者构造函数，采用大驼峰命名 User() DateBase()

::: warning 命名
命名规范请认证阅读，约束不是目的，统一风格是为了方便代码阅读，见名知意，后期代码维护方便。
:::
::: tip
数组：用 List,Array 等后缀或单词复数表示<br/>
对象：用 Object,Obj,Data，Info，Bean 等后缀或对象单词表示<br/>
Map 与 Set：用 Map,Set 等后缀分别表示 Map,Set 结构<br/>
布尔：用 is,has,can 等前缀,或有判断意图的单词表示<br/>
数值：用 length,count,num,Number,Total 等后缀,或表示量词的单词表示<br/>
字符串：用 Str,String,Json 等后缀或其他<br/>
:::

## 三、代码规范

- 统一使用两个空格缩进，不推荐使用 tap 缩进。
- 统一使用单引号。
- 每个独立语句结束后必须换行。
- 不得省略语句结束的分号
- 使用全等符号

参考：<br />
<a href="https://juejin.cn/post/6844903874415820813" target="_blank">前端规范之 javascript 规范</a><br />
<a href="https://guide.aotu.io/docs/js/language.html" target="_blank">Javascript 规范</a><br />
