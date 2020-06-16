<template>
  <v-card class="text-center">
    <p class="text-h5">
        {{ $t('planLaundry.newLaundry') }}
    </p>
    <div class="d-flex justify-center">
        <v-menu
        offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
                class="col-5 ma-2"

          color="primary"
          dark
          v-bind="attrs"
          v-on="on">
          {{ laundry.planned? formatDate(laundry.planned) : $t('newLaundry.chooseDate') }}
        </v-btn>
      </template>
        <v-date-picker v-model="selectedDate"></v-date-picker>
    </v-menu>
     <v-menu
     left
        :close-on-content-click="false"
        offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
                     class="col-5 ma-2"

          color="primary"
          dark
          v-bind="attrs"
          v-on="on">
          {{ laundry.planned?  formatTime(laundry.planned) : $t('newLaundry.chooseTime') }}
        </v-btn>
      </template>
        <v-time-picker v-model="selectedTime"></v-time-picker>
    </v-menu>
    </div>

    <v-select
        class="ma-3"
        :items="categories"
        v-model="laundry.category"
        :rules="[categoryNotEmpty]"
        filled
        item-text="name"
        :label="$t('category')"/>
    <v-select
            class="ma-3"
        :items="temperatures.map(t => t.degree + '°C')"
        v-model="laundry.temperature"
        :rules="[temperatureNotEmpty]"
        filled
        :label="$t('temperature')"/>
    <v-card-actions>
        <v-btn
            dark
            :disabled="!laundryValid"
            @click="$emit('create', laundry)"
            color="primary">
            {{ $t('save') }}
        </v-btn>
        <v-btn
            dark
            @click="$emit('cancel')"
            color="secondary">
            {{ $t('cancel') }}
        </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { vuefire } from '@/plugins/vuefire'

export default {
    name: 'new-laundry',
    data () {
        return {
            selectedDate: null,
            selectedTime: '08:00',
            categories: [],
            temperatures: [],
            laundry: {
                category: null,
                created: new Date(),
                full: false,
                plannedBy: this.$store.state.laundryUser,
                participants: [this.$store.state.laundryUser],
                loaded: [],
                started: false,
                planned: null,
                temperature: null
            }
        }
    },
    methods: {
        formatDate (date) {
            return new Date(date).toLocaleDateString('de-DE')
        },
        formatTime (time) {
            return new Date(time).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
        },
        categoryNotEmpty (object) {
            if (!object) return this.$t('newLaundry.errMssg1')
            return true
        },
        temperatureNotEmpty (object) {
            if (!object) return this.$t('newLaundry.errMssg2')
            return true
        }
    },
    watch: {
        selectedDate () {
            let date = new Date()
            if (this.selectedTime) {
                date.setHours(parseInt(this.selectedTime.split(':')[0]))
                date.setMinutes(parseInt(this.selectedTime.split(':')[1]))   
            }
            date.setFullYear(parseInt(this.selectedDate.split('-')[0]))
            date.setMonth(parseInt(this.selectedDate.split('-')[1]) - 1)
            date.setDate(parseInt(this.selectedDate.split('-')[2]))
            this.laundry.planned = date
        },
        selectedTime () {
            let date = new Date()
            if (this.selectedDate) {
                date.setFullYear(parseInt(this.selectedDate.split('-')[0]))
                date.setMonth(parseInt(this.selectedDate.split('-')[1]) - 1)
                date.setDate(parseInt(this.selectedDate.split('-')[2]))
            }
            date.setHours(parseInt(this.selectedTime.split(':')[0]))
            date.setMinutes(parseInt(this.selectedTime.split(':')[1]))
            this.laundry.planned = date
        }
    },
    computed: {
        laundryValid () {
            let dateValid = this.laundry.planned && Object.prototype.toString.call(this.laundry.planned) === "[object Date]"
            return dateValid && this.laundry.category != null && this.laundry.temperature != null
        }
    },
    firestore: {
        categories: vuefire.collection('categories'),
        temperatures: vuefire.collection('temperatures')
    }
}
</script>
<style>
</style>