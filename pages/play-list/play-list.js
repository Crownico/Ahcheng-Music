import playList from "../../store/playList"

// pages/play-list/play-list.js
Page({

  data: {
    currentPlayIndex: 9999,
    currentPlayList: []
  },
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '播放列表',
    })
    playList.onState("currentPlayIndex", value => this.setData({currentPlayIndex: value}))
    playList.onState("currentPlayList", value => this.setData({currentPlayList: value}))
  },
  onUnload() {
    playList.offState("currentPlayIndex", value => this.setData({currentPlayIndex: value}))
    playList.offState("currentPlayList", value => this.setData({currentPlayList: value}))
    this.data.currentPlayIndex = 9999;
  },
})