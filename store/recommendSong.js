import { HYEventStore } from "hy-event-store";
import { getRecommendSongReq } from "../services/music"

const recommendSong = new HYEventStore({
  state: {
    recommendSongList: []
  },
  actions: {
    // 获取推荐歌曲
    async getRecommendSong(ctx) {
      const res = await getRecommendSongReq(3778678);
      ctx.recommendSongList = res.playlist.tracks;
      // this.setData({songList: res.playlist.tracks.slice(0, 6)})
    },
  }
})

export default recommendSong;