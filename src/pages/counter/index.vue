<template>
  <div class="counter-warp">
    <p>Vuex counter：{{ count }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>

    <a href="/pages/index/main" class="home">进入首页</a>
  </div>
</template>
<script>
// Use Vuex
import store from './store'

export default {
  data: {
    
  },
  methods: {
    increment() {
      this.sum++
      store.commit('increment')
    },
    decrement() {
      if(store.state.count <= 0)return
      store.commit('decrement')
    }
  },
  computed: {
    count() {
      return store.state.count
    }
  }
}
</script>

<style>
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
