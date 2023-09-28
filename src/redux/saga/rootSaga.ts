import { all } from 'redux-saga/effects';
import { authSaga } from './authSaga';
import { userSaga } from './userSaga';
import { CategorySaga } from './categorySaga';

export function* rootSaga() {
	yield all([authSaga(), userSaga(), CategorySaga()]);
}
