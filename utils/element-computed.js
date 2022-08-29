// 获取 widthFix 下图片渲染计算后的高度
// tips: 想要获取函数的参数函数内返回的内容，用 promise。回调函数内部 resolve 传递出结果
export default function querySelect(selector) {
  return new Promise(resolve => {
    const query = wx.createSelectorQuery()
    query.select(selector).boundingClientRect()
    query.exec((res) => {
      resolve(res)
    })
  })
}