<template>
  <div class="d-flex flex-wrap primary">
    <v-card elevation="24" width="100%" class="white ma-2 pa-4">
      <span class="text-h5">
        {{ $t('planLaundry.title') }}
      </span>
    </v-card>
    <div class="col-12 col-md-6 col-lg-4 col-xl-3 text-center" style="margin: 16px">
      <new-laundry
        v-if="newLaundry"
        @create="createNewLaundry" @cancel="newLaundry = false"
        style="margin: 8px"/>
      <v-btn
        v-if="!newLaundry"
        @click="newLaundry = true"
        outlined color="white" width="80%" height="80%" class="ma-4">
        <v-icon primary>mdi-plus</v-icon>
        <span>{{ $t('planLaundry.newLaundry') }}</span>
      </v-btn>
    </div>
    <div
      v-for="(laundry, index) in laundries" :key="index"
      style="margin: 8px" class="col-12 col-md-6 col-lg-4 col-xl-3">
      <planned-laundry :laundry="laundry"/>
    </div>
  </div>
</template>

<script>
import { transactions } from '@/plugins/vuefire'
import PlannedLaundry from '@/components/plan-laundry/PlannedLaundryComponent'
import NewLaundry from '@/components/plan-laundry/NewLaundryComponent'

export default {
    name: 'plan-laundry',
    components: {
      PlannedLaundry,
      NewLaundry
    },
    props: ['laundries'],
    data () {
      return {
        newLaundry: false
      }
    },
    methods: {
      /**
       * close new laundry form, add laundry to firestore
       */
      createNewLaundry (laundry) {
        transactions.addLaundry(laundry)
        this.newLaundry = false
      }
    }
}
</script>

<style>

</style>