import MBreadcrumb from '@/components/MBreadcrumb';
import MCard from '@/components/MCard';
import AdminEditDiscountProgramComponent from '@/features/discount-program/edit/Index';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
	title: 'Edit Discount Program',
	description: 'Edit Discount Program',
};

const DiscountProgramEditPage = () => {
	const breadcrumbItems = [
		{
			title: <Link href='/'>Admin</Link>,
		},
		{
			title: <Link href='/discount-program'>Discount Program</Link>,
		},
		{
			title: 'Edit',
		},
	];

	return (
		<>
			<MBreadcrumb items={breadcrumbItems} />
			<MCard title='Edit Discount Program'>
				<AdminEditDiscountProgramComponent />
			</MCard>
		</>
	);
};

export default DiscountProgramEditPage;
