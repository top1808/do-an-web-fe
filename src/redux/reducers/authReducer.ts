import { FormLogin } from '@/models/authModel';
import { User } from '@/models/userModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

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
			state.isLoggedIn = false;
			state.currentUser = null;
			toast.error(action.payload);
		},

		logout(state) {
			state.logging = false;
			state.isLoggedIn = false;
		},
	},
});

export const { login, loginSuccess, loginFailed, logout } = authSlice.actions;
export default authSlice.reducer;
