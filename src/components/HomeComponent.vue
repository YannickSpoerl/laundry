<template>
    <v-main>
        <div>
            <plan-laundry :laundries="plannedLaundries"/>
        </div>
        <div>
            <finished-laundry :laundries="finishedLaundries"/>
    </div>
    </v-main>
</template>

<script>
import { vuefire } from '@/plugins/vuefire'
import PlanLaundry from '@/components/plan-laundry/PlanLaundryComponent'
import FinishedLaundry from '@/components/finished-laundry/FinishedLaundryComponent'

  export default {
    name: 'home',
    components: {
      PlanLaundry,
      FinishedLaundry
    },
    data: () => ({
      laundries: []
    }),
    computed: {
      plannedLaundries () {
        return this.laundries.filter((laundry) => !laundry.started).sort((laundry1, laundry2) => {
          return laundry1.planned.toDate() - laundry2.planned.toDate()
        })
      },
      finishedLaundries () {
        return this.laundries.filter((laundry) => laundry.started).sort((laundry1, laundry2) => {
          return laundry1.planned.toDate() - laundry2.planned.toDate()
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