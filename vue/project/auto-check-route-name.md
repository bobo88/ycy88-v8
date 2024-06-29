# 自动检查路由 name 是否重复

在 Vue 项目中自动化检查路由的 `name` 是否重复，可以借助代码静态分析工具或者编写自定义的脚本来实现。

## 方法一：使用 ESLint 插件

1. **安装 ESLint 插件**：

   - 首先，确保项目中已经集成了 ESLint，并且可以安装插件。

2. **安装 `eslint-plugin-vue`**：

   - 如果还没有安装 `eslint-plugin-vue`，可以通过 npm 或 yarn 安装：

   ```bash
   npm install eslint eslint-plugin-vue --save-dev
   # 或者
   yarn add eslint eslint-plugin-vue --dev
   ```

3. **配置 ESLint 规则**：

   - 在项目的 ESLint 配置文件中（如 `.eslintrc.js` 或 `.eslintrc.json`）添加以下规则：

   ```javascript
   module.exports = {
     // 其他配置...
     plugins: ['vue'],
     rules: {
       'vue/valid-v-slot': 'error',
       // 添加此规则用于检查路由名称是否重复
       'vue/no-dupe-keys': 'error'
     }
   }
   ```

   这里的 `'vue/no-dupe-keys'` 规则将会检查 Vue 组件的键（包括路由中的 `name` 属性），确保它们是唯一的。

4. **运行 ESLint**：

   - 运行 ESLint 检查项目中的代码，它将会检查并报告重复的路由名称问题。

   ```bash
   eslint src --ext .js,.vue
   ```

## 方法二：自定义脚本检查

如果你希望更灵活地控制检查过程，可以编写一个自定义的脚本来检查路由配置文件中的重复名称。

1. **编写检查脚本**：

   - 创建一个脚本文件（如 `checkRouteNames.js`），读取路由配置文件并检查名称的唯一性：

   ```javascript
   const fs = require('fs')
   const path = require('path')

   const routeConfigFile = path.resolve(__dirname, 'src/router/index.js') // 路由配置文件路径
   const content = fs.readFileSync(routeConfigFile, 'utf8')
   const routes = eval(content) // 或者使用 JSON.parse(content) 解析路由配置

   const nameSet = new Set()
   let hasDuplicate = false

   routes.forEach((route) => {
     if (route.name) {
       if (nameSet.has(route.name)) {
         console.error(`Duplicate route name found: ${route.name}`)
         hasDuplicate = true
       } else {
         nameSet.add(route.name)
       }
     }
   })

   if (!hasDuplicate) {
     console.log('No duplicate route names found.')
   }
   ```

2. **运行脚本**：

   - 在命令行中运行脚本，检查是否有重复的路由名称：

   ```bash
   node checkRouteNames.js
   ```

## 注意事项

- **安全性和稳定性**：自定义脚本需要谨慎处理，确保安全性和稳定性，尤其是在处理项目中的敏感文件时。
- **版本控制**：确保将任何自定义脚本或配置文件纳入版本控制，以便团队协作和项目维护。

通过以上方法，可以有效地自动化检查 Vue 项目中是否存在重复的路由名称，帮助保证路由配置的正确性和可维护性。
