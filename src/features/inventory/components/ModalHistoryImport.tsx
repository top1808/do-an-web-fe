import MButtonDelete from '@/components/MButtonDelete';
import MSkeleton from '@/components/MSkeleton';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deletingHistoryImportInventory, getInventoryState, gettingInventory } from '@/redux/reducers/inventoryReducer';
import { getModalState, toggleModalHistoryImportInventory } from '@/redux/reducers/modalReducer';
import { customMoney, customNumber, formatDateTimeToRender } from '@/utils/FuntionHelpers';
import { Modal } from 'antd';
import React, { useEffect } from 'react';

const ModalHistoryImport = () => {
	const modal = useAppSelector(getModalState);
	const inventory = useAppSelector(getInventoryState);

	const dispatch = useAppDispatch();

	const { productImport } = modal;

	useEffect(() => {
		if (modal.isOpenModalHistoryImport && !inventory.isDeleting) {
			dispatch(gettingInventory(productImport?._id as string));
		}
	}, [dispatch, modal.isOpenModalHistoryImport, productImport?._id, inventory.isDeleting]);

	if (!modal.isOpenModalHistoryImport) return <></>;

	return (
		<Modal
			title='History Import Inventory'
			open={modal.isOpenModalHistoryImport}
			onCancel={() => dispatch(toggleModalHistoryImportInventory(null))}
			forceRender
			footer={null}
		>
			<MSkeleton loading={inventory.isGettingInventory}>
				<div className='text-xl text-center'>
					{inventory?.inventory?.product?.name} -{' '}
					{inventory?.inventory?.productSKU?.options?.[0] ? `${inventory?.inventory?.productSKU?.options?.[0]?.groupName}: ${inventory?.inventory?.productSKU?.options?.[0]?.option}` : ''}
					{inventory?.inventory?.productSKU?.options?.[1] ? `, ${inventory?.inventory?.productSKU?.options?.[1]?.groupName}: ${inventory?.inventory?.productSKU?.options?.[1]?.option}` : ''}
				</div>
				{(inventory?.inventory?.historyImport?.length || 0) > 0 ? (
					inventory?.inventory?.historyImport?.map((item, index) => (
						<div
							key={item._id}
							className='p-2 border border-solid border-gray-400 rounded mt-2 flex justify-between items-center'
						>
							<div className='text-base'>
								<div>
									Date: <strong>{formatDateTimeToRender(item.createdAt)}</strong>
								</div>
								<div>
									Quantity: <strong>{customNumber(item.quantityImport as number)}</strong>
								</div>
								<div>
									Price: <strong>{customMoney(item.priceImport as number)}</strong>{' '}
								</div>
							</div>
							<div>
								{index === 0 && (
									<MButtonDelete
										title={`Delete history import at ${formatDateTimeToRender(item.createdAt)}`}
										onConfirm={() => dispatch(deletingHistoryImportInventory({ _id: item._id, inventoryId: inventory?.inventory?._id }))}
										loading={inventory.isDeleting}
									/>
								)}
							</div>
						</div>
					))
				) : (
					<div className='text-base text-center mt-4'>No Record.</div>
				)}
			</MSkeleton>
		</Modal>
	);
};

export default ModalHistoryImport;
