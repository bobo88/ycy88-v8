# NodeJS 篇

## 1. **什么是 Node.js？它的主要特点是什么？**

- Node.js 是一个开源的、跨平台的 JavaScript 运行时环境，允许在服务器端运行 JavaScript。其主要特点包括：
  - 非阻塞 I/O：通过事件驱动和异步编程实现高并发处理。
  - 单线程：使用单线程事件循环来处理多个并发连接。
  - 快速：基于 Chrome V8 引擎，执行速度快。
  - 模块系统：采用 CommonJS 模块系统，方便模块化开发。

## 2. **什么是事件循环（Event Loop）？**

- 事件循环是 Node.js 处理异步操作的机制。它使 Node.js 可以在单线程中高效地处理多个并发操作，通过将异步操作推入事件队列中，然后逐个处理事件队列中的事件。

## 3. **什么是回调函数（Callback）？**

- 回调函数是指作为参数传递给另一个函数的函数。在 Node.js 中，回调函数常用于处理异步操作的结果，如文件读取、网络请求等。

## 4. **什么是 Promise？**

- Promise 是一种用于处理异步操作的对象，代表一个尚未完成但预期将来会完成的操作。Promise 提供了 `then`、`catch` 和 `finally` 方法，用于处理操作的成功、失败和最终状态。

## 5. **什么是 async/await？**

- `async/await` 是基于 Promise 的语法糖，提供了一种更简洁和可读的方式来编写异步代码。`async` 用于定义异步函数，`await` 用于等待异步操作的完成。

## 6. **什么是 CommonJS 模块系统？**

- CommonJS 是 Node.js 使用的模块系统。每个文件被视为一个独立的模块，通过 `module.exports` 导出模块，通过 `require` 导入其他模块。

## 7. **什么是 npm？**

- npm 是 Node.js 的包管理工具，用于安装、共享和管理 JavaScript 包和依赖项。通过 `npm install` 命令可以安装包，通过 `package.json` 文件管理项目的依赖项。

## 8. **什么是 package.json？**

- `package.json` 是 Node.js 项目的配置文件，包含项目的基本信息、依赖项、脚本等。它是管理项目依赖和配置信息的关键文件。

## 9. **什么是全局对象（Global Objects）？**

- Node.js 中的一些全局对象可以在任何模块中直接访问，如 `global`、`process`、`__dirname`、`__filename` 等。这些对象在所有模块中都是可用的，不需要通过 `require` 引入。

## 10. **什么是事件发射器（EventEmitter）？**

- `EventEmitter` 是 Node.js 中的核心模块，提供了发布和订阅事件的功能。可以通过 `emit` 方法触发事件，通过 `on` 方法监听事件。

## 11. **解释 Node.js 的异步编程模型。**

- Node.js 使用异步编程模型，通过事件循环和回调函数处理异步操作。这样可以避免阻塞 I/O 操作，提高并发性能。

## 12. **如何使用 `fs` 模块读取文件内容？**

```javascript
const fs = require('fs')

// 异步读取文件
fs.readFile('path/to/file', 'utf8', (err, data) => {
  if (err) throw err
  console.log(data)
})

// 同步读取文件
const data = fs.readFileSync('path/to/file', 'utf8')
console.log(data)
```

## 13. **如何处理未捕获的异常？**

```javascript
process.on('uncaughtException', (err) => {
  console.error('未捕获的异常:', err)
  process.exit(1) // 退出进程
})

// 模拟未捕获的异常
setTimeout(() => {
  throw new Error('模拟异常')
}, 1000)
```

## 14. **如何创建一个简单的 HTTP 服务器？**

```javascript
const http = require('http')

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello, World!\n')
})

server.listen(3000, '127.0.0.1', () => {
  console.log('服务器运行在 http://127.0.0.1:3000/')
})
```

## 15. **如何在 Node.js 中处理 POST 请求？**

```javascript
const http = require('http')

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk.toString()
    })
    req.on('end', () => {
      res.end(`收到的 POST 数据: ${body}`)
    })
  } else {
    res.end('只接受 POST 请求')
  }
})

server.listen(3000, () => {
  console.log('服务器运行在 http://127.0.0.1:3000/')
})
```

## 16. **如何使用 Node.js 连接数据库（如 MongoDB）？**

```javascript
const { MongoClient } = require('mongodb')

const url = 'mongodb://localhost:27017'
const dbName = 'mydatabase'

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err
  console.log('连接成功')
  const db = client.db(dbName)
  // 执行数据库操作
  client.close()
})
```

## 17. **如何使用 `streams` 处理大文件？**

```javascript
const fs = require('fs')

const readStream = fs.createReadStream('path/to/large/file')
const writeStream = fs.createWriteStream('path/to/output/file')

readStream.pipe(writeStream)

readStream.on('end', () => {
  console.log('文件复制完成')
})

readStream.on('error', (err) => {
  console.error('读取文件错误:', err)
})

writeStream.on('error', (err) => {
  console.error('写入文件错误:', err)
})
```

