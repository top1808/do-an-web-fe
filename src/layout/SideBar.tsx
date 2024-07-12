import { faBox, faBoxesStacked, faDolly, faHatCowboy, faPercent, faRobot, faServer, faStar, faTicket, faUser, faUserLock, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, type MenuProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../redux/hooks';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
import Link from 'next/link';
import { getSideBarState } from '@/redux/reducers/sideBarReducer';

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
	getItem('Customer', '/customer', <FontAwesomeIcon icon={faUser} />),
	getItem('Order', '/order', <FontAwesomeIcon icon={faDolly} />),
	getItem('Voucher', '/voucher', <FontAwesomeIcon icon={faTicket} />),
	getItem('Discount Program', '/discount-program', <FontAwesomeIcon icon={faPercent} />),
	getItem('Review', '/review', <FontAwesomeIcon icon={faStar} />),
	getItem('Inventory', '/inventory', <FontAwesomeIcon icon={faWarehouse} />),
	getItem('Permission', '/permission', <FontAwesomeIcon icon={faUserLock} />),
	getItem('Chatbot', '/chatbot', <FontAwesomeIcon icon={faRobot} />, [getItem('Intents', '/chatbot/intents'), getItem('Responses', '/chatbot/responses'), getItem('Stories', '/chatbot/stories')]),
];

const SideBarAdmin: React.FC = () => {
	const sideBar = useAppSelector(getSideBarState);
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
			<Link href='/'>
				<div
					className='logo px-4 fixed top-0 left-0 z-10 text-5xl flex items-center justify-center'
					style={{
						height: 100,
						width: sideBar.isOpen ? 200 : 80,
						transitionDuration: '0.25s',
						background: '#1EAAE8',
						color: '#fff',
					}}
				>
					<FontAwesomeIcon icon={faHatCowboy} />
					{sideBar.isOpen && <>T&T</>}
				</div>
			</Link>
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
