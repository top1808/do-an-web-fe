import { firebaseConfig } from '@/constants';
import { NotificationModel } from '@/models/notificationModel';
import { setToken } from '@/redux/reducers/notificationReducer';
import { store } from '@/redux/store';
import { notification } from 'antd';

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
			const { currentUser } = store.getState().auth;
			if (currentUser?._id !== event.data?.data?.fromUser) {
				const data: NotificationModel = event.data.notification;

				notification.open({
					message: data?.title,
					description: data?.body,
					duration: 3,
					onClick: () => window.location.assign(data?.link || ''),
				});
			}
		});
	}
};

export const getMessagingToken = async () => {
	let currentToken = '';
	if (!messaging) return;
	try {
		currentToken = await messaging.getToken({
			vapidKey: 'BFeYWzVaczTM9j8pNox83J3HtbEb_Tyr9_x8Km4T0HkXZRDajgENVqShl-6N6fAjWLGgjmNBUORqRnXA6ze-8gM',
		});
		store.dispatch(setToken(currentToken));
	} catch (error) {
		console.log('An error occurred while retrieving token. ', error);
	}
	return currentToken;
};

export const onMessageListener = () =>
	new Promise((resolve) => {
		messaging.onMessage((payload) => {
			resolve(payload);
		});
	});
