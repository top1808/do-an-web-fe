import { FormLogin } from '@/models/authModel';
import { fork, put, take, select, call } from 'redux-saga/effects';
import { login, loginFailed, loginSuccess, logoutSuccess, logouting } from '../reducers/authReducer';
import { PayloadAction } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
import authApi from '@/api/authApi';
import { AxiosResponse } from 'axios';

function* handleLogin(body: FormLogin) {
	try {
		const response: AxiosResponse = yield call(authApi.login, body);
		yield put(loginSuccess(response.data));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		yield put(loginFailed(error?.response?.data?.message || 'Error Network!'));
	}
}

function* handleLogout() {
	try {
		const response: AxiosResponse = yield call(authApi.logout);
		yield put(logoutSuccess(response.data.message));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		yield put(loginFailed(error?.response?.data?.message || 'Error Network!'));
	}
}

function* watchLoginFlow() {
	yield take(REHYDRATE);
	while (true) {
		const { auth } = yield select((state) => state);
		const isLoggedIn = auth.isLoggedIn;

		if (!isLoggedIn) {
			const action: PayloadAction<FormLogin> = yield take(login.type);
			yield fork(handleLogin, action.payload);
		} else {
			yield take(logouting.type);
			yield call(handleLogout);
		}
	}
}

export function* authSaga() {
	yield fork(watchLoginFlow);
}
