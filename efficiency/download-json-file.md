# 把 json 数据导出为.json 文本

在浏览器环境下，可以通过创建一个 Blob 对象，并使用 URL.createObjectURL 方法生成一个下载链接，实现文件下载功能。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Export JSON to .json File</title>
  </head>

  <body>
    <button id="export-button">Export JSON</button>

    <script>
      document.getElementById('export-button').addEventListener('click', () => {
        // 示例 JSON 数据
        const jsonData = {
          name: 'John Doe',
          age: 30,
          city: 'New York',
          address: {
            street: '5th Avenue',
            number: 123
          },
          phoneNumbers: [
            {
              type: 'home',
              number: '123-456-7890'
            },
            {
              type: 'office',
              number: '098-765-4321'
            }
          ]
        }

        // 将 JSON 数据转换为字符串
        const jsonString = JSON.stringify(jsonData, null, 2)

        // 创建一个 Blob 对象
        const blob = new Blob([jsonString], { type: 'application/json' })

        // 创建一个 URL 对象
        const url = URL.createObjectURL(blob)

        // 创建一个下载链接元素
        const link = document.createElement('a')
        link.href = url
        link.download = 'data.json'

        // 将链接元素添加到 DOM 并点击以触发下载
        document.body.appendChild(link)
        link.click()

        // 移除链接元素并释放 URL 对象
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      })
    </script>
  </body>
</html>
```

以下是核心代码，可以直接复制到你的项目（VUE 等）中使用：

```js
// 将 JSON 数据转换为字符串，注意：jsonData 是你要保存的数据
const jsonString = JSON.stringify(jsonData, null, 2)

// 创建一个 Blob 对象
const blob = new Blob([jsonString], { type: 'application/json' })

// 创建一个 URL 对象
const url = URL.createObjectURL(blob)

// 创建一个下载链接元素
const link = document.createElement('a')
link.href = url
link.download = 'data.json'

// 将链接元素添加到 DOM 并点击以触发下载
document.body.appendChild(link)
link.click()

// 移除链接元素并释放 URL 对象
document.body.removeChild(link)
URL.revokeObjectURL(url)
```
