<template>
  <v-card class="ma-2">
    <v-card-text>
      <p class="text-h4 text--primary">
        {{ formatDate() }}
      </p>
      <p class="text-h5 text--primary">
        {{ laundry.category  + ', ' + laundry.temperature + ', '}}
        <v-icon :color="laundryReady? 'green' : 'red'">
          {{ laundryReady? 'mdi-check': 'mdi-cancel'}}
        </v-icon>
        {{ laundryReady? $t('ready') : $t('notReady') }}
      </p>
      <div class="text-center text--primary ma-2">
        {{ $t('plannedLaundry.plannedBy', {mate: laundry.plannedBy}) }}
      </div>
      <div class="d-flex flex-wrap">
      <v-chip
        v-for="(participant, index) in laundry.participants" :key="index"
        :color="(laundry.loaded.find(l => participant == l))?'primary' : ''"
        class="ma-1">
        {{ participant }}
      </v-chip>
      <v-chip
        v-if="laundry.participants.find(l => $store.state.user == l) && !laundry.loaded.find(l => l == $store.state.user)"
        @click="loadLaundry()"
        outlined link color="primary" class="ma-1">
        <v-icon>mdi-check</v-icon>
        {{ $t('plannedLaundry.loaded') }}
      </v-chip>
      <v-chip
        v-if="!laundry.participants.find(l => $store.state.user == l) && !laundry.full"
        @click="participate()"
        outlined link class="ma-1" color="primary">
        <v-icon>mdi-plus</v-icon>
        <span>{{ $t('plannedLaundry.participate') }}</span>
      </v-chip>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        @click="startLaundry()"
        dark color="primary">
        {{ $t('plannedLaundry.start') }}
      </v-btn>
      <v-btn
        v-if="!laundry.full"
        @click="fillLaundry()"
        dark color="secondary">
        {{ $t('plannedLaundry.full') }}
      </v-btn>
      <v-btn
        @click="deleteLaundry()"
        dark color="red">
        {{ $t('delete') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { transactions } from '@/plugins/vuefire'

export default {
    name: 'planned-laundry-component',
    props: ['laundry'],
    /**
     * compute if laundry is full or every participant is loaded
     */
    computed: {
      laundryReady () {
        return [].concat(this.laundry.participants).sort().join(',') === [].concat(this.laundry.loaded).sort().join(',') || this.laundry.full
      }
    },
    /**
     * update firebase
     */
    methods: {
      startLaundry () {
        transactions.startLaundry(this.laundry)
      },
      fillLaundry () {
        transactions.fillLaundry(this.laundry)
      },
      participate () {
        this.laundry.participants.push(this.$store.state.user)
        transactions.updateParticipants(this.laundry)
      },
      loadLaundry () {
        this.laundry.loaded.push(this.$store.state.user)
        transactions.updateLoaded(this.laundry)
      },
      deleteLaundry () {
        transactions.deleteLaundry(this.laundry)
      },
      /**
       * format date
       */
      formatDate () {
        let d = this.laundry.planned.toDate()
        let options = {  year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }
        return d.toLocaleString('de-DE', options) + ' ' + this.$t('oClock')
      }
    }

}
</script>

<style>

</style>