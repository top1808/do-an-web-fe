import MBreadcrumb from '@/components/MBreadcrumb';
import MCard from '@/components/MCard';
import AdminCreateVoucherComponent from '@/features/voucher/create/Index';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
	title: 'Create voucher',
	description: 'Create voucher',
};

const CreateVoucherPage = () => {
	const breadcrumbItems = [
		{
			title: <Link href='/'>Admin</Link>,
		},
		{
			title: <Link href='/voucher'>Voucher</Link>,
		},
		{
			title: 'Create',
		},
	];

	return (
		<>
			<MBreadcrumb items={breadcrumbItems} />
			<MCard title='Create Voucher'>
				<AdminCreateVoucherComponent />
			</MCard>
		</>
	);
};

export default CreateVoucherPage;
