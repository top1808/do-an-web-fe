import { fork, put, call, takeEvery } from 'redux-saga/effects';
import userApi from '@/api/userApi';
import {
	changingPasswordUser,
	createUserFailed,
	createUserSuccess,
	creatingUser,
	deleteUserFailed,
	deleteUserSuccess,
	deletingUser,
	editUserFailed,
	editUserSuccess,
	edittingUser,
	getUserFailed,
	getUserSuccess,
	getUsersFailed,
	getUsersSuccess,
	gettingUser,
	gettingUsers,
} from '../reducers/userReducer';
import { AxiosResponse } from 'axios';
import { ChangePasswordModel, User, UserParams } from '@/models/userModel';
import { CreateAction, DeleteAction } from '@/models/actionModel';
import { PayloadAction } from '@reduxjs/toolkit';
import {
	editIntentSuccess,
	editIntentFailed,
	edittingIntent,
	getIntentFailed,
	getIntentSuccess,
	getIntentsFailed,
	getIntentsSuccess,
	gettingIntent,
	gettingIntents,
	creatingIntents,
	createIntentSuccess,
	createIntentsFailed,
	chatting,
	chatSuccess,
	chatFailed,
} from '../reducers/chatbotReducer';
import chatbotApi from '@/api/chatbotApi';
import { Intent } from '@/models/chatbotModel';

function* onDeleteUser(action: DeleteAction) {
	try {
		const id = action.payload as string;
		const response: AxiosResponse = yield call(userApi.deleteUser, id);
		yield put(deleteUserSuccess({ id, message: response.data.message }));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(deleteUserFailed(error.response.data.message));
	}
}

function* onCreateIntent(action: PayloadAction<Intent>) {
	try {
		const response: AxiosResponse = yield call(chatbotApi.addIntent, action.payload);
		yield put(createIntentSuccess(response.data.message));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(createIntentsFailed(error.response.data.message));
	}
}

function* onGetIntents() {
	try {
		const response: AxiosResponse = yield call(chatbotApi.getIntents);
		yield put(getIntentsSuccess(response.data.data));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getIntentsFailed(error.response.data.message));
	}
}

function* onGetIntent(action: CreateAction<string>) {
	try {
		const id: string = action.payload as string;
		const response: AxiosResponse = yield call(chatbotApi.getIntentById, id);
		yield put(getIntentSuccess(response.data.data));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getIntentFailed(error.response.data.message));
	}
}

function* onEditIntent(action: PayloadAction<Intent>) {
	try {
		const response: AxiosResponse = yield call(chatbotApi.editIntent, action.payload);
		yield put(editIntentSuccess(response.data.message));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(editIntentFailed(error.response.data.message));
	}
}

function* onChat(action: PayloadAction<string>) {
	try {
		const response: AxiosResponse = yield call(chatbotApi.chat, action.payload);
		yield put(chatSuccess(response?.data?.data));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(chatFailed(error?.response?.data?.message));
	}
}

function* watchDeleteUserFlow() {
	const type: string = deletingUser.type;
	yield takeEvery(type, onDeleteUser);
}

function* watchCreateIntentFlow() {
	const type: string = creatingIntents.type;
	yield takeEvery(type, onCreateIntent);
}

function* watchGetIntentsFlow() {
	const type: string = gettingIntents.type;
	yield takeEvery(type, onGetIntents);
}

function* watchGetIntentFlow() {
	const type: string = gettingIntent.type;
	yield takeEvery(type, onGetIntent);
}

function* watchEditChatbotFlow() {
	const type: string = edittingIntent.type;
	yield takeEvery(type, onEditIntent);
}

function* watchChatFlow() {
	const type: string = chatting.type;
	yield takeEvery(type, onChat);
}

export function* chatbotSaga() {
	yield fork(watchGetIntentsFlow);
	yield fork(watchGetIntentFlow);
	yield fork(watchEditChatbotFlow);
	yield fork(watchCreateIntentFlow);
	yield fork(watchChatFlow);
	// yield fork(watchDeleteUserFlow);
}
