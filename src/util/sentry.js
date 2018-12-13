import Vue from 'vue'
import * as Sentry from '@sentry/browser'

Sentry.init({
  dsn: 'https://4957d5bf437b4e6391d8daf7ef972475@sentry.io/1352472',
  integrations: [new Sentry.Integrations.Vue({ Vue })]
})
