'use client';
import MBadge from '@/components/MBadge';
import MButton from '@/components/MButton';
import MButtonDelete from '@/components/MButtonDelete';
import MImage from '@/components/MImage';
import MInput from '@/components/MInput';
import MSpace from '@/components/MSpace';
import MTable from '@/components/MTable';
import { Category } from '@/models/categoryModels';
import { Product } from '@/models/productModels';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deletingProduct } from '@/redux/reducers/productReducer';
import { customMoney, objectToQueryString } from '@/utils/FuntionHelpers';
import { faEdit, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnsType } from 'antd/es/table';
import { FilterConfirmProps, TablePaginationConfig } from 'antd/es/table/interface';
import { useRouter } from 'next-nprogress-bar';
import React from 'react';

type DataIndex = keyof Product;

const TableProductsAdmin = () => {
	const { product } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();

	const router = useRouter();

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
		onFilter: (value: string, record: Product) => (record[dataIndex] || '').toString().toLowerCase().includes(value.toLowerCase()),
		render: (text: string) => text,
	});

	const onChangeTable = (pagination: TablePaginationConfig) => {
		let offset = ((pagination?.current || 1) - 1) * (pagination.pageSize || 0);
		const limit = pagination.pageSize;
		if (limit !== product.pagination?.limit) offset = 0;
		const query = objectToQueryString({ offset, limit });

		router.replace('/product' + query);
	};

	const columns: ColumnsType<Product> = [
		{
			title: '#',
			dataIndex: 'index',
			key: 'index',
			width: 60,
			fixed: 'left',
		},
		{
			title: 'Image',
			dataIndex: 'image',
			key: 'image',
			width: 100,
			fixed: 'left',
			render: (item) => (
				<MImage
					src={item}
					alt='avatar'
					style={{ height: 50 }}
				/>
			),
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			width: 400,
			...getColumnSearchProps('name'),
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
			align: 'right',
			width: 140,
			sorter: (a, b) => (a.price || 0) - (b.price || 0),
			render: customMoney,
		},
		{
			title: 'Categories',
			dataIndex: 'categoryIds',
			key: 'categoryIds',
			width: 240,
			render: (items: Category[]) => (
				<div className='flex gap-2 align-middle flex-wrap'>
					{items?.map((item) => (
						<MBadge
							key={item._id}
							count={item.name}
							color='cyan'
						></MBadge>
					))}
				</div>
			),
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
			width: 400,
			...getColumnSearchProps('decription'),
			render: (item: string) => <div className='text-ellipsis-2'>{item}</div>,
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
			render: (item: Product) => (
				<MSpace split={''}>
					<MButton
						type='primary'
						link={`product/edit/${item._id}`}
					>
						<FontAwesomeIcon icon={faEdit} />
					</MButton>
					<MButtonDelete
						title={`Delete product ${item.name}? `}
						onConfirm={() => dispatch(deletingProduct(item._id || ''))}
					></MButtonDelete>
				</MSpace>
			),
		},
	] as ColumnsType<Product>;

	return (
		<MTable
			columns={columns}
			dataSource={product?.data?.map((item, index) => ({ ...item, index: (product.pagination?.offset || 0) + index + 1, key: item._id })) || []}
			pagination={{
				showSizeChanger: true,
				pageSizeOptions: ['10', '20', '30'],
				total: product.pagination?.total,
				pageSize: product.pagination?.limit,
				current: product.pagination?.page,
			}}
			onChange={onChangeTable}
			scroll={{ x: 4000, y: 500 }}
			virtual
		/>
	);
};

export default TableProductsAdmin;
