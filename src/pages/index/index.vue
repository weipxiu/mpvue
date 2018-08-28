<template>
  <!-- <h1 class="counter">小程序</h1> -->
  <div class="content">
    <!-- <div @click="increment">{{countNumber}}+首页</div>
    <div @click="increment">{{count}}+首页</div> -->
    <div class="swiper_cnetent" v-show="movies.length">
      <swiper :indicator-dots="true" :interval="3000" indicator-color="rgba(0, 0, 0, .8)" indicator-active-color="#ffffff" :autoplay="true" :duration="1000">
        <div v-for="(item,index) in imgUrls" :key="index">
          <swiper-item>
            <image :src="item" class="slide-image" mode="aspectFill" />
          </swiper-item>
        </div>
      </swiper>
    </div>
    <h2 class="h2_title" v-show="movies.length">正在上映的电影</h2>
    <div class="list-item" v-for="(item,index) in movies" v-bind:key="index" v-show="movies.length">
      <div class="movie-item" v-for="(itemData, itemIndex) in item" v-if="itemData" @click="gotoDetail(itemData)" v-bind:key="itemIndex">
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

    <div class="loading">
      <img src="/static/loading-bars.svg" v-if="loading">
      <p class="baseline" v-if="baselineShow">我也是有底线的。。。</p>
    </div>

  </div>
</template>

<script>
import store from "@/store";
import card from "@/components/card";
import Api from "@/api";
import Utils from "@/utils";

export default {
  data() {
    return {
      movies: [],
      start: 0,
      count: 20,
      loading: true,
      baselineShow: false,
      imgUrls: [
        '/static/banner1.jpg',
        '/static/banner2.jpg',
        '/static/banner3.jpg'
      ]
    };
  },

  components: {
    card
  },

  methods: {
    increment() {
      store.commit('increment', 5);
    },
    decrement() {
      store.commit('decrement');
    },
    clickHandle(msg, ev) {
      console.log("clickHandle:", msg, ev);
    },
    //获取正在上映视频列表视频
    loadMovies() {
      Api.nowPlayingList({
        start: this.start,
        count: this.count
      }).then((res) => {
        this.movies = this.movies.concat(res);
        if (!res.length) {
          this.baselineShow = true;
          this.loading = false;
        }
      })
    },
    //观看历史记录
    gotoDetail(item) {
      Utils.watHistory(item)
    }
  },
  // 获取视频列表视频
  created() {
    this.loadMovies();

  },
  // createad:()=>{
  //   this.loadMovies();
  // },
  computed: {
    countNumber() {
      return store.state.count;
    },
    count() {
      return store.getters.count;
    }
  },
  //上拉刷新
  onReachBottom() {
    if (!this.baselineShow) {
      this.start = this.start + 20;
      this.loadMovies();
    }
  },
  //下拉刷新
  onPullDownRefresh() {
    this.start = this.start + 20;
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
.h2_title {
  font-size: 30rpx;
  height: 60rpx;
  line-height: 60rpx;
  color: #333;
  margin: 40rpx 0 0;
  padding: 10rpx 0;
  text-indent: 15rpx;
  background: #fff;
}

/*swiper轮播*/
.swiper_cnetent {
  width: 100%;
  height: 420rpx;
}
.swiper_cnetent .slide-image,
.swiper_cnetent swiper {
  height: 100%;
  width: 100%;
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
  height: 230rpx;
}

.movie-item .title {
  font-size: 28rpx;
  text-align: center;
  color: #333;
  margin: 5rpx 0;
  overflow: hidden; /*内容超出后隐藏*/
  text-overflow: ellipsis; /* 超出内容显示为省略号*/
  white-space: nowrap; /*文本不进行换行*/
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
.baseline {
  font-size: 30rpx;
  color: #666;
}
</style>
