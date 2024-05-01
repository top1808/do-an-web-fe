'use client';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect } from 'react';
import CustomerTable from './components/Table';
import { useParams } from 'next/navigation';
import { getCustomerState, gettingCustomers } from '@/redux/reducers/customerReducer';
import MSkeleton from '@/components/MSkeleton';
import { CustomerParams } from '@/models/customerModel';

const AdminCustomerComponent = () => {
	const customer = useAppSelector(getCustomerState);
	const dispatch = useAppDispatch();
	const myParams = useParams();

	useEffect(() => {
		const params: CustomerParams = {
			offset: myParams?.offset as string,
			limit: myParams?.limit as string,
		};
		dispatch(gettingCustomers(params));
	}, [dispatch, myParams?.limit, myParams?.offset]);

	return (
		<MSkeleton loading={customer.loading}>
			<CustomerTable />
		</MSkeleton>
	);
};

export default AdminCustomerComponent;
