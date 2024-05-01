import MBadge from '@/components/MBadge';
import MButton from '@/components/MButton';
import MInput from '@/components/MInput';
import MSpace from '@/components/MSpace';
import MTable from '@/components/MTable';
import { Inventory } from '@/models/inventoryModel';
import { Review } from '@/models/reviewModel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getInventoryState } from '@/redux/reducers/inventoryReducer';
import { toggleModalHistoryImportInventory, toggleModalImportInventory } from '@/redux/reducers/modalReducer';
import { customNumber, formatDate } from '@/utils/FuntionHelpers';
import { faArrowUpFromBracket, faEye, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Rate } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FilterConfirmProps } from 'antd/es/table/interface';
import React from 'react';

type DataIndex = keyof Review;

const InventoryTable = () => {
	const inventory = useAppSelector(getInventoryState);
	const dispatch = useAppDispatch();

	const handleSearch = (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void, dataIndex: DataIndex) => {
		confirm();
	};

	const handleReset = (clearFilters: () => void, selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void, dataIndex: DataIndex) => {
		clearFilters();
		handleSearch(selectedKeys as string[], confirm, dataIndex);
	};

	const getColumnSearchProps = (dataIndex: DataIndex) => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
			close,
		}: {
			setSelectedKeys: React.Dispatch<React.SetStateAction<string[]>>;
			selectedKeys: string[];
			confirm: (param?: FilterConfirmProps) => void;
			clearFilters: () => void;
			close: () => void;
		}) => (
			<div
				style={{ padding: 8 }}
				onKeyDown={(e) => e.stopPropagation()}
			>
				<MInput
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{ marginBottom: 8, display: 'block' }}
				/>
				<MSpace>
					<MButton
						type='primary'
						onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
						icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
						size='small'
						style={{ width: 90 }}
					>
						Search
					</MButton>
					<MButton
						onClick={() => clearFilters && handleReset(clearFilters, selectedKeys as string[], confirm, dataIndex)}
						size='small'
						style={{ width: 90 }}
					>
						Reset
					</MButton>
					<MButton
						type='link'
						size='small'
						onClick={() => {
							close();
						}}
					>
						close
					</MButton>
				</MSpace>
			</div>
		),
		filterIcon: () => <FontAwesomeIcon icon={faMagnifyingGlass} />,
		onFilter: (value: string, record: Review) => (record[dataIndex] || '').toString().toLowerCase().includes(value.toLowerCase()),
		render: (text: string) => text,
	});

	const columns: ColumnsType<Review> = [
		{
			title: '#',
			dataIndex: 'index',
			key: 'index',
			width: 50,
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
			dataSource={inventory?.data?.map((item, index) => ({ ...item, index: index + 1, key: item._id })) || []}
			pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'] }}
			scroll={{ x: 1700, y: '55vh' }}
			className='w-full'
		/>
	);
};

export default InventoryTable;
