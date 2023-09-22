'use client';
import { Category } from '@/models/productModels';
import { convertDataItemsCategory, getItem } from '@/utils/FuntionHelpers';
import { faServer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, type MenuProps } from 'antd';
import React from 'react';

const dataItems: Category[] = [
	{
		label: 'Món chính',
		key: 'qqq',
		icon: <FontAwesomeIcon icon={faServer} />,
		children: [
			{
				label: 'Cơm',
				key: 'xxx',
			},
			{
				label: 'Cháo',
				key: 'zzz',
			},
		],
	},
	{
		label: 'Món tráng miệng',
		key: 'abc',
		icon: <FontAwesomeIcon icon={faServer} />,
	},
	{
		label: 'Ăn vặt',
		key: 'eeee',
		icon: <FontAwesomeIcon icon={faServer} />,
	},
];
const items = convertDataItemsCategory(dataItems);
const SideBarUser: React.FC = () => {
	const onClick: MenuProps['onClick'] = (e) => {
		console.log('click ', e);
	};

	return (
		<>
			<Menu
				defaultSelectedKeys={['dashboard']}
				mode='inline'
				items={items}
				onClick={onClick}
			/>
		</>
	);
};

export default SideBarUser;
