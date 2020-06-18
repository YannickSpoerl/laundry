import firebase from 'firebase/app'
import 'firebase/firestore'
import config from '@/app.config.json'

const firebaseConfig = config.firebaseConfig

// Get a Firestore instance
export const vuefire = firebase
  .initializeApp(firebaseConfig)
  .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

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
  participate: function (laundry, participants) {
    vuefire.collection('laundries').doc(laundry.id).update({ participants: participants })
  },
  load: function (laundry, loaded) {
    vuefire.collection('laundries').doc(laundry.id).update({ loaded: loaded })
  }
}