## 18. **什么是中间件（middleware）？如何在 Express 中使用中间件？**

- 中间件是处理请求和响应过程中的函数，可以执行操作、修改请求和响应对象、终止请求-响应循环或调用下一个中间件。Express 中使用 `app.use()` 添加中间件。

```javascript
const express = require('express')
const app = express()

// 应用级中间件
app.use((req, res, next) => {
  console.log('请求时间:', Date.now())
  next()
})

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.listen(3000, () => {
  console.log('服务器运行在 http://127.0.0.1:3000/')
})
```

## 19. **如何使用 Node.js 处理文件上传？**

- 可以使用 `multer` 中间件处理文件上传。

```javascript
const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const app = express()

app.post('/upload', upload.single('file'), (req, res) => {
  res.send(`文件上传成功: ${req.file.filename}`)
})

app.listen(3000, () => {
  console.log('服务器运行在 http://127.0.0.1:3000/')
})
```

## 20. **如何实现简单的 WebSocket 服务器？**

```javascript
const WebSocket = require('ws')
const server = new WebSocket.Server({ port: 8080 })

server.on('connection', (socket) => {
  socket.on('message', (message) => {
    console.log('收到消息:', message)
    socket.send('收到消息: ' + message)
  })
})

console.log('WebSocket 服务器运行在 ws://localhost:8080/')
```

## 21. **Node.js 如何处理并发请求？**

- Node.js 通过事件循环和非阻塞 I/O 处理并发请求。事件循环使得 Node.js 能够在单线程中处理大量并发连接，而非阻塞 I/O 允许在等待 I/O 操作完成时继续处理其他请求。

## 22. **如何创建一个自定义的事件发射器（EventEmitter）？**

```javascript
const EventEmitter = require('events')
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter()
myEmitter.on('event', () => {
  console.log('事件触发')
})

myEmitter.emit('event')
```

## 23. **如何在 Node.js 中使用环境变量？**

- 可以使用 `process.env` 访问环境变量。通常通过 `.env` 文件管理环境变量，并使用 `dotenv` 库加载它们。

```javascript
// 安装 dotenv: npm install dotenv
require('dotenv').config()

console.log(process.env.MY_VARIABLE)
```

## 24. **如何使用 `cluster` 模块实现多进程？**

- `cluster` 模块允许 Node.js 创建子进程，共享服务器端口，提高应用性能。

```javascript
const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 退出`)
  })
} else {
  http
    .createServer((req, res) => {
      res.writeHead(200)
      res.end('hello world\n')
    })
    .listen(8000)
}
```

## 25. **解释 Node.js 中的错误处理机制。**

- Node.js 中错误处理通常通过回调函数的第一个参数、Promise 的 `catch` 方法、`async/await` 的 `try/catch` 语句来实现。此外，可以通过 `process.on('uncaughtException')` 捕获未捕获的异常。

## 26. **如何在 Express 中处理错误？**

- 可以通过定义错误处理中间件来处理 Express 中的错误。

```javascript
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  throw new Error('模拟错误')
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(3000, () => {
  console.log('服务器运行在 http://127.0.0.1:3000/')
})
```

## 27. **如何在 Node.js 中实现 JWT 认证？**

- 可以使用 `jsonwebtoken` 库实现 JWT 认证。

```javascript
const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()

const secretKey = 'mysecretkey'

app.post('/login', (req, res) => {
  const user = { id: 1, username: 'user' }
  const token = jwt.sign(user, secretKey, { expiresIn: '1h' })
  res.json({ token })
})

app.get('/protected', (req, res) => {
  const token = req.headers['authorization']
  if (!token) return res.sendStatus(403)
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403)
    res.json({ message: 'This is a protected route', user })
  })
})

app.listen(3000, () => {
  console.log('服务器运行在 http://127.0.0.1:3000/')
})
```

## 28. **什么是 REPL？如何在 Node.js 中使用它？**

- REPL（Read-Eval-Print Loop）是 Node.js 提供的交互式环境，可以在终端中输入 JavaScript 代码并立即执行。
- 启动 REPL：在终端中输入 `node` 并按回车。

## 29. **如何使用 `crypto` 模块进行数据加密？**

```javascript
const crypto = require('crypto')
const algorithm = 'aes-256-ctr'
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3'
const iv = crypto.randomBytes(16)

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv)
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex')
  }
}

const decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(hash.iv, 'hex')
  )
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, 'hex')),
    decipher.final()
  ])
  return decrypted.toString()
}

const hash = encrypt('Hello, World!')
console.log(hash)

const text = decrypt(hash)
console.log(text)
```

## 30. **如何使用 `child_process` 模块执行外部命令？**

```javascript
const { exec } = require('child_process')

exec('ls -l', (error, stdout, stderr) => {
  if (error) {
    console.error(`执行错误: ${error}`)
    return
  }
  console.log(`stdout: ${stdout}`)
  console.error(`stderr: ${stderr}`)
})
```

## 31. **如何在 Node.js 中使用 WebSocket 进行实时通信？**

- 可以使用 `ws` 库实现 WebSocket 服务器。

```javascript
const WebSocket = require('ws')
const server = new WebSocket.Server({ port: 8080 })

