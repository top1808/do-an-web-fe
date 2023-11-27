import { fork, put, call, takeEvery } from 'redux-saga/effects';

import { AxiosResponse } from 'axios';
import { CreateAction, DeleteAction } from '@/models/actionModel';
import { Customer, CustomerParams } from '@/models/customerModel';
import {
	createCustomerFailed,
	createCustomerSuccess,
	creatingCustomer,
	deleteCustomerFailed,
	deleteCustomerSuccess,
	deletingCustomer,
	editCustomerFailed,
	editCustomerSuccess,
	edittingCustomer,
	getCustomerInfoFailed,
	getCustomerInfoSuccess,
	getCustomersFailed,
	getCustomersSuccess,
	gettingCustomerInfo,
	gettingCustomers,
} from '../reducers/customerReducer';
import customerApi from '@/api/customerApi';

function* onDeleteCustomer(action: DeleteAction) {
	try {
		const id = action.payload as string;
		const response: AxiosResponse = yield call(customerApi.delete, id);
		yield put(deleteCustomerSuccess({ id, message: response.data.message }));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(deleteCustomerFailed(error.response.data.message));
	}
}

function* onCreateCustomer(action: CreateAction<Customer>) {
	try {
		const body: Customer = action.payload as Customer;
		const response: AxiosResponse = yield call(customerApi.create, body);
		yield put(createCustomerSuccess(response.data.message));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(createCustomerFailed(error.response.data.message));
	}
}

function* onGetCustomers(action: CreateAction<CustomerParams>) {
	try {
		const params: CustomerParams = action.payload as CustomerParams;
		const response: AxiosResponse = yield call(customerApi.getAll, params);
		yield put(getCustomersSuccess(response.data.customers));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getCustomersFailed(error.response.data.message));
	}
}

function* onGetCustomerInfo(action: CreateAction<string>) {
	try {
		const id: string = action.payload as string;
		const response: AxiosResponse = yield call(customerApi.getById, id);
		yield put(getCustomerInfoSuccess(response.data.customer));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getCustomerInfoFailed(error.response.data.message));
	}
}

function* onEditCustomer(action: CreateAction<Customer>) {
	try {
		const body: Customer = action.payload as Customer;
		const response: AxiosResponse = yield call(customerApi.edit, body);
		yield put(editCustomerSuccess(response.data.message));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(editCustomerFailed(error.response.data.message));
	}
}

function* watchDeleteCustomerFlow() {
	const type: string = deletingCustomer.type;
	yield takeEvery(type, onDeleteCustomer);
}

function* watchCreateCustomerFlow() {
	const type: string = creatingCustomer.type;
	yield takeEvery(type, onCreateCustomer);
}

function* watchGetCustomersFlow() {
	const type: string = gettingCustomers.type;
	yield takeEvery(type, onGetCustomers);
}

function* watchGetCustomerFlow() {
	const type: string = gettingCustomerInfo.type;
	yield takeEvery(type, onGetCustomerInfo);
}

function* watchEditCustomerFlow() {
	const type: string = edittingCustomer.type;
	yield takeEvery(type, onEditCustomer);
}

export function* customerSaga() {
	yield fork(watchGetCustomersFlow);
	yield fork(watchCreateCustomerFlow);
	yield fork(watchDeleteCustomerFlow);
	yield fork(watchGetCustomerFlow);
	yield fork(watchEditCustomerFlow);
}
