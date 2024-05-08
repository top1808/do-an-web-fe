import { SaleChartData, SaleChartParams, StatisticModel } from '@/models/statisticModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { RootState } from '../store';

interface StatisticState {
	loading?: boolean;
	isGetDataChart?: boolean;
	productQuantity?: number;
	categoryQuantity?: number;
	orderQuantity?: number;
	customerQuantity?: number;
	salesChartData?: SaleChartData[];
	salesChartParams?: SaleChartParams;
}

const initialState: StatisticState = {
	loading: false,
	isGetDataChart: false,
	productQuantity: 0,
	categoryQuantity: 0,
	orderQuantity: 0,
	customerQuantity: 0,
	salesChartData: [],
	salesChartParams: {},
};

const statisticSlice = createSlice({
	name: 'statistic',
	initialState: initialState,
	reducers: {
		gettingStatistic: (state) => {
			state.loading = true;
		},
		getStatisticSuccess: (state, action: PayloadAction<StatisticModel>) => {
			state.loading = false;
			state.productQuantity = action.payload.productQuantity;
			state.categoryQuantity = action.payload.categoryQuantity;
			state.orderQuantity = action.payload.orderQuantity;
			state.customerQuantity = action.payload.customerQuantity;
		},
		getStatisticFailed: (state, action: PayloadAction<string>) => {
			state.loading = false;
			action.payload && toast.error(action.payload);
		},

		gettingSale: (state, action: PayloadAction<SaleChartParams>) => {
			state.isGetDataChart = true;
		},
		getSaleSuccess: (state, action: PayloadAction<{ data: SaleChartData[]; params: SaleChartParams }>) => {
			state.isGetDataChart = false;
			state.salesChartData = action.payload.data;
			state.salesChartParams = action.payload.params;
		},
		getSaleFailed: (state, action: PayloadAction<string>) => {
			state.isGetDataChart = false;
			action.payload && toast.error(action.payload);
		},
	},
});

export const { getStatisticFailed, getStatisticSuccess, gettingStatistic, getSaleFailed, getSaleSuccess, gettingSale } = statisticSlice.actions;
export const getStatisticState = (state: RootState) => state.statistic;
export default statisticSlice.reducer;
