# uniapp 在小程序中保存图片

## 一、完整代码如下

```js
 saveImage() {
  uni.authorize({
    scope: 'scope.writePhotosAlbum',
    success() {
      // 授权成功后执行保存图片的代码
      const imageUrl = 'https://fe.ycy88.com/images/yb.png' // 你的网络图片地址

      // 先下载图片到本地
      uni.downloadFile({
        url: imageUrl,
        success: (res) => {
          if (res.statusCode === 200) {
            // 下载成功，保存到相册
            uni.saveImageToPhotosAlbum({
              filePath: res.tempFilePath, // 使用下载后的临时文件路径
              success() {
                uni.showToast({
                  title: '保存成功',
                  icon: 'success',
                  duration: 2000
                })
              },
              fail(e) {
                console.log('保存失败', e)
                uni.showToast({
                  title: '保存失败',
                  icon: 'none',
                  duration: 2000
                })
              }
            })
          } else {
            uni.showToast({
              title: '下载失败',
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail(err) {
          console.log('下载失败', err)
          uni.showToast({
            title: '下载失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    },
    fail() {
      uni.showToast({
        title: '未授权保存到相册',
        icon: 'none',
        duration: 2000
      })
    }
  })
}
```

## 二、可能遇到的错误

如果在调用 `uni.saveImageToPhotosAlbum` 方法时出现了 `get file data fail` 错误，通常是由于以下几个原因之一：

1. **文件路径无效**：`filePath` 参数传递的路径可能不正确。确保文件路径是一个有效的本地路径，而不是网络路径。如果是网络图片，需要先下载到本地再保存。

2. **图片下载失败**：如果你是在下载网络图片后保存，可能是下载过程中的问题，导致无法成功获取图片数据。

3. **权限问题**：如果用户没有授权保存到相册的权限，也可能导致这个错误。

### 解决方案

以下是一些可能的解决方法：

#### 1. 确认文件路径

确保 `filePath` 是一个本地文件路径，而不是网络路径。`uni.saveImageToPhotosAlbum` 只接受本地文件路径。

#### 2. 下载网络图片后保存

如果你是保存网络图片，先下载图片到本地，再保存到相册。以下是修正后的代码示例：

```javascript
saveImage() {
  const imageUrl = 'https://example.com/image.png'; // 你的网络图片地址

  // 先下载图片到本地
  uni.downloadFile({
    url: imageUrl,
    success: (res) => {
      if (res.statusCode === 200) {
        // 下载成功，保存到相册
        uni.saveImageToPhotosAlbum({
          filePath: res.tempFilePath, // 使用下载后的临时文件路径
          success() {
            uni.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            });
          },
          fail(e) {
            console.log('保存失败', e);
            uni.showToast({
              title: '保存失败',
              icon: 'none',
              duration: 2000
            });
          }
        });
      } else {
        uni.showToast({
          title: '下载失败',
          icon: 'none',
          duration: 2000
        });
      }
    },
    fail(err) {
      console.log('下载失败', err);
      uni.showToast({
        title: '下载失败',
        icon: 'none',
        duration: 2000
      });
    }
  });
}
```

#### 3. 确保已经授权

在保存图片之前，请确保已经获得了用户授权：

```javascript
uni.authorize({
  scope: 'scope.writePhotosAlbum',
  success() {
    // 授权成功后执行保存图片的代码
    this.saveImage()
  },
  fail() {
    uni.showToast({
      title: '未授权保存到相册',
      icon: 'none',
      duration: 2000
    })
  }
})
```

#### 4. 检查文件是否有效

在保存之前，可以通过调试确认 `res.tempFilePath` 是否正确下载到本地，并且文件确实存在。

### 总结

- **路径有效性**：确保使用的是本地路径。
- **下载处理**：对于网络图片，先下载再保存。
- **权限检查**：确认用户已经授权。

这样可以有效避免 `get file data fail` 的错误。
