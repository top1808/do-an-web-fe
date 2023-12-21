import { fork, put, call, take, takeLatest, takeEvery } from 'redux-saga/effects';
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

function* onCreateUser(action: CreateAction<User>) {
	try {
		const body: User = action.payload as User;
		const response: AxiosResponse = yield call(userApi.createUser, body);
		yield put(createUserSuccess(response.data.message));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(createUserFailed(error.response.data.message));
	}
}

function* onGetUsers(action: CreateAction<UserParams>) {
	try {
		const params: UserParams = action.payload as UserParams;
		const response: AxiosResponse = yield call(userApi.getUsers, params);
		yield put(getUsersSuccess(response.data.users));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getUsersFailed(error.response.data.message));
	}
}

function* onGetUser(action: CreateAction<string>) {
	try {
		const id: string = action.payload as string;
		const response: AxiosResponse = yield call(userApi.getUser, id);
		yield put(getUserSuccess(response.data.user));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getUserFailed(error.response.data.message));
	}
}

function* onEditUser(action: CreateAction<User>) {
	try {
		const body: User = action.payload as User;
		const response: AxiosResponse = yield call(userApi.editUser, body);
		yield put(editUserSuccess(response.data.message));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(editUserFailed(error.response.data.message));
	}
}

function* onChangePasswordUser(action: PayloadAction<ChangePasswordModel>) {
	try {
		const response: AxiosResponse = yield call(userApi.changePassword, action.payload);
		yield put(editUserSuccess(response.data.message));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(editUserFailed(error.response.data.message));
	}
}

function* watchDeleteUserFlow() {
	const type: string = deletingUser.type;
	yield takeEvery(type, onDeleteUser);
}

function* watchCreateUserFlow() {
	const type: string = creatingUser.type;
	yield takeEvery(type, onCreateUser);
}

function* watchGetUsersFlow() {
	const type: string = gettingUsers.type;
	yield takeEvery(type, onGetUsers);
}

function* watchGetUserFlow() {
	const type: string = gettingUser.type;
	yield takeEvery(type, onGetUser);
}

function* watchEditUserFlow() {
	const type: string = edittingUser.type;
	yield takeEvery(type, onEditUser);
}

function* watchChangePasswordUserFlow() {
	const type: string = changingPasswordUser.type;
	yield takeEvery(type, onChangePasswordUser);
}

export function* userSaga() {
	yield fork(watchGetUsersFlow);
	yield fork(watchCreateUserFlow);
	yield fork(watchDeleteUserFlow);
	yield fork(watchGetUserFlow);
	yield fork(watchEditUserFlow);
	yield fork(watchChangePasswordUserFlow);
}
