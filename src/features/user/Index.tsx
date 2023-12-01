'use client';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect } from 'react';
import UserTable from './components/Table';
import { gettingUsers } from '@/redux/reducers/userReducer';
import { useParams } from 'next/navigation';
import { UserParams } from '@/models/userModel';
import MSkeleton from '@/components/MSkeleton';

const AdminUserComponent = () => {
	const { user } = useAppSelector((state) => state);
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
		<MSkeleton loading={user.loading}>
			<UserTable />
		</MSkeleton>
	);
};

export default AdminUserComponent;
