import MCol from '@/components/MCol';
import MRow from '@/components/MRow';
import MSelect from '@/components/MSelect';
import { FILTER_INVENTORY } from '@/constants';
import { InventoryParams } from '@/models/inventoryModel';
import { objectToQueryString } from '@/utils/FuntionHelpers';
import { useRouter } from 'next-nprogress-bar';
import { useSearchParams } from 'next/navigation';
import React from 'react';

interface Props {}

const InventoryFilterComponent = (props: Props) => {
	const router = useRouter();
	const myParams = useSearchParams();
	const handleChange = (value: string) => {
		const params: InventoryParams = {
			offset: '0',
			limit: myParams.get('limit') || '20',
			currentQuantity: value,
		};
		const query = objectToQueryString(params);

		router.replace('/inventory' + query);
	};
	return (
		<MRow className='mb-4'>
			<MCol span={6}>
				<MSelect
					style={{ width: '100%' }}
					onChange={handleChange}
					value={myParams.get('currentQuantity') || 'all'}
					options={FILTER_INVENTORY}
					size='large'
				/>
			</MCol>
		</MRow>
	);
};

export default InventoryFilterComponent;
