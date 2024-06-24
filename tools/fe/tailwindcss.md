# tailwindcss

::: tip 关键词
只需书写 HTML 代码，无需书写 CSS，即可快速构建美观的网站。
:::

## 一、作用

Tailwind CSS 是一个实用优先的 CSS 框架，通过提供大量的预定义实用类，简化了样式的编写，提升了开发效率。其主要作用包括：

1. **快速开发**：通过使用实用类，可以快速搭建页面，无需编写大量自定义 CSS。
2. **灵活性**：允许在 HTML 中直接使用类名来控制样式，具有高度的灵活性和可定制性。
3. **响应式设计**：提供了便捷的响应式设计工具，可以轻松适配各种设备。
4. **易维护**：通过统一的类名和原子化的样式，代码易于维护和管理。
5. **优化文件大小**：结合 PurgeCSS，可以移除未使用的 CSS，减少文件大小，提升加载速度。

## 二、使用步骤

### 1. 安装 Tailwind CSS

通过 npm 安装 Tailwind CSS 及其依赖：

```bash
npm install tailwindcss postcss autoprefixer
npx tailwindcss init
```

### 2. 配置 Tailwind CSS

在项目根目录下创建 `postcss.config.js` 文件：

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
}
```

配置生成的 `tailwind.config.js` 文件，根据需要进行自定义配置。

### 3. 创建 CSS 文件

在项目中创建一个 CSS 文件，例如 `src/styles.css`，并引入 Tailwind 的基础样式和组件：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. 构建 CSS 文件

在 `package.json` 中添加构建脚本：

```json
"scripts": {
  "build:css": "postcss src/styles.css -o public/styles.css"
}
```

运行构建脚本：

```bash
npm run build:css
```

#### 5. 引入生成的 CSS 文件

在 HTML 文件中引入生成的 `public/styles.css` 文件：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Tailwind App</title>
    <link href="/styles.css" rel="stylesheet" />
  </head>
  <body class="bg-gray-100">
    <h1 class="text-4xl text-blue-500">Hello, Tailwind CSS!</h1>
  </body>
</html>
```

## 三、注意事项

1. **文件大小**：Tailwind CSS 生成的 CSS 文件可能较大，需结合 PurgeCSS 等工具进行优化，移除未使用的类。
2. **类名冲突**：由于 Tailwind CSS 的类名是全局的，可能会与其他 CSS 类名冲突，需注意命名空间的管理。
3. **学习曲线**：需要一定的学习曲线，特别是对新的开发者，需熟悉大量的实用类名。
4. **可维护性**：在大型项目中，可能需要配合更好的组织方式，如组件化开发，确保代码的可维护性。
5. **定制化**：尽管 Tailwind 提供了丰富的默认配置，但有时仍需根据项目需求进行定制化配置，以实现最佳效果。

## 四、和 Bootstrap 的差异

Tailwind CSS 和 Bootstrap 是两种流行的 CSS 框架，各有其特点和适用场景。以下是它们之间的主要差异：

### 1. 样式方法

#### Tailwind CSS

- **实用类优先**：Tailwind CSS 采用实用类优先的设计理念，通过大量的小而独立的类来实现样式。例如，使用类名 `text-center` 来实现文本居中，`bg-blue-500` 来设置背景颜色。
- **高度定制化**：通过配置文件（`tailwind.config.js`）可以高度定制化，包括颜色、间距、字体等各种设计系统。
- **无预定义组件**：Tailwind CSS 不提供预定义的 UI 组件，需要开发者自行组合实用类来构建组件。

#### Bootstrap

- **组件优先**：Bootstrap 提供了一套完整的预定义组件库，如按钮、导航栏、表单等，帮助开发者快速构建响应式网站。
- **定制化较低**：虽然 Bootstrap 也提供定制化选项，但其核心是基于一套设计风格，定制化相对较低。
- **全局样式**：Bootstrap 使用全局样式和组件类，通过覆盖样式或扩展类来定制。

### 2. 响应式设计

#### Tailwind CSS

- **响应式工具**：提供内置的响应式设计工具，通过类名即可轻松实现不同设备上的样式调整。例如，`md:text-center` 表示在中等以上屏幕大小上居中文本。
- **移动优先**：默认采用移动优先的设计思路，首先为小屏设备编写样式，然后使用响应式类为大屏设备调整样式。

#### Bootstrap

- **响应式网格系统**：拥有强大的响应式网格系统，通过类名如 `col-md-6` 来定义不同屏幕大小下的布局。
- **响应式组件**：预定义组件自带响应式行为，开发者只需使用相关类名即可实现响应式设计。

### 3. 文件大小和优化

#### Tailwind CSS

- **PurgeCSS**：结合 PurgeCSS 使用，可以自动移除未使用的 CSS 类，显著减少生成的 CSS 文件大小。
- **按需加载**：通过动态生成所需的 CSS 类，进一步优化性能，特别适合于大型项目。

#### Bootstrap

- **整体加载**：Bootstrap 通常作为一个整体库加载，虽然也可以通过定制来减少文件大小，但一般文件较大。
- **自定义构建**：可以通过官方的定制构建工具选择需要的组件和样式，但没有 Tailwind CSS 的按需加载灵活。

### 4. 学习曲线和灵活性

#### Tailwind CSS

- **学习曲线**：需要一定的学习曲线，特别是对新开发者，需要熟悉大量的实用类名。
- **灵活性高**：提供了高度的灵活性，可以根据项目需求精细调整样式，无需编写自定义 CSS。

#### Bootstrap

- **学习曲线**：相对较低，因为提供了大量预定义组件和样式，只需了解基本的类名即可快速上手。
- **灵活性较低**：虽然提供了一些定制化选项，但整体上受限于其设计规范，灵活性较低。

### 5. 开发效率和可维护性

#### Tailwind CSS

- **开发效率**：通过实用类可以快速开发和调整样式，但需要在 HTML 中写大量的类名，可能影响可读性。
- **可维护性**：样式分散在 HTML 中，可能会导致样式管理和维护的复杂性，需要良好的组织和命名策略。

#### Bootstrap

- **开发效率**：提供了大量的预定义组件，开发者可以快速搭建页面，但可能需要额外的覆盖样式来实现定制化需求。
- **可维护性**：组件化设计使得样式易于管理，但自定义样式和覆盖可能增加维护复杂性。

### 总结

- **Tailwind CSS** 更适合需要高度定制化、追求灵活性和精细控制的项目，特别是在大型项目中，通过 PurgeCSS 可以优化文件大小。
- **Bootstrap** 更适合快速开发、需要预定义组件库和简化响应式设计的项目，适合于中小型项目或需要快速交付的应用。

---

- [Github 地址](https://github.com/tailwindlabs/tailwindcss)
- [tailwindcss 中文地址](https://www.tailwindcss.cn/)
