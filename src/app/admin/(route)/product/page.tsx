'use client';
import MBreadcrumb from '@/components/MBreadcrumb';
import MButton from '@/components/MButton';
import MCard from '@/components/MCard';
import MRow from '@/components/MRow';
import AdminProductComponent from '@/features/admin/product/Index';
import { useAppDispatch } from '@/redux/hooks';
import { gettingProduct } from '@/redux/reducers/productReducer';
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
			title: 'Product',
		},
	];

	const dispatch = useAppDispatch();
	const router = useRouter();

	useEffect(() => {
		dispatch(gettingProduct());
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
							link='product/create'
						>
							Add New
						</MButton>
					</MRow>
				}
			>
				<AdminProductComponent />
			</MCard>
		</>
	);
};

export default CategoryAdminPage;
