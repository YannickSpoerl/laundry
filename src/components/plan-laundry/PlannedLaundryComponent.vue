<template>
  <v-card class="ma-2">
    <v-card-text>
      <p class="text-h4 text--primary">
        {{ formatDate(laundry.planned) }}
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
        v-for="(participant, index) in laundry.participants"
        :key="index"
        :color="(laundry.loaded.find(l => participant == l))?'primary' : ''"
        class="ma-1">
        {{ participant }}
      </v-chip>
      <v-chip
        v-if="laundry.participants.find(l => $store.state.user == l) && !laundry.loaded.find(l => l == $store.state.user)"
        @click="$emit('load')"
        outlined
        link
        color="primary"
        class="ma-1">
        <v-icon>mdi-check</v-icon>
        {{ $t('plannedLaundry.loaded') }}
      </v-chip>
      <v-chip
        v-if="!laundry.participants.find(l => $store.state.user == l) && !laundry.full"
        @click="$emit('participate')"
        color="primary"
        outlined
        link
        class="ma-1">
        <v-icon>mdi-plus</v-icon>
        <span>{{ $t('plannedLaundry.participate') }}</span>
      </v-chip>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        @click="$emit('start')"
        dark
        color="primary">
        {{ $t('plannedLaundry.start') }}
      </v-btn>
      <v-btn
        v-if="!laundry.full"
        @click="$emit('full')"
        dark
        color="secondary">
        {{ $t('plannedLaundry.full') }}
      </v-btn>
      <v-btn
        @click="$emit('delete')"
        dark
        color="red">
        {{ $t('delete') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    name: 'planned-laundry-component',
    props: ['laundry'],
    computed: {
      laundryReady () {
        return [].concat(this.laundry.participants).sort().join(',') === [].concat(this.laundry.loaded).sort().join(',') || this.laundry.full
      }
    },
    methods: {
      formatDate (date) {
        let d = date.toDate()
        let options = {  year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }
        return d.toLocaleString('de-DE', options) + ' ' + this.$t('oClock')
      }
    }

}
</script>

<style>

</style>