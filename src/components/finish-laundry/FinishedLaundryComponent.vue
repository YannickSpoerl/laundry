<template>
    <v-card class="ma">
        <v-card-text>
            <p class="text-h4 text--primary">
                {{ formatDate(laundry.planned) }}
            </p>
            <p class="text-h5 text--primary">
                {{ laundry.category  + ', ' + laundry.temperature + ', '}}
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
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'finished-laundry',
    props: ['laundry'],
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