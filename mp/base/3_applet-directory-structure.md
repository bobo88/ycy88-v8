# 小程序的目录结构分析

## 小程序配置

```json
// 1. 全局配置： app.json
{
  "pages": ["pages/index/index", "pages/logs/index"],
  "window": {
    "navigationBarTitleText": "Demo"
  },
  "tabBar": {
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页"
      },
      {
        "pagePath": "pages/logs/index",
        "text": "日志"
      }
    ]
  },
  "networkTimeout": {
    "request": 10000,
    "downloadFile": 10000
  },
  "debug": true
}
```

```json
// 2. 页面配置： pages/*/*.json
{
  "navigationBarBackgroundColor": "#ffffff",
  "navigationBarTextStyle": "black",
  "navigationBarTitleText": "微信接口功能演示",
  "backgroundColor": "#eeeeee",
  "backgroundTextStyle": "light"
}
```

```json
// 3. sitemap.json配置
{
  "rules": [
    {
      "action": "allow",
      "page": "path/to/page",
      "params": ["a", "b"],
      "matching": "inclusive"
    },
    {
      "action": "disallow",
      "page": "*"
    },
    {
      "action": "allow",
      "page": "*"
    }
  ]
}
```

![An image](/images/mp/mp_dir.png)
