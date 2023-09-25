'use client';
import MBreadcrumb from '@/components/MBreadcrumb';
import MButton from '@/components/MButton';
import MCard from '@/components/MCard';
import MRow from '@/components/MRow';
import AdminUserComponent from '@/features/admin/user/Index';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { gettingUsers } from '@/redux/reducers/userReducer';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useEffect } from 'react';

const UserPage = () => {
	const breadcrumbItems = [
		{
			title: <Link href='/admin'>Admin</Link>,
		},
		{
			title: 'User',
		},
	];

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(gettingUsers());
	}, [dispatch]);

	return (
		<>
			<MBreadcrumb items={breadcrumbItems} />
			<MCard
				title={
					<MRow
						gutter={4}
						justify='end'
					>
						<MButton
							type='primary'
							icon={<FontAwesomeIcon icon={faPlus} />}
							href='/admin'
						>
							Add New
						</MButton>
					</MRow>
				}
			>
				<AdminUserComponent />
			</MCard>
		</>
	);
};

export default UserPage;
