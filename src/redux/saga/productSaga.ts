import { fork, put, call, take, takeLatest, takeEvery } from 'redux-saga/effects';
import productApi from '@/api/productApi';
import { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import {
	createProductFailed,
	createProductSuccess,
	creatingProduct,
	deleteProductFailed,
	deleteProductSuccess,
	deletingProduct,
	getProductsFailed,
	getProductsSuccess,
	gettingProduct,
} from '../reducers/productReducer';
import { Product } from '@/models/productModels';
import { CreateAction, DeleteAction } from '@/models/actionModel';

function* onDeleteProduct(action: DeleteAction) {
	try {
		const id = action.payload as string;
		const response: AxiosResponse = yield call(productApi.deleteProduct, id);
		yield put(deleteProductSuccess({ id, message: response.data.message }));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(deleteProductFailed(error.response.data.message));
	}
}

function* onCreateProduct(action: CreateAction<Product>) {
	try {
		const response: AxiosResponse = yield call(productApi.createProduct, action.payload as Product);
		yield put(createProductSuccess(response.data.message));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(createProductFailed(error.response.data.message));
	}
}

function* onGetProducts() {
	try {
		const response: AxiosResponse = yield call(productApi.getProducts);
		yield put(getProductsSuccess(response.data.products));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getProductsFailed(error.response.data.message));
	}
}

function* watchDeleteProductFlow() {
	yield takeEvery(deletingProduct.type, onDeleteProduct);
}

function* watchCreateProductFlow() {
	yield takeEvery(creatingProduct.type, onCreateProduct);
}

function* watchGetProductFlow() {
	yield takeEvery(gettingProduct.type, onGetProducts);
}

export function* ProductSaga() {
	yield fork(watchGetProductFlow);
	yield fork(watchCreateProductFlow);
	yield fork(watchDeleteProductFlow);
}
