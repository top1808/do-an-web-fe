import axiosClient from './axiosClient';

const URL = '/user';

const userApi = {
	getUsers() {
		return axiosClient.get(URL);
	},
};

export default userApi;
