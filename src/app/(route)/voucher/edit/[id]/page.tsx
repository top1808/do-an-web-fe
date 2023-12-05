import MBreadcrumb from '@/components/MBreadcrumb';
import MCard from '@/components/MCard';
import AdminEditVoucherComponent from '@/features/voucher/edit/Index';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
	title: 'Edit voucher',
	description: 'Edit voucher',
};

const VoucherEditPage = () => {
	const breadcrumbItems = [
		{
			title: <Link href='/'>Admin</Link>,
		},
		{
			title: <Link href='/voucher'>Voucher</Link>,
		},
		{
			title: 'Edit',
		},
	];

	return (
		<>
			<MBreadcrumb items={breadcrumbItems} />
			<MCard title='Edit voucher'>
				<AdminEditVoucherComponent />
			</MCard>
		</>
	);
};

export default VoucherEditPage;
