import MButton from '@/components/MButton';
import MButtonDelete from '@/components/MButtonDelete';
import MImage from '@/components/MImage';
import MInput from '@/components/MInput';
import MSpace from '@/components/MSpace';
import MTable from '@/components/MTable';
import { Customer } from '@/models/customerModel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deletingCustomer } from '@/redux/reducers/customerReducer';
import { formatDateToRender, formatPhonenumber } from '@/utils/FuntionHelpers';
import { faEdit, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnsType } from 'antd/es/table';
import { FilterConfirmProps } from 'antd/es/table/interface';
import React from 'react';

type DataIndex = keyof Customer;

const CustomerTable = () => {
	const { customer } = useAppSelector((state) => state);

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
		onFilter: (value: string, record: Customer) => (record[dataIndex] || '').toString().toLowerCase().includes(value.toLowerCase()),
		render: (text: string) => text,
	});

	const columns: ColumnsType<Customer> = [
		{
			title: '#',
			dataIndex: 'index',
			key: 'index',
			width: 60,
		},
		{
			title: 'Avatar',
			dataIndex: 'image',
			key: 'image',
			width: 100,
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
			width: 200,
			...getColumnSearchProps('name'),
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			width: 240,
			...getColumnSearchProps('email'),
		},
		{
			title: 'Birthday',
			dataIndex: 'birthday',
			key: 'birthday',
			width: 100,
			...getColumnSearchProps('birthday'),
			render: formatDateToRender,
		},
		{
			title: 'Phone number',
			dataIndex: 'phoneNumber',
			key: 'phoneNumber',
			width: 140,
			...getColumnSearchProps('phoneNumber'),
			render: (item) => formatPhonenumber(item),
		},
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'address',
			width: 300,
			...getColumnSearchProps('address'),
		},
		{
			title: 'Action',
			key: 'operation',
			fixed: 'right',
			width: 150,
			render: (item) => (
				<MSpace split={''}>
					<MButton
						type='primary'
						link={`customer/edit/${item.id}`}
					>
						<FontAwesomeIcon icon={faEdit} />
					</MButton>
					<MButtonDelete
						title={`Delete customer ${item.name}? `}
						onConfirm={() => dispatch(deletingCustomer(item._id))}
					></MButtonDelete>
				</MSpace>
			),
		},
	] as ColumnsType<Customer>;

	return (
		<MTable
			columns={columns}
			dataSource={customer?.data?.map((item, index) => ({ ...item, index: index + 1, key: item._id })) || []}
			pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'] }}
			scroll={{ x: 1200, y: '55vh' }}
		/>
	);
};

export default CustomerTable;
