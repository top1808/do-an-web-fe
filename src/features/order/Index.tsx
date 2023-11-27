'use client';
import { useAppDispatch } from '@/redux/hooks';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { UserParams } from '@/models/userModel';
import OrderTable from './components/Table';
import { gettingOrders } from '@/redux/reducers/orderReducer';

const AdminOrderComponent = () => {
	const dispatch = useAppDispatch();
	const myParams = useParams();

	useEffect(() => {
		const params: UserParams = {
			offset: myParams?.offset as string,
			limit: myParams?.limit as string,
		};
		dispatch(gettingOrders(params));
	}, [dispatch, myParams?.limit, myParams?.offset]);

	return (
		<div>
			<OrderTable />
		</div>
	);
};

export default AdminOrderComponent;
