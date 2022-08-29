import {ddRequest} from "./index"

// 获取视频列表
export function getVideoList(offset = 0, limit = 20) {
  return ddRequest.get({
    url: "/top/mv",
    data: {
      limit: limit,
      offset: offset
    }
  })
}
// 获取mv播放地址
export function getMVUrlRequest(id) {
  return ddRequest.get({
    url: `/mv/url?id=${id}`
  })
}
// 获取mv详细信息
export function getMVInfoReq(id) {
  return ddRequest.get({
    url: "/mv/detail",
    data: {
      mvid: id
    }
  })
}
// 获取关联推荐视频
export function getRelatedMVReq(id) {
  return ddRequest.get({
    url: "/related/allvideo",
    data: {
      id: id
    }
  })
}