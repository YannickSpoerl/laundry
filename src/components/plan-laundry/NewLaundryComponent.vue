<template>
    <v-card class="text-center">
        <p class="text-h5">
            {{ $t('planLaundry.newLaundry') }}
        </p>
        <div class="d-flex justify-center">
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        v-bind="attrs"
                        v-on="on"
                        dark
                        color="primary"
                        class="col-5 ma-2">
                        {{ laundry.planned? formatDate(laundry.planned) : $t('newLaundry.chooseDate') }}
                    </v-btn>
                </template>
                <v-date-picker v-model="selectedDate"/>
            </v-menu>
            <v-menu
                :close-on-content-click="false"
                left
                offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        v-bind="attrs"
                        v-on="on"
                        dark
                        color="primary"
                        class="col-5 ma-2">
                        {{ laundry.planned? formatTime(laundry.planned) : $t('newLaundry.chooseTime') }}
                    </v-btn>
                </template>
                <v-time-picker v-model="selectedTime"/>
            </v-menu>
        </div>
        <v-select
            v-model="laundry.category"
            :items="sortedCategories"
            :rules="[categoryNotEmpty]"
            :label="$t('category')"
            filled
            item-text="name"
            class="ma-3"/>
        <v-select
            v-model="laundry.temperature"
            :items="sortedTemperatures"
            :rules="[temperatureNotEmpty]"
            :label="$t('temperature')"
            filled
            class="ma-3"/>
        <v-card-actions>
            <v-btn
                @click="$emit('create', laundry)"
                :disabled="!laundryValid"
                dark
                color="primary">
                {{ $t('save') }}
            </v-btn>
            <v-btn
                @click="$emit('cancel')"
                dark
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
                plannedBy: this.$store.state.user,
                participants: [this.$store.state.user],
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
            return new Date(time).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) + ' ' + this.$t('oClock')
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
        },
        sortedTemperatures () {
            let arr = [].concat(this.temperatures)
            arr.sort((t1, t2) => {
                return t1.degree - t2.degree
            })
            return arr.map(t => isNaN(t.degree)? t.degree : t.degree + '°C')
        },
        sortedCategories () {
            let arr = [].concat(this.categories)
            arr.sort((c1, c2) => {
                if (c1.name < c2.name) return -1
                return 1
            })
            return arr
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