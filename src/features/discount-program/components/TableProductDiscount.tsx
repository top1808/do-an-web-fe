import MButton from '@/components/MButton';
import MButtonDelete from '@/components/MButtonDelete';
import MSpace from '@/components/MSpace';
import MTable from '@/components/MTable';
import { DiscountProgramProduct } from '@/models/discountProgramModel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deleteDiscountProgramProduct, getDiscountProgramState, setDiscountProgramProductEdit } from '@/redux/reducers/discountProgramReducer';
import { customMoney, customNumber } from '@/utils/FuntionHelpers';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnsType } from 'antd/es/table';
import { usePathname } from 'next/navigation';
import React from 'react';

interface TableProductDiscountProps {}

const TableProductDiscount: React.FC<TableProductDiscountProps> = (props) => {
	const discountProgram = useAppSelector(getDiscountProgramState);
	const dispatch = useAppDispatch();
	const { discountProgramPost } = discountProgram;
	const pathname = usePathname();

	const columns: ColumnsType<DiscountProgramProduct> = [
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
			width: 150,
		},
		{
			title: 'Product Name',
			dataIndex: 'productName',
			key: 'productName',
			width: 150,
		},
		{
			title: 'Option 1',
			dataIndex: 'option1',
			key: 'option1',
			width: 100,
			render: (item) => (item ? `${Object.keys(JSON.parse(item))[0]}: ${Object.values(JSON.parse(item))[0]}` : ''),
		},
		{
			title: 'Option 2',
			dataIndex: 'option2',
			key: 'option2',
			width: 100,
			render: (item) => (item ? `${Object.keys(JSON.parse(item))[0]}: ${Object.values(JSON.parse(item))[0]}` : ''),
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
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
			align: 'right',
			width: 50,
			render: (item: string) => (item === 'percent' ? '%' : 'Price'),
		},
		{
			title: 'Value',
			dataIndex: 'value',
			key: 'value',
			width: 100,
			align: 'right',
			render: customNumber,
		},
		{
			title: 'Promotion Price',
			dataIndex: 'promotionPrice',
			key: 'promotionPrice',
			width: 100,
			align: 'right',
			render: customNumber,
		},
		{
			title: 'Action',
			key: 'operation',
			fixed: 'right',
			align: 'center',
			width: 100,
			render: (item: DiscountProgramProduct, record, index: number) => {
				return (
					<MSpace split={''}>
						<MButton
							type='primary'
							onClick={() => dispatch(setDiscountProgramProductEdit(item))}
						>
							<FontAwesomeIcon icon={faEdit} />
						</MButton>
						<MButtonDelete
							title={`Delete product ${item.productName}? `}
							onConfirm={() => dispatch(deleteDiscountProgramProduct((item?.index || 0) - 1))}
						></MButtonDelete>
					</MSpace>
				);
			},
		},
	] as ColumnsType<DiscountProgramProduct>;

	return (
		<MTable
			columns={pathname.includes('view') ? columns?.filter((col) => col.key !== 'operation') : columns}
			dataSource={discountProgramPost?.products?.map((item, index) => ({ ...item, index: index + 1, key: index })) || []}
			pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20'] }}
			className='mt-4'
		/>
	);
};

export default TableProductDiscount;
