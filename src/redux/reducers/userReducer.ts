import { ReponseDeleteSuccess } from '@/models/reponseModel';
import { User } from '@/models/userModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

interface AuthState {
	loading: boolean;
	status: 'pending' | 'completed' | 'failed';
	data?: User[];
}

const initialState: AuthState = {
	loading: false,
	status: 'pending',
	data: [],
};

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		gettingUsers: (state) => {
			state.loading = true;
			state.status = 'pending';
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
			state.status = 'pending';
		},
		createUserSuccess: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'completed';
			action.payload && toast.success(action.payload);
		},
		createUserFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.status = 'failed';
			action.payload && toast.error(action.payload);
		},

		deletingUser: (state, action: PayloadAction<string>) => {
			state.loading = true;
		},
		deleteUserSuccess: (state, action: PayloadAction<ReponseDeleteSuccess>) => {
			state.loading = false;
			state.data = state.data?.filter((item) => item._id !== action.payload.id);
			action.payload && toast.success(action.payload.message);
		},
		deleteUserFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			action.payload && toast.error(action.payload);
		},
	},
});

export const { gettingUsers, getUsersSuccess, getUsersFailed, creatingUser, createUserSuccess, createUserFailed, deleteUserFailed, deleteUserSuccess, deletingUser } = userSlice.actions;
export default userSlice.reducer;
