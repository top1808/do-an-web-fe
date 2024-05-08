'use client';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
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
	const myParams = useSearchParams();
	const limit = myParams.get('limit');
	const offset = myParams.get('offset');
	const currentQuantity = myParams.get('currentQuantity');

	useEffect(() => {
		const params: InventoryParams = {
			offset: offset || '',
			limit: limit || '20',
			currentQuantity: currentQuantity as string,
		};
		if (!modal.isOpenModalHistoryImport && !inventory.isImporting) {
			dispatch(gettingInventories(params));
		}
	}, [dispatch, limit, offset, inventory.isImporting, modal.isOpenModalHistoryImport, inventory.filterByCurrentQuantity, currentQuantity]);

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
