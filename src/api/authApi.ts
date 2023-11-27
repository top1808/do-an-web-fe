import axiosClient from './axiosClient';
import { FormLogin } from '../models/authModel';
import axios from 'axios';

const baseUrl = process.env.API_URL;

const URL = 'auth';

const authApi = {
	login(body: FormLogin) {
		return axios.post(baseUrl + URL + '/login', body, {
			withCredentials: true,
		});
	},
	refreshToken() {
		return axios.post(
			baseUrl + URL + '/refresh',
			{},
			{
				withCredentials: true,
			},
		);
	},
	logout() {
		return axiosClient.post(URL + '/logout');
	},
};

export default authApi;
