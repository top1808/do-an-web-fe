'use client';
import { useAppDispatch } from '@/redux/hooks';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import DiscountProgramFormView from '../components/FormView';
import { gettingDiscountProgramInfo } from '@/redux/reducers/discountProgramReducer';

const AdminViewDiscountProgramComponent = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (id) {
			dispatch(gettingDiscountProgramInfo(id as string));
		}
	}, [dispatch, id]);

	return (
		<div>
			<DiscountProgramFormView />
		</div>
	);
};

export default AdminViewDiscountProgramComponent;
