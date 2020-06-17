<template>
  <v-app>
    <home v-if="$store.state.user && $store.state.locale && $store.state.online"/>
    <login v-if="!$store.state.user && $store.state.locale"/>
    <language v-if="!$store.state.locale"/>
    <offline v-if="!$store.state.online"/>
  </v-app>
</template>

<script>
import Home from '@/components/HomeComponent'
import Login from '@/components/util/LoginComponent'
import Language from '@/components/util/LanguageComponent'
import Offline from '@/components/util/OfflineComponent'

  export default {
    name: 'App',
    components: {
      Home,
      Login,
      Language,
      Offline
    },
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