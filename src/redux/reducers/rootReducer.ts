import { combineReducers } from '@reduxjs/toolkit';
import sideBarReducer from './sideBarReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
	sideBar: sideBarReducer,
	auth: authReducer,
});

export default rootReducer;
