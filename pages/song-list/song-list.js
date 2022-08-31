// pages/song-list/song-list.js
import recommendSong from "../../store/recommendSong";
import rankSong from "../../store/rankSong"
import { getRecommendSongReq } from "../../services/music";

Page({
  data: {
    songsList: [],
    newRanking: [],
    originRanking: [],
    upRanking: [],
    songMenu: {}
  },
  onLoad(options) {
    // 展示榜单歌曲列表
    const {type} = options;
    switch (type) {
      case "recommendSong":
        this.getSongsListFromRecSong()
        break;
      case "newRanking":
        console.log(type);
        this.getSongsListFromNewRanking()
        break;
      case "originRanking":
        this.getSongsListFromOriginRanking()
        console.log(type);
        break;
      case "upRanking":
        this.getSongsListFromUpRanking()
        console.log(type);
        break;
      default:
        break;
    }
    // 展示歌单歌曲列表
    if (options.songMenuId) {
      this.getSongsListFromSongMenu(options.songMenuId)
    }
    
  },
  onUnload() {
    // 退出页面时取消对全局数据的监听
    recommendSong.offState("recommendSongList", (value) => {
      this.setData({songsList: value})
    }),
    rankSong.offState("newRanking", (value) => {
      this.setData({newRanking: value.tracks})
    }),
    rankSong.offState("originRanking", (value) => {
      this.setData({originRanking: value.tracks})
    }),
    rankSong.offState("upRanking", (value) => {
      this.setData({upRanking: value.tracks})
    })
  },
  getSongsListFromRecSong() {
    wx.setNavigationBarTitle({
      title: '推荐歌曲',
    })
    // 监听全局中所有的推荐歌曲
    recommendSong.onState("recommendSongList", (value) => {
      this.setData({songsList: value})
    })
  },
  getSongsListFromNewRanking() {
    wx.setNavigationBarTitle({
      title: '新歌榜',
    })
    rankSong.onState("newRanking", (value) => {
      this.setData({newRanking: value.tracks})
    })
  },
  getSongsListFromOriginRanking() {
    wx.setNavigationBarTitle({
      title: '原创榜',
    })
    rankSong.onState("originRanking", (value) => {
      this.setData({originRanking: value.tracks})
    })
  },
  getSongsListFromUpRanking() {
    wx.setNavigationBarTitle({
      title: '飙升榜',
    })
    rankSong.onState("upRanking", (value) => {
      this.setData({upRanking: value.tracks})
    })
  },
  async getSongsListFromSongMenu(id) {
    const res = await getRecommendSongReq(id);
    this.setData({songMenu: res.playlist})
  }

  
})