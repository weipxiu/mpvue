// function formatNumber (n) {
//   const str = n.toString()
//   return str[1] ? str : `0${str}`
// }

// export function formatTime (date) {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()

//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()

//   const t1 = [year, month, day].map(formatNumber).join('/')
//   const t2 = [hour, minute, second].map(formatNumber).join(':')

//   return `${t1} ${t2}`
// }

//观看历史
function watHistory (item){
  const { id, title, images, rating, genres, year } = item
  let obj = {
    id,
    title,
    images: images.small,
    average: rating.average,
    genres,
    year
  };
  let storList = []
  storList.push(obj)
  if(!wx.getStorageSync('storList')){
    wx.setStorageSync('storList',[])
  }
  wx.setStorageSync('storList', wx.getStorageSync('storList').concat(storList))
  wx.navigateTo({
    url: "/pages/index/idetail/main?id=" + id
  });
}
export default {
  watHistory
}
