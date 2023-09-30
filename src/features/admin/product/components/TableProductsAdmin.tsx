'use client';
import MButton from '@/components/MButton';
import MInput from '@/components/MInput';
import MSpace from '@/components/MSpace';
import MTable from '@/components/MTable';
import { Product } from '@/models/productModels';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deletingProduct } from '@/redux/reducers/productReducer';
import { faCheck, faMagnifyingGlass, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnsType } from 'antd/es/table';
import { FilterConfirmProps } from 'antd/es/table/interface';
import React, { useState } from 'react';

type DataIndex = keyof Product;

const TableProductsAdmin = () => {
	const { product } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();

	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');

	const handleSearch = (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void, dataIndex: DataIndex) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};

	const handleReset = (clearFilters: () => void, selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void, dataIndex: DataIndex) => {
		clearFilters();
		setSearchText('');
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

	const columns: ColumnsType<Product> = [
		{
			title: '#',
			dataIndex: 'index',
			key: 'index',
			width: '2%',
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			width: '10%',
			...getColumnSearchProps('name'),
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
			width: '20%',
			...getColumnSearchProps('price'),
		},
		{
			title: 'Quantity',
			dataIndex: 'quantity',
			key: 'quantity',
			width: '10%',
			...getColumnSearchProps('quantity'),
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
			width: '20%',
			...getColumnSearchProps('decription'),
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			width: '5%',
			render: (status) =>
				status ? (
					<FontAwesomeIcon
						icon={faCheck}
						color='green'
					/>
				) : (
					<FontAwesomeIcon
						icon={faXmark}
						color='red'
					/>
				),
		},
		{
			title: 'Action',
			key: 'operation',
			fixed: 'right',
			width: '15%',
			render: (item: Product) => (
				<MSpace split={2}>
					<MButton
						type='primary'
						onClick={() => {
							dispatch(deletingProduct(item._id));
						}}
					>
						<FontAwesomeIcon icon={faTrash} />
					</MButton>
				</MSpace>
			),
		},
	] as ColumnsType<Product>;

	return (
		<MTable
			columns={columns}
			dataSource={product?.data?.map((item, index) => ({ ...item, index: index + 1, key: item._id })) || []}
			pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'] }}
		/>
	);
};

export default TableProductsAdmin;
