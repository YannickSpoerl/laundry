import { messaging } from '@/plugins/firebase'

/**
 * build Notification body
 */
function buildNotification(laundry) {
  let notification = {
    title: laundry.plannedBy + ' planned Laundry: ' + laundry.planned.toLocaleDateString('de-DE'),
    body: laundry.category + ', ' + laundry.temperature,
    icon: 'https://laundry.yannickspoerl.de/img/icons/favicon-32x32.png'
  }
  let obj = {
    notification: notification,
    to: '/topics/newLaundry'
  }
  return JSON.stringify(obj)
}

/**
 * get notification token
 */
async function getToken() {
  if(!messaging) return
  return await messaging.getToken()
}

/**
 * subscribe to newLaundry topic with latest token
 */
function setSubscription() {
  if(!messaging) return
  subscribeToNotifications()
  messaging.onTokenRefresh(() => {
    subscribeToNotifications()
  })
}

/**
 * request notification permission
 */
const askForPermission = async () => {
  if(!messaging) return
  await messaging.requestPermission()
}

/**
 * send subscription request
 */
const subscribeToNotifications = async () => {
  if(!messaging) return
  let xhr = new XMLHttpRequest()
  xhr.open('POST', 'https://iid.googleapis.com/iid/v1/' + await getToken() + '/rel/topics/newLaundry', true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Authorization', 'key=AAAAF-PE1N0:APA91bFQ7HZNyhrI_n9OW3eeqfbNCsm_xDJmdH1X7JTbUlSE6JBn4sQG8-3Uqr3m8pr0tPFFd33bFYg2XHNiVUj6mNj4PDTTSKDC866CrJGyYobBFkvqEx4V1NopPRESmQbKoF5mRFBF')
  xhr.send()
}

/**
 * fire notification to topic
 */
const fireNotification = (laundry) => {
  let xhr = new XMLHttpRequest()
  xhr.open('POST', 'https://fcm.googleapis.com/fcm/send', true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Authorization', 'key=AAAAF-PE1N0:APA91bFQ7HZNyhrI_n9OW3eeqfbNCsm_xDJmdH1X7JTbUlSE6JBn4sQG8-3Uqr3m8pr0tPFFd33bFYg2XHNiVUj6mNj4PDTTSKDC866CrJGyYobBFkvqEx4V1NopPRESmQbKoF5mRFBF')
  xhr.send(buildNotification(laundry))
}

export { askForPermission, fireNotification, setSubscription }