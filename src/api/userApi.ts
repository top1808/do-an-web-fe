import axiosClient from './axiosClient';
import { User } from '@/models/userModel';

const URL = '/user';

const userApi = {
	getUsers() {
		return axiosClient.get(URL);
	},
	createUser(body: User) {
		return axiosClient.post(URL + '/create', body);
	},
};

export default userApi;
