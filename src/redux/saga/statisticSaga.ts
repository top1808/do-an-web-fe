import { fork, put, call, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { getSaleFailed, getSaleSuccess, getStatisticFailed, getStatisticSuccess, gettingSale, gettingStatistic } from '../reducers/statisticReducer';
import statisticApi from '@/api/statisticApi';
import { PayloadAction } from '@reduxjs/toolkit';
import { SaleChartParams } from '@/models/statisticModel';

function* onGetStatistic() {
	try {
		const response: AxiosResponse = yield call(statisticApi.getStatistic);

		yield put(getStatisticSuccess(response.data.data));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getStatisticFailed(error.response.data.message));
	}
}

function* onGetSale(action: PayloadAction<SaleChartParams>) {
	try {
		const response: AxiosResponse = yield call(statisticApi.getSale, action.payload);

		yield put(getSaleSuccess(response.data));
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error?.response?.status === 403) return;
		yield put(getSaleFailed(error.response.data.message));
	}
}

function* watchGetStatisticFlow() {
	const type: string = gettingStatistic.type;
	yield takeEvery(type, onGetStatistic);
}

function* watchGetSaleDataFlow() {
	const type: string = gettingSale.type;
	yield takeEvery(type, onGetSale);
}

export function* statisticSaga() {
	yield fork(watchGetStatisticFlow);
	yield fork(watchGetSaleDataFlow);
}
