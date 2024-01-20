import { NotificationModel, NotificationParams } from '@/models/notificationModel';
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

		gettingNotifications: (state, action: PayloadAction<NotificationParams | null>) => {
			state.isLoading = true;
		},
		getNotificationsSuccess: (state, action: PayloadAction<NotificationModel[]>) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		getNotificationsFailed: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.data = [];
			action.payload && toast.error(action.payload);
		},

		readingNotifications: (state, action: PayloadAction<string>) => {
			state.isLoading = true;
		},
		readNotificationsSuccess: (state) => {
			state.isLoading = false;
		},
		readNotificationsFailed: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.data = [];
			action.payload && toast.error(action.payload);
		},
	},
});

export const { setToken, getNotificationsFailed, getNotificationsSuccess, gettingNotifications, readNotificationsFailed, readNotificationsSuccess, readingNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
