'use client';
import { useAppDispatch } from '@/redux/hooks';
import React, { useEffect } from 'react';
import CustomerTable from './components/Table';
import { useParams } from 'next/navigation';
import { UserParams } from '@/models/userModel';
import { gettingCustomers } from '@/redux/reducers/customerReducer';

const AdminCustomerComponent = () => {
	const dispatch = useAppDispatch();
	const myParams = useParams();

	useEffect(() => {
		const params: UserParams = {
			offset: myParams?.offset as string,
			limit: myParams?.limit as string,
		};
		dispatch(gettingCustomers(params));
	}, [dispatch, myParams?.limit, myParams?.offset]);

	return (
		<div>
			<CustomerTable />
		</div>
	);
};

export default AdminCustomerComponent;
