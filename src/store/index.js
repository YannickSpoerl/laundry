import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { firestore } from '@/plugins/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    locale: null,
    pin: null,
    online: null,
    laundries: [],
    flatmates: [],
    categories: [],
    temperatures: [],
    demo: false
  },
  mutations: {
    setPin (state, pin) {
      state.pin = pin
    },
    enterDemo (state) {
      state.demo = true
    },
    login (state, user) {
      state.user = user
    },
    setLocale (state, locale) {
      state.locale = locale
    },
    pinEntered (state, pin) {
      state.pin = pin
    },
    setOnline (state, bool) {
      state.online = bool
    },
    ...vuexfireMutations,
  },
  actions: {
    /**
     * bind firestore data to state
     */
    bindFirestore: firestoreAction(({ bindFirestoreRef }) => {
      bindFirestoreRef('laundries', firestore.collection('laundries'))
      bindFirestoreRef('flatmates', firestore.collection('flatmates'))
      bindFirestoreRef('categories', firestore.collection('categories'))
      bindFirestoreRef('temperatures', firestore.collection('temperatures'))
    }),
    /**
     * define transactions on firestore
     */
    addLaundry: firestoreAction((context, laundry) => {
      return firestore.collection('laundries').add(laundry)
    }),
    addUser: firestoreAction ((context, user) => {
      return firestore.collection('flatmates').add({ name: user })
    }),
    deleteLaundry: firestoreAction ((context, laundry) => {
      return firestore.collection('laundries').doc(laundry.id).delete()
    }),
    updateLoaded: firestoreAction ((context, laundry) => {
      return firestore.collection('laundries').doc(laundry.id).update({ loaded: laundry.loaded })
    }),
    updateParticipants: firestoreAction ((context, laundry) => {
      return firestore.collection('laundries').doc(laundry.id).update({ participants: laundry.participants })
    }),
    startLaundry: firestoreAction ((context, laundry) => {
      return firestore.collection('laundries').doc(laundry.id).update({ started: true })
    }),
    fillLaundry: firestoreAction ((context, laundry) => {
      return firestore.collection('laundries').doc(laundry.id).update({ full: true })
    })
  },
  modules: {
  }
})
