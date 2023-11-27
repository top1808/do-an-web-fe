import MBreadcrumb from '@/components/MBreadcrumb';
import MCard from '@/components/MCard';
import AdminCreateOrderComponent from '@/features/order/create/Index';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
	title: 'Create order',
	description: 'Create order',
};

const CreateOrderPage = () => {
	const breadcrumbItems = [
		{
			title: <Link href='/'>Admin</Link>,
		},
		{
			title: <Link href='/order'>Order</Link>,
		},
		{
			title: 'Create',
		},
	];

	return (
		<>
			<MBreadcrumb items={breadcrumbItems} />
			<MCard title='Create Order'>
				<AdminCreateOrderComponent />
			</MCard>
		</>
	);
};

export default CreateOrderPage;
