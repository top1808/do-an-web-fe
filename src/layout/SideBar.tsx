import { faBox, faBoxesStacked, faServer, faUser, faUserLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, type MenuProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../redux/hooks';
import { usePathname, useRouter } from 'next/navigation';
import usePermission from '@/hooks/usePermission';

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

export const routes: MenuItem[] = [
	getItem('Dashboard', '/', <FontAwesomeIcon icon={faServer} />),
	getItem('Category', '/category', <FontAwesomeIcon icon={faBoxesStacked} />),
	getItem('Product', '/product', <FontAwesomeIcon icon={faBox} />),
	getItem('User', '/user', <FontAwesomeIcon icon={faUser} />),
	getItem('Permission', '/permission', <FontAwesomeIcon icon={faUserLock} />),

	getItem('Navigation One', '1', <FontAwesomeIcon icon={faServer} />, [getItem('Option 5', '5'), getItem('Option 6', '6'), getItem('Option 7', '7'), getItem('Option 8', '8')]),

	getItem('Navigation Two', '2', <FontAwesomeIcon icon={faServer} />, [
		getItem('Option 9', '9'),
		getItem('Option 10', '10'),

		getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
	]),
];

const SideBarAdmin: React.FC = () => {
	const { sideBar } = useAppSelector((state) => state);
	const router = useRouter();
	const pathname = usePathname();
	// const webPermissions = usePermission();

	const [sidebarItems, setSidebarItems] = useState<MenuItem[]>([]);

	const onClick: MenuProps['onClick'] = (e) => {
		router.push(e.key);
	};

	useEffect(() => {
		const tempItems = routes;
		// webPermissions?.forEach((p) => {
		// 	if (!p?.canView) {
		// 		tempItems = tempItems.filter((item: MenuItem) => item?.key !== p.url);
		// 	}
		// });

		setSidebarItems(tempItems);
	}, []);

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
				selectedKeys={[pathname]}
				mode='inline'
				items={sidebarItems}
				style={{ border: 'none', paddingTop: 100 }}
				onClick={onClick}
			/>
		</div>
	);
};

export default SideBarAdmin;
