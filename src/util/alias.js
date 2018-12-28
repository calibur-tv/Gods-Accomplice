export default {
  index() {
    M.invoker.toNative('index')
  },

  open(url) {
    M.invoker.toNative('browser', { url: `https://m.calibur.tv/app/${url}` })
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

  review(cid) {
    M.invoker.toNative('review', { cid })
  },

  role(role_id) {
    M.invoker.toNative('role', { role_id })
  },

  video(video_id) {
    M.invoker.toNative('video', { video_id })
  },

  comment({ type, comment_id, reply_id }) {
    M.invoker.toNative('comment', {
      type,
      comment_id,
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
    M.invoker.toNative('bookmarks')
  },

  transaction() {
    M.invoker.toNative('transactions')
  },

  notification() {
    M.invoker.toNative('notifications')
  }
}
