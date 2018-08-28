// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    list: []
  },
  getters: {
    count: (state) => {
      return state.count + 10 < 0 ? 0 : state.count + 10
    }
  },
  mutations: {
    increment: (state, payload) => {
      state.count += payload.count
    },
    decrement: (state, payload) => {
      state.count -= payload.count
    },
    changeList(state, list) {
      state.list = list;
    }
  },
  actions: {
    getListAction({
      commit
    }) {
      // 发送请求
      wx.request({
        url: `https://easy-mock.com/mock/5ad88f2ff3464d4f566fdf86/weipxiu/boke`,
        header: {
          'Content-Type': 'json'
        },
        success: res => {
          console.log(res.data.data)
          commit("changeList", res.data.data); // 拿到数据后，提交mutations，改变状态
        }
      });
    }
  }
})

export default store
