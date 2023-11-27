'use client';
import { useAppDispatch } from '@/redux/hooks';
import React, { useEffect } from 'react';
import UserTable from './components/Table';
import { gettingUsers } from '@/redux/reducers/userReducer';
import { useParams } from 'next/navigation';
import { UserParams } from '@/models/userModel';

const AdminUserComponent = () => {
	const dispatch = useAppDispatch();
	const myParams = useParams();

	useEffect(() => {
		const params: UserParams = {
			offset: myParams?.offset as string,
			limit: myParams?.limit as string,
		};
		dispatch(gettingUsers(params));
	}, [dispatch, myParams?.limit, myParams?.offset]);

	return (
		<div>
			<UserTable />
		</div>
	);
};

export default AdminUserComponent;
