import { NotificationModel, NotificationParams } from '@/models/notificationModel';
import { PaginationModel } from '@/models/reponseModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

interface NotificationState {
	isLoading?: boolean;
	isLoadingMore?: boolean;
	token?: string;
	data?: NotificationModel[];
	pagination?: PaginationModel;
}

const initialState: NotificationState = {
	isLoading: false,
	isLoadingMore: false,
	token: '',
	data: [],
	pagination: {
		total: 0,
		totalNew: 0,
		offset: 0,
		limit: 10,
		page: 1,
	},
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
		getNotificationsSuccess: (state, action: PayloadAction<{ data?: NotificationModel[]; pagination?: PaginationModel }>) => {
			state.isLoading = false;
			state.data = action.payload.data;
			state.pagination = action.payload.pagination;
		},
		getNotificationsFailed: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.data = [];
			action.payload && toast.error(action.payload);
		},

		gettingMoreNotifications: (state, action: PayloadAction<NotificationParams | null>) => {
			state.isLoadingMore = true;
		},
		getMoreNotificationsSuccess: (state, action: PayloadAction<{ data?: NotificationModel[]; pagination?: PaginationModel }>) => {
			state.isLoadingMore = false;
			state.data = [...(state.data || []), ...(action.payload.data || [])];
			state.pagination = action.payload.pagination;
		},
		getMoreNotificationsFailed: (state, action: PayloadAction<string>) => {
			state.isLoadingMore = false;
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
			action.payload && toast.error(action.payload);
		},
	},
});

export const {
	getMoreNotificationsFailed,
	getMoreNotificationsSuccess,
	gettingMoreNotifications,
	setToken,
	getNotificationsFailed,
	getNotificationsSuccess,
	gettingNotifications,
	readNotificationsFailed,
	readNotificationsSuccess,
	readingNotifications,
} = notificationSlice.actions;
export default notificationSlice.reducer;
