import { fork, put, call, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { getReviewsFailed, getReviewsSuccess, gettingReviews } from '../reducers/reviewReducer';
import { PayloadAction } from '@reduxjs/toolkit';
import { ReviewParams } from '@/models/reviewModel';
import reviewApi from '@/api/reviewApi';

function* onGetReviews(action: PayloadAction<ReviewParams | null>) {
	try {
		const response: AxiosResponse = yield call(reviewApi.getData, action.payload);
		yield put(getReviewsSuccess(response.data.reviews));
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getReviewsFailed(error.response.data.message));
	}
}

function* watchGetReviewsFlow() {
	const type: string = gettingReviews.type;
	yield takeEvery(type, onGetReviews);
}

export function* reviewSaga() {
	yield fork(watchGetReviewsFlow);
}
