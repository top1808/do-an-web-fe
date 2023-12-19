'use client';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import dayjs from 'dayjs';
import { Voucher } from '@/models/voucherModel';
import DiscountProgramForm from '../components/Form';
import { edittingDiscountProgram, gettingDiscountProgramInfo } from '@/redux/reducers/discountProgramReducer';

const AdminEditDiscountProgramComponent = () => {
	const { id } = useParams();
	const { discountProgram } = useAppSelector((state) => state);
	const { discountProgramPost } = discountProgram;
	const dispatch = useAppDispatch();

	const onSubmit = (data: Voucher) => {
		data.dateEnd = dayjs(data.dateEnd).format('YYYY-MM-DD');
		data.dateStart = dayjs(data.dateStart).format('YYYY-MM-DD');
		const dataPost = {
			...discountProgramPost,
			...data,
		};
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
