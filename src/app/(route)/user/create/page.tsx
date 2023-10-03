import MBreadcrumb from '@/components/MBreadcrumb';
import MCard from '@/components/MCard';
import AdminCreateUserComponent from '@/features/admin/user/create/Index';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
	title: 'Create user',
	description: 'Create user',
};

const CreateUserPage = () => {
	const breadcrumbItems = [
		{
			title: <Link href='/'>Admin</Link>,
		},
		{
			title: <Link href='/user'>User</Link>,
		},
		{
			title: 'Create',
		},
	];

	return (
		<>
			<MBreadcrumb items={breadcrumbItems} />
			<MCard title='Create User'>
				<AdminCreateUserComponent />
			</MCard>
		</>
	);
};

export default CreateUserPage;
