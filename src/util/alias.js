export default {
  index() {
    M.invoker.toNative('index')
  },

  user(zone) {
    M.invoker.toNative('user', { zone })
  },

  bangumi(bangumi_id) {
    M.invoker.toNative('bangumi', { bangumi_id })
  },

  post(poster_id) {
    M.invoker.toNative('post', { poster_id })
  },

  image(image_id) {
    M.invoker.toNative('image', { image_id })
  },

  review(id) {
    M.invoker.toNative('review', { id })
  },

  comment({ model, model_id, comment_id, reply_id }) {
    M.invoker.toNative('comment', {
      model,
      comment_id,
      model_id: model_id || 0,
      reply_id: reply_id || 0
    })
  },

  home() {
    M.invoker.toNative('home')
  },

  notice() {
    M.invoker.toNative('notice')
  },

  bookmark() {
    M.invoker.toNative('bookmark')
  },

  transaction() {
    M.invoker.toNative('transaction')
  },

  notification() {
    M.invoker.toNative('notification')
  }
}
