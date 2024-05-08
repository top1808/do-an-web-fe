import MButton from '@/components/MButton';
import MSpace from '@/components/MSpace';
import MTable from '@/components/MTable';
import { Inventory } from '@/models/inventoryModel';
import { Review } from '@/models/reviewModel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getInventoryState } from '@/redux/reducers/inventoryReducer';
import { toggleModalHistoryImportInventory, toggleModalImportInventory } from '@/redux/reducers/modalReducer';
import { customNumber, objectToQueryString } from '@/utils/FuntionHelpers';
import { faArrowUpFromBracket, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnsType } from 'antd/es/table';
import { TablePaginationConfig } from 'antd/es/table/interface';
import { useRouter } from 'next-nprogress-bar';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const InventoryTable = () => {
	const inventory = useAppSelector(getInventoryState);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const myParams = useSearchParams();

	const onChangeTable = (pagination: TablePaginationConfig) => {
		let offset = ((pagination?.current || 1) - 1) * (pagination.pageSize || 0);
		const limit = pagination.pageSize;
		if (limit !== inventory.pagination?.limit) offset = 0;
		const query = objectToQueryString({ offset, limit, currentQuantity: myParams.get('currentQuantity') || 'all' });

		router.replace('/inventory' + query);
	};

	const columns: ColumnsType<Review> = [
		{
			title: '#',
			dataIndex: 'index',
			key: 'index',
			width: 50,
		},
		{
			title: 'Product SKU Barcode',
			key: 'operation',
			width: 200,
			render: (item: Review) => item?.productSKU?.barcode,
		},
		{
			title: 'Product Name',
			key: 'operation',
			width: 200,
			render: (item: Review) => item?.product?.name,
		},
		{
			title: 'Option 1',
			key: 'operation',
			width: 80,
			render: (item: Review) => (item?.productSKU?.options?.[0] ? `${item?.productSKU?.options?.[0]?.groupName}: ${item?.productSKU?.options?.[0]?.option}` : ''),
		},
		{
			title: 'Option 2',
			key: 'operation',
			width: 100,
			render: (item: Review) => (item?.productSKU?.options?.[1] ? `${item?.productSKU?.options?.[1]?.groupName}: ${item?.productSKU?.options?.[1]?.option}` : ''),
		},
		{
			title: 'Original Quantity',
			dataIndex: 'originalQuantity',
			key: 'originalQuantity',
			width: 140,
			render: customNumber,
		},
		{
			title: 'Sold Quantity',
			dataIndex: 'soldQuantity',
			key: 'soldQuantity',
			width: 140,
			render: customNumber,
		},
		{
			title: 'Current Quantity',
			dataIndex: 'currentQuantity',
			key: 'currentQuantity',
			width: 140,
			render: customNumber,
		},
		{
			title: 'Action',
			key: 'operation',
			fixed: 'right',
			align: 'center',
			width: 100,
			render: (item: Inventory) => {
				return (
					<MSpace split={''}>
						<MButton
							type='primary'
							tooltip='Import'
							onClick={() => dispatch(toggleModalImportInventory(item))}
						>
							<FontAwesomeIcon icon={faArrowUpFromBracket} />
						</MButton>
						<MButton
							type='primary'
							className='text-white bg-purple-600 hover:bg-purple-300'
							tooltip='View History Import'
							onClick={() => dispatch(toggleModalHistoryImportInventory(item))}
						>
							<FontAwesomeIcon icon={faEye} />
						</MButton>
					</MSpace>
				);
			},
		},
	] as ColumnsType<Review>;

	return (
		<MTable
			columns={columns}
			dataSource={inventory?.data?.map((item, index) => ({ ...item, index: (inventory.pagination?.offset || 0) + index + 1, key: item._id })) || []}
			pagination={{
				defaultPageSize: 10,
				showSizeChanger: true,
				pageSizeOptions: ['20', '50', '100'],
				total: inventory.pagination?.total,
				pageSize: inventory.pagination?.limit,
				current: inventory.pagination?.page,
			}}
			onChange={onChangeTable}
			scroll={{ x: 1700, y: '55vh' }}
			className='w-full'
		/>
	);
};

export default InventoryTable;
