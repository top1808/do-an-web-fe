import { objectToQueryString } from '@/utils/FuntionHelpers';
import axiosClient from './axiosClient';
import { DiscountProgram, DiscountProgramParams, PayloadChangeStatusDiscountProgram } from '@/models/discountProgramModel';

const URL = '/discount-program';

const discountProgramApi = {
	getData(params: DiscountProgramParams) {
		const query = objectToQueryString(params);
		return axiosClient.get(URL + query);
	},
	create(body: DiscountProgram) {
		return axiosClient.post(URL + '/create', body);
	},
	delete(id: string) {
		return axiosClient.delete(URL + '/' + id);
	},
	getById(id: string) {
		return axiosClient.get(URL + '/' + id);
	},
	edit(body: DiscountProgram) {
		return axiosClient.put(URL + '/update/' + body._id, body);
	},
	changeStatusDiscountProgram(body: PayloadChangeStatusDiscountProgram) {
		return axiosClient.put(URL + '/change-status/' + body.id, body);
	},
};

export default discountProgramApi;
