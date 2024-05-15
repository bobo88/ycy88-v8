# MD 代码块指定语言类型

## 一、MD 代码块指定语言类型

使用方法 \``` 关键字 如 \```js，表示代码块是 JS 类型

````shell
  ```js
   const ABC = 'abc';
  ```
````

得到效果：

```js
const ABC = 'abc'
```

## 二、如何在 markdown 中显示一组 ```

使用 “\”：

````shell
  \```
  some code
  \```
````

\```
some code
\```

## 三、代码类型关键字对应表

| 名称             |         关键字          |             调用的 js |
| :--------------- | :---------------------: | --------------------: |
| AppleScript      |       applescript       | shBrushAppleScript.js |
| ActionScript 3.0 |   actionscript3, as3    |         shBrushAS3.js |
| Shell            |       bash, shell       |        shBrushBash.js |
| ColdFusion       |     coldfusion, cf      |  shBrushColdFusion.js |
| C                |         cpp, c          |         shBrushCpp.js |
| C#               |   c#, c-sharp, csharp   |      shBrushCSharp.js |
| CSS              |           css           |         shBrushCss.js |
| Delphi           |   delphi, pascal, pas   |      shBrushDelphi.js |
| diff&patch       |       diff patch        |        shBrushDiff.js |
| Erlang           |       erl, erlang       |      shBrushErlang.js |
| Groovy           |         groovy          |      shBrushGroovy.js |
| Java             |          java           |        shBrushJava.js |
| JavaFX           |       jfx, javafx       |      shBrushJavaFX.js |
| JavaScript       | js, jscript, javascript |     shBrushJScript.js |
| Perl             |     perl, pl, Perl      |        shBrushPerl.js |
| PHP              |           php           |         shBrushPhp.js |
| text             |       text, plain       |       shBrushPlain.js |
| Python           |       py, python        |      shBrushPython.js |
| Ruby             |  ruby, rails, ror, rb   |        shBrushRuby.js |
| SASS&SCSS        |       sass, scss        |        shBrushSass.js |
| Scala            |          scala          |       shBrushScala.js |
| SQL              |           sql           |         shBrushSql.js |
| Visual Basic     |        vb, vbnet        |          shBrushVb.js |
| XML              | xml, xhtml, xslt, html  |         shBrushXml.js |
| Objective C      |       objc, obj-c       |  shBrushObjectiveC.js |
| F#               |   f# f-sharp, fsharp    |      shBrushFSharp.js |
| xpp              |      dynamics-xpp       |    shBrushDynamics.js |
| R                |       r, s, splus       |           shBrushR.js |
| matlab           |         matlab          |      shBrushMatlab.js |
| swift            |          swift          |       shBrushSwift.js |
| GO               |       go, golang        |          shBrushGo.js |
