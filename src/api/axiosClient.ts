import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios';

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
	headers: AxiosRequestHeaders;
}

console.log('process.env.API_URL: ', process.env.API_URL);

const axiosClient = axios.create({
	baseURL: process.env.API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Add a request interceptor
axiosClient.interceptors.request.use(
	(config: AdaptAxiosRequestConfig) => {
		// Do something before request is sent
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
	(error: AxiosError) => {
		return Promise.reject(error);
	},
);

export default axiosClient;
