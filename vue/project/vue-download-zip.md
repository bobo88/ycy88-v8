# Blob 数据流下载 Zip 文件

## 一、完整代码

```js
import axios from 'axios'

const handleDownload = async (row) => {
  try {
    // 调用 API 下载文件
    const response = await axios.get(`/yb/download/${row.tableId}`, {
      headers: {
        'Content-Type': 'application/json; application/octet-stream'
      },
      // 注意：如果不加下面这一行，会导致下载下来的zip包出现无法解压的错误
      responseType: 'blob'
    })
    // 获取文件名，这里假设 API 返回文件名
    const filename =
      response.headers?.['Content-Disposition']?.split('=')[1] || 'custom.zip'

    // 创建 Blob 对象
    const blob = new Blob([response], { type: 'application/zip' })

    // 创建临时 URL
    const url = URL.createObjectURL(blob)

    // 创建一个隐藏的 <a> 元素
    const link = document.createElement('a')
    link.href = url
    link.download = filename // 设置下载的文件名
    link.style.display = 'none'

    // 将 <a> 元素添加到页面中
    document.body.appendChild(link)

    // 触发点击事件，开始下载
    link.click()

    // 清理
    URL.revokeObjectURL(url)
    document.body.removeChild(link)
  } catch (error) {
    console.error('Error downloading file:', error)
  }
}

// 调用示例
handleDownload(row)
```

::: warning 注意
请求头里面一定要加上这一行代码：「responseType: 'blob'」。
:::
