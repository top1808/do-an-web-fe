import MBadge from '@/components/MBadge';
import MButton from '@/components/MButton';
import MButtonDelete from '@/components/MButtonDelete';
import MInput from '@/components/MInput';
import MSpace from '@/components/MSpace';
import MTable from '@/components/MTable';
import { Voucher } from '@/models/voucherModel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deletingVoucher } from '@/redux/reducers/voucherReducer';
import { customMoney, customNumber, formatDate } from '@/utils/FuntionHelpers';
import { faEdit, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnsType } from 'antd/es/table';
import { FilterConfirmProps } from 'antd/es/table/interface';
import React from 'react';

type DataIndex = keyof Voucher;

const VoucherTable = () => {
	const { voucher } = useAppSelector((state) => state);

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
		onFilter: (value: string, record: Voucher) => (record[dataIndex] || '').toString().toLowerCase().includes(value.toLowerCase()),
		render: (text: string) => text,
	});

	const columns: ColumnsType<Voucher> = [
		{
			title: '#',
			dataIndex: 'index',
			key: 'index',
			width: 40,
			fixed: 'left',
		},
		{
			title: 'Code',
			dataIndex: 'code',
			key: 'code',
			fixed: 'left',
			width: 120,
			...getColumnSearchProps('code'),
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			width: 200,
			...getColumnSearchProps('name'),
		},
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
			width: 80,
			render: (item: string) => (item === 'percent' ? '%' : 'Price'),
		},
		{
			title: 'Value',
			dataIndex: 'value',
			key: 'value',
			width: 100,
			align: 'right',
			sorter: (a, b) => (a.value || 0) - (b.value || 0),
			render: customNumber,
		},
		{
			title: 'Min Order Value',
			dataIndex: 'minOrderValue',
			key: 'minOrderValue',
			width: 140,
			align: 'right',
			sorter: (a, b) => (a.minOrderValue || 0) - (b.minOrderValue || 0),
			render: customMoney,
		},
		{
			title: 'Max Discount Value',
			dataIndex: 'maxDiscountValue',
			key: 'maxDiscountValue',
			width: 140,
			align: 'right',
			sorter: (a, b) => (a.maxDiscountValue || 0) - (b.maxDiscountValue || 0),
			render: customMoney,
		},
		{
			title: 'Quantity',
			dataIndex: 'quantity',
			key: 'quantity',
			width: 100,
			align: 'right',
			sorter: (a, b) => (a.quantity || 0) - (b.quantity || 0),
			render: customNumber,
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
			width: 200,
			...getColumnSearchProps('description'),
		},
		{
			title: 'Date Start',
			dataIndex: 'dateStart',
			key: 'dateStart',
			width: 120,
			render: (item: string) => formatDate(item, 'DD/MM/YYYY'),
		},
		{
			title: 'Date End',
			dataIndex: 'dateEnd',
			key: 'dateEnd',
			width: 120,
			render: (item: string) => formatDate(item, 'DD/MM/YYYY'),
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			width: 100,
			render: (status) => (
				<MBadge
					count={status}
					color={status === 'active' ? 'green' : 'red'}
					style={{ width: 70 }}
				/>
			),
		},
		{
			title: 'Action',
			key: 'operation',
			fixed: 'right',
			width: 200,
			render: (item) => (
				<MSpace split={''}>
					<MButton
						type='primary'
						link={`voucher/edit/${item._id}`}
					>
						<FontAwesomeIcon icon={faEdit} />
					</MButton>
					<MButtonDelete
						title={`Xoá voucher ${item.name}? `}
						onConfirm={() => dispatch(deletingVoucher(item._id))}
					></MButtonDelete>
				</MSpace>
			),
		},
	] as ColumnsType<Voucher>;

	return (
		<MTable
			columns={columns}
			dataSource={voucher?.data?.map((item, index) => ({ ...item, index: index + 1, key: item._id })) || []}
			pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'] }}
			scroll={{ x: 2000, y: 2000 }}
			virtual
			className='w-full'
		/>
	);
};

export default VoucherTable;
