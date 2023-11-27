'use client';
import { useAppDispatch } from '@/redux/hooks';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { edittingCustomer, gettingCustomerInfo } from '@/redux/reducers/customerReducer';
import CustomerForm from '../components/Form';
import dayjs from 'dayjs';
import { Customer } from '@/models/customerModel';

const AdminEditCustomerComponent = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();

	const onSubmit = (data: Customer) => {
		data.birthday = dayjs(data.birthday).format('YYYY-MM-DD');
		dispatch(edittingCustomer({ ...data, id: id as string }));
	};

	useEffect(() => {
		if (id) {
			dispatch(gettingCustomerInfo(id as string));
		}
	}, [dispatch, id]);

	return (
		<div>
			<CustomerForm onSubmit={onSubmit} />
		</div>
	);
};

export default AdminEditCustomerComponent;
