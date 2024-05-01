import { objectToQueryString } from '@/utils/FuntionHelpers';
import axiosClient from './axiosClient';
import { ReviewParams } from '@/models/reviewModel';

const URL = '/review';

const reviewApi = {
	getData(params: ReviewParams | null) {
		const query = objectToQueryString(params);
		return axiosClient.get(URL + query);
	},
};

export default reviewApi;
