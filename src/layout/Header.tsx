'use client';

import { faArrowRight, faArrowRightFromBracket, faBars, faEllipsis, faPen, faPlus, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faBell, faEnvelope, faMessage, faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Badge, Col, Drawer, Dropdown, Image, Row, Tabs, TabsProps } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from '../styles/layout.module.css';
import type { MenuProps } from 'antd';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { toggle } from '../redux/reducers/sideBarReducer';

import MButton from '@/components/MButton';
import { logouting } from '@/redux/reducers/authReducer';
import { gettingNotifications } from '@/redux/reducers/notificationReducer';
import Link from 'next/link';

const tabItems: TabsProps['items'] = [
	{
		key: 'notes',
		label: `NOTES`,
		children: (
			<>
				<Row
					gutter={[4, 4]}
					align='middle'
					className='mb-4'
				>
					<Col
						span={4}
						className='flex justify-center'
					>
						<MButton icon={<FontAwesomeIcon icon={faPlus} />} />
					</Col>
					<Col
						span={16}
						className='text-center'
					>
						<div className='text-lg'>Note</div>
						<div className='text-xs font-medium text-gray-500'>Add new notes</div>
					</Col>
					<Col
						span={4}
						className='flex justify-center'
					>
						<MButton icon={<FontAwesomeIcon icon={faSearch} />} />
					</Col>
				</Row>
				<Row
					gutter={[4, 4]}
					className='p-4 border-t item-hover'
				>
					<Col span={18}>
						<div className='font-normal text-ellipsis-1'>New place order</div>
						<div className='text-xs font-medium text-gray-500'>10 aug 2020</div>
					</Col>
					<Col
						span={6}
						className='flex justify-end items-center gap-2'
					>
						<MButton
							icon={<FontAwesomeIcon icon={faPen} />}
							shape='circle'
							type='primary'
							className='bg-blue-600'
						/>
						<MButton
							icon={<FontAwesomeIcon icon={faTrash} />}
							shape='circle'
							danger
							type='primary'
						/>
					</Col>
				</Row>
			</>
		),
	},
	{
		key: 'alerts',
		label: `ALERTS`,
		children: (
			<>
				<Row
					gutter={[4, 4]}
					align='middle'
					className='mb-4'
				>
					<Col
						span={4}
						className='flex justify-center'
					>
						<MButton icon={<FontAwesomeIcon icon={faEllipsis} />} />
					</Col>
					<Col
						span={16}
						className='text-center'
					>
						<div className='text-lg'>Notifications</div>
						<div className='text-xs font-medium text-gray-500'>Show All</div>
					</Col>
					<Col
						span={4}
						className='flex justify-center'
					>
						<MButton icon={<FontAwesomeIcon icon={faSearch} />} />
					</Col>
				</Row>
				<div>
					<div className='bg-gray-100 border-t p-2 px-4 text-lg uppercase'>Server Status</div>
					<Row
						gutter={[4, 4]}
						align='middle'
						className='p-2 px-4 border-t item-hover'
					>
						<Col span={4}>
							<div className='bg-blue-200 text-blue-500 text-base w-11 h-11 rounded-full flex items-center justify-center'>KK</div>
						</Col>
						<Col span={20}>
							<div className='font-normal text-base text-ellipsis-1'>David nester</div>
							<div className='text-blue-400 font-medium text-sm text-ellipsis-1'>Today</div>
						</Col>
					</Row>
				</div>
			</>
		),
	},
	{
		key: 'chat',
		label: `CHAT`,
		children: (
			<>
				<Row
					gutter={[4, 4]}
					align='middle'
					className='mb-4'
				>
					<Col
						span={4}
						className='flex justify-center'
					>
						<MButton icon={<FontAwesomeIcon icon={faPlus} />} />
					</Col>
					<Col
						span={16}
						className='text-center'
					>
						<div className='text-lg'>Chat List</div>
						<div className='text-xs font-medium text-gray-500'>Show All</div>
					</Col>
					<Col
						span={4}
						className='flex justify-center'
					>
						<MButton icon={<FontAwesomeIcon icon={faEllipsis} />} />
					</Col>
				</Row>
				<div>
					<div className='bg-gray-100 border-t p-2 px-4 text-lg uppercase'>A</div>
					<Row
						gutter={[4, 4]}
						align='middle'
						className='p-2 px-4 border-t item-hover'
					>
						<Col span={4}>
							<Badge
								dot={true}
								color='green'
								offset={[-5, 34]}
							>
								<Avatar
									shape='circle'
									size='large'
								/>
							</Badge>
						</Col>
						<Col span={20}>
							<div className='font-normal text-base text-ellipsis-1'>Achire nester</div>
							<div className='text-gray-500 font-medium text-xs text-ellipsis-1'>Achire is online</div>
						</Col>
					</Row>
				</div>
			</>
		),
	},
];

