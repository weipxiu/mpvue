import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '豆瓣电影榜',
    enablePullDownRefresh: true //启用下拉事件
  }
}
