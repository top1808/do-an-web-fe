import { FormLogin } from '@/models/authModel';
import { fork, put, take, select, call } from 'redux-saga/effects';
import { login, loginFailed, loginSuccess, logout } from '../reducers/authReducer';
import { PayloadAction } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
import authApi from '@/api/authApi';

function* handleLogin(body: FormLogin) {
	// console.log('handle login', body);
	try {
		yield call(authApi.login, body);
		yield put(loginSuccess(body));
		window.location.replace('/admin');
	} catch {
		yield put(loginFailed());
	}
}

function* handleLogout() {
	window.location.replace('/admin/login');
	yield put(logout());
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
			yield take(logout.type);
			yield call(handleLogout);
		}
	}
}

export function* authSaga() {
	yield fork(watchLoginFlow);
}