const HeaderAdmin: React.FC = () => {
	const { sideBar, auth, notification } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();

	const [notificationItems, setNotificationItems] = useState<MenuProps['items']>([]);

	const profileItems: MenuProps['items'] = [
		// {
		// 	label: (
		// 		<div className='flex items-center gap-2 w-32'>
		// 			<FontAwesomeIcon
		// 				icon={faUser}
		// 				color='#1EAAE8'
		// 			/>
		// 			Profile
		// 		</div>
		// 	),
		// 	key: '0',
		// },
		// {
		// 	type: 'divider',
		// },
		{
			label: (
				<div
					className='flex items-center gap-2'
					onClick={() => {
						dispatch(logouting());
					}}
				>
					<FontAwesomeIcon
						icon={faArrowRightFromBracket}
						color='#FF2F2E'
					/>
					Log out
				</div>
			),
			key: '3',
		},
	];

	const [open, setOpen] = useState(false);

	const showDrawer = () => {
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	const onChange = (key: string) => {
		console.log(key);
	};

	useEffect(() => {
		if (notification?.data) {
			setNotificationItems(
				notification?.data?.length <= 0
					? [
							{
								label: 'No notifications.',
								key: 'no_notificaitons.',
							},
					  ]
					: notification?.data?.map((item) => ({
							label: (
								<Link href={item?.link || '/'}>
									<Row
										gutter={[4, 4]}
										className='w-72'
										align='middle'
									>
										{item?.image && (
											<Col
												span={4}
												className='flex items-center'
											>
												<Image
													alt='img'
													src={item?.image}
													preview={false}
												/>
											</Col>
										)}
										<Col span={20}>
											<div className='text-sm'>{item?.title}</div>
											<div className='text-xs text-gray-500 text-ellipsis-2'>{item?.body}</div>
										</Col>
									</Row>
								</Link>
							),
							key: item?._id || '',
					  })),
			);
		}
	}, [notification?.data]);

	useEffect(() => {
		dispatch(gettingNotifications({ offset: '0', limit: '10' }));
	}, [dispatch]);

	return (
		<div className={styles.header}>
			<div className='flex items-center'>
				<MButton
					icon={
						sideBar.isOpen ? (
							<FontAwesomeIcon
								icon={faBars}
								className={styles.iconBar}
							/>
						) : (
							<FontAwesomeIcon
								icon={faArrowRight}
								className={styles.iconBar}
							/>
						)
					}
					type='default'
					size='large'
					onClick={() => dispatch(toggle())}
				/>
			</div>
			<div className='flex items-center'>
				<Dropdown
					menu={{ items: notificationItems }}
					trigger={['click']}
					placement='bottomRight'
				>
					<Badge count={notification.data?.length}>
						<MButton
							icon={<FontAwesomeIcon icon={faBell} />}
							size='large'
							shape='circle'
							style={{ backgroundColor: '#fff' }}
							onClick={(e) => e.preventDefault()}
						/>
					</Badge>
				</Dropdown>
				{/* <MButton
					icon={<FontAwesomeIcon icon={faMessage} />}
					size='large'
					shape='circle'
					style={{ backgroundColor: '#fff' }}
					className='mx-4'
					onClick={showDrawer}
				/>
				<Drawer
					title={
						<Tabs
							defaultActiveKey='notes'
							items={tabItems}
							onChange={onChange}
							centered
							size='large'
							tabBarStyle={{ background: '#1EAAE8', color: '#BEE6F8' }}
						/>
					}
					placement='right'
					onClose={onClose}
					open={open}
					closable={false}
					className='p-0'
					headerStyle={{ padding: 0 }}
				></Drawer> */}

				<Dropdown
					menu={{ items: profileItems }}
					trigger={['click']}
				>
					<div className={styles.userProfileContainer}>
						<div className='mx-2'>
							<div className='text-base'>
								Hello, <strong>{auth.currentUser?.name}</strong>
							</div>
						</div>
						<div className={styles.userAvatar}>
							<Image
								src={auth.currentUser?.image}
								alt='avatar'
								preview={false}
							/>
						</div>
					</div>
				</Dropdown>
			</div>
		</div>
	);
};

export default HeaderAdmin;
