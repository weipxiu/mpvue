<template>
  <div class="container">
    <div class="user-info">
      <img class="avatar" :src="avatarUrl?avatarUrl:'/static/infoImg.png'">
      <p class="name">{{nickName}}</p>
    </div>

    <div class="share" @click="gotoShare">
      <p>分享小程序</p>
      <img src="/static/more.png" mode="aspectFit">
    </div>

    <div class="history" @click="gotoHistory">
      <p>观看历史</p>
      <img src="/static/more.png" mode="aspectFit">
    </div>

    <div class="history-list" v-if="movies.length">

      <div class="movie-item" v-for="(item, index) in movies" :key="index" @click="gotoDetail">
        <image class="poster" mode="widthFix" lazy-load="true" :src="item.poster" />
        <div class="title">
          <p>{{item.title}}
            <span class="rate">{{item.rate}}</span>
          </p>
        </div>
        <div class="year-type">
          <p>{{item.types}} / {{item.year}}</p>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  data: {
    avatarUrl: "",
    nickName: "你可能还没授权，又或者我被玩坏了！",
    movies: []
  },
  methods: {
    gotoHistory() {
      wx.navigateTo({
        url: "./idetail/main"
      });
    },

    gotoShare() {
      wx.navigateTo({
        url: "../share/share"
      });
    },

    gotoDetail(e) {
      const { movieData } = e.currentTarget.dataset;
      const { _id } = movieData;

      wx.navigateTo({
        url: "../movie-detail/detail?id=" + _id
      });
    }
  },
  onLoad(options) {
    wx.getUserInfo({
      success: res => {
        console.log(res.userInfo)
        (this.avatarUrl = res.userInfo.avatarUrl),
          (this.nickName = res.userInfo.nickName);
      }
    });
  },

  onShow() {
    let history = wx.getStorageSync("history");

    if (history) {
      this.movies = history.slice(0, 2);
    }
  }
};
</script>

<style scoped>
page {
  height: 100%;
  background-color: #eee;
}
.user-info {
  padding: 40rpx 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  margin-bottom: 20rpx;
  width: 100%;
}

.avatar {
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
  margin-bottom: 20rpx;
  border: 1px solid #eee;
}

.name {
  font-size: 30rpx;
  text-align: center;
}

.history,
.share {
  background-color: #fff;
  font-size: 30rpx;
  margin-bottom: 20rpx;
  position: relative;
  width: 100%;
  display: block;
}
.share view,
.history view {
  padding: 40rpx 30rpx;
}
.history image,
.share image {
  position: absolute;
  width: 40rpx;
  height: 40rpx;
  right: 20rpx;
  top: 50%;
  transform: translateY(-50%);
}

.history-list {
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  padding: 20rpx;
  background-color: #fff;
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
</style>

