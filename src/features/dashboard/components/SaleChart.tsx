import React, { useCallback, useEffect } from 'react';
import { Column, ColumnConfig } from '@ant-design/plots';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getStatisticState, gettingSale } from '@/redux/reducers/statisticReducer';
import { SaleChartData } from '@/models/statisticModel';

import { formatDate, formatDateToRender, getDateFromNumberPastByNow, shortenCurrency } from '@/utils/FuntionHelpers';
import { DatePicker, Skeleton } from 'antd';
import dayjs from 'dayjs';
import MRow from '@/components/MRow';
import MCol from '@/components/MCol';
import MTitle from '@/components/MTitle';

interface SaleChartProps {}

const SaleChart = (props: SaleChartProps) => {
	const dispatch = useAppDispatch();
	const statistic = useAppSelector(getStatisticState);

	const dataChart = statistic.salesChartData?.reduce((acc: SaleChartData[], elm: SaleChartData) => {
		return [...acc, { date: elm.date, value: elm.totalAmount || 0, field: 'Total Amount' }, { date: elm.date, value: elm.totalQuantity || 0, field: 'Total Quantity' }];
	}, []);

	const config: ColumnConfig = {
		title: {
			align: 'center',
			title: 'Sales Chart',
		},
		data: dataChart,
		xField: (d: SaleChartData) => formatDateToRender(d.date),
		yField: 'value',
		colorField: 'field',
		style: {
			inset: 5,
		},
		axis: {
			y: { labelFormatter: '~s' },
		},
		tooltip: (d) => ({
			title: formatDateToRender(d.date),
			value: shortenCurrency(d.value),
		}),
	};

	const onGetDataChart = useCallback(
		(startDate?: string, endDate?: string) => {
			if (startDate && endDate) {
				dispatch(gettingSale({ startDate: startDate, endDate: endDate }));
			}
		},
		[dispatch],
	);

	useEffect(() => {
		onGetDataChart(getDateFromNumberPastByNow(30), formatDate());
	}, [dispatch, onGetDataChart]);

	return (
		<div className='mt-4 bg-white p-2'>
			<MRow className='mb-2'>
				<MCol
					xs={24}
					lg={6}
				>
					<MTitle level={5}>Select Date Range</MTitle>
					<DatePicker.RangePicker
						format='DD/MM/YYYY'
						allowClear={false}
						size='large'
						style={{ width: '100%' }}
						placeholder={['From', 'To']}
						disabledDate={(current) => {
							return dayjs().add(0, 'days') <= current;
						}}
						value={[dayjs(statistic.salesChartParams?.startDate), dayjs(statistic.salesChartParams?.endDate)]}
						onChange={(value) => {
							const [startDate, endDate] = value || [];
							onGetDataChart(formatDate(startDate), formatDate(endDate));
						}}
					/>
				</MCol>
			</MRow>
			<Skeleton loading={statistic.isGetDataChart}>
				<Column {...config} />
			</Skeleton>
		</div>
	);
};

export default SaleChart;
