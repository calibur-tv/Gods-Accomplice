import { Toast, Indicator } from 'mint-ui'

const timeout = (duration = 0) =>
  new Promise(resolve => {
    setTimeout(resolve, duration)
  })

const showTime = 1500

class Message {
  success(tip) {
    this.stop()
    let text = ''
    let time
    if (typeof tip === 'object') {
      text = tip.tip
      time = tip.time || showTime
    } else {
      text = tip
      time = showTime
    }
    Toast({
      duration: time,
      message: text || '操作成功',
      iconClass: 'iconfont ic-alert-success'
    })
    return timeout(time)
  }

  info(tip) {
    this.stop()
    let text = ''
    let time
    if (typeof tip === 'object') {
      text = tip.tip
      time = tip.time || showTime
    } else {
      text = tip
      time = showTime
    }
    if (!text) {
      return
    }
    Toast({
      duration: time,
      message: text
    })
    return timeout(time)
  }

  error(tip) {
    this.stop()
    let text = ''
    let time
    if (typeof tip === 'object') {
      text = tip.tip
      time = tip.time || showTime
    } else {
      text = tip
      time = showTime
    }
    Toast({
      duration: time,
      message: text || '操作失败',
      iconClass: 'iconfont ic-alert-error'
    })
    return timeout(time)
  }

  loading(tip) {
    this.stop()
    let message = ''
    let time
    if (typeof tip === 'object') {
      message = tip.tip
      time = tip.time
    } else {
      message = tip
    }
    Indicator.open({
      text: message || '加载中...',
      spinnerType: 'snake'
    })
    if (time) {
      return timeout(time).then(() => this.stop())
    }
  }

  stop() {
    Indicator.close()
  }
}

export default new Message()
