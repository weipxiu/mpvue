import WxRequest from "@/api/wxrequest.js";
import Config from "@/config";

//电影新片榜
function indexMovieList({ start, count }) {
  return WxRequest(Config.doubanNewfq, {
    start: start || '0',
    count: count || '0'
  }).then(res => {
    return res;
  });
}

//正在上映的电影
function nowPlayingList({ start, count }) {
  return WxRequest(Config.nowPlaying, {
    start: start || '0',
    count: count || '0'
  }).then(res => {
    return res;
  });
}

export default {
  indexMovieList,
  nowPlayingList
}

