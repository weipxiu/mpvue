<template>
  <div class="container">

    <div class="type-item" v-for="(item, index) in types" :key="index" :data-type="item.name" @tap="tapTypeHandle">
      <img class="type-img" :src="item.img" mode="aspectFill">
      <p class="type-title">{{item.name}}</p>
    </div>
  </div>
</template>
<script>
// Use Vuex
// import store from "./store";

export default {
  data: {
    types: [
      {
        name: "喜剧",
        img: "/static/xiju.png"
      },
      {
        name: "动作",
        img: "/static/dongzuo.png"
      },
      {
        name: "科幻",
        img: "/static/kehuan.png"
      },
      {
        name: "爱情",
        img: "/static/aiqing.png"
      },
      {
        name: "动画",
        img: "/static/donghua.png"
      }
    ]
  },
  methods: {
    tapTypeHandle(e) {
      const name = e.currentTarget.dataset.type;
      wx.navigateTo({
        url: "/pages/counter/cdetail/main?type=" + name
      });
    }
  },
  computed: {
    // count() {
    //   return store.state.count;
    // }
  }
};
</script>

<style>
.container {
  padding: 40rpx 25rpx;
}

.type-item {
  border-radius: 10rpx;
  position: relative;
  height:240rpx;
  width:100%;
}

.type-item + .type-item {
  margin-top: 20rpx;
}

.type-img {
  width: 100%;
  height: 240rpx;
  border-radius: 10rpx;
  display: block;
}

.type-title {
  position: absolute;
  left: 30rpx;
  bottom: 20rpx;
  color: #555;
  font-size: 36rpx;
  color: #fff;
  font-weight: bold;
  margin-bottom: 10rpx;
}
</style>
