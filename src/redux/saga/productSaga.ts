import { fork, put, call, takeEvery } from 'redux-saga/effects';
import productApi from '@/api/productApi';
import { AxiosResponse } from 'axios';
import {
	createProductFailed,
	createProductSuccess,
	creatingProduct,
	deleteProductFailed,
	deleteProductSuccess,
	deletingProduct,
	editProductFailed,
	editProductSuccess,
	edittingProduct,
	getAllProductFailed,
	getAllProductSuccess,
	getProductInfoFailed,
	getProductInfoSuccess,
	getProductsFailed,
	getProductsSuccess,
	gettingAllProduct,
	gettingProduct,
	gettingProductInfo,
} from '../reducers/productReducer';
import { Product, ProductParams } from '@/models/productModels';
import { CreateAction, DeleteAction } from '@/models/actionModel';
import { PayloadAction } from '@reduxjs/toolkit';

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

function* onGetProducts(action: PayloadAction<ProductParams>) {
	try {
		const response: AxiosResponse = yield call(productApi.getProducts, action.payload);
		yield put(getProductsSuccess({ products: response?.data?.products, pagination: response?.data?.pagination }));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getProductsFailed(error.response.data.message));
	}
}

function* onGetAllProduct() {
	try {
		const response: AxiosResponse = yield call(productApi.getAllProduct);
		console.log('🚀 ~ file: productSaga.ts:65 ~ function*onGetAllProduct ~ response:', response);
		yield put(getAllProductSuccess({ products: response?.data?.products }));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getAllProductFailed(error.response.data.message));
	}
}

function* onGetProductInfo(action: CreateAction<string>) {
	try {
		const id: string = action.payload as string;
		const response: AxiosResponse = yield call(productApi.getProductInfo, id);
		yield put(getProductInfoSuccess(response.data.product));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getProductInfoFailed(error.response.data.message));
	}
}

function* onEditProduct(action: CreateAction<Product>) {
	try {
		const body: Product = action.payload as Product;
		const response: AxiosResponse = yield call(productApi.editProduct, body);
		yield put(editProductSuccess(response.data.message));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(editProductFailed(error.response.data.message));
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

function* watchGetAllProductFlow() {
	yield takeEvery(gettingAllProduct.type, onGetAllProduct);
}

function* watchGetProductInfoFlow() {
	const type: string = gettingProductInfo.type;
	yield takeEvery(type, onGetProductInfo);
}

function* watchEditProductFlow() {
	const type: string = edittingProduct.type;
	yield takeEvery(type, onEditProduct);
}

export function* ProductSaga() {
	yield fork(watchGetProductFlow);
	yield fork(watchGetAllProductFlow);
	yield fork(watchCreateProductFlow);
	yield fork(watchDeleteProductFlow);
	yield fork(watchGetProductInfoFlow);
	yield fork(watchEditProductFlow);
}
