import MButton from '@/components/MButton';
import MButtonDelete from '@/components/MButtonDelete';
import MSpace from '@/components/MSpace';
import MTable from '@/components/MTable';
import { OrderProduct } from '@/models/orderModel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deleteOrderProduct, setOrderProductEdit } from '@/redux/reducers/orderReducer';
import { customMoney, customNumber } from '@/utils/FuntionHelpers';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnsType } from 'antd/es/table';
import { usePathname } from 'next/navigation';
import React from 'react';

interface TableOrderProductProps {}

const TableOrderProduct: React.FC<TableOrderProductProps> = (props) => {
	const { order } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();
	const pathname = usePathname();

	const { orderPost } = order;
	console.log('🚀 ~ orderPost:', orderPost);

	const columns: ColumnsType<OrderProduct> = [
		{
			title: '#',
			dataIndex: 'index',
			key: 'index',
			width: '2%',
		},
		{
			title: 'Product Code',
			dataIndex: 'productCode',
			key: 'productCode',
			width: 100,
		},
		{
			title: 'Product Name',
			dataIndex: 'productName',
			key: 'productName',
			width: 100,
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
			width: 50,
			align: 'right',
			render: customMoney,
		},
		{
			title: 'Quantity',
			dataIndex: 'quantity',
			key: 'quantity',
			align: 'right',
			width: 100,
			render: customNumber,
		},
		{
			title: 'Total Price',
			dataIndex: 'totalPrice',
			key: 'totalPrice',
			align: 'right',
			width: 50,
			render: customMoney,
		},
		{
			title: 'Action',
			key: 'operation',
			fixed: 'right',
			align: 'center',
			width: 100,
			render: (item, record, index) => (
				<MSpace split={''}>
					<MButton
						type='primary'
						onClick={() => dispatch(setOrderProductEdit(item))}
					>
						<FontAwesomeIcon icon={faEdit} />
					</MButton>
					<MButtonDelete
						title={`Delete product ${item.productName}? `}
						onConfirm={() => dispatch(deleteOrderProduct(index))}
					></MButtonDelete>
				</MSpace>
			),
		},
	] as ColumnsType<OrderProduct>;

	return (
		<MTable
			columns={pathname.includes('view') ? columns?.filter((col) => col.key !== 'operation') : columns}
			dataSource={orderPost?.products?.map((item, index) => ({ ...item, index: index + 1, key: index })) || []}
			pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20'] }}
			className='mt-4'
		/>
	);
};

export default TableOrderProduct;
