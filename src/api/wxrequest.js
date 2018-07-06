function req(url, data, method = 'GET') {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 2000
    });
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: data,
        method: method,
        success: function(res) {
          let d = res.data;
          // 后台返回jsonp格式的字符串，前端做一次转化处理。（回调方法默认null）
          if (typeof d === 'string' && /^null.+/.test(d)) {
            d = d.substring(5, d.length - 1);
            resolve(JSON.parse(d));
          } else {
            d = typeof d === 'string' ? JSON.parse(d) : d;
            resolve(d);
          }
          wx.hideToast();
        },
        error: function(res) {
          reject('网络出错');
        }
      });
    });
  }
  
  module.exports = {
    req
  };