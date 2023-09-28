'use client';
import MBreadcrumb from '@/components/MBreadcrumb';
import MButton from '@/components/MButton';
import MCard from '@/components/MCard';
import MRow from '@/components/MRow';
import AdminCategoryComponent from '@/features/admin/category/Index';
import { useAppDispatch } from '@/redux/hooks';
import { gettingCategory } from '@/redux/reducers/categoryReducer';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const CategoryAdminPage = () => {
	const breadcrumbItems = [
		{
			title: <Link href='/admin'>Admin</Link>,
		},
		{
			title: 'Category',
		},
	];

	const dispatch = useAppDispatch();
	const router = useRouter();

	useEffect(() => {
		dispatch(gettingCategory());
	}, [dispatch]);

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
