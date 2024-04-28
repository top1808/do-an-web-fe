'use client';
import React, { useEffect } from 'react';
import TableProductsAdmin from './components/TableProductsAdmin';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getProductState, gettingProduct } from '@/redux/reducers/productReducer';
import MSkeleton from '@/components/MSkeleton';
import { useSearchParams } from 'next/navigation';

const AdminProductComponent = () => {
	const product = useAppSelector(getProductState);
	const dispatch = useAppDispatch();

	const params = useSearchParams();
	const limit = params.get('limit');
	const offset = params.get('offset');

	useEffect(() => {
		dispatch(
			gettingProduct({
				offset: offset || '0',
				limit: limit || '10',
			}),
		);
	}, [dispatch, limit, offset]);

	return (
		<MSkeleton loading={product.loading}>
			<TableProductsAdmin />
		</MSkeleton>
	);
};

export default AdminProductComponent;
