<template>
    <v-main>
        <div
            class="d-flex justify-space-around align-center primary"
            style="height: 100%">
            <div class="col-12 col-md-6 text-center">
                <v-card>
                    <v-card-text>
                        <p class="display-1 text--primary">
                            {{ $t('login.title', { name: (selectedMate) ? selectedMate + '!': '...'}) }}
                        </p>
                        <div class="d-flex flex-wrap">
                            <v-btn
                                color="primary"
                                v-for="(mate, index) in flatmates"
                                @click="selectMate(mate.name)"
                                :key="index"
                                :outlined="mate.name == selectedMate && !newUser"
                                class="col-5 col-md-3 ma-3">
                                {{ mate.name }}
                            </v-btn>
                            <v-text-field
                                v-if="newUser"
                                v-model="selectedMate"
                                :rules="[stringValid, nameValid]"
                                :label="$t('login.namePlaceholder')"
                                class="col-5 col-md-3 ma-3"/>
                            <v-btn
                                v-if="!newUser"
                                @click="newUser = true"
                                color="primary"
                                outlined
                                class="col-7 col-md-3 ma-3">
                                <v-icon>mdi-plus</v-icon>
                                {{ $t('login.addUser') }}
                            </v-btn>
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                            @click="confirm(selectedMate)"
                            :disabled="!userValid"
                            dark
                            color="primary">
                            {{ $t('continue') }}
                        </v-btn>
                        <v-btn
                            @click="cancelNewUser()"
                            :disabled="!selectedMate"
                            dark
                            color="secondary">
                            {{ $t('cancel') }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </div>
    </v-main>
</template>

<script>
import { vuefire, transactions } from '@/plugins/vuefire'
import cookieService from '@/services/cookies'

export default {
    name: 'login',
    data () {
        return {
            newUser: false,
            selectedMate: null,
            flatmates: []
        }
    },
    methods: {
        cancelNewUser () {
            this.newUser = false
            this.selectedMate = null
        },
        selectMate (mate) {
            this.selectedMate = mate
            this.newUser = false
        },
        confirm (mate) {
            cookieService.setUser(mate)
            this.$store.commit('login', mate)
            if (this.newUser) transactions.addUser(mate)
        },
        stringValid (string) {
            if (!string) return this.$t('login.errMssg1')
            if (string.replace(/\s/g, '').length > 0) return true
            return this.$t('login.errMssg1')
        },
        nameValid (string) {
            if (!string) return this.$t('login.errMssg1')
            if (this.flatmates.find((m) => m.name.toLowerCase().replace(/\s/g, '') == string.toLowerCase().replace(/\s/g, ''))) return this.$t('login.errMssg2')
            return true
        }
    },
    computed: {
        userValid () {
            if (this.newUser) {
                return (this.nameValid(this.selectedMate) == true && this.stringValid(this.selectedMate) == true)
            }
            return this.selectedMate !== null
        }
    },
    firestore: {
        flatmates: vuefire.collection('flatmates')
    }
}
</script>

<style>

</style>