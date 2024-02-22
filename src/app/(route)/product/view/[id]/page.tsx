import MBreadcrumb from '@/components/MBreadcrumb';
import MCard from '@/components/MCard';
import AdminViewProductComponent from '@/features/product/view/Index';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
	title: 'View product',
	description: 'View product',
};

const ProductViewPage = () => {
	const breadcrumbItems = [
		{
			title: <Link href='/'>Admin</Link>,
		},
		{
			title: <Link href='/product'>Product</Link>,
		},
		{
			title: 'View',
		},
	];

	return (
		<>
			<MBreadcrumb items={breadcrumbItems} />
			<MCard title='View Product'>
				<AdminViewProductComponent />
			</MCard>
		</>
	);
};

export default ProductViewPage;
