import { all } from 'redux-saga/effects';
import { authSaga } from './authSaga';
import { userSaga } from './userSaga';
import { CategorySaga } from './categorySaga';
import { ProductSaga } from './productSaga';
import { RoleSaga } from './roleSaga';

export function* rootSaga() {
	yield all([authSaga(), userSaga(), CategorySaga(), ProductSaga(), RoleSaga()]);
}