server.on('connection', (socket) => {
  socket.on('message', (message) => {
    console.log('收到消息:', message)
    socket.send('收到消息: ' + message)
  })
})

console.log('WebSocket 服务器运行在 ws://localhost:8080/')
```

## 32. **如何使用 `buffer` 模块处理二进制数据？**

```javascript
const buf = Buffer.from('Hello, World!', 'utf8')
console.log(buf.toString('hex'))
console.log(buf.toString('base64'))
```

## 33. **如何在 Node.js 中创建 HTTPS 服务器？**

```javascript
const https = require('https')
const fs = require('fs')

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}

https
  .createServer(options, (req, res) => {
    res.writeHead(200)
    res.end('hello world\n')
  })
  .listen(8000)
```

## 34. **如何在 Node.js 中进行单元测试？**

- 可以使用 `mocha` 和 `chai` 等测试库进行单元测试。

```javascript
// 安装 mocha 和 chai: npm install --save-dev mocha chai
const { expect } = require('chai')

describe('Array', () => {
  describe('#indexOf()', () => {
    it('应当返回 -1 当值不在数组中', () => {
      expect([1, 2, 3].indexOf(4)).to.equal(-1)
    })
  })
})
```

## 35. **如何在 Node.js 中实现守护进程（Daemon）？**

- 可以使用 `pm2` 等工具实现守护进程，保持应用程序持续运行并自动重启。

```sh
# 安装 pm2: npm install -g pm2
pm2 start app.js
pm2 list
pm2 restart app
pm2 stop app
pm2 delete app
```

## 36. **如何在 Node.js 中进行日志记录？**

- 可以使用 `winston` 等日志库进行日志记录。

```javascript
const { createLogger, format, transports } = require('winston')
const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ]
})

logger.info('信息日志')
logger.error('错误日志')
```

## 37. **如何使用 `os` 模块获取系统信息？**

```javascript
const os = require('os')
console.log('操作系统平台:', os.platform())
console.log('CPU 架构:', os.arch())
console.log('系统内存:', os.totalmem())
console.log('空闲内存:', os.freemem())
```

## 38. **如何在 Node.js 中处理文件系统操作？**

- 可以使用 `fs` 模块进行文件系统操作，如读取、写入、删除文件等。

## 39. **如何在 Node.js 中监听文件变化？**

- 可以使用 `fs.watch` 方法监听文件或目录的变化。

```javascript
const fs = require('fs')

fs.watch('path/to/file', (eventType, filename) => {
  if (filename) {
    console.log(`${filename} 文件发生变化，事件类型: ${eventType}`)
  }
})
```

## 40. **如何在 Node.js 中创建定时器？**

- 可以使用 `setTimeout` 和 `setInterval` 创建定时器。

```javascript
// setTimeout: 一次性定时器
setTimeout(() => {
  console.log('1秒后执行')
}, 1000)

// setInterval: 周期性定时器
setInterval(() => {
  console.log('每秒执行一次')
}, 1000)
```

## 41. **如何在 Node.js 中处理跨域请求？**

- 可以使用 `cors` 中间件处理跨域请求。

```javascript
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.listen(3000, () => {
  console.log('服务器运行在 http://127.0.0.1:3000/')
})
```

## 42. **如何在 Node.js 中使用模板引擎（如 EJS）？**

```javascript
const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index', { title: '主页', message: 'Hello, World!' })
})

app.listen(3000, () => {
  console.log('服务器运行在 http://127.0.0.1:3000/')
})
```

## 43. **如何在 Node.js 中进行文件压缩和解压？**

```javascript
const fs = require('fs')
const zlib = require('zlib')

// 压缩文件
const gzip = zlib.createGzip()
const input = fs.createReadStream('input.txt')
const output = fs.createWriteStream('input.txt.gz')
input.pipe(gzip).pipe(output)

// 解压文件
const gunzip = zlib.createGunzip()
const compressedInput = fs.createReadStream('input.txt.gz')
const decompressedOutput = fs.createWriteStream('decompressed.txt')
compressedInput.pipe(gunzip).pipe(decompressedOutput)
```

## 44. **解释 Node.js 中的非阻塞 I/O 模型。**

- 非阻塞 I/O 模型使得 I/O 操作不会阻塞执行线程，允许其他操作在等待 I/O 完成时继续执行。Node.js 使用事件循环和回调函数处理异步 I/O 操作，从而实现高并发性能。

## 45. **如何在 Node.js 中实现流（Stream）操作？**

- Node.js 中的流分为四种类型：可读流（Readable）、可写流（Writable）、双工流（Duplex）和转换流（Transform）。可以使用 `stream` 模块创建和处理流。

```javascript
const fs = require('fs')
const readStream = fs.createReadStream('input.txt')
const writeStream = fs.createWriteStream('output.txt')

