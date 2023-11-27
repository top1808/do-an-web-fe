import MBreadcrumb from '@/components/MBreadcrumb';
import MCard from '@/components/MCard';
import AdminEditCustomerComponent from '@/features/customer/edit/Index';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
	title: 'Edit customer',
	description: 'Edit customer',
};

const CustomerEditPage = () => {
	const breadcrumbItems = [
		{
			title: <Link href='/'>Admin</Link>,
		},
		{
			title: <Link href='/customer'>Customer</Link>,
		},
		{
			title: 'Edit',
		},
	];

	return (
		<>
			<MBreadcrumb items={breadcrumbItems} />
			<MCard title='Edit Customer'>
				<AdminEditCustomerComponent />
			</MCard>
		</>
	);
};

export default CustomerEditPage;
