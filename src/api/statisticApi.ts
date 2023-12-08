import axiosClient from './axiosClient';

const URL = '/statistic';

const statisticApi = {
	getStatistic() {
		return axiosClient.get(URL);
	},
};

export default statisticApi;
