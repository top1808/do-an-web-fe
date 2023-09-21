import { faServer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, type MenuProps } from 'antd';
import React, { useState } from 'react';
import { useAppSelector } from '../../redux/hooks';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: 'group'): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
	} as MenuItem;
}

const items: MenuItem[] = [
	getItem('Dashboard', 'dashboard', <FontAwesomeIcon icon={faServer} />),
	getItem('Apps', 'apps', <FontAwesomeIcon icon={faServer} />),
	getItem('Charts', 'charts', <FontAwesomeIcon icon={faServer} />),

	getItem('Navigation One', 'sub1', <FontAwesomeIcon icon={faServer} />, [getItem('Option 5', '5'), getItem('Option 6', '6'), getItem('Option 7', '7'), getItem('Option 8', '8')]),

	getItem('Navigation Two', 'sub2', <FontAwesomeIcon icon={faServer} />, [
		getItem('Option 9', '9'),
		getItem('Option 10', '10'),

		getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
	]),
];

const SideBarAdmin: React.FC = () => {
	const { sideBar } = useAppSelector((state) => state);
	const onClick: MenuProps['onClick'] = (e) => {
		console.log('click ', e);
	};

	return (
		<div className='h-full'>
			<div
				className='logo px-4 fixed top-0 left-0 z-10 bg-red-100'
				style={{
					height: 100,
					width: sideBar.isOpen ? 200 : 80,
					transitionDuration: '0.25s',
				}}
			>
				LOGO
			</div>
			<Menu
				defaultSelectedKeys={['dashboard']}
				mode='inline'
				items={items}
				style={{ border: 'none', paddingTop: 100 }}
				onClick={onClick}
			/>
		</div>
	);
};

export default SideBarAdmin;
