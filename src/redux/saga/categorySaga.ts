import { fork, put, call, takeEvery } from 'redux-saga/effects';
import CategoryApi from '@/api/categoryApi';
import { AxiosResponse } from 'axios';
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
import { CreateAction } from '@/models/actionModel';

function* onDeleteCategory(action: CreateAction<string>) {
	try {
		const id = action.payload as string;
		const response: AxiosResponse = yield call(CategoryApi.deleteCategory, id);
		yield put(deleteCategorySuccess({ id, message: response.data.message }));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(deleteCategoryFailed(error.response.data.message));
	}
}

function* onCreateCategory(action: CreateAction<Category>) {
	try {
		const response: AxiosResponse = yield call(CategoryApi.createCategory, action.payload as Category);
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
		yield put(getCategorieSuccess(response.data.categories));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getCategoriesFailed(error.response.data.message));
	}
}

function* watchDeleteCategoryFlow() {
	yield takeEvery(deletingCategory.type, onDeleteCategory);
}

function* watchCreateCategoryFlow() {
	yield takeEvery(creatingCategory.type, onCreateCategory);
}

function* watchGetCategoryFlow() {
	yield takeEvery(gettingCategory.type, onGetCategories);
}

export function* CategorySaga() {
	yield fork(watchGetCategoryFlow);
	yield fork(watchCreateCategoryFlow);
	yield fork(watchDeleteCategoryFlow);
}
