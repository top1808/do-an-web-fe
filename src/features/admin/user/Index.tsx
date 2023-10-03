'use client';
import { useAppDispatch } from '@/redux/hooks';
import React, { useEffect } from 'react';
import UserTable from './components/Table';
import { gettingUsers } from '@/redux/reducers/userReducer';

const AdminUserComponent = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(gettingUsers());
	}, [dispatch]);
	return (
		<div>
			<UserTable />
		</div>
	);
};

export default AdminUserComponent;
