/* eslint-disable */
import invokerInterface from './invokerInterface'

export default class extends invokerInterface {
  getDeviceInfo(callback) {
    this.JsCallApp('getDeviceInfo', {}, callback)
  }

  toWebview(page, params) {
    this.JsCallApp('toWebview', { page, params })
  }

  getUserInfo(callback) {
    this.JsCallApp('getUserInfo', {}, callback)
    callback({
      avatar: 'https://image.calibur.tv/user/1/avatar/0/1530281203832-e6c.jpeg',
      banner: 'https://image.calibur.tv/user/1/banner/0/1530281125317-y03.jpeg',
      birthSecret: true,
      birthday: '1994-08-06 00:08:00',
      coin: 152,
      coin_from_sign: 45,
      daySign: true,
      exp: {
        have_exp: 455,
        level: 19,
        next_level_exp: 551
      },
      faker: false,
      id: 1,
      is_admin: true,
      nickname: '冰淤',
      notification: '2',
      power: 1177,
      providers: {
        bind_qq: true,
        bind_wechat: true
      },
      roles: ['审核后台快速通道', '幕后主使者'],
      sex: 1,
      sexSecret: false,
      signature: '天下漫友是一家',
      uptoken: {
        expiredAt: 1544625432,
        upToken:
          'liU4ohXRsbaSB4uQyR5lij97IsP7YT7NcyC2CND7:tPWPrx9p5Bxnys3AqnurnF38uV4=:eyJlbmRVc2VyIjoiMSIsInJldHVybkJvZHkiOiJ7XG4gICAgICAgICAgICAgICAgXCJjb2RlXCI6IDAsXG4gICAgICAgICAgICAgICAgXCJkYXRhXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjogJChpbWFnZUluZm8uaGVpZ2h0KSxcbiAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiAkKGltYWdlSW5mby53aWR0aCksXG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcIiQobWltZVR5cGUpXCIsXG4gICAgICAgICAgICAgICAgICAgIFwic2l6ZVwiOiAkKGZzaXplKSxcbiAgICAgICAgICAgICAgICAgICAgXCJ1cmxcIjogXCIkKGtleSlcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0iLCJtaW1lTGltaXQiOiJpbWFnZVwvanBlZztpbWFnZVwvcG5nO2ltYWdlXC9qcGc7aW1hZ2VcL2dpZiIsInNjb3BlIjoiY2xhbm5hZGVyIiwiZGVhZGxpbmUiOjE1NDQ2MjU0MzJ9'
      },
      zone: 'bing-yu'
    })
  }

  setUserInfo(data) {
    this.JsCallApp('setUserInfo', data)
    M.user = data
  }

  toNative(page, params) {
    this.JsCallApp('toNative', { page, params })
  }

  previewImages({ images, index }) {
    this.JsCallApp('previewImages', { images, index })
  }

  toggleClick({ type, model, id, result }) {
    this.JsCallApp('toggleClick', { type, model, id, result })
  }

  createMainComment({ model_type, model_id }) {
    this.JsCallApp('createMainComment', { model_type, model_id })
  }

  readNotification({ count }) {
    this.JsCallApp('readNotification', { count })
  }

  JsCallApp(func, params, callback) {
    console.log(func, params, callback)
  }

  appCallJs(jsonObj) {
    let paramsObj
    try {
      paramsObj = JSON.parse(jsonObj)
    } catch (e) {
      paramsObj = {}
    }

    const func = paramsObj.func
    const params = paramsObj.params || {}
    const callbackId = paramsObj.callbackId
    const jsFunction = this.jsFuncs[func]

    if (!jsFunction || typeof jsFunction !== 'function') {
      return
    }

    const data = jsFunction.call(this, params)
    console.log(func, params, callbackId, data)
  }
}
