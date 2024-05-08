'use client';

import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getStatisticState, gettingStatistic } from '@/redux/reducers/statisticReducer';
import { faBox, faBoxesStacked, faDolly, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useEffect } from 'react';
import SaleChart from './components/SaleChart';

interface DashboardComponentProps {}

const DashboardComponent = (props: DashboardComponentProps) => {
	const statistic = useAppSelector(getStatisticState);
	const dispatch = useAppDispatch();

	const items = [
		{
			icon: <FontAwesomeIcon icon={faBox} />,
			title: 'Product',
			content: statistic.productQuantity,
			link: '/product',
		},
		{
			icon: <FontAwesomeIcon icon={faBoxesStacked} />,
			title: 'Category',
			content: statistic.categoryQuantity,
			link: '/category',
		},
		{
			icon: <FontAwesomeIcon icon={faUser} />,
			title: 'Customer',
			content: statistic.customerQuantity,
			link: '/customer',
		},
		{
			icon: <FontAwesomeIcon icon={faDolly} />,
			title: 'order',
			content: statistic.orderQuantity,
			link: '/order',
		},
	];

	useEffect(() => {
		dispatch(gettingStatistic());
	}, [dispatch]);

	return (
		<div>
			<MRow gutter={8}>
				{items.map((item) => (
					<MCol
						span={6}
						key={item.title}
					>
						<Link href={item.link}>
							<div className='shadow-md'>
								<div className='flex items-center w-full'>
									<div className='font-bold text-5xl bg-blue-400 text-white p-6 px-8'>{item.icon}</div>
									<div className='text-center p-2 w-full'>
										<div className='text-2xl font-bold'>{item.content}</div>
										<div className='text-base'>{item.title}</div>
									</div>
								</div>
							</div>
						</Link>
					</MCol>
				))}
				<MCol span={24}>
					<SaleChart />
				</MCol>
			</MRow>
		</div>
	);
};

export default DashboardComponent;
