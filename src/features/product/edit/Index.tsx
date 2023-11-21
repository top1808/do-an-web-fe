'use client';
import { useAppDispatch } from '@/redux/hooks';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Product } from '@/models/productModels';
import FormCreateProduct from '../components/FormCreateProduct';
import { edittingProduct, gettingProductInfo } from '@/redux/reducers/productReducer';

const AdminEditProductComponent = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();

	const onSubmit = (data: Product) => {
		dispatch(edittingProduct({ ...data, _id: id as string }));
	};

	useEffect(() => {
		if (id) {
			dispatch(gettingProductInfo(id as string));
		}
	}, [dispatch, id]);

	return (
		<div>
			<FormCreateProduct onSubmit={onSubmit} />
		</div>
	);
};

export default AdminEditProductComponent;
