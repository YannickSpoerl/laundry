import config from '@/app.config.json'

const prefix = config.cookiePrefix

export default {
    setUser: function (user) {
        localStorage.setItem(prefix +  '-user', user)
    },
    getUser: function () {
        return localStorage.getItem(prefix + '-user')
    },
    getLanguage: function () {
        return localStorage.getItem(prefix + '-locale')
    },
    setLanguage: function (locale) {
        localStorage.setItem(prefix + '-locale', locale)
    },
    getPin: function () {
        return localStorage.getItem(prefix + '-pin')
    },
    setPin: function (pin) {
        localStorage.setItem(prefix + '-pin', pin)
    }
} 