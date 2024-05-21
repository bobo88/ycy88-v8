# 关于 axios 302 重定向的问题

> TODO

## 1. 检查响应数据类型

在你的响应拦截器中，首先检查响应的数据类型。如果响应的数据是 HTML，而不是 JSON，那么很可能是登录重定向页面：

```typescript
instance.interceptors.response.use(
  (response) => {
    if (
      response.headers['content-type'] &&
      response.headers['content-type'].includes('text/html')
    ) {
      // 处理HTML响应
      handleHtmlResponse(response)
    } else {
      return handleData(response)
    }
  },
  (error) => {
    // 错误处理
    return handleData(error.response)
  }
)

function handleHtmlResponse(response: any) {
  const { config } = response
  // 在这里你可以处理登录重定向逻辑，比如重定向到登录页
  router.push({ path: '/login', replace: true }).then(() => {
    console.log('重定向到登录页')
  })
  return Promise.reject('需要登录')
}
```

## 2. 使用拦截器检测和处理重定向

如果服务器返回 302 重定向状态码，你可以在响应拦截器中专门处理这种情况：

```typescript
instance.interceptors.response.use(
  (response) => {
    if (response.status === 302) {
      const redirectUrl = response.headers['location']
      if (redirectUrl) {
        window.location.href = redirectUrl
      } else {
        console.error('重定向 URL 未找到')
      }
      return Promise.reject('重定向')
    }
    return handleData(response)
  },
  (error) => {
    return handleData(error.response)
  }
)
```

## 3. 检查是否需要重新登录

在 `handleData` 函数中处理 `401` 状态码时，确保正确地处理需要重新登录的情况：

```typescript
const handleData = async ({ config, data, status, statusText }: any) => {
  const { resetAll } = useUserStore()
  if (loadingInstance) loadingInstance.close()
  let code = data && data[statusName] ? data[statusName] : status
  switch (code) {
    case 200:
      return data
    case 401:
      router.push({ path: '/login', replace: true }).then(() => {
        resetAll()
      })
      break
    case 402:
      return await tryRefreshToken(config)
    case 403:
      router.push({ path: '/403' }).then(() => {})
      break
    default:
      const errMsg = `${
        data && data[messageName]
          ? data[messageName]
          : CODE_MESSAGE[code]
          ? CODE_MESSAGE[code]
          : statusText
      }`
      gp.$baseMessage(errMsg, 'error', 'vab-hey-message-error', false)
      if (needErrorLog())
        addErrorLog({ message: errMsg, stack: data, isRequest: true })
      return Promise.reject(data)
  }
}
```

---

- [关于 axios 302 重定向的问题](https://xudany.github.io/axios/2020/07/14/%E5%85%B3%E4%BA%8E-axios-302-%E9%87%8D%E5%AE%9A%E5%90%91%E7%9A%84%E9%97%AE%E9%A2%98/)
