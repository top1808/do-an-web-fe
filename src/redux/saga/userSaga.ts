import { fork, put, call, take, takeEvery } from 'redux-saga/effects';
import userApi from '@/api/userApi';
import { createUserFailed, createUserSuccess, creatingUser, getUsersFailed, getUsersSuccess, gettingUsers } from '../reducers/userReducer';
import { AxiosResponse } from 'axios';
import { User } from '@/models/userModel';
import { PayloadAction } from '@reduxjs/toolkit';

function* onGetUsers() {
	try {
		const response: AxiosResponse = yield call(userApi.getUsers);
		yield put(getUsersSuccess(response.data.users));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getUsersFailed(error.response.data.message));
	}
}

function* onCreateUser(body: User) {
	try {
		const response: AxiosResponse = yield call(userApi.createUser, body);
		yield put(createUserSuccess(response.data.message));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(createUserFailed(error.response.data.message));
	}
}

function* watchCreateUserFlow() {
	const action: PayloadAction<User> = yield take(creatingUser.type);
	yield fork(onCreateUser, action.payload);
}

function* watchGetUserFlow() {
	yield take(gettingUsers.type);
	yield fork(onGetUsers);
}

export function* userSaga() {
	yield fork(watchGetUserFlow);
	yield fork(watchCreateUserFlow);
}
