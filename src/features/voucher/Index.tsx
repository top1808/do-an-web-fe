'use client';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import MSkeleton from '@/components/MSkeleton';
import { VoucherParams } from '@/models/voucherModel';
import { gettingVouchers } from '@/redux/reducers/voucherReducer';
import VoucherTable from './components/Table';

const AdminVoucherComponent = () => {
	const { voucher } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();
	const myParams = useParams();

	useEffect(() => {
		const params: VoucherParams = {
			offset: myParams?.offset as string,
			limit: myParams?.limit as string,
		};
		dispatch(gettingVouchers(params));
	}, [dispatch, myParams?.limit, myParams?.offset]);

	return (
		<MSkeleton loading={voucher.loading}>
			<VoucherTable />
		</MSkeleton>
	);
};

export default AdminVoucherComponent;
