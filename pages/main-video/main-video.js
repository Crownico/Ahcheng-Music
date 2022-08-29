// pages/main-video/main-video.js
import { getVideoList } from "../../services/video"
Page({
  data: {
    videoList: [],
    offset: 0,
    hasMore: true
  },
  onLoad() {
    this.getTopMV()
  },
  // 请求视频列表的方法
  async getTopMV() {
    // 1. 请求数据
    const res = await getVideoList(this.data.offset)
    // 2. 将本次请求数据追加到 videoList 中
    const newVideoList = [...this.data.videoList, ...res.data]
    // 3. 更新 videoList 数据，并发送到页面展示
    this.setData({videoList: newVideoList})
    // 4. 更新请求偏移量，为下次请求做准备
    this.data.offset = this.data.videoList.length;
    // 5. 更新请求数据上限的标识符
    this.data.hasMore = res.hasMore;
  },
  // 滑动到底部自动请求数据
  onReachBottom() {
    // 判断是否可以继续加载
    if(this.data.hasMore) {
      this.getTopMV()
    }
  },
  // 下拉刷新
  async onPullDownRefresh() {
     // 1.清空之前的数据
     this.setData({ videoList: [] })
     this.data.offset = Math.floor(Math.random() * 5 + 3)
     this.data.hasMore = true
 
     // 2.重新请求新的数据
     await this.getTopMV()
 
     // 3.停止下拉刷新
     wx.stopPullDownRefresh()
  }
})

