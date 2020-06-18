import firebase from 'firebase/app'
import 'firebase/firestore'
import config from '@/app.config.json'

const firebaseConfig = config.firebaseConfig

/**
 * get firebase instace
 */
export const vuefire = firebase
  .initializeApp(firebaseConfig)
  .firestore()

/**
 * define transactions to firestore
 */
export const transactions = {
  addUser: function (user) {
    vuefire.collection('flatmates').add({ name: user })
  },
  addLaundry: function (laundry) {
    vuefire.collection('laundries').add(laundry)
  },
  deleteLaundry: function (laundry) {
    vuefire.collection('laundries').doc(laundry.id).delete()
  },
  fillLaundry: function (laundry) {
    vuefire.collection('laundries').doc(laundry.id).update({ full: true })
  },
  startLaundry: function (laundry) {
    vuefire.collection('laundries').doc(laundry.id).update({ started: true })
  },
  updateParticipants: function (laundry) {
    vuefire.collection('laundries').doc(laundry.id).update({ participants: laundry.participants })
  },
  updateLoaded: function (laundry) {
    vuefire.collection('laundries').doc(laundry.id).update({ loaded: laundry.loaded })
  }
}