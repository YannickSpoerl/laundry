import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBRoAuc7UkTERIhYm5dJHHCXnY-b8jkMAE",
    authDomain: "wg-laundry.firebaseapp.com",
    databaseURL: "https://wg-laundry.firebaseio.com",
    projectId: "wg-laundry",
    storageBucket: "wg-laundry.appspot.com",
    messagingSenderId: "102605575389",
    appId: "1:102605575389:web:41b37a202a35a6ba2df734"
  }

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