readStream.pipe(writeStream)

readStream.on('end', () => {
  console.log('文件读取完成')
})

writeStream.on('finish', () => {
  console.log('文件写入完成')
})
```

## 46. **如何在 Node.js 中处理命令行参数？**

- 可以使用 `process.argv` 访问命令行参数。

```javascript
const args = process.argv.slice(2)
console.log('命令行参数:', args)
```

## 47. **如何在 Node.js 中使用 `worker_threads` 模块实现多线程？**

```javascript
const { Worker, isMainThread, parentPort } = require('worker_threads')

if (isMainThread) {
  const worker = new Worker(__filename)
  worker.on('message', (message) => {
    console.log('来自工作线程的消息:', message)
  })
  worker.postMessage('你好，工作线程')
} else {
  parentPort.on('message', (message) => {
    console.log('来自主线程的消息:', message)
    parentPort.postMessage('你好，主线程')
  })
}
```

## 48. **如何在 Node.js 中进行进程间通信（IPC）？**

- 可以使用 `child_process` 模块的 `fork` 方法创建子进程，并通过消息传递实现进程间通信。

```javascript
const { fork } = require('child_process')

const child = fork('child.js')

child.on('message', (message) => {
  console.log('来自子进程的消息:', message)
})

child.send('你好，子进程')
```

## 49. **如何在 Node.js 中实现负载均衡？**

- 可以使用 `cluster` 模块实现负载均衡，通过创建多个子进程处理请求。

```javascript
const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 退出`)
  })
} else {
  http
    .createServer((req, res) => {
      res.writeHead(200)
      res.end('hello world\n')
    })
    .listen(8000)
}
```

## 50. **如何在 Node.js 中使用 `async_hooks` 模块追踪异步操作？**

```javascript
const async_hooks = require('async_hooks')
const fs = require('fs')

const asyncHook = async_hooks.createHook({
  init(asyncId, type, triggerAsyncId, resource) {
    fs.writeSync(1, `初始化: ${asyncId}\n`)
  },
  before(asyncId) {
    fs.writeSync(1, `之前: ${asyncId}\n`)
  },
  after(asyncId) {
    fs.writeSync(1, `之后: ${asyncId}\n`)
  },
  destroy(asyncId) {
    fs.writeSync(1, `销毁: ${asyncId}\n`)
  }
})

asyncHook.enable()

require('http')
  .createServer((req, res) => {
    res.end('hello world\n')
  })
  .listen(8080)
```

## 51. **如何在 Node.js 中使用 `util.promisify` 将回调函数转换为 Promise？**

```javascript
const util = require('util')
const fs = require('fs')

const readFile = util.promisify(fs.readFile)

readFile('path/to/file', 'utf8')
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.error(err)
  })
```

## 52. **如何在 Node.js 中处理路径操作？**

- 可以使用 `path` 模块进行路径操作，如解析、组合、获取文件名等。

```javascript
const path = require('path')

console.log('目录名:', path.dirname('/foo/bar/baz/asdf/quux.html'))
console.log('文件名:', path.basename('/foo/bar/baz/asdf/quux.html'))
console.log('扩展名:', path.extname('/foo/bar/baz/asdf/quux.html'))
console.log('解析路径:', path.parse('/foo/bar/baz/asdf/quux.html'))
console.log('组合路径:', path.join('/foo', 'bar', 'baz/asdf', 'quux', '..'))
```

## 53. **如何在 Node.js 中创建和管理子进程？**

- 可以使用 `child_process` 模块创建和管理子进程。

```javascript
const { exec, spawn } = require('child_process')

// 使用 exec 执行命令
exec('ls -l', (error, stdout, stderr) => {
  if (error) {
    console.error(`执行错误: ${error}`)
    return
  }
  console.log(`stdout: ${stdout}`)
  console.error(`stderr: ${stderr}`)
})

// 使用 spawn 创建子进程
const ls = spawn('ls', ['-l'])

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`)
})

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`)
})

ls.on('close', (code) => {
  console.log(`子进程退出码: ${code}`)
})
```

## 54. **如何在 Node.js 中处理 HTTP 请求的超时？**

- 可以设置请求的超时时间，并在超时时处理相应逻辑。

```javascript
const http = require('http')

const server = http.createServer((req, res) => {
  // 设置超时时间为 2 秒
  req.setTimeout(2000, () => {
    res.writeHead(408, { 'Content-Type': 'text/plain' })
    res.end('请求超时')
  })

  // 模拟处理逻辑
  setTimeout(() => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('响应成功')
  }, 1000)
})

server.listen(3000, () => {
  console.log('服务器运行在 http://127.0.0.1:3000/')
})
```

## 55. **如何在 Node.js 中实现 HTTP/2 服务器？**

