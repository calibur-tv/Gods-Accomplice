import Vue from 'vue'
import * as Sentry from '@sentry/browser'

export default class {
  constructor({ appName, appVersion }) {
    this.appName = appName
    this.appVersion = appVersion
    return this.init()
  }

  init() {
    try {
      Sentry.init({
        dsn: 'https://4957d5bf437b4e6391d8daf7ef972475@sentry.io/1352472',
        release: `${this.appName}-${this.appVersion}`,
        environment: process.env.NODE_ENV,
        shouldSendCallback(data) {
          let shouldSend = true
          try {
            const exception = data.exception.values[0]
            shouldSend = exception.stacktrace.frames.length > 1
          } catch (e) {
            shouldSend = false
          }
          return shouldSend
        },
        ignoreErrors: [
          'Uncaught TypeError: value.hasOwnProperty is not a function'
        ],
        integrations: [new Sentry.Integrations.Vue({ Vue })]
      })
      return Sentry
    } catch (e) {
      // do nothing
    }
  }
}
