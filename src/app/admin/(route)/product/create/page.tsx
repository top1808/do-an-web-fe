'use client';
import MBreadcrumb from '@/components/MBreadcrumb';
import MCard from '@/components/MCard';
import CreateProductComponent from '@/features/admin/product/create/Index';
import { useAppDispatch } from '@/redux/hooks';
import Link from 'next/link';
import { useEffect } from 'react';

const CreateProduct = () => {
	const breadcrumbItems = [
		{
			title: <Link href='/admin'>Admin</Link>,
		},
		{
			title: <Link href='/admin/product'>Product</Link>,
		},
		{
			title: 'Create',
		},
	];

	const dispatch = useAppDispatch();

	useEffect(() => {}, [dispatch]);

	return (
		<>
			<MBreadcrumb items={breadcrumbItems} />
			<MCard title='Create User'>
				<CreateProductComponent />
			</MCard>
		</>
	);
};

export default CreateProduct;
