'use client';
import { useAppDispatch } from '@/redux/hooks';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import OrderForm from '../components/Form';
import { gettingOrderInfo } from '@/redux/reducers/orderReducer';

const AdminEditOrderComponent = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (id) {
			dispatch(gettingOrderInfo(id as string));
		}
	}, [dispatch, id]);

	return (
		<div>
			<OrderForm />
		</div>
	);
};

export default AdminEditOrderComponent;
