import { firebaseConfig } from '@/constants';
import { setToken } from '@/redux/reducers/notificationReducer';
import { store } from '@/redux/store';

import firebase from 'firebase/app';
import 'firebase/messaging';

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
} else {
	firebase.app(); // if already initialized, use that one
}

let messaging: firebase.messaging.Messaging;

if (typeof window !== 'undefined') {
	if (firebase.messaging.isSupported()) {
		messaging = firebase.messaging();
	}
}

export const registerServiceWorker = () => {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.addEventListener('message', (event) => {
			// console.log('🚀 ~ navigator.serviceWorker.addEventListener ~ event:', event);
		});
	}
};

export const requestPermission = async () => {
	let permission = '';
	try {
		permission = await Notification.requestPermission();
	} catch (error) {
		// console.log('An error occurred while retrieving token. ', error);
	}

	return permission;
};

export const getMessagingToken = async () => {
	let currentToken = '';
	if (!messaging) return;
	try {
		currentToken = await messaging.getToken({
			vapidKey: process.env.FIREBASE_VAPID_KEY,
		});
		// console.log('🚀 ~ getMessagingToken ~ currentToken:', currentToken);
		store.dispatch(setToken(currentToken));
	} catch (error) {
		// console.log('An error occurred while retrieving token. ', error);
	}
	return currentToken;
};

export const onMessageListener = () =>
	new Promise((resolve) => {
		messaging.onMessage((payload) => {
			resolve(payload);
		});
	});
