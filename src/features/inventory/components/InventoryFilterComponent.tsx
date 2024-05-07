import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MSelect from '@/components/MSelect';
import { FILTER_INVENTORY } from '@/constants';
import { InventoryParams } from '@/models/inventoryModel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getInventoryState, gettingInventories } from '@/redux/reducers/inventoryReducer';
import { useParams } from 'next/navigation';
import React from 'react';

interface Props {}

const InventoryFilterComponent = (props: Props) => {
	const inventory = useAppSelector(getInventoryState);
	const dispatch = useAppDispatch();
	const myParams = useParams();
	const handleChange = (value: string) => {
		const params: InventoryParams = {
			offset: myParams?.offset as string,
			limit: myParams?.limit as string,
			currentQuantity: value,
		};
		dispatch(gettingInventories(params));
	};
	return (
		<MRow className='mb-4'>
			<MCol span={6}>
				<MSelect
					style={{ width: '100%' }}
					onChange={handleChange}
					value={inventory.filterByCurrentQuantity}
					options={FILTER_INVENTORY}
					size='large'
				/>
			</MCol>
		</MRow>
	);
};

export default InventoryFilterComponent;
