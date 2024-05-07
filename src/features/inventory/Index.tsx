'use client';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import MSkeleton from '@/components/MSkeleton';
import InventoryTable from './components/Table';
import { getInventoryState, gettingInventories } from '@/redux/reducers/inventoryReducer';
import ModalImport from './components/ModalImport';
import ModalHistoryImport from './components/ModalHistoryImport';
import { getModalState } from '@/redux/reducers/modalReducer';
import InventoryFilterComponent from './components/InventoryFilterComponent';
import { InventoryParams } from '@/models/inventoryModel';

const AdminInventoryComponent = () => {
	const inventory = useAppSelector(getInventoryState);
	const modal = useAppSelector(getModalState);
	const dispatch = useAppDispatch();
	const myParams = useParams();

	useEffect(() => {
		const params: InventoryParams = {
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
			<InventoryFilterComponent />
			<InventoryTable />
		</MSkeleton>
	);
};

export default AdminInventoryComponent;
