<template>
    <v-card class="text-center">
        <p class="text-h5">
            {{ $t('planLaundry.newLaundry') }}
        </p>
        <div class="d-flex justify-center">
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        v-bind="attrs" v-on="on"
                        dark color="primary" class="col-5 ma-2">
                        {{ laundry.planned? formatDate(laundry.planned) : $t('newLaundry.chooseDate') }}
                    </v-btn>
                </template>
                <v-date-picker v-model="selectedDate"/>
            </v-menu>
            <v-menu
                :close-on-content-click="false"
                left offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        v-bind="attrs" v-on="on"
                        dark color="primary" class="col-5 ma-2">
                        {{ laundry.planned? formatTime(laundry.planned) : $t('newLaundry.chooseTime') }}
                    </v-btn>
                </template>
                <v-time-picker v-model="selectedTime"/>
            </v-menu>
        </div>
        <v-select
            v-model="laundry.category"
            :items="sortedCategories" :rules="[categoryNotEmpty]" :label="$t('category')"
            item-text="name" filled class="ma-3"/>
        <v-select
            v-model="laundry.temperature"
            :items="sortedTemperatures" :rules="[temperatureNotEmpty]" :label="$t('temperature')"
            filled class="ma-3"/>
        <v-textarea
            v-model="laundry.comment"
            :placeholder="$t('comment')" no-resize
            rows="2" class="ma-3"/>
        <v-card-actions>
            <v-btn
                @click="$emit('create', laundry)"
                :disabled="!laundryValid || $store.state.demo"
                :dark="laundryValid && !$store.state.demo" color="primary">
                {{ $t('save') }}
            </v-btn>
            <v-btn
                @click="$emit('cancel')"
                dark color="secondary">
                {{ $t('cancel') }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import config from '@/app.config.json'

export default {
    name: 'new-laundry',
    data () {
        return {
            selectedDate: null,
            selectedTime: null,
            laundry: {
                comment: null,
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
    /**
     * set start time to avoid long user input
     */
    beforeMount () {
        this.selectedTime = config.defaults.laundryStartTime
    },
    methods: {
        /**
         * format date
         */
        formatDate (date) {
            return new Date(date).toLocaleDateString('de-DE')
        },
        /**
         * format time
         */
        formatTime (time) {
            return new Date(time).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) + ' ' + this.$t('oClock')
        },
        /**
         * check if category is empty
         */
        categoryNotEmpty (object) {
            if (!object) return this.$t('newLaundry.errMssg1')
            return true
        },
        /**
         * check if temperature is empty
         */
        temperatureNotEmpty (object) {
            if (!object) return this.$t('newLaundry.errMssg2')
            return true
        }
    },
    watch: {
        /**
         * update laundry.planned when date input changes
         */
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
        /**
         * update laundry.planned when time input changes
         */
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
        /**
         * check if all properties for new laundry are set
         */
        laundryValid () {
            let dateValid = this.laundry.planned && Object.prototype.toString.call(this.laundry.planned) === "[object Date]"
            return dateValid && this.laundry.category != null && this.laundry.temperature != null
        },
        /**
         * sort temperatures from low to high, append '°C' if number
         */
        sortedTemperatures () {
            let arr = [].concat(this.$store.state.temperatures)
            arr.sort((t1, t2) => {
                return t1.degree - t2.degree
            })
            return arr.map(t => isNaN(t.degree)? this.$t('temperatures.' + t.degree) : t.degree + '°C')
        },
        /**
         * sort categories by alphabet
         */
        sortedCategories () {
            let arr = this.$store.state.categories.map(c => this.$t('categories.' + c.name))
            arr.sort((c1, c2) => {
                if (c1 < c2) return -1
                return 1
            })
            return arr
        }
    }
}
</script>
<style>
</style>