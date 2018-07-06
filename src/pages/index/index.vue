<template>
  <div class="container" @click="clickHandle('aaa', $event)">

    <!-- <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div> -->

    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>
    <p class="counter">豆瓣视频列表</p>
    <scroll-view scroll-y="true" style="height: 100%" lower-threshold="300" bindscrolltolower="scrollHandler">
      <view class="list-item" v-for="item in movies" v-bind:key="item" v-show="movies.length">
        <view class="movie-item" bindtap="gotoDetail" >
          <!-- <image class="poster" mode="widthFix" lazy-load="true" v-bind:src="item.poster" /> -->
          <image class="poster" mode="widthFix" lazy-load="true" src="/static/1.png" />
          <view class="title">
            <text class="title">{{item.title}}
              <p class="rate">{{item.rate}}</p>
            </text>
          </view>
          <view class="year-type">
            <text>{{item.types}} / {{item.year}}</text>
          </view>
        </view>
      </view>

      <!-- <view class="loading" wx:if="{{loading}}">
        <image src="/assets/loading/loading-bars.svg" model="widthFix">
      </view> -->
    </scroll-view>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data() {
    return {
      motto: 'mpvue试玩！',
      userInfo: {
        nickName: '美团mpVue'
      },
      movies: []
    }
  },

  components: {
    card
  },

  methods: {
    bindViewTap() {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    clickHandle(msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

  created() {
    // 获取视频列表视频
    wx.request({
      url: 'https://www.newfq.com/doubanapi/v0/movie/list', //仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res)=>{
        this.movies = res.data.data
        console.log('视频列表数据', res.data.data)
        console.log('this',this)
      }
    })
  }
}
</script>

<style scoped>
page {
  height: 100%;
}


.title{
  width:100%;
  display: block;
 overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
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

.loading image {
  width: 100%;
  height: 100%;
}
</style>
