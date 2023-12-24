import MBreadcrumb from '@/components/MBreadcrumb';
import MCard from '@/components/MCard';
import AdminViewOrderComponent from '@/features/order/view/Index';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
	title: 'View order',
	description: 'View order',
};

const OrderViewPage = () => {
	const breadcrumbItems = [
		{
			title: <Link href='/'>Admin</Link>,
		},
		{
			title: <Link href='/order'>Order</Link>,
		},
		{
			title: 'View',
		},
	];

	return (
		<>
			<MBreadcrumb items={breadcrumbItems} />
			<MCard title='View Order'>
				<AdminViewOrderComponent />
			</MCard>
		</>
	);
};

export default OrderViewPage;
