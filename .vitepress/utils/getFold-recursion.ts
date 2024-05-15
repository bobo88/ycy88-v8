//侧边栏自动生成
// const autosidebar = require('vuepress-auto-sidebar-doumjun')
import fs from 'fs'
import path from 'path'
import { SidebarItems } from '../type'

// const navlist = require('../navConfig')

/**
 * 过滤所要导航的文件
 * 文件名 包含.md 但 不包含  README */
const checkFileType = (path) => {
  return (
    path.includes('.md') && !path.includes('index') && !path.includes('hidden')
  )
}

/**
 * 格式化文件路径*/
const prefixPath = (basePath, dirPath) => {
  let index = basePath.indexOf('/')
  // 去除一级目录地址
  basePath = basePath.slice(index, path.length)
  // replace用于处理windows电脑的路径用\表示的问题
  return path.join(basePath, dirPath).replace(/\\/g, '/')
}

/**
 * 获取文件夹别名，中文名称
 * @returns 返回枚举类型:文件夹对应的中文别名
 */
const getFoldAlias = async (url, item) => {
  const file = path.resolve(url + '/' + item, './index.md')
  let name = ''
  return new Promise((resolve, reject) => {
    fs.readFile(file, { encoding: 'utf8' }, (err, data) => {
      if (err) throw err
      // const regex = /<!--\s*\{foldName:(.*?)\}\s*-->/
      const regex = /<!--\s*\{foldName:(.*?)\}\s*-->|#\s*(.+)/
      const match = regex.exec(data)
      name = match?.[1] || match?.[2] || ''
      resolve(name) // 操作成功
    })
  })
}
/**
 * 递归获取分组信息并排序*/
const getGroupChildren = (path, ele, root, collapsed) => {
  let pa = fs.readdirSync(path + '/' + ele + '/')
  const basePath = `${path}/${ele}`
  const regEx = /\d+_/
  let palist = pa

  pa = palist.sort(function (a, b) {
    return (
      parseInt(a.replace('.md', '').match(regEx)?.[0] || '0') -
      parseInt(b.replace('.md', '').match(regEx)?.[0] || '0')
    )
  })

  pa.forEach(async function (item, index) {
    let info = fs.statSync(path + '/' + ele + '/' + item)
    if (info.isDirectory()) {
      let children = []
      let group = {} as SidebarItems
      const foldAlias = (await getFoldAlias(basePath, item)) as string
      const foldName = item.split('-')[0]
      group.text = foldAlias || foldName
      getGroupChildren(path, `${ele}/${item}`, children, collapsed)
      group.items = children
      group.collapsed = collapsed
      root.push(group)
    } else {
      if (checkFileType(item)) {
        const data = fs.readFileSync(path + '/' + ele + '/' + item, 'utf8')

        // 获取 title
        let title = ''
        if (data.startsWith('---')) {
          const sIndex = data.indexOf('title:')
          const nData = data.slice(sIndex)
          title = nData.slice(6, nData.indexOf('\n'))
        } else {
          title = data
            .slice(0, data.indexOf('\n'))
            .replace('### ', '')
            .replace('## ', '')
            .replace('# ', '')
        }

        // 获取 title（而不是具体的md文件名)
        root.push({
          // text: item.replace('.md', '').replace(/\d+_/, ''),
          text: title.replace('# ', ''),
          link: `/${ele}/${item}`
        })
      }
    }
  })
}
/**
 * 初始化*/
export const getChildren = ({ ele, collapsed = false }) => {
  var root = []
  getGroupChildren('./docs', ele, root, collapsed)
  return root
}
