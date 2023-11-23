import { objectToQueryString } from '@/utils/FuntionHelpers';
import axiosClient from './axiosClient';
import { Customer, CustomerParams } from '@/models/customerModel';

const URL = '/customer';

const customerApi = {
	getAll(params: CustomerParams) {
		const query = objectToQueryString(params);
		return axiosClient.get(URL + query);
	},
	create(body: Customer) {
		return axiosClient.post(URL + '/create', body);
	},
	delete(id: string) {
		return axiosClient.delete(URL + '/' + id);
	},
	getById(id: string) {
		return axiosClient.get(URL + '/' + id);
	},
	edit(body: Customer) {
		return axiosClient.put(URL + '/update/' + body.id, body);
	},
};

export default customerApi;
