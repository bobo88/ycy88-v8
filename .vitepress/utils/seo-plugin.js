// plugins/seo-plugin.js
import fs from 'fs'
import path from 'path'

export default {
  name: 'seo-plugin',
  apply: (app) => {
    console.log(2222, app)
    app.config.configureServer = async (server) => {
      console.log(33333, server)
      server.middlewares.use(async (ctx, next) => {
        console.log(44444, ctx)
        if (ctx.path.endsWith('.html')) {
          const filePath = path.join(
            __dirname,
            '..',
            'docs',
            ctx.path.replace(/\.html$/, '.md')
          )
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8')
            const description = content.slice(0, 100)
            console.log(11111, description)
            ctx.html = ctx.html.replace(
              /<meta name="description" content=".*?">/,
              `<meta name="description" content="${description}">`
            )
          }
        }
        await next()
      })
    }
  }
}
