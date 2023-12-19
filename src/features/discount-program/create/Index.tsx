'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React from 'react';
import dayjs from 'dayjs';

import { DiscountProgram } from '@/models/discountProgramModel';
import DiscountProgramForm from '../components/Form';
import { creatingDiscountProgram } from '@/redux/reducers/discountProgramReducer';

const AdminCreateDiscountProgramComponent = () => {
	const { discountProgram } = useAppSelector((state) => state);
	const { discountProgramPost } = discountProgram;
	const dispatch = useAppDispatch();

	const onSubmit = (data: DiscountProgram) => {
		data.dateEnd = dayjs(data.dateEnd).format('YYYY-MM-DD');
		data.dateStart = dayjs(data.dateStart).format('YYYY-MM-DD');
		const dataPost = {
			...discountProgramPost,
			...data,
		};

		dispatch(creatingDiscountProgram(dataPost));
	};

	return (
		<div>
			<DiscountProgramForm onSubmit={onSubmit} />
		</div>
	);
};

export default AdminCreateDiscountProgramComponent;
