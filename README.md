# Douban电影预告 = mpVue + 原生小程序 + ES6

域名: https://douban.uieee.com

## 获取电影列表：

接口: /v2/movie/new_movies

示例: https://douban.uieee.com/v2/movie/new_movies?page=1&size=6

请求方式: get
参数
 - base: 是否获取缩略信息默认false(例如列表页可以使用缩略信息)
 - page: 获取某页，必须和size一起使用
 - size: 指定每页有多少条，必须和page一起使用
 - type: 指定要获取某一类电影
 - year: 指定要获取某个年份的电影


## 获取某个电影的详情

接口: /detail/:id

示例: https://douban.uieee.com/v2/movie/subject/26647117

其中 id 是 数据中的 id

完整字段：

```
{
  "types": [
      "剧情",
      "奇幻",
      "冒险"
  ],
  "_id": "5ab3925bc87d18388fe49fe4",
  "movieId": "1929463",
  "title": "少年派的奇幻漂流 / 少年Pi的奇幻漂流",
  "rate": 9,
  "pubdate": "2012-09-28",
  "raw_title": "Life of Pi",
  "summary": "...",
  "tags": [
    "奇幻",
    "人性",
    "冒险",
    "美国",
    "3D",
    "人生",
    "剧情",
    "文艺"
  ],
  "year": "2012",
  "cover": "http://douban.newfq.com/s~A9YOi0crBSjLSJreQXK",
  "poster": "http://douban.newfq.com/qdZOLbw6wcQ5Tlkh_7tMG?imageMogr2/thumbnail/x1680/crop/1080x1600",
  "video": "http://douban.newfq.com/O0g2ET4RaJUe4ZuSb0qTd"
}
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8081
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
