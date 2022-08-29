// components/section-header/section-header.js
Component({
  properties: {
    title: {
      type: String,
      default: "默认标题"
    },
    isShow: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onMoreClick() {
      this.triggerEvent("onMoreClick")
    }
  }
})
