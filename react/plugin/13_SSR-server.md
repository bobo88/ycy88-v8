# SSR 服务端渲染

## 一、自定义配置

### 1）layout.tsx

```tsx
// layout.tsx

import './styles/globals.scss'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <html lang="en">{children}</html>
}
```

### 2）app/page.tsx

```tsx
'use client'
// 相关引入：略
export default function Home() {
  // 其他：略

  const [siteMetadata, setSiteMetadata] = useState({
    name: '知行合一',
    title: '知行合一 - 首页',
    description: '这是知行合一网站的首页，涵盖了各种技术与思维模型的文章。',
    keywords:
      'V8程序, 前端博客小站 - JunF, 技术之外, 思维, 模型, Next, 知行合一, 技术博客, 思维模型, 前端开发, V8程序, JunF',
    logo: ''
  })

  return (
    <>
      <head>
        <title>{siteMetadata.title}</title>
        <meta name="description" content={siteMetadata.description} />
        <meta name="keywords" content={siteMetadata.keywords} />
      </head>

      <body>{/* 内容略 */}</body>
    </>
  )
}
```

### 3）app/links/page.tsx

```tsx
'use client'
// 相关引入：略
export default function Home() {
  // 其他：略

  const [siteMetadata, setSiteMetadata] = useState({
    name: '知行合一',
    title: '知行合一 - 友链',
    description:
      '这是知行合一网站的友链，涵盖了相关的技术博客网站（个人独立博客网站）。',
    keywords:
      'V8程序, 前端博客小站 - JunF, 技术之外, 思维, 模型, Next, 知行合一, 技术博客, 思维模型, 前端开发, V8程序, JunF',
    logo: ''
  })

  return (
    <>
      <head>
        <title>{siteMetadata.title}</title>
        <meta name="description" content={siteMetadata.description} />
        <meta name="keywords" content={siteMetadata.keywords} />
      </head>

      <body>{/* 内容略 */}</body>
    </>
  )
}
```

### 4）案例：首页 - 截图

![An image](/images/react/next-seo-1.png)

### 5）案例：友链 - 截图

![An image](/images/react/next-seo-2.png)
