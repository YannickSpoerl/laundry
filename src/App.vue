<template>
  <v-app>
    <home v-if="(($store.state.user && $store.state.pin) || $store.state.demo) && $store.state.locale"/>
    <login v-if="!$store.state.user && $store.state.locale && !$store.state.demo"/>
    <language v-if="!$store.state.locale"/>
    <pin v-if="$store.state.locale && $store.state.user && !$store.state.pin"/>
  </v-app>
</template>

<script>
import Home from '@/components/HomeComponent'
import Login from '@/components/util/LoginComponent'
import Language from '@/components/util/LanguageComponent'
import Pin from '@/components/util/PinComponent'

  export default {
    name: 'App',
    components: {
      Home,
      Login,
      Language,
      Pin
    },
    /**
     * catch offline-online events
     */
    beforeMount () {
      window.addEventListener('offline', () => {
        this.$store.commit('setOnline', false)
      })
      window.addEventListener('online', () => {
        this.$store.commit('setOnline', true)
      })
    }
  }
</script>