<template>
    <v-main>
        <div
            class="d-flex justify-space-around align-center"
            style="height: 100%">
            <div class="col-12 col-md-6 text-center">
                <v-card>
                    <v-card-text>
                    <div>{{ $t('language.subtitle') }}</div>
                    <p class="display-1 text--primary">
                        {{ $t('language.title', { language: (selectedLanguage) ? $t('language.' + selectedLanguage) + '!': '...'}) }}
                    </p>
                    <div class="d-flex flex-wrap">
                        <v-btn
                            v-for="(locale, index) in $i18n.availableLocales"
                            :key="index"
                            @click="selectLocale(locale)"
                            color="primary"
                            class="col-5 col-md-3 ma-3">
                            <flag :iso="flagMapping[locale]"/>
                            {{ $t('language.' + locale) }}
                        </v-btn>
                    </div>
                    </v-card-text>
                    <v-card-actions>
                    <v-btn
                        @click="confirm()"
                        dark
                        :disabled="!selectedLanguage"
                        color="primary">
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
    name: 'login',
    data () {
        return {
            selectedLanguage: null,
            flagMapping: {
                de: 'de',
                en: 'gb'
            }
        }
    },
    methods: {
        selectLocale (locale) {
            this.$i18n.locale = locale
            this.selectedLanguage = locale
        },
        confirm () {
            cookieService.setLanguage(this.selectedLanguage)
            this.$store.commit('setLocale', this.selectedLanguage)
        }
    }
}
</script>

<style>

</style>