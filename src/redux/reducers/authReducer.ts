import { FormLogin } from '@/models/authModel';
import { User } from '@/models/userModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useRouter } from 'next/navigation';

interface AuthState {
	isLoggedIn: boolean;
	logging: boolean;
	currentUser?: User | null;
}

const initialState: AuthState = {
	isLoggedIn: false,
	logging: false,
	currentUser: null,
};

const authSlice = createSlice({
	name: 'sideBar',
	initialState: initialState,
	reducers: {
		login(state, action: PayloadAction<FormLogin>) {
			state.logging = true;
		},
		loginSuccess(state, action: PayloadAction<FormLogin>) {
			state.logging = false;
			state.isLoggedIn = true;
			state.currentUser = action.payload;
		},
		loginFailed(state) {
			state.logging = false;
			state.isLoggedIn = false;
			state.currentUser = null;
		},

		logout(state) {
			state.logging = false;
			state.isLoggedIn = false;
			state.currentUser = null;
		},
	},
});

export const { login, loginSuccess, loginFailed, logout } = authSlice.actions;
export default authSlice.reducer;
