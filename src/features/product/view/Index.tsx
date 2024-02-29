'use client';
import { useAppDispatch } from '@/redux/hooks';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { gettingProductInfo } from '@/redux/reducers/productReducer';
import FormViewProduct from '../components/FormView';

const AdminViewProductComponent = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (id) {
			dispatch(gettingProductInfo(id as string));
		}
	}, [dispatch, id]);

	return (
		<div>
			<FormViewProduct />
		</div>
	);
};

export default AdminViewProductComponent;
