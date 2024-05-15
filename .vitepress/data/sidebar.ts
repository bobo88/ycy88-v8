import fs from 'fs'
import path from 'path'

import { getChildren } from '../utils/getFold'

const BASE_PATH = './'
const sidebar = {}

// 读取目录下的所有文件夹
fs.readdirSync(BASE_PATH).forEach(async (folder) => {
  const folderPath = path.join(BASE_PATH, folder)

  // 检查当前路径是否为文件夹
  const stats = fs.statSync(folderPath)
  if (stats.isDirectory() && folder !== '.vitepress') {
    // 读取文件夹中的index.md文件
    const indexPath = path.join(folderPath, 'index.md')
    if (fs.existsSync(indexPath)) {
      const newData = fs.readFileSync(indexPath, 'utf8')

      // 如果index.md文件中包含"title"字样的内容
      let title = ''
      if (newData.startsWith('---')) {
        const sIndex = newData.indexOf('title:')
        const nData = newData.slice(sIndex)
        title = nData.slice(6, nData.indexOf('\n'))
      } else {
        title = newData
          .slice(0, newData.indexOf('\n'))
          .replace('### ', '')
          .replace('## ', '')
          .replace('# ', '')
      }

      // 添加到 sidebar 对象中
      sidebar[`/${folder}/`] = [
        {
          text: title,
          link: `/${folder}/`,
          items: await getChildren({ ele: folder })
        }
      ]
    }
  }
})

export { sidebar }
