'use client';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { UserParams } from '@/models/userModel';
import OrderTable from './components/Table';
import { gettingOrders } from '@/redux/reducers/orderReducer';
import MSkeleton from '@/components/MSkeleton';

const AdminOrderComponent = () => {
	const { order } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();
	const myParams = useSearchParams();
	const limit = myParams.get('limit');
	const offset = myParams.get('offset');

	useEffect(() => {
		const params: UserParams = {
			offset: offset as string,
			limit: limit as string,
		};
		dispatch(gettingOrders(params));
	}, [dispatch, limit, offset, order.isChangingStatus]);

	return (
		<MSkeleton loading={order.loading}>
			<OrderTable />
		</MSkeleton>
	);
};

export default AdminOrderComponent;
