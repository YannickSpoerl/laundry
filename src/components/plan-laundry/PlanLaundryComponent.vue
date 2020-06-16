<template>
  <div class="d-flex flex-wrap">
    <div class="col-12 col-md-6 col-lg-4 col-xl-3 text-center">
      <new-laundry
        v-if="newLaundry"
        @create="createNewLaundry"
        @cancel="newLaundry = false"/>
      <v-btn
      width="80%"
      class="ma-4"
      height="80%"
        v-if="!newLaundry"
        @click="newLaundry = true"
        outlined
        color="primary">
        <v-icon primary>mdi-plus</v-icon>
        <span>{{ $t('planLaundry.newLaundry') }}</span>
      </v-btn>
    </div>
    <div
      v-for="(laundry, index) in laundries"
      :key="index"
      class="col-12 col-md-6 col-lg-4 col-xl-3">
      <planned-laundry
        :laundry="laundry"
        @start="startLaundry(laundry)"
        @load="loadLaundry(laundry)"
        @participate="participate(laundry)"
        @full="fillLaundry(laundry)"
        @delete="deleteLaundry(laundry)"/>
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
      createNewLaundry (laundry) {
        transactions.addLaundry(laundry)
        this.newLaundry = false
      },
      deleteLaundry (laundry) {
        transactions.deleteLaundry(laundry)
      },
      fillLaundry (laundry) {
        transactions.fillLaundry(laundry)
      },
      startLaundry (laundry) {
        transactions.startLaundry(laundry)
      },
      participate (laundry) {
        laundry.participants.push(this.$store.state.laundryUser)
        transactions.participate(laundry, laundry.participants)
      },
      loadLaundry (laundry) {
        laundry.loaded.push(this.$store.state.laundryUser)
        transactions.load(laundry, laundry.loaded)
      }
    }
}
</script>

<style>

</style>