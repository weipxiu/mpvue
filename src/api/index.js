const WxRequest = require('./wxrequest.js');
const Config = require('@/config/index.js');

//获取首页新片榜列表
function indexMovieList({ page, size }) {
  return WxRequest.req(Config.isMegPush, {
    page: page || '1',
    size: size || '0'
  }).then(res => {
    return res;
  });
}

module.exports = {
    indexMovieList
};
