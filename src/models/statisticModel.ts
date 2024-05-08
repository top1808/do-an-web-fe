export interface StatisticModel {
	productQuantity?: number;
	categoryQuantity?: number;
	orderQuantity?: number;
	customerQuantity?: number;
}

export interface SaleChartParams {
	startDate?: string;
	endDate?: string;
}

export interface SaleChartData {
	date?: string;
	totalAmount?: number;
	totalQuantity?: number;
}
