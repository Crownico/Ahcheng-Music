import { getMusicBannerReq, getRecommendSongReq } from "../../services/music"
import {querySelect} from "../../utils/element-computed"

Page({

  data: {
    musicBannerList: [],
    songList: []
  },
  onLoad(options) {
    // 1. 获取轮播banner图
    this.getMusicBanner();
    // 2. 获取推荐歌曲
    this.getRecommendSong(19723756)
  },
  async getMusicBanner() {
    const res = await getMusicBannerReq();
    this.setData({musicBannerList: res.banners})
  },

  // 点击搜索框跳转
  onSearchClick(){
    wx.navigateTo({
      url: "/pages/details-search/details-search",
    })
  },
  onBannerClick(event) {
    const url = event.currentTarget.dataset.url
  },
  // 修改轮播图指示点位置，获取图片渲染高度设为轮播组件高度
  onBannerImageLoad(event) {
    // querySelect(".banner-image")
    // .then(res => {
    //   this.setData({ bannerHeight: res[0].height })
    // })
  },
  // 点击更多
  onMoreClick() {
    wx.navigateTo({
      url: "/pages/song-list/song-list"
    })
  },
  // 推荐歌曲
  async getRecommendSong(id) {
    const res = await getRecommendSongReq(id);
    this.setData({songList: res.playlist.tracks.slice(0, 6)})
  },
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})