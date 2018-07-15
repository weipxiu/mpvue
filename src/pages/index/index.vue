<template>
  <!-- <h1 class="counter">小程序</h1> -->
  <div class="content">
    <!-- <div @click="increment">{{countNumber}}+首页</div>
    <div @click="increment">{{count}}+首页</div> -->
    <div class="swiper_cnetent" v-show="movies.length">
      <swiper :indicator-dots="true" :interval="3000" indicator-color="rgba(0, 0, 0, .8)" indicator-active-color="#ffffff" :autoplay="true" :duration="duration">
        <div v-for="(item,index) in imgUrls" :key="index">
          <swiper-item>
            <image :src="item" class="slide-image" mode="aspectFill" />
          </swiper-item>
        </div>
      </swiper>
    </div>
    <h2 class="h2_title" v-show="movies.length">豆瓣电影新片榜</h2>
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

    <div class="loading" v-show="loading">
      <img src="/static/loading-bars.svg">
    </div>

  </div>
</template>

<script>
import store from "@/store";
import card from "@/components/card";
import Api from "@/api";

export default {
  data() {
    return {
      movies: [],
      storList: [],
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
    increment() {
      store.commit('increment', 5);
    },
    decrement() {
      store.commit('decrement');
    },
    clickHandle(msg, ev) {
      console.log("clickHandle:", msg, ev);
    },
    loadMovies() {
      this.loading = true;

      //获取视频列表视频
      Api.indexMovieList({
        page: this.page,
        size: this.size
      }).then((res) => {

        this.movies = this.movies.concat(res);
        this.loading = false;

        
        console.log('返回数据', res)
      })
    },
    gotoDetail(item) {
      const { id, title, images, rating, genres, year } = item
      let obj = {
        id,
        title,
        images: images.small,
        average: rating.average,
        genres,
        year
      };
      this.storList.push(obj)
      wx.setStorageSync('storList', this.storList)
      console.log(images)
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
  computed: {
    countNumber() {
      return store.state.count;
    },
    count() {
      return store.getters.count;
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