```javascript
const http2 = require('http2')
const fs = require('fs')

const server = http2.createSecureServer({
  key: fs.readFileSync('path/to/private-key.pem'),
  cert: fs.readFileSync('path/to/certificate.pem')
})

server.on('stream', (stream, headers) => {
  stream.respond({
    'content-type': 'text/html',
    ':status': 200
  })
  stream.end('<h1>Hello, HTTP/2!</h1>')
})

server.listen(3000, () => {
  console.log('HTTP/2 服务器运行在 https://127.0.0.1:3000/')
})
```

## 56. **如何在 Node.js 中实现 HTTPS 服务器？**

```javascript
const https = require('https')
const fs = require('fs')

const options = {
  key: fs.readFileSync('path/to/private-key.pem'),
  cert: fs.readFileSync('path/to/certificate.pem')
}

https
  .createServer(options, (req, res) => {
    res.writeHead(200)
    res.end('Hello, HTTPS!')
  })
  .listen(3000, () => {
    console.log('HTTPS 服务器运行在 https://127.0.0.1:3000/')
  })
```

## 57. **如何在 Node.js 中处理 JSON 数据？**

```javascript
const http = require('http')

const server = http.createServer((req, res) => {
  if (
    req.method === 'POST' &&
    req.headers['content-type'] === 'application/json'
  ) {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk.toString()
    })
    req.on('end', () => {
      const data = JSON.parse(body)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: '数据接收成功', data }))
    })
  } else {
    res.writeHead(400, { 'Content-Type': 'text/plain' })
    res.end('只接受 JSON 数据')
  }
})

server.listen(3000, () => {
  console.log('服务器运行在 http://127.0.0.1:3000/')
})
```

## 58. **如何在 Node.js 中实现简单的文件下载功能？**

```javascript
const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'file.txt')

  res.writeHead(200, {
    'Content-Type': 'application/octet-stream',
    'Content-Disposition': `attachment; filename="${path.basename(filePath)}"`
  })

  fs.createReadStream(filePath).pipe(res)
})

server.listen(3000, () => {
  console.log('服务器运行在 http://127.0.0.1:3000/')
})
```

## 59. **如何在 Node.js 中实现简单的消息队列？**

- 可以使用 `amqplib` 库与 RabbitMQ 集成，实现简单的消息队列。

```javascript
const amqp = require('amqplib/callback_api')

// 生产者
amqp.connect('amqp://localhost', (err, conn) => {
  conn.createChannel((err, ch) => {
    const queue = 'hello'
    const msg = 'Hello World!'

    ch.assertQueue(queue, { durable: false })
    ch.sendToQueue(queue, Buffer.from(msg))
    console.log(`[x] 发送消息 ${msg}`)
  })

  setTimeout(() => {
    conn.close()
    process.exit(0)
  }, 500)
})

// 消费者
amqp.connect('amqp://localhost', (err, conn) => {
  conn.createChannel((err, ch) => {
    const queue = 'hello'

    ch.assertQueue(queue, { durable: false })
    console.log(`[*] 等待消息 ${queue}。按下 Ctrl+C 退出`)

    ch.consume(
      queue,
      (msg) => {
        console.log(`[x] 收到消息 ${msg.content.toString()}`)
      },
      { noAck: true }
    )
  })
})
```

## 60. **TODO**

> TODO

## 61. **如何在 Node.js 中进行进程管理（如使用 PM2）？**

- 可以使用 PM2 进行进程管理，包括启动、停止、重启和监控应用程序。

```bash
# 全局安装 PM2
npm install -g pm2

# 启动应用
pm2 start app.js

# 查看进程列表
pm2 list

# 停止应用
pm2 stop app.js

# 重启应用
pm2 restart app.js

# 删除应用
pm2 delete app.js

# 监控应用
pm2 monit
```

## 62. **如何在 Node.js 中使用 TypeScript？**

- 可以通过安装 TypeScript 和相应的类型定义文件，在 Node.js 中使用 TypeScript。

```bash
# 初始化 Node.js 项目
npm init -y

# 安装 TypeScript 和类型定义文件
npm install typescript @types/node --save-dev

# 初始化 TypeScript 配置文件
npx tsc --init

# 编写 TypeScript 代码 (index.ts)
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, TypeScript!\n');
});

server.listen(3000, () => {
  console.log('服务器运行在 http://127.0.0.1:3000/');
});

# 编译 TypeScript 代码
npx tsc

# 运行编译后的 JavaScript 代码
node dist/index.js
```

## 63. **如何在 Node.js 中使用 Redis？**

- 可以使用 `redis` 包连接和操作 Redis 数据库。

```javascript
const redis = require('redis')
const client = redis.createClient()

client.on('connect', () => {
  console.log('连接到 Redis 服务器')
})

client.set('key', 'value', redis.print)
client.get('key', (err, reply) => {
  if (err) throw err
  console.log('key:', reply)
  client.quit()
})
```

## 64. **如何在 Node.js 中使用环境变量？**

- 可以使用 `process.env` 访问环境变量，使用 `dotenv` 库从 `.env` 文件加载环境变量。

