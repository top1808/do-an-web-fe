import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Category } from '@/models/categoryModels';
import { creatingCategory } from '@/redux/reducers/categoryReducer';
import FormCreateCategory from '../components/FormCreateCategory';

const AdminCreateCategoryComponent = () => {
	const { category } = useAppSelector((state) => state);

	const dispatch = useAppDispatch();
	const router = useRouter();

	const onSubmit = (data: Category) => {
		dispatch(creatingCategory(data));
	};

	useEffect(() => {
		if (category.status === 'completed') {
			router.push('/admin/category');
		}
	}, [category.status, router]);

	return (
		<div>
			<FormCreateCategory onSubmit={onSubmit} />
		</div>
	);
};

export default AdminCreateCategoryComponent;
