import {ddRequest} from "./index"
// 请求轮播图
export function getMusicBannerReq(type = 1) {
  return ddRequest.get({
    url: "/banner",
    data: {
      type: type
    }
  })
}

// 请求推荐歌曲
export function getRecommendSongReq(id) {
  return ddRequest.get({
    url: "/playlist/detail",
    data: {
      id
    }
  })
}

// 请求推荐歌单（全品类）
export function getSongMenuListReq(cat = "全部", limit = 6, offset = 0) {
  return ddRequest.get({
    url: "/top/playlist",
    data: {
      cat,
      limit,
      offset
    }
  })
}

// 请求歌单类别
export function getSongMenuTagReq() {
  return ddRequest.get({
    url: "/playlist/hot"
  })
}