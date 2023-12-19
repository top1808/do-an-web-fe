import MBadge from '@/components/MBadge';
import MButton from '@/components/MButton';
import MButtonDelete from '@/components/MButtonDelete';
import MInput from '@/components/MInput';
import MSpace from '@/components/MSpace';
import MTable from '@/components/MTable';
import { DiscountProgram } from '@/models/discountProgramModel';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deletingDiscountProgram } from '@/redux/reducers/discountProgramReducer';
import { formatDate } from '@/utils/FuntionHelpers';
import { faEdit, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnsType } from 'antd/es/table';
import { FilterConfirmProps } from 'antd/es/table/interface';
import React from 'react';

type DataIndex = keyof DiscountProgram;

const DiscountProgramTable = () => {
	const { discountProgram } = useAppSelector((state) => state);

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
		onFilter: (value: string, record: DiscountProgram) => (record[dataIndex] || '').toString().toLowerCase().includes(value.toLowerCase()),
		render: (text: string) => text,
	});

	const columns: ColumnsType<DiscountProgram> = [
		{
			title: '#',
			dataIndex: 'index',
			key: 'index',
			width: 40,
			fixed: 'left',
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			width: 200,
			...getColumnSearchProps('name'),
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
						link={`discount-program/edit/${item._id}`}
					>
						<FontAwesomeIcon icon={faEdit} />
					</MButton>
					<MButtonDelete
						title={`Delete discount program ${item.name}? `}
						onConfirm={() => dispatch(deletingDiscountProgram(item._id))}
					></MButtonDelete>
				</MSpace>
			),
		},
	] as ColumnsType<DiscountProgram>;

	return (
		<MTable
			columns={columns}
			dataSource={discountProgram?.data?.map((item, index) => ({ ...item, index: index + 1, key: item._id })) || []}
			pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'] }}
			className='w-full'
		/>
	);
};

export default DiscountProgramTable;
