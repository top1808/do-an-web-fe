'use client';
import { useAppDispatch } from '@/redux/hooks';
import React from 'react';
import FormCreateProduct from '../components/FormCreateProduct';
import { creatingProduct } from '@/redux/reducers/productReducer';
import { Product } from '@/models/productModels';

const CreateProductComponent = () => {
	const dispatch = useAppDispatch();

	const onSubmit = (data: Product) => {
		dispatch(creatingProduct(data));
	};

	return (
		<div>
			<FormCreateProduct onSubmit={onSubmit} />
		</div>
	);
};

export default CreateProductComponent;
