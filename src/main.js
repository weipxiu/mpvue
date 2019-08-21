import Vue from 'vue'
import App from './App'
import store from './store'

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.store = store

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      '^pages/index/main',
      'pages/index/idetail/main',
      'pages/user/main',
      'pages/user/idetail/main',
      'pages/counter/main',
      'pages/counter/cdetail/main'
    ],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: "#F44B50",
      navigationBarTitleText: 'Douban电影预告',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#999999",
      selectedColor: "#666666",
      borderStyle: "white",
      backgroundColor: "#F9F9F9",
      list: [{
          "pagePath": "pages/index/main",
          "text": "首页",
          "iconPath": "/static/index.png",
          "selectedIconPath": "/static/index-active.png"
        },
        {
          "pagePath": "pages/counter/main",
          "text": "分类",
          "iconPath": "/static/subject.png",
          "selectedIconPath": "/static/subject-active.png"
        },
        {
          "pagePath": "pages/user/main",
          "text": "我的",
          "iconPath": "/static/user.png",
          "selectedIconPath": "/static/user-active.png"
        }
      ]
    },
    "networkTimeout": {
      "request": 10000,
      "downloadFile": 10000
    },
    "debug": false
  }
}
