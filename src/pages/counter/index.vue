<template>
  <div class="counter-warp">
    <p>Vuex counter：{{ count }}</p>
    <p>{{filterCount}}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>

    <a href="/pages/index/main" class="home">去首页</a>
  </div>
</template>
<script>
// Use Vuex
import store from './store'

export default {
  data: {
    sum: store.state.count + 100
  },
  methods: {
    increment() {
      this.sum++
      store.commit('increment')
    },
    decrement() {
      store.commit('decrement')
    }
  },
  computed: {
    count() {
      return store.state.count
    },
    filterCount() {
      return store.getter <= 0 ? 0 : store.getter;
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
