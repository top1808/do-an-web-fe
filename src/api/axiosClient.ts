import { store } from '@/redux/store';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios';
import authApi from './authApi';
import { toast } from 'react-toastify';
import { User } from '@/models/userModel';
import { loginSuccess, logoutSuccess } from '@/redux/reducers/authReducer';
import jwt_decode from 'jwt-decode';
import { DecodedToken } from '@/models/jwtModel';
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
		return res.data.accessToken;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (err: any) {
		toast.error(err.response.data.message);
		if (err.response.status === 401) {
			store.dispatch(logoutSuccess());
		}
	}
};

// Add a request interceptor
axiosClient.interceptors.request.use(
	async (config: AdaptAxiosRequestConfig) => {
		const { currentUser } = store.getState().auth;

		if (currentUser?.accessToken) {
			const currentTime = new Date().getTime() / 1000;
			const decodedToken = jwt_decode(currentUser.accessToken) as DecodedToken;
			if (decodedToken.exp < currentTime) {
				const newAccessToken = await refreshToken();
				config.headers.Authorization = `Bearer ${newAccessToken}`;
			} else {
				config.headers.Authorization = `Bearer ${currentUser?.accessToken}`;
			}
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
		return Promise.reject(error);
	},
);

export default axiosClient;
