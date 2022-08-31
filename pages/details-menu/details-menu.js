import { getSongMenuListReq, getSongMenuTagReq } from "../../services/music";

// pages/details-menu/details-menu.js
Page({
  data: {
    songMenuAllCategory: []
  },
  onLoad(options) {
    this.getSongMenuAllCategory()
  },

  async getSongMenuAllCategory() {
    // 1. 获取歌单类别
    const res = await getSongMenuTagReq();
    // 2. 根据类别发送请求获取歌单
    //  2.1 promise 数组保存每个类别请求返回的 promise
    const allPromise = []
    for (const item of res.tags) {
      const promise = getSongMenuListReq(item.name)
      allPromise.push(promise)
    }
    //  2.2 获取 promise 数组中的所有 promise 结果
    const songMenu = await Promise.all(allPromise)
    // 将 setData 放在循环外部等所有请求结果完毕了，才setData。提高了性能
    this.setData({songMenuAllCategory: songMenu})
  },
  // 点击歌单卡片
  onClickSongMenu(event) {
    const id = event.currentTarget.dataset.songMenuId;
    wx.navigateTo({
      url: `/pages/song-list/song-list?songMenuId=${id}`,
    })
  }
})