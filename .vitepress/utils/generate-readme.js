const fs = require('fs')
const path = require('path')

const baseDir = './' // 项目根目录
const readmePath = path.join(baseDir, 'README.md')

// 默认的头部内容
const defaultHeaderContent = `
> **你我共勉**：掌握核心技术（道法术器），全方位涵盖技术团队规范、全栈技能、算法、主流技术和团队管理的关键元素。
> 
> 作者：yb
>
> 本站地址：https://fe.ycy88.com
> 
> 强烈推荐大家阅读了解 **【技术之外】** 这个篇章，「想」和「做」都很重要，但「想」要先行。知行合一，也是「知」在前面。非常欢迎大家Star🌟🌟🌟🌟🌟！！！

![An image](https://fe.ycy88.com/images/beyond/bloom.png)

\`\`\`
别去做太多准备，那只会束缚你前进的决心和脚步。

保持进击，随时复盘，及时调整。～@yb
\`\`\`

`

// 获取Markdown文件的标题
function getTitleFromMarkdown(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')

  if (lines[0].startsWith('---')) {
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].startsWith('title:')) {
        return lines[i].replace(/^title:\s*/, '') // 获取 'title:' 后的内容
      }
    }
  }

  for (let line of lines) {
    line = line.trim()
    if (line.startsWith('# ')) {
      return line.replace(/^# /, '') // 去掉 '# ' 前缀，获取标题
    }
  }
  return path.basename(filePath) // 如果没有找到标题，使用文件名作为标题
}

// 生成目录的递归函数
function generateMarkdownForDirectory(dir, relativePath = '', level = 2) {
  const files = fs.readdirSync(dir)
  let markdown = ''

  files.forEach((file) => {
    const fullPath = path.join(dir, file)
    const relativeFilePath = path.join(relativePath, file)
    const stats = fs.statSync(fullPath)

    // 过滤掉不需要的目录
    if (
      stats.isDirectory() &&
      (file === '.vitepress' ||
        file === 'node_modules' ||
        file === 'todo' ||
        file === '.git' ||
        file === 'public')
    ) {
      return
    }

    if (stats.isDirectory()) {
      let heading = '#'.repeat(level)
      let directoryTitle = file

      // 检查是否存在 index.md 文件
      const indexFilePath = path.join(fullPath, 'index.md')
      if (fs.existsSync(indexFilePath)) {
        directoryTitle = getTitleFromMarkdown(indexFilePath)
      }

      markdown += `${heading} ${directoryTitle}\n\n`
      markdown += generateMarkdownForDirectory(
        fullPath,
        relativeFilePath,
        level + 1
      )
    } else if (file.endsWith('.md') && !file.includes('_hidden')) {
      // 添加过滤条件
      const title = getTitleFromMarkdown(fullPath)
      markdown += `- [${title}](${relativeFilePath})\n`
    }
  })

  return markdown
}

const markdownContent = `${defaultHeaderContent}# 项目目录\n\n${generateMarkdownForDirectory(
  baseDir
)}`
fs.writeFileSync(readmePath, markdownContent)

console.log('README.md has been updated.')
