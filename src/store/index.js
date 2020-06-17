import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    locale: null,
    pin: false,
    online: null
  },
  mutations: {
    login (state, user) {
      state.user = user
    },
    setLocale (state, locale) {
      state.locale = locale
    },
    pinEntered (state, pin) {
      state.pin = pin
    },
    setOnline (state, bool) {
      state.online = bool
    }
  },
  actions: {
  },
  modules: {
  }
})
