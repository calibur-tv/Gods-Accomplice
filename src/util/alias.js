export default {
  index() {
    M.invoker.toNative('index')
  },

  user(zone) {
    M.invoker.toNative('user', { zone })
  },

  bangumi(id) {
    M.invoker.toNative('bangumi', { id })
  },

  post(id) {
    M.invoker.toWebview('post', { id })
  },

  image(id) {
    M.invoker.toWebview('image', { id })
  },

  review(id) {
    M.invoker.toWebview('review', { id })
  },

  comment({ model, model_id, comment_id, reply_id }) {
    M.invoker.toWebview('comment', {
      model,
      model_id,
      comment_id,
      reply_id
    })
  },

  home() {
    M.invoker.toWebview('home')
  },

  notice() {
    M.invoker.toWebview('notice')
  },

  bookmarks() {
    M.invoker.toWebview('bookmarks')
  },

  transactions() {
    M.invoker.toWebview('transactions')
  },

  notifications() {
    M.invoker.toWebview('notifications')
  }
}
