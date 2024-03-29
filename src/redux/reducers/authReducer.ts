import { FormLogin } from '@/models/authModel';
import { User } from '@/models/userModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { RootState } from '../store';

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
	name: 'auth',
	initialState: initialState,
	reducers: {
		login(state, action: PayloadAction<FormLogin>) {
			state.logging = true;
			if (action.payload.remember) {
				const user = {
					username: action.payload.username,
					password: action.payload.password,
				};
				localStorage.setItem('accountUser', JSON.stringify(user));
			}
		},
		loginSuccess(state, action: PayloadAction<User>) {
			state.logging = false;
			state.isLoggedIn = true;
			state.currentUser = action.payload;
		},
		loginFailed(state, action: PayloadAction<string>) {
			state.logging = false;
			action.payload && toast.error(action.payload);
		},

		logouting(state) {
			state.logging = true;
		},
		logoutSuccess(state) {
			state.logging = false;
			state.isLoggedIn = false;
			state.currentUser = null;
		},
		logoutFailed(state, action: PayloadAction<string>) {
			state.logging = false;
			action.payload && toast.error(action.payload);
		},
	},
});

export const { login, loginSuccess, loginFailed, logouting, logoutFailed, logoutSuccess } = authSlice.actions;
export const getAuthState = (state: RootState) => state.auth;
export default authSlice.reducer;
