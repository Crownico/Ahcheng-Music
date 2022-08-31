// components/section-songMenu/section-songMenu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    songMenu: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: "歌单"
    }
  },
  data: {

  },
  methods: {
    onMoreClick() {
      this.triggerEvent("moreMenuClick")
    },
    // 点击歌单卡片
    onClickSongMenu(event) {
      const id = event.currentTarget.dataset.songMenuId;
      wx.navigateTo({
        url: `/pages/song-list/song-list?songMenuId=${id}`,
      })
    }
  }
})
