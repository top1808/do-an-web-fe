import { objectToQueryString } from '@/utils/FuntionHelpers';
import axiosClient from './axiosClient';
import { Order, OrderParams, PayloadChangeStatusOrder } from '@/models/orderModel';

const URL = '/order';

const orderApi = {
	getAll(params: OrderParams) {
		const query = objectToQueryString(params);
		return axiosClient.get(URL + query);
	},
	create(body: Order) {
		return axiosClient.post(URL + '/create', body);
	},
	delete(id: string) {
		return axiosClient.delete(URL + '/' + id);
	},
	getById(id: string) {
		return axiosClient.get(URL + '/' + id);
	},
	edit(body: Order) {
		return axiosClient.put(URL + '/update/' + body._id, body);
	},
	changeStatusOrder(body: PayloadChangeStatusOrder) {
		return axiosClient.put(URL + '/change-status/' + body.id, body);
	},
};

export default orderApi;
