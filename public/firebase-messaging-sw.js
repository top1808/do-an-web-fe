//public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const defaultConfig = {
	apiKey: 'AIzaSyB64kFtwaXYBwjh13h0YgRHKlufJsPPRHc',
	authDomain: 'do-an-web-7e477.firebaseapp.com',
	databaseURL: 'https://do-an-web-7e477-default-rtdb.asia-southeast1.firebasedatabase.app',
	projectId: 'do-an-web-7e477',
	storageBucket: 'do-an-web-7e477.appspot.com',
	messagingSenderId: '542018707616',
	appId: '1:542018707616:web:31bfafc0fe1e7b826629c5',
	measurementId: 'G-D2RCS7H75K',
};

firebase.initializeApp(defaultConfig);

const messaging = firebase.messaging();
const channel = new BroadcastChannel('notifications');
messaging.onBackgroundMessage(function (payload) {
	//can not console.log here
	channel.postMessage(payload);
});
