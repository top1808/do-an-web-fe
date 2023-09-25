import { store } from '@/redux/store';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios';
import authApi from './authApi';
import { toast } from 'react-toastify';
import { User } from '@/models/userModel';
import { loginSuccess, logout } from '@/redux/reducers/authReducer';
interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
	headers: AxiosRequestHeaders;
}

const axiosClient = axios.create({
	baseURL: process.env.API_URL,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	},
	withCredentials: true,
	timeout: 5000,
});

const refreshToken = async () => {
	try {
		const { currentUser } = store.getState().auth;

		const res = await authApi.refreshToken();
		const newUser: User = {
			...currentUser,
			accessToken: res.data.accessToken,
		};
		store.dispatch(loginSuccess(newUser));
		return res.data;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (err: any) {
		toast.error(err.response.data.message);
		if (err.response.status === 401) {
			store.dispatch(logout());
		}
	}
};

// Add a request interceptor
axiosClient.interceptors.request.use(
	async (config: AdaptAxiosRequestConfig) => {
		const { currentUser } = store.getState().auth;

		if (currentUser?.accessToken) {
			config.headers.Authorization = `Bearer ${currentUser?.accessToken}`;
		}
		return config;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	},
);

// Add a response interceptor
axiosClient.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	async (error: AxiosError<AdaptAxiosRequestConfig>) => {
		const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
		if (originalRequest && error?.response?.status === 403 && !originalRequest._retry) {
			originalRequest._retry = true;
			const access_token = await refreshToken();
			if (access_token) {
				axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
				return axiosClient(originalRequest);
			}
		}

		return Promise.reject(error);
	},
);

export default axiosClient;
