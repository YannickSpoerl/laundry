import firebase from 'firebase/app'
import 'firebase/firestore'
import config from '@/app.config.json'

const firebaseConfig = config.firebaseConfig

/**
 * get firebase instace
 */
export const firestore = firebase
  .initializeApp(firebaseConfig)
  .firestore()


firebase.firestore().enablePersistence()
