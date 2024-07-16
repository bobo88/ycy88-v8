# wasm 简述

> 简单的说，wasm 并不是一种编程语言，而是一种新的字节码格式，目前，主流浏览器都已经支持 wasm。与 JavaScript 需要解释执行不同的是，wasm 字节码和底层机器码很相似可快速装载运行，因此性能相对于 JavaScript 解释执行有了很大的提升。

## 一、核心概念

1. **二进制格式**：

   - WebAssembly 以二进制格式编码，这使得它比文本格式更紧凑和高效。
   - 二进制格式易于解析和加载，降低了加载时间并提高了执行速度。

2. **模块**：

   - WebAssembly 代码被组织成模块，一个模块包含一个或多个函数。
   - 模块可以导出函数、内存、全局变量和表格，以便被其他模块或 JavaScript 使用。
   - 模块可以导入函数和全局变量，从而可以与 JavaScript 进行交互。

3. **堆栈机器**：

   - WebAssembly 使用堆栈机器模型来执行指令，指令操作数存储在一个堆栈中。
   - 每条指令从堆栈中弹出操作数，并将结果推入堆栈。

4. **线性内存**：

   - WebAssembly 提供了一种线性内存模型，内存是一个连续的字节数组。
   - 内存可以在运行时动态增长，但不能缩小。

5. **安全性和沙盒执行**：
   - WebAssembly 在沙盒环境中运行，这意味着它与主机环境（例如浏览器）隔离，从而提高了安全性。
   - WebAssembly 模块不能直接访问主机系统资源，而是通过受控接口进行交互。

## 二、核心原理

1. **编译与执行**：

   - 高级语言（如 C、C++、Rust）编译成 WebAssembly 二进制格式。
   - 浏览器或其他运行时环境加载和解析 WebAssembly 模块，将其转换为机器码并执行。

2. **与 JavaScript 的互操作**：

   - WebAssembly 可以与 JavaScript 无缝集成，互相调用函数。
   - JavaScript 可以加载和实例化 WebAssembly 模块，调用其中的函数，并与之共享内存。

3. **性能优化**：

   - WebAssembly 设计为便于编译器优化，支持高效的即时编译（JIT）和提前编译（AOT）。
   - 通过使用硬件特性（如 SIMD 指令），WebAssembly 可以实现高性能计算。

4. **模块化和可扩展性**：
   - WebAssembly 模块是独立的，可以被重复使用和组合。
   - 通过导入和导出机制，模块可以互相调用并共享功能。

## 三、工作流程示例

以下是 WebAssembly 的工作流程示例，展示从编写代码到在浏览器中执行的过程：

1. **编写代码**：

   - 使用高级语言（如 C、C++、Rust）编写代码：
     ```rust
     // Rust 示例
     #[no_mangle]
     pub extern "C" fn add(a: i32, b: i32) -> i32 {
         a + b
     }
     ```

2. **编译为 WebAssembly**：

   - 使用编译器（如 Emscripten 或 wasm-pack）将代码编译为 WebAssembly：
     ```sh
     rustc --target wasm32-unknown-unknown -O add.rs -o add.wasm
     ```

3. **加载和执行**：
   - 在 JavaScript 中加载和执行 WebAssembly 模块：
     ```javascript
     fetch('add.wasm')
       .then((response) => response.arrayBuffer())
       .then((bytes) => WebAssembly.instantiate(bytes))
       .then((results) => {
         console.log(results.instance.exports.add(2, 3)) // 输出 5
       })
     ```

---

- [https://www.wasm.com.cn/](https://www.wasm.com.cn/)
- [WebAssembly - 教程](https://cainiaoya.com/webassembly/webassembly-jiaocheng.html)
- [十分钟搞懂 WebAssembly](https://xie.infoq.cn/article/0bb5ff2fa5d5d9db492c88a4c)
- [20 分钟上手 webAssembly](https://juejin.cn/post/6844903661982728200)