```bash
# 安装 dotenv 库
npm install dotenv

# 创建 .env 文件
# .env
DB_HOST=localhost
DB_USER=root
DB_PASS=s1mpl3

# 使用 dotenv 加载环境变量
require('dotenv').config();

console.log('数据库主机:', process.env.DB_HOST);
console.log('数据库用户:', process.env.DB_USER);
console.log('数据库密码:', process.env.DB_PASS);
```

## 65. **如何在 Node.js 中处理静态文件？**

- 可以使用 `express.static` 中间件处理静态文件。

```javascript
const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.listen(3000, () => {
  console.log('服务器运行在 http://127.0.0.1:3000/')
})
```

## 66. **如何在 Node.js 中处理多文件上传？**

- 可以使用 `multer` 中间件处理多文件上传。

```javascript
const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const app = express()

app.post('/upload', upload.array('files', 12), (req, res) => {
  res.send('文件上传成功')
})

app.listen(3000, () => {
  console.log('服务器运行在 http://127.0.0.1:3000/')
})
```

## 67. **如何在 Node.js 中实现文件下载？**

```javascript
const express = require('express')
const path = require('path')
const app = express()

app.get('/download', (req, res) => {
  const file = path.join(__dirname, 'path/to/file.txt')
  res.download(file, 'filename.txt', (err) => {
    if (err) {
      console.error('文件下载失败:', err)
    }
  })
})

app.listen(3000, () => {
  console.log('服务器运行在 http://127.0.0.1:3000/')
})
```

## 68. **如何在 Node.js 中创建和使用中间件？**

- 中间件是处理请求和响应的函数，可以在 Express 中使用 `app.use` 添加中间件。

```javascript
const express = require('express')
const app = express()

// 定义中间件函数
const myMiddleware = (req, res, next) => {
  console.log('中间件被调用')
  next()
}

// 使用中间件
app.use(myMiddleware)

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.listen(3000, () => {
  console.log('服务器运行在 http://127.0.0.1:3000/')
})
```

## 69. **如何在 Node.js 中处理表单数据？**

- 可以使用 `body-parser` 中间件解析表单数据。

```javascript
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// 解析 application/json
app.use(bodyParser.json())

app.post('/submit', (req, res) => {
  res.send(`接收到的表单数据: ${JSON.stringify(req.body)}`)
})

app.listen(3000, () => {
  console.log('服务器运行在 http://127.0.0.1:3000/')
})
```

## 70. **如何在 Node.js 中进行日志记录？**

- 可以使用 `winston` 库进行日志记录。

```javascript
const winston = require('winston')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})

// 如果在开发环境中，还可以将日志输出到控制台
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  )
}

logger.info('这是一个信息日志')
logger.error('这是一个错误日志')
```

## 71. **如何在 Node.js 中实现路由？**

- 可以使用 Express 框架的路由功能。

```javascript
const express = require('express')
const app = express()

// 定义路由
const router = express.Router()

router.get('/', (req, res) => {
  res.send('主页')
})

router.get('/about', (req, res) => {
  res.send('关于')
})

// 使用路由
app.use('/', router)

app.listen(3000, () => {
  console.log('服务器运行在 http://127.0.0.1:3000/')
})
```

## 72. **如何在 Node.js 中处理文件系统权限问题？**

- 可以使用 `fs.chmod` 和 `fs.chown` 方法更改文件权限和所有权。

```javascript
const fs = require('fs')

// 更改文件权限
fs.chmod('path/to/file', 0o755, (err) => {
  if (err) throw err
  console.log('文件权限已更改')
})

// 更改文件所有权
fs.chown('path/to/file', 1000, 1000, (err) => {
  if (err) throw err
  console.log('文件所有权已更改')
})
```

## 73. **如何在 Node.js 中使用 `cluster` 模块实现多进程？**

```javascript
const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length

if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`)

  // 启动工作进程
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已退出`)
  })
} else {
  // 工作进程可以共享相同的 TCP 连接
  http
    .createServer((req, res) => {
      res.writeHead(200)
      res.end('Hello, World!\n')
    })
    .listen(8000)

  console.log(`工作进程 ${process.pid} 已启动`)
}
```

## 74. **如何在 Node.js 中实现实时通知功能？**

- 可以使用 Socket.IO 实现实时通知功能。

```javascript
const express = require('express')
const http = require('http')
const socketIo = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

io.on('connection', (socket) => {
  console.log('一个用户已连接')
  socket.on('disconnect', () => {
    console.log('一个用户已断开连接')
  })

  // 发送实时通知
  setInterval(() => {
    socket.emit('notification', '这是一条实时通知')
  }, 5000)
})

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

server.listen(3000, () => {
  console.log('服务器运行在 http://127.0.0.1:3000/')
})
```

## 75. **如何在 Node.js 中处理 CORS？**

- 可以使用 `cors` 中间件处理跨域资源共享 (CORS)。

```javascript
const express = require('express')
const cors = require('cors')
const app = express()

// 使用 CORS 中间件
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.listen(3000, () => {
  console.log('服务器运行在 http://127.0.0.1:3000/')
})
```

