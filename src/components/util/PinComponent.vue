<template>
    <v-main>
        <div
            class="d-flex justify-space-around align-center primary"
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
                        @click="confirm()"
                        :disabled="!pinValid"
                        :dark="pinValid" color="primary">
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
    name: 'pin',
    data () {
        return {
            enteredPin: null
        }
    },
    methods: {
        confirm () {
            cookieService.setPin(true)
            this.$store.commit('setPin', true)
        }
    },
    computed: {
        pinValid () {
            for (let i = 0; i < this.$store.state.flatmates.length; i++) {
                if (this.$store.state.flatmates[i].name === this.$store.state.user && this.$store.state.flatmates[i].pin === this.enteredPin) {
                    return true
                }
            }
            return false
        }
    }
}
</script>

<style>

</style>