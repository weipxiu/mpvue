/**
 * 使用promise对wx.request进行封装
 * @param {String} url 请求地址
 * @param {Object} data 参数对象
 * @param {String} method 请求类别（GET POST 等等）
 */
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
      header: { "Content-Type": "json" },
      success: (res)=>{
        let data = res.data.subjects;
        let movies = [];
        //为了更完美的布局，将数据分割为两两一组
        for (let i = 0; i < data.length; i += 4) {
          movies.push([
            data[i],
            data[i + 1] ? data[i + 1] : data[i - 1],
            data[i + 2] ? data[i + 2] : data[i - 2],
            data[i + 3] ? data[i + 3] : data[i - 3],
          ]);
        }
        resolve(movies);
        wx.hideToast();
        wx.hideNavigationBarLoading(); //完成停止加载
        wx.stopPullDownRefresh(); //停止下拉刷新
      },
      error: (res)=>{
        reject('网络出错');
      }
    });
  });
}

export default req