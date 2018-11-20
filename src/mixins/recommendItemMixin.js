export default {
  computed: {
    itemData() {
      return this.item.item
    },
    monObject() {
      return this.item.mon
    },
    itemImage() {
      return `url(${this.itemData.list_image})`
    }
  },
  methods: {
    handleClick() {
      // 埋点
      M.invoker.callApp('Note.Instance.ItemClick', { mon: this.monObject })
      // 跳转
      const url = `/p/${this.itemData.slug}`
      M.invoker.callApp('Core.Global.Transfer', {
        url,
        from: '文章页相关推荐'
      })
    }
  }
}
