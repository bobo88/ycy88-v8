import fs from 'fs'
import path from 'path'
import { SidebarItems } from '../type'

const checkFileType = (path) => {
  return (
    path.includes('.md') && !path.includes('index') && !path.includes('hidden')
  )
}

const getFoldAlias = async (url, item) => {
  const file = path.resolve(url + '/' + item, './index.md')

  return new Promise((resolve, reject) => {
    fs.readFile(file, { encoding: 'utf8' }, (err, data) => {
      if (err) throw err
      const regex = /<!--\s*\{foldName:(.*?)\}\s*-->|#\s*(.+)/
      const match = regex.exec(data)
      const name = match?.[1] || match?.[2] || ''
      resolve(name)
    })
  })
}

export const getChildren = async ({ ele, collapsed = false }) => {
  const root = []
  const basePath = './'
  const regEx = /\d+_/

  const stack = [{ path: basePath, ele, root }]

  while (stack.length) {
    const {
      path: currentPath,
      ele: currentEle,
      root: currentRoot
    } = stack.pop()
    const pa = fs.readdirSync(path.join(currentPath, currentEle))

    const sortedPa = pa.sort((a, b) => {
      let idxA = 100
      let idxB = 100
      const infoA = fs.statSync(path.join(currentPath, currentEle, a))
      const infoB = fs.statSync(path.join(currentPath, currentEle, b))
      if (infoA.isDirectory()) {
        idxA = 1000
      }
      if (infoB.isDirectory()) {
        idxB = 1000
      }

      return (
        parseInt(a.replace('.md', '').match(regEx)?.[0] || idxA) -
        parseInt(b.replace('.md', '').match(regEx)?.[0] || idxB)
      )
    })

    for (let i = 0; i < sortedPa.length; i++) {
      let item = sortedPa[i]
      const info = fs.statSync(path.join(currentPath, currentEle, item))
      if (info.isDirectory()) {
        const children = []
        const group = {} as SidebarItems
        const foldAlias = await getFoldAlias(
          currentPath,
          `${currentEle}/${item}`
        )
        const foldName = item.split('-')[0]
        group.text = foldAlias || foldName
        stack.push({
          path: currentPath,
          ele: `${currentEle}/${item}`,
          root: children
        })
        group.items = children
        group.collapsed = collapsed
        currentRoot.push(group)
      } else {
        if (checkFileType(item)) {
          const newData = fs.readFileSync(
            path.join(currentPath, currentEle, item),
            'utf8'
          )

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
          currentRoot.push({
            text: title.replace('# ', ''),
            link: `/${currentEle}/${item}`
          })
        }
      }
    }
  }

  return root
}
