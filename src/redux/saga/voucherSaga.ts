import { fork, put, call, takeEvery } from 'redux-saga/effects';

import { AxiosResponse } from 'axios';
import { CreateAction, DeleteAction } from '@/models/actionModel';

import {
	createVoucherFailed,
	createVoucherSuccess,
	creatingVoucher,
	deleteVoucherFailed,
	deleteVoucherSuccess,
	deletingVoucher,
	editVoucherFailed,
	editVoucherSuccess,
	edittingVoucher,
	getVoucherInfoFailed,
	getVoucherInfoSuccess,
	getVouchersFailed,
	getVouchersSuccess,
	gettingVoucherInfo,
	gettingVouchers,
} from '../reducers/voucherReducer';
import { Voucher, VoucherParams } from '@/models/voucherModel';
import voucherApi from '@/api/voucherApi';

function* onDeleteVoucher(action: DeleteAction) {
	try {
		const id = action.payload as string;
		const response: AxiosResponse = yield call(voucherApi.delete, id);
		yield put(deleteVoucherSuccess({ id, message: response.data.message }));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(deleteVoucherFailed(error.response.data.message));
	}
}

function* onCreateVoucher(action: CreateAction<Voucher>) {
	try {
		const body: Voucher = action.payload as Voucher;
		const response: AxiosResponse = yield call(voucherApi.create, body);
		yield put(createVoucherSuccess(response.data.message));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(createVoucherFailed(error.response.data.message));
	}
}

function* onGetVouchers(action: CreateAction<VoucherParams>) {
	try {
		const params: VoucherParams = action.payload as VoucherParams;
		const response: AxiosResponse = yield call(voucherApi.getData, params);
		yield put(getVouchersSuccess(response.data.vouchers));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getVouchersFailed(error.response.data.message));
	}
}

function* onGetVoucherInfo(action: CreateAction<string>) {
	try {
		const id: string = action.payload as string;
		const response: AxiosResponse = yield call(voucherApi.getById, id);
		yield put(getVoucherInfoSuccess(response.data.voucher));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getVoucherInfoFailed(error.response.data.message));
	}
}

function* onEditVoucher(action: CreateAction<Voucher>) {
	try {
		const body: Voucher = action.payload as Voucher;
		const response: AxiosResponse = yield call(voucherApi.edit, body);
		yield put(editVoucherSuccess(response.data.message));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(editVoucherFailed(error.response.data.message));
	}
}

function* watchDeleteVoucherFlow() {
	const type: string = deletingVoucher.type;
	yield takeEvery(type, onDeleteVoucher);
}

function* watchCreateVoucherFlow() {
	const type: string = creatingVoucher.type;
	yield takeEvery(type, onCreateVoucher);
}

function* watchGetVouchersFlow() {
	const type: string = gettingVouchers.type;
	yield takeEvery(type, onGetVouchers);
}

function* watchGetVoucherInfoFlow() {
	const type: string = gettingVoucherInfo.type;
	yield takeEvery(type, onGetVoucherInfo);
}

function* watchEditVoucherFlow() {
	const type: string = edittingVoucher.type;
	yield takeEvery(type, onEditVoucher);
}

export function* voucherSaga() {
	yield fork(watchGetVouchersFlow);
	yield fork(watchCreateVoucherFlow);
	yield fork(watchDeleteVoucherFlow);
	yield fork(watchGetVoucherInfoFlow);
	yield fork(watchEditVoucherFlow);
}
