// 封装成类 -> 实例
// class DDRequest {
//   constructor(baseURL) {
//     this.baseURL = baseURL
//   }
//   request(options) {
//     const { url } = options
//     return new Promise((resolve, reject) => {
//       wx.request({
//         ...options,
//         // realIP: "116.25.146.177",
//         url: this.baseURL + url,
//         success: (res) => {
//           resolve(res.data)
//         },
//         fail: (err) => {
//           console.log("err:", err);
//         }
//       })
//     })
//   }
//   get(options) {
//     return this.request({ ...options, method: "get" })
//   }
//   post(options) {
//     return this.request({ ...options, method: "post" })
//   }
// }

import { defaults, reject } from "underscore"

// // export const ddRequest = new DDRequest("http://codercba.com:9002")
// export const ddRequest = new DDRequest("https://netease-cloud-music-api-swart-seven.vercel.app:80")

// 云托管调用的封装
class DDRequest {

  get(options) {
    const { url } = options
    const { data } = options
     return new Promise((resolve, reject) =>{ 
       wx.cloud.callContainer({
        "config": {
          "env": "prod-8gl02zwh02580672"
        },
        "path": url,
        "header": {
          "X-WX-SERVICE": "musicapi",
          "content-type": "application/json"
        },
        "method": "GET",
        "data": data
      }).then((res) => {
        resolve(res.data)
      })    
    })
  }
}

export const ddRequest = new DDRequest()