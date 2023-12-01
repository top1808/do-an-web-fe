'use client';

import { useAppDispatch } from '@/redux/hooks';
import React from 'react';
import { Category } from '@/models/categoryModels';
import { creatingCategory } from '@/redux/reducers/categoryReducer';
import FormCreateCategory from '../components/FormCreateCategory';

const AdminCreateCategoryComponent = () => {
	const dispatch = useAppDispatch();

	const onSubmit = (data: Category) => {
		dispatch(creatingCategory(data));
	};

	return (
		<div>
			<FormCreateCategory onSubmit={onSubmit} />
		</div>
	);
};

export default AdminCreateCategoryComponent;
