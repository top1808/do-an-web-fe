import MBreadcrumb from '@/components/MBreadcrumb';
import MCard from '@/components/MCard';
import AdminEditProductComponent from '@/features/product/edit/Index';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
	title: 'Edit product',
	description: 'Edit product',
};

const ProductEditPage = () => {
	const breadcrumbItems = [
		{
			title: <Link href='/'>Admin</Link>,
		},
		{
			title: <Link href='/product'>Product</Link>,
		},
		{
			title: 'Edit',
		},
	];

	return (
		<>
			<MBreadcrumb items={breadcrumbItems} />
			<MCard title='Edit Product'>
				<AdminEditProductComponent />
			</MCard>
		</>
	);
};

export default ProductEditPage;
