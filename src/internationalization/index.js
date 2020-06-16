import Vue from 'vue'
import VueI18n from 'vue-i18n'
import german from './de'
import english from './en'

Vue.use(VueI18n)

const messages = {
  'en': english,
  'de': german
}

const i18n = new VueI18n({
  locale: 'de',
  fallbackLocale: 'en',
  messages})

export default i18n