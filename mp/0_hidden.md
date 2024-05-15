## 待处理清单

小程序项目创建

小程序的简单介绍（文件结构等）

小程序功能：
    页面布局
    数据绑定
    事件绑定
    事件传参
    条件渲染 wx:if === v-if, hidden === v-show / 列表渲染 wx:for wx:key
    rpx 750份： iPhone6 375px，以iPhone6为基准，设计图是100px，则写成200rpx即可。
    配置tabBar以及样式
    网络数据请求: wx.request({})
    导航：声明式导航navigator / 编程式导航wx.switchTab({}) wx.navigateTo({})
    导航传参与页面接收参数： url?name="bb", onload: function(options){console.log(options)}
    下拉刷新效果：开启和关闭 onPullDownReflesh
    上拉触底事件: onReachBottom  onReachBottomDistance
    生命周期： App: onLaunch onShow onHide  , Page: onLoad onShow onReady onHide onUnload 
    wxs 内嵌或外联

    组件 全局和局部 usingComponents / 1.在.json中声明“'component': true”， 2. Component({}), 3.事件处理函数定义在methods里
    样式隔离 styleIsolation
    组件数据监听 observers: {'aaa': function(){}} 通配符 *: observers: {'obj.*': function(){}}
    组件生命周期：created  / attached / ready / moved / detached / error。 lifetimes: {created(){},attached(){},detached(){}}, pageLifetimes: {show(){}, hide(){}, resize(){}}
    父子组件通信 properties / triggerEvent('funcName', data) this.selectComponent() === this.$refs.xx

    使用插件 vant weapp
    API promise化: miniprogram-api-promise
    全局状态共享： mobx-miniprogram / mobx-miniprogram-bindings

    分包： 概念 / 使用 / subpackages:[]
    独立分包： independent 
    分包预下载








    https://itunes.apple.com/hk/rss/topgrossingapplications/limit=10/json
    https://itunes.apple.com/cn/rss/topgrossingapplications/limit=10/json


    https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json

    https://itunes.apple.com/cn/rss/topfreeapplications/limit=100/json





uni-app
taro

https://github.com/bobo88/ycy88/tree/main/other/B-%E5%89%8D%E7%AB%AF%E4%B8%BB%E6%B5%81%E6%A1%86%E6%9E%B6%E5%92%8C%E6%8A%80%E6%9C%AF/%E5%B0%8F%E7%A8%8B%E5%BA%8F