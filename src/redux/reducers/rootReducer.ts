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
import statisticReducer from './statisticReducer';
import discountProgramReducer from './discountProgramReducer';
import modalReducer from './modalReducer';
import notificationReducer from './notificationReducer';
import chatbotReducer from './chatbotReducer';
import reviewReducer from './reviewReducer';

const rootReducer = combineReducers({
	sideBar: sideBarReducer,
	auth: authReducer,
	user: userReducer,
	customer: customerReducer,
	order: orderReducer,
	category: categoryReducer,
	product: productReducer,
	voucher: voucherReducer,
	discountProgram: discountProgramReducer,
	role: roleReducer,
	modal: modalReducer,
	statistic: statisticReducer,
	notification: notificationReducer,
	review: reviewReducer,
	chatbot: chatbotReducer,
});

export default rootReducer;
