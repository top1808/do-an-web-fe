import { FormLogin } from '@/models/authModel';
import { fork, put, take, select, call } from 'redux-saga/effects';
import { login, loginFailed, loginSuccess, logout } from '../reducers/authReducer';
import { PayloadAction } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
import authApi from '@/api/authApi';
import { AxiosResponse } from 'axios';

function* handleLogin(body: FormLogin) {
	// console.log('handle login', body);
	try {
		const response: AxiosResponse = yield call(authApi.login, body);
		console.log('🚀 ~ file: authSaga.ts:13 ~ function*handleLogin ~ response:', response);
		yield put(loginSuccess(body));
		console.log(123);
		// window.location.replace('/admin');
	} catch {
		yield put(loginFailed());
	}
}

function* handleLogout() {
	window.location.replace('/admin/login');
	yield put(logout());
}

function* watchLoginFlow() {
	while (true) {
		yield take(REHYDRATE);
		const { auth } = yield select((state) => state);
		console.log('🚀 ~ file: authSaga.ts:28 ~ function*watchLoginFlow ~ auth:', auth);
		const isLoggedIn = auth.isLoggedIn;

		if (!isLoggedIn) {
			const action: PayloadAction<FormLogin> = yield take(login.type);
			yield fork(handleLogin, action.payload);
		}

		yield take(logout.type);
		yield call(handleLogout);
	}
}

export function* authSaga() {
	yield fork(watchLoginFlow);
}
