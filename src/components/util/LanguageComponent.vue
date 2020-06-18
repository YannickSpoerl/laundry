<template>
    <v-main>
        <div class="d-flex justify-space-around align-center primary"
             style="height: 100%">
            <div class="col-12 col-md-6 text-center">
                <v-card>
                    <v-card-text>
                        <p class="display-1 text--primary">
                            {{ $t('language.title', { language: (selectedLocale) ? $t('language.' + selectedLocale) + '!': '...'}) }}
                        </p>
                        <div class="d-flex flex-wrap">
                            <v-btn
                                v-for="(locale, index) in $i18n.availableLocales" :key="index"
                                @click="selectLocale(locale)"
                                color="primary" class="col-5 col-md-3 ma-3">
                                <flag :iso="flagMapping[locale]"/>
                                {{ $t('language.' + locale) }}
                            </v-btn>
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                            @click="confirm()"
                            :disabled="!selectedLocale"
                            dark color="primary">
                            {{ $t('continue') }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </div>
    </v-main>
</template>

<script>
import cookieService from '@/services/cookies'

export default {
    name: 'language',
    data () {
        return {
            selectedLocale: null,
            /**
             * map flags to locale
             */
            flagMapping: {
                de: 'de',
                en: 'gb'
            }
        }
    },
    methods: {
        /**
         * select locale for i18n
         */
        selectLocale (locale) {
            this.$i18n.locale = locale
            this.selectedLocale = locale
        },
        /**
         * set locale to cookies and state
         */
        confirm () {
            cookieService.setLocale(this.selectedLocale)
            this.$store.commit('setLocale', this.selectedLocale)
        }
    }
}
</script>

<style>

</style>