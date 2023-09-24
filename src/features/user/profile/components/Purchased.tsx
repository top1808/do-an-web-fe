import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import React from 'react';
interface DataType {
	key: React.Key;
	id: string;
	sale: number;
	sumary: number;
	time: string;
}
const dataSource = [
	{
		key: '232432',
		id: '12312312',
		sale: 38,
		sumary: 1400000,
		time: '1991/1/1',
	},
	{
		key: '112311',
		id: '2312312312',
		sale: 38,
		sumary: 2421423423432,
		time: '1991/1/1',
	},
];

const columns: ColumnsType<DataType> = [
	{
		title: 'ID',
		dataIndex: 'id',
		key: 'id',
	},
	{
		title: 'Giảm giá',
		dataIndex: 'sale',
		key: 'sale',
	},
	{
		title: 'Tổng tiền',
		dataIndex: 'sumary',
		key: 'sumary',
		sorter: (a, b) => a.sumary - b.sumary,
	},
	{
		title: 'Thời gian',
		dataIndex: 'time',
		key: 'time',
		// sorter: (a, b) => ,
	},
	{
		title: 'Action',
		key: 'operation',
		render: () => (
			<Link
				className='p-2 bg-blue-400 text-white hover:text-red-400'
				href={'/'}
			>
				Xem chi tiết
			</Link>
		),
	},
];
const Purchased = () => {
	return (
		<Table
			columns={columns}
			dataSource={dataSource}
		/>
	);
};

export default Purchased;
