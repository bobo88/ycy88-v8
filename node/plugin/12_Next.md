# Node 系列之 Next

## 一、Next.js 简介

**Next.js** 是一个用于构建 React 应用程序的 React 框架。它提供了一组开发 React 应用所需的工具和约定，使得开发者能够更加轻松地构建服务端渲染(SSR)和静态生成(Static Site Generation)的 React 应用。

### 主要特点：

- 服务器端渲染(SSR)和静态生成： Next.js 允许你使用服务器端渲染或静态生成页面，提高了应用的性能和 SEO。
- 自动代码拆分： Next.js 自动拆分代码，只加载用户需要的部分，提高页面加载速度。
- 热模块替换(HMR)： 在开发环境中，Next.js 支持热模块替换，使得你在修改代码时无需刷新整个页面即可看到效果。
- 灵活的数据获取： Next.js 支持在页面组件中使用 `getStaticProps`、`getServerSideProps` 等方法获取数据，使得数据获取更加灵活。
- 简化的路由配置： Next.js 通过文件系统自动生成路由，无需手动配置，使得路由配置变得简单明了。

## 二、Next.js 使用示例：

### 1. 安装 Next.js：

```bash
# 使用 npm
$ npm install next react react-dom

# 使用 yarn
$ yarn add next react react-dom
```

### 2. 创建页面：

在项目根目录下创建 `pages` 文件夹，然后在该文件夹下创建 React 组件文件。例如：

```jsx
// pages/index.js
function HomePage() {
  return (
    <div>
      <h1>Hello, Next.js!</h1>
    </div>
  )
}

export default HomePage
```

### 3. 运行应用：

在命令行中执行以下命令：

```bash
# 使用 npm
$ npm run dev

# 使用 yarn
$ yarn dev
```

现在，你可以访问 http://localhost:3000 来查看你的 Next.js 应用。

## 三、结语

Next.js 是一个强大的 React 框架，使得构建服务端渲染和静态生成的 React 应用变得更加简单。它的约定和开发工具使得开发者能够专注于应用的逻辑而不必过多关注配置。如果你正在考虑构建 React 应用，并对服务端渲染或静态生成有需求，Next.js 是一个值得考虑的选择。

它是相对 Nuxt 而言的，主要区别是技术栈的不同。Next 是基于 React，而 Nuxt 是基于 VUE。

---

- [nextjs 中文网站](https://www.nextjs.cn/)
