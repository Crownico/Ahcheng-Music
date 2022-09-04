import { HYEventStore } from "hy-event-store";
// import { getRecommendSongReq } from "../services/music"

const playList = new HYEventStore({
  state: {
    currentPlayIndex: 0,
    currentPlayList: []
  },
  actions: {
  }
})

export default playList;