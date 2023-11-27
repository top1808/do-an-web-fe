import MBreadcrumb from '@/components/MBreadcrumb';
import MCard from '@/components/MCard';
import AdminCreateCustomerComponent from '@/features/customer/create/Index';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
	title: 'Create customer',
	description: 'Create customer',
};

const CreateCustomerPage = () => {
	const breadcrumbItems = [
		{
			title: <Link href='/'>Admin</Link>,
		},
		{
			title: <Link href='/customer'>Customer</Link>,
		},
		{
			title: 'Create',
		},
	];

	return (
		<>
			<MBreadcrumb items={breadcrumbItems} />
			<MCard title='Create Customer'>
				<AdminCreateCustomerComponent />
			</MCard>
		</>
	);
};

export default CreateCustomerPage;
