'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect } from 'react';
import { useRouter } from 'next-nprogress-bar';
import CustomerForm from '../components/Form';
import { Customer } from '@/models/customerModel';
import { creatingCustomer } from '@/redux/reducers/customerReducer';
import dayjs from 'dayjs';

const AdminCreateCustomerComponent = () => {
	const { customer } = useAppSelector((state) => state);

	const dispatch = useAppDispatch();
	const router = useRouter();

	const onSubmit = (data: Customer) => {
		data.birthday = dayjs(data.birthday).format('YYYY-MM-DD');
		dispatch(creatingCustomer(data));
	};

	useEffect(() => {
		if (customer.status === 'completed') {
			router.push('/customer');
		}
	}, [customer.status, router]);

	return (
		<div>
			<CustomerForm onSubmit={onSubmit} />
		</div>
	);
};

export default AdminCreateCustomerComponent;
