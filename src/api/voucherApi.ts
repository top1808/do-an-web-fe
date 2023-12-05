import { objectToQueryString } from '@/utils/FuntionHelpers';
import axiosClient from './axiosClient';
import { Voucher, VoucherParams } from '@/models/voucherModel';

const URL = '/voucher';

const voucherApi = {
	getData(params: VoucherParams) {
		const query = objectToQueryString(params);
		return axiosClient.get(URL + query);
	},
	create(body: Voucher) {
		return axiosClient.post(URL + '/create', body);
	},
	delete(id: string) {
		return axiosClient.delete(URL + '/' + id);
	},
	getById(id: string) {
		return axiosClient.get(URL + '/' + id);
	},
	edit(body: Voucher) {
		return axiosClient.put(URL + '/update/' + body._id, body);
	},
};

export default voucherApi;
