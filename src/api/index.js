import WxRequest from "@/api/wxrequest.js";
import Config from "@/config";

//获取首页新片榜列表
function indexMovieList({ page, size }) {
  return WxRequest(Config.doubanNewfq, {
    page: page || '1',
    size: size || '0'
  }).then(res => {
    return res;
  });
}

export default {
  indexMovieList
}

