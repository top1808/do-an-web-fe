'use client';

import React, { useEffect } from 'react';
import TableCategories from './components/TableCategories';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getCategoryState, gettingCategory } from '@/redux/reducers/categoryReducer';
import MSkeleton from '@/components/MSkeleton';

const AdminCategoryComponent = () => {
	const category = useAppSelector(getCategoryState);

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
