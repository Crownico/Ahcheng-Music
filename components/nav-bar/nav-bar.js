// components/nav-bar/nav-bar.js

const app = getApp()

Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多 slot 支持
  },
  properties: {
   
  },
  data: {
    statusHeight: 0
  },
  methods: {
    navigateBack() {
      wx.navigateBack({
        delta: 1
      })
    }
  },
  lifetimes: {
    attached() {
      this.setData({statusHeight: app.globalData.statusHeight})
    }
  }
})
