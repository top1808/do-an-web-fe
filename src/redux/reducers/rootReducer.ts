import { combineReducers } from '@reduxjs/toolkit';
import sideBarReducer from './sideBarReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import categoryReducer from './categoryReducer';
import productReducer from './productReducer';
import roleReducer from './roleReducer';
import customerReducer from './customerReducer';
import orderReducer from './orderReducer';
import voucherReducer from './voucherReducer';

const rootReducer = combineReducers({
	sideBar: sideBarReducer,
	auth: authReducer,
	user: userReducer,
	customer: customerReducer,
	order: orderReducer,
	category: categoryReducer,
	product: productReducer,
	voucher: voucherReducer,
	role: roleReducer,
});

export default rootReducer;
