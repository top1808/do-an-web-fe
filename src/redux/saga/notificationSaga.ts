import { fork, put, call, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import {
	getMoreNotificationsFailed,
	getMoreNotificationsSuccess,
	getNotificationsFailed,
	getNotificationsSuccess,
	gettingMoreNotifications,
	gettingNotifications,
	readNotificationsFailed,
	readNotificationsSuccess,
	readingNotifications,
} from '../reducers/notificationReducer';
import notificationApi from '@/api/notificationApi';
import { PayloadAction } from '@reduxjs/toolkit';
import { NotificationParams } from '@/models/notificationModel';

function* onReadNotification(action: PayloadAction<string>) {
	try {
		yield call(notificationApi.read, action.payload);

		yield put(readNotificationsSuccess());
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(readNotificationsFailed(error.response.data.message));
	}
}

function* watchReadNotificationFlow() {
	const type: string = readingNotifications.type;
	yield takeEvery(type, onReadNotification);
}

function* onGetNotifications(action: PayloadAction<NotificationParams>) {
	try {
		const response: AxiosResponse = yield call(notificationApi.getData, action.payload);

		yield put(getNotificationsSuccess({ data: response.data.data, pagination: response.data.pagination }));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getNotificationsFailed(error.response.data.message));
	}
}

function* onGetMoreNotifications(action: PayloadAction<NotificationParams>) {
	try {
		const response: AxiosResponse = yield call(notificationApi.getData, action.payload);

		yield put(getMoreNotificationsSuccess({ data: response.data.data, pagination: response.data.pagination }));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getMoreNotificationsFailed(error.response.data.message));
	}
}

function* watchGetNotificationsFlow() {
	const type: string = gettingNotifications.type;
	yield takeEvery(type, onGetNotifications);
}

function* watchGetMoreNotificationsFlow() {
	const type: string = gettingMoreNotifications.type;
	yield takeEvery(type, onGetMoreNotifications);
}

export function* NotificationSaga() {
	yield fork(watchGetNotificationsFlow);
	yield fork(watchGetMoreNotificationsFlow);
	yield fork(watchReadNotificationFlow);
}
