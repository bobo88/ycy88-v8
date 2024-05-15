# 遍历文件目录获取动态路由

> 获取 views 目录下的所有 route.ts 文件，并拼接组装成动态路由来使用。

```ts
// ====== 动态引入 ========
// 定义 views 文件夹路径
const viewsContext = require.context('../views', true, /\/route\.ts$/)

// 获取所有匹配的模块路径
const modulePaths = viewsContext.keys()

// 导出一个函数，该函数返回动态引入的路由配置数组
export async function getAsyncRoutes() {
  let asyncRoutesBuild: any[] = []

  try {
    // 使用 Promise.all 来等待所有模块的加载完成
    await Promise.all(
      modulePaths.map(async (modulePath: string) => {
        // 动态引入模块
        const module = await viewsContext(modulePath)

        // 获取模块的默认导出（路由配置）
        const routes = await module.default

        // 判断 routes 是否是数组
        if (Array.isArray(routes)) {
          asyncRoutesBuild.push(...routes)
        } else {
          asyncRoutesBuild.push(routes)
        }
      })
    )
  } catch (error) {
    console.error('Error while importing modules:', error)
  }

  return asyncRoutesBuild
}
```
