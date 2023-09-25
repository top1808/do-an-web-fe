import { combineReducers } from '@reduxjs/toolkit';
import sideBarReducer from './sideBarReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
	sideBar: sideBarReducer,
	auth: authReducer,
	user: userReducer,
});

export default rootReducer;
