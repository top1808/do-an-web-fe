'use client';

import React, { useEffect } from 'react';
import TableCategories from './components/TableCategories';
import { useAppDispatch } from '@/redux/hooks';
import { gettingCategory } from '@/redux/reducers/categoryReducer';

const AdminCategoryComponent = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(gettingCategory());
	}, [dispatch]);

	return (
		<div>
			<TableCategories />
		</div>
	);
};

export default AdminCategoryComponent;
