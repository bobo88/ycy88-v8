// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import './style/global.css'

// 自定义组件（可选）
const CustomComponent = {
  render() {
    return h('div', { class: 'custom-component' }, '我是自定义内容')
  }
}

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // 在应用中注册自定义组件（可选）
    app.component('CustomComponent', CustomComponent)

    // 等页面加载完毕后执行
    if (typeof window !== 'undefined') {
      window.onload = () => {
        const roundedDiv = document.createElement('div')
        roundedDiv.classList.add('rounded-box')
        roundedDiv.classList.add('animated-border')
        roundedDiv.innerHTML =
          '<h3 class="source-code">本站全套源码 <a class="route-link" href="https://github.com/bobo88/ycy88-v8" target="_blank">「ycy88-v8」</a></h3>'
        document.body.appendChild(roundedDiv)
      }
    }
  }
}
