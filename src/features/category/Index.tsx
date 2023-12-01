'use client';

import React, { useEffect } from 'react';
import TableCategories from './components/TableCategories';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { gettingCategory } from '@/redux/reducers/categoryReducer';
import MSkeleton from '@/components/MSkeleton';

const AdminCategoryComponent = () => {
	const { category } = useAppSelector((state) => state);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(gettingCategory());
	}, [dispatch]);

	return (
		<MSkeleton loading={category.loading}>
			<TableCategories />
		</MSkeleton>
	);
};

export default AdminCategoryComponent;
