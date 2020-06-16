<template>
  <v-card class="ma">
        <v-card-text>
        <p class="text-h4">
            {{ formatDate(laundry.planned) }}
        </p>
        <p class="text-h5">
            {{ laundry.category  + ', ' + laundry.temperature + ', '}}
          <v-icon :color="laundryReady? 'green' : 'red'">{{ laundryReady? 'mdi-check': 'mdi-cancel'}}</v-icon>
          {{ laundryReady? $t('ready') : $t('notReady') }}
        </p>
        <div class="text-center ma-2">{{ $t('plannedLaundry.plannedBy', {mate: laundry.plannedBy}) }}</div>
        <div class="d-flex flex-wrap">
            <v-chip
                :color="(laundry.loaded.find(l => participant == l))?'primary' : ''"
                class="ma-1"
                v-for="(participant, index) in laundry.participants"
                :key="index">
                {{ participant }}
            </v-chip>
            <v-chip
                color="primary"
                outlined
                @click="$emit('load')"
                class="ma-1"
                link
                v-if="laundry.participants.find(l => $store.state.laundryUser == l) && !laundry.loaded.find(l => l == $store.state.laundryUser)">
                <v-icon>mdi-check</v-icon>
                {{ $t('plannedLaundry.loaded') }}
            </v-chip>
            <v-chip
                v-if="!laundry.participants.find(l => $store.state.laundryUser == l) && !laundry.full"
                link
                @click="$emit('participate')"
                color="primary"
                outlined
                class="ma-1">
                <v-icon>mdi-plus</v-icon>
                <span>{{ $t('plannedLaundry.participate') }}</span>
            </v-chip>
        </div>
        </v-card-text>
        <v-card-actions>
        <v-btn
            dark
            @click="$emit('start')"
            color="primary">
            {{ $t('plannedLaundry.start') }}
        </v-btn>
        <v-btn
            dark
            @click="$emit('full')"
            v-if="!laundry.full"
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