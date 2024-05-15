# JS 代码在线运行工具

::: tip 提示
一个工具：在线运行 JS 代码，查看打印结果。
:::

```jsx
import React, { useState } from 'react'
import { Input, Button } from 'antd'
import * as ts from 'typescript' // 引入 TypeScript 模块
import './index.scss'

const { TextArea } = Input

const CodeRunner = () => {
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')

  const transpileToJavaScript = (tsCode) => {
    const compilerOptions = {
      target: ts.ScriptTarget.ES5,
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.React,
      noEmitOnError: true,
      strict: true, // 启用所有严格类型检查选项
      noImplicitAny: true, // 报告隐含的 any 类型
      strictNullChecks: true // 检查 null 和 undefined
    }

    // 将 TypeScript 代码转为 JavaScript 代码
    //  transpileModule 只处理文本并且不会进行类型检查
    const result = ts.transpileModule(tsCode, {
      compilerOptions,
      reportDiagnostics: true // 启用诊断信息
    })

    return {
      jsCode: result.outputText
    }
  }

  const runCode = () => {
    try {
      // 使用 TypeScript 编译器 API 将 TypeScript 代码转为 JavaScript 代码并获取诊断信息
      const { jsCode, diagnostics } = transpileToJavaScript(code)

      // 检查诊断信息
      if (diagnostics && diagnostics.length > 0) {
        // 处理错误信息
        const errorMessage = diagnostics.map((diagnostic) =>
          ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')
        )
        setOutput('TypeScript Error:\n' + errorMessage.join('\n'))
        return
      }

      // 使用 new Function 创建用户输入的代码的函数
      const userFunction = new Function(jsCode)

      // 捕获 console.log 输出，并显示在页面上
      let consoleOutput = ''
      const originalConsoleLog = console.log
      console.log = function () {
        // 将 console.log 的输出记录到 consoleOutput 变量中
        consoleOutput += Array.from(arguments).join(' ') + '\n'
        // 然后调用原始的 console.log
        originalConsoleLog.apply(console, arguments)
      }

      // 执行用户输入的代码
      userFunction()

      // 将 console.log 的输出显示在页面上
      setOutput(consoleOutput)

      // 恢复 console.log，确保不影响其他部分的代码
      console.log = originalConsoleLog
    } catch (error) {
      // 如果在执行过程中发生错误，将错误信息显示在页面上
      setOutput('Error:\n' + error.message)
    }
  }

  return (
    <div className="main-box">
      <div className="mb20">
        <label htmlFor="jsCode" className="f20">
          1. 请输入JS/TS代码:
        </label>
        <p className="tips">备注：TS代码不会进行类型检查</p>
      </div>
      <div className="mb20">
        <TextArea
          id="jsCode"
          rows="20"
          cols="50"
          value={code}
          onChange={(e) => setCode(e.target.value)}></TextArea>
      </div>
      <div className="mb20">
        <Button type="primary" onClick={runCode}>
          2. 运行JS/TS代码（查看打印结果）
        </Button>
      </div>

      <div id="output">
        <p className="f20">打印结果如下:</p>
        {output}
      </div>
    </div>
  )
}

export default CodeRunner
```

---

- [DEMO 验证](http://yb.ycy88.com/js-run)
