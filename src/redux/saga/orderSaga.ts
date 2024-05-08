import { fork, put, call, takeEvery } from 'redux-saga/effects';

import { AxiosResponse } from 'axios';
import { CreateAction, DeleteAction } from '@/models/actionModel';
import {
	changeStatusOrderFailed,
	changeStatusOrderSuccess,
	changingStatusOrder,
	createOrderFailed,
	createOrderSuccess,
	creatingOrder,
	deleteOrderFailed,
	deleteOrderSuccess,
	deletingOrder,
	editOrderFailed,
	editOrderSuccess,
	edittingOrder,
	getOrderInfoFailed,
	getOrderInfoSuccess,
	getOrdersFailed,
	getOrdersSuccess,
	gettingOrderInfo,
	gettingOrders,
} from '../reducers/orderReducer';
import { Order, OrderParams, PayloadChangeStatusOrder } from '@/models/orderModel';
import orderApi from '@/api/orderApi';
import { PayloadAction } from '@reduxjs/toolkit';

function* onDeleteOrder(action: DeleteAction) {
	try {
		const id = action.payload as string;
		const response: AxiosResponse = yield call(orderApi.delete, id);
		yield put(deleteOrderSuccess({ id, message: response.data.message }));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(deleteOrderFailed(error.response.data.message));
	}
}

function* onCreateOrder(action: CreateAction<Order>) {
	try {
		const body: Order = action.payload as Order;
		const response: AxiosResponse = yield call(orderApi.create, body);
		yield put(createOrderSuccess(response.data.message));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(createOrderFailed(error.response.data.message));
	}
}

function* onGetOrders(action: CreateAction<OrderParams>) {
	try {
		const params: OrderParams = action.payload as OrderParams;
		const response: AxiosResponse = yield call(orderApi.getAll, params);
		yield put(getOrdersSuccess(response.data));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getOrdersFailed(error.response.data.message));
	}
}

function* onGetOrderInfo(action: CreateAction<string>) {
	try {
		const id: string = action.payload as string;
		const response: AxiosResponse = yield call(orderApi.getById, id);
		yield put(getOrderInfoSuccess(response.data.order));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getOrderInfoFailed(error.response.data.message));
	}
}

function* onEditOrder(action: CreateAction<Order>) {
	try {
		const body: Order = action.payload as Order;
		const response: AxiosResponse = yield call(orderApi.edit, body);
		yield put(editOrderSuccess(response.data.message));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(editOrderFailed(error.response.data.message));
	}
}

function* onChangeStatusOrder(action: PayloadAction<PayloadChangeStatusOrder>) {
	try {
		const response: AxiosResponse = yield call(orderApi.changeStatusOrder, action.payload);
		yield put(changeStatusOrderSuccess(response.data));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(changeStatusOrderFailed(error.response.data.message));
	}
}

function* watchDeleteOrderFlow() {
	const type: string = deletingOrder.type;
	yield takeEvery(type, onDeleteOrder);
}

function* watchCreateOrderFlow() {
	const type: string = creatingOrder.type;
	yield takeEvery(type, onCreateOrder);
}

function* watchGetOrdersFlow() {
	const type: string = gettingOrders.type;
	yield takeEvery(type, onGetOrders);
}

function* watchGetOrderFlow() {
	const type: string = gettingOrderInfo.type;
	yield takeEvery(type, onGetOrderInfo);
}

function* watchEditOrderFlow() {
	const type: string = edittingOrder.type;
	yield takeEvery(type, onEditOrder);
}

function* watchChangeStatusOrderFlow() {
	const type: string = changingStatusOrder.type;
	yield takeEvery(type, onChangeStatusOrder);
}

export function* orderSaga() {
	yield fork(watchGetOrdersFlow);
	yield fork(watchCreateOrderFlow);
	yield fork(watchDeleteOrderFlow);
	yield fork(watchGetOrderFlow);
	yield fork(watchEditOrderFlow);
	yield fork(watchChangeStatusOrderFlow);
}
