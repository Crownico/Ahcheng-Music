import { checkMusicReq } from "../../services/music";
import playList from "../../store/playList";

// components/song-list-item/song-list-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData: {
      type: Array,
      default: []
    },
    currentPlayIndex: {
      type: Number,
      default: 9999
    }
  },
  data: {
  },
  methods: {
    async onClickSongItem(event) {
      const id = event.currentTarget.dataset.id;
      // 0. 判断版权
      const res = await checkMusicReq(id);
      if(res.success) {
          // 1. 跳转到播放页
        wx.navigateTo({
          url: `/pages/music-player/music-player?id=${id}`,
        })
        // 2. 保存当前播放索引
        const currentPlayIndex = event.currentTarget.dataset.currentPlayIndex;
        playList.setState("currentPlayIndex", currentPlayIndex)
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000
        })
      }
    }
  }
})
