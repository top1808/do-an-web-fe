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
		data.dateEnd = dayjs(data?.date?.[1]).format('YYYY-MM-DD');
		data.dateStart = dayjs(data?.date?.[0]).format('YYYY-MM-DD');
		const dataPost = {
			...discountProgramPost,
			...data,
		};
		delete dataPost?.date;

		dispatch(creatingDiscountProgram(dataPost));
	};

	return (
		<div>
			<DiscountProgramForm onSubmit={onSubmit} />
		</div>
	);
};

export default AdminCreateDiscountProgramComponent;
