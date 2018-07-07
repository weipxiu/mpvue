import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '',
    enablePullDownRefresh: true //启用下拉事件
  }
}
