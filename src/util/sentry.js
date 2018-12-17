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
        integrations: [new Sentry.Integrations.Vue({ Vue })]
      })
      return Sentry
    } catch (e) {
      // do nothing
    }
  }
}
