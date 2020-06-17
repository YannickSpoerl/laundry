<template>
  <div class="d-flex flex-wrap primary">
    <v-card
      elevation="24"
      width="100%"
      class="white ma-2 pa-4">
      <span class="text-h5">
        {{ $t('planLaundry.title') }}
      </span>
    </v-card>
    <div class="col-12 col-md-6 col-lg-4 col-xl-3 text-center" style="margin: 16px">
      <new-laundry
        v-if="newLaundry"
        @create="createNewLaundry"
        @cancel="newLaundry = false"
        style="margin: 8px"/>
      <v-btn
        v-if="!newLaundry"
        @click="newLaundry = true"
        outlined
        color="white"
        width="80%"
        height="80%">
        <v-icon primary>mdi-plus</v-icon>
        <span>{{ $t('planLaundry.newLaundry') }}</span>
      </v-btn>
    </div>
    <div
      v-for="(laundry, index) in laundries"
      :key="index"
      style="margin: 8px"
      class="col-12 col-md-6 col-lg-4 col-xl-3">
      <planned-laundry
        @start="startLaundry(laundry)"
        @load="loadLaundry(laundry)"
        @participate="participate(laundry)"
        @full="fillLaundry(laundry)"
        @delete="deleteLaundry(laundry)"
        :laundry="laundry"/>
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
        laundry.participants.push(this.$store.state.user)
        transactions.participate(laundry, laundry.participants)
      },
      loadLaundry (laundry) {
        laundry.loaded.push(this.$store.state.user)
        transactions.load(laundry, laundry.loaded)
      }
    }
}
</script>

<style>

</style>