## 76. **如何在 Node.js 中实现简单的缓存功能？**

- 可以使用 `memory-cache` 库实现简单的内存缓存。

```javascript
const express = require('express')
const cache = require('memory-cache')
const app = express()

const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cachedBody = cache.get(key)
    if (cachedBody) {
      res.send(cachedBody)
      return
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        cache.put(key, body, duration * 1000)
        res.sendResponse(body)
      }
      next()
    }
  }
}

app.get('/', cacheMiddleware(30), (req, res) => {
  res.send('Hello, World!')
})

app.listen(3000, () => {
  console.log('服务器运行在 http://127.0.0.1:3000/')
})
```

## 77. **如何在 Node.js 中实现文件压缩和解压缩？**

- 可以使用 `zlib` 模块进行文件压缩和解压缩。

```javascript
const zlib = require('zlib')
const fs = require('fs')

// 压缩文件
const gzip = zlib.createGzip()
const input = fs.createReadStream('input.txt')
const output = fs.createWriteStream('input.txt.gz')

input.pipe(gzip).pipe(output)

// 解压缩文件
const gunzip = zlib.createGunzip()
const compressedInput = fs.createReadStream('input.txt.gz')
const decompressedOutput = fs.createWriteStream('input.txt')

compressedInput.pipe(gunzip).pipe(decompressedOutput)
```

## 78. **如何在 Node.js 中实现分页功能？**

- 可以在查询数据库时实现分页功能。

```javascript
const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()

const url = 'mongodb://localhost:27017'
const dbName = 'mydatabase'

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err
  const db = client.db(dbName)
  const collection = db.collection('documents')

  app.get('/documents', (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    collection
      .find()
      .skip(skip)
      .limit(limit)
      .toArray((err, docs) => {
        if (err) throw err
        res.json(docs)
      })
  })

  app.listen(3000, () => {
    console.log('服务器运行在 http://127.0.0.1:3000/')
  })
})
```

## 79. **如何在 Node.js 中发送电子邮件？**

- 可以使用 `nodemailer` 库发送电子邮件。

```javascript
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
})

let mailOptions = {
  from: 'your-email@gmail.com',
  to: 'recipient-email@gmail.com',
  subject: '发送邮件测试',
  text: '这是一封测试邮件'
}

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error)
  }
  console.log('邮件发送成功: ' + info.response)
})
```

## 80. **如何在 Node.js 中实现文件读取时的并发控制？**

- 可以使用 `async` 库的 `queue` 方法实现文件读取的并发控制。

```javascript
const async = require('async')
const fs = require('fs')

const q = async.queue((task, callback) => {
  fs.readFile(task.filePath, 'utf8', (err, data) => {
    if (err) return callback(err)
    console.log(`文件内容: ${data}`)
    callback()
  })
}, 2) // 并发数为 2

q.drain(() => {
  console.log('所有文件读取完毕')
})

q.push({ filePath: 'file1.txt' })
q.push({ filePath: 'file2.txt' })
q.push({ filePath: 'file3.txt' })
```

## 81. **如何在 Node.js 中处理异常？**

- 使用 `try...catch` 块来捕获同步代码中的异常，在异步代码中可以使用回调函数或 `Promise` 的 `catch` 方法捕获异常。

```javascript
// 同步代码中的异常处理
try {
  let result = someFunction()
} catch (error) {
  console.error('捕获到异常:', error)
}

// 异步代码中的异常处理
asyncFunction().catch((error) => {
  console.error('捕获到异步异常:', error)
})
```

## 82. **如何在 Node.js 中实现 RESTful API？**

- 使用 Express 框架实现 RESTful API。

```javascript
const express = require('express')
const app = express()
app.use(express.json())

// GET 请求
app.get('/api/items', (req, res) => {
  res.json({ items: [] })
})

// POST 请求
app.post('/api/items', (req, res) => {
  const newItem = req.body
  res.status(201).json(newItem)
})

// PUT 请求
app.put('/api/items/:id', (req, res) => {
  const updatedItem = req.body
  res.json(updatedItem)
})

// DELETE 请求
app.delete('/api/items/:id', (req, res) => {
  res.status(204).end()
})

app.listen(3000, () => {
  console.log('服务器运行在 http://127.0.0.1:3000/')
})
```

## 83. **如何在 Node.js 中处理并发请求？**

- Node.js 使用事件循环和非阻塞 I/O 来处理并发请求，不需要创建多个线程。可以通过集群 (cluster) 模块来利用多核 CPU 提高并发处理能力。

```javascript
const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已退出`)
  })
} else {
  http
    .createServer((req, res) => {
      res.writeHead(200)
      res.end('Hello, World!\n')
    })
    .listen(8000)
}
```

## 84. **如何在 Node.js 中进行单元测试？**

- 可以使用 `Mocha` 和 `Chai` 进行单元测试。

```javascript
const chai = require('chai')
const expect = chai.expect

