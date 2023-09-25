import { fork, put, call, take, takeEvery } from 'redux-saga/effects';
import userApi from '@/api/userApi';
import { getUsersFailed, getUsersSuccess, gettingUsers } from '../reducers/userReducer';
import { AxiosResponse } from 'axios';

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

function* watchGetUserFlow() {
	yield take(gettingUsers.type);
	yield fork(onGetUsers);
}

export function* userSaga() {
	yield fork(watchGetUserFlow);
}
