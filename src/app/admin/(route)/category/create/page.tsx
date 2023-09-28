'use client';
import MBreadcrumb from '@/components/MBreadcrumb';
import MCard from '@/components/MCard';
import AdminCreateCategoryComponent from '@/features/admin/category/createCategory/Index';
import { useAppDispatch } from '@/redux/hooks';
import Link from 'next/link';
import React, { useEffect } from 'react';

const CreateUserPage = () => {
	const breadcrumbItems = [
		{
			title: <Link href='/admin'>Admin</Link>,
		},
		{
			title: <Link href='/admin/category'>Category</Link>,
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
				<AdminCreateCategoryComponent />
			</MCard>
		</>
	);
};

export default CreateUserPage;
