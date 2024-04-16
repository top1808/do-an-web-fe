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
		const dataPost: DiscountProgram = {
			...discountProgramPost,
			...data,
			products: discountProgramPost?.products?.map((item) => {
				let option1 = item?.option1 ? JSON.parse(item?.option1 || '') : null;
				option1 = option1
					? {
							groupName: Object.keys(option1)[0],
							option: Object.values(option1)[0],
					  }
					: null;
				let option2 = item?.option2 ? JSON.parse(item?.option2 || '') : null;
				option2 = option2
					? {
							groupName: Object.keys(option2)[0],
							option: Object.values(option2)[0],
					  }
					: null;
				const options = [option1, option2]?.filter((item) => item);
				return {
					...item,
					options: options,
				};
			}),
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
