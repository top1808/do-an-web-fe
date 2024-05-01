import { fork, put, call, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import {
	deleteHistoryImportFailed,
	deleteHistoryImportSuccess,
	deletingHistoryImportInventory,
	getInventoriesFailed,
	getInventoriesSuccess,
	getInventoryFailed,
	getInventorySuccess,
	gettingInventories,
	gettingInventory,
	importInventoryFailed,
	importInventorySuccess,
	importingInventory,
} from '../reducers/inventoryReducer';
import { HistoryImport, InventoryParams } from '@/models/inventoryModel';
import inventoryApi from '@/api/inventoryApi';

function* onGetInventories(action: PayloadAction<InventoryParams>) {
	try {
		const response: AxiosResponse = yield call(inventoryApi.getData, action.payload);
		yield put(getInventoriesSuccess(response.data.inventories));
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getInventoriesFailed(error.response.data.message));
	}
}

function* onGetInventory(action: PayloadAction<string>) {
	try {
		const response: AxiosResponse = yield call(inventoryApi.getById, action.payload);
		yield put(getInventorySuccess(response.data.inventory));
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getInventoryFailed(error.response.data.message));
	}
}

function* onImportInventory(action: PayloadAction<HistoryImport>) {
	try {
		const response: AxiosResponse = yield call(inventoryApi.importBySKU, action.payload);
		yield put(importInventorySuccess(response.data.message));
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(importInventoryFailed(error.response.data.message));
	}
}

function* onDeleteHistoryImportInventory(action: PayloadAction<HistoryImport>) {
	try {
		const response: AxiosResponse = yield call(inventoryApi.deleteHistoryImport, action.payload);
		yield put(deleteHistoryImportSuccess(response.data.message));
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(deleteHistoryImportFailed(error.response.data.message));
	}
}

function* watchGetInventoriesFlow() {
	const type: string = gettingInventories.type;
	yield takeEvery(type, onGetInventories);
}

function* watchGetInventoryFlow() {
	const type: string = gettingInventory.type;
	yield takeEvery(type, onGetInventory);
}

function* watchImportInventoryFlow() {
	const type: string = importingInventory.type;
	yield takeEvery(type, onImportInventory);
}

function* watchDeleteHistoryImportInventoryFlow() {
	const type: string = deletingHistoryImportInventory.type;
	yield takeEvery(type, onDeleteHistoryImportInventory);
}

export function* inventorySaga() {
	yield fork(watchGetInventoriesFlow);
	yield fork(watchImportInventoryFlow);
	yield fork(watchDeleteHistoryImportInventoryFlow);
	yield fork(watchGetInventoryFlow);
}
