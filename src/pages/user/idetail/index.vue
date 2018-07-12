<template>
  <!-- <h1 class="counter">小程序</h1> -->
  <div class="content movie-item">
    <h2 class="h2_title" v-if="!movies.length">实在不好意思，你好像还没观看任何影片！</h2>
    <h2 class="h2_title" v-if="movies.length">观看记录</h2>
    <div class="list-item" v-for="(item,index) in movies" v-bind:key="index" v-show="movies.length">
      <!-- <image class="poster" mode="widthFix" lazy-load="true" :src="itemData.poster" /> -->
        <image class="poster" :src="item.images" />
        <div class="title">
          <text>{{item.title}}
            <text class="rate">{{item.average}}</text>
          </text>
        </div>
        <div class="year-type">
          <text>{{item.genres}} / {{item.year}}</text>
        </div>
    </div>

  </div>
</template>

<script>
import store from "@/store";
import card from "@/components/card";
// import Config from '/config'

export default {
  data() {
    return {
      movies: []
    };
  },

  components: {
    card
  },

  methods: {
  },

  created() {
    //缓存历史观看数据
    this.movies = wx.getStorageSync('storList')
  },
  onShow(){
    //缓存历史观看数据
    this.movies = wx.getStorageSync('storList')
  },
  computed: {

  }
};
</script>

<style scoped>
.counter {
  font-size: 38rpx;
  color: #333;
  text-align: center;
  margin: 45rpx 0;
}
.h2_title {
  font-size: 30rpx;
  height: 60rpx;
  line-height: 60rpx;
  color: #333;
  padding: 10rpx 0;
  margin-bottom:20rpx;
  text-indent: 15rpx;
  width:100%;
  background: #fff;
  display: block
}

.list-item {
  width: 23%;
  margin: 1%;
  float: left;
  background: #fff;
}
.title {
  width: 100%;
  display: block;
}


.movie-item .poster {
  width: 100%;
  height: 230rpx;
}

.movie-item .title {
  font-size: 28rpx;
  text-align: center;
  color: #333;
  margin: 5rpx 0;
}

.movie-item .title .rate {
  color: #f00;
}

.movie-item .year-type {
  text-align: center;
  font-size: 20rpx;
  color: #888;
  overflow: hidden;/*内容超出后隐藏*/
  text-overflow: ellipsis;/* 超出内容显示为省略号*/
  white-space: nowrap;/*文本不进行换行*/
}

.loading {
  text-align: center;
  height: 80rpx;
  padding: 20rpx;
}

.loading img {
  width: 100%;
  height: 100%;
}
</style>
