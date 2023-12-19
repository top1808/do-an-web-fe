import MBreadcrumb from '@/components/MBreadcrumb';
import MCard from '@/components/MCard';
import AdminCreateDiscountProgramComponent from '@/features/discount-program/create/Index';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
	title: 'Create Discount Program',
	description: 'Create Discount Program',
};

const CreateDiscountProgramPage = () => {
	const breadcrumbItems = [
		{
			title: <Link href='/'>Admin</Link>,
		},
		{
			title: <Link href='/discount-program'>Discount Program</Link>,
		},
		{
			title: 'Create',
		},
	];

	return (
		<>
			<MBreadcrumb items={breadcrumbItems} />
			<MCard title='Create Discount Program'>
				<AdminCreateDiscountProgramComponent />
			</MCard>
		</>
	);
};

export default CreateDiscountProgramPage;
