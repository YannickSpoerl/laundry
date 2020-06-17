<template>
    <v-main>
        <div
            class="d-flex justify-space-around align-center"
            style="height: 100%">
            <div class="col-12 col-md-6 text-center">
                <v-card>
                    <v-card-text>
                    <p class="display-1">
                        {{ $t('pin.title', { mate: $store.state.user}) }}
                    </p>
                    <div class="d-flex flex-wrap text-center">
                        <v-text-field
                            v-model="enteredPin"
                            class="col-58 ma-3"
                            label="PIN"
                        ></v-text-field>
                    </div>
                    </v-card-text>
                    <v-card-actions>
                    <v-btn
                        dark
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
import { vuefire } from '@/plugins/vuefire'

export default {
    name: 'pin',
    data () {
        return {
            flatmates: [],
            enteredPin: null,
        }
    },
    mounted () {
        console.log(this.flatmates.find((mate) => mate.name === this.$store.state.user))
        if (this.$store.state.pin) {
            console.log(this.flatmates.find((mate) => mate.name === this.$store.state.user))
        }
    },
    methods: {
        confirm () {
            cookieService.setLanguage(this.selectedLanguage)
            this.$store.commit('setLocale', this.selectedLanguage)
        }
    },
    firestore: {
        flatmates: vuefire.collection('flatmates')
    }
}
</script>

<style>

</style>