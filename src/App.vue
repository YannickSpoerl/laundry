<template>
  <v-app>
    <home v-if="$store.state.laundryUser && $store.state.locale"/>
    <login v-if="!$store.state.laundryUser && $store.state.locale"/>
    <language v-if="!$store.state.locale"/>
  </v-app>
</template>

<script>
import Home from '@/components/HomeComponent'
import Login from '@/components/LoginComponent'
import Language from '@/components/LanguageComponent'

  export default {
    name: 'App',
    components: {
      Home,
      Login,
      Language
    },
  }
</script>