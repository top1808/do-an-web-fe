'use client';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import dayjs from 'dayjs';
import DiscountProgramForm from '../components/Form';
import { edittingDiscountProgram, getDiscountProgramState, gettingDiscountProgramInfo } from '@/redux/reducers/discountProgramReducer';
import { DiscountProgram } from '@/models/discountProgramModel';

const AdminEditDiscountProgramComponent = () => {
	const { id } = useParams();
	const discountProgram = useAppSelector(getDiscountProgramState);

	const { discountProgramPost } = discountProgram;
	const dispatch = useAppDispatch();

	const onSubmit = (data: DiscountProgram) => {
		data.dateEnd = dayjs(data?.date?.[1]).format('YYYY-MM-DD');
		data.dateStart = dayjs(data?.date?.[0]).format('YYYY-MM-DD');
		const dataPost = {
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

		dispatch(edittingDiscountProgram({ ...dataPost, _id: id as string }));
	};

	useEffect(() => {
		if (id) {
			dispatch(gettingDiscountProgramInfo(id as string));
		}
	}, [dispatch, id]);

	return (
		<div>
			<DiscountProgramForm onSubmit={onSubmit} />
		</div>
	);
};

export default AdminEditDiscountProgramComponent;
