import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'
import vuetify from './plugins/vuetify'
import i18n from '@/internationalization'
import FlagIcon from 'vue-flag-icon'
import cookieService from '@/services/cookies'
import { setSubscription, askForPermission } from '@/services/notifications'

Vue.use(FlagIcon)


Vue.config.productionTip = false

new Vue({
  store,
  i18n,
  vuetify,

  /**
   * Read user and locale from cookies,
   * Determine network connection
   * Request notifications permission
   * Subscribe to notifications
   */
  beforeCreate () {
    askForPermission()
    setSubscription()
    let user = cookieService.getUser()
    if (user) store.commit('login', user)
    let locale = cookieService.getLocale()
    if (locale) {
      store.commit('setLocale', locale)
      i18n.locale = locale
    }
    if (navigator.onLine) {
      store.commit('setOnline', true)
    } else {
      store.commit('setOnline', false)
    }
    /**
     * bind firestore data to vuex store
     */
    store.dispatch('bindFirestore')
  },
  render: h => h(App)
}).$mount('#app')
