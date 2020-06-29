<template>
  <div class="d-flex flex-wrap primary justify-start">
    <v-card
      @click="oldLaundriesHidden = !oldLaundriesHidden"
      elevation="24" width="100%" class="white ma-2 pa-4">
      <span class="text-h5">
        <v-icon color="primary">
          {{!oldLaundriesHidden ? 'mdi-arrow-down-drop-circle' : 'mdi-arrow-up-drop-circle'}}
        </v-icon>
        {{' ' + $t('finishLaundry.title') }}
      </span>
    </v-card>
    <div
      v-for="(laundry, index) in laundries" :key="index"
      v-show="!oldLaundriesHidden"
      style="margin: 8px" class="col-12 col-md-6 col-lg-4 col-xl-3">
      <finished-laundry :laundry="laundry"/>
    </div>
  </div>
</template>

<script>
import FinishedLaundry from '@/components/finish-laundry/FinishedLaundryComponent'

export default {
    name: 'finish-laundry',
    components: {
      FinishedLaundry
    },
    props: ['laundries'],
    data () {
      return {
        oldLaundriesHidden: true
      }
    }
}
</script>

<style>

</style>