'use client';
import { useAppDispatch } from '@/redux/hooks';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import dayjs from 'dayjs';
import { Voucher } from '@/models/voucherModel';
import { edittingVoucher, gettingVoucherInfo } from '@/redux/reducers/voucherReducer';
import VoucherForm from '../components/Form';

const AdminEditVoucherComponent = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();

	const onSubmit = (data: Voucher) => {
		data.dateEnd = dayjs(data.dateEnd).format('YYYY-MM-DD');
		data.dateStart = dayjs(data.dateStart).format('YYYY-MM-DD');
		dispatch(edittingVoucher({ ...data, _id: id as string }));
	};

	useEffect(() => {
		if (id) {
			dispatch(gettingVoucherInfo(id as string));
		}
	}, [dispatch, id]);

	return (
		<div>
			<VoucherForm onSubmit={onSubmit} />
		</div>
	);
};

export default AdminEditVoucherComponent;
