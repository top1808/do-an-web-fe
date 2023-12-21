'use client';

import { useAppDispatch } from '@/redux/hooks';
import React from 'react';
import CustomerForm from '../components/Form';
import { Customer } from '@/models/customerModel';
import { creatingCustomer } from '@/redux/reducers/customerReducer';
import dayjs from 'dayjs';

const AdminCreateCustomerComponent = () => {
	const dispatch = useAppDispatch();

	const onSubmit = (data: Customer) => {
		data.birthday = dayjs(data.birthday).format('YYYY-MM-DD');
		dispatch(creatingCustomer(data));
	};

	return (
		<div>
			<CustomerForm onSubmit={onSubmit} />
		</div>
	);
};

export default AdminCreateCustomerComponent;
