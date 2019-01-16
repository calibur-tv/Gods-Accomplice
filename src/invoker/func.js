export default {
  log(obj) {
    const container = document.body
    const el = document.createElement('div')
    el.innerHTML = container.children.length + ':<br/>' + JSON.stringify(obj)
    container.insertBefore(el, container.children[0])
    return obj
  },

  channel({ func, params }) {
    M.channel.$emit(`app-invoker-${func}`, params)
  },

  createMainComment(data) {
    M.channel.$emit('create-main-comment', data)
  },

  createSubComment(data) {
    M.channel.$emit('create-sub-comment', data)
  },

  updateUserInfo(user) {
    M.channel.$emit('user-info-updated', user)
  },

  getEditorContent() {
    M.channel.$emit('get-editor-content')
  }
}
