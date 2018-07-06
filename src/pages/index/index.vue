<template>
  <!-- <h1 class="counter">小程序</h1> -->
  <scroll-view :scroll-y="true" style="height:100%" :lower-threshold="300" @bindscrolltolower="scrollHandler" @bindscrolltoupper="scrollUpHandle">
    <div class="list-item" v-for="(item,index) in movies" v-bind:key="index" v-show="movies.length">
      <div class="movie-item" v-for="(itemData, itemIndex) in item" v-bind:key="itemIndex">
        <!-- <image class="poster" mode="widthFix" lazy-load="true" src="{{item.poster}}" /> -->
        <image class="poster" mode="widthFix" lazy-load="true" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530865925286&di=20a4ec51aacb431098c0030b10a27a09&imgtype=0&src=http%3A%2F%2Fbaiducdn.pig66.com%2Fuploadfile%2F2017%2F0321%2F20170321060144174.jpg" />
        <div class="title">
          <text>{{itemData.title}}
            <text class="rate">{{itemData.rate}}</text>
          </text>
        </div>
        <div class="year-type">
          <text>{{itemData.types}} / {{itemData.year}}</text>
        </div>
      </div>
    </div>

    <div class="loading">
      <img src="/static/loading-bars.svg">
    </div>
  </scroll-view>
</template>

<script>
import card from '@/components/card'

export default {
  data() {
    return {
      movies: [],
      page: 1,
      size: 6,
      loading: true
    }
  },

  components: {
    card
  },

  methods: {
    clickHandle(msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    loadMovies() {
      var that = this;
      this.loading = true
      wx.request({
        url: `https://www.newfq.com/doubanapi/v0/movie/list?page=${that.page}&size=${that.size}`,
        success: (res) => {
          const { data } = res.data
          const movies = this.movies || []

          for (let i = 0; i < data.length; i += 2) {
            movies.push([data[i], data[i + 1] ? data[i + 1] : null])
          }
          this.movies = movies
          this.loading = false
          console.log(movies)
        }
      })
    },

    scrollHandler() {
      console.log('546464')
      const { page } = this.data
      this.setData({
        page: page + 1
      })
      this.loadMovies()
    },
    scrollUpHandle() {
      console.log('下拉')
      const { page } = this.data
      this.setData({
        page: page + 1
      })
      this.loadMovies()
    }

  },

  created() {
    // 获取视频列表视频
    this.loadMovies()
    wx.showNavigationBarLoading(); //在标题栏中显示加载

    //wx.hideNavigationBarLoading(); //完成停止加载
    //wx.stopPullDownRefresh(); //停止下拉刷新
  }
}
</script>

<style scoped>
.counter {
  font-size: 38rpx;
  color: #333;
  text-align: center;
  margin: 45rpx 0;
}
page {
  height: 100%;
}
.list-item {
  overflow: hidden;
}
.title {
  width: 100%;
  display: block;
}
.movie-item {
  width: 48%;
  margin: 1%;
  float: left;
}

.movie-item .poster {
  width: 100%;
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
