const prefix = 'laundry'

export default {
    setUser: function (user) {
        localStorage.setItem(prefix + '-user', user)
    },
    getUser: function () {
        return localStorage.getItem(prefix + '-user')
    },
    getLanguage: function () {
        return localStorage.getItem(prefix + '-locale')
    },
    setLanguage: function (locale) {
        localStorage.setItem(prefix + '-locale', locale)
    }
} 