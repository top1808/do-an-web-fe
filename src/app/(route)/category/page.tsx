import MBreadcrumb from '@/components/MBreadcrumb';
import MButton from '@/components/MButton';
import MCard from '@/components/MCard';
import MRow from '@/components/MRow';
import AdminCategoryComponent from '@/features/category/Index';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
	title: 'Category',
	description: 'category',
};

const CategoryAdminPage = () => {
	const breadcrumbItems = [
		{
			title: <Link href='/'>Admin</Link>,
		},
		{
			title: 'Category',
		},
	];

	return (
		<>
			<MBreadcrumb items={breadcrumbItems} />
			<MCard
				title={
					<MRow
						gutter={4}
						justify='end'
					>
						<MButton
							type='primary'
							icon={<FontAwesomeIcon icon={faPlus} />}
							link='category/create'
						>
							Add New
						</MButton>
					</MRow>
				}
			>
				<AdminCategoryComponent />
			</MCard>
		</>
	);
};

export default CategoryAdminPage;
