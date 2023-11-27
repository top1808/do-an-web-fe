'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect } from 'react';
import { useRouter } from 'next-nprogress-bar';
import { Customer } from '@/models/customerModel';
import { creatingCustomer } from '@/redux/reducers/customerReducer';
import OrderForm from '../components/Form';
import { Order } from '@/models/orderModel';

const AdminCreateOrderComponent = () => {
	const { order } = useAppSelector((state) => state);

	const router = useRouter();

	useEffect(() => {
		if (order.status === 'completed') {
			router.push('/order');
		}
	}, [order.status, router]);

	return (
		<div>
			<OrderForm />
		</div>
	);
};

export default AdminCreateOrderComponent;
