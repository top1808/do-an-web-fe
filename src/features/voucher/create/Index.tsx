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
		data.dateEnd = dayjs(data?.date?.[1]).format('YYYY-MM-DD');
		data.dateStart = dayjs(data?.date?.[0]).format('YYYY-MM-DD');
		delete data.date;
		dispatch(creatingVoucher(data));
	};

	return (
		<div>
			<VoucherForm onSubmit={onSubmit} />
		</div>
	);
};

export default AdminCreateVoucherComponent;
