<template>
  <v-app>
    <home v-if="$store.state.user && $store.state.locale"/>
    <login v-if="!$store.state.user && $store.state.locale"/>
    <language v-if="!$store.state.locale"/>
  </v-app>
</template>

<script>
import Home from '@/components/HomeComponent'
import Login from '@/components/util/LoginComponent'
import Language from '@/components/util/LanguageComponent'

  export default {
    name: 'App',
    components: {
      Home,
      Login,
      Language
    },
  }
</script>