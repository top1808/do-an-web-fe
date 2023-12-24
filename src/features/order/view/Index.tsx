'use client';
import { useAppDispatch } from '@/redux/hooks';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { gettingOrderInfo } from '@/redux/reducers/orderReducer';
import OrderFormView from '../components/FormView';

const AdminViewOrderComponent = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (id) {
			dispatch(gettingOrderInfo(id as string));
		}
	}, [dispatch, id]);

	return (
		<div>
			<OrderFormView />
		</div>
	);
};

export default AdminViewOrderComponent;
