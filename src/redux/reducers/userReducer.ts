import { User } from '@/models/userModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

interface AuthState {
	loading: boolean;
	data?: User[];
	filter?: {
		key?: string;
		value?: string;
	};
}

const initialState: AuthState = {
	loading: false,
	data: [],
	filter: {
		key: '',
		value: '',
	},
};

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		gettingUsers: (state) => {
			state.loading = true;
		},
		getUsersSuccess: (state, action: PayloadAction<User[]>) => {
			state.loading = false;
			state.data = action.payload;
		},
		getUsersFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.data = [];
			action.payload && toast.error(action.payload);
		},

		creatingUser: (state, action: PayloadAction<User>) => {
			state.loading = true;
		},
		createUserSuccess: (state, action: PayloadAction<string>) => {
			state.loading = false;
			action.payload && toast.success(action.payload);
		},
		createUserFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			action.payload && toast.error(action.payload);
		},
	},
});

export const { gettingUsers, getUsersSuccess, getUsersFailed, creatingUser, createUserSuccess, createUserFailed } = userSlice.actions;
export default userSlice.reducer;
