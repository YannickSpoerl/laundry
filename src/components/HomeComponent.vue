<template>
  <v-main class="primary">
    <div>
      <plan-laundry :laundries="plannedLaundries"/>
    </div>
    <div>
      <finish-laundry :laundries="finishedLaundries"/>
    </div>
  </v-main>
</template>

<script>
import { vuefire } from '@/plugins/vuefire'
import PlanLaundry from '@/components/plan-laundry/PlanLaundryComponent'
import FinishLaundry from '@/components/finish-laundry/FinishLaundryComponent'

  export default {
    name: 'home',
    components: {
      PlanLaundry,
      FinishLaundry
    },
    data: () => ({
      laundries: []
    }),
    computed: {
      /**
       * remove started laundries, sort nearest to top
       */
      plannedLaundries () {
        return this.laundries.filter((laundry) => !laundry.started).sort((laundry1, laundry2) => {
          return laundry1.planned.toDate() - laundry2.planned.toDate()
        })
      },
      /**
       * remove unstarted laundries, sort latest to top
       */
      finishedLaundries () {
        return this.laundries.filter((laundry) => laundry.started).sort((laundry1, laundry2) => {
          return laundry2.planned.toDate() - laundry1.planned.toDate()
        })
      }
    },
    firestore: {
      categories: vuefire.collection('categories'),
      flatmates: vuefire.collection('flatmates'),
      laundries: vuefire.collection('laundries'),
      temperatures: vuefire.collection('temperatures')
    }
  }
</script>