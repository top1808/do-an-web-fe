import MBreadcrumb from '@/components/MBreadcrumb';
import MCard from '@/components/MCard';
import AdminViewDiscountProgramComponent from '@/features/discount-program/view/Index';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
	title: 'View discount program',
	description: 'View discount program',
};

const DiscountProgramViewPage = () => {
	const breadcrumbItems = [
		{
			title: <Link href='/'>Admin</Link>,
		},
		{
			title: <Link href='/discount-program'>Discount Program</Link>,
		},
		{
			title: 'View',
		},
	];

	return (
		<>
			<MBreadcrumb items={breadcrumbItems} />
			<MCard title='View Discount program'>
				<AdminViewDiscountProgramComponent />
			</MCard>
		</>
	);
};

export default DiscountProgramViewPage;
