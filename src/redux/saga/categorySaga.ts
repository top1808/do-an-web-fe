import { fork, put, call, take, takeLatest } from 'redux-saga/effects';
import CategoryApi from '@/api/categoryApi';
import { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import {
	createCategoryFailed,
	createCategorySuccess,
	creatingCategory,
	deleteCategoryFailed,
	deleteCategorySuccess,
	deletingCategory,
	getCategorieSuccess,
	getCategoriesFailed,
	gettingCategory,
} from '../reducers/categoryReducer';
import { Category } from '@/models/categoryModels';

function* onDeleteCategory(id: string) {
	try {
		const response: AxiosResponse = yield call(CategoryApi.deleteCategory, id);
		yield put(deleteCategorySuccess({ id, message: response.data.message }));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(deleteCategoryFailed(error.response.data.message));
	}
}

function* onCreateCategory(body: Category) {
	try {
		const response: AxiosResponse = yield call(CategoryApi.createCategory, body);
		yield put(createCategorySuccess(response.data.message));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(createCategoryFailed(error.response.data.message));
	}
}

function* onGetCategories() {
	try {
		const response: AxiosResponse = yield call(CategoryApi.getCategories);
		console.log(response.data.categories);

		yield put(getCategorieSuccess(response.data.categories));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getCategoriesFailed(error.response.data.message));
	}
}

function* watchDeleteCategoryFlow() {
	const action: PayloadAction<string> = yield take(deletingCategory.type);
	yield fork(onDeleteCategory, action.payload);
}

function* watchCreateCategoryFlow() {
	const action: PayloadAction<Category> = yield take(creatingCategory.type);
	yield fork(onCreateCategory, action.payload);
}

function* watchGetCategoryFlow() {
	yield takeLatest(gettingCategory.type, onGetCategories);
}

export function* CategorySaga() {
	yield fork(watchGetCategoryFlow);
	yield fork(watchCreateCategoryFlow);
	yield fork(watchDeleteCategoryFlow);
}
