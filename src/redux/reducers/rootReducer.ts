import { combineReducers } from '@reduxjs/toolkit';
import sideBarReducer from './sideBarReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import categoryReducer from './categoryReducer';
import productReducer from './productReducer';
import roleReducer from './roleReducer';

const rootReducer = combineReducers({
	sideBar: sideBarReducer,
	auth: authReducer,
	user: userReducer,
	category: categoryReducer,
	product: productReducer,
	role: roleReducer,
});

export default rootReducer;
