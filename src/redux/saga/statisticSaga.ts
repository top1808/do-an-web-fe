import { fork, put, call, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { getStatisticFailed, getStatisticSuccess, gettingStatistic } from '../reducers/statisticReducer';
import statisticApi from '@/api/statisticApi';

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

function* watchGetStatisticFlow() {
	const type: string = gettingStatistic.type;
	yield takeEvery(type, onGetStatistic);
}

export function* statisticSaga() {
	yield fork(watchGetStatisticFlow);
}
