'use client';
import MSkeleton from '@/components/MSkeleton';
import MText from '@/components/MText';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { gettingMoreNotifications, gettingNotifications, readingNotifications } from '@/redux/reducers/notificationReducer';
import { Badge, Button, Col, Image, Row } from 'antd';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const NotificationPageComponent = () => {
	const dispatch = useAppDispatch();
	const { notification } = useAppSelector((state) => state);

	const onViewMore = () => {
		dispatch(gettingMoreNotifications({ offset: ((notification.pagination?.limit || 0) + (notification.pagination?.offset || 0)).toString(), limit: '10' }));
	};

	useEffect(() => {
		dispatch(gettingNotifications({ offset: '0', limit: '20' }));
	}, [dispatch]);

	return (
		<MSkeleton loading={notification.isLoading}>
			<div className='w-full bg-slate-200 p-2'>
				<MText className='text-lg font-bold'>Notification</MText>
			</div>
			<div>
				{notification?.data?.map((item) => (
					<Link
						href={item?.link || '/'}
						key={item._id}
						onClick={() => dispatch(readingNotifications(item?._id || ''))}
					>
						<Row
							gutter={[4, 4]}
							align='middle'
							className={`bg-white p-2 hover:bg-slate-100 ${item.isRead ? 'text-slate-400' : 'text-black'}`}
						>
							{/* {item?.image && (
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
							)} */}
							<Col span={2}>
								<Badge dot={!item.isRead} />
							</Col>
							<Col span={22}>
								<div className='text-sm font-semibold'>{item?.title}</div>
								<div className='text-xs text-ellipsis-2'>{item?.body}</div>
							</Col>
						</Row>
					</Link>
				))}
				{(notification?.pagination?.total || 0) > 10 && notification.data?.length !== notification.pagination?.total && (
					<Row
						gutter={[4, 4]}
						align='middle'
						className='bg-white p-2 hover:bg-slate-100 text-center cursor-pointer'
						onClick={onViewMore}
					>
						<Col span={24}>
							<Button
								type='text'
								className='text-sm text-blue-600'
								loading={notification.isLoadingMore}
							>
								View more
							</Button>
						</Col>
					</Row>
				)}
			</div>
		</MSkeleton>
	);
};

export default NotificationPageComponent;
