import MBadge from '@/components/MBadge';
import MButton from '@/components/MButton';
import MButtonDelete from '@/components/MButtonDelete';
import MInput from '@/components/MInput';
import MSpace from '@/components/MSpace';
import MTable from '@/components/MTable';
import { ORDER_STATUS } from '@/constants';
import { Order } from '@/models/orderModel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deletingOrder } from '@/redux/reducers/orderReducer';
import { customMoney, formatDate, formatPhonenumber } from '@/utils/FuntionHelpers';
import { faEdit, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnsType } from 'antd/es/table';
import { FilterConfirmProps } from 'antd/es/table/interface';
import React from 'react';

type DataIndex = keyof Order;

const OrderTable = () => {
	const { order } = useAppSelector((state) => state);

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
		onFilter: (value: string, record: Order) => (record[dataIndex] || '').toString().toLowerCase().includes(value.toLowerCase()),
		render: (text: string) => text,
	});

	const columns: ColumnsType<Order> = [
		{
			title: '#',
			dataIndex: 'index',
			key: 'index',
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
			title: 'Total Product Price',
			dataIndex: 'totalProductPrice',
			key: 'totalProductPrice',
			width: 150,
			align: 'right',
			render: customMoney,
		},
		{
			title: 'Delivery Fee',
			dataIndex: 'deliveryFee',
			key: 'deliveryFee',
			width: 150,
			align: 'right',
			render: customMoney,
		},
		{
			title: 'Voucher',
			dataIndex: 'voucherDiscount',
			key: 'voucherDiscount',
			width: 150,
			align: 'right',
			render: customMoney,
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
			render: (item: string) => (
				<MBadge
					count={ORDER_STATUS.find((p) => p.value === item)?.label}
					color='geekblue'
				></MBadge>
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
						link={`order/edit/${item._id}`}
					>
						<FontAwesomeIcon icon={faEdit} />
					</MButton>
					<MButtonDelete
						title={`Delete order ${item.orderCode}? `}
						onConfirm={() => dispatch(deletingOrder(item._id))}
					></MButtonDelete>
				</MSpace>
			),
		},
	] as ColumnsType<Order>;

	return (
		<MTable
			columns={columns}
			dataSource={order?.data?.map((item, index) => ({ ...item, index: index + 1, key: item._id })) || []}
			pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'] }}
			virtual
			scroll={{ x: 4000, y: 800 }}
		/>
	);
};

export default OrderTable;
