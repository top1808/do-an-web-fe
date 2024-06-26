import MBadge from '@/components/MBadge';
import MButton from '@/components/MButton';
import MInput from '@/components/MInput';
import MSpace from '@/components/MSpace';
import MTable from '@/components/MTable';
import { ORDER_STATUS } from '@/constants';
import { Order } from '@/models/orderModel';
import { useAppSelector } from '@/redux/hooks';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { customMoney, formatDate, formatPhonenumber, objectToQueryString } from '@/utils/FuntionHelpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnsType } from 'antd/es/table';
import { FilterConfirmProps, TablePaginationConfig } from 'antd/es/table/interface';
import React from 'react';
import OrderActionButtonWrapper from './tableComponents/OrderActionButtonWrapper';
import { getOrderState } from '@/redux/reducers/orderReducer';
import { useRouter } from 'next/navigation';

type DataIndex = keyof Order;

const OrderTable = () => {
	const order = useAppSelector(getOrderState);
	const router = useRouter();

	const handleSearch = (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void, dataIndex: DataIndex) => {
		confirm();
	};

	const handleReset = (clearFilters: () => void, selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void, dataIndex: DataIndex) => {
		clearFilters();
		handleSearch(selectedKeys as string[], confirm, dataIndex);
	};

	const onChangeTable = (pagination: TablePaginationConfig) => {
		let offset = ((pagination?.current || 1) - 1) * (pagination.pageSize || 0);
		const limit = pagination.pageSize;
		if (limit !== order.pagination?.limit) offset = 0;
		const query = objectToQueryString({ offset, limit });

		router.replace('/order' + query);
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
		onFilter: (value: string, record: Order) => (record[dataIndex] || '').toString().toLowerCase().includes(value.toLowerCase()),
		render: (text: string) => text,
	});

	const columns: ColumnsType<Order> = [
		{
			title: '#',
			dataIndex: 'index',
			key: 'index',
			fixed: 'left',
			width: 50,
		},
		{
			title: 'Order Code',
			dataIndex: 'orderCode',
			key: 'orderCode',
			width: 220,
			...getColumnSearchProps('orderCode'),
		},
		{
			title: 'Customer Name',
			dataIndex: 'customerName',
			key: 'customerName',
			width: 200,
			...getColumnSearchProps('customerName'),
		},
		{
			title: 'Customer Phone',
			dataIndex: 'customerPhone',
			key: 'customerPhone',
			width: 140,
			...getColumnSearchProps('customerPhone'),
			render: formatPhonenumber,
		},
		{
			title: 'Customer Address',
			dataIndex: 'customerAddress',
			key: 'customerAddress',
			width: 200,
			...getColumnSearchProps('customerAddress'),
		},
		{
			title: 'Total Paid',
			dataIndex: 'totalPaid',
			key: 'totalPaid',
			width: 150,
			align: 'right',
			render: customMoney,
		},
		{
			title: 'Total Price',
			dataIndex: 'totalPrice',
			key: 'totalPrice',
			width: 150,
			align: 'right',
			render: customMoney,
		},
		{
			title: 'Created At',
			dataIndex: 'createdAt',
			key: 'createdAt',
			width: 120,
			render: (item) => formatDate(item, 'DD/MM/YYYY'),
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			width: 150,
			align: 'center',
			fixed: 'right',
			render: (item: string) => (
				<MBadge
					count={ORDER_STATUS.find((p) => p.value === item)?.label}
					color={ORDER_STATUS.find((p) => p.value === item)?.color}
				></MBadge>
			),
		},
		{
			title: 'Action',
			key: 'operation',
			fixed: 'right',
			width: 200,
			render: (item: Order) => <OrderActionButtonWrapper item={item} />,
		},
	] as ColumnsType<Order>;

	return (
		<MTable
			columns={columns}
			dataSource={order?.data?.map((item, index) => ({ ...item, index: (order.pagination?.offset || 0) + index + 1, key: item._id })) || []}
			pagination={{
				defaultPageSize: 2,
				showSizeChanger: true,
				pageSizeOptions: ['2', '4', '10'],
				total: order.pagination?.total,
				pageSize: order.pagination?.limit,
				current: order.pagination?.page,
			}}
			onChange={onChangeTable}
			scroll={{ x: 1600, y: '55vh' }}
		/>
	);
};

export default OrderTable;
