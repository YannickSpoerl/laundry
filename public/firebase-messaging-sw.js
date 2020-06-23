importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');


firebase.initializeApp({
    messagingSenderId: '102605575389'
})

// eslint-disable-next-line no-unused-vars
const messaging = firebase.messaging()