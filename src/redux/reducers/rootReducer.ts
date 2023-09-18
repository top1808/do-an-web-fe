import { combineReducers } from '@reduxjs/toolkit';
import sideBarReducer from './sideBarReducer';

const rootReducer = combineReducers({
	sideBar: sideBarReducer,
});

export default rootReducer;
