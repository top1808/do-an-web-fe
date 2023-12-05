'use client';

import { useAppDispatch } from '@/redux/hooks';
import React from 'react';
import VoucherForm from '../components/Form';
import dayjs from 'dayjs';
import { Voucher } from '@/models/voucherModel';
import { creatingVoucher } from '@/redux/reducers/voucherReducer';

const AdminCreateVoucherComponent = () => {
	const dispatch = useAppDispatch();

	const onSubmit = (data: Voucher) => {
		data.dateEnd = dayjs(data.dateEnd).format('YYYY-MM-DD');
		data.dateStart = dayjs(data.dateStart).format('YYYY-MM-DD');
		dispatch(creatingVoucher(data));
	};

	return (
		<div>
			<VoucherForm onSubmit={onSubmit} />
		</div>
	);
};

export default AdminCreateVoucherComponent;
