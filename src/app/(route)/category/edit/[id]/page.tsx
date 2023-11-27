import MBreadcrumb from '@/components/MBreadcrumb';
import MCard from '@/components/MCard';
import AdminEditCategoryComponent from '@/features/category/edit/Index';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
	title: 'Edit category',
	description: 'Edit category',
};

const CategoryEditPage = () => {
	const breadcrumbItems = [
		{
			title: <Link href='/'>Admin</Link>,
		},
		{
			title: <Link href='/category'>Category</Link>,
		},
		{
			title: 'Edit',
		},
	];

	return (
		<>
			<MBreadcrumb items={breadcrumbItems} />
			<MCard title='Edit Category'>
				<AdminEditCategoryComponent />
			</MCard>
		</>
	);
};

export default CategoryEditPage;
