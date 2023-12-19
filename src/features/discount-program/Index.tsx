'use client';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import MSkeleton from '@/components/MSkeleton';
import { gettingDiscountPrograms } from '@/redux/reducers/discountProgramReducer';
import { DiscountProgramParams } from '@/models/discountProgramModel';
import DiscountProgramTable from './components/Table';

const AdminDiscountProgramComponent = () => {
	const { discountProgram } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();
	const myParams = useSearchParams();
	const limit = myParams.get('limit');
	const offset = myParams.get('offset');

	useEffect(() => {
		const params: DiscountProgramParams = {
			offset: offset as string,
			limit: limit as string,
		};
		dispatch(gettingDiscountPrograms(params));
	}, [dispatch, limit, offset]);

	return (
		<MSkeleton loading={discountProgram.loading}>
			<DiscountProgramTable />
		</MSkeleton>
	);
};

export default AdminDiscountProgramComponent;
