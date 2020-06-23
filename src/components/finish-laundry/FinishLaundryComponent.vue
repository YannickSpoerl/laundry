<template>
  <div class="d-flex flex-wrap primary justify-start">
    <v-card elevation="24" width="100%" class="white ma-2 pa-4">
      <span class="text-h5">
        {{ $t('finishLaundry.title') }}
      </span>
    </v-card>
    <div
      v-for="(laundry, index) in laundries" :key="index"
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
    props: ['laundries']
}
</script>

<style>

</style>