'use client';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import MSkeleton from '@/components/MSkeleton';
import { ReviewParams } from '@/models/reviewModel';
import InventoryTable from './components/Table';
import { getInventoryState, gettingInventories } from '@/redux/reducers/inventoryReducer';
import ModalImport from './components/ModalImport';
import ModalHistoryImport from './components/ModalHistoryImport';
import { getModalState } from '@/redux/reducers/modalReducer';

const AdminInventoryComponent = () => {
	const inventory = useAppSelector(getInventoryState);
	const modal = useAppSelector(getModalState);
	const dispatch = useAppDispatch();
	const myParams = useParams();

	useEffect(() => {
		const params: ReviewParams = {
			offset: myParams?.offset as string,
			limit: myParams?.limit as string,
		};
		if (!modal.isOpenModalHistoryImport && !inventory.isImporting) {
			dispatch(gettingInventories(params));
		}
	}, [dispatch, myParams?.limit, myParams?.offset, inventory.isImporting, modal.isOpenModalHistoryImport]);

	return (
		<MSkeleton loading={inventory.loading}>
			<ModalImport />
			<ModalHistoryImport />
			<InventoryTable />
		</MSkeleton>
	);
};

export default AdminInventoryComponent;
