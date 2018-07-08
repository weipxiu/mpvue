<template>
  <div class="container">
    <video style="width: 100%;" :src="movie.video" />
    <div class="movie-content">
      <div class="title">
        <p>{{movie.title}}</p>
      </div>
      <div class="type">
        <p>{{movie.rate}}分 / {{movie.types}}</p>
      </div>
      <div class="pubdate">
        上映时间: {{movie.pubdate}} ({{movie.country}})
      </div>
      <div class="summary">
        电影简介：
        <p>{{movie.summary}}</p>
      </div>

      <div class="tags">
        <p v-for="(item,index) in movie.tags" :key="index">{{item}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import card from "@/components/card";
// import Config from '/config'

export default {
  data() {
    return {
      movie: "",
      id: "",
      page: 1,
      size: 6,
      loading: true,
      windowHeight: 0,
      type: "爱情",
      baselineShow: false
    };
  },
  components: {
    card
  },
  methods: {
    clickHandle(msg, ev) {
      console.log("clickHandle:", msg, ev);
    },
    loadMovies(id) {
      let that = this;
      this.loading = true;
      wx.showToast({
        title: "加载中",
        icon: "loading",
        duration: 2000
      });
      wx.request({
        url: `https://www.newfq.com/doubanapi/v0/movie/detail/${id}`,
        success: res => {
          if (!res.data.lenght) {
            let movie = res.data.data;
            this.movie = movie;
            // wx.hideLoading();

            wx.hideToast();
            wx.hideNavigationBarLoading(); //完成停止加载
            wx.stopPullDownRefresh(); //停止下拉刷新
          }
        }
      });
    }
  },

  created() {
    wx.getSystemInfo({
      success: res => {
        this.windowHeight = res.windowHeight;
      }
    });
  },
  onLoad(opt) {
    // 获取视频详情信息
    this.loadMovies(opt.id);
  }
};
</script>

<style scoped>
.movie-content {
  padding: 20rpx 25rpx;
}

.movie-content view {
  margin: 30rpx 0;
}

.title {
  font-size: 50rpx;
  font-weight: bold;
}

.pubdate {
  font-size: 28rpx;
  color: #777;
}

.type {
  font-size: 28rpx;
  color: #777;
}

.summary {
  font-size: 30rpx;
  color: #555;
  line-height: 1.5em;
}

.tags {
  margin-top: 60rpx;
  overflow: hidden;
}
.tags ._p {
  padding: 10rpx 12rpx;
  border: 1px solid #ccc;
  text-align: center;
  border-radius: 2px;
  margin: 10rpx;
  font-size: 26rpx;
  color: #444;
  float: left;
}
</style>
