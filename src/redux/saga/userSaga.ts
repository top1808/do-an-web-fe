import { fork, put, call, take, takeLatest } from 'redux-saga/effects';
import userApi from '@/api/userApi';
import { createUserFailed, createUserSuccess, creatingUser, deleteUserFailed, deleteUserSuccess, deletingUser, getUsersFailed, getUsersSuccess, gettingUsers } from '../reducers/userReducer';
import { AxiosResponse } from 'axios';
import { User } from '@/models/userModel';
import { PayloadAction } from '@reduxjs/toolkit';

function* onDeleteUser(id: string) {
	try {
		const response: AxiosResponse = yield call(userApi.deleteUser, id);
		yield put(deleteUserSuccess({ id, message: response.data.message }));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(deleteUserFailed(error.response.data.message));
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

function* watchDeleteUserFlow() {
	const action: PayloadAction<string> = yield take(deletingUser.type);
	yield fork(onDeleteUser, action.payload);
}

function* watchCreateUserFlow() {
	const action: PayloadAction<User> = yield take(creatingUser.type);
	yield fork(onCreateUser, action.payload);
}

function* watchGetUserFlow() {
	yield takeLatest(gettingUsers.type, onGetUsers);
}

export function* userSaga() {
	yield fork(watchGetUserFlow);
	yield fork(watchCreateUserFlow);
	yield fork(watchDeleteUserFlow);
}