describe('Array', () => {
  it('should return -1 when the value is not present', () => {
    expect([1, 2, 3].indexOf(4)).to.equal(-1)
  })
})
```

## 85. **如何在 Node.js 中进行性能优化？**

- 使用以下策略进行性能优化：
  - 使用缓存来减少重复数据处理。
  - 使用 `gzip` 压缩传输数据。
  - 使用 `cluster` 模块充分利用多核 CPU。
  - 优化查询语句和数据库索引。
  - 使用流处理大数据量。

## 86. **如何在 Node.js 中实现文件系统操作？**

- 使用 `fs` 模块进行文件系统操作。

```javascript
const fs = require('fs')

// 读取文件
fs.readFile('path/to/file', 'utf8', (err, data) => {
  if (err) throw err
  console.log(data)
})

// 写入文件
fs.writeFile('path/to/file', '内容', (err) => {
  if (err) throw err
  console.log('文件已保存')
})

// 删除文件
fs.unlink('path/to/file', (err) => {
  if (err) throw err
  console.log('文件已删除')
})
```

## 87. **如何在 Node.js 中使用 WebSocket 实现实时通信？**

- 使用 `ws` 模块实现 WebSocket 通信。

```javascript
const WebSocket = require('ws')
const server = new WebSocket.Server({ port: 8080 })

server.on('connection', (socket) => {
  socket.on('message', (message) => {
    console.log('收到消息:', message)
    socket.send('收到消息: ' + message)
  })
})

console.log('WebSocket 服务器运行在 ws://localhost:8080/')
```

## 88. **如何在 Node.js 中处理进程间通信 (IPC)？**

- 使用 `child_process` 模块创建子进程，并通过 `send` 和 `on` 方法进行通信。

```javascript
const { fork } = require('child_process')
const child = fork('child.js')

child.on('message', (message) => {
  console.log('父进程收到消息:', message)
})

child.send('Hello from parent')
```

- 子进程代码 (child.js)：

```javascript
process.on('message', (message) => {
  console.log('子进程收到消息:', message)
  process.send('Hello from child')
})
```

## 89. **如何在 Node.js 中处理加密和解密操作？**

- 使用 `crypto` 模块进行加密和解密操作。

```javascript
const crypto = require('crypto')

// 加密
const algorithm = 'aes-256-cbc'
const key = crypto.randomBytes(32)
const iv = crypto.randomBytes(16)

const cipher = crypto.createCipheriv(algorithm, key, iv)
let encrypted = cipher.update('Hello, World!', 'utf8', 'hex')
encrypted += cipher.final('hex')

// 解密
const decipher = crypto.createDecipheriv(algorithm, key, iv)
let decrypted = decipher.update(encrypted, 'hex', 'utf8')
decrypted += decipher.final('utf8')

console.log('加密后的内容:', encrypted)
console.log('解密后的内容:', decrypted)
```

## 90. **如何在 Node.js 中实现 OAuth 认证？**

- 可以使用 `passport` 和 `passport-oauth2` 模块实现 OAuth 认证。

```javascript
const express = require('express')
const passport = require('passport')
const OAuth2Strategy = require('passport-oauth2').Strategy

passport.use(
  new OAuth2Strategy(
    {
      authorizationURL: 'https://www.example.com/oauth2/authorize',
      tokenURL: 'https://www.example.com/oauth2/token',
      clientID: 'your-client-id',
      clientSecret: 'your-client-secret',
      callbackURL: 'http://localhost:3000/auth/example/callback'
    },
    (accessToken, refreshToken, profile, cb) => {
      // 处理用户信息
      return cb(null, profile)
    }
  )
)

const app = express()

app.get('/auth/example', passport.authenticate('oauth2'))

app.get(
  '/auth/example/callback',
  passport.authenticate('oauth2', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/')
  }
)

app.listen(3000, () => {
  console.log('服务器运行在 http://127.0.0.1:3000/')
})
```

## 91. **如何在 Node.js 中处理 SSL/TLS？**

- 使用 `https` 模块创建 HTTPS 服务器。

```javascript
const https = require('https')
const fs = require('fs')

const options = {
  key: fs.readFileSync('path/to/private.key'),
  cert: fs.readFileSync('path/to/certificate.crt')
}

https
  .createServer(options, (req, res) => {
    res.writeHead(200)
    res.end('Hello, Secure World!\n')
  })
  .listen(8443)

console.log('HTTPS 服务器运行在 https://localhost:8443/')
```

## 92. **如何在 Node.js 中实现会话管理？**

- 使用 `express-session` 中间件实现会话管理。

```javascript
const express = require('express')
const session = require('express-session')
const app = express()

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // 在生产环境中设置为 true
  })
)

app.get('/', (req, res) => {
  if (!req.session.views) {
    req.session.views = 0
  }
  req.session.views++
  res.send(`你访问了 ${req.session.views} 次`)
})

app.listen(3000, () => {
  console.log('服务器运行在 http://127.0.0.1:3000/')
})
```
