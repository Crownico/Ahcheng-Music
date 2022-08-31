import { HYEventStore } from "hy-event-store";
import { getRecommendSongReq } from "../services/music"

// 榜单id 
export const rankIdMap = {
  newRanking: 3779629,
  originRanking: 2884035,
  upRanking: 19723756
}

const rankSong = new HYEventStore({
  state: {
    newRanking: [],
    originRanking: [],
    upRanking:[]
  },
  actions: {
    // 获取排行榜歌曲
    async getRankSong(ctx) {
      // 取出id一个一个发送请求，并存入对应的 state 中
      for (const key in rankIdMap) {
        const res = await getRecommendSongReq(rankIdMap[key]);
        ctx[key] = res.playlist;
      }
    },
  }
})

export default rankSong;