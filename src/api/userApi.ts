import { objectToQueryString } from '@/utils/FuntionHelpers';
import axiosClient from './axiosClient';
import { User, UserParams, ChangePasswordModel } from '@/models/userModel';

const URL = '/user';

const userApi = {
	getUsers(params: UserParams) {
		const query = objectToQueryString(params);
		return axiosClient.get(URL + query);
	},
	createUser(body: User) {
		return axiosClient.post(URL + '/create', body);
	},
	deleteUser(id: string) {
		return axiosClient.delete(URL + '/' + id);
	},
	getUser(id: string) {
		return axiosClient.get(URL + '/' + id);
	},
	editUser(body: User) {
		return axiosClient.put(URL + '/update/' + body._id, body);
	},
	changePassword(body: ChangePasswordModel) {
		return axiosClient.put(URL + '/change-password/' + body.id, body);
	},
};

export default userApi;
