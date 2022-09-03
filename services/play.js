import {ddRequest} from "./index"

// 请求歌曲详情
export function getSongItemDetailReq(ids) {
  return ddRequest.get({
    url: "/song/detail",
    data: {
      ids
    }
  })
}

// 请求歌词
export function getSongLyricReq(id) {
  return ddRequest.get({
    url: "/lyric",
    data: {
      id
    }
  })
}