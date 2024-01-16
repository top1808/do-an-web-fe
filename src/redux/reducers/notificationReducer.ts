import { NotificationModel } from '@/models/notificationModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

interface NotificationState {
	isLoading?: boolean;
	token?: string;
	data?: NotificationModel[];
}

const initialState: NotificationState = {
	isLoading: false,
	token: '',
	data: [],
};

const notificationSlice = createSlice({
	name: 'notification',
	initialState: initialState,
	reducers: {
		setToken(state, action: PayloadAction<string>) {
			state.token = action.payload;
		},
	},
});

export const { setToken } = notificationSlice.actions;
export default notificationSlice.reducer;
