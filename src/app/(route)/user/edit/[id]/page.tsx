import MBreadcrumb from '@/components/MBreadcrumb';
import MCard from '@/components/MCard';
import AdminEditUserComponent from '@/features/user/edit/Index';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
	title: 'Edit user',
	description: 'Edit user',
};

const UserEditPage = () => {
	const breadcrumbItems = [
		{
			title: <Link href='/'>Admin</Link>,
		},
		{
			title: <Link href='/user'>User</Link>,
		},
		{
			title: 'Edit',
		},
	];

	return (
		<>
			<MBreadcrumb items={breadcrumbItems} />
			<MCard title='Edit User'>
				<AdminEditUserComponent />
			</MCard>
		</>
	);
};

export default UserEditPage;
