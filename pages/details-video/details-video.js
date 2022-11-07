import { getMVInfoReq, getMVUrlRequest, getRelatedMVReq } from "../../services/video";

// pages/details-video/details-video.js
Page({
  data: {
    id: "",
    mvUrl: "",
    mvInfo: {},
    relatedMV: []
  },
  onLoad(options) {
    this.data.id = options.id
    // 1. 获取 mv 播放地址
    this.getMVUrl(this.data.id)
    // 2. 获取 mv 详细信息
    this.getMVInfo(this.data.id)
    // 3. 获取关联 mv
    this.getRelatedMV(this.data.id)
    wx.setNavigationBarTitle({
      title: '视频详情',
    })
  },
  async getMVUrl(id) {
    const res = await getMVUrlRequest(id);
    this.setData({mvUrl: res.data.url});
  },
  async getMVInfo(id) {
    const res = await getMVInfoReq(id);
    this.setData({mvInfo: res.data});
  },
  async getRelatedMV(id) {
    const res = await getRelatedMVReq(id);
    const newRelatedMV = [...this.data.relatedMV, ...res.data]
    this.setData({relatedMV: res.data});
  },
  // 触底刷新
  onReachBottom() {
    // this.getRelatedMV(this.data.id)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.getRelatedMV(this.data.id)
  },
  // 点击推荐视频
  onClickRecMV(event) {
    // const id = event.currentTarget.dataset.id;
    // wx.navigateTo({
    //   url: `/pages/details-video/details-video?id=${id}`,
    // })
    wx.showToast({
      title: '接口炸啦!',
      icon: 'none',
      mask: true,
      duration: 2000
    })
  }
})