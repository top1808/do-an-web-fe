import { all } from 'redux-saga/effects';
import { authSaga } from './authSaga';
import { userSaga } from './userSaga';
import { CategorySaga } from './categorySaga';
import { ProductSaga } from './productSaga';
import { RoleSaga } from './roleSaga';
import { customerSaga } from './customerSaga';

export function* rootSaga() {
	yield all([authSaga(), userSaga(), customerSaga(), CategorySaga(), ProductSaga(), RoleSaga()]);
}
