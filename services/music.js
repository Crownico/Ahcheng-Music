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