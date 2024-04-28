import MBreadcrumb from '@/components/MBreadcrumb';
import MCard from '@/components/MCard';
import AdminInventoryComponent from '@/features/inventory/Index';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
	title: 'Inventory',
	description: 'Inventory',
};

const InventoryPage = () => {
	const breadcrumbItems = [
		{
			title: <Link href='/'>Admin</Link>,
		},
		{
			title: 'Inventory',
		},
	];

	return (
		<>
			<MBreadcrumb items={breadcrumbItems} />
			<MCard>
				<AdminInventoryComponent />
			</MCard>
		</>
	);
};

export default InventoryPage;
