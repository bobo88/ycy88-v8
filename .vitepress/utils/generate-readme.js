const fs = require('fs')
const path = require('path')

const baseDir = './' // 项目根目录
const readmePath = path.join(baseDir, 'README.md')

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
    } else if (file.endsWith('.md')) {
      const title = getTitleFromMarkdown(fullPath)
      markdown += `- [${title}](${relativeFilePath})\n`
    }
  })

  return markdown
}

const markdownContent = `# 项目目录\n\n${generateMarkdownForDirectory(baseDir)}`
fs.writeFileSync(readmePath, markdownContent)

console.log('README.md has been updated.')
