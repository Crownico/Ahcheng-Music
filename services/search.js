import {ddRequest} from "./index"

// 热门搜索
export function getHotRearchReq() {
  return ddRequest.get({
    url: "/search/hot"
  })
}

// 搜索建议
export function getSearchSuggestionReq(inputValue) {
  return ddRequest.get({
    url: "/search/suggest",
    data: {
      keywords: inputValue,
      type: "mobile"
    }
  })
}
// 搜索结果
export function getSearchresultReq(inputValue, limit = 30, offset = 0) {
  return ddRequest.get({
    url: "/search",
    data: {
      keywords: inputValue,
      offset,
      limit
    }
  })
}