import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    laundryUser: null,
    locale: null
  },
  mutations: {
    login (state, user) {
      state.laundryUser = user
    },
    setLocale (state, locale) {
      state.locale = locale
    }
  },
  actions: {
  },
  modules: {
  }
})
