import { getMusicBannerReq, getRecommendSongReq, getSongMenuListReq } from "../../services/music"
import {querySelect} from "../../utils/element-computed"
import recommendSong  from "../../store/recommendSong";
import rankSong from "../../store/rankSong";
import playList from "../../store/playList";

Page({
  data: {
    musicBannerList: [],
    songList: [],
    songMenuData: [],
    songMenuHotData: [],
    rankSongObj: {
      newRanking: {},
      originRanking: {},
      upRanking:{}
    }
  },
  onLoad(options) {
    // 1. 获取轮播banner图
    this.getMusicBanner();

    // 2. 获取推荐歌曲
    //  2.1 监听全局状态管理中的数据变化
    recommendSong.onState("recommendSongList", (value) => {
      this.setData({songList: value.slice(0, 4)})
    });
    //  2.2 发送actions
    recommendSong.dispatch("getRecommendSong")

    // 3. 请求推荐歌单
    this.getRecSongMenuList("流行")

    // 4. 获取排行榜歌曲
    this.getRankSong()
  },
  async getMusicBanner() {
    const res = await getMusicBannerReq();
    this.setData({musicBannerList: res.banners})
  },
  async getRecSongMenuList(cat) {
    // 热门歌单
    const res1 = await getSongMenuListReq();
    this.setData({songMenuData: res1.playlists.slice(0, 6)})
    // 推荐歌单
    const res2 = await getSongMenuListReq(cat);
    this.setData({songMenuHotData: res2.playlists.slice(0, 6)})
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
      url: "/pages/song-list/song-list?type=recommendSong"
    })
  },
  onMoreMenuClick() {
    wx.navigateTo({
      url: '/pages/details-menu/details-menu',
    })
  },
  // 获取排行榜歌曲
  getRankSong() {
    // 1. 监听全局管理的榜单数据
    rankSong.onState("newRanking", (value) => {
      this.setData({"rankSongObj.newRanking": value})
    })  
    rankSong.onState("originRanking", (value) => {
      this.setData({"rankSongObj.originRanking": value})
    })  
    rankSong.onState("upRanking", (value) => {
      this.setData({"rankSongObj.upRanking": value})
    })  
    // 2. 调用 action 发送请求
    rankSong.dispatch("getRankSong")
  },
  // 点击巅峰榜
  onClickRank(event) {
    const type = event.currentTarget.dataset.index;
    // console.log(type);
    wx.navigateTo({
      url: `/pages/song-list/song-list?type=${type}`,
    })
  },
  // 点击推荐歌曲 
  onClickSongItem(event) {
    const id = event.currentTarget.dataset.id;
    // 1. 跳转到播放页
    wx.navigateTo({
      url: `/pages/music-player/music-player?id=${id}`,
    })
    // 2. 将歌曲所在的列表数据添加到播放列表中
    playList.setState("currentPlayList", this.data.songList)
 
    // 3. 保存当前播放索引
    const currentPlayIndex = event.currentTarget.dataset.currentPlayIndex;
    playList.setState("currentPlayIndex", currentPlayIndex)
  }
})