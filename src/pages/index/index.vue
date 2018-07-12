<template>
  <!-- <h1 class="counter">小程序</h1> -->
  <div class="content">
    <!-- <div @click="increment">{{countNumber}}+4644646</div> -->
    <div class="swiper_cnetent" v-show="movies.length">
      <swiper :indicator-dots="true" :interval="3000" indicator-color="rgba(0, 0, 0, .8)" indicator-active-color="#ffffff" :autoplay="true" :duration="duration">
        <div v-for="(item,index) in imgUrls" :key="index">
          <swiper-item>
            <image :src="item" class="slide-image" mode="aspectFill"/>
          </swiper-item>
        </div>
      </swiper>
    </div>
    <h2 class="h2_title" v-show="movies.length">豆瓣电影新片榜</h2>
    <div class="list-item" v-for="(item,index) in movies" v-bind:key="index" v-show="movies.length">
      <div class="movie-item" v-for="(itemData, itemIndex) in item" v-if="itemData" @click="gotoDetail(itemData.id)" v-bind:key="itemIndex">
        <!-- <image class="poster" mode="widthFix" lazy-load="true" :src="itemData.poster" /> -->
        <image class="poster" :src="itemData.images.small" />
        <div class="title">
          <text>{{itemData.title}}
            <text class="rate">{{itemData.rating.average}}</text>
          </text>
        </div>
        <div class="year-type">
          <text>{{itemData.genres}} / {{itemData.year}}</text>
        </div>
      </div>
    </div>

    <div class="loading" v-show="loading">
      <img src="/static/loading-bars.svg">
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
      movies: [],
      page: 0,
      size: 10,
      loading: true,
      windowHeight: 0,
      imgUrls: [
        '/static/banner1.jpg',
        '/static/banner2.jpg',
        '/static/banner3.jpg'
      ],
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000
    };
  },

  components: {
    card
  },

  methods: {
    increment () {
      store.commit('increment')
    },
    decrement () {
      store.commit('decrement')
    },
    clickHandle(msg, ev) {
      console.log("clickHandle:", msg, ev);
    },
    loadMovies() {
      let that = this;
      this.loading = true;
      wx.showToast({
        title: "加载中",
        icon: "loading",
        duration: 2000
      });
      wx.request({
        url: `https://douban.uieee.com/v2/movie/new_movies?page=${
          that.page
        }&size=${that.size}`,
        header: { "Content-Type": "json" },
        success: res => {
          let { subjects } = res.data;
          let movies = this.movies || [];

          for (let i = 0; i < subjects.length; i += 4) {
            movies.push([
              subjects[i],
              subjects[i + 1] ? subjects[i + 1] : subjects[i - 1],
              subjects[i + 2] ? subjects[i + 2] : subjects[i - 2],
              subjects[i + 3] ? subjects[i + 3] : subjects[i - 3],
            ]);
          }
          this.movies = movies;
          this.loading = false;
          wx.hideToast();

          wx.hideNavigationBarLoading(); //完成停止加载
          wx.stopPullDownRefresh(); //停止下拉刷新
        }
      });
    },
    gotoDetail(id) {
      console.log("跳转详情页", id);
      wx.navigateTo({
        url: "/pages/index/idetail/main?id=" + id
      });
    }
  },
  
  created() {
    // 获取视频列表视频
    this.loadMovies();

    wx.getSystemInfo({
      success: res => {
        this.windowHeight = res.windowHeight;
      }
    });
  },
  computed:{
    countNumber() {
        return store.state.count;
    }
  },
  onReachBottom() {
    this.page = this.page + 1;
    this.loadMovies();
  },
  onPullDownRefresh() {
    console.log("下拉");
    this.page = this.page + 1;
    this.loadMovies();
    wx.showNavigationBarLoading(); //在标题栏中显示加载
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
.h2_title{
  font-size:30rpx;
  height:60rpx;
  line-height:60rpx;
  color:#333;
  margin:40rpx 0 0;
  padding:10rpx 0;
  text-indent:15rpx;
  background: #fff;
}

/*swiper轮播*/
.swiper_cnetent{
  width:100%;
  height:420rpx;
}
.swiper_cnetent .slide-image,.swiper_cnetent swiper{
  height:100%;
  width:100%;
}
.list-item {
  overflow: hidden;
}
.title {
  width: 100%;
  display: block;
}
.movie-item {
  width: 23%;
  margin: 1%;
  float: left;
  background: #fff;
}

.movie-item .poster {
  width: 100%;
  height:230rpx;
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
