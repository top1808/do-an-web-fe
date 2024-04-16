import { fork, put, call, takeEvery } from 'redux-saga/effects';

import { AxiosResponse } from 'axios';
import { CreateAction, DeleteAction } from '@/models/actionModel';
import {
	changeStatusDiscountProgramFailed,
	changeStatusDiscountProgramSuccess,
	changingStatusDiscountProgram,
	createDiscountProgramFailed,
	createDiscountProgramSuccess,
	creatingDiscountProgram,
	deleteDiscountProgramFailed,
	deleteDiscountProgramSuccess,
	deletingDiscountProgram,
	editDiscountProgramFailed,
	editDiscountProgramSuccess,
	edittingDiscountProgram,
	getDiscountProgramInfoFailed,
	getDiscountProgramInfoSuccess,
	getDiscountProgramsFailed,
	getDiscountProgramsSuccess,
	gettingDiscountProgramInfo,
	gettingDiscountPrograms,
} from '../reducers/discountProgramReducer';
import { DiscountProgram, DiscountProgramParams, PayloadChangeStatusDiscountProgram } from '@/models/discountProgramModel';
import discountProgramApi from '@/api/discountProgramApi';
import { PayloadAction } from '@reduxjs/toolkit';

function* onDeleteDiscountProgram(action: DeleteAction) {
	try {
		const id = action.payload as string;
		const response: AxiosResponse = yield call(discountProgramApi.delete, id);
		yield put(deleteDiscountProgramSuccess({ id, message: response.data.message }));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(deleteDiscountProgramFailed(error.response.data.message));
	}
}

function* onCreateDiscountProgram(action: CreateAction<DiscountProgram>) {
	try {
		const body: DiscountProgram = action.payload as DiscountProgram;
		const response: AxiosResponse = yield call(discountProgramApi.create, body);
		yield put(createDiscountProgramSuccess(response.data.message));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(createDiscountProgramFailed(error.response.data.message));
	}
}

function* onGetDiscountPrograms(action: CreateAction<DiscountProgramParams>) {
	try {
		const params: DiscountProgramParams = action.payload as DiscountProgramParams;
		const response: AxiosResponse = yield call(discountProgramApi.getData, params);
		yield put(getDiscountProgramsSuccess(response.data.discountPrograms));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getDiscountProgramsFailed(error.response.data.message));
	}
}

function* onGetDiscountProgramInfo(action: CreateAction<string>) {
	try {
		const id: string = action.payload as string;
		const response: AxiosResponse = yield call(discountProgramApi.getById, id);
		yield put(getDiscountProgramInfoSuccess(response.data.discountProgram));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getDiscountProgramInfoFailed(error.response.data.message));
	}
}

function* onEditDiscountProgram(action: CreateAction<DiscountProgram>) {
	try {
		const body: DiscountProgram = action.payload as DiscountProgram;
		const response: AxiosResponse = yield call(discountProgramApi.edit, body);
		yield put(editDiscountProgramSuccess(response.data.message));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(editDiscountProgramFailed(error.response.data.message));
	}
}

function* onChangeStatusDiscountProgram(action: PayloadAction<PayloadChangeStatusDiscountProgram>) {
	try {
		const response: AxiosResponse = yield call(discountProgramApi.changeStatusDiscountProgram, action.payload);
		yield put(changeStatusDiscountProgramSuccess(response.data));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(changeStatusDiscountProgramFailed(error.response.data.message));
	}
}

function* watchDeleteDiscountProgramFlow() {
	const type: string = deletingDiscountProgram.type;
	yield takeEvery(type, onDeleteDiscountProgram);
}

function* watchCreateDiscountProgramFlow() {
	const type: string = creatingDiscountProgram.type;
	yield takeEvery(type, onCreateDiscountProgram);
}

function* watchGetDiscountProgramsFlow() {
	const type: string = gettingDiscountPrograms.type;
	yield takeEvery(type, onGetDiscountPrograms);
}

function* watchGetDiscountProgramInfoFlow() {
	const type: string = gettingDiscountProgramInfo.type;
	yield takeEvery(type, onGetDiscountProgramInfo);
}

function* watchEditDiscountProgramFlow() {
	const type: string = edittingDiscountProgram.type;
	yield takeEvery(type, onEditDiscountProgram);
}

function* watchChangeStatusDiscountProgramFlow() {
	const type: string = changingStatusDiscountProgram.type;
	yield takeEvery(type, onChangeStatusDiscountProgram);
}

export function* DiscountProgramSaga() {
	yield fork(watchGetDiscountProgramsFlow);
	yield fork(watchCreateDiscountProgramFlow);
	yield fork(watchDeleteDiscountProgramFlow);
	yield fork(watchGetDiscountProgramInfoFlow);
	yield fork(watchEditDiscountProgramFlow);
	yield fork(watchChangeStatusDiscountProgramFlow);
}
