'use client';
import MBreadcrumb from '@/components/MBreadcrumb';
import MCard from '@/components/MCard';
import AdminEditUserComponent from '@/features/admin/user/edit/Index';
import { useAppDispatch } from '@/redux/hooks';
import Link from 'next/link';
import React, { useEffect } from 'react';

const UserPage = () => {
	const breadcrumbItems = [
		{
			title: <Link href='/admin'>Admin</Link>,
		},
		{
			title: <Link href='/admin/user'>User</Link>,
		},
		{
			title: 'Edit',
		},
	];

	const dispatch = useAppDispatch();

	useEffect(() => {}, [dispatch]);

	return (
		<>
			<MBreadcrumb items={breadcrumbItems} />
			<MCard title='Edit User'>
				<AdminEditUserComponent />
			</MCard>
		</>
	);
};

export default UserPage;
