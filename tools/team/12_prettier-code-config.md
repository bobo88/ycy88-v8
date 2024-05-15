# Prettier 代码格式化配置

::: tip
本文档主要介绍 VScode 下如何配置 Prettier。
:::

## 一、VScode 安装 Prettier

VScode 应用商店找到 Prettier，并安装好。

![An image](/images/tools/prettier_1.png)

## 二、配置 Prettier

打开配置：

- 勾选：Format On Save
- 设置 窗口失去焦点自动保存并格式化：Auto Save

![An image](/images/tools/prettier_2.png)

## 三、设置 默认格式化程序

- 任意打开一个 js 文件单击右键调出菜单 「选择使用...格式化文档」
- 选择 配置默认格式化程序
- 选择 prettier
  ![An image](/images/tools/prettier_3.png)
  ![An image](/images/tools/prettier_4.png)
  ![An image](/images/tools/prettier_5.png)

## 四、本地项目安装 Prettier 并配置

### 4.1 本地安装

```js
// npm
npm i prettier -D
// yarn
yarn add prettier -D
```

### 4.2 本地配置

根目录新建「.prettierignore」忽略文件

```pre
node_modules
.umi
.umi-production
```

根目录新建「.prettierrc」配置文件

```js
{
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "all",
  "proseWrap": "never",
  "overrides": [{ "files": ".prettierrc", "options": { "parser": "json" } }],
  "plugins": ["prettier-plugin-organize-imports", "prettier-plugin-packagejson"]
}
```

## 五、重启 VScode

尝试打乱某个文件的结构，然后保存，看看是否会自动格式化。
![An image](/images/tools/prettier_6.png)
![An image](/images/tools/prettier_7.png)
