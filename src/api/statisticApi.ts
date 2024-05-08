import { SaleChartParams } from '@/models/statisticModel';
import axiosClient from './axiosClient';

const URL = '/statistic';

const statisticApi = {
	getStatistic() {
		return axiosClient.get(URL);
	},
	getSale({ startDate, endDate }: SaleChartParams) {
		return axiosClient.get(URL + `/get-sale-of-range?startDate=${startDate}&endDate=${endDate}`);
	},
};

export default statisticApi;
