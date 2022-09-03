import { getSongItemDetailReq, getSongLyricReq } from "../../services/play";
import { throttle } from "underscore";
import { parseLyric } from "../../utils/parse-lyric";

const app = getApp()
// 播放器上下文
const audioContext = wx.createInnerAudioContext()

Page({
  data: {
    currentPage: 0,
    contentHeight: 0,

    currentSong: {},
    songLyric: [],
    currentLyricIndex: 0,
    lyricScrollTop: 0, // 歌词滚动的位置，距离顶部的距离

    currentTime: 0,
    duration: 0,
    playPercent: 0,

    isSlider: false, // 自动播放在控制进度条，拖动播放时也在控制进度条，起冲突导致反复横跳
    isWaiting: true, // 跳转播放后延迟监听进度更新
    isPlayOrPause: true
  },
  onLoad(options) {
    // 0. 获取内容高度
    this.setData({contentHeight: app.globalData.contentHeight})
    const songItemId = options.id;
    // 1. 请求歌曲详细信息
    this.getSongDetail(songItemId)
    // 2. 请求歌曲的歌词
    this.getSongLyric(songItemId)
    
    // 3. 播放
    audioContext.src = `https://music.163.com/song/media/outer/url?id=${songItemId}.mp3`
    // audioContext.autoplay = true
    // audioContext.onCanplay(() => {audioContext.play()})
    setTimeout(() => {audioContext.play()}, 800)
    // 3.1 自动播放进度控制
    this.playProcessControl(audioContext)
  },
  async getSongDetail(ids) {
    const res = await getSongItemDetailReq(ids)
    this.setData({currentSong: res.songs[0]})

    // 获取歌曲总时长
    this.setData({duration: res.songs[0].dt})
  },
  async getSongLyric(id) {
    const res = await getSongLyricReq(id)
    this.setData({songLyric: parseLyric(res.lrc.lyric)})
  },
  // 自动播放进度控制
  playProcessControl(audioContext) {

      const throttleOnProcessUpdata =  throttle(this.onProcessUpdate, 300, { 
        leading: false,
        trailing: false  });
      // 获取自动播放的进度时间
      audioContext.onTimeUpdate(() => {
        // 1. 更新进度条
        if(!this.data.isSlider && this.data.isWaiting) {
          throttleOnProcessUpdata()
        }
        
        // 2. 更新歌词（进度时间小于某个歌词时间，则展示上一句歌词）
        const lrc = this.data.songLyric
       
        const currentindex = lrc.findIndex((item) => {
          return item.time > audioContext.currentTime * 1000
        })
        if(audioContext.currentTime * 1000 > lrc[lrc.length - 1].time) {
          this.setData({currentLyricIndex: lrc.length - 1})
        } else {
          this.setData({currentLyricIndex: currentindex - 1})
        }

        // 3. 歌词滚动（索引 x 歌词条高度）
        this.setData({lyricScrollTop: this.data.currentLyricIndex * 32})
      })

       // 解决跳转播放事件中断进度监听事件的 bug
       audioContext.onWaiting(() => {audioContext.pause()}) // 缓存时手动暂停播放
       audioContext.onCanplay(() => {audioContext.play()}) // 缓存完毕手动播放
  },
  onProcessUpdate() {
    const currentTime =  audioContext.currentTime
    // console.log(currentTime);

    // 自动播放根据时长自动控制滑块进度（百分比）
    const percent = (currentTime * 1000) / this.data.duration * 100
    this.setData({playPercent: percent, currentTime: currentTime * 1000})
  },
  // 监听滑块拖动的过程
  onSliderChanging(event) {
    // 拖动滑块时，撤销自动播放对进度条的控制，防止拖动反复横跳
    this.data.isSlider = true
    // 拖动时的百分比计算出歌曲时刻
    const sliderPercent = event.detail.value
    const sliderTime = (sliderPercent / 100) * this.data.duration
    // 播放歌曲时刻带动下方时间变化
    this.setData({currentTime: sliderTime})
  },
  // 监听滑块拖动后的结果
  onSliderChanged(event) {
    // console.log("点击了滑块");
    // audioContext.offTimeUpdate()
    // 延迟
    this.data.isWaiting = false
    setTimeout(() => {this.data.isWaiting = true}, 1500)
    // 拖动结束后从当前位置播放
    const sliderPercent = event.detail.value
    // audioContext.currentTime 是只读的，不能这样赋值
    // audioContext.currentTime = (sliderPercent / 100) * this.data.duration
    const sliderToPlayOfTime = (sliderPercent / 100) * this.data.duration
    audioContext.seek(sliderToPlayOfTime / 1000) // seek 方法单位为 秒
    this.setData({currentTime: sliderToPlayOfTime})
    this.data.isSlider = false
  },
  // 点击播放或暂停
  onPauseOrPlay() {
    if(this.data.isPlayOrPause) { 
      audioContext.pause()
    } else {
      audioContext.play()
    }
    this.setData({isPlayOrPause: !this.data.isPlayOrPause})
  },
  




  // 获取轮播图的当前页
  onPageChange(event) {
    this.setData({currentPage: event.detail.current})
  }
})