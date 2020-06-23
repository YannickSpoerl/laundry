import { messaging } from '@/plugins/firebase'
import config from '@/app.config.json'

/**
 * build Notification body
 */
function buildNotification(laundry) {
  let notification = {
    title: laundry.plannedBy + ' planned Laundry: ' + laundry.planned.toLocaleDateString('de-DE'),
    body: laundry.category + ', ' + laundry.temperature,
    icon: config.notifications.iconUrl
  }
  let obj = {
    notification: notification,
    to: config.notifications.topic
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
  xhr.open('POST', config.notifications.subscriptionUrl + await getToken() + '/rel' + config.notifications.topic, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Authorization', config.notifications.server)
  xhr.send()
}

/**
 * fire notification to topic
 */
const fireNotification = (laundry) => {
  let xhr = new XMLHttpRequest()
  xhr.open('POST', config.notifications.sendUrl, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Authorization', config.notifications.server)
  xhr.send(buildNotification(laundry))
}

export { askForPermission, fireNotification, setSubscription }