// [02:32.868]彼此许下了心愿\n => [{ time: ms, text: 彼此许下了心愿}]

const timeReg = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

export function parseLyric(lyricStr) {

  const lyricInfos = []

  const lyricLines = lyricStr.split("\n")

  for (const lineString of lyricLines) {
    // 1. 正则匹配出时间
    const results = timeReg.exec(lineString) // [02:32.868]
    if (!results) continue // 有些空行，匹配不到时间，跳过继续
    // 1.1 时间转为毫秒
    const minute = results[1] * 60 * 1000
    const second = results[2] * 1000
    const mSecond = results[3].length === 2 ? results[3] * 10: results[3] * 1
    const time = minute + second + mSecond

    // 2. 将时间替换成空字符串得到歌词
    const text = lineString.replace(timeReg, "")

    // 3. 拼成歌词对象
    lyricInfos.push({ time, text })
  }
  
  return lyricInfos
}