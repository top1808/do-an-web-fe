import MBadge from '@/components/MBadge';
import MButton from '@/components/MButton';
import MInput from '@/components/MInput';
import MSpace from '@/components/MSpace';
import MTable from '@/components/MTable';
import { Review } from '@/models/reviewModel';
import { useAppSelector } from '@/redux/hooks';
import { getReviewState } from '@/redux/reducers/reviewReducer';
import { formatDate } from '@/utils/FuntionHelpers';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Rate } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FilterConfirmProps } from 'antd/es/table/interface';
import React from 'react';

type DataIndex = keyof Review;

const InventoryTable = () => {
	const review = useAppSelector(getReviewState);

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
			title: 'Customer Name',
			key: 'operation',
			width: 120,
			render: (item: Review) => item?.customer?.name,
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
			render: (item: Review) => (item?.productSKU?.options[0] ? `${item?.productSKU?.options[0]?.groupName}: ${item?.productSKU?.options[0]?.option}` : ''),
		},
		{
			title: 'Option 2',
			key: 'operation',
			width: 100,
			render: (item: Review) => (item?.productSKU?.options[1] ? `${item?.productSKU?.options[1]?.groupName}: ${item?.productSKU?.options[1]?.option}` : ''),
		},
		{
			title: 'Content',
			dataIndex: 'content',
			key: 'content',
			width: 140,
		},
		{
			title: 'Rate',
			dataIndex: 'rate',
			key: 'rate',
			width: 140,
			render: (item: number) => (
				<Rate
					value={item}
					disabled
					style={{ fontSize: '1rem' }}
				/>
			),
		},
		{
			title: 'Date Time',
			dataIndex: 'createdAt',
			key: 'createdAt',
			width: 120,
			render: (item: string) => formatDate(item, 'DD/MM/YYYY HH:mm'),
		},
	] as ColumnsType<Review>;

	return (
		<MTable
			columns={columns}
			dataSource={review?.data?.map((item, index) => ({ ...item, index: index + 1, key: item._id })) || []}
			pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'] }}
			scroll={{ x: 1700, y: '55vh' }}
			className='w-full'
		/>
	);
};

export default InventoryTable;
