'use client';
import React, { useEffect } from 'react';
import TableProductsAdmin from './components/TableProductsAdmin';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { gettingProduct } from '@/redux/reducers/productReducer';
import MSkeleton from '@/components/MSkeleton';

const AdminProductComponent = () => {
	const { product } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(gettingProduct());
	}, [dispatch]);

	return (
		<MSkeleton loading={product.loading}>
			<TableProductsAdmin />
		</MSkeleton>
	);
};

export default AdminProductComponent;
