export default {
  log(obj) {
    const container = document.body
    const el = document.createElement('div')
    el.innerHTML = container.children.length + ':<br/>' + JSON.stringify(obj)
    container.insertBefore(el, container.children[0])
    return obj
  }
}
