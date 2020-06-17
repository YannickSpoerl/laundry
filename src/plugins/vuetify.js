import Vue from 'vue';
import Vuetify from 'vuetify/lib'
import config from '@/app.config.json'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: config.primaryColor
            }
        }
    }
})
