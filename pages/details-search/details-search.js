import { debounce, throttle } from "underscore"
import { getHotRearchReq, getSearchresultReq, getSearchSuggestionReq } from "../../services/search"
import playList from "../../store/playList"

// pages/details-search/details-search.js
Page({
  data: {
    hotSearch: [],
    inputValue: "",
    searchSuggestion: [],
    searchResult: [],

    isShow: false,
  },
  onLoad(options) {
    // 0. 获取热门搜索结果
    this.getHotRearch()

  },
  async getHotRearch() {
    const res = await getHotRearchReq()
    this.setData({hotSearch: res.result.hots})
  },
  // 防抖获取输入结果
  onInputHandle: debounce(function (event) {
   this.setData({inputValue: event.detail, isShow: true, searchResult: []})
   this.getSearchSuggestion(event.detail)
  }, 200),
  // 搜索建议
  async getSearchSuggestion(keyword) {
    const res = await getSearchSuggestionReq(keyword)
    const allMatch = res?.result?.allMatch
    const searchSuggestion = allMatch !== undefined ? allMatch : []
    this.setData({searchSuggestion})
  },
  // 监听点击获取关键字进行搜索
  onClickSearch(event) {
    const keyword = event.currentTarget.dataset.keyword;
    this.setData({inputValue: keyword})
    this.getSearchResult(keyword)
  },
  // 请求搜索结果
  async getSearchResult(keyword) {
    const res = await getSearchresultReq(keyword)
    this.setData({searchResult: res.result.songs})
  },
  // 监听点击搜索结果列表
  onClickSongList() {
    playList.setState("currentPlayList", this.data.searchResult)
  },
  onUnload() {
    this.data.isShow = false;
    this.data.inputValue = "";
    this.data.searchResult = []
  }
})