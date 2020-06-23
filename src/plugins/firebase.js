import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/messaging'
import config from '@/app.config.json'


/**
 * init firebase
 */
firebase.initializeApp(config.firebaseConfig)

/**
 * get firebase messaging instance
 */
export const messaging = firebase.messaging.isSupported() ? firebase.messaging() : null

/**
 * tell messaging to use service-worker
 */
if (messaging) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then((registration) => {
            messaging.useServiceWorker(registration)
        }).catch(err => {
            console.log(err)
        })
}


/**
 * get firestore instace
 */
export const firestore = firebase.firestore()

/**
 * enable data offline caching
 */
firebase.firestore().enablePersistence()
