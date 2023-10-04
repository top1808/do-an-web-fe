'use client';
import React, { useEffect } from 'react';
import TableProductsAdmin from './components/TableProductsAdmin';
import { useAppDispatch } from '@/redux/hooks';
import { gettingProduct } from '@/redux/reducers/productReducer';

const AdminProductComponent = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(gettingProduct());
	}, [dispatch]);

	return (
		<div>
			<TableProductsAdmin />
		</div>
	);
};

export default AdminProductComponent;
