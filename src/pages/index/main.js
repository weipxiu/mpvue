import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '电影预告首页',
    enablePullDownRefresh: true //启用下拉事件
  }
}
