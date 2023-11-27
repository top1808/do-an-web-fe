'use client';
import { useAppDispatch } from '@/redux/hooks';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import FormCreateCategory from '../components/FormCreateCategory';
import { Category } from '@/models/categoryModels';
import { edittingCategory, gettingCategoryInfo } from '@/redux/reducers/categoryReducer';

const AdminEditCategoryComponent = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();

	const onSubmit = (data: Category) => {
		dispatch(edittingCategory({ ...data, _id: id as string }));
	};

	useEffect(() => {
		if (id) {
			dispatch(gettingCategoryInfo(id as string));
		}
	}, [dispatch, id]);

	return (
		<div>
			<FormCreateCategory onSubmit={onSubmit} />
		</div>
	);
};

export default AdminEditCategoryComponent;
