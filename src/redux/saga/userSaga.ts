import { fork, put, call, take, takeLatest, takeEvery } from 'redux-saga/effects';
import userApi from '@/api/userApi';
import { createUserFailed, createUserSuccess, creatingUser, deleteUserFailed, deleteUserSuccess, deletingUser, getUsersFailed, getUsersSuccess, gettingUsers } from '../reducers/userReducer';
import { AxiosResponse } from 'axios';
import { User } from '@/models/userModel';
import { CreateAction, DeleteAction } from '@/models/actionModel';

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
	const type: string = deletingUser.type;
	yield takeEvery(type, onDeleteUser);
}

function* watchCreateUserFlow() {
	const type: string = creatingUser.type;
	yield takeEvery(type, onCreateUser);
}

function* watchGetUserFlow() {
	yield takeEvery(gettingUsers.type, onGetUsers);
}

export function* userSaga() {
	yield fork(watchGetUserFlow);
	yield fork(watchCreateUserFlow);
	yield fork(watchDeleteUserFlow);
}
